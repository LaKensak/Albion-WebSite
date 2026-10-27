import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import test from "node:test";
import { chromium, expect } from "@playwright/test";

test("Vanta redesign", { timeout: 180_000 }, async (t) => {
  const browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";
  const artifacts = ".next/redesign";
  await mkdir(artifacts, { recursive: true });

  try {
    await t.test(
      "home renders and all four plans keep their checkout links",
      async () => {
        const response = await page.goto(baseURL);
        assert.equal(response.status(), 200);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(
          "See beyond.Play ahead.",
        );
        for (const plan of ["DAILY", "WEEKLY", "MONTHLY", "LIFETIME"]) {
          await expect(
            page.locator(`#pricing a[href='/checkout?plan=${plan}']`),
          ).toBeVisible();
        }
        for (const section of await page.locator("main section").all()) {
          await section.scrollIntoViewIfNeeded();
        }
        for (const element of await page
          .locator('main [style*="opacity"]')
          .all()) {
          await element.scrollIntoViewIfNeeded();
          await expect(element).toHaveCSS("opacity", "1");
        }
        await page.evaluate(() => document.fonts.ready);
        await expect
          .poll(() =>
            page
              .locator("main img")
              .evaluateAll((images) =>
                images.every(
                  (image) => image.complete && image.naturalWidth > 0,
                ),
              ),
          )
          .toBe(true);
        await page.keyboard.press("Control+Home");
        await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
        await page.screenshot({
          path: `${artifacts}/home-desktop.png`,
          fullPage: true,
        });
      },
    );

    await t.test(
      "preview switches games, filters players and resources, and pauses",
      async () => {
        const preview = page.locator("#showcase .preview-frame");
        await preview
          .getByRole("button", { name: "Rust", exact: true })
          .click();
        await expect(preview).toHaveAttribute("data-preview-game", "rust");
        await expect(preview.locator("[data-player]")).toHaveCount(3);
        await preview.getByRole("switch", { name: "Player ESP" }).click();
        await expect(preview.locator("[data-player]")).toHaveCount(0);
        await preview.getByRole("switch", { name: "Player ESP" }).click();
        const range = preview.getByRole("slider", { name: "Render distance" });
        await range.focus();
        await page.keyboard.press("Home");
        await expect(preview.locator("[data-player]")).toHaveCount(1);
        await expect(preview.locator(".resource-marker")).toHaveCount(1);
        await preview.getByRole("switch", { name: "Resources" }).click();
        await expect(preview.locator(".resource-marker")).toHaveCount(0);
        await preview.getByRole("switch", { name: "Minimap" }).click();
        await expect(preview.locator(".scene-minimap")).toHaveCount(0);
        await preview
          .getByRole("button", { name: "Radar", exact: true })
          .click();
        await expect(preview.locator(".radar-full")).toBeVisible();
        await preview
          .getByRole("button", { name: "Pause preview animation" })
          .click();
        assert.equal(
          await preview
            .locator(".radar-sweep")
            .evaluate((el) => getComputedStyle(el).animationPlayState),
          "paused",
        );
        await preview
          .getByRole("button", { name: "Play preview animation" })
          .click();
        assert.equal(
          await preview
            .locator(".radar-sweep")
            .evaluate((el) => getComputedStyle(el).animationPlayState),
          "running",
        );
      },
    );

    await t.test(
      "FAQ works with keyboard and exposes one answer at a time",
      async () => {
        const questions = page.locator("#faq summary");
        await questions.nth(0).focus();
        await page.keyboard.press("Enter");
        await expect(page.locator("#faq details[open]")).toHaveCount(1);
        await questions.nth(1).click();
        await expect(page.locator("#faq details[open]")).toHaveCount(1);
        await expect(page.locator("#faq details").nth(1)).toHaveAttribute(
          "open",
          "",
        );
      },
    );

    await t.test(
      "responsive layout fits 320, 390, 768, 1024 and 1440px",
      async () => {
        for (const width of [320, 390, 768, 1024, 1440]) {
          await page.setViewportSize({ width, height: 900 });
          const dimensions = await page.evaluate(() => ({
            viewport: document.documentElement.clientWidth,
            content: document.documentElement.scrollWidth,
          }));
          assert.ok(
            dimensions.content <= dimensions.viewport,
            `${width}px: overflow ${dimensions.content - dimensions.viewport}px`,
          );
        }
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(baseURL);
        await expect(page.locator(".hero-heading").locator("..")).toHaveCSS(
          "opacity",
          "1",
        );
        for (const element of await page
          .locator('main [style*="opacity"]')
          .all()) {
          await element.scrollIntoViewIfNeeded();
          await expect(element).toHaveCSS("opacity", "1");
        }
        await page.keyboard.press("Control+Home");
        await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
        await page.screenshot({
          path: `${artifacts}/home-mobile.png`,
          fullPage: true,
        });
      },
    );

    await t.test(
      "mobile menu opens, closes with Escape and follows home anchors",
      async () => {
        const toggle = page.getByRole("button", { name: "Open menu" });
        await toggle.click();
        await expect(
          page.getByRole("navigation", { name: "Mobile navigation" }),
        ).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(toggle).toBeFocused();
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await toggle.click();
        await page
          .getByRole("navigation", { name: "Mobile navigation" })
          .getByRole("link", { name: "Live preview" })
          .click();
        await expect(
          page.getByRole("navigation", { name: "Mobile navigation" }),
        ).toHaveCount(0);
        await page.waitForURL("**/#showcase");
      },
    );

    await t.test(
      "game pages use the correct preview and unknown games return 404",
      async () => {
        await page.setViewportSize({ width: 1440, height: 1000 });
        for (const [slug, name] of [
          ["albion-online", "Albion Online."],
          ["rust", "Rust."],
        ]) {
          const response = await page.goto(`${baseURL}/games/${slug}`);
          assert.equal(response.status(), 200);
          await expect(page.getByRole("heading", { level: 1 })).toHaveText(
            name,
          );
          await expect(page.locator(".preview-frame")).toHaveAttribute(
            "data-preview-game",
            slug,
          );
          assert.equal(await page.locator("main main").count(), 0);
        }
        const response = await page.goto(`${baseURL}/games/does-not-exist`);
        assert.equal(response.status(), 404);
        await page.goto(`${baseURL}/games`);
        await expect(page.locator(".game-card")).toHaveCount(4);
        await page.screenshot({
          path: `${artifacts}/games-desktop.png`,
          fullPage: true,
        });
      },
    );

    await t.test(
      "auth forms preserve validation, referral and checkout callback",
      async () => {
        await page.goto(
          `${baseURL}/register?ref=TESTCODE&callbackUrl=%2Fcheckout%3Fplan%3DMONTHLY`,
        );
        await expect(page.getByLabel("Username")).toHaveAttribute(
          "minlength",
          "2",
        );
        await expect(page.getByRole("main")).toHaveCount(1);
        await expect(
          page.getByLabel("Password", { exact: true }),
        ).toHaveAttribute("minlength", "8");
        await expect(page.getByLabel("Referral code")).toHaveValue("TESTCODE");
        await expect(page.locator("input[name=callbackUrl]")).toHaveValue(
          "/checkout?plan=MONTHLY",
        );
        const signIn = page.getByRole("link", { name: "Sign in", exact: true });
        assert.ok((await signIn.getAttribute("href")).includes("callbackUrl="));
        await signIn.click();
        await page.waitForURL("**/login?**");
        await expect(page.getByLabel("Email address")).toHaveAttribute(
          "type",
          "email",
        );
        await expect(
          page.getByLabel("Password", { exact: true }),
        ).toHaveAttribute("autocomplete", "current-password");
        await page.screenshot({
          path: `${artifacts}/login-desktop.png`,
          fullPage: true,
        });
        await page.goto(`${baseURL}/login?error=invalid`);
        await expect(
          page
            .getByRole("alert")
            .filter({ hasText: "Invalid email or password." }),
        ).toBeVisible();
      },
    );

    await t.test(
      "reduced motion stops continuous animations and keyboard skip link works",
      async () => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(baseURL);
        const duration = await page
          .locator(".radar-sweep")
          .first()
          .evaluate((el) => getComputedStyle(el).animationDuration);
        assert.ok(parseFloat(duration) < 0.001);
        await page.keyboard.press("Tab");
        await expect(
          page.getByRole("link", { name: "Skip to content" }),
        ).toBeFocused();
        await page.keyboard.press("Enter");
        assert.equal(new URL(page.url()).hash, "#main-content");
      },
    );

    await t.test("no client runtime or hydration errors", () =>
      assert.deepEqual(errors, []),
    );
  } finally {
    await browser.close();
  }
});

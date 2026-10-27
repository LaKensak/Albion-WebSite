import type { LicenseType, PaymentMethod } from "@prisma/client";

export const plans: Record<LicenseType, { name: string; price: number; period: string; features: string[]; featured?: boolean }> = {
  DAILY:    { name: "Daily",    price: 3,  period: "/day",   features: ["All modules", "Auto-updates", "Discord support"] },
  WEEKLY:   { name: "Weekly",   price: 10, period: "/week",  features: ["All modules", "Auto-updates", "Discord support"] },
  MONTHLY:  { name: "Monthly",  price: 25, period: "/month", featured: true, features: ["All modules", "Auto-updates", "Priority support", "Config backup"] },
  LIFETIME: { name: "Lifetime", price: 75, period: "once",   features: ["All modules forever", "Auto-updates", "Priority support", "Config backup", "Early access"] },
};

export const methods: Record<PaymentMethod, { label: string; address?: string; hint: string }> = {
  CRYPTO_BTC: { label: "Bitcoin (BTC)", address: process.env.PAYMENT_ADDR_BTC, hint: "Send the equivalent of the amount in EUR." },
  CRYPTO_ETH: { label: "Ethereum (ETH)", address: process.env.PAYMENT_ADDR_ETH, hint: "Send the equivalent of the amount in EUR." },
  CRYPTO_USDT: { label: "USDT (TRC20)", address: process.env.PAYMENT_ADDR_USDT, hint: "TRC20 network only. 1 USDT ≈ 1 USD." },
  CRYPTO_LTC: { label: "Litecoin (LTC)", address: process.env.PAYMENT_ADDR_LTC, hint: "Send the equivalent of the amount in EUR." },
  PAYPAL: { label: "PayPal (Friends & Family)", address: process.env.PAYMENT_PAYPAL_EMAIL, hint: "Friends & Family only, no note in the payment." },
  OTHER: { label: "Other", hint: "" },
};

export const checkoutMethods = ["CRYPTO_BTC", "CRYPTO_ETH", "CRYPTO_USDT", "CRYPTO_LTC", "PAYPAL"] as const;

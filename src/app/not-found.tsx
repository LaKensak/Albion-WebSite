import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold text-cyan/30">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-sm text-fg-soft">The page you are looking for does not exist.</p>
        <Link href="/" className="btn-primary mt-8 inline-flex">Go home</Link>
      </div>
    </div>
  );
}

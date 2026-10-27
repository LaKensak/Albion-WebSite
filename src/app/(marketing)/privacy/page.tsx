export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-28 pt-32">
      <h1 className="font-display text-3xl font-bold">Privacy Policy</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-fg-soft">
        <p>We collect minimal data: your username, email, a hashed password, and a hardware ID for license validation.</p>
        <p>Payments are made in crypto or PayPal and verified manually. We store the transaction reference you submit, nothing else.</p>
        <p>We do not sell or share your data with third parties. Analytics are anonymized.</p>
        <p>Contact support for any privacy concerns or data deletion requests.</p>
      </div>
    </div>
  );
}

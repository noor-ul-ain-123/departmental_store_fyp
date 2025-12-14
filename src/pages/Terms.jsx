import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="space-y-6">
      <div className="card p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold">Terms & Conditions</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          These terms explain the rules for using Dept.Store Pro. (For real business use, consult a legal professional.)
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/products" className="btn-primary">Browse Products</Link>
          <Link to="/contact" className="btn-ghost">Support</Link>
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="text-lg font-bold">1. Using the service</h3>
        <p className="text-gray-700">
          By using this website/app, you agree to follow these terms. You must provide accurate information
          when creating an account or placing an order.
        </p>

        <h3 className="text-lg font-bold">2. Pricing & availability</h3>
        <p className="text-gray-700">
          Product prices and availability may change. We try to keep listings accurate, but mistakes can happen.
          If something is incorrect, we may cancel or update the order and notify you.
        </p>

        <h3 className="text-lg font-bold">3. Orders & payments</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Orders are confirmed after payment/checkout completes (depending on your setup).</li>
          <li>We may cancel orders suspected of fraud or misuse.</li>
          <li>Refunds follow our Returns & Refunds policy.</li>
        </ul>

        <h3 className="text-lg font-bold">4. Returns & refunds</h3>
        <p className="text-gray-700">
          Returns are handled according to our Returns & Refunds page. Some items may be non-returnable for safety reasons.
        </p>

        <h3 className="text-lg font-bold">5. Accounts & security</h3>
        <p className="text-gray-700">
          Keep your password secure. You are responsible for activity under your account. If you suspect unauthorized access,
          contact support immediately.
        </p>

        <h3 className="text-lg font-bold">6. Limitation of liability</h3>
        <p className="text-gray-700">
          This app is provided “as-is”. We are not responsible for indirect damages or losses due to service interruptions,
          delays, or third-party issues.
        </p>

        <h3 className="text-lg font-bold">7. Contact</h3>
        <p className="text-gray-700">
          If you have questions about these terms, reach us via the Contact page.
        </p>
      </div>

      <div className="text-xs text-gray-500">
        Last updated: 2025
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Returns() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold">Returns & Refunds</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          We want you to be happy with your purchase. If something is wrong, you can request a return
          or refund within the policy rules below.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">Request Help</Link>
          <Link to="/orders" className="btn-ghost">My Orders</Link>
        </div>
      </div>

      {/* Quick policy cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="text-2xl">⏳</div>
          <div className="mt-2 font-bold">Return window</div>
          <div className="text-gray-600 text-sm mt-1">
            Returns are accepted within <b>7 days</b> of delivery (for eligible items).
          </div>
        </div>

        <div className="card p-5">
          <div className="text-2xl">✅</div>
          <div className="mt-2 font-bold">Eligible items</div>
          <div className="text-gray-600 text-sm mt-1">
            Unused, sealed items in original packaging with receipt/order ID.
          </div>
        </div>

        <div className="card p-5">
          <div className="text-2xl">💳</div>
          <div className="mt-2 font-bold">Refund time</div>
          <div className="text-gray-600 text-sm mt-1">
            Approved refunds are processed within <b>3–7 business days</b>.
          </div>
        </div>
      </div>

      {/* Detailed rules */}
      <div className="card p-6 space-y-4">
        <h3 className="text-lg font-bold">Return Conditions</h3>

        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Item must be unused and in original packaging (sealed where applicable).</li>
          <li>Return request must be placed within 7 days of delivery.</li>
          <li>Provide your Order ID, item name, and reason for return/refund.</li>
          <li>Products damaged due to misuse are not eligible.</li>
        </ul>

        <h3 className="text-lg font-bold pt-2">Non-Returnable Items</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Perishable goods (milk, yogurt, fruits, vegetables) unless received damaged.</li>
          <li>Opened food items or broken seals (health & hygiene reasons).</li>
          <li>Personal care items after opening (soap, creams, etc.).</li>
          <li>Discounted/clearance items (unless defective).</li>
        </ul>
      </div>

      {/* How to request */}
      <div className="card p-6">
        <h3 className="text-lg font-bold">How to request a return</h3>

        <div className="mt-3 grid md:grid-cols-4 gap-3">
          {[
            ["1️⃣", "Go to My Orders", "Open your order details."],
            ["2️⃣", "Select the item", "Choose the product you want to return."],
            ["3️⃣", "Explain the issue", "Damaged / wrong item / other reason."],
            ["4️⃣", "Submit request", "Support will contact you for confirmation."],
          ].map(([icon, title, desc]) => (
            <div key={title} className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
              <div className="text-2xl">{icon}</div>
              <div className="mt-2 font-semibold">{title}</div>
              <div className="text-gray-600 text-sm mt-1">{desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/orders" className="btn-primary">Open My Orders</Link>
          <Link to="/contact" className="btn-ghost">Contact Support</Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="card p-6 space-y-3">
        <h3 className="text-lg font-bold">FAQ</h3>

        <details className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer font-semibold">
            What if I received a damaged item?
          </summary>
          <p className="mt-2 text-gray-700">
            Contact us within 24 hours of delivery with your Order ID and a photo of the item.
            We will arrange replacement or refund based on eligibility.
          </p>
        </details>

        <details className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer font-semibold">
            Can I cancel an order?
          </summary>
          <p className="mt-2 text-gray-700">
            If your order is not shipped yet, you can request cancellation from the Orders page.
            If it’s already shipped, please use the return process instead.
          </p>
        </details>

        <details className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer font-semibold">
            Where will I receive my refund?
          </summary>
          <p className="mt-2 text-gray-700">
            Refunds go back to the original payment method if supported, otherwise store credit or
            alternate arrangement may be used (based on your setup).
          </p>
        </details>
      </div>

      {/* Footer note */}
      <div className="text-xs text-gray-500">
        Note: This policy text is for demo/project use. You can customize time windows, eligibility,
        and refund methods according to your real store rules.
      </div>
    </div>
  );
}

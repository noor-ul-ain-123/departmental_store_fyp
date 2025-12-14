import { Link } from "react-router-dom";

export default function Shipping() {
  return (
    <div className="space-y-6">
      <div className="card p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold">Shipping & Delivery</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          We deliver essential items quickly and safely. Below are our delivery timelines, charges,
          and service rules.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/products" className="btn-primary">Shop Now</Link>
          <Link to="/contact" className="btn-ghost">Contact Support</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          ["🚚", "Standard Delivery", "1–2 business days (most areas)"],
          ["⚡", "Same-day (Selected)", "Available for nearby locations"],
          ["💰", "Delivery Fee", "Calculated at checkout"],
        ].map(([icon, title, desc]) => (
          <div key={title} className="card p-5">
            <div className="text-2xl">{icon}</div>
            <div className="mt-2 font-bold">{title}</div>
            <div className="text-gray-600 text-sm mt-1">{desc}</div>
          </div>
        ))}
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="text-lg font-bold">Delivery Timelines</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li><b>City areas:</b> usually 1–2 business days.</li>
          <li><b>Same-day delivery:</b> available in selected zones for eligible orders.</li>
          <li><b>Peak times:</b> delivery may take longer during sales or holidays.</li>
        </ul>

        <h3 className="text-lg font-bold pt-2">Order Processing</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Orders are processed after payment confirmation.</li>
          <li>We may call/message you for address confirmation if needed.</li>
          <li>If an item is out of stock, we will notify you with alternatives or refund options.</li>
        </ul>
      </div>

      <div className="card p-6 space-y-3">
        <h3 className="text-lg font-bold">FAQ</h3>

        <details className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer font-semibold">Can I change my delivery address?</summary>
          <p className="mt-2 text-gray-700">
            If the order is not shipped yet, contact support as soon as possible to update your address.
          </p>
        </details>

        <details className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer font-semibold">What if my order is late?</summary>
          <p className="mt-2 text-gray-700">
            Sometimes delays happen due to weather/traffic/peak load. If it’s delayed, contact us with your Order ID.
          </p>
        </details>

        <details className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer font-semibold">Do you deliver on weekends?</summary>
          <p className="mt-2 text-gray-700">
            Weekend delivery depends on your city/zone. We recommend checking available slots at checkout.
          </p>
        </details>
      </div>
    </div>
  );
}

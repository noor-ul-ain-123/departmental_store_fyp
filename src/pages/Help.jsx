import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const FAQS = [
  {
    category: "Orders",
    q: "How do I place an order?",
    a: "Go to Shop, add items to Cart, then open Cart → Checkout. Fill details and confirm your order.",
  },
  {
    category: "Orders",
    q: "Where can I see my orders?",
    a: "After login, open Account → My Orders. You can also use the footer link: My Orders.",
  },
  {
    category: "Payments",
    q: "Which payment methods are supported?",
    a: "Currently the demo supports basic checkout flow. You can extend it to COD / card / wallet easily.",
  },
  {
    category: "Delivery",
    q: "How long does delivery take?",
    a: "Normally 1–3 working days (depends on your city and stock availability).",
  },
  {
    category: "Returns",
    q: "Can I return a product?",
    a: "Yes. Items can be returned if unused and in original packaging. See the Returns page for details.",
  },
  {
    category: "Account",
    q: "I forgot my password. What should I do?",
    a: "For now, contact support from the Contact page. Later we can add a “Forgot Password” feature.",
  },
  {
    category: "Products",
    q: "Why is a product out of stock?",
    a: "It usually means inventory is low. You can wait for restock or choose an alternative product.",
  },
  {
    category: "Support",
    q: "How do I contact support?",
    a: "Use the Contact page. Add your issue details + order ID (if any) to get help faster.",
  },
];

export default function Help() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (x) =>
        x.q.toLowerCase().includes(q) ||
        x.a.toLowerCase().includes(q) ||
        x.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-5 space-y-2">
        <h2 className="text-xl font-bold">Help & FAQ</h2>
        <p className="text-gray-600">
          Quick answers for ordering, delivery, returns, and account issues.
        </p>

        <div className="pt-2">
          <input
            className="input"
            placeholder="Search help topics (orders, returns, delivery...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>


      {/* FAQ List */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">Frequently asked questions</h3>
          <div className="text-sm text-gray-500">
            Showing {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((item, idx) => (
            <details
              key={idx}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <summary className="cursor-pointer font-semibold">
                <span className="text-xs text-gray-500 mr-2">
                  {item.category}
                </span>
                {item.q}
              </summary>
              <p className="mt-2 text-gray-700">{item.a}</p>
            </details>
          ))}

          {filtered.length === 0 && (
            <div className="text-gray-600">
              No results found. Try different keywords or{" "}
              <Link className="link font-semibold" to="/contact">
                contact support
              </Link>
              .
            </div>
          )}
        </div>
      </div>

      {/* Support Callout */}
      <div className="card p-5 flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold">Still need help?</div>
          <div className="text-gray-600 text-sm">
            Send us your issue and (if possible) your order ID.
          </div>
        </div>
        <Link to="/contact" className="btn-primary">
          Contact
        </Link>
      </div>
    </div>
  );
}

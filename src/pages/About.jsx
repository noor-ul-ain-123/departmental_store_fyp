import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold">About Dept.Store Pro</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          Dept.Store Pro is a modern departmental store experience built to make daily shopping fast,
          simple, and reliable. From groceries to household essentials, we focus on quality products,
          transparent pricing, and a smooth checkout journey.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/products" className="btn-primary">Browse Products</Link>
          <Link to="/contact" className="btn-ghost">Contact Us</Link>
        </div>
      </div>

      {/* Mission + Vision */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-6">
          <div className="text-2xl">🎯</div>
          <div className="mt-2 font-bold text-lg">Our Mission</div>
          <p className="mt-1 text-gray-600">
            Make everyday shopping easy and affordable by providing essential products with a smooth,
            secure, and fast buying experience.
          </p>
        </div>

        <div className="card p-6">
          <div className="text-2xl">🚀</div>
          <div className="mt-2 font-bold text-lg">Our Vision</div>
          <p className="mt-1 text-gray-600">
            Become a trusted online store where customers confidently shop for groceries, household,
            and lifestyle items — with reliable service and great value.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="card p-6">
        <h3 className="text-lg font-bold">Why choose us?</h3>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {[
            ["✅", "Quality Products", "We focus on trusted items with clear information and pricing."],
            ["⚡", "Fast Experience", "Smooth browsing, easy cart, and quick checkout flow."],
            ["🔒", "Secure Accounts", "Login and orders are protected using token-based authentication."],
          ].map(([icon, title, desc]) => (
            <div key={title} className="rounded-2xl border border-gray-200 p-5 bg-gray-50">
              <div className="text-2xl">{icon}</div>
              <div className="mt-2 font-semibold">{title}</div>
              <div className="text-gray-600 text-sm mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          ["🛒", "Wide Catalog", "Groceries to essentials"],
          ["📦", "Order Tracking", "View orders anytime"],
          ["🧾", "Admin Panel", "Manage products & orders"],
          ["💬", "Customer Support", "Contact form enabled"],
        ].map(([icon, title, desc]) => (
          <div key={title} className="card p-5">
            <div className="text-2xl">{icon}</div>
            <div className="mt-2 font-bold">{title}</div>
            <div className="text-gray-600 text-sm">{desc}</div>
          </div>
        ))}
      </div>

      {/* Closing */}
      <div className="card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="font-bold text-lg">Want to suggest an improvement?</div>
          <div className="text-gray-600 text-sm">
            We’re improving the store continuously. Send feedback or report an issue anytime.
          </div>
        </div>
        <Link to="/contact" className="btn-primary">Send Feedback</Link>
      </div>
    </div>
  );
}

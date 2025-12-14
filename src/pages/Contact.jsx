import { useState } from "react";
import { sendContactMessage } from "../services/api.js";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", msg: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const [loading, setLoading] = useState(false);

const onSubmit = async (e) => {
  e.preventDefault();

  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    setStatus({ type: "error", msg: "Please fill Name, Email and Message." });
    return;
  }

  try {
    setLoading(true);
    setStatus({ type: "", msg: "" });

    await sendContactMessage(form);

    setStatus({
      type: "success",
      msg: "Thanks! Your message has been sent successfully.",
    });

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
    });
  } catch (err) {
    setStatus({
      type: "error",
      msg: `Failed to send: ${err.message}`,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-5 space-y-2">
        <h2 className="text-xl font-bold">Contact Us</h2>
        <p className="text-gray-600">
          Have a question about an order, delivery, or product? Send us a message
          and we’ll get back to you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form */}
        <div className="card p-5">
          <h3 className="font-semibold mb-4">Send a message</h3>

          {status.msg && (
            <div
              className={`mb-4 rounded-xl px-4 py-3 text-sm ${
                status.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {status.msg}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-600">Full Name *</label>
                <input
                  className="input mt-1"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email *</label>
                <input
                  className="input mt-1"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-600">Phone (optional)</label>
                <input
                  className="input mt-1"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="03xx-xxxxxxx"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Subject</label>
                <select
                  className="input mt-1"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                >
                  <option>General Inquiry</option>
                  <option>Order Issue</option>
                  <option>Delivery / Shipping</option>
                  <option>Return / Refund</option>
                  <option>Product Information</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Message *</label>
              <textarea
                className="input mt-1 min-h-[140px]"
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Write your message here..."
              />
            </div>

            <button className="btn-primary w-full" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Store Info */}
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="font-semibold mb-3">Store Information</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <div>
                <div className="text-gray-500">Email</div>
                <div className="font-medium">support@deptstorepro.com</div>
              </div>

              <div>
                <div className="text-gray-500">Phone</div>
                <div className="font-medium">+92 300 0000000</div>
              </div>

              <div>
                <div className="text-gray-500">Address</div>
                <div className="font-medium">
                  Departmental Store Pro, Main Market, Lahore, Pakistan
                </div>
              </div>

              <div>
                <div className="text-gray-500">Working Hours</div>
                <div className="font-medium">Mon–Sat: 10:00 AM – 10:00 PM</div>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold mb-2">Tip</h3>
            <p className="text-gray-600 text-sm">
              If your issue is about an order, please include your Order ID and
              the email you used during checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

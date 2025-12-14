export default function Privacy() {
  return (
    <div className="space-y-6">
      <div className="card p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold">Privacy Policy</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          This policy explains what information we collect, why we collect it, and how we protect it.
          (For a real store, you should review and customize this text.)
        </p>
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="text-lg font-bold">Information we collect</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li><b>Account details:</b> name, email, password (stored securely in hashed form).</li>
          <li><b>Order details:</b> products, totals, delivery address, and order status.</li>
          <li><b>Support messages:</b> messages you submit from the Contact page.</li>
        </ul>

        <h3 className="text-lg font-bold pt-2">How we use your information</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>To create and manage your account.</li>
          <li>To process orders and provide delivery updates.</li>
          <li>To improve app performance and user experience.</li>
          <li>To respond to support requests.</li>
        </ul>

        <h3 className="text-lg font-bold pt-2">Security</h3>
        <p className="text-gray-700">
          We use token-based authentication and best practices to protect user data.
          However, no system is 100% secure — please use strong passwords and avoid sharing credentials.
        </p>

        <h3 className="text-lg font-bold pt-2">Data sharing</h3>
        <p className="text-gray-700">
          We do not sell personal data. Data may be shared only when needed to complete orders
          (for example with delivery partners) or where required by law.
        </p>

        <h3 className="text-lg font-bold pt-2">Your choices</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>You can update your account details in your profile/account page.</li>
          <li>You can contact support to request deletion of your account data (if applicable).</li>
        </ul>
      </div>

      <div className="text-xs text-gray-500">
        Note: This is a demo policy template. Customize according to your legal requirements.
      </div>
    </div>
  );
}

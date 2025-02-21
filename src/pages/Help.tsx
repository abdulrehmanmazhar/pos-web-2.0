import React from 'react'

function Help() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto py-10 px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
            Help Center
          </h1>
          <p className="text-center mt-2 text-sm">
            Find answers to your questions and learn more about our POS app.
          </p>
        </header>

        {/* About the App */}
        <section id="about" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">About the App</h2>
          <p className="leading-relaxed">
            Our Point-of-Sale (POS) app is designed to streamline your sales,
            inventory, and order management processes. With features such as
            real-time synchronization, detailed analytics, and a user-friendly
            interface, the app empowers businesses to operate efficiently and
            provide excellent customer service.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Desktop app built with Electron.js for robust performance.</li>
            <li>Mobile app for Android built with React Native for flexibility.</li>
            <li>
              Scalable server-side implementation using Node.js and TypeScript.
            </li>
            <li>Real-time analytics and synchronization across platforms.</li>
          </ul>
        </section>

        {/* Terms and Conditions */}
        <section id="terms" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              This software is provided as-is, with lifetime free maintenance
              included for updates requested by the client.
            </li>
            <li>
              Redistribution or modification of the app without prior consent is
              prohibited.
            </li>
            <li>
              Hosting fees and third-party integration costs are the
              responsibility of the client.
            </li>
            <li>
              The app should not be used for unlawful or unethical business
              practices.
            </li>
            <li>
              By using this app, you agree to abide by the terms outlined above.
            </li>
          </ol>
        </section>

        {/* FAQ/Usage Guidelines */}
        <section id="faq" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">FAQs & Usage Guidelines</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">How do I add a new product?</h3>
              <p className="mt-1 text-sm">
                Navigate to the "Products" section, click on "Add Product," fill
                in the required details, and save.
              </p>
            </div>
            <div>
              <h3 className="font-medium">
                Can I access the app on multiple devices?
              </h3>
              <p className="mt-1 text-sm">
                Yes, the app supports multi-device synchronization for seamless
                operations.
              </p>
            </div>
            <div>
              <h3 className="font-medium">
                What should I do if I encounter a technical issue?
              </h3>
              <p className="mt-1 text-sm">
                Contact our support team via the "Contact Us" section for
                assistance.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section id="contact" className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="leading-relaxed">
            If you need further assistance, feel free to reach out to us at:
          </p>
          <ul className="mt-4 space-y-2">
            <li>
            <strong>Email:</strong><a href="mailto:abdurrahman.mern@outlook.com"> abdurrahman.mern@outlook.com</a>

            </li>
            <li>
              <strong>Phone:</strong> +92-317-1507421
            </li>
            <li>
              <strong>Address:</strong> Vanike Tarar, Hafizabad, Pakistan
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Help
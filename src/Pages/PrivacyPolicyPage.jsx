import { CheckCircle, Eye, Lock, Shield } from "lucide-react";

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-green-100">Last Updated: January 2026</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Your privacy is important to us. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information
                when you use our platform. Please read this policy carefully to
                understand our practices regarding your personal data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Personal Information
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We collect personal information that you voluntarily provide
                    when registering, such as your name, email address, phone
                    number, and payment information.
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Usage Data
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We automatically collect certain information when you use
                    our platform, including IP address, browser type, device
                    information, and usage patterns.
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Cookies and Tracking
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We use cookies and similar tracking technologies to enhance
                    your experience, analyze usage patterns, and deliver
                    personalized content.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How We Use Your Information
              </h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>To provide, maintain, and improve our services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    To process transactions and send related information
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    To communicate with you about updates, offers, and support
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>To monitor and analyze usage patterns and trends</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>
                    To detect, prevent, and address technical issues or fraud
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your
                personal information from unauthorized access, alteration,
                disclosure, or destruction. However, no method of transmission
                over the internet is completely secure, and we cannot guarantee
                absolute security.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    SSL Encryption
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Secure Storage
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <Eye className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Regular Audits
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Rights
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You have the right to access, update, or delete your personal
                information at any time. You can also opt out of marketing
                communications and request a copy of your data.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Contact Us About Privacy
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                If you have questions about this Privacy Policy, please contact
                us at privacy@yourplatform.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default PrivacyPolicyPage;

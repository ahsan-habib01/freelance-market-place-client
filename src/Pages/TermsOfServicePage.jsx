import { AlertCircle, FileText } from "lucide-react";

export const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-orange-100">Last Updated: January 2026</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-8">
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Responsibilities</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    You are responsible for maintaining the confidentiality of your account credentials
                  </p>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    You must provide accurate and complete information when creating your account
                  </p>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    You agree not to use the platform for any unlawful or prohibited activities
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptable Use</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                You agree to use our platform only for lawful purposes and in accordance with these Terms. Prohibited activities include but are not limited to:
              </p>
              <div className="bg-red-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                <p className="text-gray-700 dark:text-gray-300">• Violating any applicable laws or regulations</p>
                <p className="text-gray-700 dark:text-gray-300">• Infringing on intellectual property rights</p>
                <p className="text-gray-700 dark:text-gray-300">• Transmitting malicious code or viruses</p>
                <p className="text-gray-700 dark:text-gray-300">• Attempting to gain unauthorized access to our systems</p>
                <p className="text-gray-700 dark:text-gray-300">• Harassing or threatening other users</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                All content on this platform, including text, graphics, logos, and software, is the property of our company or our content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works without explicit permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the platform. Our total liability shall not exceed the amount you paid to us in the past 12 months.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Termination</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to terminate or suspend your account and access to the platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Questions About Terms?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about these Terms of Service, please contact us at legal@yourplatform.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button in the top right corner, fill in your details including name, email, and password, then verify your email address to activate your account."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. All transactions are secured with industry-standard encryption."
    },
    {
      question: "How can I reset my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
    },
    {
      question: "Is my data secure on your platform?",
      answer: "Yes, we use SSL encryption, secure data storage, and regular security audits to protect your information. We comply with international data protection regulations including GDPR."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, we offer 24/7 customer support via email, live chat, and phone. Our average response time is under 2 hours for email and instant for live chat during business hours."
    },
    {
      question: "How do I upgrade my account?",
      answer: "Go to your account settings, click on 'Subscription', select your desired plan, and complete the payment process. Your upgrade will be activated immediately."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export all your data in CSV or JSON format from your account settings. Go to Settings > Data Export and select your preferred format."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-purple-100">Find answers to common questions about our platform</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 dark:bg-gray-800 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default FAQPage;
import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Users,
  Target,
  Award,
  Globe,
  Heart,
  Zap,
} from 'lucide-react';

// About Page Component
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Our Platform
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Empowering businesses and individuals to achieve their goals
              through innovative solutions and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50 dark:bg-gray-700 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We are dedicated to providing cutting-edge solutions that
                simplify complex processes and enhance user experiences. Our
                mission is to bridge the gap between technology and
                accessibility, ensuring that everyone can benefit from digital
                innovation regardless of their technical expertise.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-700 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To become the leading platform that transforms how people
                interact with digital services worldwide. We envision a future
                where technology seamlessly integrates into daily life, making
                processes efficient, transparent, and accessible to all
                communities globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Customer First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our customers are at the heart of everything we do. We listen,
                adapt, and deliver solutions that exceed expectations.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Innovation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We constantly push boundaries and embrace new technologies to
                stay ahead and provide the best solutions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We maintain the highest standards in quality, performance, and
                service delivery in every project we undertake.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                50K+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Active Users
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                98%
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                150+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Our Story
          </h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Founded in 2020, our platform emerged from a simple observation:
              the digital landscape was becoming increasingly complex, yet users
              deserved simple, intuitive experiences. What started as a small
              team of passionate developers has grown into a thriving community
              serving thousands of users worldwide.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our journey has been marked by continuous innovation and
              unwavering commitment to our users. We've weathered challenges,
              celebrated milestones, and remained focused on our core mission of
              making technology accessible and beneficial for everyone.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Today, we're proud to offer a comprehensive platform that combines
              powerful features with user-friendly design. Our success is
              measured not just in numbers, but in the positive impact we've had
              on our users' lives and businesses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;

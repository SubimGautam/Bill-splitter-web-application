"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* <Image 
            src="/images/logo.png" 
            alt="Splitto Logo" 
            width={100} 
            height={50}
            className="w-10 h-10"
          /> */}
          <span className="text-xl font-bold text-gray-900">Splitto</span>
        </div>
        <div className="flex space-x-4">
          <Link 
            href="/authentication/signup" 
            className="px-6 py-3 bg-teal-400 text-white rounded-full font-medium hover:opacity-90 transition-shadow shadow-sm"
          >
            Sign Up
          </Link>
          <Link 
            href="/authentication/login" 
            className="px-6 py-3 border-2 border-teal-400 text-teal-400 rounded-full font-medium hover:opacity-90 transition-shadow"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 flex flex-col gap-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Manage Group<br />
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">Expenses the</span><br />
              Easy Way
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Helps you to organize your Bills
            </p>

            {/* --- Cards Container --- */}
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 mt-8">
              {/* This Month / Last Month Card */}
              <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl shadow-md p-6 flex-1 text-white">
                <h3 className="text-sm font-semibold mb-3 uppercase opacity-90">This Month</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs opacity-90">Total Income</span>
                    <span className="text-lg font-bold">+10,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs opacity-90">Total Expenses</span>
                    <span className="text-lg font-bold">50,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs opacity-90">Balance</span>
                    <span className="text-lg font-bold">35,000</span>
                  </div>
                </div>
              </div>

              {/* Split Bill Card */}
              <div className="bg-[#1A1F2E] text-white rounded-xl shadow-xl p-6 flex-1">
                <h3 className="text-xl font-bold mb-3">Split bill the easy way</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  You can quickly log daily transactions within seconds and organize them into clean, visual categories like Expenses: Food, Shopping or Income: Salary, Gift, making group expense tracking simple and transparent.
                </p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <Image 
                src="/images/landing-illustration.png" 
                alt="Expense Management Illustration"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Split Bill / Tyre Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Illustration */}
          <div className="lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm">
              <Image 
                src="/images/tyre.png" 
                alt="Split Bill Illustration"
                width={350}
                height={350}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Text */}
          <div className="lg:w-1/2 lg:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Split bill <span className="text-teal-400">the easy way</span>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">
              You can quickly log daily transactions within seconds and organize them into clean, 
              visual categories like Expenses: Food, Shopping or Income: Salary, Gift, making 
              group expense tracking simple and transparent.
            </p>
            <Link
              href="/authentication/signup"
              className="px-8 py-3 bg-teal-400 text-white rounded-full font-medium hover:opacity-90 transition-shadow shadow-sm"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image 
              src="/images/logo.png" 
              alt="Splitto Logo" 
              width={30} 
              height={30}
            />
            <span className="text-lg font-bold text-gray-900">Splitto</span>
          </div>
          <div className="text-gray-500 text-sm">
            © 2024 Splitto. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

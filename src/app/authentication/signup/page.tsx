import Image from 'next/image';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image starts at very left edge and is huge */}
      <div className="hidden md:flex md:w-4/5 items-center justify-start -ml-32">
        <div className="w-full h-full flex items-center">
          <Image
            src="/images/bill.png"
            alt="Split Bills Illustration"
            width={1000}
            height={1000}
            style={{ marginLeft: '-300px' }}
          />
        </div>
      </div>

      {/* Right Side - Signup panel at extreme right */}
      <div className="w-full md:w-1/5 min-w-[400px] flex items-center justify-end">
        <div className="w-full max-w-md p-8">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-gray-900 mb-10">Splito</h1>

          {/* Sign Up / Login Buttons */}
          <div className="flex space-x-2 mb-10">
            <Link
              href="/signup"
              className="flex-1 py-3 text-center text-blue-600 font-medium border-b-2 border-blue-600"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="flex-1 py-3 text-center text-gray-600 font-medium hover:text-gray-900"
            >
              Login
            </Link>
          </div>

          {/* Google Button */}
          <button className="w-full py-3 border border-gray-300 rounded-lg mb-6 hover:bg-gray-50">
            <span className="text-gray-700">sign up with google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Username Field - ADDED THIS */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-8">
            <label className="block text-sm text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 mb-8">
            Sign Up
          </button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 font-medium hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full p-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Splito</h1>

        {/* Sign Up / Login Buttons */}
        <div className="flex space-x-2 mb-8">
          <Link
            href="/signup"
            className="flex-1 py-2.5 text-center text-blue-600 font-medium border-b-2 border-blue-600"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="flex-1 py-2.5 text-center text-gray-600 font-medium hover:text-gray-900"
          >
            Login
          </Link>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Google Button */}
          <button className="w-full py-2.5 border border-gray-300 rounded hover:bg-gray-50">
            <span className="text-gray-600">sign up with google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Username Field - ADDED THIS */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-blue-600 text-white py-2.5 rounded font-medium hover:bg-blue-700">
            Sign Up
          </button>

          {/* Login Link */}
          <div className="text-center pt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 font-medium hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Mobile Image */}
        <div className="mt-12">
        </div>
      </div>
    </div>
  );
}
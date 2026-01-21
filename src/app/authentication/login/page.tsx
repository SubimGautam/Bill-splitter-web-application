"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = 'http://localhost:5000/api';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  };
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if already logged in (client-side check)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log("[Login] Already authenticated → redirecting to dashboard", user.email);
        window.location.href = "/dashboard";  // hard redirect
      } catch (e) {
        console.error("[Login] Invalid stored user data – clearing", e);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const text = await response.text();
      console.log("[Login] Server response:", response.status, text);

      let data: ApiResponse;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response from server");
      }

      if (!response.ok || !data.success) {
        throw new Error(data?.message || `Login failed (${response.status})`);
      }

      if (!data.data?.token || !data.data?.user) {
        throw new Error("Missing token or user data in response");
      }

      // Store auth data
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      console.log("[Login] Stored token & user successfully");

      setSuccess(`Welcome back, ${data.data.user.username || "User"}! Redirecting...`);

      // Longer delay to ensure storage is committed + UI shows success
      setTimeout(() => {
        console.log("[Login] Executing hard redirect to /dashboard");
        window.location.href = "/dashboard";  // ← most reliable in Next.js App Router
      }, 1500);

    } catch (err: any) {
      console.error("[Login] Error during login:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image (desktop only) */}
      <div className="hidden lg:flex lg:w-3/5 items-center justify-start">
        <div className="w-full h-full flex items-center">
          <Image
            src="/images/bill.png"
            alt="Split Bills Illustration"
            width={900}
            height={900}
            className="w-auto h-[90vh] object-contain"
            priority
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Splito</span>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <Link
              href="/authentication/signup"
              className="flex-1 py-3 text-center text-gray-500 font-medium hover:text-gray-700"
            >
              Sign Up
            </Link>
            <Link
              href="/authentication/login"
              className="flex-1 py-3 text-center text-emerald-600 font-medium border-b-2 border-emerald-500"
            >
              Log In
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-600 text-sm mb-6">Log in to your account</p>

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              <div className="font-medium">Success!</div>
              <div>{success}</div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              <div className="font-medium">Error</div>
              <div>{error}</div>
            </div>
          )}

          {/* Test credentials hint */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm">
            <div className="font-medium">Test Credentials</div>
            <div className="mt-1 text-xs">
              Email: <code className="bg-blue-100 px-1 rounded">test@gmail.com</code><br />
              Password: <code className="bg-blue-100 px-1 rounded">test123</code>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-black"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-emerald-600 hover:text-emerald-700">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-black"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-600 disabled:bg-emerald-300 text-sm mt-2 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link href="/authentication/signup" className="text-emerald-600 font-medium hover:text-emerald-700">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
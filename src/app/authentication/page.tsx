import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 md:px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">$</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Splito</span>
        </div>

        <div className="flex gap-4">
          <Link 
            href="/authentication/signup" 
            className="px-5 py-2 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Sign Up
          </Link>
          <Link 
            href="/authentication/login" 
            className="px-5 py-2 rounded-md bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Split bills
              <span className="text-emerald-500 block">with ease</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-lg">
              Split expenses with friends, roommates, and family. 
              Keep track of who owes what, settle up quickly, and never 
              have awkward money conversations again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/authentication/signup"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/authentication/login"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                I already have an account
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">✓</span>
                </div>
                <h3 className="font-medium text-gray-900">Easy Tracking</h3>
                <p className="text-sm text-gray-600">Track expenses in real-time</p>
              </div>
              
              <div className="space-y-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">⚡</span>
                </div>
                <h3 className="font-medium text-gray-900">Quick Settlements</h3>
                <p className="text-sm text-gray-600">Settle up with one click</p>
              </div>
              
              <div className="space-y-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">🔒</span>
                </div>
                <h3 className="font-medium text-gray-900">Secure</h3>
                <p className="text-sm text-gray-600">Your data is always safe</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative w-full h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-3xl"></div>
              <div className="absolute inset-8 bg-gradient-to-br from-emerald-100/50 to-white rounded-2xl border border-emerald-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-3xl font-bold">$</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Split Made Simple</h3>
                  <p className="text-gray-600">Try Splito today and simplify your group expenses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Splito. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
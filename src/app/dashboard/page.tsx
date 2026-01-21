"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FaUsers, 
  FaReceipt, 
  FaMoneyBillWave, 
  FaChartPie,
  FaBell,
  FaSearch,
  FaPlus,
  FaCalendarAlt,
  FaCog,
  FaSignOutAlt,
  FaUserCircle
} from 'react-icons/fa';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface Group {
  id: number;
  name: string;
  members: number;
  total: number;
  color: string;
}

interface Expense {
  id: number;
  description: string;
  amount: number;
  person: string;
  date: string;
  group: string;
}

interface Balance {
  person: string;
  amount: number;
  type: 'owes you' | 'you owe' | 'settled';
  avatar: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState('Roommates');

  // Sample data
  const groups: Group[] = [
    { id: 1, name: 'Roommates', members: 3, total: 1200, color: 'bg-emerald-500' },
    { id: 2, name: 'Weekend Trip', members: 5, total: 850, color: 'bg-blue-500' },
    { id: 3, name: 'Office Lunch', members: 8, total: 320, color: 'bg-purple-500' },
    { id: 4, name: 'Family', members: 4, total: 2100, color: 'bg-amber-500' },
  ];

  const recentExpenses: Expense[] = [
    { id: 1, description: 'Grocery shopping', amount: 85.50, person: 'You', date: 'Today', group: 'Roommates' },
    { id: 2, description: 'Dinner at Restaurant', amount: 120.00, person: 'Alex', date: 'Yesterday', group: 'Weekend Trip' },
    { id: 3, description: 'Uber ride', amount: 24.75, person: 'Sam', date: '2 days ago', group: 'Roommates' },
    { id: 4, description: 'Movie tickets', amount: 60.00, person: 'You', date: '3 days ago', group: 'Office Lunch' },
  ];

  const balances: Balance[] = [
    { person: 'Alex', amount: 42.50, type: 'owes you', avatar: 'A' },
    { person: 'Sam', amount: 21.25, type: 'you owe', avatar: 'S' },
    { person: 'Jordan', amount: 15.00, type: 'settled', avatar: 'J' },
  ];

  // ── Replaced authentication logic ───────────────────────────────
  useEffect(() => {
    console.log("[Dashboard] Starting auth check – waiting a bit...");
    let attempts = 0;
    const maxAttempts = 5;
    const tryAuth = () => {
      attempts++;
      console.log(`[Dashboard] Attempt ${attempts}/${maxAttempts}`);
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      console.log(" Token:", token ? "yes" : "MISSING");
      console.log(" UserStr length:", userStr?.length || "MISSING");
      if (!token || !userStr) {
        if (attempts < maxAttempts) {
          console.log(" → Not ready yet – retrying in 500ms");
          setTimeout(tryAuth, 500);
          return;
        }
        console.log("[Dashboard] No auth data after all retries → going to login");
        window.location.replace("/authentication/login");
        return;
      }
      try {
        const parsed = JSON.parse(userStr);
        console.log("[Dashboard] Parsed user:", parsed.email, parsed.username);
        setUser(parsed);
      } catch (e) {
        console.error("[Dashboard] Parse error:", e);
        localStorage.clear();
        window.location.replace("/authentication/login");
      } finally {
        setLoading(false);
      }
    };
    // Give plenty of time for localStorage to be written
    setTimeout(tryAuth, 1200);

    return () => {
      // cleanup not really needed here
    };
  }, []);
  // ────────────────────────────────────────────────────────────────

  const handleLogout = () => {
    console.log("[DASHBOARD] Logout clicked");
    localStorage.clear();
    window.location.replace("/authentication/login");
  };

  const refreshData = () => {
    console.log("🔄 Refreshing dashboard data...");
    alert("Dashboard refreshed!");
  };

  const checkLocalStorage = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    console.log("📦 LocalStorage check:");
    console.log("  Token:", token ? token.substring(0, 20) + "..." : "None");
    console.log("  User:", user ? user.substring(0, 100) + "..." : "None");
    
    alert(`Token: ${token ? "Present" : "Missing"}\nUser: ${user ? "Present" : "Missing"}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("[DASHBOARD] No user after loading finished → safety redirect");
    if (typeof window !== 'undefined') {
      window.location.replace("/authentication/login");
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">$</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Splito</span>
              </div>
              
              <div className="hidden md:flex space-x-6">
                <Link href="/dashboard" className="text-emerald-600 font-medium border-b-2 border-emerald-500 pb-1">
                  Dashboard
                </Link>
                <Link href="/groups" className="text-gray-600 hover:text-emerald-600 font-medium">
                  Groups
                </Link>
                <Link href="/expenses" className="text-gray-600 hover:text-emerald-600 font-medium">
                  Expenses
                </Link>
                <Link href="/activity" className="text-gray-600 hover:text-emerald-600 font-medium">
                  Activity
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={refreshData}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Refresh"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <FaSearch className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <FaBell className="text-gray-500" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center cursor-pointer">
                    <span className="text-emerald-600 font-bold">
                      {user.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user.username}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <button 
                        onClick={checkLocalStorage}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Debug Info
                      </button>
                      <button 
                        onClick={refreshData}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Refresh Data
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <FaSignOutAlt className="w-3 h-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-gray-700 font-medium">{user.username}</p>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Welcome back, {user.username}! 👋
              </h1>
              <p className="text-gray-600 mt-2">Here's your expense overview</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={checkLocalStorage}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200"
              >
                Debug
              </button>
              <button 
                onClick={handleLogout}
                className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200 flex items-center gap-1"
              >
                <FaSignOutAlt className="w-3 h-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">$+63.75</p>
                <p className="text-xs text-emerald-600 mt-1">You are owed</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FaMoneyBillWave className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Groups</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">4</p>
                <p className="text-xs text-blue-600 mt-1">Across all groups</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaUsers className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">$485.25</p>
                <p className="text-xs text-purple-600 mt-1">Total spent</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaChartPie className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                <p className="text-xs text-amber-600 mt-1">Awaiting payment</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <FaReceipt className="text-amber-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Groups & Recent Expenses */}
          <div className="lg:col-span-2 space-y-8">
            {/* Groups Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Groups</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm">
                  <FaPlus className="w-3 h-3" />
                  New Group
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map((group) => (
                  <div 
                    key={group.id}
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${activeGroup === group.name ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                    onClick={() => setActiveGroup(group.name)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${group.color} rounded-lg flex items-center justify-center`}>
                          <FaUsers className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{group.name}</h3>
                          <p className="text-sm text-gray-500">{group.members} members</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-gray-900">${group.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last activity: Today</span>
                      <span className="text-emerald-600 font-medium">View →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Expenses */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Expenses</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                  View all →
                </button>
              </div>
              
              <div className="space-y-4">
                {recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FaReceipt className="text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{expense.description}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span className="px-2 py-0.5 bg-gray-100 rounded">{expense.group}</span>
                          <span>•</span>
                          <span className={expense.person === 'You' ? 'text-emerald-600 font-medium' : ''}>
                            {expense.person}
                          </span>
                          <span>•</span>
                          <span>{expense.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${expense.amount.toFixed(2)}</p>
                      <p className={`text-sm ${expense.person === 'You' ? 'text-emerald-600' : 'text-gray-500'}`}>
                        {expense.person === 'You' ? 'You paid' : 'You owe'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 border border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:text-emerald-600 text-gray-500 flex items-center justify-center gap-2">
                <FaPlus />
                Add new expense
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Balances */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Balances</h2>
              
              <div className="space-y-4">
                {balances.map((balance, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${balance.type === 'owes you' ? 'bg-emerald-100' : balance.type === 'you owe' ? 'bg-red-100' : 'bg-gray-100'}`}>
                        <span className={`font-bold ${balance.type === 'owes you' ? 'text-emerald-600' : balance.type === 'you owe' ? 'text-red-600' : 'text-gray-600'}`}>
                          {balance.avatar}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{balance.person}</h4>
                        <p className={`text-sm ${balance.type === 'owes you' ? 'text-emerald-600' : balance.type === 'you owe' ? 'text-red-600' : 'text-gray-500'}`}>
                          {balance.type === 'settled' ? 'All settled up' : balance.type}
                        </p>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${balance.type === 'owes you' ? 'text-emerald-600' : balance.type === 'you owe' ? 'text-red-600' : 'text-gray-900'}`}>
                      {balance.type === 'owes you' ? '+' : balance.type === 'you owe' ? '-' : ''}${balance.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600">
                Settle Up
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-emerald-500 hover:text-emerald-600 hover:shadow transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <FaPlus className="text-emerald-600" />
                    </div>
                    <span>Add expense</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-emerald-500 hover:text-emerald-600 hover:shadow transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaUsers className="text-blue-600" />
                    </div>
                    <span>Create group</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-emerald-500 hover:text-emerald-600 hover:shadow transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FaCalendarAlt className="text-purple-600" />
                    </div>
                    <span>View report</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-emerald-500 hover:text-emerald-600 hover:shadow transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FaCog className="text-gray-600" />
                    </div>
                    <span>Settings</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>

            {/* User Info Card */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                  <FaUserCircle className="text-emerald-600 text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{user.username}</h3>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Role</span>
                  <span className="font-medium">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Member since</span>
                  <span className="font-medium">Today</span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full mt-4 py-2 border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 flex items-center justify-center gap-2"
              >
                <FaSignOutAlt className="w-3 h-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Debug Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Logged in as: <span className="font-medium text-gray-700">{user.email}</span>
            </div>
            <button
              onClick={() => {
                console.log("🔍 Current user:", user);
                console.log("🔑 Token:", localStorage.getItem("token")?.substring(0, 20) + "...");
              }}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200"
            >
              Console Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
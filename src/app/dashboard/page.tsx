"use client";

import { useEffect, useState } from 'react';
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
    { id: 1, name: 'Roommates', members: 3, total: 1200, color: '#10b981' },
    { id: 2, name: 'Weekend Trip', members: 5, total: 850, color: '#3b82f6' },
    { id: 3, name: 'Office Lunch', members: 8, total: 320, color: '#8b5cf6' },
    { id: 4, name: 'Family', members: 4, total: 2100, color: '#f59e0b' },
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

  // Authentication logic
  useEffect(() => {
    console.log("[Dashboard] Starting auth check...");
    
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      
      console.log("Token:", token ? "yes" : "MISSING");
      console.log("User:", userStr ? "yes" : "MISSING");
      
      if (!token || !userStr) {
        console.log("[Dashboard] No auth data → going to login");
        window.location.href = "/authentication/login";
        return;
      }
      
      try {
        const parsed = JSON.parse(userStr);
        console.log("[Dashboard] Parsed user:", parsed.email, parsed.username);
        setUser(parsed);
        setLoading(false);
      } catch (e) {
        console.error("[Dashboard] Parse error:", e);
        localStorage.clear();
        window.location.href = "/authentication/login";
      }
    };
    
    // Check auth with a delay
    setTimeout(checkAuth, 100);
  }, []);

  const handleLogout = () => {
    console.log("[DASHBOARD] Logout clicked");
    localStorage.clear();
    window.location.href = "/authentication/login";
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

  // Inline styles
  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
    },
    nav: {
      backgroundColor: "#fff",
      borderBottom: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    navInner: {
      padding: "1rem 1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1280px",
      margin: "0 auto",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    logoIcon: {
      width: "2rem",
      height: "2rem",
      backgroundColor: "#10b981",
      borderRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#111827",
    },
    navLinks: {
      display: "none",
      gap: "1.5rem",
    },
    navLink: {
      color: "#4b5563",
      fontSize: "0.875rem",
      fontWeight: 500,
      textDecoration: "none",
    },
    navLinkActive: {
      color: "#10b981",
      borderBottom: "2px solid #10b981",
      paddingBottom: "0.25rem",
    },
    iconButton: {
      padding: "0.5rem",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    userAvatar: {
      width: "2rem",
      height: "2rem",
      backgroundColor: "#d1fae5",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    mainContent: {
      padding: "2rem 1rem",
      maxWidth: "1280px",
      margin: "0 auto",
    },
    welcomeHeader: {
      marginBottom: "2rem",
    },
    welcomeTitle: {
      fontSize: "1.875rem",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "0.5rem",
    },
    welcomeSubtitle: {
      color: "#4b5563",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "1.5rem",
      marginBottom: "2rem",
    },
    statCard: {
      backgroundColor: "#fff",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    cardTitle: {
      fontSize: "0.875rem",
      color: "#6b7280",
      marginBottom: "0.5rem",
    },
    cardValue: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "0.25rem",
    },
    cardSubtitle: {
      fontSize: "0.75rem",
      color: "#10b981",
    },
    iconContainer: {
      width: "3rem",
      height: "3rem",
      borderRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "2rem",
    },
    sectionCard: {
      backgroundColor: "#fff",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#111827",
    },
    primaryButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      backgroundColor: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: 500,
      cursor: "pointer",
    },
    groupsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "1rem",
    },
    groupCard: {
      border: "1px solid #e5e7eb",
      borderRadius: "0.5rem",
      padding: "1rem",
      cursor: "pointer",
    },
    groupCardActive: {
      borderColor: "#10b981",
      backgroundColor: "#f0fdf4",
    },
    expenseItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: "1rem",
      borderBottom: "1px solid #f3f4f6",
    },
    balanceItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.5rem 0",
    },
    quickActionButton: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.75rem",
      border: "1px solid #e5e7eb",
      borderRadius: "0.5rem",
      backgroundColor: "transparent",
      cursor: "pointer",
    },
    userInfoCard: {
      background: "linear-gradient(to right, #f0fdf4, #eff6ff)",
      border: "1px solid #bbf7d0",
      borderRadius: "0.75rem",
      padding: "1.5rem",
    },
  };

  // Media queries for responsive design
  const mediaQueries = `
    @media (min-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      .nav-links {
        display: flex !important;
      }
    }
    @media (min-width: 1024px) {
      .stats-grid {
        grid-template-columns: repeat(4, 1fr) !important;
      }
      .content-grid {
        grid-template-columns: 2fr 1fr !important;
      }
      .groups-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
  `;

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "4rem",
            height: "4rem",
            border: "4px solid #10b981",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto"
          }}></div>
          <p style={{ marginTop: "1rem", color: "#6b7280" }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <style jsx global>{mediaQueries}</style>
      <div style={styles.container}>
        {/* Top Navigation */}
        <nav style={styles.nav}>
          <div style={styles.navInner}>
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <div style={styles.logoContainer}>
                <div style={styles.logoIcon}>
                  <span style={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}>$</span>
                </div>
                <span style={styles.logoText}>Splito</span>
              </div>
              
              <div style={{ ...styles.navLinks, display: "none" }} className="nav-links">
                <a href="/dashboard" style={{ ...styles.navLink, ...styles.navLinkActive }}>
                  Dashboard
                </a>
                <a href="/groups" style={styles.navLink}>
                  Groups
                </a>
                <a href="/expenses" style={styles.navLink}>
                  Expenses
                </a>
                <a href="/activity" style={styles.navLink}>
                  Activity
                </a>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button 
                onClick={refreshData}
                style={styles.iconButton}
                title="Refresh"
              >
                <svg style={{ width: "1.25rem", height: "1.25rem", color: "#6b7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button style={styles.iconButton}>
                <FaSearch style={{ width: "1.25rem", height: "1.25rem", color: "#6b7280" }} />
              </button>
              <button style={{ ...styles.iconButton, position: "relative" }}>
                <FaBell style={{ width: "1.25rem", height: "1.25rem", color: "#6b7280" }} />
                <span style={{
                  position: "absolute",
                  top: "-0.25rem",
                  right: "-0.25rem",
                  width: "0.5rem",
                  height: "0.5rem",
                  backgroundColor: "#ef4444",
                  borderRadius: "50%"
                }}></span>
              </button>
              <div style={{ position: "relative" }}>
                <div style={styles.userAvatar}>
                  <span style={{ color: "#10b981", fontWeight: "bold" }}>
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div style={styles.mainContent}>
          {/* Welcome Header */}
          <div style={styles.welcomeHeader}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={styles.welcomeTitle}>
                  Welcome back, {user.username}! 👋
                </h1>
                <p style={styles.welcomeSubtitle}>Here's your expense overview</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button 
                  onClick={checkLocalStorage}
                  style={{
                    padding: "0.375rem 0.75rem",
                    backgroundColor: "#f3f4f6",
                    color: "#4b5563",
                    fontSize: "0.875rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Debug
                </button>
                <button 
                  onClick={handleLogout}
                  style={{
                    padding: "0.375rem 0.75rem",
                    backgroundColor: "#fee2e2",
                    color: "#dc2626",
                    fontSize: "0.875rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <FaSignOutAlt style={{ width: "0.75rem", height: "0.75rem" }} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ ...styles.statsGrid }} className="stats-grid">
            <div style={styles.statCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={styles.cardTitle}>Total Balance</p>
                  <p style={styles.cardValue}>$+63.75</p>
                  <p style={styles.cardSubtitle}>You are owed</p>
                </div>
                <div style={{ ...styles.iconContainer, backgroundColor: "#d1fae5" }}>
                  <FaMoneyBillWave style={{ color: "#10b981", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={styles.cardTitle}>Active Groups</p>
                  <p style={styles.cardValue}>4</p>
                  <p style={{ ...styles.cardSubtitle, color: "#3b82f6" }}>Across all groups</p>
                </div>
                <div style={{ ...styles.iconContainer, backgroundColor: "#dbeafe" }}>
                  <FaUsers style={{ color: "#3b82f6", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={styles.cardTitle}>This Month</p>
                  <p style={styles.cardValue}>$485.25</p>
                  <p style={{ ...styles.cardSubtitle, color: "#8b5cf6" }}>Total spent</p>
                </div>
                <div style={{ ...styles.iconContainer, backgroundColor: "#f3e8ff" }}>
                  <FaChartPie style={{ color: "#8b5cf6", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={styles.cardTitle}>Pending</p>
                  <p style={styles.cardValue}>2</p>
                  <p style={{ ...styles.cardSubtitle, color: "#f59e0b" }}>Awaiting payment</p>
                </div>
                <div style={{ ...styles.iconContainer, backgroundColor: "#fef3c7" }}>
                  <FaReceipt style={{ color: "#f59e0b", fontSize: "1.5rem" }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ ...styles.contentGrid }} className="content-grid">
            {/* Left Column - Groups & Recent Expenses */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Groups Section */}
              <div style={styles.sectionCard}>
                <div style={styles.sectionHeader}>
                  <h2 style={styles.sectionTitle}>Your Groups</h2>
                  <button style={styles.primaryButton}>
                    <FaPlus style={{ width: "0.75rem", height: "0.75rem" }} />
                    New Group
                  </button>
                </div>
                
                <div style={{ ...styles.groupsGrid }} className="groups-grid">
                  {groups.map((group) => (
                    <div 
                      key={group.id}
                      style={{
                        ...styles.groupCard,
                        ...(activeGroup === group.name ? styles.groupCardActive : {}),
                        borderColor: activeGroup === group.name ? "#10b981" : "#e5e7eb",
                        backgroundColor: activeGroup === group.name ? "#f0fdf4" : "white",
                      }}
                      onClick={() => setActiveGroup(group.name)}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            backgroundColor: group.color,
                            borderRadius: "0.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <FaUsers style={{ color: "white" }} />
                          </div>
                          <div>
                            <h3 style={{ fontWeight: 500, color: "#111827" }}>{group.name}</h3>
                            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>{group.members} members</p>
                          </div>
                        </div>
                        <span style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#111827" }}>${group.total.toLocaleString()}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
                        <span style={{ color: "#6b7280" }}>Last activity: Today</span>
                        <span style={{ color: "#10b981", fontWeight: 500 }}>View →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Expenses */}
              <div style={styles.sectionCard}>
                <div style={styles.sectionHeader}>
                  <h2 style={styles.sectionTitle}>Recent Expenses</h2>
                  <button style={{ ...styles.navLink, border: "none", backgroundColor: "transparent", cursor: "pointer" }}>
                    View all →
                  </button>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {recentExpenses.map((expense) => (
                    <div key={expense.id} style={styles.expenseItem}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          backgroundColor: "#f3f4f6",
                          borderRadius: "0.5rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <FaReceipt style={{ color: "#6b7280" }} />
                        </div>
                        <div>
                          <h4 style={{ fontWeight: 500, color: "#111827" }}>{expense.description}</h4>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.875rem", color: "#6b7280", marginTop: "0.25rem" }}>
                            <span style={{ padding: "0.125rem 0.5rem", backgroundColor: "#f3f4f6", borderRadius: "0.25rem" }}>{expense.group}</span>
                            <span>•</span>
                            <span style={expense.person === 'You' ? { color: "#10b981", fontWeight: 500 } : {}}>
                              {expense.person}
                            </span>
                            <span>•</span>
                            <span>{expense.date}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontWeight: "bold", color: "#111827" }}>${expense.amount.toFixed(2)}</p>
                        <p style={{ fontSize: "0.875rem", color: expense.person === 'You' ? "#10b981" : "#6b7280" }}>
                          {expense.person === 'You' ? 'You paid' : 'You owe'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px dashed #d1d5db",
                  borderRadius: "0.5rem",
                  backgroundColor: "transparent",
                  color: "#6b7280",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "1.5rem",
                  cursor: "pointer",
                }}>
                  <FaPlus />
                  Add new expense
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Balances */}
              <div style={styles.sectionCard}>
                <h2 style={styles.sectionTitle}>Balances</h2>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  {balances.map((balance, index) => (
                    <div key={index} style={styles.balanceItem}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: balance.type === 'owes you' ? "#d1fae5" : balance.type === 'you owe' ? "#fee2e2" : "#f3f4f6",
                        }}>
                          <span style={{
                            fontWeight: "bold",
                            color: balance.type === 'owes you' ? "#10b981" : balance.type === 'you owe' ? "#dc2626" : "#6b7280",
                          }}>
                            {balance.avatar}
                          </span>
                        </div>
                        <div>
                          <h4 style={{ fontWeight: 500, color: "#111827" }}>{balance.person}</h4>
                          <p style={{
                            fontSize: "0.875rem",
                            color: balance.type === 'owes you' ? "#10b981" : balance.type === 'you owe' ? "#dc2626" : "#6b7280",
                          }}>
                            {balance.type === 'settled' ? 'All settled up' : balance.type}
                          </p>
                        </div>
                      </div>
                      <div style={{
                        fontSize: "1.125rem",
                        fontWeight: "bold",
                        color: balance.type === 'owes you' ? "#10b981" : balance.type === 'you owe' ? "#dc2626" : "#111827",
                      }}>
                        {balance.type === 'owes you' ? '+' : balance.type === 'you owe' ? '-' : ''}${balance.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <button style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}>
                  Settle Up
                </button>
              </div>

              {/* Quick Actions */}
              <div style={styles.sectionCard}>
                <h2 style={styles.sectionTitle}>Quick Actions</h2>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <button style={styles.quickActionButton}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "2rem", height: "2rem", backgroundColor: "#d1fae5", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FaPlus style={{ color: "#10b981" }} />
                      </div>
                      <span>Add expense</span>
                    </div>
                    <span style={{ color: "#9ca3af" }}>→</span>
                  </button>

                  <button style={styles.quickActionButton}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "2rem", height: "2rem", backgroundColor: "#dbeafe", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FaUsers style={{ color: "#3b82f6" }} />
                      </div>
                      <span>Create group</span>
                    </div>
                    <span style={{ color: "#9ca3af" }}>→</span>
                  </button>

                  <button style={styles.quickActionButton}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "2rem", height: "2rem", backgroundColor: "#f3e8ff", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FaCalendarAlt style={{ color: "#8b5cf6" }} />
                      </div>
                      <span>View report</span>
                    </div>
                    <span style={{ color: "#9ca3af" }}>→</span>
                  </button>

                  <button style={styles.quickActionButton}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: "2rem", height: "2rem", backgroundColor: "#f3f4f6", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FaCog style={{ color: "#6b7280" }} />
                      </div>
                      <span>Settings</span>
                    </div>
                    <span style={{ color: "#9ca3af" }}>→</span>
                  </button>
                </div>
              </div>

              {/* User Info Card */}
              <div style={styles.userInfoCard}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ width: "3rem", height: "3rem", backgroundColor: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}>
                    <FaUserCircle style={{ color: "#10b981", fontSize: "2rem" }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: "bold", color: "#111827" }}>{user.username}</h3>
                    <p style={{ fontSize: "0.875rem", color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Status</span>
                    <span style={{ padding: "0.125rem 0.5rem", backgroundColor: "#d1fae5", color: "#047857", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 500 }}>
                      Active
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Role</span>
                    <span style={{ fontWeight: 500 }}>{user.role}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Member since</span>
                    <span style={{ fontWeight: 500 }}>Today</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #10b981",
                    color: "#10b981",
                    borderRadius: "0.5rem",
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <FaSignOutAlt style={{ width: "0.75rem", height: "0.75rem" }} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Debug Footer */}
          <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                Logged in as: <span style={{ fontWeight: 500, color: "#374151" }}>{user.email}</span>
              </div>
              <button
                onClick={() => {
                  console.log("🔍 Current user:", user);
                  console.log("🔑 Token:", localStorage.getItem("token")?.substring(0, 20) + "...");
                }}
                style={{
                  padding: "0.375rem 0.75rem",
                  backgroundColor: "#f3f4f6",
                  color: "#4b5563",
                  fontSize: "0.875rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Console Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { ReportStatus, ReportType, Role } from "@prisma/client";
import {
  Activity,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  UserPlus,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Line, Doughnut, Radar } from 'react-chartjs-2';
import { BannerAd } from '@/components/ads/AdPlacements';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
);

interface Report {
  id: string;
  title: string;
  type: ReportType;
  status: ReportStatus;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  role: Role;
  createdAt: string;
}

interface DashboardStats {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  rejected: number;
  byType: Partial<Record<ReportType, number>>;
  users: {
    total: number;
    admins: number;
    moderators: number;
    regular: number;
    newThisMonth: number;
    activeToday: number;
  };
}

export default function Dashboard() {
  const { status } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
    byType: {},
    users: {
      total: 0,
      admins: 0,
      moderators: 0,
      regular: 0,
      newThisMonth: 0,
      activeToday: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  const calculateUserStats = useCallback((userData: User[]) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const userStats = {
      total: userData.length,
      admins: 0,
      moderators: 0,
      regular: 0,
      newThisMonth: 0,
      activeToday: 0,
    };

    userData.forEach((user) => {
      // Count by role
      switch (user.role) {
        case Role.ADMIN:
          userStats.admins++;
          break;
        case Role.MODERATOR:
          userStats.moderators++;
          break;
        default:
          userStats.regular++;
      }

      // Count new users this month
      const createdDate = new Date(user.createdAt);
      if (createdDate.getMonth() === thisMonth && createdDate.getFullYear() === thisYear) {
        userStats.newThisMonth++;
      }
    });

    setStats(prev => ({ ...prev, users: userStats }));
  }, []);

  const calculateStats = useCallback((reportData: Report[]) => {
    const newStats: DashboardStats = {
      total: reportData.length,
      pending: 0,
      inProgress: 0,
      resolved: 0,
      rejected: 0,
      byType: {},
      users: stats.users,
    };

    // Initialize byType with all possible report types
    Object.values(ReportType).forEach(type => {
      newStats.byType[type] = 0;
    });

    reportData.forEach((report) => {
      switch (report.status) {
        case ReportStatus.PENDING:
          newStats.pending++;
          break;
        case ReportStatus.IN_PROGRESS:
          newStats.inProgress++;
          break;
        case ReportStatus.RESOLVED:
          newStats.resolved++;
          break;
        case ReportStatus.DISMISSED:
          newStats.rejected++;
          break;
      }

      // Count by type
      if (report.type) {
        newStats.byType[report.type] = (newStats.byType[report.type] || 0) + 1;
      }
    });

    setStats(newStats);
  }, [stats.users]);

  const fetchReports = useCallback(async () => {
    try {
      const response = await fetch('/api/reports');
      if (response.ok) {
        const data = await response.json();
        setReports(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error instanceof Error ? error.message : "Unknown error");
    }
  }, [calculateStats]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        calculateUserStats(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [calculateUserStats]);

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/auth/signin";
      return;
    }

    if (status === "authenticated") {
      fetchReports();
      fetchUsers();
      const interval = setInterval(() => {
        fetchReports();
        fetchUsers();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [status, fetchReports, fetchUsers]);

  // Group reports by month for the line chart
  const getReportsByMonth = () => {
    const monthlyData = new Array(12).fill(0);
    reports.forEach(report => {
      const month = new Date(report.createdAt).getMonth();
      monthlyData[month]++;
    });
    return monthlyData;
  };

  // Line chart data - Reports over time
  const reportsOverTime = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Reports',
        data: getReportsByMonth(),
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Doughnut chart data - Status distribution
  const statusDistribution = {
    labels: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
    datasets: [
      {
        data: [stats.pending, stats.inProgress, stats.resolved, stats.rejected],
        backgroundColor: [
          'rgba(234, 179, 8, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(234, 179, 8)',
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Radar chart data - Type comparison
  const typeComparison = {
    labels: Object.keys(stats.byType),
    datasets: [
      {
        label: 'Number of Reports',
        data: Object.values(stats.byType),
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderColor: 'rgb(147, 51, 234)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(147, 51, 234)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(147, 51, 234)',
      },
    ],
  };

  // Get user registrations by month
  const getUserRegistrationsByMonth = () => {
    const monthlyData = new Array(12).fill(0);
    users.forEach(user => {
      const month = new Date(user.createdAt).getMonth();
      monthlyData[month]++;
    });
    return monthlyData;
  };

  // User registration chart data
  const userRegistrations = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: getUserRegistrationsByMonth(),
        fill: true,
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // User roles distribution chart data
  const userRolesDistribution = {
    labels: ['Admins', 'Moderators', 'Regular Users'],
    datasets: [
      {
        data: [stats.users.admins, stats.users.moderators, stats.users.regular],
        backgroundColor: [
          'rgba(249, 115, 22, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: [
          'rgb(249, 115, 22)',
          'rgb(147, 51, 234)',
          'rgb(59, 130, 246)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  };

  const radarOptions = {
    ...chartOptions,
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <BannerAd />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stats Cards */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Total Reports</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Pending</p>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Resolved</p>
              <p className="text-2xl font-bold text-white">{stats.resolved}</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Rejected</p>
              <p className="text-2xl font-bold text-white">{stats.rejected}</p>
            </div>
          </div>
          </div>

        {/* Add User Stats Cards */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{stats.users.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-4">
                  <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <UserPlus className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">New Users This Month</p>
              <p className="text-2xl font-bold text-white">{stats.users.newThisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Reports Over Time</h2>
          <div className="h-[300px]">
            <Line data={reportsOverTime} options={chartOptions} />
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Report Types Distribution</h2>
          <div className="h-[300px]">
            <Radar data={typeComparison} options={radarOptions} />
          </div>
                  </div>

        {/* Doughnut Chart */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Status Distribution</h2>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut 
              data={statusDistribution} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right' as const,
                    labels: {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  },
                },
              }} 
            />
                      </div>
                      </div>

        {/* User Registration Trend */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">User Registrations</h2>
          <div className="h-[300px]">
            <Line data={userRegistrations} options={chartOptions} />
                      </div>
                  </div>

        {/* User Roles Distribution */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">User Roles Distribution</h2>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut 
              data={userRolesDistribution} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right' as const,
                    labels: {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  },
                },
              }} 
            />
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Users</h2>
          <div className="space-y-4 h-[300px] overflow-auto">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-white">{user.name}</h3>
                  <p className="text-xs text-neutral-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.role === 'ADMIN' ? 'bg-orange-500/10 text-orange-500' :
                  user.role === 'MODERATOR' ? 'bg-purple-500/10 text-purple-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  {user.role}
                </span>
            </div>
          ))}
            </div>
        </div>
      </div>
    </div>
  );
}

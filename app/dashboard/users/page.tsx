"use client";

import { useEffect, useState } from "react";
import { User, Role } from "@prisma/client";
import { Users, Shield, UserCheck, UserX, Edit2, Trash2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<Role | "ALL">("ALL");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: Role.USER,
  });

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(roleFilter === "ALL" ? data : data.filter((u: User) => u.role === roleFilter));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      
      if (response.ok) {
        setShowAddModal(false);
        setNewUser({ name: "", email: "", password: "", role: Role.USER });
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.error || "Error creating user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.error || "Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getRoleColor = (role: Role) => {
    const colors = {
      ADMIN: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
      MODERATOR: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      USER: "bg-green-500/10 text-green-500 border border-green-500/20",
    };
    return colors[role];
  };

  // Calculate stats
  const stats = {
    totalUsers: users.length,
    admins: users.filter(u => u.role === "ADMIN").length,
    moderators: users.filter(u => u.role === "MODERATOR").length,
    regularUsers: users.filter(u => u.role === "USER").length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <div className="flex items-center gap-4">
          <select
            className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as Role | "ALL")}
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="MODERATOR">Moderator</option>
            <option value="USER">User</option>
          </select>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="h-5 w-5" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats.totalUsers, icon: Users, color: "blue" },
          { label: "Admins", value: stats.admins, icon: Shield, color: "purple" },
          { label: "Moderators", value: stats.moderators, icon: UserCheck, color: "blue" },
          { label: "Regular Users", value: stats.regularUsers, icon: UserX, color: "green" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800"
          >
            <div className="flex items-center gap-4">
              <div className={`bg-${stat.color}-500/10 p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
              </div>
              <div>
                <p className="text-sm text-neutral-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">Name</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">Email</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">Role</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">Joined Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="py-4 px-6 text-sm text-neutral-300">{user.name}</td>
                  <td className="py-4 px-6 text-sm text-neutral-300">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-300">
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/users/${user.id}`)}
                        className="text-blue-500 hover:text-blue-400 transition-colors"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Add New User</h2>
            <form onSubmit={createUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as Role })}
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {Object.values(Role).map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-800 rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
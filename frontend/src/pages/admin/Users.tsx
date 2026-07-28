import { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  Eye,
  Pencil,
  Trash2,
  Shield,
  UserCheck,
  Users as UsersIcon,
} from "lucide-react";

interface User {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  role: "Super Admin" | "Admin" | "Editor" | "Staff";
  department: string;
  status: "Active" | "Inactive";
  joined: string;
  lastLogin: string;
  avatar: string;
}

const demoUsers: User[] = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Rahul Sharma",
    email: "rahul@niscpr.res.in",
    phone: "9876543210",
    role: "Super Admin",
    department: "Administration",
    status: "Active",
    joined: "12 Jan 2025",
    lastLogin: "Today",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Priya Singh",
    email: "priya@niscpr.res.in",
    phone: "9876501234",
    role: "Admin",
    department: "Publications",
    status: "Active",
    joined: "18 Mar 2025",
    lastLogin: "Yesterday",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Amit Verma",
    email: "amit@niscpr.res.in",
    phone: "9811122233",
    role: "Editor",
    department: "Journals",
    status: "Inactive",
    joined: "08 Jul 2025",
    lastLogin: "5 days ago",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Sneha Kapoor",
    email: "sneha@niscpr.res.in",
    phone: "9898989898",
    role: "Staff",
    department: "Accounts",
    status: "Active",
    joined: "02 Feb 2026",
    lastLogin: "Today",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
];

export default function Users() {
  const [users] = useState<User[]>(demoUsers);

  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.employeeId.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (u) => u.status === "Active"
  ).length;

  const adminUsers = users.filter(
    (u) => u.role === "Super Admin" || u.role === "Admin"
  ).length;

  const inactiveUsers = users.filter(
    (u) => u.status === "Inactive"
  ).length;

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#003366]">
            User Management
          </h1>

          <p className="mt-2 text-gray-500">
            Manage administrators, editors and staff members.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#003366] px-5 py-3 text-white transition hover:bg-[#002855]">

          <UserPlus size={18} />

          Add User

        </button>

      </div>
          {/* Search & Filters */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-4">

          <div className="relative lg:col-span-2">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name, email or employee ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition focus:border-[#003366]"
            />

          </div>

          <select className="rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]">

            <option>All Roles</option>
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Staff</option>

          </select>

          <select className="rounded-xl border px-4 py-3 outline-none transition focus:border-[#003366]">

            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>

          </select>

        </div>

      </div>

      {/* Users Table */}

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr className="text-left text-sm font-semibold text-[#003366]">

                <th className="px-6 py-4">
                  User
                </th>

                <th className="px-6 py-4">
                  Department
                </th>

                <th className="px-6 py-4">
                  Role
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Last Login
                </th>

                <th className="px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y">
                            {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="transition hover:bg-gray-50"
                >

                  {/* User */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-12 w-12 rounded-full border object-cover"
                      />

                      <div>

                        <h3 className="font-semibold text-[#003366]">
                          {user.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {user.email}
                        </p>

                        <p className="text-xs text-gray-400">
                          {user.employeeId}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Department */}

                  <td className="px-6 py-5">

                    <p className="font-medium">
                      {user.department}
                    </p>

                    <p className="text-sm text-gray-500">
                      {user.phone}
                    </p>

                  </td>

                  {/* Role */}

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === "Super Admin"
                          ? "bg-red-100 text-red-700"
                          : user.role === "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "Editor"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>

                  </td>

                  {/* Last Login */}

                  <td className="px-6 py-5">

                    <p className="font-medium">
                      {user.lastLogin}
                    </p>

                    <p className="text-sm text-gray-500">
                      Joined {user.joined}
                    </p>

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex gap-2">

                      <button className="rounded-xl bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100">

                        <Eye size={18} />

                      </button>

                      <button className="rounded-xl bg-yellow-50 p-2 text-yellow-600 transition hover:bg-yellow-100">

                        <Pencil size={18} />

                      </button>

                      <button className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100">

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
          {/* Pagination */}

      <div className="flex flex-col gap-4 rounded-3xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

        <p className="text-sm text-gray-500">
          Showing
          <span className="mx-1 font-semibold text-[#003366]">
            {filteredUsers.length}
          </span>
          of
          <span className="mx-1 font-semibold text-[#003366]">
            {users.length}
          </span>
          users
        </p>

        <div className="flex items-center gap-2">

          <button className="rounded-xl border px-4 py-2 transition hover:bg-gray-50">
            Previous
          </button>

          <button className="rounded-xl bg-[#003366] px-4 py-2 text-white">
            1
          </button>

          <button className="rounded-xl border px-4 py-2 transition hover:bg-gray-50">
            Next
          </button>

        </div>

      </div>

      {/* Quick Summary */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <UsersIcon
            size={28}
              className="text-[#003366]"
            />

            <div>

              <h3 className="font-semibold text-[#003366]">
                Registered Users
              </h3>

              <p className="mt-1 text-2xl font-bold">
                {totalUsers}
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <UserCheck
              size={28}
              className="text-green-600"
            />

            <div>

              <h3 className="font-semibold text-[#003366]">
                Active Accounts
              </h3>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {activeUsers}
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <Shield
              size={28}
              className="text-purple-600"
            />

            <div>

              <h3 className="font-semibold text-[#003366]">
                Admin Users
              </h3>

              <p className="mt-1 text-2xl font-bold text-purple-600">
                {adminUsers}
              </p>

            </div>

          </div>

        </div>

      </div>
          {/* Empty State */}

      {filteredUsers.length === 0 && (

        <div className="rounded-3xl border border-dashed bg-white py-16 text-center shadow-sm">

          <UsersIcon
            size={56}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-5 text-2xl font-semibold text-[#003366]">
            No Users Found
          </h3>

          <p className="mt-2 text-gray-500">
            Try changing your search criteria or add a new user.
          </p>

        </div>

      )}

      {/* Footer */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <div>

            <h3 className="font-semibold text-[#003366]">
              User Management Summary
            </h3>

            <p className="text-sm text-gray-500">
              Manage administrator access, user roles and account status from a
              single dashboard.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-[#003366]">
              Total: {totalUsers}
            </span>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              Active: {activeUsers}
            </span>

            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
              Inactive: {inactiveUsers}
            </span>

          </div>

        </div>

      </div>
          {/* Future Features */}

      <div className="rounded-3xl border border-dashed bg-gray-50 p-6">

        <h3 className="text-lg font-semibold text-[#003366]">
          Upcoming Features
        </h3>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border bg-white p-4">
            <h4 className="font-medium text-[#003366]">
              Role Management
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Assign permissions and manage user roles.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <h4 className="font-medium text-[#003366]">
              Activity Logs
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              View login history and user activities.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <h4 className="font-medium text-[#003366]">
              Two-Factor Authentication
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Improve account security with 2FA.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <h4 className="font-medium text-[#003366]">
              Access Control
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              Configure page-level permissions.
            </p>
          </div>

        </div>

      </div>
        </div>
  );
}
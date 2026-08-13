import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Download,
  Users,
  Building2,
  IndianRupee,
  UserCheck,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  demoCustomers,
  type Customer,
} from "./customerData";

import CustomerStatusBadge from "./CustomerStatusBadge";
import CustomerDetailsModal from "./CustomerDetailsModal";
import EditCustomerModal from "./EditCustomerModal";
import DeleteCustomerModal from "./DeleteCustomerModal";

export default function Customers() {
  const [customers, setCustomers] =
    useState<Customer[]>(demoCustomers);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [viewOpen, setViewOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.institution
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        customer.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        customer.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    customers,
    search,
    statusFilter,
    typeFilter,
  ]);

  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );

  const institutionalCustomers =
    customers.filter(
      (customer) =>
        customer.type === "Institution"
    ).length;

  const activeCustomers =
    customers.filter(
      (customer) =>
        customer.status === "Active"
    ).length;

  const handleSaveCustomer = (
    updatedCustomer: Customer
  ) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === updatedCustomer.id
          ? updatedCustomer
          : customer
      )
    );

    setEditOpen(false);
    setSelectedCustomer(null);
  };

    const handleDeleteCustomer = (id: number) => {
    setCustomers((prev) =>
        prev.filter((customer) => customer.id !== id)
    );

    setDeleteOpen(false);
    setSelectedCustomer(null);
    };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-[#003366]">
            Customers Management
          </h1>

          <p className="mt-2 text-gray-600">
            Manage institutional and individual
            customers of CSIR-NIScPR Publications.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <button className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium hover:bg-gray-100">
            <Download size={18} />
            Export
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-[#003366] px-5 py-3 font-medium text-white hover:bg-[#002855]">
            <Plus size={18} />
            Add Customer
          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Customers
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#003366]">
                {customers.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-blue-100 p-4">
              <Users
                size={28}
                className="text-[#003366]"
              />
            </div>

          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Institutional
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#003366]">
                {institutionalCustomers}
              </h2>
            </div>

            <div className="rounded-2xl bg-green-100 p-4">
              <Building2
                size={28}
                className="text-green-700"
              />
            </div>

          </div>
        </div>
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Active Customers
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#003366]">
                {activeCustomers}
              </h2>
            </div>

            <div className="rounded-2xl bg-purple-100 p-4">
              <UserCheck
                size={28}
                className="text-purple-700"
              />
            </div>

          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Revenue
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#003366]">
                {totalRevenue.toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="rounded-2xl bg-orange-100 p-4">
              <IndianRupee
                size={28}
                className="text-orange-700"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Search & Filters */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border py-3 pl-11 pr-4 focus:border-[#003366] focus:outline-none"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Blocked</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
            className="rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
          >
            <option>All</option>
            <option>Institution</option>
            <option>Individual</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setTypeFilter("All");
            }}
            className="rounded-xl bg-[#003366] px-5 py-3 font-medium text-white hover:bg-[#002855]"
          >
            Reset Filters
          </button>

        </div>

      </div>

      {/* Customers Table */}

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50">

              <tr className="border-b">

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Institution
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Orders
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                  Total Spent
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Last Order
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.map((customer) => (
                                <tr
                  key={customer.id}
                  className="border-b transition hover:bg-blue-50/40"
                >
                  {/* Customer */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="h-12 w-12 rounded-full border object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/100x100";
                        }}
                      />

                      <div>

                        <h4 className="font-semibold text-gray-800">
                          {customer.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>

                        <p className="text-xs text-gray-400">
                          {customer.phone}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Institution */}

                  <td className="px-6 py-5">

                    <div>

                      <p className="font-medium text-gray-800">
                        {customer.institution}
                      </p>

                      <p className="text-sm text-gray-500">
                        {customer.type}
                      </p>

                    </div>

                  </td>

                  {/* Orders */}

                  <td className="px-6 py-5 text-center font-semibold">
                    {customer.orders}
                  </td>

                  {/* Total Spent */}

                  <td className="px-6 py-5 text-right font-semibold text-[#003366]">
                    {customer.totalSpent.toLocaleString("en-IN")}
                  </td>

                  {/* Last Order */}

                  <td className="px-6 py-5 text-center text-gray-700">
                    {customer.lastOrder}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-5 text-center">

                    <CustomerStatusBadge
                      status={customer.status}
                    />

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setViewOpen(true);
                        }}
                        className="rounded-lg bg-blue-100 p-2 text-blue-700 transition hover:bg-blue-200"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setEditOpen(true);
                        }}
                        className="rounded-lg bg-yellow-100 p-2 text-yellow-700 transition hover:bg-yellow-200"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setDeleteOpen(true);
                        }}
                        className="rounded-lg bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                      >
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
            {/* Customer Details Modal */}

      <CustomerDetailsModal
        open={viewOpen}
        customer={selectedCustomer}
        onClose={() => {
          setViewOpen(false);
          setSelectedCustomer(null);
        }}
      />

      {/* Edit Customer Modal */}

      <EditCustomerModal
        open={editOpen}
        customer={selectedCustomer}
        onClose={() => {
          setEditOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSaveCustomer}
      />

      {/* Delete Customer Modal */}

      <DeleteCustomerModal
        open={deleteOpen}
        customer={selectedCustomer}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedCustomer(null);
        }}
        onDelete={handleDeleteCustomer}
      />

    </div>
  );
}
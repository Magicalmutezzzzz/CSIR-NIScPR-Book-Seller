import React, { useEffect, useState } from "react";
import { addressService } from "../../../services/addressService";
import type { Address, AddressType, UserType } from "../../../types/address";

const userTypes: UserType[] = ["Personal", "Institute", "Organization"];
const addressTypes: AddressType[] = ["Home", "Office", "Other"];

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const [form, setForm] = useState<Omit<Address, "id" | "createdAt" | "updatedAt">>({
    fullName: "",
    email: "",
    phone: "",
    userType: "Personal",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
    addressType: "Home",
    isDefault: false,
  });

  const loadAddresses = async () => {
    setLoading(true);
    try {
      const data = await addressService.getAddresses();
      setAddresses(data);
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = target instanceof HTMLInputElement ? target.checked : false;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addressService.addAddress(form);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        userType: "Personal",
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        city: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
        addressType: "Home",
        isDefault: false,
      });
      await loadAddresses();
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Failed to add address");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      await addressService.deleteAddress(id);
      await loadAddresses();
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Failed to delete address");
    }
  };

  const handleMakeDefault = async (id: string) => {
    try {
      await addressService.setDefaultAddress(id);
      await loadAddresses();
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : "Failed to set default address");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-[#003366] mb-6">My Addresses</h1>

      <form
        onSubmit={handleAddAddress}
        className="bg-white rounded-lg p-6 shadow mb-10"
      >
        <h2 className="text-xl font-semibold text-[#003366] mb-4">
          Add Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <select
            name="userType"
            value={form.userType}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          >
            {userTypes.map((ut) => (
              <option key={ut} value={ut}>
                {ut}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={form.addressLine1}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            value={form.addressLine2}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={form.landmark}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <select
            name="addressType"
            value={form.addressType}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          >
            {addressTypes.map((at) => (
              <option key={at} value={at}>
                {at}
              </option>
            ))}
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleInputChange}
              className="rounded"
            />
            <span>Set as Default</span>
          </label>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-[#003366] text-white px-5 py-2 rounded hover:bg-[#002244] transition"
          >
            Add Address
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-center text-gray-600">Loading addresses...</p>
      ) : addresses.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No addresses saved yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-lg shadow p-6 relative"
            >
              {address.isDefault && (
                <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  Default
                </span>
              )}
              <h3 className="text-xl font-semibold text-[#003366] mb-2">
                {address.fullName}
              </h3>
              <p>
                <span className="font-semibold">Phone:</span> {address.phone}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {address.email}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {address.addressLine1}
                {address.addressLine2 ? `, ${address.addressLine2}` : ""}
                {address.landmark ? `, Landmark: ${address.landmark}` : ""}
              </p>
              <p>
                <span className="font-semibold">City:</span> {address.city}
              </p>
              <p>
                <span className="font-semibold">District:</span> {address.district}
              </p>
              <p>
                <span className="font-semibold">State:</span> {address.state}
              </p>
              <p>
                <span className="font-semibold">Country:</span> {address.country}
              </p>
              <p>
                <span className="font-semibold">Pincode:</span> {address.pincode}
              </p>
              <p>
                <span className="font-semibold">User Type:</span> {address.userType}
              </p>
              <p>
                <span className="font-semibold">Address Type:</span>{" "}
                {address.addressType}
              </p>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => handleMakeDefault(address.id)}
                  disabled={address.isDefault}
                  className={`px-4 py-2 rounded text-white ${
                    address.isDefault
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#003366] hover:bg-[#002244]"
                  }`}
                  title={address.isDefault ? "Already default" : "Make Default"}
                >
                  Make Default
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  disabled
                  className="px-4 py-2 rounded bg-gray-400 text-white cursor-not-allowed"
                  title="Coming Soon"
                >
                  Edit (Coming Soon)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;

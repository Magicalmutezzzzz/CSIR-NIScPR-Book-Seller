import { useEffect, useState } from "react";
import type { Address, AddressType, UserType } from "../../types/address";

interface AddressFormProps {
  initialData?: Address;
  onSubmit: (
    address: Omit<Address, "id" | "createdAt" | "updatedAt">
  ) => void;
  onCancel: () => void;
}

const userTypes: UserType[] = [
  "Personal",
  "Institute",
  "Organization",
];

const addressTypes: AddressType[] = [
  "Home",
  "Office",
  "Other",
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  userType: "Personal" as UserType,

  addressLine1: "",
  addressLine2: "",
  landmark: "",

  city: "",
  district: "",
  state: "",
  country: "India",
  pincode: "",

  addressType: "Home" as AddressType,
  isDefault: false,
};

export default function AddressForm({
  initialData,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        fullName: initialData.fullName,
        email: initialData.email,
        phone: initialData.phone,
        userType: initialData.userType,

        addressLine1: initialData.addressLine1,
        addressLine2: initialData.addressLine2,
        landmark: initialData.landmark ?? "",

        city: initialData.city,
        district: initialData.district,
        state: initialData.state,
        country: initialData.country,
        pincode: initialData.pincode,

        addressType: initialData.addressType,
        isDefault: initialData.isDefault,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.addressLine1 ||
      !form.city ||
      !form.district ||
      !form.state ||
      !form.country ||
      !form.pincode
    ) {
      alert("Please fill all mandatory fields.");
      return;
    }

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white shadow-lg p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-[#003366]">
        {initialData ? "Edit Address" : "Add New Address"}
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <input
          name="fullName"
          placeholder="Full Name *"
          value={form.fullName}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="phone"
          placeholder="Contact Number *"
          value={form.phone}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <select
          name="userType"
          value={form.userType}
          onChange={handleChange}
          className="rounded-lg border p-3"
        >
          {userTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <input
          name="addressLine1"
          placeholder="Address Line 1 *"
          value={form.addressLine1}
          onChange={handleChange}
          className="rounded-lg border p-3 md:col-span-2"
        />

        <input
          name="addressLine2"
          placeholder="Address Line 2"
          value={form.addressLine2}
          onChange={handleChange}
          className="rounded-lg border p-3 md:col-span-2"
        />

        <input
          name="landmark"
          placeholder="Landmark"
          value={form.landmark}
          onChange={handleChange}
          className="rounded-lg border p-3 md:col-span-2"
        />

        <input
          name="city"
          placeholder="City *"
          value={form.city}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="district"
          placeholder="District *"
          value={form.district}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="state"
          placeholder="State *"
          value={form.state}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="pincode"
          placeholder="PIN Code *"
          value={form.pincode}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          name="country"
          placeholder="Country *"
          value={form.country}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <select
          name="addressType"
          value={form.addressType}
          onChange={handleChange}
          className="rounded-lg border p-3"
        >
          {addressTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isDefault"
          checked={form.isDefault}
          onChange={handleChange}
        />
        Set as Default Address
      </label>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-[#003366] px-6 py-2 text-white hover:bg-[#002855]"
        >
          {initialData ? "Update Address" : "Save Address"}
        </button>
      </div>
    </form>
  );
}
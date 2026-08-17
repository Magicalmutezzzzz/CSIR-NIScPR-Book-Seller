import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import type { Address } from "../../types/address";
import { addressService } from "../../services/addressService";

import AddressCard from "../../components/customer/AddressCard";
import AddressForm from "../../components/customer/AddressForm";

const MAX_ADDRESSES = 5;

type AddressFormData = Omit<
  Address,
  "id" | "createdAt" | "updatedAt"
>;

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<
    Address | undefined
  >(undefined);

  const refreshAddresses = async () => {
    try {
      const data = await addressService.getAddresses();
      setAddresses(data ?? []);
    } catch (error) {
      console.error("Failed to load addresses:", error);
      setAddresses([]);
    }
  };

    useEffect(() => {
    refreshAddresses();
  }, []);

  const handleAddNew = () => {
    setEditingAddress(undefined);
    setShowForm(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await addressService.deleteAddress(id);
      await refreshAddresses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await addressService.setDefaultAddress(id);
      await refreshAddresses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (
    data: AddressFormData
  ) => {
    try {
      if (editingAddress) {
        await addressService.updateAddress(
          editingAddress
        );
      } else {
        await addressService.addAddress(data);
      }

      setShowForm(false);
      setEditingAddress(undefined);

      await refreshAddresses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingAddress(undefined);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-[#003366]">
          Manage Addresses
        </h1>

        <p className="mb-4 text-slate-600">
          Save up to {MAX_ADDRESSES} addresses for
          faster checkout.
        </p>

        <button
          onClick={handleAddNew}
          disabled={addresses.length >= MAX_ADDRESSES}
          className="flex items-center gap-2 rounded-2xl bg-[#003366] px-4 py-2 text-white shadow transition hover:bg-[#002244] disabled:opacity-50"
        >
          <Plus size={18} />
          Add New Address
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl bg-white p-6 shadow">
          <AddressForm
            initialData={editingAddress}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      )}

      {!showForm && addresses.length === 0 && (
        <div className="flex flex-col items-center rounded-2xl bg-slate-50 p-10 shadow">
          <p className="text-slate-500">
            No addresses saved yet.
          </p>

          <button
            onClick={handleAddNew}
            className="mt-4 flex items-center gap-2 rounded-2xl bg-[#003366] px-4 py-2 text-white transition hover:bg-[#002244]"
          >
            <Plus size={18} />
            Add Address
          </button>
        </div>
      )}

      {addresses.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => handleEdit(address)}
              onDelete={() =>
                handleDelete(address.id)
              }
              onSetDefault={() =>
                handleSetDefault(address.id)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
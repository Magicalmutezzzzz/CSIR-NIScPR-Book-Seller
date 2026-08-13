

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import type { Address } from "../../types/address";
import { addressService } from "../../services/addressService";
import AddressCard from "../../components/customer/AddressCard";
import AddressForm from "../../components/customer/AddressForm";

const MAX_ADDRESSES = 5;

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);

  // Fetch addresses on mount
  useEffect(() => {
    refreshAddresses();
  }, []);

  const refreshAddresses = async () => {
    const res = await addressService.getAddresses();
    setAddresses(res || []);
  };

  const handleAddNew = () => {
    setEditingAddress(undefined);
    setShowForm(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = async (addressId: string) => {
    await addressService.deleteAddress(addressId);
    refreshAddresses();
  };

  const handleSetDefault = async (addressId: string) => {
    await addressService.setDefaultAddress(addressId);
    refreshAddresses();
  };

  const handleFormSubmit = async (data: Address) => {
    if (editingAddress) {
      await addressService.updateAddress(editingAddress.id, data);
    } else {
      await addressService.addAddress(data);
    }
    setShowForm(false);
    setEditingAddress(undefined);
    refreshAddresses();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingAddress(undefined);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#003366] mb-1">Manage Addresses</h1>
        <p className="text-slate-600 mb-4">Save up to {MAX_ADDRESSES} addresses for faster checkout.</p>
        <button
          className={`flex items-center gap-2 bg-[#003366] text-white rounded-2xl px-4 py-2 shadow hover:bg-[#002244] transition disabled:opacity-50`}
          onClick={handleAddNew}
          disabled={addresses.length >= MAX_ADDRESSES}
        >
          <Plus size={18} />
          Add New Address
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <AddressForm
              initialData={editingAddress}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      {addresses.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl shadow p-10">
          <div className="mb-2 text-slate-500">No addresses saved yet.</div>
          <button
            className="flex items-center gap-2 bg-[#003366] text-white rounded-2xl px-4 py-2 mt-2 shadow hover:bg-[#002244] transition"
            onClick={handleAddNew}
          >
            <Plus size={18} />
            Add Address
          </button>
        </div>
      )}

      {addresses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => handleEdit(address)}
              onDelete={() => handleDelete(address.id)}
              onSetDefault={() => handleSetDefault(address.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
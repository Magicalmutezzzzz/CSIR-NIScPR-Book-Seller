import { Edit, Trash2, MapPin, Star } from "lucide-react";
import type { Address } from "../../types/address";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-[#003366]">
              {address.fullName}
            </h3>

            {address.isDefault && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Default
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-gray-500">
            {address.addressType} • {address.userType}
          </p>
        </div>

        <MapPin className="h-6 w-6 text-[#003366]" />
      </div>

      <div className="space-y-1 text-sm text-gray-700">
        <p>{address.email}</p>

        <p>{address.phone}</p>

        <p>{address.addressLine1}</p>

        {address.addressLine2 && <p>{address.addressLine2}</p>}

        {address.landmark && (
          <p>Landmark: {address.landmark}</p>
        )}

        <p>
          {address.city}, {address.district}
        </p>

        <p>
          {address.state} - {address.pincode}
        </p>

        <p>{address.country}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {!address.isDefault && (
          <button
            onClick={() => onSetDefault(address.id)}
            className="flex items-center gap-2 rounded-lg border border-[#003366] px-4 py-2 text-sm font-medium text-[#003366] transition hover:bg-[#003366] hover:text-white"
          >
            <Star size={16} />
            Set Default
          </button>
        )}

        <button
          onClick={() => onEdit(address)}
          className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
        >
          <Edit size={16} />
          Edit
        </button>

        <button
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete this address?"
              )
            ) {
              onDelete(address.id);
            }
          }}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
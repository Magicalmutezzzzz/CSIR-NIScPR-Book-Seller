import type { CustomerProfile } from "../../types/customerProfile";
import { customerProfileService } from "../../services/customerProfileService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthenticatedUser } from "../../services/authService";
import { customerDataService } from "../../services/customerDataService";
import { addressService } from "../../services/addressService";
import type { Address } from "../../types/address";

export default function Profile() {
  const user = getAuthenticatedUser();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const cartCount = customerDataService.getCart().reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = customerDataService.getWishlist().length;
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  customerProfileService.createDefaultProfile();

  setProfile(customerProfileService.getProfile());

  const data = addressService.getAddresses();

  setAddresses(data);

  setLoading(false);
}, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold text-[#003366]">My account</h1>
      {/* Profile Card */}
      <div className="mt-8 rounded-3xl border bg-white p-7 shadow-sm">
        <h2 className="text-xl font-semibold text-[#003366]">Customer profile</h2>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">

          <div>
            <dt className="text-sm text-gray-500">Full Name</dt>
            <dd className="mt-1 font-medium">
              {profile?.fullName || "Not Provided"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="mt-1 font-medium">
              {profile?.email || user?.email}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Phone</dt>
            <dd className="mt-1 font-medium">
              {profile?.phone || "Not Provided"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Role</dt>
            <dd className="mt-1 font-medium capitalize">
              {user?.role}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">City</dt>
            <dd className="mt-1 font-medium">
              {profile?.city || "Not Provided"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">State</dt>
            <dd className="mt-1 font-medium">
              {profile?.state || "Not Provided"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Country</dt>
            <dd className="mt-1 font-medium">
              {profile?.country || "India"}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Cart Items</dt>
            <dd className="mt-1 font-medium">
              {cartCount}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Wishlist</dt>
            <dd className="mt-1 font-medium">
              {wishlistCount}
            </dd>
          </div>

        </dl>
      </div>

      {/* Addresses Section */}
      <div className="mt-10 rounded-3xl border bg-white p-7 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#003366]">Saved Addresses</h2>
          <Link
            to="/customer/addresses"
            className="rounded-lg bg-[#003366] px-4 py-2 text-white font-medium hover:bg-[#002244] transition"
          >
            Manage Addresses
          </Link>
        </div>
        <div className="mt-1 text-sm text-gray-500">Maximum 5 addresses</div>
        <div className="mt-5">
          {loading ? (
            <div className="text-gray-400">Loading addresses...</div>
          ) : addresses.length === 0 ? (
            <div className="text-gray-500 italic">No saved addresses.</div>
          ) : (
            <div className="grid gap-5">
              {addresses.slice(0, 5).map((address) => (
                <div
                  key={address.id}
                  className="relative rounded-xl border p-5 bg-gray-50"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-base font-semibold text-[#003366]">{address.fullName}</span>
                    {address.isDefault && (
                      <span className="ml-2 inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Phone:</span> {address.phone}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> {address.addressLine1}
                      {address.addressLine2 && (
                        <span>, {address.addressLine2}</span>
                      )}
                    </div>
                    <div>
                      {address.city}, {address.state} - {address.pincode}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      to="/customer/addresses"
                      className="rounded bg-[#003366] px-3 py-1.5 text-xs text-white font-medium hover:bg-[#002244] transition"
                    >
                      Edit
                    </Link>
                    <Link
                      to="/customer/addresses"
                      className="rounded border border-red-600 px-3 py-1.5 text-xs text-red-700 font-medium hover:bg-red-50 transition"
                    >
                      Delete
                    </Link>
                    <Link
                      to="/customer/addresses"
                      className={`rounded border px-3 py-1.5 text-xs font-medium transition ${
                        address.isDefault
                          ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                          : "border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
                      }`}
                      tabIndex={address.isDefault ? -1 : 0}
                      aria-disabled={address.isDefault}
                      onClick={e => address.isDefault && e.preventDefault()}
                    >
                      Choose Default
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          to="/customer/edit-profile"
          className="flex-1 rounded-lg bg-[#003366] px-4 py-3 text-center text-white font-medium hover:bg-[#002244] transition"
        >
          Edit Profile
        </Link>
        <Link
          to="/customer/change-password"
          className="flex-1 rounded-lg border border-[#003366] px-4 py-3 text-center text-[#003366] font-medium hover:bg-[#003366] hover:text-white transition"
        >
          Change Password
        </Link>
        <Link
          to="/customer/delete-account"
          className="flex-1 rounded-lg border border-red-600 px-4 py-3 text-center text-red-700 font-medium hover:bg-red-50 transition"
        >
          Delete Account
        </Link>
      </div>
    </main>
  );
}

import type { Address } from "../types/address";
import { getAuthenticatedUser } from "./authService";

const MAX_ADDRESSES = 5;

function getStorageKey() {
  const user = getAuthenticatedUser();

  if (!user) return "guest_addresses";

  return `customer_addresses_${user.email}`;
}

class AddressService {
  getAddresses(): Address[] {
    const data = localStorage.getItem(getStorageKey());
    return data ? JSON.parse(data) : [];
  }

  saveAddresses(addresses: Address[]) {
    localStorage.setItem(getStorageKey(), JSON.stringify(addresses));
  }

  addAddress(
    address: Omit<Address, "id" | "createdAt" | "updatedAt">
  ): Address {
    const addresses = this.getAddresses();

    if (addresses.length >= MAX_ADDRESSES) {
      throw new Error("You can save a maximum of 5 addresses.");
    }

    // Only one default address
    if (address.isDefault) {
      addresses.forEach((a) => (a.isDefault = false));
    }

    const newAddress: Address = {
      ...address,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addresses.push(newAddress);
    this.saveAddresses(addresses);

    return newAddress;
  }

  updateAddress(updatedAddress: Address) {
    const addresses = this.getAddresses();

    const updated = addresses.map((address) => {
      if (updatedAddress.isDefault) {
        address.isDefault = false;
      }

      if (address.id === updatedAddress.id) {
        return {
          ...updatedAddress,
          updatedAt: new Date().toISOString(),
        };
      }

      return address;
    });

    this.saveAddresses(updated);
  }

  deleteAddress(id: string) {
    const addresses = this.getAddresses().filter(
      (address) => address.id !== id
    );

    this.saveAddresses(addresses);
  }

  setDefaultAddress(id: string) {
    const addresses = this.getAddresses().map((address) => ({
      ...address,
      isDefault: address.id === id,
    }));

    this.saveAddresses(addresses);
  }

  getDefaultAddress(): Address | undefined {
    return this.getAddresses().find((address) => address.isDefault);
  }

  getAddressById(id: string): Address | undefined {
    return this.getAddresses().find((address) => address.id === id);
  }

  clearAddresses() {
    localStorage.removeItem(getStorageKey());
  }
}

export const addressService = new AddressService();
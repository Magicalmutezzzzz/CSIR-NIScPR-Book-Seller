import type { CustomerProfile } from "../types/customerProfile";
import { getAuthenticatedUser } from "./authService";

function getStorageKey() {
  const user = getAuthenticatedUser();

  if (!user) return "guest_profile";

  return `customer_profile_${user.email}`;
}

class CustomerProfileService {
  getProfile(): CustomerProfile | null {
    const data = localStorage.getItem(getStorageKey());

    return data ? JSON.parse(data) : null;
  }

  saveProfile(profile: CustomerProfile) {
    localStorage.setItem(
      getStorageKey(),
      JSON.stringify(profile)
    );
  }

  createDefaultProfile() {
    const user = getAuthenticatedUser();

    if (!user) return;

    if (this.getProfile()) return;

    this.saveProfile({
      fullName: user.email.split("@")[0],
      email: user.email,
      phone: "",
      city: "",
      state: "",
      country: "India",
      dob: "",
      gender: "Prefer not to say",
      profileImage: "",
    });
  }

  updateProfile(profile: CustomerProfile) {
    this.saveProfile(profile);
  }

  clearProfile() {
    localStorage.removeItem(getStorageKey());
  }
}

export const customerProfileService =
  new CustomerProfileService();
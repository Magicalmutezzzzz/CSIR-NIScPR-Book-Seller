export interface CustomerProfile {
  fullName: string;
  email: string;
  phone: string;

  city: string;
  state: string;
  country: string;

  dob?: string;

  gender?: "Male" | "Female" | "Other" | "Prefer not to say";

  profileImage?: string;
}
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";

import { customerProfileService } from "../../services/customerProfileService";
import type { CustomerProfile } from "../../types/customerProfile";

type EditProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dob: string;
  organization: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export default function EditProfile() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EditProfileForm>();

  useEffect(() => {
    customerProfileService.createDefaultProfile();

    const profile = customerProfileService.getProfile();

    if (!profile) return;

    const names = profile.fullName.trim().split(" ");

    reset({
      firstName: names[0] || "",
      lastName: names.slice(1).join(" "),
      email: profile.email,
      mobile: profile.phone,
      dob: profile.dob,
      organization: "CSIR-NIScPR",
      address: "",
      city: profile.city,
      state: profile.state,
      pincode: "",
    });
  }, [reset]);

  const handleSave = async (data: EditProfileForm) => {
    const updatedProfile: CustomerProfile = {
      fullName: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.mobile,
      city: data.city,
      state: data.state,
      country: "India",
      dob: data.dob,
      gender: "Prefer not to say",
      profileImage: "",
    };

    customerProfileService.updateProfile(updatedProfile);

    toast.success("Profile updated successfully!");

    navigate("/customer/profile", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="bg-[#003366] px-8 py-6 text-white">
          <h1 className="text-3xl font-bold">
            Edit Profile
          </h1>

          <p className="mt-2 text-blue-100">
            Update your personal information and contact details.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSave)}>

          <div className="grid gap-5 p-8 md:grid-cols-2">

            <Input
              label="First Name"
              placeholder="Enter first name"
              icon={<User size={18} />}
              registration={register("firstName")}
            />

            <Input
              label="Last Name"
              placeholder="Enter last name"
              icon={<User size={18} />}
              registration={register("lastName")}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter email"
              icon={<Mail size={18} />}
              registration={register("email")}
            />

            <Input
              label="Mobile Number"
              placeholder="Enter mobile number"
              icon={<Phone size={18} />}
              registration={register("mobile")}
            />

            <Input
              label="Date of Birth"
              type="date"
              icon={<Calendar size={18} />}
              registration={register("dob")}
            />

            <Input
              label="Organization"
              placeholder="CSIR-NIScPR"
              icon={<Building2 size={18} />}
              registration={register("organization")}
            />

            <div className="md:col-span-2">
              <Input
                label="Address"
                placeholder="Enter your address"
                icon={<MapPin size={18} />}
                registration={register("address")}
              />
            </div>

            <Input
              label="City"
              placeholder="City"
              registration={register("city")}
            />

            <Input
              label="State"
              placeholder="State"
              registration={register("state")}
            />

            <Input
              label="Pincode"
              placeholder="Pincode"
              registration={register("pincode")}
            />

          </div>

          <div className="flex justify-end gap-4 border-t bg-slate-50 px-8 py-6">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg border border-slate-300 px-6 py-2 font-medium transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-[#003366] px-6 py-2 font-medium text-white transition hover:bg-[#002244] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

type InputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  registration?: UseFormRegisterReturn;
};

function Input({
  label,
  placeholder,
  type = "text",
  icon,
  registration,
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3 focus-within:border-[#003366] focus-within:ring-2 focus-within:ring-blue-100">

        {icon && (
          <span className="mr-2 text-slate-500">
            {icon}
          </span>
        )}

        <input
          {...registration}
          type={type}
          placeholder={placeholder}
          autoComplete="on"
          className="w-full border-none bg-transparent py-3 outline-none"
        />

      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";

export default function Register() {
  return (
    <AuthCard
      title="Create Account"
      subtitle="Register to access CSIR-NIScPR Publications."
    >
      <form className="space-y-5">

        <div className="grid grid-cols-2 gap-4">

          <AuthInput
            label="First Name"
            placeholder="Name"
          />

          <AuthInput
            label="Last Name"
            placeholder="Surname"
          />

        </div>

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
        />

        <AuthInput
          label="Mobile Number"
          placeholder="Enter mobile number"
        />
            <AuthInput
          label="Password"
          type="password"
          placeholder="Create password"
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
        />

        <label className="flex items-start gap-3 text-sm">

          <input
            type="checkbox"
            className="mt-1"
          />

          <span>
            I agree to the{" "}
            <Link
              to="#"
              className="font-semibold text-[#003366]"
            >
              Terms & Conditions
            </Link>
          </span>

        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#003366] py-3 font-semibold text-white transition hover:bg-[#002855]"
        >
          Create Account
        </button>
            <p className="text-center text-sm text-gray-600">

          Already have an account?

          <Link
            to="/auth/login"
            className="ml-2 font-semibold text-[#003366] hover:underline"
          >
            Login
          </Link>

        </p>

      </form>

    </AuthCard>
  );
}
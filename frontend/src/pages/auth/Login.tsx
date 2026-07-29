import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthCard from "../../components/auth/AuthCard";
import PasswordInput from "../../components/auth/PasswordInput";
import SocialLogin from "../../components/auth/SocialLogin";

import { loginSchema } from "../../validations/authSchema";
import type { LoginFormData } from "../../validations/authSchema";
import { authenticate, getDashboardPath } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const user = authenticate(data.email, data.password);

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    alert("Login Successful");
    navigate(getDashboardPath(user.role), { replace: true });
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to access your CSIR-NIScPR account."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block font-medium text-[#003366]">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`w-full rounded-xl border px-4 py-3 outline-none transition ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 focus:border-[#003366]"
            }`}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          registration={register("password")}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded"
            />
            Remember me
          </label>

          <Link
            to="/auth/forgot-password"
            className="font-medium text-[#003366] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[#003366] py-3 font-semibold text-white transition hover:bg-[#002855] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">
              OR
            </span>
          </div>
        </div>

        <SocialLogin />

        <p className="text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            to="/auth/register"
            className="ml-2 font-semibold text-[#003366] hover:underline"
          >
            Create Account
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}

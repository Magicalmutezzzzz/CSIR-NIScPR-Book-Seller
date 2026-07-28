import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export default function PasswordInput({
  label,
  placeholder,
  registration,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="mb-2 block font-medium text-[#003366]">
        {label}
      </label>

      <div className="relative">
        <input
          {...registration}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`w-full rounded-xl border px-4 py-3 pr-12 outline-none transition ${
            error
              ? "border-red-500"
              : "border-gray-300 focus:border-[#003366]"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#003366]"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
}
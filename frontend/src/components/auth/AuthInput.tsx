interface Props {
  label: string;
  type?: string;
  placeholder: string;
}

export default function AuthInput({
  label,
  type = "text",
  placeholder,
}: Props) {
  return (
    <div>

      <label className="mb-2 block font-medium text-[#003366]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#003366]"
      />

    </div>
  );
}
import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

      <h1 className="text-3xl font-bold text-[#003366]">
        {title}
      </h1>

      <p className="mt-2 text-gray-500">
        {subtitle}
      </p>

      <div className="mt-8">

        {children}

      </div>

    </div>
  );
}
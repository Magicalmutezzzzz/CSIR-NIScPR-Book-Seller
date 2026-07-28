import type { ComponentType } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        p-6
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2 text-[#003366]">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}
        >
          <Icon size={28} className="text-white" />
        </div>
      </div>
    </div>
  );
}
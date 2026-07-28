import {
  Plus,
  FolderPlus,
  UserPlus,
  FileSpreadsheet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Add Publication",
    icon: Plus,
    color: "bg-[#003366]",
  },
  {
    title: "Add Category",
    icon: FolderPlus,
    color: "bg-green-600",
  },
  {
    title: "Add Author",
    icon: UserPlus,
    color: "bg-orange-500",
  },
  {
    title: "Generate Report",
    icon: FileSpreadsheet,
    color: "bg-purple-600",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  const handleAction = (title: string) => {
    switch (title) {
      case "Add Publication":
        navigate("/admin/publications/add");
        break;

      case "Add Category":
        navigate("/admin/categories");
        break;

      case "Add Author":
        alert("Coming Soon");
        break;

      case "Generate Report":
        alert("Coming Soon");
        break;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#003366] mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => handleAction(action.title)}
              className={`${action.color} text-white rounded-2xl p-5 hover:scale-105 transition-all duration-300 shadow-md flex flex-col items-center gap-3`}
            >
              <Icon size={30} />
              <span className="font-semibold text-center">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
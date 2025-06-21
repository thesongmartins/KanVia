import { Plus, Rocket } from "lucide-react";

const SideBarButton = ({ icon, label }: SideBarButtonProps) => {
  return (
    <button className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
      {icon}
      <span>{label}</span>
    </button>
  );
};

interface SideBarButtonProps {
  label: string;
  icon: React.ReactNode;
}

const SideBarItems: SideBarButtonProps[] = [
  {
    label: "Marketing",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    label: "Sales",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    label: "Development",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    label: "Create New Board",
    icon: <Plus className="w-6 h-6" />,
  },
];

const SideBar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      <h2>Task Management</h2>
      <nav>
        <ul>
          {SideBarItems.map((item, index) => (
            <li key={index}>
              <SideBarButton icon={item.icon} label={item.label} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;

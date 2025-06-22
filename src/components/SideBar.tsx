import { Plus, Rocket } from "lucide-react";
import Header from "./Header";

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

const SideBarButton = ({ icon, label }: SideBarButtonProps) => {
  return (
    <button className="flex w-full items-center gap-2 p-2 hover:bg-gray-700 rounded">
      {icon}
      <span>{label}</span>
    </button>
  );
};

const SideBar = () => {
  return (
    <div className="flex  ">
      <div className="h-screen w-64 bg-gray-800 text-white p-4">
        <h2 className="pb-8 pt-2 text-2xl">KanVia</h2>
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
      <div className="flex-1 ">
        {" "}
        <Header />
      </div>
    </div>
  );
};

export default SideBar;

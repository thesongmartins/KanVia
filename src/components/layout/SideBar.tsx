import { Plus } from "lucide-react";
import "../../../public/logo-dark.svg";

interface SideBarButtonProps {
  label: string;
  icon?: React.ReactNode;
}

const SideBarItems: SideBarButtonProps[] = [
  {
    label: "Marketing",
  },
  {
    label: "Sales",
  },
  {
    label: "Development",
  },
  {
    label: "Create New Board",
    icon: <Plus className="w-6 h-6" />,
  },
];

const SideBarButton = ({ icon, label }: SideBarButtonProps) => {
  return (
    <button className="flex w-full items-center gap-2 p-2 hover:bg-[#20212c]/50 rounded">
      {icon}
      <span>{label}</span>
    </button>
  );
};

const SideBar = () => {
  return (
    <div className="flex  ">
      <div className="h-screen w-64 bg-[#2B2C37] text-white p-4">
        <h2 className="pb-8 pt-2 text-2xl">
          {" "}
          <img src="/logo-light.svg" alt="logo-image" />
        </h2>
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
    </div>
  );
};

export default SideBar;

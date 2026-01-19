import SideBar from "./SideBar";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#20212c]">
      {/* Sidebar */}
      <SideBar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* Page content (boards & cards will live here) */}
        <main className="flex-1 p-6 overflow-auto bg-[#20212c]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

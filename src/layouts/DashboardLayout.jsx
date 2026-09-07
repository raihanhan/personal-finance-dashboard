import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0b101b]">

      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">

        <Header />

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>

      </main>

    </div>
  );
}

export default DashboardLayout;
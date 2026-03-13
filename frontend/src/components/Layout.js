import Sidebar from "./Sidebar";

function Layout({ children }) {
  const userName = localStorage.getItem("userName") || "System User";
  const userEmail = localStorage.getItem("userEmail") || "user@system.com";
  const userInitials = userName.substring(0, 2).toUpperCase();

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-end px-8 z-10 sticky top-0 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shadow-inner tracking-widest">
              {userInitials}
            </div>
            <div className="hidden md:block text-sm">
              <p className="font-semibold text-gray-800">{userName}</p>
              <p className="text-gray-500 text-xs">{userEmail}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
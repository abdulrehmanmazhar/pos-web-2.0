import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Home,
  Truck,
  ShoppingBag,
  Users,
  Crown,
  Layers,
  Flag,
  CreditCard,
  LifeBuoy,
  Settings,
  Bell,
  ClipboardList,
  BotMessageSquare
} from "lucide-react";
import Sidebar, { SidebarItem } from "./Sidebar";
import logo from "../assets/logo.png";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/slices/authSlice";
import { useLogoutMutation } from "../redux/slices/authApiSlice";
import { ToastContainer } from "react-toastify";
function Layout() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setNotificationsMenuOpen] = useState(false);

  const user = useSelector(selectCurrentUser);

  const toggleMenu = (menuSetter: (value: boolean) => void) => {
    menuSetter((prev) => !prev);
  };

    // Using `skip` to control when the query runs
    const [logout,{ }] = useLogoutMutation();



  return (
    <>
      {/* Topbar */}
      <div className="topbar fixed w-full">
        <nav className="bg-white border-b border-gray-200 ">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Left: Logo */}
              <div className="flex flex-1 items-center justify-start">
              </div>

              <div className="flex flex-1 items-center justify-start font-bold -translate-x-8"><h2>SATTAR ENTERPRISES HFD</h2></div>

              {/* Right: Notifications and Profile */}
              <div className="flex items-center space-x-4">
                {/* Notifications Button */}
                <div className="relative">
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    onClick={() => toggleMenu(setNotificationsMenuOpen)}
                  >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                  </button>
                  {isNotificationsMenuOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <p className="block px-4 py-2 text-sm text-gray-700">
                        No new notifications
                      </p>
                    </div>
                  )}
                </div>

                {/* Profile Button */}
                <div className="relative">
                  <button
                    type="button"
                    className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    onClick={() => toggleMenu(setProfileMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatar?user.avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      alt="User Profile"
                    />
                  </button>
                  {isProfileMenuOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <Link to={'/profile'} className="block px-4 py-2 text-sm text-gray-700">Your Profile
                      </Link>
                      {/* <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                      >
                        Your Profile
                      </a> */}
                      <div
                        // href="#"
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        role="menuitem"
                        onClick={() => {logout({})}}
                      >
                        Sign out
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="flex flex-1">

      {/* Sidebar */}
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<Home size={20} />}
            text="Home"
            active={activeTab === "Home"}
            onClick={() => setActiveTab("Home")}
            />
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active={activeTab === "Dashboard"}
            onClick={() => setActiveTab("Dashboard")}
            />
          <SidebarItem
            icon={<ClipboardList size={20} />}
            text="Orders"
            active={activeTab === "Orders"}
            onClick={() => setActiveTab("Orders")}
          />
          <SidebarItem
            icon={<CreditCard size={20} />}
            text="Payments"
            active={activeTab === "Payments"}
            onClick={() => setActiveTab("Payments")}
          />
          {/* <SidebarItem
            icon={<Truck size={20} />}
            text="Deliveries"
            active={activeTab === "Deliveries"}
            onClick={() => setActiveTab("Deliveries")}
          /> */}
          <SidebarItem
            icon={<Layers size={20} />}
            text="Inventory"
            active={activeTab === "Inventory"}
            onClick={() => setActiveTab("Inventory")}
          />
          <SidebarItem
            icon={<Users size={20} />}
            text="Customers"
            active={activeTab === "Customers"}
            onClick={() => setActiveTab("Customers")}
          />
          <SidebarItem
            icon={<Crown size={20} />}
            text="Community"
            active={activeTab === "Community"}
            onClick={() => setActiveTab("Community")}
          />
          <hr className="my-3" />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Settings"
            active={activeTab === "Settings"}
            onClick={() => setActiveTab("Settings")}
          />
            <SidebarItem
            icon={<BotMessageSquare size={20} />}
            text="AI-Assistant"
            active={activeTab === "AI-Assistant"}
            onClick={() => setActiveTab("AI-Assistant")}
          />
          <SidebarItem
            icon={<LifeBuoy size={20} />}
            text="Help"
            active={activeTab === "Help"}
            onClick={() => setActiveTab("Help")}
          />
          
        </Sidebar>
        </div>
        <div className="flex-1 m-2 max-h-[calc(100vh-5rem)] h-[calc(100vh-5rem)] mt-[calc(4.5rem)] ml-[calc(4.75rem)] ">
        <ToastContainer />
          <Outlet/>
        </div>
      </div>
    </>
  );
}

export default Layout;

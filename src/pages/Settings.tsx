import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import WhatsAppQR from "../components/WhatsAppQR";

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");

  const handleSaveSettings = () => {
    console.log({ darkMode, notifications, currency, language });
    alert("Settings saved successfully!");
  };


  return (
    <div className={`man-h-screen ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"}`}>
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* General Settings */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between mb-4">
            <span>Dark Mode</span>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              className={`${
                darkMode ? "bg-blue-500" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  darkMode ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <span>Enable Actions</span>
            <Switch
              checked={notifications}
              onChange={setNotifications}
              className={`${
                notifications ? "bg-blue-500" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  notifications ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>

          {/* Currency Selector */}
          {/* <div className="mb-4">
            <label htmlFor="currency" className="block mb-2">Currency</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="PKR">PKR</option>
              <option value="INR">INR</option>
            </select>
          </div> */}

          {/* Language Selector */}
          <div>
            <label htmlFor="language" className="block mb-2">Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="ur">Urdu</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>

        {/* whatsapp  */}
        <WhatsAppQR/>

        {/* Save Button */}
        {/* <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600 transition-all focus:ring focus:ring-blue-300"
          >
            Save Settings
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Settings;

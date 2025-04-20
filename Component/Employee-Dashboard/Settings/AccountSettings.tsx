// components/Settings.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, MapPin, Mail } from 'lucide-react';
import { RxCross2 } from "react-icons/rx";

const Settings = () => {
  // State for form inputs
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Handlers
  const handleContactSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Contact Info:', contactInfo);
  };


  const handlePasswordSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Passwords:', passwords);
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
      setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="py-5 px-2 max-w-7xl mx-auto space-y-8">
      {/* Contact Info Section */}
      <div className="bg-white border-b  pb-5">
        <h2 className="text-xl font-semibold mb-4">CONTACT INFO</h2>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          {/* Map Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MAP LOCATION
            </label>
            <input
              type="text"
              placeholder="City, state, country name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>

          {/* Phone */}
          <div>
            <label className=" text-sm font-medium px-2 justify-center text-gray-700 mb-1">
              PHONE
            </label>
            <div className="flex border border-gray-300 rounded-md items-center">
              <select
                className="p-2 focus:outline-none text-gray-600"
              >
                <option>🇧🇩+880</option>
                <option>🇵🇰+92</option>
                <option>🇲🇾+60</option>
                <option>🇹🇷+90</option>
              </select>
              <input
                type="text"
                placeholder="Phone number..."
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, phone: e.target.value })
                }
                className="w-full  border-none rounded-sm   py-2  px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              EMAIL
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Mail
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-xs hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
          >
            SAVE CHANGES
          </button>
        </form>
      </div>

    

      {/* Change Password Section */}
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">CHANGE PASSWORD</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CURRENT PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.current ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.new ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-xs hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
          >
            SAVE CHANGES
          </button>
        </form>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white rounded-lg ">
        <h2 className="text-xl font-semibold mb-2">DELETE YOUR ACCOUNT</h2>
        <p className="text-sm text-gray-600 mb-4">
          If you delete the job applicant account, you will no longer be able to
          get information about the matched jobs, following employers, and job
          alert, shortlisted jobs and also the abandoned jobs from all the job
          platform Jobpilot.
        </p>
        <button className="text-red-600 flex items-center gap-3 cursor-pointer hover:underline"><RxCross2 />        Close Account</button>
      </div>
    </div>
  );
};

export default Settings;
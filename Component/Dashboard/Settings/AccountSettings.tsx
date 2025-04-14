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
  const [notifications, setNotifications] = useState({
    shortlist: false,
    jobsExpire: false,
    jobAlerts: false,
    savedProfile: false,
    rejected: false,
  });
  const [jobAlerts, setJobAlerts] = useState({
    role: '',
    location: '',
  });
  const [profilePrivacy, setProfilePrivacy] = useState(true);
  const [resumePrivacy, setResumePrivacy] = useState(false);
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

  const handleNotificationsSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Notifications:', notifications);
  };

  const handleJobAlertsSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Job Alerts:', jobAlerts);
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
      <div className="bg-white rounded-lg ">
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

      {/* Notification Section */}
      <div className="bg-white rounded-lg ">
        <h2 className="text-xl font-semibold mb-4">NOTIFICATION</h2>
        <form onSubmit={handleNotificationsSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifications.shortlist}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      shortlist: !notifications.shortlist,
                    })
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Notify me when employers shortlist me
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifications.jobsExpire}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      jobsExpire: !notifications.jobsExpire,
                    })
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Notify me when applied jobs are expire
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifications.jobAlerts}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      jobAlerts: !notifications.jobAlerts,
                    })
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Notify me when I have up to 5 job alerts
                </span>
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifications.savedProfile}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      savedProfile: !notifications.savedProfile,
                    })
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Notify me when employers saved my profile
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifications.rejected}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      rejected: !notifications.rejected,
                    })
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Notify me when employers rejected me
                </span>
              </label>
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

      {/* Job Alerts Section */}
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">JOB ALERTS</h2>
        <form onSubmit={handleJobAlertsSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ROLE
              </label>
              <input
                type="text"
                placeholder="Your job role"
                value={jobAlerts.role}
                onChange={(e) =>
                  setJobAlerts({ ...jobAlerts, role: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LOCATION
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="City, state, country name"
                  value={jobAlerts.location}
                  onChange={(e) =>
                    setJobAlerts({ ...jobAlerts, location: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
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

      {/* Profile Privacy Section */}
      <div className="bg-white rounded-lg  ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">PROFILE PRIVACY</h2>
            <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
            <button
                onClick={() => setProfilePrivacy(!profilePrivacy)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  profilePrivacy ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    profilePrivacy ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span
                className={`text-sm ${
                  profilePrivacy ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                {profilePrivacy
                  ? 'YES, Your profile is public now'
                  : 'NO, Your profile is private now'}
              </span>
              
            </div>
            
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">RESUME PRIVACY</h2>
            <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
            <button
                onClick={() => setResumePrivacy(!resumePrivacy)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  resumePrivacy ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    resumePrivacy ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span
                className={`text-sm ${
                  resumePrivacy ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                {resumePrivacy
                  ? 'YES, Your resume is public now'
                  : 'NO, Your resume is private now'}
              </span>
             
            </div>
          </div>
        </div>
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
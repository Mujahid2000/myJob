// components/settings/AccountSetting.tsx
const AccountSetting: React.FC = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Contact Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="flex space-x-2">
              <select className="mt-1 block w-1/4 border border-gray-300 rounded-md p-2">
                <option>+880</option>
              </select>
              <input
                type="text"
                placeholder="Phone number"
                className="mt-1 block w-3/4 border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
        <h3 className="text-lg font-semibold mt-6">Notification</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-700">
              Notify me when employers shortlisted me
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-700">
              Notify me when employers viewed my profile
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-700">
              Notify me when I have up to 5 job alerts
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-700">
              Notify me when employers rejected me
            </span>
          </label>
        </div>
        <h3 className="text-lg font-semibold mt-6">Job Alerts</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            placeholder="Your job roles"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            placeholder="City, state, country name"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
        <h3 className="text-lg font-semibold mt-6">Resume Privacy</h3>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input type="radio" name="privacy" className="form-radio h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-700">YES</span>
            <span className="text-sm text-gray-500">Your profile is public now</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="privacy" className="form-radio h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-700">NO</span>
            <span className="text-sm text-gray-500">Your resume is private now</span>
          </label>
        </div>
        <h3 className="text-lg font-semibold mt-6">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
        <h3 className="text-lg font-semibold mt-6">Delete Your Account</h3>
        <p className="text-sm text-gray-500">
          If you delete the Jobpilot account, you will no longer be able to get information
          from Jobpilot.com website and all the services of Jobpilot.com will be closed.
        </p>
        <button className="text-red-600 hover:underline">Close</button>
      </div>
    );
  };
  
  export default AccountSetting;
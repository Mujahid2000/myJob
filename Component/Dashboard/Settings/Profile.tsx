// components/settings/Profile.tsx
const Profile: React.FC = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Browse photo
            </label>
            <div className="mt-1 border border-gray-300 rounded-md p-4 text-center">
              <div className="flex justify-center mb-2">
                <span className="text-gray-500">☁️</span>
              </div>
              <p className="text-sm text-gray-500">
                Browse photo or drop here
                <br />A photo larger than 400 pixels
                <br />Max size: Max photo size is 1 MB
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title/Headline
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Personal Website
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Website url..."
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            <span className="absolute left-3 top-3 text-gray-500">🔗</span>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
        <h3 className="text-lg font-semibold mt-6">Your CV/Resume</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-300 rounded-md p-4 text-center">
            <p className="text-sm text-gray-500">Professional Resume</p>
            <p className="text-sm text-gray-400">3.5 MB</p>
            <div className="relative inline-block mt-2">
              <button className="text-blue-600 hover:underline">...</button>
              <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg hidden group-hover:block">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Edit Resume
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 rounded-md p-4 text-center">
            <p className="text-sm text-gray-500">Product Designer</p>
            <p className="text-sm text-gray-400">4.7 MB</p>
            <div className="relative inline-block mt-2">
              <button className="text-blue-600 hover:underline">...</button>
              <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg hidden group-hover:block">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Edit Resume
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 rounded-md p-4 text-center">
            <p className="text-sm text-gray-500">Visual Designer</p>
            <p className="text-sm text-gray-400">1.3 MB</p>
            <div className="relative inline-block mt-2">
              <button className="text-blue-600 hover:underline">...</button>
              <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg hidden group-hover:block">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Edit Resume
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center mt-4">
          <p className="text-sm text-gray-500">
            Add CV/Resume
            <br />
            Browse file or drop here. only .pdf
          </p>
        </div>
      </div>
    );
  };
  
  export default Profile;
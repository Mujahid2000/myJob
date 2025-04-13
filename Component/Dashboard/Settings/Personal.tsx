// components/settings/Personal.tsx
const Personal: React.FC = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nationality
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <span className="absolute right-3 top-3 text-gray-500">📅</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Biography
          </label>
          <textarea
            placeholder="Write down your biography here. Let the employer know who you are..."
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
          />
          <div className="mt-2 flex space-x-2 text-gray-500">
            <button>𝐁</button>
            <button>𝑰</button>
            <button>𝑼</button>
            <button>𝑺</button>
            <button>🔗</button>
            <button>𝐻</button>
            <button>≡</button>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    );
  };
  
  export default Personal;
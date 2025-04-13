// components/settings/SocialLinks.tsx
const SocialLinks: React.FC = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Social Link 1
              </label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option>Facebook</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Profile link/url..."
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <button className="absolute right-3 top-3 text-gray-500">✕</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Social Link 2
              </label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option>Twitter</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Profile link/url..."
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <button className="absolute right-3 top-3 text-gray-500">✕</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Social Link 2
              </label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option>Instagram</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Profile link/url..."
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <button className="absolute right-3 top-3 text-gray-500">✕</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Social Link 3
              </label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option>YouTube</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Profile link/url..."
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <button className="absolute right-3 top-3 text-gray-500">✕</button>
            </div>
          </div>
        </div>
        <button className="border border-gray-300 rounded-full p-2 flex items-center space-x-2 text-gray-600">
          <span className="text-xl">+</span>
          <span>Add New Social Link</span>
        </button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    );
  };
  
  export default SocialLinks;
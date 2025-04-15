export default function FoundingInfo() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Organization Type</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Industry Types</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Team Size</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Select...</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Year of Establishment</label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="dd/mm/yyyy"
              min="1900-01-01"
              max={new Date().toISOString().split("T")[0]} // Restrict to today's date
              style={{ width: '100%' }} // Ensure the calendar matches the input width
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Website</label>
            <div className="flex items-center mt-1">
              
              <input type="text" placeholder="🔗Website url..." className="block w-full border border-gray-300 rounded-md p-2" />
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-md">
          <label className="block text-sm px-3 py-2 font-medium text-gray-700">
            Biography
          </label>
          <textarea
            placeholder="Write down your biography here. Let the employer know who you are..."
            className="mt-1 block h-56 w-full  px-3 py-2 h-32"
          />
          <div className="mt-2 px-3 py-2 flex space-x-2 text-gray-500">
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝐁</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝑰</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝑼</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝑺</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">🔗</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">𝐻</button>
            <button className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md">≡</button>
          </div>
        </div>
      </div>
    );
  }
import React from 'react';
import { Calendar, Link, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon } from 'lucide-react';

const EmployeeCompanyInfo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Organization Type, Industry Types, Team Size */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Organization Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ORGANIZATION TYPE
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="startup">Startup</option>
            <option value="corporate">Corporate</option>
            <option value="nonprofit">Nonprofit</option>
          </select>
        </div>
        {/* Industry Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            INDUSTRY TYPES
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="tech">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
          </select>
        </div>
        {/* Team Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            TEAM SIZE
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
          </select>
        </div>
      </div>

      {/* Year of Establishment, Company Website */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Year of Establishment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YEAR OF ESTABLISHMENT
          </label>
          <div className="relative">
            <input
              type="date"
              placeholder="mm/dd/yyyy"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Company Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            COMPANY WEBSITE
          </label>
          <div className="relative">
            <input
              type="url"
              placeholder="Website url..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>
      </div>

      {/* Company Vision */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          COMPANY VISION
        </label>
        <div className='border rounded-lg'>
        <textarea
          className="w-full p-3  focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          placeholder="Tell us what Vision of your company..."
        />
        {/* Enhanced Editor Toolbar */}
        <div className="flex gap-1 mt-2  p-2 rounded-lg shadow-sm">
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Bold">
            <Bold className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Italic">
            <Italic className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Underline">
            <Underline className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Bulleted List">
            <List className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Numbered List">
            <ListOrdered className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Link">
            <LinkIcon className="w-5 h-5" />
          </button>
        </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-start">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EmployeeCompanyInfo;
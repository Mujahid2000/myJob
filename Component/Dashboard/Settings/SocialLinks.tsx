// components/SocialLink.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { BsYoutube } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

const SocialLink = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: 1, platform: 'Facebook', url: '' },
    { id: 2, platform: 'Twitter', url: '' },
    { id: 3, platform: 'Instagram', url: '' },
    { id: 4, platform: 'YouTube', url: '' },
  ]);

  const platforms = ['Facebook', 'Twitter', 'Instagram', 'YouTube'];

  const addNewLink = () => {
    setSocialLinks([
      ...socialLinks,
      { id: socialLinks.length + 1, platform: platforms[0], url: '' },
    ]);
  };

  const removeLink = (id: number) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
  };

  const updateLink = (id: number, field: 'platform' | 'url', value: string) => {
    setSocialLinks(
      socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Social Links:', socialLinks);
    // Add API call or further logic to save changes
  };

  return (
    <div className="py-6 px-3 h-screen bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {socialLinks.map((link, index) => (
          <div key={link.id} className=" items-center ">
            {/* Label */}
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700">
                Social Link {index + 1}
              </label>
            </div>

            {/* Platform Dropdown */}
           <div className='flex items-center gap-5'>
           <div className="flex items-center space-x-2 flex-1">
              <div className="relative">
                <select
                  value={link.platform}
                  onChange={(e) =>
                    updateLink(link.id, 'platform', e.target.value)
                  }
                  className="appearance-none w-53 bg-white border border-gray-300 rounded-md py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
                {/* Platform Icon */}
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  {link.platform === 'Facebook' && (
                    <span className="text-blue-600"><FaFacebookF /></span>
                  )}
                  {link.platform === 'Twitter' && (
                    <span className="text-blue-400"><FaTwitter /></span>
                  )}
                  {link.platform === 'Instagram' && (
                    <span className="text-pink-500 text-xl"><FaInstagram /></span>
                  )}
                  {link.platform === 'YouTube' && (
                    <span className="text-red-600"><BsYoutube /></span>
                  )}
                </span>
                {/* Dropdown Arrow */}
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ▼
                </span>
              </div>

              {/* URL Input */}
              <input
                type="text"
                value={link.url}
                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                placeholder="Profile link/url..."
                className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => removeLink(link.id)}
              className="p-2 rounded-full cursor-pointer border border-gray-300 hover:bg-gray-100"
            >
              <X size={16} className="text-gray-500" />
            </button>
           </div>
          </div>
        ))}

        {/* Add New Social Link Button */}
        <div className="flex bg-[#F1F2F4] w-full border py-2 justify-center mt-4">
          <button
            type="button"
            onClick={addNewLink}
            className="flex items-center font-medium cursor-pointer space-x-2 text-gray-600 hover:text-blue-600"
          >
            <CiCirclePlus className='text-lg'/>

            <span className=''>Add New Social Link</span>
          </button>
        </div>

        {/* Save Changes Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-xs hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialLink;
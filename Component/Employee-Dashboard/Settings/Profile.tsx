import React, { useState, ChangeEvent } from 'react';
import { CloudUpload, Bold, Italic, Underline, List, ListOrdered, Link } from 'lucide-react';

const Profile: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = (file.size / (1024 * 1024)).toFixed(1);
      if (parseFloat(fileSize) > 5) {
        alert('File size exceeds 5MB limit');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = (file.size / (1024 * 1024)).toFixed(1);
      if (parseFloat(fileSize) > 5) {
        alert('File size exceeds 5MB limit');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => setLogoPreview(null);
  const removeBanner = () => setBannerPreview(null);

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      {/* Logo & Banner Section */}
      <div className="flex gap-4 mb-6">
        {/* Logo */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LOGO & BANNER IMAGE
          </label>
          <div className="relative bg-gray-200 h-48 rounded-lg flex items-center justify-center overflow-hidden">
            {logoPreview ? (
              <>
                <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  {(logoPreview.length / (1024 * 1024)).toFixed(1)} MB •{' '}
                  <button onClick={removeLogo} className="underline">Remove</button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center text-gray-500">
                  <CloudUpload className="w-8 h-8 mb-2" />
                  <span>Upload Logo</span>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Banner */}
        <div className="flex-2 w-2/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            BANNER IMAGE
          </label>
          <div className="relative bg-gray-200 h-48 rounded-lg flex items-center justify-center overflow-hidden">
            {bannerPreview ? (
              <>
                <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  {(bannerPreview.length / (1024 * 1024)).toFixed(1)} MB •{' '}
                  <button onClick={removeBanner} className="underline">Remove</button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center text-gray-500">
                  <CloudUpload className="w-8 h-8 mb-2" />
                  <span>Upload Banner</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Company Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          COMPANY NAME
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A65CC]"
          placeholder="Enter company name"
        />
      </div>

      {/* About Us */}
      <div className="mb-6 ">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ABOUT US
        </label>
        <div className='border rounded-lg shadow-sm'>
          <textarea
          className="w-full p-3  focus:outline-none "
          rows={5}
          placeholder="Write down your company here. Let the candidate know who we are..."
        />
        {/* Enhanced Editor Toolbar */}
        <div className="flex gap-1 mt-2  p-2 ">
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
            <Link className="w-5 h-5" />
          </button>
        </div>
        </div>
        
      </div>

      {/* Save Button */}
      <div className="flex justify-start">
        <button className="bg-[#0A65CC] text-white px-6 py-3 rounded-sm cursor-pointer hover:bg-blue-500">
          Save Change
        </button>
      </div>
    </div>
  );
};

export default Profile;
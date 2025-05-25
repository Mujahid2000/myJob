import React, { useState, ChangeEvent, useContext, useEffect } from 'react';
import { CloudUpload, Bold, Italic, Underline, List, ListOrdered, Link } from 'lucide-react';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useGetCompanyPersonalQuery } from '@/RTKQuery/companySlice';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './custom.css';

const Profile: React.FC = () => {
  const [value, setValue] = useState(''); // State for ReactQuill content
  const [logoSrc, setLogoSrc] = useState<string | null>(null); // State for logo image source
  const [bannerSrc, setBannerSrc] = useState<string | null>(null); // State for banner image source
  const [logoFile, setLogoFile] = useState<File | null>(null); // State for logo file
  const [bannerFile, setBannerFile] = useState<File | null>(null); // State for banner file
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
  const userId = userEmail?.user?._id || '';
  const email = userEmail?.user?.email || '';
  const { data: companyPersonalData } = useGetCompanyPersonalQuery(userId);

  // Initialize state with companyPersonalData when available
  useEffect(() => {
    // Debug: Log companyPersonalData to verify its content
    console.log('companyPersonalData:', companyPersonalData);

    if (companyPersonalData?.logo && !logoFile) {
      setLogoSrc(companyPersonalData.logo);
    }
    if (companyPersonalData?.banner && !bannerFile) {
      setBannerSrc(companyPersonalData.banner);
    }
    if (companyPersonalData?.biography) {
      setValue(companyPersonalData.biography); // Set biography as default value
    }
  }, [companyPersonalData, logoFile, bannerFile]);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = (file.size / (1024 * 1024)).toFixed(1);
      if (parseFloat(fileSize) > 5) {
        alert('File size exceeds 5MB limit');
        return;
      }
      setLogoFile(file); // Store the file in state
      setLogoSrc(URL.createObjectURL(file)); // Set the image source to the local file
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
      setBannerFile(file); // Store the file in state
      setBannerSrc(URL.createObjectURL(file)); // Set the image source to the local file
    }
  };

  const removeLogo = () => {
    setLogoFile(null); // Clear logo file state
    setLogoSrc(null); // Clear logo source state to show upload UI
  };

  const removeBanner = () => {
    setBannerFile(null); // Clear banner file state
    setBannerSrc(null); // Clear banner source state to show upload UI
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Logo & Banner Section */}
      <div className="flex gap-4 mb-6">
        {/* Logo */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LOGO IMAGE
          </label>
          <div className="relative bg-gray-200 h-48 rounded-lg flex items-center justify-center overflow-hidden">
            {logoSrc ? (
              <>
                <img
                  src={logoSrc}
                  alt="Logo Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  {logoFile
                    ? `${(logoFile.size / (1024 * 1024)).toFixed(1)} MB`
                    : 'Logo Uploaded'}
                  {' '}•{' '}
                  <button onClick={removeLogo} className="underline">
                    Remove
                  </button>
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
            {bannerSrc ? (
              <>
                <img
                  src={bannerSrc}
                  alt="Banner Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  {bannerFile
                    ? `${(bannerFile.size / (1024 * 1024)).toFixed(1)} MB`
                    : 'Banner Uploaded'}
                  {' '}•{' '}
                  <button onClick={removeBanner} className="underline">
                    Remove
                  </button>
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
          defaultValue={companyPersonalData?.companyName}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A65CC]"
          placeholder="Enter company name"
        />
      </div>

      {/* About Us */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ABOUT US
        </label>
        <ReactQuill
          className="mt-1 rounded-md text-xl block h-56 w-full"
          theme="snow"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          placeholder="Write down your company here. Let the candidate know who we are..."
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-start pt-10">
        <button className="bg-[#0A65CC] text-white px-6 py-3 rounded-sm cursor-pointer hover:bg-blue-500">
          Save Change
        </button>
      </div>
    </div>
  );
};

export default Profile;
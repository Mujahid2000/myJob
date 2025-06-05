import React, { useState, useEffect, useContext } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { BsYoutube } from 'react-icons/bs';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useGetCompanySocialLinksQuery } from '@/RTKQuery/companySlice';

interface SocialLink {
  id: string; // Use string to support MongoDB _id
  platform: string;
  url: string;
}

const SocialLink: React.FC = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, error: userEmailError, isLoading: isUserLoading } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
  const userId = userEmail?.user?._id || '';
  const { data: companySocialData, isLoading:isSocialLoading, error: socialError } = useGetCompanySocialLinksQuery(userId);

  const defaultLinks: SocialLink[] = [
    { id: '1', platform: 'Facebook', url: '' },
    { id: '2', platform: 'Twitter', url: '' },
    { id: '3', platform: 'Instagram', url: '' },
    { id: '4', platform: 'YouTube', url: '' },
  ];

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultLinks);

  const platforms = ['Facebook', 'Twitter', 'Instagram', 'YouTube'];

  // Initialize socialLinks with server data if available
  useEffect(() => {
    if (companySocialData?.socialLinks && companySocialData.socialLinks.length > 0) {
      const normalizedLinks = companySocialData.socialLinks.map((link: any, index: number) => ({
        id: link._id || String(index + 1), // Use _id from server or fallback to index
        platform: platforms.includes(link.platform) ? link.platform : platforms[0],
        url: link.url || '',
      }));
      setSocialLinks(normalizedLinks);
    } else {
      setSocialLinks(defaultLinks); // Fallback to default links if no server data
    }
  }, [companySocialData]);

  const updateLink = (id: string, field: 'platform' | 'url', value: string) => {
    setSocialLinks(
      socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic URL validation
    const invalidLinks = socialLinks.filter(link => link.url && !/^(https?:\/\/)/.test(link.url));
    if (invalidLinks.length > 0) {
      alert('Please enter valid URLs starting with http:// or https://');
      return;
    }
    console.log('Social Links:', socialLinks);
    // Add API call here to save socialLinks, e.g.:
    /*
    try {
      await fetch('/api/social-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socialLinks),
      });
      console.log('Social Links saved successfully');
    } catch (error) {
      console.error('Error saving social links:', error);
    }
    */
  };

  // Handle loading and error states
  if (isUserLoading || isSocialLoading) {
    return <div className="py-6 px-3 text-center">Loading...</div>;
  }

  if (userEmailError || socialError) {
    return <div className="py-6 px-3 text-center text-red-500">Error loading social links. Please try again.</div>;
  }

  return (
    <div className="py-6 px-3 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {socialLinks.map((link, index) => (
          <div key={link.id} className="items-center">
            {/* Label */}
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700">
                Social Link {index + 1}
              </label>
            </div>

            {/* Platform Dropdown and URL Input */}
            <div className="flex items-center gap-5">
              <div className="flex flex-col lg:flex-row gap-6 items-center space-x-2 flex-1">
                <div className="relative w-full lg:w-48 ">
                  <select
                    value={link.platform}
                    onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                    className="appearance-none w-full lg:w-48 mt-2 lg:mt-0 bg-white border border-gray-300 rounded-md py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      <FaFacebookF className="text-blue-600" />
                    )}
                    {link.platform === 'Twitter' && (
                      <FaTwitter className="text-blue-400" />
                    )}
                    {link.platform === 'Instagram' && (
                      <FaInstagram className="text-pink-500 text-xl" />
                    )}
                    {link.platform === 'YouTube' && (
                      <BsYoutube className="text-red-600" />
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
                  className="flex-1 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Save Changes Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-md hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
          >
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialLink;
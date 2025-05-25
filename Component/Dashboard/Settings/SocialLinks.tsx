'use client';

import React, { useContext, useState } from 'react'; // Removed duplicate useContext import
import { X } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { BsYoutube } from 'react-icons/bs';
import { CiCirclePlus } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { setRenderState } from '@/Store/accountSetupTabs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostSocialMediaInfoMutation } from '@/RTKQuery/socialMediaApiSlice';
import { setSocialLinks, addSocialLinks, removeSocialLinks, updateSocialLinks, resetSocialLinks } from '@/Store/socialMediaSlice';
import { RootState } from '@/Store/Store';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { toast, Toaster } from 'sonner'; // Ensure toast is imported

interface Inputs {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  [key: string]: string | undefined; // Allow dynamic fields
}

const SocialLinks = () => {
  const dispatch = useDispatch();
  const { socialLinks } = useSelector((state: RootState) => state.socialMedia);
  const [postSocialMediaInfo, { isLoading, error }] = usePostSocialMediaInfoMutation();

  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '', {
    skip: !currentUser?.email,
  });
  const userId = userEmail?.user?._id;
  console.log(userId)
  const platforms = ['Facebook', 'Twitter', 'Instagram', 'YouTube'];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: socialLinks.reduce((acc, link) => {
      acc[link.platform.toLowerCase()] = link.url;
      return acc;
    }, {} as Inputs),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!userId) {
      toast.error('User ID is required!');
      return;
    }

    const updatedLinks = socialLinks.map((link) => ({
      ...link,
      url: data[link.platform.toLowerCase()] || '',
    }));

    try {
      dispatch(setSocialLinks(updatedLinks));

      // Send data to backend server
      const response = await postSocialMediaInfo({
        userId,
        socialLinks: updatedLinks,
      }).unwrap();

      // Show success toast if data is sent successfully
      toast.success('Social media info saved successfully!');

      // Reset form and navigate to next tab
      reset();
      dispatch(resetSocialLinks());
      dispatch(setRenderState('Contact'));
    } catch (err) {
      console.error('Failed to update social media info:', err);
      toast.error('Failed to update social media info!');
    }
  };

  const addNewLink = () => {
    const newLink = { id: socialLinks.length + 1, platform: platforms[0], url: '' };
    dispatch(addSocialLinks(newLink));
  };

  const removeLink = (id: number) => {
    dispatch(removeSocialLinks(id));
  };

  const updateLink = (id: number, field: 'platform' | 'url', value: string) => {
    dispatch(updateSocialLinks({ id, field, value }));
  };

  return (
    <div className="py-6 px-3 bg-white lg:h-screen rounded-lg max-w-7xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {socialLinks.map((link, index) => (
          <div key={link.id} className="items-center">
            {/* Label */}
            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700">
                Social Link {index + 1}
              </label>
            </div>

            {/* Platform Dropdown */}
            <div className="flex items-center gap-5">
              <div className="flex items-center space-x-2 flex-1">
                <div className="relative">
                  <select
                    value={link.platform}
                    onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
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
                      <span className="text-blue-600">
                        <FaFacebookF />
                      </span>
                    )}
                    {link.platform === 'Twitter' && (
                      <span className="text-blue-400">
                        <FaTwitter />
                      </span>
                    )}
                    {link.platform === 'Instagram' && (
                      <span className="text-pink-500 text-xl">
                        <FaInstagram />
                      </span>
                    )}
                    {link.platform === 'YouTube' && (
                      <span className="text-red-600">
                        <BsYoutube />
                      </span>
                    )}
                  </span>
                  {/* Dropdown Arrow */}
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
                </div>

                {/* URL Input */}
                <input
                  type="url"
                  {...register(link.platform.toLowerCase(), {
                    required: `${link.platform} URL is required`,
                    pattern: {
                      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                      message: `Please enter a valid ${link.platform} URL`,
                    },
                  })}
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
            {errors[link.platform.toLowerCase()] && (
              <p className="text-red-500 text-sm mt-1">{errors[link.platform.toLowerCase()]?.message}</p>
            )}
          </div>
        ))}

        {/* Add New Social Link Button */}
        <div className="flex bg-[#F1F2F4] w-full border py-2 justify-center mt-4">
          <button
            type="button"
            onClick={addNewLink}
            className="flex items-center font-medium cursor-pointer space-x-2 text-gray-600 hover:text-blue-600"
          >
            <CiCirclePlus className="text-lg" />
            <span>Add New Social Link</span>
          </button>
        </div>
      </form>
      <div className="mt-6 flex justify-between">
        <button
          type="submit"
          disabled={isLoading}
          onClick={() => document.querySelector('form')?.requestSubmit()}
          className="px-4 py-2 bg-[#0A65CC] text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 disabled:bg-gray-400"
        >
          <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
          {!isLoading && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p className="text-red-500">
          {('data' in error && (error.data as any)?.message) || 'An error occurred'}
        </p>
      )}
      <Toaster richColors />
    </div>
  );
};

export default SocialLinks;
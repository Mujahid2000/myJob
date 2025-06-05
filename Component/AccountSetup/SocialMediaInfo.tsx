'use client';

import React, { JSX, useCallback, useMemo } from 'react';
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

// Define interfaces for type safety
interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

interface Inputs {
  [key: string]: string;
}

const platforms = ['Facebook', 'Twitter', 'Instagram', 'YouTube'] as const;
type Platform = typeof platforms[number];

const platformIcons: Record<Platform, JSX.Element> = {
  Facebook: <FaFacebookF className="text-blue-600" />,
  Twitter: <FaTwitter className="text-blue-400" />,
  Instagram: <FaInstagram className="text-pink-500 text-xl" />,
  YouTube: <BsYoutube className="text-red-600" />,
};

const SocialMediaInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { socialLinks } = useSelector((state: RootState) => state.socialMedia);
  const [postSocialMediaInfo, { isLoading, error }] = usePostSocialMediaInfoMutation();
  const authContext = React.useContext(AuthContext);
  const { data: userEmail } = useGetUserByIdQuery(authContext?.currentUser?.email || '', {
    skip: !authContext?.currentUser?.email,
  });
  const userId = userEmail?.user?._id;

  const defaultValues = useMemo(
    () =>
      socialLinks.reduce((acc, link) => {
        acc[link.platform.toLowerCase()] = link.url;
        return acc;
      }, {} as Inputs),
    [socialLinks]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      if (!userId) {
        alert('User ID is required!');
        return;
      }

      const updatedLinks = socialLinks.map((link) => ({
        ...link,
        url: data[link.platform.toLowerCase()] || '',
      }));

      try {
        dispatch(setSocialLinks(updatedLinks));
        await postSocialMediaInfo({ userId, socialLinks: updatedLinks }).unwrap();
        dispatch(resetSocialLinks());
        dispatch(setRenderState('Contact'));
      } catch (err) {
        console.error('Failed to update social media info:', err);
        alert('Failed to update social media info!');
      }
    },
    [dispatch, postSocialMediaInfo, socialLinks, userId]
  );

  const addNewLink = useCallback(() => {
    dispatch(addSocialLinks({ id: socialLinks.length + 1, platform: platforms[0], url: '' }));
  }, [dispatch, socialLinks.length]);

  const removeLink = useCallback((id: number) => {
    dispatch(removeSocialLinks(id));
  }, [dispatch]);

  const updateLink = useCallback(
    (id: number, field: 'url' | 'platform', value: string) => {
      dispatch(updateSocialLinks({ id, field, value }));
    },
    [dispatch]
  );

  const renderError = useMemo(() => {
    if (!error) return null;
    return (
      <p className="text-red-500 text-sm mt-2">
        {'data' in error ? (error as any).data?.message : 'An error occurred'}
      </p>
    );
  }, [error]);

  return (
    <div className="p-6 bg-white rounded-lg max-w-7xl mx-auto shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {socialLinks.map((link: SocialLink, index: number) => (
          <div key={link.id} className="flex items-center gap-4">
            <label className="w-24 text-sm font-medium text-gray-700">
              Social Link {index + 1}
            </label>
            <div className="flex-1 flex items-center gap-3">
              <div className="relative w-48">
                <select
                  value={link.platform}
                  onChange={(e) => updateLink(link.id, 'platform', e.target.value)}
                  className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  {platformIcons[link.platform as Platform]}
                </span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
              </div>
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
              <button
                type="button"
                onClick={() => removeLink(link.id)}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            {errors[link.platform.toLowerCase()] && (
              <p className="text-red-500 text-sm mt-1">{errors[link.platform.toLowerCase()]?.message}</p>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addNewLink}
          className="flex items-center justify-center w-full py-2 bg-gray-100 rounded-md text-gray-600 hover:text-blue-600 transition-colors"
        >
          <CiCirclePlus className="text-lg mr-2" />
          Add New Social Link
        </button>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => dispatch(setRenderState('Founding Info'))}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2 transition-colors"
          >
            {isLoading ? 'Saving...' : 'Save & Next'}
            {!isLoading && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
        {renderError}
      </form>
    </div>
  );
};

export default SocialMediaInfo;
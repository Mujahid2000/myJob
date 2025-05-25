// CompanyInfo.tsx
'use client';

import './custom.css';
import { CloudUpload } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  setCompanyName,
  setBiography,
  resetForm,
  setLogo,
  setBanner,
} from '../../Store/companyInfoSlice';
import { useUpdateCompanyInfoMutation } from '@/RTKQuery/companySlice';
import { RootState } from '@/Store/Store';
import { setRenderState } from '@/Store/accountSetupTabs';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';


type Inputs = {
  companyName: string;
  biography: string;
};

export default function CompanyInfo() {
  const dispatch = useDispatch();
  const { logo, banner, companyName, biography } = useSelector(
    (state: RootState) => state.companyInfo
  );

  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '');
  const id = userEmail?.user?._id;

  const [updateCompanyInfo, { isLoading, error }] = useUpdateCompanyInfoMutation();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      companyName,
      biography,
    },
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!id) {
      alert('User ID is required!');
      return;
    }

    const formData = new FormData();
    formData.append('userId', id);
    formData.append('companyName', data.companyName);
    formData.append('biography', data.biography);

    if (logoFile) {
      formData.append('logo', logoFile);
    }
    if (bannerFile) {
      formData.append('banner', bannerFile);
    }

    try {
      await updateCompanyInfo(formData).unwrap();
      dispatch(resetForm());
      setLogoFile(null);
      setBannerFile(null);
      dispatch(setRenderState('Founding Info'));
    } catch (err) {
      console.error('Failed to update company info:', err);
      alert('Failed to update company info!');
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Logo & Banner Image</h2>
        <div className="flex gap-5">
          {/* Logo Upload */}
          <div className="flex-1 relative flex flex-col border-2 border-dashed border-gray-300 rounded-lg items-center justify-center p-4">
            {isClient && logo ? (
              <div className="relative w-full h-40">
                <img src={logo} alt="Logo Preview" className="w-full h-full object-cover rounded-lg" />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs"
                  onClick={() => {
                    dispatch(setLogo(null));
                    setLogoFile(null);
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    name="logo"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          alert('File size exceeds 5 MB');
                        } else {
                          setLogoFile(file);
                          if (typeof window !== 'undefined') {
                            dispatch(setLogo(URL.createObjectURL(file)));
                          }
                        }
                      }
                    }}
                  />
                  <CloudUpload size={44} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Browse photo or drop here
                </p>
                <p className="text-xs text-gray-400 text-center">
                  A photo larger than 400px works best. Max size 5 MB.
                </p>
              </>
            )}
          </div>

          {/* Banner Upload */}
          <div className="flex-1 relative flex flex-col border-2 border-dashed border-gray-300 rounded-lg items-center justify-center p-4">
            {isClient && banner ? (
              <div className="relative w-full h-40">
                <img src={banner} alt="Banner Preview" className="w-full h-full object-cover rounded-lg" />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs"
                  onClick={() => {
                    dispatch(setBanner(null));
                    setBannerFile(null);
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    name="banner"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          alert('File size exceeds 5 MB');
                        } else {
                          setBannerFile(file);
                          if (typeof window !== 'undefined') {
                            dispatch(setBanner(URL.createObjectURL(file)));
                          }
                        }
                      }
                    }}
                  />
                  <CloudUpload size={44} className="text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Browse photo or drop here
                </p>
                <p className="text-xs text-gray-400 text-center">
                  Optimal 1520x400. Max 5 MB. JPEG/PNG.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Company name</label>
        <input
          type="text"
          {...register('companyName')}
          value={companyName}
          onChange={(e) => {
            dispatch(setCompanyName(e.target.value));
            setValue('companyName', e.target.value);
          }}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Biography */}
      <div>
        <label className="block text-sm font-medium text-gray-700">About Us</label>
        <ReactQuill
          className="mt-1 rounded-md text-xl block h-56 w-full"
          theme="snow"
          value={biography}
          onChange={(value) => {
            dispatch(setBiography(value));
            setValue('biography', value);
          }}
          placeholder="Write something about your company..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 mt-6 py-2 mt-15 bg-[#0A65CC] text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 disabled:bg-gray-400"
      >
        <span>{isLoading ? 'Saving...' : 'Save & Next'}</span>
        {!isLoading && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 mt-2">
          {'data' in error ? (error.data as any)?.message : 'An error occurred'}
        </p>
      )}
    </form>
  );
}

import React, { useState, useEffect, useContext } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { Eye, EyeOff, MapPin, Mail } from 'lucide-react';
import { RxCross2 } from 'react-icons/rx';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useGetCompanyContactsQuery } from '@/RTKQuery/companySlice';

interface ContactFormData {
  location: string;
  phone: string;
  email: string;
  countryCode: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Settings: React.FC = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, error: userEmailError, isLoading: isUserLoading } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
  const userId = userEmail?.user?._id || '';
  const { data: contactData, isLoading: isContactLoading, error: contactError } = useGetCompanyContactsQuery(userId);

  // Form hooks for Contact Info and Password
  const contactForm = useForm<ContactFormData>({
    defaultValues: {
      location: '',
      phone: '',
      email: '',
      countryCode: '+880', // Default country code
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // State for password visibility
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Initialize contactForm with contactData when available
  useEffect(() => {
    if (contactData) {
      console.log('contactData:', contactData); // Debug log
      contactForm.reset({
        location: contactData.mapLocation || '',
        phone: contactData.phoneNumber || '',
        email: contactData.email || '',
        
      });
    }
  }, [contactData, contactForm]);

  // Handlers
  const handleContactSubmit = (data: ContactFormData) => {
    console.log('Contact Info:', {
      ...data,
      phone: `${data.countryCode}${data.phone}`, // Combine country code and phone
    });
    // Add API call here, e.g.:
    /*
    try {
      await fetch('/api/contact-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, phone: `${data.countryCode}${data.phone}` }),
      });
      console.log('Contact Info saved successfully');
    } catch (error) {
      console.error('Error saving contact info:', error);
    }
    */
  };

  const handlePasswordSubmit = (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      passwordForm.setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }
    console.log('Passwords:', data);
    // Add API call here, e.g.:
    /*
    try {
      await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
    }
    */
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle loading and error states
  if (isUserLoading || isContactLoading) {
    return <div className="py-6 px-3 text-center">Loading...</div>;
  }

  if (userEmailError || contactError) {
    return <div className="py-6 px-3 text-center text-red-500">Error loading data. Please try again.</div>;
  }

  return (
    <FormProvider {...contactForm} {...passwordForm}>
      <div className="py-5 px-2 max-w-7xl mx-auto space-y-8">
        {/* Contact Info Section */}
        <div className="bg-white border-b pb-5">
          <h2 className="text-xl font-semibold mb-4">CONTACT INFO</h2>
          <form onSubmit={contactForm.handleSubmit(handleContactSubmit)} className="space-y-4">
            {/* Map Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                MAP LOCATION
              </label>
              <input
                {...contactForm.register('location', {
                  required: 'Location is required',
                })}
                type="text"
                placeholder="City, state, country name"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {contactForm.formState.errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {contactForm.formState.errors.location.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PHONE
              </label>
              <div className="flex border border-gray-300 rounded-md items-center">
                <Controller
                  name="countryCode"
                  control={contactForm.control}
                  rules={{ required: 'Country code is required' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="p-2 focus:outline-none text-gray-600 border-r border-gray-300"
                    >
                      <option value="+88">🇧🇩 +88</option>
                      <option value="+92">🇵🇰 +92</option>
                      <option value="+60">🇲🇾 +60</option>
                      <option value="+90">🇹🇷 +90</option>
                    </select>
                  )}
                />
                <input
                  {...contactForm.register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\d+$/,
                      message: 'Phone number must contain only digits',
                    },
                  })}
                  type="text"
                  placeholder="Phone number..."
                  className="w-full border-none rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {contactForm.formState.errors.countryCode && (
                <p className="text-red-500 text-sm mt-1">
                  {contactForm.formState.errors.countryCode.message}
                </p>
              )}
              {contactForm.formState.errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {contactForm.formState.errors.phone.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EMAIL
              </label>
              <div className="relative">
                <input
                  {...contactForm.register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  placeholder="Email address"
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
              {contactForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {contactForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-md hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
            >
              SAVE CHANGES
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-lg">
          <h2 className="text-xl font-semibold mb-4">CHANGE PASSWORD</h2>
          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CURRENT PASSWORD
                </label>
                <div className="relative">
                  <input
                    {...passwordForm.register('currentPassword', {
                      required: 'Current password is required',
                    })}
                    type={showPasswords.current ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={16} className="text-gray-400" />
                    ) : (
                      <Eye size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
                {passwordForm.formState.errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordForm.formState.errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NEW PASSWORD
                </label>
                <div className="relative">
                  <input
                    {...passwordForm.register('newPassword', {
                      required: 'New password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    type={showPasswords.new ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.new ? (
                      <EyeOff size={16} className="text-gray-400" />
                    ) : (
                      <Eye size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CONFIRM PASSWORD
                </label>
                <div className="relative">
                  <input
                    {...passwordForm.register('confirmPassword', {
                      required: 'Confirm password is required',
                    })}
                    type={showPasswords.confirm ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={16} className="text-gray-400" />
                    ) : (
                      <Eye size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-md hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
            >
              SAVE CHANGES
            </button>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="bg-white rounded-lg">
          <h2 className="text-xl font-semibold mb-2">DELETE YOUR ACCOUNT</h2>
          <p className="text-sm text-gray-600 mb-4">
            If you delete the job applicant account, you will no longer be able to
            get information about the matched jobs, following employers, and job
            alert, shortlisted jobs and also the abandoned jobs from all the job
            platform Jobpilot.
          </p>
          <button className="text-red-600 flex items-center gap-3 cursor-pointer hover:underline">
            <RxCross2 />
            Close Account
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default Settings;
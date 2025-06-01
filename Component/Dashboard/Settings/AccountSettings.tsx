import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, MapPin, Mail } from 'lucide-react';
import { RxCross2 } from 'react-icons/rx';
import { useGetUserContactDataQuery } from '@/RTKQuery/contact';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { toast, Toaster } from 'sonner';
import { useGetJobAlertsDataQuery, useGetProfilePrivacyDataQuery, useGetUserNotificationQuery, useUpdateJobAlertsMutation, useUpdatePasswordMutation, useUpdateProfilePrivacyMutation, useUpdateUserNotificationMutation } from '@/RTKQuery/NotificationApiSlice';

// টাইপ ডেফিনিশন
type ContactInputs = { email: string; phoneNumber: string; mapLocation: string };
type NotificationInputs = { shortlist: boolean; jobsExpire: boolean; jobAlerts: boolean; savedProfile: boolean; rejected: boolean };
type JobAlertInputs = { jobRole: string; location: string };
type ProfilePrivacyInputs = { profilePublic: boolean; resumePublic: boolean };
type PasswordInputs = { currentPassword: string; newPassword: string; confirmPassword: string };

// toast styles 
const toastStyles = {
  success: { backgroundColor: '#4CAF50', color: 'white' },
  error: { backgroundColor: '#f44336', color: 'white' },
  warning: { backgroundColor: '#ff9800', color: 'white' },
};

const Settings = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
  const userId = userEmail?.user?._id || '';
  const email = userEmail?.user?.email || '';

  const { data: userContactData, error: contactError } = useGetUserContactDataQuery(email, { skip: !email });
  const userDataContact = userContactData?.data;

  const { data: privacyProfile, isLoading: isPrivacyLoading, error: privacyError } = useGetProfilePrivacyDataQuery(userId, { skip: !userId });
  const { data: jobAlerts, isLoading: jobAlertLoading, error: jobAlertError } = useGetJobAlertsDataQuery(userId, { skip: !userId });
  const alertsJobsData = jobAlerts?.data;

  const { data: notification, isLoading: isNotificationLoading, error: notificationError } = useGetUserNotificationQuery(userId, { skip: !userId });
  const notificationData = notification?.result;

  const [updateNotification, { isLoading: notificationLoading }] = useUpdateUserNotificationMutation();
  const [updateJobAlerts, { isLoading: jobAlertsLoading }] = useUpdateJobAlertsMutation();
  const [updateProfilePrivacy, { isLoading: privacyLoading }] = useUpdateProfilePrivacyMutation();
  const [updatePassword, {isLoading:passwordChangeLoading}] =useUpdatePasswordMutation()
  // form validation
  const contactForm = useForm<ContactInputs>({
    defaultValues: { email: '', phoneNumber: '', mapLocation: '' },
  });
  const notificationForm = useForm<NotificationInputs>({
    defaultValues: { shortlist: false, jobsExpire: false, jobAlerts: false, savedProfile: false, rejected: false },
  });
  const jobAlertForm = useForm<JobAlertInputs>({
    defaultValues: { jobRole: '', location: '' },
  });
  const profilePrivacyForm = useForm<ProfilePrivacyInputs>({
    defaultValues: { profilePublic: false, resumePublic: false },
  });
  const passwordForm = useForm<PasswordInputs>({
    defaultValues: { confirmPassword: '', newPassword: '', currentPassword: '' },
  });

  const [showPasswords, setShowPasswords] = useState({ currentPassword: false, newPassword: false, conFirmPassword: false });

  // form reset after loaded data
  useEffect(() => {
    if (userDataContact) {
      contactForm.reset({
        email: userDataContact.email || '',
        phoneNumber: userDataContact.phoneNumber !== undefined ? String(userDataContact.phoneNumber) : '',
        mapLocation: userDataContact.mapLocation || '',
      });
    }
  }, [userDataContact, contactForm]);

  useEffect(() => {
    if (notificationData && !isNotificationLoading) {
      notificationForm.reset({
        shortlist: notificationData.shortlist || false,
        jobsExpire: notificationData.jobsExpire || false,
        jobAlerts: notificationData.jobAlerts || false,
        savedProfile: notificationData.savedProfile || false,
        rejected: notificationData.rejected || false,
      });
    }
  }, [notificationData, isNotificationLoading, notificationForm]);

  useEffect(() => {
    if (alertsJobsData && !jobAlertLoading) {
      jobAlertForm.reset({
        jobRole: alertsJobsData.jobRole || '',
        location: alertsJobsData.location || '',
      });
    }
  }, [alertsJobsData, jobAlertLoading, jobAlertForm]);

  useEffect(() => {
    if (privacyProfile?.data && !isPrivacyLoading) {
      profilePrivacyForm.reset({
        profilePublic: privacyProfile.data.profilePublic || false,
        resumePublic: privacyProfile.data.resumePublic || false,
      });
    }
  }, [privacyProfile, isPrivacyLoading, profilePrivacyForm]);

  // API fetching error handling
  useEffect(() => {
    if (userEmailError) {
      toast.error('Failed to fetch user data', { style: toastStyles.error });
      console.error('User fetch error:', userEmailError);
    }
    if (contactError) {
      toast.error('Failed to fetch contact data', { style: toastStyles.error });
      console.error('Contact fetch error:', contactError);
    }
    if (privacyError) {
      toast.error('Failed to fetch privacy settings', { style: toastStyles.error });
      console.error('Privacy fetch error:', privacyError);
    }
    if (jobAlertError) {
      toast.error('Failed to fetch job alerts', { style: toastStyles.error });
      console.error('Job alerts fetch error:', jobAlertError);
    }
    if (notificationError) {
      toast.error('Failed to fetch notification settings', { style: toastStyles.error });
      console.error('Notification fetch error:', notificationError);
    }
  }, [userEmailError, contactError, privacyError, jobAlertError, notificationError]);

  // form submission handlers
  const onSubmitContact: SubmitHandler<ContactInputs> = useCallback(async (data) => {
    try {
      if (!email || !userId) {
        toast.error('Email or user ID not found', { style: toastStyles.error });
        return;
      }
      console.log('Contact Info:', data);
      toast.success('Contact data updated successfully', { style: toastStyles.success });
      contactForm.reset();
    } catch (error) {
      toast.error('Failed to update contact info', { style: toastStyles.error });
      console.error('Contact update error:', error);
    }
  }, [email, userId, contactForm]);

  const onSubmitNotification: SubmitHandler<NotificationInputs> = useCallback(async (data) => {
    try {
      if (!userId) {
        toast.error('User ID not found', { style: toastStyles.error });
        return;
      }
      const notificationDataToSend = { userId, ...data };
      const result = await updateNotification(notificationDataToSend).unwrap();
      if (result.message === 'Notification updated successfully') {
        toast.success('Notification updated successfully', { style: toastStyles.success });
      } else {
        toast.error('Unexpected response from server', { style: toastStyles.error });
      }
    } catch (error: any) {
      console.error('Error updating notification:', error);
      if (error.status === 404) {
        toast.error('Notification settings not found for this user', { style: toastStyles.error });
      } else if (error.status === 400) {
        toast.error('No changes made to notification settings', { style: toastStyles.error });
      } else {
        toast.error(error?.data?.message || 'Failed to update notification', { style: toastStyles.error });
      }
    }
  }, [userId, updateNotification]);

  const onSubmitJobAlert: SubmitHandler<JobAlertInputs> = useCallback(async (data) => {
    try {
      if (!userId) {
        toast.error('User ID not found', { style: toastStyles.error });
        return;
      }
      const alertsData = { ...data, userId };
      const result = await updateJobAlerts(alertsData).unwrap();
      if (result?.data) {
        toast.success('Job Alert updated successfully', { style: toastStyles.success });
      } else {
        toast.error('Unexpected response from server', { style: toastStyles.error });
      }
    } catch (error: any) {
      console.error('Error updating job alerts:', error);
      toast.error(error?.data?.message || 'Failed to update job alerts', { style: toastStyles.error });
    }
  }, [userId, updateJobAlerts]);

  const onSubmitProfilePrivacy: SubmitHandler<ProfilePrivacyInputs> = useCallback(async (data) => {
    try {
      if (!userId) {
        toast.error('User ID not found', { style: toastStyles.error });
        return;
      }
      const previousData = privacyProfile?.data || { profilePublic: false, resumePublic: false };
      if (previousData.profilePublic === data.profilePublic && previousData.resumePublic === data.resumePublic) {
        toast.warning('You do not change any privacy mode', { style: toastStyles.warning });
        return;
      }
      const privacyDataToSend = { userId, ...data };
      const response = await updateProfilePrivacy(privacyDataToSend).unwrap();
      if (response.message === 'Updated data successfully') {
        toast.success('Profile privacy updated successfully', { style: toastStyles.success });
        profilePrivacyForm.reset({
          profilePublic: data.profilePublic,
          resumePublic: data.resumePublic,
        });
      } else {
        toast.error(response.message || 'Unexpected response from server', { style: toastStyles.error });
      }
    } catch (error: any) {
      console.error('Error updating profile privacy:', error);
      if (error.status === 400) {
        toast.error(error.data?.message || 'No changes made to profile privacy settings', { style: toastStyles.error });
      } else if (error.status === 404) {
        toast.error('Profile privacy settings not found for this user', { style: toastStyles.error });
      } else {
        toast.error(error?.data?.message || 'Failed to update profile privacy', { style: toastStyles.error });
      }
    }
  }, [userId, privacyProfile, updateProfilePrivacy, profilePrivacyForm]);

  const onSubmitPassword: SubmitHandler<PasswordInputs> = useCallback(async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error('New password and confirm password do not match', { style: toastStyles.error });
        return;
      }
      const passwordData = {...data, userId}
      const result = await updatePassword(passwordData);
      if (result && 'data' in result && result.data?.message === 'Password updated successfully') {
        console.log('Passwords:', data);
        toast.success('Password updated successfully', { style: toastStyles.success });
      } else {
        toast.error(result?.data?.message || 'Failed to update password', { style: toastStyles.error });
      }
    } catch (error) {
      toast.error('Failed to update password', { style: toastStyles.error });
      console.error('Password update error:', error);
    }
  }, []);

  const togglePasswordVisibility = useCallback((field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  return (
    <div className="py-5 px-2 max-w-7xl mx-auto space-y-8">
      {/* Contact Info Section */}
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">CONTACT INFO</h2>
        <FormProvider {...contactForm}>
          <form onSubmit={contactForm.handleSubmit(onSubmitContact)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MAP LOCATION</label>
              <input
                {...contactForm.register('mapLocation', { required: 'Map location is required' })}
                type="text"
                placeholder={userDataContact?.mapLocation || 'City, state, country name'}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {contactForm.formState.errors.mapLocation && (
                <p className="text-red-600 text-sm">{contactForm.formState.errors.mapLocation.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium px-2 text-gray-700 mb-1">PHONE</label>
              <div className="flex border border-gray-300 rounded-md items-center">
                <select className="p-2 focus:outline-none text-gray-600">
                  <option>🇧🇩+880</option>
                  <option>🇵🇰+92</option>
                  <option>🇲🇾+60</option>
                  <option>🇹🇷+90</option>
                </select>
                <input
                  {...contactForm.register('phoneNumber', { required: 'Phone number is required' })}
                  type="text"
                  placeholder={userDataContact?.phoneNumber !== undefined ? String(userDataContact.phoneNumber) : 'Phone number...'}
                  className="w-full border-none rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {contactForm.formState.errors.phoneNumber && (
                <p className="text-red-600 text-sm">{contactForm.formState.errors.phoneNumber.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">EMAIL</label>
              <div className="relative">
                <input
                  {...contactForm.register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder={userDataContact?.email || 'Email address'}
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {contactForm.formState.errors.email && (
                <p className="text-red-600 text-sm">{contactForm.formState.errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-xs hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
            >
              SAVE CHANGES
            </button>
          </form>
        </FormProvider>
      </div>

      {/* Notification Section */}
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">NOTIFICATION</h2>
        <FormProvider {...notificationForm}>
          <form onSubmit={notificationForm.handleSubmit(onSubmitNotification)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input {...notificationForm.register('shortlist')} type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">Notify me when employers shortlist me</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input {...notificationForm.register('jobsExpire')} type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">Notify me when applied jobs are expire</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input {...notificationForm.register('jobAlerts')} type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">Notify me when I have up to 5 job alerts</span>
                </label>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input {...notificationForm.register('savedProfile')} type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">Notify me when employers saved my profile</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input {...notificationForm.register('rejected')} type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  <span className="text-sm text-gray-700">Notify me when employers rejected me</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={notificationLoading}
              className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-xs hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
            >
              {notificationLoading ? 'Saving...' : 'SAVE CHANGES'}
            </button>
          </form>
        </FormProvider>
      </div>

      {/* Job Alerts Section */}
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">JOB ALERTS</h2>
        <FormProvider {...jobAlertForm}>
          <form onSubmit={jobAlertForm.handleSubmit(onSubmitJobAlert)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ROLE</label>
                <input
                  {...jobAlertForm.register('jobRole', { required: 'Role is required' })}
                  type="text"
                  placeholder={alertsJobsData?.jobRole || 'Your job role'}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LOCATION</label>
                <div className="relative">
                  <input
                    {...jobAlertForm.register('location', { required: 'Location is required' })}
                    type="text"
                    placeholder={alertsJobsData?.location || 'City, state, country name'}
                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={jobAlertsLoading}
              className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-xs hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
            >
              {jobAlertsLoading ? 'Saving...' : 'SAVE CHANGES'}
            </button>
          </form>
        </FormProvider>
      </div>

      {/* Profile Privacy Section */}
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">PRIVACY SETTINGS</h2>
        {isPrivacyLoading ? (
          <p className="text-gray-600">Loading privacy settings...</p>
        ) : (
          <FormProvider {...profilePrivacyForm}>
            <form onSubmit={profilePrivacyForm.handleSubmit(onSubmitProfilePrivacy)} className="space-y-4">
              <input type="checkbox" {...profilePrivacyForm.register('profilePublic')} className="hidden" />
              <input type="checkbox" {...profilePrivacyForm.register('resumePublic')} className="hidden" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">PROFILE PRIVACY</h3>
                  <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
                    <button
                      type="button"
                      onClick={() => profilePrivacyForm.setValue('profilePublic', !profilePrivacyForm.watch('profilePublic'))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${profilePrivacyForm.watch('profilePublic') ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${profilePrivacyForm.watch('profilePublic') ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className={`text-sm ${profilePrivacyForm.watch('profilePublic') ? 'text-green-600' : 'text-gray-600'}`}>
                      {profilePrivacyForm.watch('profilePublic') ? 'YES, Your profile is public now' : 'NO, Your profile is private now'}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">RESUME PRIVACY</h3>
                  <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
                    <button
                      type="button"
                      onClick={() => profilePrivacyForm.setValue('resumePublic', !profilePrivacyForm.watch('resumePublic'))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${profilePrivacyForm.watch('resumePublic') ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${profilePrivacyForm.watch('resumePublic') ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className={`text-sm ${profilePrivacyForm.watch('resumePublic') ? 'text-green-600' : 'text-gray-600'}`}>
                      {profilePrivacyForm.watch('resumePublic') ? 'YES, Your resume is public now' : 'NO, Your resume is private now'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={privacyLoading}
                className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-xs hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
              >
                {privacyLoading ? 'Saving...' : 'SAVE CHANGES'}
              </button>
            </form>
          </FormProvider>
        )}
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">CHANGE PASSWORD</h2>
        <FormProvider {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CURRENT PASSWORD</label>
                <div className="relative">
                  <input
                    {...passwordForm.register('currentPassword', { required: 'Current password is required' })}
                    type={showPasswords.currentPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="button" onClick={() => togglePasswordVisibility('currentPassword')} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPasswords.currentPassword ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                  </button>
                </div>
                {passwordForm.formState.errors.currentPassword && (
                  <p className="text-red-600 text-sm">{passwordForm.formState.errors.currentPassword.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NEW PASSWORD</label>
                <div className="relative">
                  <input
                    {...passwordForm.register('newPassword', { required: 'New password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                    type={showPasswords.newPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="button" onClick={() => togglePasswordVisibility('newPassword')} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPasswords.newPassword ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                  </button>
                </div>
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-red-600 text-sm">{passwordForm.formState.errors.newPassword.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CONFIRM PASSWORD</label>
                <div className="relative">
                  <input
                    {...passwordForm.register('confirmPassword', { required: 'Confirm password is required', validate: (value) => value === passwordForm.watch('newPassword') || 'Passwords do not match' })}
                    type={showPasswords.conFirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="button" onClick={() => togglePasswordVisibility('conFirmPassword')} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPasswords.conFirmPassword ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                  </button>
                </div>
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-red-600 text-sm">{passwordForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-base bg-[#0A65CC] text-white px-5 py-3 rounded-xs hover:bg-gray-100 hover:text-[#0A65CC] font-medium cursor-pointer transition-colors"
            >
              SAVE CHANGES
            </button>
          </form>
        </FormProvider>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-2">DELETE YOUR ACCOUNT</h2>
        <p className="text-sm text-gray-600 mb-4">
          If you delete the job applicant account, you will no longer be able to get information about the matched jobs, following employers, and job alert, shortlisted jobs and also the abandoned jobs from all the job platform Jobpilot.
        </p>
        <button className="text-red-600 flex items-center gap-3 cursor-pointer hover:underline">
          <RxCross2 /> Close Account
        </button>
      </div>

      <Toaster richColors />
    </div>
  );
};

export default Settings;
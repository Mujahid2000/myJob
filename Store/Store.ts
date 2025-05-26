import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApiSlice } from '../RTKQuery/authSlice';
import companyInfoReducer from './companyInfoSlice';
import foundingInfoReducer from './foundingInfoSlice';
import socialMediaReducer from './socialMediaSlice';
import accountSetupTabs from './accountSetupTabs';
import disableSideBar from './DisableSidebar';
import { companyApiSlice } from '@/RTKQuery/companySlice';
import { foundingInfoApi } from '@/RTKQuery/FoundingInfoReducers';
import { socialMediaApiSlice } from '@/RTKQuery/socialMediaApiSlice';
import { contact } from '@/RTKQuery/contact';
import subscriptionSlice from './Subscription';
import { paymentApi } from '@/RTKQuery/paymentApi';
import { SubscriptionDataByUserId } from '@/RTKQuery/SubscriptionDataByUserId';
import { TagsApi } from '@/RTKQuery/TagsApi';
import SelectedTag from './TagStateSlice';
import { postJobApi } from '@/RTKQuery/PostJobSliceApi';
import { JobPostApi } from '@/RTKQuery/JobPostSliceApi'; // Import JobPostApi
import { bookMarkApiSlice } from '@/RTKQuery/BookMarkSliceApi';
import modalReducer from './ModalSlice'; // Update path if needed
import CompanyFilter from './CompanyFilterState'
import profileReducer from './profileSlice'
import { profileApi } from '@/RTKQuery/profileApi';
import { CandidatePersonalData } from '@/RTKQuery/CandidateInfo';
import { notificationApi } from '@/RTKQuery/NotificationApiSlice';
import { jobApply } from '@/RTKQuery/JobApplyApiSlice';
import { shortListed } from '@/RTKQuery/ShortListedApi';
import { candidateJObApplyData } from '@/RTKQuery/CandidateJobApplyApiSlice';
import educationReducer from './EducationSlice';
import candidateReducer from './candidateLevelSlice'
import genderSlice from './genderSlice'
import experience from './experienceSlice'


export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [companyApiSlice.reducerPath]: companyApiSlice.reducer,
    [foundingInfoApi.reducerPath]: foundingInfoApi.reducer,
    [socialMediaApiSlice.reducerPath]: socialMediaApiSlice.reducer,
    [contact.reducerPath]: contact.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [SubscriptionDataByUserId.reducerPath]: SubscriptionDataByUserId.reducer,
    [TagsApi.reducerPath]: TagsApi.reducer,
    [postJobApi.reducerPath]: postJobApi.reducer,
    [JobPostApi.reducerPath]: JobPostApi.reducer, // Add JobPostApi reducer
    [bookMarkApiSlice.reducerPath]: bookMarkApiSlice.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [CandidatePersonalData.reducerPath]: CandidatePersonalData.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [jobApply.reducerPath]: jobApply.reducer,
    [shortListed.reducerPath]: shortListed.reducer,
    [candidateJObApplyData.reducerPath]: candidateJObApplyData.reducer,
    companyInfo: companyInfoReducer,
    foundingInfo: foundingInfoReducer,
    socialMedia: socialMediaReducer,
    accountSetup: accountSetupTabs,
    subscription: subscriptionSlice,
    disableSideBars: disableSideBar,
    SelectedTag: SelectedTag,
    modal: modalReducer,
    filter: CompanyFilter,
    profile: profileReducer,
    education : educationReducer,
    candidateLevel: candidateReducer,
    gender: genderSlice,
    experience: experience
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApiSlice.middleware,
      companyApiSlice.middleware,
      foundingInfoApi.middleware,
      socialMediaApiSlice.middleware,
      contact.middleware,
      paymentApi.middleware,
      TagsApi.middleware,
      SubscriptionDataByUserId.middleware,
      postJobApi.middleware,
      JobPostApi.middleware, // Add JobPostApi middleware
      bookMarkApiSlice.middleware,
      profileApi.middleware,
      CandidatePersonalData.middleware,
      notificationApi.middleware,
      jobApply.middleware,
      shortListed.middleware,
      candidateJObApplyData.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
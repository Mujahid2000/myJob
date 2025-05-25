import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

interface SocialMediaState {
  socialLinks: SocialLink[];
}

const initialState: SocialMediaState = {
  socialLinks: [
    { id: 1, platform: 'Facebook', url: '' },
    { id: 2, platform: 'Twitter', url: '' },
    { id: 3, platform: 'Instagram', url: '' },
    { id: 4, platform: 'YouTube', url: '' },
  ],
};

const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {
    setSocialLinks: (state, action: PayloadAction<SocialLink[]>) => {
      state.socialLinks = action.payload;
    },
    addSocialLinks: (state, action: PayloadAction<SocialLink>) => {
      state.socialLinks.push(action.payload);
    },
    removeSocialLinks: (state, action: PayloadAction<number>) => {
      state.socialLinks = state.socialLinks.filter((link) => link.id !== action.payload);
    },
    updateSocialLinks: (state, action: PayloadAction<{ id: number; field: 'platform' | 'url'; value: string }>) => {
      state.socialLinks = state.socialLinks.map((link) =>
        link.id === action.payload.id ? { ...link, [action.payload.field]: action.payload.value } : link
      );
    },
    resetSocialLinks: (state) => {
      state.socialLinks = initialState.socialLinks;
    },
  },
});

export const { setSocialLinks, addSocialLinks, removeSocialLinks, updateSocialLinks, resetSocialLinks } =
  socialMediaSlice.actions;

export default socialMediaSlice.reducer;
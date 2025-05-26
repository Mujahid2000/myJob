// src/features/searchFilter/searchFilterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchFilterState {
  jobTitle: string;
  location: string;
  category: string;
  viewMode: 'grid' | 'list' | null;
  itemsPerPage: '12' | '24' | null;
  sortBy: 'latest' | 'popular' | null;
  isFilterOpen: boolean; // To toggle the filter panel
}

const initialState: SearchFilterState = {
  jobTitle: '',
  location: '',
  category: '',
  viewMode: null,
  itemsPerPage: null,
  sortBy: null,
  isFilterOpen: false,
};

const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setJobTitle: (state, action: PayloadAction<string>) => {
      state.jobTitle = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<'12' | '24'>) => {
      state.itemsPerPage = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'latest' | 'popular'>) => {
      state.sortBy = action.payload;
    },
    toggleFilterOpen: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
    resetFilters: (state) => {
      state.jobTitle = '';
      state.location = '';
      state.category = '';
      state.viewMode = null;
      state.itemsPerPage = null;
      state.sortBy = null;
      state.isFilterOpen = false;
    },
  },
});

// Export actions
export const {
  setJobTitle,
  setLocation,
  setCategory,
  setViewMode,
  setItemsPerPage,
  setSortBy,
  toggleFilterOpen,
  resetFilters,
} = searchFilterSlice.actions;

// Export reducer
export default searchFilterSlice.reducer;
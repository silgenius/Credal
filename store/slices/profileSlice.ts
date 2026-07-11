import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MOCK_PROFILE, type ProfileData } from "@/lib/profile";

export interface ProfileState {
  data: ProfileData;
}

const initialState: ProfileState = {
  data: MOCK_PROFILE,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileData>) => {
      state.data = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<ProfileData>>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { setProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
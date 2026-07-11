import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  MOCK_CONTRIBUTIONS,
  MOCK_REQUESTS,
  type Contribution,
  type ContributionRequest,
} from "@/lib/contributions";

export interface ContributionsState {
  contributions: Contribution[];
  requests: ContributionRequest[];
}

const initialState: ContributionsState = {
  contributions: MOCK_CONTRIBUTIONS,
  requests: MOCK_REQUESTS,
};

const contributionsSlice = createSlice({
  name: "contributions",
  initialState,
  reducers: {
    addContribution: (state, action: PayloadAction<Contribution>) => {
      state.contributions.unshift(action.payload);
    },
    acceptRequest: (state, action: PayloadAction<string>) => {
      // In production the API response would return the full Contribution
      // to push into `contributions`. For now we just clear the request.
      state.requests = state.requests.filter((r) => r.id !== action.payload);
    },
    declineRequest: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter((r) => r.id !== action.payload);
    },
    addMembersToContribution: (
      state,
      action: PayloadAction<{ contributionId: string; phones: string[] }>,
    ) => {
      const contribution = state.contributions.find(
        (c) => c.id === action.payload.contributionId,
      );
      if (!contribution) return;
      const startIndex = contribution.members.length;
      action.payload.phones.forEach((phone, i) => {
        contribution.members.push({
          id: `new-${Date.now()}-${i}`,
          name: phone,
          phone,
          avatarInitials: "??",
          turnPosition: startIndex + i + 1,
          hasPaidCurrentCycle: false,
        });
      });
    },
    removeMemberFromContribution: (
      state,
      action: PayloadAction<{ contributionId: string; memberId: string }>,
    ) => {
      const contribution = state.contributions.find(
        (c) => c.id === action.payload.contributionId,
      );
      if (!contribution) return;
      contribution.members = contribution.members.filter(
        (m) => m.id !== action.payload.memberId,
      );
    },
    leaveContribution: (state, action: PayloadAction<{ contributionId: string }>) => {
      // In production: the API call happens first; on success we'd either
      // drop the contribution from state or mark the current user as removed.
      state.contributions = state.contributions.filter(
        (c) => c.id !== action.payload.contributionId,
      );
    },
  },
});

export const {
  addContribution,
  acceptRequest,
  declineRequest,
  addMembersToContribution,
  removeMemberFromContribution,
  leaveContribution,
} = contributionsSlice.actions;
export default contributionsSlice.reducer;
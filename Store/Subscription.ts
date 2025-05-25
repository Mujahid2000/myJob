import { createSlice } from "@reduxjs/toolkit";

interface SubscriptionState {
    userId: string;
    packageName: string;
    price: string;
    duration: string;
  }
  
  interface PlanPayload {
    userId: string;
    name: string;
    price: string;
    duration: string;
  }
  

  const initialState: SubscriptionState = {
    userId: "", 
    packageName: "",
    price: "",
    duration: "",
  };


const subscriptionSlice = createSlice({
    name: "subscription",
    initialState: initialState,
    reducers: {
    setPlanDetails: (state, action: { payload: PlanPayload }) => {
        state.packageName = action.payload.name;
        state.price = action.payload.price;
        state.duration = action.payload.duration;
        state.userId = action.payload.userId;
    },
}
})

export const {setPlanDetails} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;

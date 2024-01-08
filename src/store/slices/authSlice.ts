import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  token: string;
  user: any;
}

const initialState: InitialState = {
  token: localStorage.token || "",
  user: localStorage.user ? (JSON.parse(localStorage.user) as any) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.token = action.payload.accessToken;
      state.user = action.payload;
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser(state) {
      state.token = "";
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { setUserData, logoutUser } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getInitialUser = () => {
  const localStorageItem = localStorage.getItem("user");
  if (localStorageItem) {
    return JSON.parse(localStorageItem);
  } else {
    return null;
  }
};

const getInitialPath = () => {
  const localStorageItem = localStorage.getItem("path");
  if (localStorageItem) {
    return JSON.parse(localStorageItem);
  } else {
    return window.location.pathname;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getInitialUser(),
    pathName: getInitialPath(),
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setPathName(state, action) {
      state.pathName = action.payload;
    },
  },
});

export const { setUser, setPathName } = authSlice.actions;
export default authSlice.reducer;

export const selectedUserId = (state: RootState) => state.auth?.user?.login?.id;
export const selectedUserName = (state: RootState) =>
  state.auth?.user?.login?.name;

export const userPath = (state: RootState) => state.auth?.pathName;

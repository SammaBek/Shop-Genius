import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialSignInState = {
  isLoggedIn: false,
  token: null,
  userId: null,
  userImage: null,
  userName: null,
  userEmail: null,
  phone: null,
  address: null,
  joined: null,
  fullData: {},
  refreshPage: false,
  newProPic: false,
};

const Sign = createSlice({
  name: "signIn",
  initialState: initialSignInState,
  reducers: {
    signIn(state, action) {
      console.log(action.payload);

      // Cookies.set("token", action.payload.token, {
      //   expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      //   secure: true,
      // });

      AsyncStorage.setItem("token", action.payload.token);

      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.userImage = action.payload.userImage;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.joined = action.payload.joined;
      state.fullData = { ...action.payload };
    },

    signOut(state) {
      Cookies.remove("token");

      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      state.userImage = null;
      state.userName = null;
      state.userEmail = null;
      state.updateMessage = false;
      state.showMessage = false;
      state.searched = null;
      state.catagories = null;
      state.phone = null;
      state.prodId = null;
      state.address = null;
    },
    signUp(state, action) {
      //   Cookies.set("token", action.payload.token, {
      //     expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      //     secure: true,
      //   });

      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.userImage = action.payload.userImage;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
    },

    refreshPage(state) {
      state.refreshPage = !state.refreshPage;
    },

    setNewProPic(state) {
      state.newProPic = !state.newProPic;
    },
  },
});
export const SignActions = Sign.actions;

export default Sign.reducer;

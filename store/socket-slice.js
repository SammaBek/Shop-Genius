import { createSlice } from "@reduxjs/toolkit";

const initialSocketState = {
  socket: null,
};

const Socket = createSlice({
  name: "socket",
  initialState: initialSocketState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload.socket;
    },
  },
});

export const SocketActions = Socket.actions;

export default Socket.reducer;

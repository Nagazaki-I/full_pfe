import { createSlice } from "@reduxjs/toolkit"


const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
            

const initialState = {
  userInfo: user 
}
// console.log(initialState)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    logoutUser: (state) => {
      state.userInfo = null
      localStorage.clear() // or   localStorage.removeItem('user');
    },
  }
})

// export const { logoutUser } = userSlice.actions
export const { setUserInfo, logoutUser } = userSlice.actions

export default userSlice.reducer
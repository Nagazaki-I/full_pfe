import { createSlice } from "@reduxjs/toolkit"



const initialState = {
  items: [],
  // userInfo: null
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(elm => elm.id === action.payload.id)

      if (item) {
        item.quantity += 1
      } else {
        state.items = [...state.items, action.payload]
        // OR : state.items = state.items.concat(action.payload)
        // OR : state.items.push(action.payload)
      }
      // if (!itemsIds.includes(action.payload.id)) {
      //   state.items = [...state.items, action.payload]
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(elm => elm.id === action.payload.id)
      item.quantity++
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(elm => elm.id === action.payload.id)
      if (item.quantity > 1) {
        item.quantity--
      }
    },
    removeItem: (state, action) => {
      // const item = state.items.find(elm => elm.id === action.payload.id)
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },
    clearCart: (state) => {
      state.items = []
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    logoutUser: (state) => {
      state.userInfo = null
    },
  }
})

export const { addToCart, increaseQuantity, decreaseQuantity, calculateTotal, clearCart,  removeItem, setUserInfo, logoutUser} = cartSlice.actions

export default cartSlice.reducer
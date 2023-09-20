import CartProductsApi from "@/apis/CartProductsApi";
import { ICartProduct } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cartProductsSlice = createSlice({
    name: 'cartProducts',
    initialState: [],
    reducers: {
        add : (state: ICartProduct[], action) => {
            // if (state.find(current => current._id === action.payload._id)) {
            //     state = state.map(current => current._id !== action.payload._id ? action.payload._id : {
            //         ...current,
            //         amount: action.payload.amount
            //     })
            // }else{
            //     state.push(action.payload)
            // }
            const existingProduct = state.find((current) => current._id === action.payload._id);
            if (existingProduct) {
              existingProduct.amount = action.payload.amount;
            } else {
              state.push(action.payload);
            }
        },
        update: (state: ICartProduct[], action) =>{
            const productToUpdate = state.find((current) => current._id === action.payload._id);
            if (productToUpdate) {
              productToUpdate.amount = action.payload.quantity;
            }
        },
        delete: (state, action) =>{
            state = state.filter((current: any) => current._id !== action.payload);
            return state
        }
        
    },
    extraReducers: builder => {
      builder.addCase(fetchCartProducts.fulfilled, (state, action) => {
        return action.payload
      })
    },
})

export default cartProductsSlice

export const fetchCartProducts = createAsyncThunk('cartProducts/fetch', async () => {
  const data = await CartProductsApi.getCartProducts();
  return data
})
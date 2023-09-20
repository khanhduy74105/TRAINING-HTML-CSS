import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem('user');
const initialState: { username: string | null } = storedUser ? JSON.parse(storedUser) : { username: null };

export const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        set: (state: any, action)=>{
            state.username = action.payload.username
        }
    }
})


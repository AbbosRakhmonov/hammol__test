import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../Api/api";

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (id) => {
        return await api.get(`/product/${id}`).then(res => res.data);
    });

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: "",
        loading: false,
        error: null,
    },
    extraReducers: {
        [getProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [getProduct.fulfilled]: (state, {payload}) => {
            state.product = payload;
            state.loading = false;
        },
        [getProduct.rejected]: (state, {payload}) => {
            state.error = payload.error;
            state.loading = false;
        }
    },
});

export default productSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../Api/api";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async ({offset, name, category, limit}, {rejectWithValue}) => {
        // check if name or category or offset is empty
        let url = ["/product"];
        if (name) {
            if (category) {
                if (offset > 0) {
                    if (limit > 10) {
                        url.push(`?offset=${offset}&name=${name}&category=${category}&limit=${limit}`);
                    } else {
                        url.push(`?offset=${offset}&name=${name}&category=${category}`);
                    }
                } else {
                    if (limit > 10) {
                        url.push(`?name=${name}&category=${category}&limit=${limit}`);
                    } else {
                        url.push(`?name=${name}&category=${category}`);
                    }
                }
            } else if (offset > 0) {
                if (limit > 10) {
                    url.push(`?offset=${offset}&name=${name}&limit=${limit}`);
                } else {
                    url.push(`?offset=${offset}&name=${name}`);
                }
            } else {
                if (limit > 10) {
                    url.push(`?name=${name}&limit=${limit}`);
                } else {
                    url.push(`?name=${name}`);
                }
            }
        } else if (category) {
            if (offset > 0) {
                if (limit > 10) {
                    url.push(`?offset=${offset}&category=${category}&limit=${limit}`);
                } else {
                    url.push(`?offset=${offset}&category=${category}`);
                }
            } else {
                if (limit > 10) {
                    url.push(`?category=${category}&limit=${limit}`);
                } else {
                    url.push(`?category=${category}`);
                }
            }
        } else if (offset > 0) {
            if (limit > 10) {
                url.push(`?offset=${offset}&limit=${limit}`);
            } else {
                url.push(`?offset=${offset}`);
            }
        } else if (limit > 10) {
            url.push(`?limit=${limit}`);
        }

        // console.log(url);
        return await api.get(url.join("")).then(res => res.data);
    }
);

export const getCategories = createAsyncThunk(
    'products/getCategories',
    async () => {
        return await api.get("/category").then(res => res.data);
    })

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        categories: [],
        total: 0,
        filteredProducts: [],
        loading: false,
        error: null,
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [getProducts.fulfilled]: (state, {payload}) => {
            state.products = payload.products;
            state.total = payload.total;
            state.loading = false;
        },
        [getProducts.rejected]: (state, {payload}) => {
            state.error = payload.error;
            state.loading = false;
        },
        [getCategories.fulfilled]: (state, {payload}) => {
            state.categories = payload;
        }
    },
});

export default productsSlice.reducer;
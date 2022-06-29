import {configureStore} from '@reduxjs/toolkit';
import ProductsReducer from '../Feauters/Products/productsSlice';
import ProductReducer from '../Feauters/Product/productSlice';

const store = configureStore({
    reducer: {
        products: ProductsReducer,
        product: ProductReducer,
    },
})
export default store;
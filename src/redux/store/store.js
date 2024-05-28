import { configureStore } from "@reduxjs/toolkit";
import users from '../slices/users/userSlices';

const store = configureStore({
    reducer: {
        users,
    }
});

export default store;
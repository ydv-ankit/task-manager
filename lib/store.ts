import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user.slice";
import taskReducer from "./features/task/task.slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            tasks: taskReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

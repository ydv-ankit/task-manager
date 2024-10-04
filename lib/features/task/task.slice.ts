import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
    tasks: Array<Object>;
}

const initialState: TaskState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        addData: (state, action: PayloadAction<Object>) => {
            state.tasks.push(action.payload);
        },
    },
});

export const { addData } = taskSlice.actions;

export default taskSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";
import { getErrorMessageStr } from "../utils/StringUtils";

const initialState = {
    goals: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

//create goal
export const createGoal = createAsyncThunk(
    "goals/create",
    async (goalData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.createGoal(goalData, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessageStr(error));
        }
    }
);

//get all goals
export const getAllGoals = createAsyncThunk(
    "goals/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await goalService.getAllGoals(token);
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessageStr(error));
        }
    }
);

//delete goal
export const deleteGoal = createAsyncThunk(
    "goals/deleteGoal",
    async (goalId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            //object being returned will have and id prop {id: 'asd797fas9d8fa9sd8f9a8sdf'}
            //passed as payload on the action to the reducer
            return await goalService.deleteGoal(goalId, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessageStr(error));
        }
    }
);

export const goalsSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        //non async function
        reset: state => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(createGoal.pending, state => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllGoals.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAllGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getAllGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGoal.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                //filter goals array in state to exclude
                //the one with the id passed from deleteGoal() thunk
                state.goals = state.goals.filter(
                    goal => goal._id !== action.payload.id
                );
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;

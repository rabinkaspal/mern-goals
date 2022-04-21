import axios from "axios";
import { getAuthorizationConfig } from "../utils/StringUtils";

const API_URL = "/api/goals/";

const createGoal = async (goalData, token) => {
    const response = await axios.post(
        API_URL,
        goalData,
        getAuthorizationConfig(token)
    );
    return response.data;
};

//get All goals
const getAllGoals = async token => {
    const response = await axios.get(API_URL, getAuthorizationConfig(token));
    return response.data;
};

//deletGoal
const deleteGoal = async (goalId, token) => {
    const response = await axios.delete(
        API_URL + goalId,
        getAuthorizationConfig(token)
    );
    return response.data;
};

const goalService = {
    createGoal,
    getAllGoals,
    deleteGoal,
};

export default goalService;

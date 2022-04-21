import React, { useEffect } from "react";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// goal thunks and reset function
import { getAllGoals, deleteGoal, reset } from "../features/goals/goalsSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //get user from state
    const { user } = useSelector(state => state.auth);

    //get goals from state
    //values will be populated when getAllGoals() is fulfilled
    const { goals, isLoading, isError, message } = useSelector(
        state => state.goals
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (!user) {
            navigate("/login");
        } else {
            dispatch(getAllGoals());
        }
        //reset variables on component dismount
        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch]);

    //function sent as props to GoalItem component
    const removeGoal = goalId => {
        dispatch(deleteGoal(goalId));
    };

    //Show spinner if goals are being loaded from server
    if (isLoading) return <Spinner />;

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />

            <section className="content">
                {goals.length > 0 ? (
                    <div className="goals">
                        {goals.map(goal => (
                            <GoalItem
                                key={goal._id}
                                goal={goal}
                                onDelete={removeGoal}
                            />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any goals</h3>
                )}
            </section>
        </>
    );
};

export default Dashboard;

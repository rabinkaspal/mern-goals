import React, { useEffect } from "react";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllGoals, deleteGoal, reset } from "../features/goals/goalsSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { goals, isLoading, isError, message } = useSelector(
        state => state.goals
    );
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const removeGoal = goalId => {
        dispatch(deleteGoal(goalId));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (!user) {
            navigate("/login");
        } else {
            dispatch(getAllGoals());
        }

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch]);

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

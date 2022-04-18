import React, { useState } from "react";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
    const [goals, setGoals] = useState({});

    return (
        <>
            <section className="heading">
                <h1>Welcome Rabin</h1>
                <p>Goals Dashboard</p>
            </section>

            <GoalForm />

            <section className="content">
                {goals.length > 0 ? (
                    <div className="goals">
                        {goals.map(goal => (
                            <GoalItem key={goal._id} goal={goal} />
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

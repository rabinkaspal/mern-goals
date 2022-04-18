function GoalItem({ goal, onDelete }) {
    return (
        <div className="goal">
            <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
            <h2>{goal.text}</h2>
            <button className="close" onClick={() => onDelete(goal._id)}>
                X
            </button>
        </div>
    );
}

export default GoalItem;

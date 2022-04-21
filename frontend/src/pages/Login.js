import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/auth/authSlice";
// import Spinner from "../components/Spinner";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //fetch logged in user from state
    //values populated after loginUser() is fulfilled
    const { user, isLoading, isSuccess, isError, message } = useSelector(
        state => state.auth
    );

    //form inputs
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            //go to dashboard if user has been authenticated
            navigate("/");
        }
        dispatch(reset());
    }, [isError, message, user, isSuccess, dispatch, navigate]);

    //form onchange function
    const onChange = e => {
        setFormData(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            };
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please input both fields.");
        } else {
            const userData = {
                email,
                password,
            };
            dispatch(loginUser(userData));
        }
    };

    // if (isLoading) return <Spinner />;

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login to start setting goals.</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-block"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;

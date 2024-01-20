import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure you're using axios

import { signIn } from "../../app/features/users/asyncActions";

import styles from "./Login.module.scss";
import Logo from "../../components/Logo/Logo";

// Assuming RootState is the type of your entire Redux state
import { AppDispatch, RootState } from "../../app/store";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signedIn = useSelector((state: RootState) => state.users.signedIn);
  const failedSignIn = useSelector(
    (state: RootState) => state.users.failedSignIn
  );

  useEffect(() => {
    if (signedIn && signedIn.is_verified) {
      navigate(signedIn.is_verified ? "/" : "/verify");
    }
  }, [signedIn, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: LoginData = {
      email: email,
      password: password,
    };
    dispatch(signIn(formData));
  };

  return (
    <div className={styles.login}>
      <Logo />
      <Logo />
      <section>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <Link to="/passwordreset">Forgot Password ? </Link>
          <button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Sign In
              <svg
                width="50px"
                height="40px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M8.64 5l2.5 2.5v.7l-2.5 2.5-.71-.7 1.64-1.65H4v-1h5.57L7.92 5.7l.72-.7z"></path>
                </g>
              </svg>
            </div>
          </button>
        </form>
        {failedSignIn ? (
          <div className={styles.warning}>
            <p>Invalid Username or Password</p>
          </div>
        ) : (
          <></>
        )}
        <p className={styles.registerLink}>
          Create an Account
          <span className={styles.line}>
            <Link to="/register">Register</Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;

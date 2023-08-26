import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { signIn } from "../../app/features/users/asyncActions";

import styles from "./Login.module.scss";
import Logo from "../../components/Logo/Logo";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signedIn = useSelector((state) => state.users.signedIn);

  const failedSignIn = useSelector((state) => state.users.failedSignIn);
  useEffect(() => {
    if (signedIn) {
      if (signedIn.is_verified) {
        navigate("/");
      } else {
        navigate("/verify");
      }
    }
  }, [signedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(signIn(formData));
  };

  return (
    <div className={styles.login}>
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

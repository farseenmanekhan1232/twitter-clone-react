import React, { useState } from "react";
import axios from "axios";

import Logo from "../../components/Logo/Logo";
import styles from "./reset.module.scss";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default button click behavior

    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:8000/forgotPassword",
        data: JSON.stringify({ email }), // Ensure the data is correct
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse(res.data.message); // Assuming the response has a message field
    } catch (error) {
      setResponse("Error occurred. Please try again."); // Generic error message
    }
  };

  return (
    <div className={styles.passwordreset}>
      <Logo />
      {response == "" ? (
        <section>
          <form action="">
            <h1>Reset Password</h1>
            <label htmlFor="email-username">Email</label>
            <input
              id="email-username"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button onClick={handleSubmit}>
              Reset
              <svg
                width="50px"
                height="40px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M8.64 5l2.5 2.5v.7l-2.5 2.5-.71-.7 1.64-1.65H4v-1h5.57L7.92 5.7l.72-.7z"></path>
                </g>
              </svg>
            </button>
          </form>
        </section>
      ) : response == undefined ? (
        <h1>Error Occured</h1>
      ) : (
        <h1>{response}</h1>
      )}
    </div>
  );
};

export default PasswordReset;

import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import VerificationNotice from "./pages/Register/VerificationNotice";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import PasswordReset from "./pages/PasswordReset/PasswordReset";
import NewPassword from "./pages/PasswordReset/NewPassword";
import F04 from "./pages/404/404";
import Error from "./pages/Error/Error";

import { useSelector } from "react-redux";

import styles from "./App.module.scss";

const App = () => {
  const signedIn = useSelector((state) => state.users.signedIn);

  useEffect;

  return (
    <div className={styles.app}>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.main}>
              <Nav signedIn={signedIn} />
              <Home signedIn={signedIn} />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route
          path="/verify"
          element={
            <>
              <VerificationNotice />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <div className={styles.main}>
              <Nav signedIn={signedIn} />
              <Profile />
            </div>
          }
        />
        <Route
          path="/passwordreset"
          element={
            <>
              <PasswordReset />
            </>
          }
        />
        <Route
          path="/change-password/:token"
          element={
            <>
              <NewPassword />
            </>
          }
        />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<F04 />} />
      </Routes>
    </div>
  );
};

export default App;

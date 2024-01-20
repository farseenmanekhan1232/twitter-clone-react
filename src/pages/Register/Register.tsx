import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../app/features/users/asyncActions";
import Logo from "../../components/Logo/Logo";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Register.module.scss";

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  profilename?: string; // Optional field, depending on your form
  // Any additional registration fields
}

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX =
  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// Assuming RootState is the type of your entire Redux state
import { AppDispatch, RootState } from "../../app/store";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [profile, setProfile] = useState<string>("");

  const [user, setUser] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");

  const registered = useSelector((state: RootState) => state.users.registered);

  useEffect(() => {
    userRef.current?.focus();
  }, []);
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  useEffect(() => {
    if (registered) {
      navigate("/verify");
    }
  }, [registered]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    let formdata: RegistrationData = {
      username: user,
      profilename: profile,
      password: pwd,
      email: email,
    };

    // formdata.append("pp", selectedImage);
    dispatch(register(formdata));
  };

  // const fileValidation = (file) => {
  //   var fileInput = file;
  //   var filePath = fileInput.name;
  //   var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  //   if (!allowedExtensions.exec(filePath)) {
  //     alert("Invalid file type");
  //     fileInput.value = "";
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <div className={styles.register}>
      <Logo />
      <section>
        <p
          ref={errRef}
          className={errMsg ? styles.errmsg : styles.offscreen}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="profilename">Profile name:</label>
          <input
            type="text"
            id="profilename"
            autoComplete="off"
            onChange={(e) => setProfile(e.target.value)}
            value={profile}
            required
            aria-describedby="uidnote"
          />

          <label htmlFor="username">
            Username:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !user ? styles.hide : styles.invalid}
            />
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !validName
                ? styles.instructions
                : styles.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="email">
            Email:
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? styles.hide : styles.invalid}
            />
          </label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="uidnote"
            className={
              emailFocus && email && !validEmail
                ? styles.instructions
                : styles.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor="password">
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? styles.hide : styles.invalid}
            />
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={
              pwdFocus && !validPwd ? styles.instructions : styles.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? styles.hide : styles.invalid}
            />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={
              matchFocus && !validMatch ? styles.instructions : styles.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          {/* <label htmlFor="profile">Profile Picture</label>
          <input
            type="file"
            name="profile"
            id="profile"
            onChange={(e) => {
              if (fileValidation(e.target.files[0])) {
                setSelectedImage(e.target.files[0]);
              } else {
                e.target.value = null;
              }
            }}
          /> */}

          <button
            disabled={!validName || !validPwd || !validMatch ? true : false}
            className={
              !validName || !validPwd || !validMatch ? styles.disabled : ""
            }
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Sign Up
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
        <p className={styles.loginLink}>
          Already registered?
          <Link to="/login" className={styles.line}>
            {" "}
            Sign In
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Register;

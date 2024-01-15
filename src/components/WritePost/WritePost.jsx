import { useState } from "react";
import { fetchAllPosts, newPost } from "../../app/features/posts/asyncActions";
import { useDispatch } from "react-redux";

import styles from "./WritePost.module.scss";

const WritePost = ({ signedIn }) => {
  const [value, changeValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(newPost({ text: value }, dispatch));
    fetchAllPosts();
    changeValue("");
  };

  return signedIn ? (
    <div className={styles.writepost}>
      <textarea
        type="text"
        value={value}
        onChange={(v) => {
          changeValue(v.target.value);
        }}
        placeholder="What's Happening !?"
      />
      <button type="submit" onClick={handleSubmit}>
        <svg viewBox="0 0 50 50" width="40px" height="40px">
          <path
            fill="#75C2F6"
            d="M46.766,10.134c-0.288-0.341-0.764-0.449-1.171-0.271c-0.396,0.175-0.8,0.335-1.213,0.479 c0.597-0.822,1.064-1.737,1.38-2.717c0.128-0.396-0.002-0.828-0.325-1.088c-0.323-0.259-0.773-0.293-1.132-0.082 c-1.505,0.882-3.109,1.519-4.775,1.895c-1.809-1.703-4.239-2.669-6.756-2.669c-5.416,0-9.822,4.371-9.822,9.743 c0,0.3,0.014,0.602,0.042,0.901c-6.319-0.645-12.177-3.766-16.222-8.684c-0.206-0.252-2.967,3.299-2.967,5.037 c0,1.975,2.116,4.732,3.195,6.32c-0.094-0.046-2.271-0.028-2.271-0.028c0,3.114,1.5,5.952,3.873,7.754 c-0.204,0.046-0.392,0.155-0.533,0.318c-0.231,0.265-0.307,0.631-0.198,0.966c1.004,3.1,2.476,5.438,5.514,6.35 c-2.513,1.419-5.333,2.159-8.28,2.159c-0.688,0-1.337-0.038-1.982-0.117c-0.463-0.057,8.42,4.917,13.403,4.917 c16.338,0,26.102-12.16,26.102-24.884c0-0.212-0.004-0.424-0.01-0.634c1.641-1.235,3.058-2.736,4.215-4.468 C47.079,10.963,47.052,10.475,46.766,10.134z"
          />
          <path
            fill="#324561"
            d="M16.061,34.775c-0.006,0-0.013,0-0.02,0c-4.2-0.082-7.887-2.801-9.171-6.766 c-0.108-0.335-0.033-0.701,0.198-0.966c0.142-0.163,0.329-0.272,0.533-0.318c-2.373-1.802-3.873-4.64-3.873-7.754v-0.103 c0-0.353,0.186-0.679,0.488-0.859s0.68-0.188,0.988-0.02c0.092,0.05,0.184,0.098,0.277,0.144c-1.079-1.588-1.678-3.479-1.678-5.454 c0-1.738,0.461-3.437,1.334-4.911C5.42,7.294,6.035,7.137,6.508,7.417c0.476,0.28,0.633,0.894,0.352,1.369 C6.17,9.953,5.805,11.3,5.805,12.68c0,2.592,1.3,5.002,3.478,6.448c0.372,0.247,0.534,0.711,0.399,1.137 c-0.136,0.425-0.549,0.68-0.983,0.696c-0.803-0.024-1.604-0.149-2.384-0.371c-0.148-0.042-0.295-0.088-0.441-0.137 c0.598,3.025,2.991,5.489,6.125,6.115c0.455,0.091,0.788,0.482,0.804,0.945c0.017,0.464-0.288,0.878-0.735,1 c-0.867,0.236-1.745,0.354-2.642,0.349c1.346,2.339,3.856,3.858,6.655,3.913c0.552,0.011,0.991,0.468,0.98,1.02 C17.05,34.341,16.604,34.775,16.061,34.775z"
          />
          <path
            fill="#75C2F6"
            d="M16.524,42.318c-4.983,0-9.846-1.41-14.06-4.079c-0.467-0.295-0.605-0.913-0.31-1.38 s0.912-0.606,1.38-0.31c3.894,2.466,8.385,3.769,12.989,3.769c15.086,0,24.102-12.144,24.102-23.884c0-0.553,0.447-1,1-1 s1,0.447,1,1C42.626,29.158,32.862,42.318,16.524,42.318z"
          />
        </svg>
      </button>
    </div>
  ) : (
    <></>
  );
};

export default WritePost;

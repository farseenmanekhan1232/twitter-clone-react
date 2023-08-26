import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector.js";
import Results from "../../components/Results/Results.jsx";

import { getUserName } from "../../app/features/interactions/asyncActions.js";

import styles from "./Search.module.scss";

const Search = () => {
  const userList = useSelector((state) => state.interaction.searchResult);

  const [query, updateQuery] = useState("");

  const dispatch = useDispatch();

  function debounce(func, timeout = 2000) {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  useEffect(() => {
    if (query.trim() !== "") {
      debounce(dispatch(getUserName({ username: query })));
    }
  }, [query]);

  return (
    <div
      className={styles.container}
      onBlur={() => setTimeout(() => updateQuery(""), 400)}
    >
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search User"
          value={query}
          onChange={(e) => {
            if (e.target.value) {
              updateQuery(e.target.value);
            }
          }}
          onInput={(e) => updateQuery(e.target.value)}
        ></input>
      </div>
      {query.length != 0 ? (
        <div className={styles.results}>
          <Results userList={userList} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;

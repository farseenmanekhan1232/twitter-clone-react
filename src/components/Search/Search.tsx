import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserName } from "../../app/features/interactions/asyncActions";
import Results from "../../components/Results/Results";
import { AppDispatch, RootState } from "../../app/store"; // Import the RootState type
import styles from "./Search.module.scss";

const Search: React.FC = () => {
  const userList = useSelector(
    (state: RootState) => state.interaction.searchResult
  );
  const [query, updateQuery] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const debounce = (func: (...args: any[]) => void, timeout = 2000) => {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  useEffect(() => {
    if (query.trim() !== "") {
      debounce(() => dispatch(getUserName({ username: query })))();
    }
  }, [query, dispatch]);

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
          onChange={(e) => updateQuery(e.target.value)}
        />
      </div>
      {query.length !== 0 && (
        <div className={styles.results}>
          <Results userList={userList} />
        </div>
      )}
    </div>
  );
};

export default Search;

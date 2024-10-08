"use client";

import { useState } from "react";
import css from "./searchForm.module.css";

function Form({ onSubmit }) {
  const [search, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search === "") {
      return onSubmit("");
    }

    // const newUrl = new URL(window.location);
    // newUrl.searchParams.set("query");
    // router.push(newUrl.toString());
    onSubmit(search);
  };

  return (
    <form onSubmit={handleSubmit} className={css.formContainer}>
      <input
        className={css.searchInput}
        placeholder="Введіть модель телефону"
        name="data"
        value={search}
        onChange={handleChange}
      />
      <button className={css.searchButton} type="submit">
        Пошук
      </button>
    </form>
  );
}

export default Form;

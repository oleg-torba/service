import React from "react";
import Css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={Css.loaderOverlay}>
      <div className={Css.loader}></div>
    </div>
  );
};

export default Loader;

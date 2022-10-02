import React, { useState } from "react";
import "./hero.scss";
import Trial from "../Trial/Trial";

const Hero = ({ dataRecieved, setMovieSelected, loading, errorMsg }) => {
  const [showTitle, setShowTitle] = useState(false);
  const toggler = () => {
    showTitle ? setShowTitle(false) : setShowTitle(true);
  };

  const updateMovieSelection = (name) => {
    setMovieSelected(name);
  };

  const displayTitles = dataRecieved?.map((item) => {
    return (
      <div
        key={item.title}
        onClick={() => updateMovieSelection(item.title)}
        className="contentBox"
      >
        {item.title}
      </div>
    );
  });

  return (
    <section>
      <div className="wrappr">
      {/* <img src="/src/assets/starwar.jpg" alt="" /> */}
      <div className="btn">
        <button onClick={toggler} className="dropBtn">
          Choose a Star War Movie
          {showTitle ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M12 3l12 18h-24z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path d="M12 21l-12-18h24z" />
            </svg>
          )}
        </button>
      </div>

      {errorMsg ? (
        <div className="loader">{errorMsg}</div>
      ) : loading ? (
        <div className="loader">
          {<Trial/>}
        </div>
      ) : (
        !loading &&
        showTitle && (
          <section className="dropDownContent">{displayTitles}</section>
        )
      )}
      </div>
    </section>
  );
};

export default Hero;

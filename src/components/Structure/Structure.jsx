import React, { useState, useEffect } from "react";
import "./structure.scss";
import Data from "../Data/Table";
import { useCharacters } from "/src/contexts/cast";
import Trial from "../Trial/Trial";

const Structure = ({ dataRecieved, movieSelected }) => {
  
  const { characters_context, updateCharacters, sortPeople, sortByGender, loadingData } =
    useCharacters();
  const [direction, setDirection] = useState("descending");
  const [currentChild, setCurrentChild] = useState("all");
  const [totalHeight, setTotalHeight] = useState(0);
  const [crawler, setCrawler] = useState("");

  
  const getCharacters = () => {
    dataRecieved?.filter((item) => {
      if (item.title === movieSelected) {
        updateCharacters(item.characters);
        return;
      }
    });
  };

    
  const getCrawler = () => {
    dataRecieved?.filter((item) => {
      if (item.title === movieSelected) {
        setCrawler(item.opening_crawl);
      }
    });
  };

    
  const getAllHeight = async () => {
    const newCharacter = characters_context.filter(
     
      (item) => item.height !== "unknown"
    );
    const allSum = newCharacter.reduce((a, b) => +a + +b.height, 0);
    setTotalHeight((prevState) => (prevState = allSum));
  };


  const sortingCasts = () => {
    if (direction === "ascending") {
      sortPeople("descending");
      setDirection("descending");
      return;
    }
    sortPeople("ascending");
    setDirection("ascending");
  };

 
  useEffect(() => {
    currentChild === "Male Only"
      ? sortByGender("male")
      : currentChild === "Female Only"
      ? sortByGender("female")
      : sortByGender("all");
  }, [currentChild]);


  const displayCharacters = characters_context.map((item, index) => {
    return (
      <Data key={index} name={item.name} height={item.height} gender={item.gender} />
    );
  });

  useEffect(() => {
    getAllHeight();
  }, [characters_context]);

  useEffect(() => {
    const unsub = getCharacters();
    const unsub2 = getCrawler();
    setCurrentChild("all");
  
    return () => {
      unsub;
      unsub2;
    };
  }, [movieSelected]);

 
  if(loadingData){
    return <div className='loadr'>
     {<Trial/>}
    </div>
  }

  
  return (
    <>
      <section className="wrap">
        {movieSelected && <h1>Movie: {movieSelected}</h1>}
        <marquee behavior="scroll" direction="left">
         {crawler}
        </marquee>

        {characters_context.length > 0 && (
          <div className="selection">
            <button
              onClick={(e) => setCurrentChild("all")}
              className={currentChild === "all" ? "selected" : "non_selected"}
            >
              All
            </button>
            <button
              onClick={(e) => setCurrentChild("Male Only")}
              className={
                currentChild === "Male Only" ? "selected" : "non_selected"
              }
            >
              Male Only
            </button>
            <button
              onClick={(e) => setCurrentChild("Female Only")}
              className={
                currentChild === "Female Only" ? "selected" : "non_selected"
              }
            >
              Female Only
            </button>
          </div>
        )}
        {characters_context.length > 0 && (
          <table>
            <thead>
              <tr onClick={() => sortingCasts()}>
                <th>Name</th>
                <th>Gender</th>
                <th>Height</th>
              </tr>
            </thead>

            <tbody>
              {displayCharacters}
              <tr>
                <td>Total Characters: {characters_context.length}</td>
                <td></td>
                <td>
                  Total Heights: {totalHeight}cm
                 <p> {`(${Math.round(totalHeight / 30.48)}ft/${Math.round(
                    totalHeight / 2.54
                  )}in)`}</p>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default Structure;
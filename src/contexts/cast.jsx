import React, { useContext, useState } from "react";
const CharactersContext = React.createContext();
export const useCharacters = () => {
  return useContext(CharactersContext);
};

export const CharactersProvider = ({ children }) => {
  const [characters_context, setCharacters] = useState([]);
  const [backupData, setBackupData] = useState([]);
  const [loadingData, setLoading] = useState(false)

  const getCharacters = async (links) => {
    setLoading(true)
    try {
        const keepWatch = await links.map(async (link) => {
        const res = await fetch(link);
        const data = await res.json();
        setCharacters((prevItems) => [
          ...prevItems,
          {
            name: data.name,
            gender: data.gender,
            height: data.height,
          },
        ]);
        
        setBackupData((prevItems) => [
          ...prevItems,
          {
            name: data.name,
            gender: data.gender,
            height: data.height,
          },
        ]);
      });
      
      const awaited = await Promise.all(keepWatch)
      setLoading(false)
      return
    } catch (error) {
      setLoading(false)
      return
    }

  };



 

  const sortPeople = async (direction) => {
    if (direction === "ascending") {
      let cachedCharacters = characters_context;
      setCharacters([]);
      let newCharacters;
      newCharacters = await cachedCharacters.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      setCharacters(newCharacters);
    } else {
      let cachedCharacters = characters_context;
      
      setCharacters([]);
      let newCharacters;
      newCharacters = await cachedCharacters
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .reverse();
     
      setCharacters(newCharacters);
    }
  };

  const updateCharacters = async (item) => {
    setCharacters([]);
    setBackupData([]);
    await getCharacters(item);
  };


  const sortByGender = async (incomingGender) => {
    if (incomingGender === "all" && backupData.length > 0) {
      await setCharacters([]);
      setCharacters(backupData);
      return;
    }

    setCharacters([]);
    const newCharacters = await backupData.filter(
      (item) => item.gender === incomingGender
    );
    setCharacters(newCharacters);
  };


  return (
    <CharactersContext.Provider
      value={{ characters_context, updateCharacters, sortPeople, sortByGender, loadingData }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
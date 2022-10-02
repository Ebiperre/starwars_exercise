import { useState, useLayoutEffect } from "react";

const apiCalls = (url = "https://swapi.dev/api/films") => {
  const [dataRecieved, setDataRecieved] = useState([]);
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(true)

  const getMovies = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data?.results) {
        setLoading(false)
        setErrorMsg('')
        return "done";
      }
      setDataRecieved(data?.results.reverse());
      setLoading(false)
      setErrorMsg('')
      return "done"
    } catch (error) {
      setLoading(false)
      setErrorMsg("Sorry, Unable to get data at this time.")
    }
  };

  useLayoutEffect(() => {
     getMovies();
  }, []);

  return { dataRecieved, loading, errorMsg };
};

export default apiCalls;
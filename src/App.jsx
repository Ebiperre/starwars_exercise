import Hero from "./components/Hero/Hero";
import "./App.scss";
import Structure from "./components/Structure/Structure";
import apiCalls from "./hooks/apiCalls";
import { useState } from "react";
import { CharactersProvider } from "./contexts/cast";

function App() {
  
  const { dataRecieved, loading, errorMsg } = apiCalls();
  const [movieSelected, setMovieSelected] = useState("");

  return (
    <CharactersProvider>
      <section className="App">
        <Hero
        errorMsg={errorMsg}
        loading={loading}
          setMovieSelected={setMovieSelected}
          dataRecieved={dataRecieved}
        />
        <Structure dataRecieved={dataRecieved} movieSelected={movieSelected} />
      </section>
    </CharactersProvider>
  );
}

export default App;
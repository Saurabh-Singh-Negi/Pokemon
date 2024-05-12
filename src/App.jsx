import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import PokemonDetails from "./pages/PokemonDetails/PokemonDetails";
import PokemonNavbar from "./components/PokemonNavbar/PokemonNavbar";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <PokemonNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemondetails/:id" element={<PokemonDetails />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

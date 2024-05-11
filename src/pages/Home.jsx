import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import {} from "react";
import PokemonTable from "../components/PokemonTable";
import PokemonChart from "../components/PokemonChart";
import Select from "react-select";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState(null);
  const [hitpoints, setHitpoints] = useState(null);
  const [hitpointsOptions, setHitpointsOptions] = useState([]);
  const [pokemonTypeOptions, setPokemonTypeOptions] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://dummyapi.online/api/pokemon")
        .then((res) => {
          setPokemonData(res.data);
          console.log(res.data);

          //hitpoint options
          const hitpointsSet = new Set(
            res.data.map((pokemon) => pokemon.hitpoints)
          );
          const hitpointsArray = Array.from(hitpointsSet).sort((a, b) => a - b);
          const options = hitpointsArray.map((hitpoints) => ({
            value: hitpoints,
            label: hitpoints.toString(),
          }));
          setHitpointsOptions(options);

          //pokemon type options
          const typesSet = new Set(res.data.map((pokemon) => pokemon.type));
          const typesArray = Array.from(typesSet).sort();
          const typeOptions = typesArray.map((type) => ({
            value: type,
            label: type,
          }));
          setPokemonTypeOptions(typeOptions);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    let filteredData = pokemonData;

    if (pokemonType) {
      filteredData = filteredData.filter(
        (pokemon) => pokemon.type === pokemonType.value
      );
    }

    if (hitpoints) {
      filteredData = filteredData.filter(
        (pokemon) => pokemon.hitpoints === hitpoints.value
      );
    }

    setFilteredPokemonData(filteredData);
  };

  const handleReset = () => {
    setPokemonType(null);
    setHitpoints(null);
    setFilteredPokemonData([]);
  };
  return (
    <div>
      <p>Home</p>

      <PokemonChart
        pokemonData={
          filteredPokemonData.length > 0 ? filteredPokemonData : pokemonData
        }
      />

      <div className="flex gap-10">
        <Select
          defaultValue={pokemonType}
          onChange={setPokemonType}
          options={pokemonTypeOptions}
        />
        <Select
          defaultValue={hitpoints}
          onChange={setHitpoints}
          options={hitpointsOptions}
        />

        <button onClick={handleFilter}>Apply Filter</button>
        <button onClick={handleReset}>Reset Filter</button>
      </div>

      <PokemonTable
        pokemonData={
          filteredPokemonData.length > 0 ? filteredPokemonData : pokemonData
        }
      />
    </div>
  );
};

export default Home;

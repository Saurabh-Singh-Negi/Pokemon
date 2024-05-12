import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import PokemonTable from "../../components/PokemonTable/PokemonTable";
import PokemonChart from "../../components/PokemonChart";
import { SelectPicker, Stack, Loader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import styles from "./Home.module.css";
import Error from "../../components/Error/Error";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState(null);
  const [hitpoints, setHitpoints] = useState(null);
  const [hitpointsOptions, setHitpointsOptions] = useState([]);
  const [pokemonTypeOptions, setPokemonTypeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://dummyapi.online/api/pokemon")
        .then((res) => {
          setPokemonData(res.data);

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
          setLoading(false);
          setPokemonTypeOptions(typeOptions);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [pokemonType, hitpoints]);
  const handleFilter = () => {
    let filteredData = pokemonData;

    if (pokemonType) {
      filteredData = filteredData.filter(
        (pokemon) => pokemon.type === pokemonType
      );
    }

    if (hitpoints) {
      filteredData = filteredData.filter(
        (pokemon) => pokemon.hitpoints === hitpoints
      );
    }

    setFilteredPokemonData(filteredData);
  };

  return (
    <>
      {loading ? (
        <Loader backdrop content="Loading..." vertical />
      ) : error ? (
        <Error />
      ) : (
        <Stack
          className={styles.mainContainer}
          style={{ padding: "0.5rem 2rem" }}
          direction="column"
          spacing={50}
          alignItems="flex-start"
        >
          <Stack spacing={10}>
            <SelectPicker
              data={pokemonTypeOptions}
              searchable={false}
              style={{ width: 224 }}
              placeholder="Select Type"
              value={pokemonType}
              onChange={(value) => {
                setPokemonType(value);
              }}
            />
            <SelectPicker
              data={hitpointsOptions}
              searchable={false}
              style={{ width: 224 }}
              placeholder="Select Hitpoints"
              value={hitpoints}
              onChange={(value) => setHitpoints(value)}
            />
          </Stack>

          <Stack
            wrap={true}
            className={styles.tableChartContainer}
            spacing={40}
            justifyContent="center"
          >
            <>
              <PokemonTable
                pokemonData={
                  filteredPokemonData.length > 0
                    ? filteredPokemonData
                    : pokemonData
                }
              />
              <PokemonChart
                pokemonData={
                  filteredPokemonData.length > 0
                    ? filteredPokemonData
                    : pokemonData
                }
              />
            </>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Home;

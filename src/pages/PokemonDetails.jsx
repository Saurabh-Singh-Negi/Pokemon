import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const PokemonDetails = () => {
  const [pokemonData, setPokemonData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://dummyapi.online/api/pokemon/${id}`)
      .then((res) => {
        // console.log(res.data);
        setPokemonData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <p>Welcome to the world of {pokemonData.pokemon}</p>
    </>
  );
};

export default PokemonDetails;

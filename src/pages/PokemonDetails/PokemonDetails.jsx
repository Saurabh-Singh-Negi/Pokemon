import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heading, Stack, Text, Loader } from "rsuite";
import styles from "./PokemonDetails.module.css";
import Error from "../../components/Error/Error";

const PokemonDetails = () => {
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://dummyapi.online/api/pokemon/${id}`)
      .then((res) => {
        setPokemonData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  }, []);
  return (
    <div className={styles.detailsMainContainer}>
      {loading ? (
        <Loader backdrop content="Loading..." vertical />
      ) : error ? (
        <Error />
      ) : (
        <div className={styles.detailsSubContainer}>
          <Heading level={1} className={styles.mainHeading}>
            <span>Welcome to</span>{" "}
            <span> the world of {pokemonData.pokemon}</span>
          </Heading>
          <Stack className={styles.detailsCard}>
            <div>
              <img
                className={styles.pokemonImg}
                src={pokemonData.image_url}
                alt=""
              />
            </div>
            <div className={styles.textContainer}>
              <Text weight="semibold" className={styles.pokemonDetails}>
                Name:{" "}
                <span style={{ color: "grey" }}>{pokemonData.pokemon}</span>
              </Text>
              <Text weight="semibold" className={styles.pokemonDetails}>
                Type: <span style={{ color: "grey" }}> {pokemonData.type}</span>
              </Text>
              <Text weight="semibold" className={styles.pokemonDetails}>
                Abilities:{" "}
                <span style={{ color: "grey" }}>
                  {pokemonData.abilities.join(", ")}
                </span>
              </Text>
              <Text weight="semibold" className={styles.pokemonDetails}>
                Hitpoints:{" "}
                <span style={{ color: "grey" }}>{pokemonData.hitpoints}</span>
              </Text>
              <Text weight="semibold" className={styles.pokemonDetails}>
                Evolutions:{" "}
                <span style={{ color: "grey" }}>
                  {pokemonData.evolutions.join(", ")}{" "}
                </span>
              </Text>
              <Text weight="semibold" className={styles.pokemonDetails}>
                Location:{" "}
                <span style={{ color: "grey" }}>{pokemonData.location}</span>
              </Text>
            </div>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;

import React from "react";
import { useNavigate } from "react-router-dom";

const PokemonTable = ({ pokemonData }) => {
  const navigate = useNavigate();
  const handleClick = (pokemonId) => {
    navigate(`/pokemondetails/${pokemonId}`);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Hit Points</th>
          </tr>
        </thead>

        <tbody>
          {pokemonData.map((item, index) => (
            <tr key={index}>
              <td onClick={() => handleClick(item.id)}>{item.pokemon}</td>
              <td>{item.type}</td>
              <td>{item.hitpoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PokemonTable;

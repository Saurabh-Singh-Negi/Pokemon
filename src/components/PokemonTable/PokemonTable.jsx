import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "rsuite";
import styles from "./PokemonTable.module.css";
const { Column, HeaderCell, Cell } = Table;

const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: "#f5f5f5",
        borderRadius: 6,
        marginTop: 2,
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <img src={rowData.image_url} width="40" />
    </div>
  </Cell>
);

const AbilitiesCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>{rowData.abilities.join(", ")}</Cell>
);

const EvolutionsCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>{rowData.evolutions.join(", ")}</Cell>
);

const PokemonTable = ({ pokemonData }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.tableMainContainer}>
      <Table
        height={500}
        width={800}
        data={pokemonData}
        onRowClick={(rowData) => {
          navigate(`/pokemondetails/${rowData.id}`);
        }}
      >
        <Column width={60} align="center" fixed>
          <HeaderCell>id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column width={80} align="center">
          <HeaderCell>Avartar</HeaderCell>
          <ImageCell dataKey="image_url" />
        </Column>
        <Column width={150}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="pokemon" />
        </Column>
        <Column width={150}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="type" />
        </Column>
        <Column width={200}>
          <HeaderCell>Abilities</HeaderCell>
          <AbilitiesCell dataKey="abilities" />
        </Column>
        <Column width={150}>
          <HeaderCell>Hitpoints</HeaderCell>
          <Cell dataKey="hitpoints" />
        </Column>
        <Column width={200}>
          <HeaderCell>Evolutions</HeaderCell>
          <EvolutionsCell dataKey="evolutions" />
        </Column>
        <Column width={250}>
          <HeaderCell>Location</HeaderCell>
          <Cell dataKey="location" />
        </Column>
      </Table>
    </div>
  );
};

export default PokemonTable;

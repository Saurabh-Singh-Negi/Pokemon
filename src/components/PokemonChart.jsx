import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PokemonChart = ({ pokemonData }) => {
  const typeCounts = pokemonData.reduce((counts, pokemon) => {
    counts[pokemon.type] = (counts[pokemon.type] || 0) + 1;
    return counts;
  }, {});

  const chartData = Object.keys(typeCounts).map((type) => ({
    name: type,
    y: typeCounts[type],
  }));

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Pokemon Types",
    },
    series: [
      {
        name: "Count",
        data: chartData,
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PokemonChart;

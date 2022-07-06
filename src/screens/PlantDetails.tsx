import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { PlantsProps } from "./Home";

const PlantDetails: React.FC = () => {
  const { idPlant } = useParams();

  const [loading, setLoading] = useState(false);

  const [plantName, setPlantName] = useState("");
  const [plantAbout, setPlantAbout] = useState("");

  async function getPlant() {
    setLoading(true);

    const response = await api.get(`plants/${idPlant}`);

    setPlantName(response.data.name);
    setPlantAbout(response.data.about);

    setLoading(false);
  }

  useEffect(() => {
    getPlant();
  }, []);

  async function handleSubmit() {
    event?.preventDefault();

    await api.put(`plants/${idPlant}`, {
      name: plantName,
      about: plantAbout,
      water_tips: "Regue o solo ao redor. Regue 1 vez no dia.",
      photo:
        "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/5.svg",
      environments: ["bedroom", "living_room"],
      frequency: {
        times: 1,
        repeat_every: "day",
      },
    });

    alert("Planta atualizada")
  }

  return (
    <div>
      {loading ? (
        <h1>CARREGANDO...</h1>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              value={plantName}
              onChange={(event) => setPlantName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Sobre"
              value={plantAbout}
              onChange={(event) => setPlantAbout(event.target.value)}
            />
            <button type="submit">Editar</button>
          </form>
        </>
      )}
    </div>
  );
};

export default PlantDetails;

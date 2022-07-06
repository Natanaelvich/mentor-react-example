import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export type PlantsProps = {
  id: string;
  name: string;
  about: string;
};

const Home: React.FC = () => {
  const [plants, setPlants] = useState<PlantsProps[]>([]);

  async function getPlants() {
    const response = await api.get<PlantsProps[]>("/plants");

    setPlants(response.data);
  }

  async function delPlant(idPlant: string) {
    await api.delete("/plants/" + idPlant);

    setPlants(plants.filter((p) => p.id !== idPlant));

    alert("Planta deletada");
  }

  useEffect(() => {
    getPlants();
  }, []);

  return (
    <div>
      <ul>
        {plants.map((p) => (
          <li key={p.id}>
            <strong>{p.name}: </strong>{" "}
            <button onClick={() => delPlant(p.id)}>DELETE</button>
            <Link to={`details/${p.id}`}>Editar</Link>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

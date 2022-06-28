import React, { useEffect, useState } from "react";
import api from "../services/api";

type PlatsProps = {
  id: string;
  name: string;
  about: string;
};

const Home: React.FC = () => {
  const [plants, setPlants] = useState<PlatsProps[]>([]);

  async function getPlants() {
    const response = await api.get<PlatsProps[]>("/plants");

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
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

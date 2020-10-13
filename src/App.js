import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function App() {
  const [goldData, setGoldData] = useState([]);
  const [goldText, setGoldText] = useState("0");

  const [healthData, setHealthData] = useState([]);
  const [healthText, setHealthText] = useState("0");

  const [levelData, setLevelData] = useState([]);
  const [levelText, setLevelText] = useState("0");

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://127.0.0.1:2999/liveclientdata/allgamedata")
        .then((res) => {
          console.log(res.data);

          const newTime = Math.floor(res.data.gameData.gameTime).toString();
          const newGold = res.data.activePlayer.currentGold;
          const newLevel = res.data.activePlayer.level;
          const newHealth = res.data.activePlayer.championStats.currentHealth;

          const newGoldData = { name: newTime, gold: newGold};
          setGoldData(oldData => [...oldData, newGoldData]);
          setGoldText(Math.floor(newGold.toString()));

          const newLevelData = { name: newTime, level: newLevel};
          setLevelData(oldData => [...oldData, newLevelData]);
          setLevelText(Math.floor(newLevel.toString()));

          const newHealthData = { name: newTime, health: newHealth};
          setHealthData(oldData => [...oldData, newHealthData]);
          setHealthText(Math.floor(newHealth.toString()));

        })
        .catch((err) => {
          console.error(err);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>LOL Stats</h1>
      <div>
        <h3>Current Gold: {goldText}</h3>
      </div>
      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart
          data={goldData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="gold" stroke="#F00" />
        </LineChart>
      </ResponsiveContainer>

      <div>
        <h3>Current Health: {healthText}</h3>
      </div>
      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart
          data={healthData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="health" stroke="#F00" />
        </LineChart>
      </ResponsiveContainer>

      <div>
        <h3>Current Level: {levelText}</h3>
      </div>
      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart
          data={levelData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="level" stroke="#F00" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;

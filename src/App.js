import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend  } from 'recharts';

function App() {
  const [goldChartData, setGoldChartData] = useState([]);
  const [goldText, setGoldText] = useState('0')

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://127.0.0.1:2999/liveclientdata/allgamedata")
        .then((res) => {
          console.log(res.data);

          const newTime = Math.floor(res.data.gameData.gameTime).toString()
          const newGold = res.data.activePlayer.currentGold 
          const newData = {name: newTime, gold: newGold}
          
          setGoldChartData(oldData => [
            ...oldData,
            newData
          ])

          setGoldText(Math.floor(newGold.toString()))
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
    <LineChart width={730} height={350} data={goldChartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5  }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="gold" stroke="#8884d8" />
    </LineChart>
    </div>
  );
}

export default App;

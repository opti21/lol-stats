import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import { Line } from "react-chartjs-2";

function App() {


  const [stats, setStats] = useState([{ name: 0, value: 0 }])
  const [seconds, setSeconds] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("https://timeapi.herokuapp.com/utc/now")
        .then(res => {
          console.log(res)

          const newGold = Math.floor(Math.random() * 100)

          setTime(oldTime => [...oldTime, oldTime.length.toString()])

          setStats(oldStats => [
            ...oldStats,
            newGold
          ])


          console.log(stats)

        })
        .catch(err => {
          console.error(err)
        })
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>LOL Stats</h1>
      <div>{JSON.stringify(stats)}</div>
      <Line data={data} />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { getData } from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState({ pressure: 0, usage: [] });

  useEffect(() => {
    getData().then(res => setData(res));
  }, []);

  return (
    <div className="container mt-5 pt-5 text-center">
      <h1 className="text-danger">GasMap Dashboard</h1>
      <h2>{data.pressure} PSI</h2>
      <p>Logs: {data.usage.length}</p>
    </div>
  );
}
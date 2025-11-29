import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [status, setStatus] = useState("loading");
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    setLoading(true);
    const result = await window.bluetoothAPI.check();
    setStatus(result);
    setLoading(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div style={{ padding: 40, fontSize: 30 }}>
      <h2>Bluetooth Status</h2>
      <p>Status: {loading ? "LOADING..." : status.toUpperCase()}</p>
      <button onClick={checkStatus}>Refresh</button>
    </div>
  );
};
export default App;

import { useState } from "react";

export default function Chatbox() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const send = () => {
    setChat([...chat, { q: input, a: "Coming soon AI..." }]);
    setInput("");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-danger">GasMap Assistant</h2>
      {chat.map((c, i) => (
        <div key={i}>
          <p><b>You:</b> {c.q}</p>
          <p><b>Bot:</b> {c.a}</p>
        </div>
      ))}
      <input className="form-control" value={input} onChange={(e)=>setInput(e.target.value)} />
      <button className="btn btn-danger mt-2" onClick={send}>Send</button>
    </div>
  );
}
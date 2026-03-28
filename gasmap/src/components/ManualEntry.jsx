import { useState } from "react";
import { updateData } from "../services/api";

export default function ManualEntry() {
  const [value, setValue] = useState("");

  const submit = () => {
    updateData(value);
    setValue("");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-danger">Manual Entry</h2>
      <input
        className="form-control"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-danger mt-2" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
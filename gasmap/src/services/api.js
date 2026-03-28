const API = "http://localhost:5000/api";

export const getData = async () => {
  const res = await fetch(`${API}/data`);
  return res.json();
};

export const updateData = async (pressure) => {
  await fetch(`${API}/update`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ pressure })
  });
};
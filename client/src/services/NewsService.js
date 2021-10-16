export const addNews = async data => {
  const response = await fetch("/api/addNews", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};

export const allNews = async () => {
  const response = await fetch("/allNews");
  const res = await response.json();
  return res.data;
};

export const newsByCategory = async category => {
  const response = await fetch(`/api/category/${category}`);
  const res = await response.json();
  return res.data;
};

export const detailsById = async id => {
  const response = await fetch(`/api/details/${id}`);
  const res = await response.json();
  return res.data;
};

export const handleUpdate = async (data, id) => {
  const response = await fetch(`/api/updateContent/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};

export const handleDelete = async id => {
  const response = await fetch(`/api/delete/${id}`, { method: "DELETE" });
  const res = await response.json();
  return res;
};

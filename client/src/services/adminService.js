export const handleAddAdmin = async data => {
  const res = await fetch("/add-admin", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  return response;
};

export const allAdmin = async () => {
  const res = await fetch("/all-admin");
  const result = await res.json();
  return result.data;
};

export const handleDeleteAdmin = async id => {
  const res = await fetch(`/delete-admin/${id}`, { method: "DELETE" });
  const result = await res.json();
  return result;
};

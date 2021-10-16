export const userAuth = async (path, data) => {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  return response;
};

export const handleAuthentication = async () => {
  const res = await fetch("/authenticate");
  const response = await res.json();
  return response;
};

export const handleLogout = async () => {
  const res = await fetch("/logout");
  const response = await res.json();
  return response;
};

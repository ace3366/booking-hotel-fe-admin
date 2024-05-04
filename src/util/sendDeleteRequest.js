export async function sendDeleteRequest(route, id) {
  const response = await fetch(`${process.env.REACT_APP_API}/${route}`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Can not delete item");
  }
  const resData = await response.json();
  return resData;
}

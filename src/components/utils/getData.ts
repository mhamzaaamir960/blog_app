export async function getData(url: string) {
  const response = await fetch(url);
  const data = response.json();
  if (!response.ok) {
    throw new Error(`Failed to fetch data! Error Status: ${response.status}`);
  }
  return data;
}

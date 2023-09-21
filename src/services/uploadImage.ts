async function getUrl(newFormData: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
    method: "POST",
    body: newFormData,
  });
  const data = await res.json();
  return data;
}

export default getUrl;

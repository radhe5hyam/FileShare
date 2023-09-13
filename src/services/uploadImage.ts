async function getUrl(newFormData: FormData) {
  const res = await fetch(`${location.origin}/api/uploadImage`, {
    method: "POST",
    body: newFormData,
  });
  const data = await res.json();
  return data;
}

export default getUrl;

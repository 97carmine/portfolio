fetch("http://localhost:8000/", {
  method: "GET",
  mode: "same-origin",
  cache: "no-cache",
  credentials: "omit",
})
  .then(({ ok, status, statusText }) => {
    if(ok) {
      console.log(`Response successful: ${status} - ${statusText}`);
    } else {
      throw `Response error: ${status} - ${statusText}`;
    }
  })
  .catch(({ message }: Error) => {
    throw `Error executing fetch: ${message}`;
  });

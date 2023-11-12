import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

const initialState = {
  full_name: "",
  email: "",
  data: "",
};

export default () => {
  const [{ full_name, email, data }, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (
    event: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>,
  ) =>
    setData((prevState) => ({
      ...prevState,
      [event.currentTarget.id]: event.currentTarget.value,
    }));

  const submitRequest = async (
    event: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    event.preventDefault();

    setLoading(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ full_name, email, data }),
    })
      .then(({ ok }) => ok)
      .catch((error: Error) => {
        throw `There has been a problem with your fetch operation: ${error}`;
      });

    setLoading(false);

    if (event.target instanceof HTMLFormElement) {
      response && event.target.reset();
    }
  };

  return (
    <form
      class="container content"
      onInvalidCapture={(event) =>
        event.currentTarget.classList.add("is-validated")}
      onReset={(event) => {
        setData({ ...initialState });
        event.currentTarget.classList.remove("is-validated");
      }}
      onSubmit={submitRequest}
    >
      <div class="field">
        <label class="label" htmlFor="full_name">Full name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            value={full_name}
            id="full_name"
            onInput={handleInputChange}
            required
          />
          <p class="help">Enter your full name</p>
        </div>
      </div>
      <div class="field">
        <label class="label" htmlFor="email">Email address</label>
        <div class="control">
          <input
            class="input"
            type="email"
            value={email}
            id="email"
            onInput={handleInputChange}
            required
          />
          <p class="help">Enter your email address</p>
        </div>
      </div>
      <div class="field">
        <label class="label" htmlFor="data">Message</label>
        <div class="control">
          <textarea
            class="textarea"
            value={data}
            id="data"
            onInput={handleInputChange}
            required
          />
          <p class="help">Enter your message</p>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
        <div class="control">
          <button type="reset" class="button">Clean form</button>
        </div>
        
      </div>
    </form>
  );
};

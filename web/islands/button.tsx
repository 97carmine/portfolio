import { JSX } from "preact/jsx-runtime";

export default (props: JSX.HTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    onClick={() => history.back()}
    class={props.class}
  >
    {props.children}
  </button>
);

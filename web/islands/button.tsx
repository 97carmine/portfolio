import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSXInternal } from "https://esm.sh/v94/preact@10.11.0/src/jsx.d.ts";

export default (props: JSXInternal.HTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    onClick={() => {
      IS_BROWSER && history.back();
    }}
    className={props.class}
  >
    {props.children}
  </button>
);

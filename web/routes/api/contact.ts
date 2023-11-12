import { Handlers, Status } from "$fresh/server.ts";
import Ajv, { JSONSchemaType } from "ajv";

type email_data = {
  full_name: string;
  email: string;
  data: string;
};

export const handler: Handlers = {
  async POST(req: Request) {
    const content: email_data = await req.json();
    const ajv = new Ajv();

    const schema: JSONSchemaType<email_data> = {
      type: "object",
      required: ["full_name", "email", "data"],
      properties: {
        full_name: { type: "string", minLength: 1 },
        email: { type: "string", minLength: 1 },
        data: { type: "string", minLength: 1 },
      },
    };

    if (ajv.validate(schema, content)) {
      const { full_name, email, data } = content;

      const response = await fetch("https://ntfy.sh", {
        method: "POST",
        body: JSON.stringify({
          topic: Deno.env.get("TOPIC"),
          title: `${full_name}<${email}>`,
          message: data,
        }),
      })
        .then(({ status }) => status)
        .catch((error: Error) => {
          throw `There has been a problem with your fetch operation: ${error}`;
        });

      return new Response(undefined, { status: response });
    } else {
      return new Response(undefined, { status: Status.BadRequest });
    }
  },
};

import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  console.log(data);

  return Response.json(
    {
      msg: "auth",
    },
    {
      status: 200,
    },
  );
};

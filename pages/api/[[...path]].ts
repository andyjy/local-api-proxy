import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.info(
    `===\nRequest: ${req.method} ${req.url}\n - Headers: ${JSON.stringify(
      req.headers,
      undefined,
      2
    )}\n - Body: ${JSON.stringify(req.body, undefined, 2)}\n`
  );

  res.status(200);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.send(
    JSON.stringify(
      {
        status: "ok",
      },
      undefined,
      2
    )
  );
}

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

  const headers = {
    ...Object.fromEntries(
      Object.entries(req.headers)
        .map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
        .filter(
          ([k]) =>
            !["content-length"].includes(k.toLowerCase()) && !k.startsWith("x-")
        )
    ),
  };

  console.dir(headers);

  try {
    const result = await fetch(`${process.env.REMOTE_API_URL}${req.url}`, {
      method: req.method,
      headers,
      body: ["GET", "HEAD"].includes(req.method.toUpperCase())
        ? undefined
        : JSON.stringify(req.body),
    });

    const body = await result.text(),
      responseHeaders = Object.fromEntries(result.headers.entries());

    console.log(
      `${req.method} ${req.url} => Response: ${result.status} ${
        result.statusText
      }\n - Headers: ${JSON.stringify(
        responseHeaders,
        undefined,
        2
      )}\n}\n - Body: ${body}\n===\n\n`
    );

    res.status(result.status);
    result.headers.forEach((v, k) => {
      if (k.toLowerCase() === "transfer-encoding") return;
      res.setHeader(k, v);
    });
    res.send(body);
  } catch (e) {
    console.dir(e);
    res.status(500);
    res.send("Internal Server Error");
  }
}

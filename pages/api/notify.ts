import { Knock } from "@knocklabs/node";
import { NextApiRequest, NextApiResponse } from "next";

const knock = new Knock(process.env.KNOCK_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const percentUsage = Number(req.query.percentUsage || 90);
  foasda;
  try {
    const response = await knock.notify("usage-warning", {
      data: {
        projectName: "Notifications System",
        usagePercent: percentUsage,
        usageUrl: "https://vercel.com/dashboard/usage",
      },
      recipients: ["Alice"],
    });
    res.json(response);
  } catch (e) {
    res.status(500).json({
      error: (e as Error).message || "An error occurred",
    });
  }
}

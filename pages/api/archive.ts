import { Knock } from "@knocklabs/node";
import { NextApiRequest, NextApiResponse } from "next";

const knock = new Knock(process.env.KNOCK_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.nonce !== process.env.DEMO_NONCE) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  try {
    const query = await knock.messages.list();
    const messageIds = [];
    // @ts-ignore
    for (const message of query.items) {
      if (!message.archived_at && message.seen_at) {
        messageIds.push(message.id);
      }
    }
    if (!messageIds.length) {
      res.status(200).json({ count: 0, messages: [] });
      return;
    }
    await knock.post("/v1/messages/batch/archived", null, {
      query: { message_ids: messageIds },
    });
    res.status(200).json({ count: messageIds.length, messages: messageIds });
  } catch (e) {
    res.status(500).json(e);
  }
}

import AES from "aes-encryption";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.BUCKETS_ID as string,
    secretAccessKey: process.env.BUCKETS_SECRET as string,
  },
});
import jwt from "jsonwebtoken";

const aes = new AES();
aes.setSecretKey(process.env.APP_AES_SECRET_KEY);

const streamToString = (stream: Readable): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!stream) return undefined;
    if (!stream.on) return undefined;
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });

let cmd: GetObjectCommand;
if (process.env.KNOCK_API_KEY?.startsWith("sk_test")) {
  cmd = new GetObjectCommand({
    Bucket: "knock-keys",
    Key: "testing.txt",
  });
} else {
  cmd = new GetObjectCommand({
    Bucket: "knock-keys",
    Key: "production.txt",
  });
}

export default async function signJwt() {
  const { Body } = await s3.send(cmd);
  let encrypted = Buffer.from(
    await streamToString(Body as Readable),
    "base64"
  ).toString();
  let signingKey = aes.decrypt(encrypted);
  const currentTime = Math.floor(Date.now() / 1000);
  return jwt.sign(
    {
      sub: "Alice",
      iat: currentTime,
      exp: currentTime + 60 * 60, // 1 hour from now
    },
    signingKey,
    {
      algorithm: "RS256",
    }
  );
}

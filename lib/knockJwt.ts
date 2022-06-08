import AES from 'aes-encryption';
import jwt from "jsonwebtoken";
import encrypted from "./knockSigningKey";

const aes = new AES();
aes.setSecretKey(process.env.APP_AES_SECRET_KEY);

const signingKey = aes.decrypt(encrypted);

export default function signJwt() {
  const currentTime = Math.floor(Date.now() / 1000);
  console.log(signingKey);
  return jwt.sign(
    {
      sub: "Alice",
      iat: currentTime,
      exp: currentTime + 60 * 60, // 1 hour from now
    },
    signingKey,
    {
      algorithm: "RS256",
    },
  )
}

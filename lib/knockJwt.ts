import AES from 'aes-encryption';
import jwt from "jsonwebtoken";
import testingKey from "./knockSigningKeyTesting";
import productionKey from "./knockSigningKeyProduction";

const aes = new AES();
aes.setSecretKey(process.env.APP_AES_SECRET_KEY);

let signingKey: string;
if (process.env.KNCOK_API_KEY?.startsWith('sk_test')) {
  signingKey = aes.decrypt(testingKey);
} else {
  signingKey = aes.decrypt(productionKey);
}

export default function signJwt() {
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
    },
  )
}

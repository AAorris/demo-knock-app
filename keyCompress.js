// Create signingkey.txt with key
// Run this script
// Copy the encoded result
// Delete both files
const fs = require('fs')
const Cipher = require('aes-encryption')
const cipher = new Cipher()
const key = process.env.APP_AES_SECRET_KEY;
cipher.setSecretKey(key)
const text = fs.readFileSync('./signingkey.txt').toString()
const encrypted = cipher.encrypt(text)
if (cipher.decrypt(encrypted) === text)  {
    fs.writeFileSync('./signingkey64.txt', Buffer.from(encrypted).toString('base64'))
}

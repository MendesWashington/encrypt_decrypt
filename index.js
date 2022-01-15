const crypto = require("crypto");

//O tipo de algoritimo
const algorithm = "aes-256-cbc";
//Senha publica precisa ter 32 caracters
const password = "upplyCOPYRIGHTappsupplyCOPYRIGHT";

//Função para encryptar  
function encrypt(value) {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(password), iv);
  let encrypted = cipher.update(value);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}
//Função para decryptar
function decrypt(value) {
  const [iv, encrypted] = value.split(":");
  const ivBuffer = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(password),
    ivBuffer
  );
  let content = decipher.update(Buffer.from(encrypted, "hex"));
  content = Buffer.concat([content, decipher.final()]);

  return content.toString();
}

const crypted = encrypt("Tulio Faria");
console.log(crypted);
const decrypted = decrypt(crypted);
console.log(decrypted);

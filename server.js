const express = require("express");
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

["uploads", "encrypted", "decrypted"].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

const upload = multer({ dest: "uploads/" });

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

let encryptedFiles = [];

// ENCRYPT FILE
app.post("/encrypt", upload.single("file"), (req, res) => {
  const encryptedPath = `encrypted/${req.file.originalname}.enc`;

  const readStream = fs.createReadStream(req.file.path);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const writeStream = fs.createWriteStream(encryptedPath);

  readStream.pipe(cipher).pipe(writeStream);

  writeStream.on("finish", () => {
    encryptedFiles.push(req.file.originalname + ".enc");
    fs.unlinkSync(req.file.path);
    res.json({ message: "File encrypted", file: req.file.originalname + ".enc" });
  });
});

// GET ENCRYPTED FILE LIST
app.get("/list", (req, res) => {
  res.json(encryptedFiles);
});

// DOWNLOAD ENCRYPTED FILE
app.get("/download-encrypted/:name", (req, res) => {
  const filePath = `encrypted/${req.params.name}`;
  res.download(filePath);
});

// DECRYPT FILE
app.get("/decrypt/:name", (req, res) => {
  const originalName = req.params.name.replace(".enc", "");
  const decryptedPath = `decrypted/${originalName}`;

  const readStream = fs.createReadStream(`encrypted/${req.params.name}`);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const writeStream = fs.createWriteStream(decryptedPath);

  readStream.pipe(decipher).pipe(writeStream);

  writeStream.on("finish", () => {
    res.download(decryptedPath);
  });
});

app.listen(port, () =>
  console.log(`🚀 Server running at http://localhost:${port}`)
);

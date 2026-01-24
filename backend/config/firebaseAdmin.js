// // backend/config/firebaseAdmin.js
// import admin from "firebase-admin";
// import fs from "fs";
// import path from "path";

// const serviceAccountPath = path.resolve(
//   "./config/firebase-service-account.json"
// );

// const serviceAccount = JSON.parse(
//   fs.readFileSync(serviceAccountPath, "utf-8")
// );

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;










// backend/config/firebaseAdmin.js
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(
  __dirname,
  "./firebase-service-account.json"
);

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("✅ Firebase Admin initialized successfully");

export default admin;
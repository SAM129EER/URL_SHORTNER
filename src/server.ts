import app from "./app.js";
import { env } from "./config/env.js";
const PORT = env.PORT || 8000;

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} `);
    });
  } catch (err) {
    console.log("Error in running the server : ", err);
  }
};

startServer();

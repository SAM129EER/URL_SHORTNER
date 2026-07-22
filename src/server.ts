import app from "./app.js";

const PORT = 8000;

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

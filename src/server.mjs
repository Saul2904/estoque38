import 'dotenv/config'
import app from "./app.mjs";

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
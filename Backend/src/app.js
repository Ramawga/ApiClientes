import express from "express"
import conectaNaDataBase from "./config/dbConnect.js"
import routes from "./routes/index.js";
import cors from "cors"; // Importando o cors
import "dotenv/config"


const conexao = await conectaNaDataBase()

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
  });

  conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})

const app = express()
app.use(cors());
routes(app)

export default app


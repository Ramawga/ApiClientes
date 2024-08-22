import express from "express"
import clientes from "./clienteRoutes.js"


const routes= (app) =>{
 app.route("/").get((req, res) => res.status(200).send("curso de nodeee"))

 app.use(express.json(), clientes)           //middleware //uma função executando outra função // qualquer requisição cujo corpo é um objeto compatível com JSON, como 
                                            //um objeto com id e título ou um array de objetos, passará por esse middleware e 
                                            //será convertido e analisado (ou 'parseado') para JSON.                                         
}

export default routes
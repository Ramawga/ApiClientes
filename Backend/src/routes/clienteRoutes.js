import express from "express";
import ClienteController from "../controller/clienteController.js";

const routes = express.Router()

routes.get("/clientes", ClienteController.ListarClientes)
routes.get("/clientes/busca", ClienteController.ListarClientesPorCidade)
routes.get("/clientes/:id", ClienteController.ListarClientePorId)
routes.post("/clientes/", ClienteController.CadastrarClientes)
routes.put("/clientes/:id", ClienteController.AtualizarCliente)
routes.delete("/clientes/:id", ClienteController.DeletarCliente)


export default routes
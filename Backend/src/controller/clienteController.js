import cliente from "../models/Cliente.js"

class ClienteController {
    //GET
    static async ListarClientes (req, res){
        try{
            const listaClientes = await cliente.find({})
            res.status(200).json(listaClientes)  //Quando fazemos uma operação com sucesso em qualquer requisição, o código é 200
        }catch{
            res.status(500).json({message: `${erro.message} - falha na requisição`})
        }
    }

    static async ListarClientePorId (req, res){
        try{
            const id = req.params.id
            const clienteEncotrado = await cliente.findById(id)
            res.status(200).json(clienteEncotrado)  //Quando fazemos uma operação com sucesso em qualquer requisição, o código é 200
        }catch{
            res.status(500).json({message: `${erro.message} - falha na requisição`})
        }
    }
    //POST
    static async CadastrarClientes (req, res){
        try{
            const novoCliente = await cliente.create(req.body)
            res.status(201).json({message: "criado com sucesso", cliente:novoCliente})  //201 é o código de status HTTP para registro criado
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha ao cadastrar`})
        }

    }
    //PUT
    static async AtualizarCliente (req, res){
        try{
            const id = req.params.id
            await cliente.findByIdAndUpdate(id, req.body)
            res.status(200).json({message: "Cliente atualizado"})  //Quando fazemos uma operação com sucesso em qualquer requisição, o código é 200
        }catch{
            res.status(500).json({message: `${erro.message} - falha na atualização`})
        }
    }
    //DELETE
    static async DeletarCliente (req, res){
        try{
            const id = req.params.id
            await cliente.findByIdAndDelete(id)
            res.status(200).json({message: "Cliente apagado"})  //Quando fazemos uma operação com sucesso em qualquer requisição, o código é 200
        }catch{
            res.status(500).json({message: `${erro.message} - falha ao deletar`})
        }
    }
    //BUSCAR POR PARAMETRO
    static async ListarClientesPorCidade (req, res){
        const cidade = req.query.cidade
        try{
            const ClientesPorCidade = await cliente.find({cidade: cidade}) //{proprieda cidade: variavel cidade}
            res.status(200).json(ClientesPorCidade)
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisição`})
        }
    }
}

export default ClienteController
import { Router } from "express";
import {
  atualizarRestricao,
  excluirRestricao,
  inserirrestricao,
  listarestricao,
  verificarrestricao
} from "../repository/restricaorepository.js";

const endpoints = Router()




endpoints.post ( '/restricao' , async (req,resp) =>{

    try {
       const {restricao} = req.body

       if(!restricao){
        resp.status(400).send({err:'Preencha todos os campos'})
       }
       else{
            const existe = await verificarrestricao(restricao)

            if( existe  ){
                resp.status(400).send({erro:'Restricao ja cadastrada'})
            }

            else{
                const    resposta = await inserirrestricao({restricao})
                resp.send(resposta)
                
            }
       }
    } 
    
    catch (err) {
        resp.status(400).send({erro:err.message})
    }


})


endpoints.get('/restricao' , async ( req, resp ) =>{
    try {
        const resposta = await listarestricao()
        resp.send(resposta)
    } 
       catch (err) {
        resp.status(400).send({erro:err.message})
    }
})

endpoints.put('/restricao/alterar/:id' , async (req,res)=>{

    try {
        const { id } = req.params;
        const { novaDescricao ,idproduto} = req.body;
    
        const resposta = await atualizarRestricao(id , novaDescricao ,idproduto);
    
        
        if (resposta === 0) {
          res.status(404).send({message:"Restrição não encontrada"});
        } else {
          res.status(200).send({message:"Restrição atualizada com sucesso"});
        }
      } catch (err) {
        res.status(500).send({erro:err.message});
      }
    
})


  endpoints.delete( '/restricao/:id', async (req, res) => { 
    
    try {
      const { id } = req.params;
  
      const resposta = await excluirRestricao(id);
  
      if (resposta === 0) {
        res.status(404).send("Restrição não encontrada");
      } else {
        res.status(200).send("Restrição excluída com sucesso");
      }
    } catch (err) {
      res.status(500).send(err.message);
    }

  })

export default endpoints
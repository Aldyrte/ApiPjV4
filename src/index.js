//puxar o express
const express = require("express")


// database falsa pra ajudar 
let livros = []

const app = express()
app.use(express.json())
//rotas para o banco de dados (testado com sucesso no insominia)

//criar livro no insominia
app.post("/livros", (req,res)=>{
    const { id,nomeLivro,autorLivro,tipoLivro,estreiaLivro } = req.body
    const livro = {id,nomeLivro,autorLivro,tipoLivro,estreiaLivro}
    livros.push(livro)
    return res.status(201).json(livro)
})
//ver todos os livros que tem no banco de dados do insominia
app.get("/livros",(req,res)=>{
    const allLivros = livros
    return res.status(200).json(allLivros)
})
// escolher livro especifico pelo id no insominia
app.get("/livros/:livro_id", (req,res)=>{
    const {livro_id}= req.params
    const livro = livros.find((livro) => livro.id === livro_id)
    if (!livro) res.status(404).json("Não existe")
    return res.status(200).json(livro)
})
// deletar livro no insonmia
app.delete("/livros/:livro_id", (req,res)=>{
    const {livro_id}= req.params
    const livroF = livros.filter((livro) => livro.id !== livro_id)
    livros = livroF
    return res.status(204).json("deletado")
})
//atualizar livro no insonmia
app.patch("/livros/:livro_id",(req,res)=>{
    const {nomeLivro,autorLivro,tipoLivro,estreiaLivro } = req.body
    const {livro_id}= req.params
    const livro = livros.find((livro) => livro.id === livro_id)
    livro.id = livro.id
    livro.nomeLivro = nomeLivro ? nomeLivro :livro.nomeLivro
    livro.autorLivro = autorLivro ? autorLivro :livro.autorLivro
    livro.tipoLivro = tipoLivro ? tipoLivro : livro.tipoLivro
    livro.estreiaLivro = estreiaLivro ? estreiaLivro :livro.estreiaLivro
    return res.status(200).json(livro)
})

//servidor teste pra rodar (mensagem pra verificar se crashou)
app.listen(3000, ()=> console.log("server tá funcionando"))
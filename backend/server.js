
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";
// ETAPA 1 — Importe o modelo User e a biblioteca bcryptjs.
// TODO ETAPA 1: escreva os dois imports aqui.
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB conectado");
  })
  .catch((erro) => {
    console.error("Erro ao conectar ao MongoDB:", erro);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    projeto: "SobrouVendi",
    status: "API funcionando",
    crudProdutos: "GET, POST, PUT e DELETE concluídos."
  });
});

app.get("/api/produtos", async (req, res) => {
  try {
    const produtos = await Product.find();

    res.json(produtos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: "Erro ao buscar produtos."
    });
  }
});

app.post("/api/produtos", async (req, res) => {
  try {
    const produto = await Product.create(req.body);
    res.status(201).json(produto);
  } catch (erro) {
    console.error(erro);
    res.status(400).json({
      erro: "Erro ao cadastrar produto."
    });
  }
}); 

app.get("/api/produtos/:id", async (req, res) => {
  try {
    const produto = await Product.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({
        erro: "Produto não encontrado."
      });
    }
    res.json(produto);
  } catch (erro) {
    console.error("Erro ao buscar produto:", erro);
    res.status(400).json({
      erro: "Erro ao buscar produto."
    });
  }
});

app.put("/api/produtos/:id", async (req, res) => {
  try {
    const produtoAtualizado = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!produtoAtualizado) {
      return res.status(404).json({
        erro: "Produto não encontrado."
      });
    }
    res.json(produtoAtualizado);
  } catch (erro) {
    console.error("Erro ao atualizar produto:", erro);
    res.status(400).json({
      erro: "Erro ao atualizar produto."
    });
  }
});

app.delete("/api/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const produtoExcluido = await Product.findByIdAndDelete(id);

    if (!produtoExcluido) {
      return res.status(404).json({
        mensagem: "Produto não encontrado."
      });
    }

    res.json({
      mensagem: "Produto excluído com sucesso."
    });
  } catch (erro) {
    console.error("Erro ao excluir produto:", erro);
    res.status(500).json({
      mensagem: "Erro ao excluir produto."
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  res.status(501).json({ erro: "Login ainda não implementado pelo aluno." });
});

// ETAPA 2 — Criar a rota POST /api/auth/register.
// ETAPA 3 — Ler e validar nome, email e senha; impedir e-mail duplicado.
// ETAPA 4 — Gerar hash da senha com bcryptjs e salvar usuário como cliente.
// ETAPA 5 — Responder com status 201 e dados públicos, SEM devolver senha/hash.
// TODO ETAPAS 2 A 5: substitua a rota provisória abaixo pela sua implementação.
app.post("/api/auth/register", async (req, res) => {
  res.status(501).json({ erro: "Cadastro ainda não ativado. Descomente a implementação." });
});

  app.post("/api/auth/register", async (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      //etapa 3 - validar os campos recebidos
      if(!nome?.trim() || !email?.trim() || !senha?.trim() || typeof senha !== 'string') {
        return res.status(400).json({ erro: "Informe nome, email e senha." });
      }

      if (senha.length < 6) {
        return res.status(400).json({ erro: "A senha deve ter pelo menos 6 caracteres." });
      }
      const emailNormalizado = email.trim().toLowerCase();
      const existente = await User.findOne({ email: emailNormalizado });
      if (existente) {
        return res.status(409).json({ erro: "E-mail já cadastrado." });
      }
  
      //etapa 4 - nunca salvar senha em texto puro
      const senhaHash = await bcrypt.hash(senha, 10);
      const usuario = await User.create({
        nome: nome.trim(), email: emailNormalizado, senha: senhaHash, perfil: "cliente"
      });

      //etapa 5 - nunca devolver senha/hash na resposta
      return res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso.",
        usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email }
      });
    } catch (erro) {
      if (erro.code === 11000) {
        return res.status(409).json({ erro: "E-mail já cadastrado." });
      }
      console.error("Erro ao cadastrar usuário:", erro);
      return res.status(500).json({ erro: "Erro ao cadastrar usuário." });
    }
  });



app.post("/api/pedidos", async (req, res) => {
  res.status(501).json({ erro: "Pedidos ainda não implementados." });
});

app.listen(PORT, () => {
  console.log(`SobrouVendi API: http://localhost:${PORT}`);
});

import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();

const products = [
  { nome: "Notebook Pro 15", categoria: "Informática", preco: 2499.90, estoque: 8, descricao: "Notebook de demonstração." },
  { nome: "Mouse sem fio", categoria: "Informática", preco: 89.90, estoque: 25, descricao: "Mouse sem fio." },
  { nome: "Teclado mecânico", categoria: "Informática", preco: 199.90, estoque: 12, descricao: "Teclado mecânico." },
  { nome: "Fone Bluetooth", categoria: "Eletrônicos", preco: 149.90, estoque: 18, descricao: "Fone Bluetooth." },
  { nome: "Smartphone", categoria: "Eletrônicos", preco: 1299.90, estoque: 6, descricao: "Smartphone de demonstração." },
  { nome: "Monitor 24", categoria: "Informática", preco: 899.90, estoque: 10, descricao: "Monitor de demonstração." },
  { nome: "Webcam Full HD", categoria: "Informática", preco: 179.90, estoque: 14, descricao: "Webcam para aulas e videoconferências." },
  { nome: "Caixa de som Bluetooth", categoria: "Eletrônicos", preco: 219.90, estoque: 16, descricao: "Caixa de som portátil Bluetooth." },
  { nome: "Pen Drive 64 GB", categoria: "Informática", preco: 49.90, estoque: 30, descricao: "Pen drive para armazenamento de arquivos." },
  { nome: "HD Externo 1 TB", categoria: "Informática", preco: 389.90, estoque: 9, descricao: "HD externo para backup de dados." },
  { nome: "Tablet 10", categoria: "Eletrônicos", preco: 999.90, estoque: 7, descricao: "Tablet com tela de 10 polegadas." },
  { nome: "Carregador USB-C", categoria: "Eletrônicos", preco: 79.90, estoque: 22, descricao: "Carregador rápido com conexão USB-C." },
  { nome: "SSD 480 GB", categoria: "Informática", preco: 259.90, estoque: 13, descricao: "SSD para armazenamento e desempenho." },
  { nome: "Roteador Wi-Fi", categoria: "Informática", preco: 189.90, estoque: 11, descricao: "Roteador para redes sem fio." },
  { nome: "Smartwatch", categoria: "Eletrônicos", preco: 349.90, estoque: 15, descricao: "Relógio inteligente com monitoramento." },
  { nome: "Impressora Wi-Fi", categoria: "Informática", preco: 749.90, estoque: 5, descricao: "Impressora com conexão sem fio." },
  { nome: "Controle Bluetooth", categoria: "Eletrônicos", preco: 169.90, estoque: 17, descricao: "Controle sem fio para jogos." },
  { nome: "Hub USB 4 portas", categoria: "Informática", preco: 69.90, estoque: 28, descricao: "Hub USB com quatro conexões." },
  { nome: "Microfone USB", categoria: "Eletrônicos", preco: 229.90, estoque: 10, descricao: "Microfone USB para gravações." },
  { nome: "Cabo HDMI 2 m", categoria: "Eletrônicos", preco: 39.90, estoque: 35, descricao: "Cabo HDMI com dois metros." },
  { nome: "Memória RAM 8 GB", categoria: "Informática", preco: 179.90, estoque: 20, descricao: "Memória RAM para computador." },
  { nome: "Headset Gamer", categoria: "Eletrônicos", preco: 249.90, estoque: 12, descricao: "Headset com microfone integrado." },
  { nome: "Adaptador Wi-Fi USB", categoria: "Informática", preco: 59.90, estoque: 24, descricao: "Adaptador USB para rede Wi-Fi." },
  { nome: "Power Bank", categoria: "Eletrônicos", preco: 139.90, estoque: 19, descricao: "Bateria portátil para dispositivos móveis." },
  { nome: "Suporte para Notebook", categoria: "Informática", preco: 99.90, estoque: 21, descricao: "Suporte ajustável para notebook." },
  { nome: "Teclado sem fio", categoria: "Informática", preco: 129.90, estoque: 18, descricao: "Teclado compacto sem fio." },
  { nome: "Câmera de Segurança", categoria: "Eletrônicos", preco: 299.90, estoque: 8, descricao: "Câmera para monitoramento de ambientes." },
  { nome: "Mouse Gamer", categoria: "Informática", preco: 119.90, estoque: 16, descricao: "Mouse com ajuste de sensibilidade." },
  { nome: "Luminária LED USB", categoria: "Eletrônicos", preco: 54.90, estoque: 26, descricao: "Luminária LED alimentada por USB." },
  { nome: "Mini Projetor", categoria: "Eletrônicos", preco: 699.90, estoque: 4, descricao: "Projetor compacto para apresentações." }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await User.deleteMany({});

  await Product.insertMany(products);

  const senha = await bcrypt.hash("123456", 10);
  await User.create({
    nome: "Administrador",
    email: "admin@meusitevendas.com",
    senha,
    perfil: "admin"
  });

  await User.create({
    nome: "Cliente Demonstração",
    email: "cliente@meusitevendas.com",
    senha,
    perfil: "cliente"
  });

  console.log("Seed concluído.");
  console.log("Admin: admin@meusitevendas.com / 123456");
  console.log("Cliente: cliente@meusitevendas.com / 123456");
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

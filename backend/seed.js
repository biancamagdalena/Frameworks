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
  { nome: "Monitor 24", categoria: "Informática", preco: 899.90, estoque: 10, descricao: "Monitor de demonstração." }
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

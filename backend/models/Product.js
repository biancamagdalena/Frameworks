import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  categoria: { type: String, required: true },
  preco: { type: Number, required: true, min: 0 },
  estoque: { type: Number, required: true, min: 0 },
  imagem: String,
  ativo: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);

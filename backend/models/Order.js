import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  itens: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantidade: Number,
    preco: Number
  }],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pendente", "pago", "preparando", "enviado", "entregue", "cancelado"],
    default: "pendente"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);

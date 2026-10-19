import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  senha: { type: String, required: true },
  perfil: { type: String, enum: ["cliente", "admin"], default: "cliente" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);

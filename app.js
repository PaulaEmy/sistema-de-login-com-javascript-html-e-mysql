const express = require("express");
const app = express();
const Professor = require("./models/Users"); // Alterado para Professor
const JwtToken = require("./models/JwtToken");
app.use(express.static("view"));
const path = require("path");

app.use(express.json());

app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "cadastro.html"));
});

app.post("/cadastrar", async (req, res) => {
  try {
    const novoProfessor = await Professor.create(req.body); // Use uma variável diferente para o novo professor
    return res.json({
      erro: false,
      mensagem: "Professor cadastrado com sucesso!",
    });
  } catch (error) {
    console.error("Erro durante o cadastro do professor:", error);
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: Professor não cadastrado com sucesso! ${error.message}`,
    });
  }
});

const jwtToken = new JwtToken();

app.post("/login", async (req, res) => {
  // Implemente a lógica de login e geração do token JWT
  const payload = {
    /* informações do professor autenticado */
  };
  const token = jwtToken.gerarToken(payload);
  // Retorne o token na resposta
  res.json({ erro: false, mensagem: "Login bem-sucedido", token });
});

// Rotas protegidas que exigem autenticação com JWT
app.get("/rota-protegida", (req, res) => {
  // Use o middleware de verificação de token
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];
  const tokenValido = jwtToken.validarToken(token);

  if (tokenValido.status) {
    // O token é válido, continue com a lógica da rota
    const dadosDoProfessor = tokenValido.dados.data;
    res.json({
      erro: false,
      mensagem: "Acesso autorizado",
      professor: dadosDoProfessor,
    });
  } else {
    // Token inválido
    res.status(401).json({ erro: true, mensagem: "Acesso não autorizado" });
  }
});

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

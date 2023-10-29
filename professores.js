// professores.js

const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "colegiosunivap",
};

const conn = mysql.createConnection(dbConfig);

conn.connect((err) => {
  if (err) {
    console.error("Erro na conexão: " + err.stack);
    return;
  }
  console.log("Conexão bem-sucedida com o banco de dados MySQL");
});

app.use(bodyParser.json());

app.post("/", (req, res) => {
  const { registro, nome, email, senha, tipo } = req.body;

  const sql = `INSERT INTO professor (registro, nome, email, senha, tipo) VALUES (?, ?, ?, ?, ?)`;
  const values = [registro, nome, email, senha, tipo];

  conn.query(sql, values, (err, result) => {
    if (err) {
      res.json({ message: "Erro ao cadastrar o professor: " + err.message });
    } else {
      res.json({ message: "Professor cadastrado com sucesso" });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor está ouvindo na porta ${port}`);
});

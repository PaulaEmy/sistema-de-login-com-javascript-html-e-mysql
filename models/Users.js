const Sequelize = require("sequelize");
const db = require("./db");

const Professor = db.define(
  "professor",
  {
    registro: {
      type: Sequelize.INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tipo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "professor", // Defina o nome da tabela
    timestamps: false, // Se não houver colunas de timestamp na tabela
  }
);

module.exports = Professor;

COMO RODAR O PROJETO BAIXADO
Instalar todas as dependencias indicada pelo package.json

### npm install

Rodar o projeto com nodemon

### nodemon app.js

SEQUENCIA PARA CRIAR O PROJETO
Criar o arquivo package

### npm init

Gerencia as requisições, rotas e URLs, entre outra funcionalidades

### npm install express

Rodar o projeto

### node app.js

Acessar o projeto no navegador

### http://localhost:8080

Instalar o módulo para reiniciar o servidor sempre que houver alteração no código fonte, g significa globalmente

### npm install -g nodemon

### npm install --save-dev nodemon

Rodar o projeto com nodemon

### nodemon app.js

Sequelize é uma biblioteca Javascript que facilita o gerenciamento de um banco de dados SQL

### npm install --save sequelize

Instalar o drive do banco de dados

### npm install --save mysql2
"# sistema-de-login-com-javascript-html-e-mysql" 

Créditos do código: https://www.youtube.com/watch?v=_OeuPAb9bhU&t=2671s

Código da tabela: SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema colegiosUnivap
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema colegiosUnivap
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `colegiosUnivap` DEFAULT CHARACTER SET utf8 ;
USE `colegiosUnivap` ;

-- -----------------------------------------------------
-- Table `colegiosUnivap`.`Aluno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`Aluno` (
  `matricula` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(128) NULL,
  `email` VARCHAR(45) NULL,
  `wpp` BIGINT NULL,
  `senha` VARCHAR(32) NULL,
  PRIMARY KEY (`matricula`),
  UNIQUE INDEX `matricula_UNIQUE` (`matricula` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`Professor` (
  `registro` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(128) NULL,
  `email` VARCHAR(45) NULL,
  `senha` VARCHAR(32) NULL,
  `tipo` INT NULL COMMENT '1 - Professor\n2 - Professor Administrador\n',
  PRIMARY KEY (`registro`),
  UNIQUE INDEX `registro_UNIQUE` (`registro` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`Turma`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`Turma` (
  `idTurma` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `abreviacao` VARCHAR(45) NULL,
  `ano` INT NULL,
  PRIMARY KEY (`idTurma`),
  UNIQUE INDEX `idTurma_UNIQUE` (`idTurma` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`Disciplina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`Disciplina` (
  `idDisciplina` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `Professor_registro` INT UNSIGNED NOT NULL,
  `Turma_idTurma` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idDisciplina`),
  UNIQUE INDEX `idDisciplina_UNIQUE` (`idDisciplina` ASC),
  INDEX `fk_Disciplina_Professor1_idx` (`Professor_registro` ASC),
  INDEX `fk_Disciplina_Turma1_idx` (`Turma_idTurma` ASC),
  CONSTRAINT `fk_Disciplina_Professor1`
    FOREIGN KEY (`Professor_registro`)
    REFERENCES `colegiosUnivap`.`Professor` (`registro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Disciplina_Turma1`
    FOREIGN KEY (`Turma_idTurma`)
    REFERENCES `colegiosUnivap`.`Turma` (`idTurma`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`Nota`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`Nota` (
  `idNota` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Disciplina_idDisciplina` INT UNSIGNED NOT NULL,
  `Aluno_matricula` INT UNSIGNED NOT NULL,
  `bimestre` INT NULL,
  `nota` FLOAT NULL,
  `ultimaAlteracao` DATETIME NULL,
  `tipoNota` INT NULL COMMENT '1 - Projeto.\n2 - Prova.',
  `fezLista` INT NULL,
  PRIMARY KEY (`idNota`),
  UNIQUE INDEX `idNota_UNIQUE` (`idNota` ASC),
  INDEX `fk_Nota_Disciplina1_idx` (`Disciplina_idDisciplina` ASC),
  INDEX `fk_Nota_Aluno1_idx` (`Aluno_matricula` ASC),
  CONSTRAINT `fk_Nota_Disciplina1`
    FOREIGN KEY (`Disciplina_idDisciplina`)
    REFERENCES `colegiosUnivap`.`Disciplina` (`idDisciplina`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Nota_Aluno1`
    FOREIGN KEY (`Aluno_matricula`)
    REFERENCES `colegiosUnivap`.`Aluno` (`matricula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`PedidoRevisao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`PedidoRevisao` (
  `idPedidoRevisao` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Nota_idNota` INT UNSIGNED NOT NULL,
  `descricao` VARCHAR(512) NULL,
  `status` INT NULL COMMENT '1 - Não avaliado\n2 - Aceito e Alterado\n3 - Recusado e não alterado',
  PRIMARY KEY (`idPedidoRevisao`),
  UNIQUE INDEX `idPedidoRevisao_UNIQUE` (`idPedidoRevisao` ASC),
  INDEX `fk_PedidoRevisao_Nota1_idx` (`Nota_idNota` ASC),
  CONSTRAINT `fk_PedidoRevisao_Nota1`
    FOREIGN KEY (`Nota_idNota`)
    REFERENCES `colegiosUnivap`.`Nota` (`idNota`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegiosUnivap`.`HistoricoAlteracoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegiosUnivap`.`HistoricoAlteracoes` (
  `Nota_idNota` INT UNSIGNED NOT NULL,
  `nota` FLOAT NULL,
  `ultimaAlteracao` DATETIME NULL,
  INDEX `fk_Historico_Nota1_idx` (`Nota_idNota` ASC),
  CONSTRAINT `fk_Historico_Nota1`
    FOREIGN KEY (`Nota_idNota`)
    REFERENCES `colegiosUnivap`.`Nota` (`idNota`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



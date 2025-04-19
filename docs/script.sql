
CREATE SCHEMA IF NOT EXISTS `pizzaPlanet` DEFAULT CHARACTER SET utf8 ;
USE `pizzaPlanet` ;

-- -----------------------------------------------------
-- Table `pizzaPlanet`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizzaPlanet`.`Cliente` (
  `cpf` CHAR(11) NOT NULL,
  `Email` VARCHAR(45) NULL,
  `Senha` VARCHAR(45) NULL,
  `Nome` VARCHAR(45) NULL,
  `Telefone` CHAR(13) NULL,
  `` VARCHAR(45) NULL,
  PRIMARY KEY (`cpf`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizzaPlanet`.`Restaurante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizzaPlanet`.`Restaurante` (
  `idRestaurante` INT NOT NULL,
  `Nome` VARCHAR(45) NULL,
  `Descrição` VARCHAR(100) NULL,
  `Latitude` FLOAT NULL,
  `Longitude` FLOAT NULL,
  PRIMARY KEY (`idRestaurante`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizzaPlanet`.`Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizzaPlanet`.`Pedido` (
  `idPedido` INT NOT NULL,
  `Preço` FLOAT NULL,
  `Status` VARCHAR(20) NULL,
  `Endereço` VARCHAR(100) NULL,
  `CpfCliente` CHAR(11) NOT NULL,
  `IdRestaurante` INT NOT NULL,
  PRIMARY KEY (`idPedido`),
  INDEX `fk_Pedido_Cliente_idx` (`CpfCliente` ASC) VISIBLE,
  INDEX `fk_Pedido_Restaurante1_idx` (`IdRestaurante` ASC) VISIBLE,
  CONSTRAINT `fk_Pedido_Cliente`
    FOREIGN KEY (`CpfCliente`)
    REFERENCES `pizzaPlanet`.`Cliente` (`cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pedido_Restaurante1`
    FOREIGN KEY (`IdRestaurante`)
    REFERENCES `pizzaPlanet`.`Restaurante` (`idRestaurante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizzaPlanet`.`Pizza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizzaPlanet`.`Pizza` (
  `idPizza` INT NOT NULL,
  `Nome` VARCHAR(45) NULL,
  `Tamanho` CHAR(2) NULL,
  `Preço` FLOAT NULL,
  `Descrição` VARCHAR(100) NULL,
  PRIMARY KEY (`idPizza`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizzaPlanet`.`Item_de_Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizzaPlanet`.`Item_de_Pedido` (
  `IdItemPedido` INT NOT NULL,
  `Quantidade` INT NULL,
  `IdPedido` INT NOT NULL,
  `IdPizza` INT NOT NULL,
  PRIMARY KEY (`IdItemPedido`),
  INDEX `fk_Item_de_Pedido_Pedido1_idx` (`IdPedido` ASC) VISIBLE,
  INDEX `fk_Item_de_Pedido_Pizza1_idx` (`IdPizza` ASC) VISIBLE,
  CONSTRAINT `fk_Item_de_Pedido_Pedido1`
    FOREIGN KEY (`IdPedido`)
    REFERENCES `pizzaPlanet`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Item_de_Pedido_Pizza1`
    FOREIGN KEY (`IdPizza`)
    REFERENCES `pizzaPlanet`.`Pizza` (`idPizza`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizzaPlanet`.`Bebida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizzaPlanet`.`Bebida` (
  `idBebida` INT NOT NULL,
  `Nome` VARCHAR(45) NULL,
  `Descrição` VARCHAR(100) NULL,
  `Preço` FLOAT NULL,
  PRIMARY KEY (`idBebida`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizzaPlanet`.`Bebida_do_Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizzaPlanet`.`Bebida_do_Pedido` (
  `IdBebidaPedido` INT NOT NULL,
  `Quantidade` INT NULL,
  `IdBebida` INT NOT NULL,
  `IdPedido` INT NOT NULL,
  PRIMARY KEY (`IdBebidaPedido`),
  INDEX `fk_Bebida_do_Pedido_Bebida1_idx` (`IdBebida` ASC) VISIBLE,
  INDEX `fk_Bebida_do_Pedido_Pedido1_idx` (`IdPedido` ASC) VISIBLE,
  CONSTRAINT `fk_Bebida_do_Pedido_Bebida1`
    FOREIGN KEY (`IdBebida`)
    REFERENCES `pizzaPlanet`.`Bebida` (`idBebida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Bebida_do_Pedido_Pedido1`
    FOREIGN KEY (`IdPedido`)
    REFERENCES `pizzaPlanet`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizzaPlanet`.`Adicional`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizzaPlanet`.`Adicional` (
  `IdAdicional` INT NOT NULL,
  `Nome` VARCHAR(45) NULL,
  `Descrição` VARCHAR(100) NULL,
  `Preço` FLOAT NULL,
  PRIMARY KEY (`IdAdicional`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizzaPlanet`.`Adicional_de_Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizzaPlanet`.`Adicional_de_Pedido` (
  `IdAdicionalPedido` INT NOT NULL,
  `Quantidade` INT NULL,
  `Adicional_IdAdicional` INT NOT NULL,
  `Pedido_idPedido` INT NOT NULL,
  PRIMARY KEY (`IdAdicionalPedido`),
  INDEX `fk_Adicional_de_Pedido_Adicional1_idx` (`Adicional_IdAdicional` ASC) VISIBLE,
  INDEX `fk_Adicional_de_Pedido_Pedido1_idx` (`Pedido_idPedido` ASC) VISIBLE,
  CONSTRAINT `fk_Adicional_de_Pedido_Adicional1`
    FOREIGN KEY (`Adicional_IdAdicional`)
    REFERENCES `pizzaPlanet`.`Adicional` (`IdAdicional`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Adicional_de_Pedido_Pedido1`
    FOREIGN KEY (`Pedido_idPedido`)
    REFERENCES `pizzaPlanet`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pizzaPlanet`.`Transação_de_Pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pizzaPlanet`.`Transação_de_Pagamento` (
  `idTransaçãoPagamento` INT NOT NULL,
  `MetodoPagamento` VARCHAR(45) NULL,
  `NumeroCartao` CHAR(16) NULL,
  `ValidadeCartao` CHAR(5) NULL,
  `CodigoCVC` CHAR(3) NULL,
  `Valor` FLOAT NULL,
  `Pedido_idPedido` INT NOT NULL,
  PRIMARY KEY (`idTransaçãoPagamento`),
  INDEX `fk_Transação_de_Pagamento_Pedido1_idx` (`Pedido_idPedido` ASC) VISIBLE,
  CONSTRAINT `fk_Transação_de_Pagamento_Pedido1`
    FOREIGN KEY (`Pedido_idPedido`)
    REFERENCES `pizzaPlanet`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



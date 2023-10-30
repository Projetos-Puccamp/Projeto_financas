create database mydb;
use mydb;
CREATE TABLE Usuario (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    EmailLogin VARCHAR(255) NOT NULL UNIQUE, 
    Senha VARCHAR(255) NOT NULL,
    S_N ENUM('true', 'false')
);
CREATE TABLE UsuarioSaldo (
    UsuarioSaldoID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Saldo DECIMAL(10, 2),
    Cartao1 DECIMAL(10, 2),
    Cartao2 DECIMAL(10, 2),
    FOREIGN KEY (UserID) REFERENCES Usuario(UserID)
);
DELIMITER //
CREATE TRIGGER After_Insert_Usuario
AFTER INSERT ON Usuario FOR EACH ROW
BEGIN
  -- Inserir um novo registro na tabela UsuarioSaldo associado ao novo usuário
  INSERT INTO UsuarioSaldo (UserID, Saldo, Cartao1, Cartao2)
  VALUES (NEW.UserID, 0.00, 0.00, 0.00);
END;
//
INSERT INTO Usuario (Emaillogin, Senha) VALUES ('cadu', '123');
INSERT INTO Usuario (Emaillogin, Senha) VALUES ('migs', '123');
INSERT INTO Usuario (Emaillogin, Senha) VALUES ('kauan', '123');
select * from Usuario;
select * from UsuarioSaldo;
select * from CartaoD;
select * from CartaoC;
SELECT SUM(Saldo) FROM CartaoD WHERE UserID = 1;
SELECT SUM(limite) FROM CartaoC WHERE UserID = 1;
delete from cartaoD where cartaoDID = 2;
CREATE TABLE CartaoD (
    CartaoDID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Nomecartao VARCHAR(255),
    Saldo DECIMAL(10, 2),
    FOREIGN KEY (UserID) REFERENCES Usuario(UserID)
);
CREATE TABLE CartaoC (
    CartaoCID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Nomecartao VARCHAR(255),
    limite DECIMAL(10, 2),
    gasto DECIMAL(10,2),
    FOREIGN KEY (CartaoCID) REFERENCES Usuario(UserID)
);
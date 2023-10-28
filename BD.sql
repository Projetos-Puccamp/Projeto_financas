create database mydb;
use mydb;
CREATE TABLE Usuario (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    EmailLogin VARCHAR(255) NOT NULL UNIQUE, 
    Senha VARCHAR(255) NOT NULL,
    S_N ENUM('true', 'false')
);
drop table Usuario;
drop table UsuarioSaldo;
INSERT INTO Usuario (Emaillogin, Senha) VALUES ('cadu', '123');
INSERT INTO Usuario (Emaillogin, Senha) VALUES ('migs', '123');
INSERT INTO Usuario (Emaillogin, Senha) VALUES ('kauan', '123');

CREATE TABLE UsuarioSaldo (
    UsuarioSaldoID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Saldo DECIMAL(10, 2),
    Cartao1 DECIMAL(10, 2),
    Cartao2 DECIMAL(10, 2),
    FOREIGN KEY (UserID) REFERENCES Usuario(UserID)
);
use mydb;
UPDATE conta SET S_N = 'S' WHERE Emaillogin = 'cadu';
select * from Usuario;
select * from UsuarioSaldo;
INSERT INTO UsuarioSaldo (UserID, Saldo) VALUES (1, 100.00);
INSERT INTO UsuarioSaldo (UserID, Saldo) VALUES (2, 100.00);
DELIMITER //
CREATE TRIGGER After_Insert_Usuario
AFTER INSERT ON Usuario FOR EACH ROW
BEGIN
  -- Inserir um novo registro na tabela UsuarioSaldo associado ao novo usuário
  INSERT INTO UsuarioSaldo (UserID, Saldo, Cartao1, Cartao2)
  VALUES (NEW.UserID, 0.00, 0.00, 0.00);
END;
//
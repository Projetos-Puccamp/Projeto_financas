create database Financas;
use financas;
CREATE TABLE Conta (
    ContaID INT PRIMARY KEY AUTO_INCREMENT,
    EmailLogin VARCHAR(255) NOT NULL UNIQUE, 
    Senha VARCHAR(255) NOT NULL,
    Nome VARCHAR(255),
    DataNascimento DATE
);

CREATE TABLE UsuarioSaldo (
    UsuarioSaldoID INT PRIMARY KEY AUTO_INCREMENT,
    ContaID INT,
    Saldo DECIMAL(10, 2),
    TipoConta VARCHAR(255),
    Cartao VARCHAR(255),
    FOREIGN KEY (ContaID) REFERENCES Conta(ContaID)
);
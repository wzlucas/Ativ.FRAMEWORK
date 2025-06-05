<?php
require_once "conexao.php";

class CriaClasses1 {
    private $tbBanco = "Tables_in_enderecos";
    private $con;

    function __construct() {
        $this->con = (new Conexao())->conectar();
    }

    function ClassesModel() {
        $sql = "SHOW TABLES";
        $query = $this->con->query($sql);
        $tabelas = $query->fetchAll(PDO::FETCH_OBJ);
        var_dump($tabelas);

    }
}

(new CriaClasses1())->ClassesModel();

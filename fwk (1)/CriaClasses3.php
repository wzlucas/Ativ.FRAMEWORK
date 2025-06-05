<?php

include("conexao.php");

class CriaClasses3
{
    private $con;
    public function __construct()
    {
        $this->con = (new Conexao())->conectar();
    }
    function ClassesModel()
    {

        if (!file_exists("sistema"))
            mkdir("sistema");
        if (!file_exists("sistema/model"))
            mkdir("sistema/model"); {
        }
        $sql = "SHOW TABLES";
        $query = $this->con->query($sql);
        $tabelas = $query->fetchAll(PDO::FETCH_ASSOC);

        foreach ($tabelas as $tabela) {
            $nomeTabela = array_values((array) $tabela)[0];
            $conteudo = <<<EOT
        
        
<?php
class {$nomeTabela}{
}
?>
EOT;
            file_put_contents("sistema/model/{$nomeTabela}.php", $conteudo);
        }
    }
}
(new CriaClasses1())->ClassesModel();

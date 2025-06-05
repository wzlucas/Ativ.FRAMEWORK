<?php
include "conexao.php";

class CriaClasses1 {
    private $con;

    function __construct() {
        $this->con = (new Conexao())->conectar();
    }

    function ClassesModel() {
        if (!file_exists("sistema")) {
            mkdir("sistema");
        if (!file_exists("sistema/model"))
              mkdir("sistema/model");
        }
        $sql = "SHOW TABLES";
        $query = $this->con->query($sql);
        $tabelas = $query->fetchAll(PDO::FETCH_ASSOC);

        foreach ($tabelas as $tabela) {
            $nomeTabela = array_values((array) $tabela)[0];
            $sql="show columns from ".$nomeTabela;
            $atributos = $this->con->query($sql)->fetchAll(PDO::FETCH_OBJ);
            $nomeAtributos="";
            foreach ($atributos as $atributo) {
                $nomeAtributos.="private \${$atributo->Field};\n";

            }
            $nomeTabela=ucfirst($nomeTabela);
            $conteudo = <<<EOT
<?php
class {$nomeTabela} {
{$nomeAtributos}
}
?>
EOT;
      file_put_contents("sistema/model/{$nomeTabela}.php", $conteudo);

        }
    }
}

(new CriaClasses1())->ClassesModel();

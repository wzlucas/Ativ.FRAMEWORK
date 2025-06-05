<?php
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);
class Creator {
    private $con;
    private $servidor ;
    private $banco;
    private $usuario;
    private $senha;

    function __construct() {
        $this->servidor=$_POST["servidor"];
        $this->banco=$_POST["banco"];
        $this->usuario=$_POST["usuario"];
        $this->senha=$_POST["senha"];
        $this->conectar();
    }
    function conectar() {
        try {
            $this->con = new PDO(
                "mysql:host=" . $this->servidor . ";dbname=" . $this->banco,
                $this->usuario,
                $this->senha
            );
         } catch (Exception $e) {
            echo "Erro ao conectar com o Banco de dados: " . $e->getMessage();
        }
    }

    function criarClassesConexao() {
        $conteudo = <<< EOT

        <?php
        class Conexao { 
            private \$server;
            private \$banco;
            private \$ususario;
            private \$senha;

            function __construct() {
            \$this->server = '[Informe aqui o servidor]';
            \$this->banco = '[Informe aqui o seu Banco de Dados]';
            \$this->usuario = '[Informe aqui o usuario do Banco de Dados]';
            \$this->senha = '[Informe aqui a senha do Banco de Dados]';
            }

            function cenectar(){
                try {
                    \$conn = new PDO(
                        "mysql:host=" . \$this->server . "; dbname=" . \$this->banco, \$this->usuario, \$this->senha
                    );
                    return \$conn;
                } catch (Exception \$e) {
                    echo "Erro ao conectar com o Banco de Dados: " . \$e-getMessage(); 
                }
            }
        }  
        ?>

    EOT;
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
            $geters_seters="";
            foreach ($atributos as $atributo) {
                $atributo=$atributo->Field;
                $nomeAtributos.="\tprivate \${$atributo};\n";
                $metodo=ucfirst($atributo);
                $geters_seters.="\tfunction get".$metodo."(){\n";
                $geters_seters.="\t\treturn \$this->{$atributo};\n\t}\n";
                $geters_seters.="\tfunction set".$metodo."(\${$atributo}){\n";
                $geters_seters.="\t\t\$this->{$atributo}=\${$atributo};\n\t}\n";
            }
            $nomeTabela=ucfirst($nomeTabela);
            $conteudo = <<<EOT
<?php
class {$nomeTabela} {
{$nomeAtributos}
{$geters_seters}
}
?>
EOT;
      file_put_contents("sistema/model/{$nomeTabela}.php", $conteudo);

        }
    }
}

(new Creator())->ClassesModel();
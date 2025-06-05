<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EasyMVC</title>
</head>
<body>

        <form action="creator.php" method="POST">

        <h1>EasyMVC</h1> 

        <div style="margin-bottom: 10px;">
        <label for="servidor">Servidor:</label>
        <input type="text" id="servidor" name="servidor" class="inputs" required>
        </div>

        <div style="margin-bottom: 10px;">
        <label for="banco">Banco de dados:</label>
        <input type="text" id="banco" name="banco" class="inputs" required>
        </div>

        <div style="margin-bottom: 10px;">
        <label for="usuario">Usuario:</label>
        <input type="text" id="usuario" name="usuario" class="inputs" required>
        </div>

        <div style="margin-bottom: 10px;">
        <label for="senha">Senha:</label>
        <input type="password" id="senha" name="senha" class="inputs" required>
        </div>

        <div style="margin-bottom: 10px;">
            <button type="submit">Entrar</button>
        </div>

        </form>

</body>
</html>
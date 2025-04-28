var ctxCabecalho;
var ctxLinks;
var ctxConteudo;
var ctxRodape;
var ancora = true;

function configEstiloCabecalho() {
    let bg = document.getElementById("corFundo").value || "#ffffff"; // branco
    let corFonte = document.getElementById("corFonte").value || "#000000"; // preto
    let tamFonte = document.getElementById("tamFonte").value || "16"; // 16pt
    const textoTransform = document.getElementById("textoTransformacao").value || "none";
    const tipoBorda = document.getElementById("bordaCabecalho").value || "none";
    const fonte = document.getElementById("fonteCabecalho").value || "Arial";

    ctxCabecalho = "#cabecalho {\n";
    ctxCabecalho += " background-color:" + bg + ";\n";
    ctxCabecalho += " color:" + corFonte + ";\n";
    ctxCabecalho += " font-size:" + tamFonte + "pt;\n";
    ctxCabecalho += " text-transform:" + textoTransform + ";\n";
    if (tipoBorda !== "none") {
        ctxCabecalho += " border: 2px " + tipoBorda + " #000;\n";
    }
    ctxCabecalho += " font-family: " + fonte + ";\n";
    ctxCabecalho += "}\n";
    return ctxCabecalho;
}

function configEstiloLinks() {
    let corLink = document.getElementById("corLinks").value || "#0000ff"; // azul
    let estiloLinks = document.querySelector('input[name="estiloLinks"]:checked')?.value || "1"; // sublinhado por padrão
    ctxLinks = "a {\n color:" + corLink + ";\n";
    let aux = estiloLinks === "0" ? "none" : "underline";
    ctxLinks += " text-decoration:" + aux + ";\n}\n";
    return ctxLinks;
}

function configEstiloConteudo() {
    ctxConteudo = "#conteudo {\n";
    ctxConteudo += " padding: 10px;\n";
    ctxConteudo += " font-size: 14pt;\n";
    ctxConteudo += " font-family: Arial, sans-serif;\n";
    ctxConteudo += " text-align: justify;\n";
    ctxConteudo += "}\n";
    return ctxConteudo;
}

function configHtmlLinks() {
    if (!ancora) return "<!-- Links removidos -->";
    const links = document.getElementsByName("links");
    const href = document.getElementsByName("href");
    ctxLinks = "";

    let algumLink = false;
    for (let i = 0; i < links.length; i++) {
        if (links[i].value.trim() !== "") {
            vet = href[i].value.split("\\");
            ctxLinks += '<a href="' + (vet[vet.length - 1] || "#") + '">' + links[i].value + '</a> ';
            algumLink = true;
        }
    }
    if (!algumLink) {
        return "Sem links disponíveis.";
    }
    return ctxLinks;
}

function configHTMLCabecalho() {
    let aux = document.querySelector("#textoCabecalho").value.trim();
    if (aux === "") aux = "Meu Site";
    ctxCabecalho = '<h1>' + aux + '</h1>';
    return ctxCabecalho;
}

function configHTMLConteudo() {
    let txtConteudo = document.querySelector("#txtConteudo").value.trim();
    let urlImg = document.querySelector("#img").value.trim();
    ctxConteudo = "";

    if (txtConteudo === "" && urlImg === "") {
        ctxConteudo = "Conteúdo em construção...";
    } else {
        ctxConteudo = txtConteudo;
        if (urlImg !== "") {
            ctxConteudo += '<br><img src="' + urlImg + '" style="max-width:100%;">';
        }
    }
    return ctxConteudo;
}

function gerarCodigo() {
    let codeCSS = document.querySelector("#codeCSS");
    let css = configEstiloCabecalho();
    css += configEstiloLinks();
    css += configEstiloConteudo();
    codeCSS.value = css;

    let codeHTML = document.querySelector("#codeHTML");
    ctxHTML = "<html><meta-charset='utf-8'></meta-charset>\n<head>\n" +
        "<link rel='stylesheet' href='estilo.css'>\n" +
        "<title>Minha página</title>\n" +
        "</head>\n<body>\n" +
        "<div id='cabecalho'>" + configHTMLCabecalho() + "</div>\n" +
        "<nav id='links'>" + configHtmlLinks() + "</nav>\n" +
        "<div id='conteudo'>" + configHTMLConteudo() + "</div>\n" +
        "</body>\n</html>";
    codeHTML.value = ctxHTML;

    const preview = document.getElementById('preview');
    preview.srcdoc = codeHTML.value;
}

function download(campo, arquivo) {
    if (arquivo.trim() === '')
        arquivo = document.getElementById("nomeHTML").value.trim() + ".html" || "pagina.html";
    var text = document.getElementById(campo).value;
    var blob = new Blob([text], { type: "text/plain" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = arquivo.trim();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function criarLinks() {
    const blocos = document.getElementById("blocosLinks");
    const div = document.createElement("div");
    div.className = "mb-2 d-flex gap-2 flex-wrap align-items-center";
    const link = document.createElement("input");
    link.setAttribute("type", "text");
    link.setAttribute("name", "links");
    link.setAttribute("placeholder", "Texto do link");
    link.className = "form-control w-auto";
    const href = document.createElement("input");
    href.setAttribute("type", "file");
    href.setAttribute("name", "href");
    href.className = "form-control w-auto";

    const btnRemove = document.createElement("button");
    btnRemove.setAttribute("type", "button");
    btnRemove.className = "btn btn-danger";
    btnRemove.innerText = "-";
    btnRemove.onclick = function () {
        removerLink(this);
    };

    div.appendChild(link);
    div.appendChild(href);
    div.appendChild(btnRemove);
    blocos.appendChild(div);
}

function removerLink(botao) {
    const bloco = botao.parentElement;
    bloco.remove();
}

function removeLinks(check) {
    if (check.checked) {
        txt = "hidden";
        ancora = false;
    } else {
        txt = "visible";
        ancora = true;
    }
    document.querySelector("#areaLinks").style.visibility = txt;
}

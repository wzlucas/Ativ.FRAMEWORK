var ctxCabecalho;
var ctxLinks;
var ctxConteudo;
var ctxRodape;
var ancora=true;

function configEstiloCabecalho(){
    bg=document.getElementById("corFundo").value;
    corFonte=document.getElementById("corFonte").value;
    tamFonte=document.getElementById("tamFonte").value;
    ctxCabecalho="#cabecalho{\n background-color:"+bg+";\n";
    ctxCabecalho+=" color:"+corFonte+";\n";
    ctxCabecalho+=" font-size:"+tamFonte+"pt;\n}\n";
    
    const textoTransform = document.getElementById("textoTransformacao").value;
    ctxCabecalho += " text-transform:" + textoTransform + ";\n";
    
    const tipoBorda = document.getElementById("bordaCabecalho").value;
    if (tipoBorda !== "none") {
        ctxCabecalho += " border: 2px " + tipoBorda + " #000;\n"; 
    }
    const fonte = document.getElementById("fonteCabecalho").value;
    ctxCabecalho += " font-family: " + fonte + ";\n";
    return ctxCabecalho;
}

function configEstiloLinks(){
    corLink=document.getElementById("corLinks").value;
    estiloLinks=document.querySelector('input[name="estiloLinks"]:checked').value;
    ctxLinks="a{\n color:"+corLink+";\n";
    let aux=estiloLinks=="0"?"none":"underline";
    ctxLinks+=" text-decoration:"+aux+";\n}\n";
    return ctxLinks;
}

function configHtmlLinks(){
    if(!ancora)return "";   
        links=document.getElementsByName("links");
        href=document.getElementsByName("href");
        ctxLinks="";
    for(let i=0;i<links.length;i++) {
        vet=href[i].value.split("\\");
        ctxLinks +='<a href="'+vet[vet.length-1]+'">'+links[i].value+'</a>';
    }
    return ctxLinks;
}

function configHTMLCabecalho(){
    let aux=document.querySelector("#textoCabecalho").value;
    ctxCabecalho='<h1>'+aux+'</h1>';
    return ctxCabecalho;
}

function configHTMLConteudo(){
    ctxConteudo="";
    let txtConteudo=document.querySelector("#txtConteudo").value;
    return txtConteudo;
}

function gerarCodigo(){
    //CÛdigo para CSS
    let codeCSS=document.querySelector("#codeCSS");
    let css=configEstiloCabecalho();
    css+=configEstiloLinks();
    codeCSS.value=css;

    //CÛdigo para HTML
    let codeHTML=document.querySelector("#codeHTML");
    ctxHTML="<html><meta-charset='utf-8'></meta-charset>\n<head>\n" +
        "<link rel='stylesheet' href='estilo.css'>\n"+
        "<title>Miha p√°gina</title>\n"+
        "</head>\n<body>" +
        "<div id='cabecalho'>"+configHTMLCabecalho()+"</div>\n" +
        "<nav id='links'>\n"+configHtmlLinks()+"\n</nav>\n" +
        "<div id='conteudo'>"+configHTMLConteudo()+"</div>\n" +
        "</body>\n</html>";
    codeHTML.value=ctxHTML;
}
 function download(campo,arquivo) {
    if(arquivo.trim()==='')
        arquivo=document.getElementById("nomeHTML").value+".html";
    var text = document.getElementById(campo).value;
    var blob = new Blob([text], {type: "text/plain"});
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

function removeLinks(check){
    if(check.checked){
        txt = "hidden";
        ancora=false;
    }
    else{
        txt = "visible";
        ancora=true;

    }
    document.querySelector("#areaLinks").style.visibility=txt;
}
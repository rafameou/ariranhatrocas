let voltar = document.getElementById("voltar");
let nomeprod = document.getElementById("nomeprod");
let proximo = document.getElementById("proximo");

let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");

let barrinha = document.getElementById("barrinha");
let barrinhaA = document.getElementById("barrinhaA");

let uau = document.getElementById("uau");

//sim o destaque do dia eh aleatorio, n conte pra ngm
let posi = Math.floor(Math.random() * (produtos.length - 1)) + 1; //ignorar o produto teste

let progresso = 0;
let progressoA = 5;

//carregar os produtos
function recarregar(up)
{
    //resetar o timer
    progresso = 0;
    progressoA = 5;

    switch(up)
    {
        default:
        case 0: break;
        case 1: //voltar
        {
            posi -= 1;
            if (posi < 1)
            {
                posi = produtos.length - 1;
            }
            break;
        }
        case 2: //proximo
        {
            posi += 1;
            if (posi > produtos.length - 1)
            {
                posi = 1;
            }
        }
    }

    img1.src = `estoque/imagens/${produtos[posi].index}a.jpg`;
    img2.src = `estoque/imagens/${produtos[posi].index}b.jpg`;
    nomeprod.text = produtos[posi].nome;
    nomeprod.href = `produto.html#${produtos[posi].index}`;
    uau.textContent = `Com ${produtos[posi].specs[0]}, apenas R$${produtos[posi].preco},00!`;
}

voltar.onclick = function()
{
    recarregar(1);
}

proximo.onclick = function()
{
    recarregar(2);
}

window.setInterval(function() 
{
    //bom dia
    if (img1.matches(':hover') || 
        img2.matches(':hover') || 
        nomeprod.matches(':hover') || 
        voltar.matches(':hover') ||
        proximo.matches(':hover'))
        return;

    progresso += 1;
    progressoA -= 1;
    if (progresso > 5)
    {
        recarregar(2);
    }

    //isso nao existe
    barrinha.textContent = ">>>>>>>>".repeat(progresso);
    barrinhaA.textContent = ">>>>>>>>".repeat(progressoA);
},  1000);


recarregar(0); //shhhh
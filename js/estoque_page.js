let verifique = document.querySelector("#cargando");
let caregando = document.getElementById("cargando");
let combobox = document.getElementById("sort");
let ultimo = verifique;

function imprimir_estoque()
{
    switch(combobox.value)
    {
        default:
        case "nome":
        {
            produtos.sort(function(a, b)
            {
                if(a.nome < b.nome) { return -1; }
                if(a.nome > b.nome) { return 1; }
                return 0;
            });
            break;
        }
        case "preco":
        {
            produtos.sort(function(a, b)
            {
                if(a.preco < b.preco) { return -1; }
                if(a.preco > b.preco) { return 1; }
                return 0;
            });
            break;
        }
    }

    cargando.textContent = "";
    for (let i = 1; i < produtos.length; i++)
    {
        //console.log(produtos[i].nome);
        let a = document.createElement("a");

        let imga = document.createElement("img");
        let imgb = document.createElement("img");
        imga.className = "fimg";
        imga.src = `estoque/imagens/${produtos[i].index}a.jpg`;
        imgb.className = "fimg";
        imgb.src = `estoque/imagens/${produtos[i].index}b.jpg`;

        let texto = document.createElement("text");
        texto.textContent = `> ${produtos[i].nome}`;

        texto.appendChild(document.createElement("br"));

        let preco = document.createElement("b");
        preco.textContent = `R$${produtos[i].preco},00!`;

        texto.appendChild(preco);
        texto.appendChild(document.createElement("br"));

        let specs = document.createElement("text");
        specs.textContent = `${produtos[i].specs[0]}`;

        texto.appendChild(specs);
        texto.appendChild(document.createElement("br"));

        let specscpu = document.createElement("text");
        specscpu.textContent = `${produtos[i].specs[1]}`;

        texto.appendChild(specscpu);
        texto.appendChild(document.createElement("br"));

        a.className = "fa";
        a.id = `${i}_suco`;
        a.href = `produto.html#${produtos[i].index}`;
        a.appendChild(imga);
        a.appendChild(imgb);
        a.appendChild(texto);
        ultimo.appendChild(a);
        ultimo.appendChild(document.createElement("br"));
    }
}

imprimir_estoque();
combobox.onchange = imprimir_estoque;
let i = window.location.hash.split("#")[1];

let nome = document.getElementById("nome");
let preco = document.getElementById("preco");
let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let conserv = document.getElementById("conserv");
let conservA = document.querySelector("#conserv");
let specs = document.getElementById("specs");
let specsA = document.querySelector("#specs");

nome.textContent = produtos[i].nome;
preco.textContent = `R$${produtos[i].preco},00`;
img1.src = `estoque/imagens/${produtos[i].index}a.jpg`;
img2.src = `estoque/imagens/${produtos[i].index}b.jpg`;

conserv.textContent = "";
for (let j = 0; j < produtos[i].estado.length; j++)
{
	let aaa = document.createElement("bordinha");
	aaa.textContent = produtos[i].estado[j];
	conservA.appendChild(aaa);
	conservA.appendChild(document.createElement("br"));
}

specs.textContent = "";
for (let j = 0; j < produtos[i].specs.length; j++)
{
	let aaa = document.createElement("bordinha");
	aaa.textContent = produtos[i].specs[j];
	specsA.appendChild(aaa);
	specsA.appendChild(document.createElement("br"));
}

let addcarrinho = document.getElementById("addcarrinho");

addcarrinho.onclick = function()
{
	if (sessionStorage.getItem("nome"))
	{
    	let carrinho = sessionStorage.getItem("carrinho");
    	if (!carrinho)
    	{
    		carrinho = [];
    	}
    	else
    	{
    		carrinho = JSON.parse(sessionStorage.getItem("carrinho"));
    	}
    	carrinho.push(produtos[i].index);
    	sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
	}
    document.location.href = "troca.html";
}
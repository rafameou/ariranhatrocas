let baseD = document.querySelector("#basezinha");
let base = document.getElementById("basezinha");
let objtotal = document.getElementById("total");
let cupom = document.getElementById("cupom");
let objdesconto = document.getElementById("desconto");
let comprar = document.getElementById("comprar");

let total = 0;
let desconto = 0;
let desconto_old = desconto;

function calcular_desconto(x, y) //x total, y desconto
{
	return (y * x) / 100;
}

let m = 1;

comprar.onclick = function(){
	if (!sessionStorage.getItem("nome"))
	{
		base.textContent  = "Você não ta registrado" + "!".repeat(m);
		base.className = "errinho";
		m += 1;
    	if (m > 10)
    	{
    		base.textContent += " Se registre!".repeat(m - 10);
    		if (m > 20)
    		{
    			base.textContent += " É o botão ali em cima!".repeat(m - 20);
    			comprar.textContent = "Não esse mano!";
    			if (m > 35)
    			{
    				base.textContent = "Devido a seu comportamento, o botão de finalizar a compra foi removido temporariamente.";
    				comprar.textContent = "";
    				comprar.className = "";
    			}
    		}
    	}
   		return;
	}

    let carrinho = sessionStorage.getItem("carrinho");
    if (!carrinho || JSON.parse(sessionStorage.getItem("carrinho")).length <= 0)
    {
    	base.className = "errinho";
    	base.textContent  = "Carrinho está vazio" + "!".repeat(m);
    	m += 1;
    	if (m > 10)
    	{
    		base.textContent += "TA VAZIO ".repeat(m - 10);
    		if (m > 20)
    		{
    			base.textContent += "PARA".repeat(m - 20);
    			comprar.textContent = "VAZIO";
    			if (m > 35)
    			{
    				base.textContent = "Devido a seu comportamento, o botão de finalizar a compra foi removido temporariamente.";
    				comprar.textContent = "";
    				comprar.className = "";
    			}
    		}
    	}
    	return;
    }

    carrinho = [];
    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
    base.className = "coolbackground";
    base.textContent  = "Seu pedido de compra foi gerado com sucesso!";
}

function atualizar_carrinho()
{
	/*produtos.sort(function(a, b)
    {
    	if(a.preco < b.preco) { return -1; }
        if(a.preco > b.preco) { return 1; }
        return 0;
   	});*/

   	if (!sessionStorage.getItem("nome"))
   		return;

    let carrinho = sessionStorage.getItem("carrinho");
    if (!carrinho || JSON.parse(sessionStorage.getItem("carrinho")).length <= 0)
    {
    	base.className = "errinho";
    	base.textContent  = "Carrinho está vazio.";
    	return;
    }

    carrinho = JSON.parse(sessionStorage.getItem("carrinho"));
    base.textContent  = "";
    total = 0;

    for (let i = 0; i < carrinho.length; i++)
    {
    	let fan = document.createElement("fan");

    	let add = document.createElement("b");
    	add.textContent = "+";
    	add.className = "btn"
    	add.tooltip
    	fan.appendChild(add);
    	add.onclick = function(){
    		carrinho.push(produtos[carrinho[i]].index);
    		sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
    		atualizar_carrinho();
    		return;
    	};

    	let spacingA = document.createElement("b");
    	spacingA.textContent = ` `;
    	fan.appendChild(spacingA);

    	let rem = document.createElement("b");
    	rem.textContent = "x";
    	rem.className = "btn"
    	fan.appendChild(rem);
    	rem.onclick = function(){
    		let test = false;
    		carrinho = carrinho.filter(function(value){ 
    			if (test) return true;
    			if (value == produtos[carrinho[i]].index)
    			{
    				test = true;
    				return false;
    			}
        		return true;
    		});
    		sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
    		atualizar_carrinho();
    		return;
    	};

    	let spacingB = document.createElement("b");
    	spacingB.textContent = ` `;
    	fan.appendChild(spacingB);

    	let nome = document.createElement("a");
    	nome.textContent = produtos[carrinho[i]].nome;
    	nome.href = `produto.html#${produtos[carrinho[i]].index}`;
    	nome.className = "btn"
    	fan.appendChild(nome);

    	let spacingC = document.createElement("b");
    	spacingC.textContent = ` `;
    	fan.appendChild(spacingC);

    	let preco = document.createElement("b");
    	preco.textContent = `R$${produtos[carrinho[i]].preco},00`;
    	fan.appendChild(preco);
    	total += produtos[carrinho[i]].preco;

		baseD.appendChild(fan);
    	baseD.appendChild(document.createElement("br"));
    	baseD.appendChild(document.createElement("br"));
    }


    let desc = calcular_desconto(total, desconto);
    total = total > desc ? total - desc : 0;
    objtotal.textContent = `Total: R$${total},00`;
    objdesconto.textContent = `Desconto: R$${desc},00`;
}

cupom.addEventListener("input", function (event)
{
	switch(cupom.value.toLowerCase())
	{
		default:
		{
			if (desconto != desconto_old)
			{
				desconto_old = desconto;
				desconto = 0;
				atualizar_carrinho();
			}
			return false;
		}
		case "utfpr":
		{
			desconto = 15;
			atualizar_carrinho();
			return false;
		}
		case "meow10":
		{
			desconto = 10;
			atualizar_carrinho();
			return false;
		}
		case "linux":
		{
			desconto = 100;
			atualizar_carrinho();
			return false;
		}
	}
}, false);

atualizar_carrinho();
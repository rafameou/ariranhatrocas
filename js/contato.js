let nome = document.getElementById("nome");
let email = document.getElementById("email");
let assunto = document.getElementById("assunto");
let mensagem = document.getElementById("mensagem");

let errinho = document.getElementById("errinho");
let form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", function (event) 
{
  if (nome.value.length === 0 || email.value.length === 0 || assunto.value.length === 0 || mensagem.value.length === 0) 
  {
  	errinho.className = "errinho";
  	errinho.textContent = "Todos os campos precisam ser preenchidos.";
    event.preventDefault();
    return false;
  }

  //sim, isso é como vc (nao) valida um email
  if (!email.value.includes("@") || !email.value.includes("."))
  {
  	errinho.className = "errinho";
  	errinho.textContent = "O e-mail não é válido.";
    event.preventDefault();
    return false;
  }

}, false);
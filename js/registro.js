let nome = document.getElementById("nome");
let email = document.getElementById("email");
let cpf = document.getElementById("cpf");
let cep = document.getElementById("cep");
let rua = document.getElementById("rua");
let numero = document.getElementById("numero");
let bairro = document.getElementById("bairro");
let cidade = document.getElementById("cidade");
let uf = document.getElementById("uf");

let errinho = document.getElementById("errinho");
let form = document.getElementsByTagName("form")[0];

cep.addEventListener("input", function (event)
{
  function falhou()
  {
    rua.disabled = false;
    bairro.disabled = false;
    cidade.disabled = false;
    uf.disabled = false;
  }

  if (cep.value.length === 8 || cep.value.length === 9) //gambiarra, caso tenha - no meio vai ser 9
  {
    //assaltado do exercicio q o prof fez em sala, ops
    let XHR = new XMLHttpRequest();
    /*
    * muito obrigado a pessoas incriveis que fizeram
    * essa api do viacep, principalmente pelo fato de
    * aceitarem ceps tanto apenas numero quanto com -
    * no meio, assim nao preciso fazer uma gambiarra
    * gigante por motivo nenhum, vou mandar um panetone
    * via sedex
    */
    XHR.open("GET", `https://viacep.com.br/ws/${cep.value}/json`, true);
    XHR.onload = function(XHREvent) 
    { 
       let dados = JSON.parse(XHR.responseText);
       if (dados.logradouro === undefined)
       {
        falhou();
        return;
       }
       rua.value = dados.logradouro; //"logradouro"?
       rua.disabled = true;
       bairro.value = dados.bairro;
       bairro.disabled = true;
       cidade.value = dados.localidade;
       cidade.disabled = true;
       uf.value = dados.uf;
       uf.disabled = true;
    }
    /*
    * por algum motivo o firefox demora 3 dias
    * para processar o request, porem n to com
    * vontade de ir atras para descobrir o porque,
    * vou ter que ficar testando pelo vivaldi
    * no momento
    */
    XHR.send();
  }
  else
  {
    falhou();
  }
}, false);

form.addEventListener("submit", function (event) 
{
  let deuruim = false;

  function checar(item)
  {
    if (item.value.length === 0)
    {
      deuruim = true;
    }
  }

  function validarcpf(ocpf)
  {
    /*
    * o input n vai deixar botar ponto,
    * ent vou acreditar que ele vai fazer um bom trabalho
                                                        (eu espero) */
    if (ocpf.length != 11)
      return false;

    //computador so tem cpu pra rodar loop
    for (let i = 0; i < 10; i++)
      if (ocpf == `${i}`.repeat(11))
        return false;

    /*  
    *   obrigado ao UNICO site que tem uma explicacao de como validar,
    *   sem apenas jogar o codigo pronto na sua cara como se vc fosse
    *   um profissional que precisa validar um cpf por algum motivo
    *   https://dicasdeprogramacao.com.br/algoritmo-para-validar-cpf/ 
    */

    ocpf = ocpf.split("");
    let helperA = 10;
    let helperB = 0;
    for (let i = 0; i < 9; i++) 
    {
        helperB += ocpf[i] * helperA;
        helperA -= 1;
    }
    helperB *= 10;
    helperB = helperB % 11;

    if (helperB != ocpf[9])
      return false;

    helperA = 11;
    helperB = 0;
    for (let i = 0; i < 10; i++) 
    {
        helperB += ocpf[i] * helperA;
        helperA -= 1;
    }

    helperB *= 10;
    helperB = helperB % 11;

    if (helperB != ocpf[10])
      return false;

    return true;
  }

  function salvar(item)
  {
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
    sessionStorage.setItem(item.id, item.value);
  }

  //imAgiNA sE TiVeSSe UmA FoRmA mElHoR De FaZeR IsSo
  checar(nome);
  checar(email);
  checar(cpf);
  checar(cep);
  checar(rua);
  checar(bairro);
  checar(cidade);
  checar(uf);

  if (deuruim)
  {
    errinho.className = "errinho";
    errinho.textContent = "Todos os campos precisam ser preenchidos.";
    event.preventDefault();
    return false;
  }

  if (!validarcpf(cpf.value))
  {
    errinho.className = "errinho";
    errinho.textContent = "CPF Inválido.";
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

  /*
  * ate parece que nao teve uma aula sobre class
  * TODO: mudar isso aq pra classes
  */
  salvar(nome);
  salvar(email);
  salvar(cpf);
  salvar(cep);
  salvar(rua);
  salvar(bairro);
  salvar(cidade);
  salvar(uf);

  errinho.className = "coolbackgroundreversed";
  errinho.textContent = `Registrado/Logado com sucesso! Bem-Vindo ${nome.value}!`;
  event.preventDefault();
  return false;
}, false);
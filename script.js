/*Tela 1*/

let quizzes = [];
let idQuizzSelecionado = '';

function carregarQuizzes (){

    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(quizzesChegaram);
}

carregarQuizzes();

function quizzesChegaram(resposta){
    quizzes = resposta.data;
    renderizarQuizzes();
}

function renderizarQuizzes (){

    const todosQuizzes = document.querySelector(".quizzes");

    for(let i = 0; i < quizzes.length; i++){
        todosQuizzes.innerHTML += `
    
        <div "data-identifier="quizz-card" class="quizz" onclick="selecionarQuizz(${quizzes[i].id})">
            <img src="${quizzes[i].image}">
            <p>${quizzes[i].title}</p>
        </div>
        
        `
        
    }

}

function selecionarQuizz(id){
 console.log(id)
}




/*Fim da tela 1*/

/*tela 2
/*Tela 2*/

/*Fim da tela 2*/


/*Tela 3*/
function criarQuizz(){
    const tela_1 = document.querySelector('.tela-1');
    const tela_3 = document.querySelector('.tela-3');
    tela_1.classList.add('escondido');
    tela_3.classList.remove('escondido');
    tela_3.classList.add('display-tela-3');
}

function validarInformacoesQuizz(){
    const titulo = document.getElementById('tituloCriarQuizz').value;
    let tituloControle = false;
    const url = document.getElementById('urlCriarQuizz');
    let urlControle = false;
    const qtdePerguntas = document.getElementById('qtdePerguntasCriarQuizz').value;
    let qtdePerguntasControle = false;
    const qtdeNiveis = document.getElementById('qtdeNiveisCriarQuizz').value;
    let qtdeNiveisControle = false;
    const avisos = document.querySelectorAll('alerta');

    if (avisos.length > 0){
        for (let  i = 0; i < avisos.length; i++){
            avisos[i].remove();
        }
    }

    tituloControle = validarTitulo(titulo);
    urlControle = validarUrl(url);
    qtdePerguntasControle = validarPerguntas(qtdePerguntas);
    qtdeNiveisControle = validarNiveis(qtdeNiveis);
    
    if (tituloControle && urlControle && qtdePerguntasControle && qtdeNiveisControle){
        criarPerguntasQuizz();
    }
}

function validarTitulo(titulo){
    const aviso = document.createElement('alerta');
    if (titulo.length >= 20 && titulo.length <= 65){
        return true;
    }
    else{
        aviso.innerHTML = 'O título do quizz deve ter entre 20 e 65 letras'
        document.getElementById('tituloCriarQuizz').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarUrl(url){
    const aviso = document.createElement('alerta');
    if (url.checkValidity() && url.value !== ''){
        return true;
    }
    else{
        aviso.innerHTML = 'O valor informado não é uma URL válida'
        document.getElementById('urlCriarQuizz').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarPerguntas(qtdePerguntas){
    const aviso = document.createElement('alerta');
    if (qtdePerguntas >= 3){
        return true;
    }
    else{
        aviso.innerHTML = 'O quizz deve ter no mínimo 3 perguntas'
        document.getElementById('qtdePerguntasCriarQuizz').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarNiveis(qtdeNiveis){
    const aviso = document.createElement('alerta');
    if (qtdeNiveis >= 2){
        return true;
    }
    else{
        aviso.innerHTML = 'O quizz deve ter no mínimo 2 níveis'
        document.getElementById('qtdeNiveisCriarQuizz').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function criarPerguntasQuizz(){
    const tela_3_1 = document.querySelector('.tela-3-1');
    const tela_3_2 = document.querySelector('.tela-3-2');
    tela_3_1.classList.remove('display-tela-3');
    tela_3_1.classList.add('escondido');
    tela_3_2.classList.remove('escondido');
    tela_3_2.classList.add('display-tela-3');
    const qtdePerguntas = document.getElementById('qtdePerguntasCriarQuizz').value;
    if (qtdePerguntas > 3){
        for (let i = 0; i < qtdePerguntas - 3; i++){
            criarElementoPergunta((i + 4));
        }
    }

}

function criarElementoPergunta(numeroPerguntas){
    const perguntaMinimizada = document.createElement('div');
    const pergunta = document.createElement('div');
    perguntaMinimizada.classList.add(`pergunta-minimizada`);
    perguntaMinimizada.setAttribute('onclik', 'selecionarPerguntaCriacaoQuizz()');
    pergunta.classList.add('pergunta', 'escondido');
    perguntaMinimizada.innerHTML = `<h1>Pergunta ${numeroPerguntas}</h1>
    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.1594 15.4969L19.6038 14.0594C19.8295 13.8348 20.2222 13.992 20.2222 14.3155V20.8471C20.2222 22.0375 19.2517 23.0034 18.0556 23.0034H2.16667C0.970486 23.0034 0 22.0375 0 20.8471V5.03462C0 3.84419 0.970486 2.87837 2.16667 2.87837H14.5122C14.8326 2.87837 14.9951 3.2647 14.7694 3.4938L13.325 4.9313C13.2573 4.99868 13.167 5.03462 13.0677 5.03462H2.16667V20.8471H18.0556V15.7485C18.0556 15.6542 18.0917 15.5643 18.1594 15.4969ZM25.2281 6.43169L13.3747 18.2282L9.2941 18.6774C8.11146 18.8077 7.10486 17.8149 7.23576 16.629L7.68715 12.568L19.5406 0.771533C20.5743 -0.257178 22.2444 -0.257178 23.2736 0.771533L25.2236 2.71216C26.2573 3.74087 26.2573 5.40747 25.2281 6.43169ZM20.7684 7.81978L18.1458 5.20981L9.75903 13.5608L9.42951 16.4942L12.3771 16.1663L20.7684 7.81978ZM23.6934 4.2395L21.7434 2.29888C21.5583 2.1147 21.2559 2.1147 21.0753 2.29888L19.6806 3.68696L22.3031 6.29692L23.6979 4.90884C23.8785 4.72017 23.8785 4.42368 23.6934 4.2395Z" fill="black"/>
    </svg>`;
    pergunta.innerHTML = `<h1>Pergunta ${numeroPerguntas}</h1>
    <input type="text" placeholder="Texto da pergunta">
    <input type="text" placeholder="Cor de fundo da pergunta">
    <h1>Resposta correta</h1>
    <input type="text" placeholder="Resposta correta">
    <input type="url" placeholder="URL da imagem">
    <h1>Respostas incorretas</h1>
    <div class="resposta-incorreta">
        <input type="text" placeholder="Resposta incorreta 1">
        <input type="url" placeholder="URL da imagem 1">
    </div>
    <div class="resposta-incorreta">
        <input type="text" placeholder="Resposta incorreta 2">
        <input type="url" placeholder="URL da imagem 2">
    </div>
    <div class="resposta-incorreta">
        <input type="text" placeholder="Resposta incorreta 3">
        <input type="url" placeholder="URL da imagem 3">
    </div>`;
    let local = document.querySelector('.perguntas-criar-quizz');
    local.insertAdjacentElement('beforeend', perguntaMinimizada);
    local = document.querySelector('.perguntas-criar-quizz');
    local.insertAdjacentElement('beforeend', pergunta);
}

// Fim da Tela 3
/*Tela 1*/

let quizzes = [];
let idQuizzSelecionado = '';

function carregarQuizzes() {

    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(quizzesChegaram);
}

carregarQuizzes();

function quizzesChegaram(resposta) {
    quizzes = resposta.data;
    renderizarQuizzes();
}

function renderizarQuizzes() {

    const todosQuizzes = document.querySelector(".quizzes");

    for (let i = 0; i < quizzes.length; i++) {
        todosQuizzes.innerHTML += `
    
        <div "data-identifier="quizz-card" class="quizz" onclick="selecionarQuizz(${quizzes[i].id})">
            <img src="${quizzes[i].image}">
            <p>${quizzes[i].title}</p>
        </div>
        
        `

    }

}

/*Fim da tela 1*/


/*--------------------------------------------------------------------------Tela 2------------------------------------------------------------------------------*/
let conteudoPagina2;
let Quizz;

function selecionarQuizz(id) {
    const pegarQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    pegarQuizz.then(quizzCerto);
    pegarQuizz.catch(quizzError);
    console.log();
}

function quizzCerto(valor) {
    conteudoPagina2 = document.querySelector('.conteudoTela2')
    Quizz = valor.data;
    if (Quizz.questions.length === 2); {
        conteudoPagina2.innerHTML += `
        <div class="topoTela2 ">
            <img src="img/Os-Simpsons.jpg">
        </div>
        <div class="conteudoQuizz">
            <div class="tituloperguntaQuizz">
                <h2>Isso é uma pergunta teste?</h2>
            </div>
            <div class="containerFotoTextoQuizz">
                <div class="foto-texto">
                    <img src="img/Os-Simpsons.jpg">
                    <h2>gato</h2>
                </div>
                <div class="foto-texto">
                    <img src="img/Os-Simpsons.jpg">
                    <h2>boi</h2>
                </div>
        </div>
            
            `
        const primeiratela = document.querySelector('.tela-1');
        const segundatela = document.querySelector('.conteudoTela2');
        primeiratela.classList.add('escondido');
        segundatela.classList.remove('escondido');
        segundatela.classList.add('tela-2');
    }
    /*  conteudoPagina2 = document.querySelector('.conteudoTela2')
            
        const primeiratela = document.querySelector('.tela-1');
        const segundatela = document.querySelector('.conteudoTela2');
        primeiratela.classList.add('escondido');
        segundatela.classList.remove('escondido');
        segundatela.classList.add('tela-2'); */
    console.log(valor.data);
}

function quizzError(valor) {
    console.log('deu ruim');
}

/* function telaQuizz(){

    const primeiratela = document.querySelector('.tela-1');
    const segundatela = document.querySelector('.tela-2');
    primeiratela.classList.add('escondido');
    segundatela.classList.remove('escondido');
    segundatela.classList.add('display-tela-3');
} */

/*----------------------------------------------------------------------Fim da tela 2--------------------------------------------------------------------------*/


/*Tela 3*/
function criarQuizz() {
    const tela_1 = document.querySelector('.tela-1');
    const tela_3 = document.querySelector('.tela-3');
    tela_1.classList.toggle('escondido');
    tela_3.classList.toggle('escondido');
    tela_3.classList.toggle('display-tela-3');
}

function validarInformacoesQuizz() {
    const titulo = document.getElementById('tituloCriarQuizz').value;
    let tituloControle = false;
    const url = document.getElementById('urlCriarQuizz');
    let urlControle = false;
    const qtdePerguntas = document.getElementById('qtdePerguntasCriarQuizz').value;
    let qtdePerguntasControle = false;
    const qtdeNiveis = document.getElementById('qtdeNiveisCriarQuizz').value;
    let qtdeNiveisControle = false;
    const avisos = document.querySelector('.tela-3-1').querySelectorAll('alerta');

    if (avisos.length > 0) {
        for (let i = 0; i < avisos.length; i++) {
            avisos[i].remove();
        }
    }

    tituloControle = validarTitulo(titulo);
    urlControle = validarUrl(url);
    qtdePerguntasControle = validarPerguntas(qtdePerguntas);
    qtdeNiveisControle = validarNiveis(qtdeNiveis);

    if (tituloControle && urlControle && qtdePerguntasControle && qtdeNiveisControle) {
        criarPerguntasQuizz();
    }
}

function validarTitulo(titulo) {
    const aviso = document.createElement('alerta');
    if (titulo.length >= 20 && titulo.length <= 65) {
        return true;
    }
    else {
        aviso.innerHTML = 'O título do quizz deve ter entre 20 e 65 letras'
        document.getElementById('tituloCriarQuizz').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarUrl(url) {
    const aviso = document.createElement('alerta');
    if (url.checkValidity() && url.value !== '') {
        return true;
    }
    else {
        aviso.innerHTML = 'O valor informado não é uma URL válida'
        document.getElementById('urlCriarQuizz').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarPerguntas(qtdePerguntas) {
    const aviso = document.createElement('alerta');
    if (qtdePerguntas >= 3) {
        return true;
    }
    else {
        aviso.innerHTML = 'O quizz deve ter no mínimo 3 perguntas'
        document.getElementById('qtdePerguntasCriarQuizz').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarNiveis(qtdeNiveis) {
    const aviso = document.createElement('alerta');
    if (qtdeNiveis >= 2) {
        return true;
    }
    else {
        aviso.innerHTML = 'O quizz deve ter no mínimo 2 níveis'
        document.getElementById('qtdeNiveisCriarQuizz').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function criarPerguntasQuizz() {
    const tela_3_1 = document.querySelector('.tela-3-1');
    const tela_3_2 = document.querySelector('.tela-3-2');
    tela_3_1.classList.toggle('display-tela-3');
    tela_3_1.classList.toggle('escondido');
    tela_3_2.classList.toggle('escondido');
    tela_3_2.classList.toggle('display-tela-3');
    const qtdePerguntas = document.getElementById('qtdePerguntasCriarQuizz').value;
    if (qtdePerguntas > 3) {
        for (let i = 0; i < qtdePerguntas - 3; i++) {
            criarElementoPergunta((i + 4));
        }
    }

}

function criarElementoPergunta(numeroPergunta) {
    const perguntaToda = document.createElement('div');
    perguntaToda.setAttribute('onclick', 'selecionarPerguntaCriacaoQuizz(this)');
    const perguntaMinimizada = document.createElement('div');
    const pergunta = document.createElement('div');
    perguntaMinimizada.classList.add('pergunta-minimizada', 'display-pergunta-minimizada');
    pergunta.classList.add('pergunta', 'escondido');
    perguntaMinimizada.innerHTML = `<h2>Pergunta ${numeroPergunta}</h2>
    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.1594 15.4969L19.6038 14.0594C19.8295 13.8348 20.2222 13.992 20.2222 14.3155V20.8471C20.2222 22.0375 19.2517 23.0034 18.0556 23.0034H2.16667C0.970486 23.0034 0 22.0375 0 20.8471V5.03462C0 3.84419 0.970486 2.87837 2.16667 2.87837H14.5122C14.8326 2.87837 14.9951 3.2647 14.7694 3.4938L13.325 4.9313C13.2573 4.99868 13.167 5.03462 13.0677 5.03462H2.16667V20.8471H18.0556V15.7485C18.0556 15.6542 18.0917 15.5643 18.1594 15.4969ZM25.2281 6.43169L13.3747 18.2282L9.2941 18.6774C8.11146 18.8077 7.10486 17.8149 7.23576 16.629L7.68715 12.568L19.5406 0.771533C20.5743 -0.257178 22.2444 -0.257178 23.2736 0.771533L25.2236 2.71216C26.2573 3.74087 26.2573 5.40747 25.2281 6.43169ZM20.7684 7.81978L18.1458 5.20981L9.75903 13.5608L9.42951 16.4942L12.3771 16.1663L20.7684 7.81978ZM23.6934 4.2395L21.7434 2.29888C21.5583 2.1147 21.2559 2.1147 21.0753 2.29888L19.6806 3.68696L22.3031 6.29692L23.6979 4.90884C23.8785 4.72017 23.8785 4.42368 23.6934 4.2395Z" fill="black"/>
    </svg>`;
    pergunta.innerHTML = `<h2>Pergunta ${numeroPergunta}</h2>
    <input type="text" placeholder="Texto da pergunta" class="texto-pergunta">
    <div class="escolher-cor">
        <label for="color">Cor de fundo da pergunta:</label>
        <input type="color" name="color">
    </div>
    <h2>Resposta correta</h2>
    <input type="text" placeholder="Resposta correta" class="resposta-correta">
    <input type="url" class="url-correta" placeholder="URL da imagem">
    <h2>Respostas incorretas</h2>
    <div class="respostas-incorretas display-tela-3" class="resposta-incorreta">
        <input type="text" placeholder="Resposta incorreta 1">
        <input type="url" class="url" placeholder="URL da imagem 1">
    </div>
    <div class="respostas-incorretas display-tela-3" class="resposta-incorreta">
        <input type="text" placeholder="Resposta incorreta 2">
        <input type="url" class="url" placeholder="URL da imagem 2">
    </div>
    <div class="respostas-incorretas display-tela-3" class="resposta-incorreta">
        <input type="text" placeholder="Resposta incorreta 3">
        <input type="url" class="url" placeholder="URL da imagem 3">
    </div>`;
    perguntaToda.appendChild(perguntaMinimizada);
    perguntaToda.appendChild(pergunta);
    const local = document.querySelector('.perguntas-criar-quizz');
    local.insertAdjacentElement('beforeend', perguntaToda);
}

function selecionarPerguntaCriacaoQuizz(perguntaClicada) {
    const perguntaSelecionada = document.querySelector('.pergunta-selecionada');
    if (perguntaClicada === perguntaSelecionada) {
        return;
    }
    togglePergunta(perguntaSelecionada);
    togglePergunta(perguntaClicada);
}

function togglePergunta(pergunta) {
    pergunta.querySelector('.pergunta-minimizada').classList.toggle('escondido');
    pergunta.querySelector('.pergunta-minimizada').classList.toggle('display-pergunta-minimizada');
    pergunta.querySelector('.pergunta').classList.toggle('display-tela-3');
    pergunta.querySelector('.pergunta').classList.toggle('escondido');
    pergunta.classList.toggle('pergunta-selecionada');
}

function validarPerguntasQuizz() {
    const qtdePerguntas = document.getElementById('qtdePerguntasCriarQuizz').value;
    const perguntas = document.querySelectorAll('.tela-3-2 .pergunta');
    let perguntasBoolean = false;
    for (let i = 0; i < perguntas.length; i++) {
        perguntasBoolean = validarPerguntaQuizz(perguntas[i]);
        if (!perguntasBoolean) {
            alert('Há algo de errado em uma de suas perguntas, por favor verifique e corrija o erro!');
            return;
        }
    }
    criarNiveisQuizz();
}

function validarPerguntaQuizz(pergunta) {
    let textoPerguntaControle = false;
    let respostaCorretaControle = false;
    let respostaIncorretaControle = [false, false, false];
    let urlControle = [false, false, false, false];
    const urlTodas = pergunta.querySelectorAll('.url');
    const respostasIncorretasTodas = pergunta.querySelectorAll('.resposta-incorreta');
    const avisos = document.querySelector('.tela-3-2').querySelectorAll('alerta');
    if (avisos.length > 0) {
        for (let i = 0; i < avisos.length; i++) {
            avisos[i].remove();
        }
    }
    textoPerguntaControle = validarTextoPergunta(pergunta);
    respostaCorretaControle = validarRepostaCorretaPergunta(pergunta);
    for (let i = 0; i < respostaIncorretaControle.length; i++) {
        respostaIncorretaControle[i] = validarRespostaIncorretaPergunta(respostasIncorretasTodas[i]);
    }
    for (let i = 0; i < urlControle.length; i++) {
        urlControle[i] = validarUrlPergunta(urlTodas[i]);
    }
    if (!textoPerguntaControle || !(respostaCorretaControle && urlControle[0])) {
        alert('Você deve inserir uma resposta correta válida e um texto para cada pergunta');
        return false;
    }
    else if (!(respostaIncorretaControle[0] && urlControle[1])) {
        alert('Você deve inserir pelo menos uma resposta incorreta em cada pergunta');
        return false;
    }
    else {
        for (let i = 1, j = 2; i < respostaIncorretaControle.length; i++, j++) {
            if ((!respostaIncorretaControle[i] && urlControle[j]) || (respostaIncorretaControle[i] && !urlControle[j])) {
                return false;
            }
        }
        console.log(`passou por pergunta`);
        return true;
    }
}

function validarTextoPergunta(pergunta) {
    const aviso = document.createElement('alerta');
    if (pergunta.querySelector('.texto-pergunta').value.length >= 20) {
        return true;
    }
    else {
        aviso.innerHTML = 'O texto da pergunta deve conter pelo menos 20 letras';
        pergunta.querySelector('.texto-pergunta').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarRepostaCorretaPergunta(pergunta) {
    const aviso = document.createElement('alerta');
    if (pergunta.querySelector('.resposta-correta').value !== '') {
        return true;
    }
    else {
        aviso.innerHTML = 'A pergunta deve ter uma resposta correta válida';
        pergunta.querySelector('.resposta-correta').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarRespostaIncorretaPergunta(respostaIncorreta) {
    if (respostaIncorreta.value !== '') {
        return true;
    }
    else {
        return false;
    }
}

function validarUrlPergunta(url) {
    if (url.checkValidity() && url.value !== '') {
        return true;
    }
    else {
        return false;
    }
}

function criarNiveisQuizz() {
    const tela_3_2 = document.querySelector('.tela-3-2');
    const tela_3_3 = document.querySelector('.tela-3-3');
    tela_3_2.classList.toggle('escondido');
    tela_3_2.classList.toggle('display-tela-3');
    tela_3_3.classList.toggle('display-tela-3');
    tela_3_3.classList.toggle('escondido');
    const qtdeNiveis = document.getElementById('qtdeNiveisCriarQuizz').value;
    if (qtdeNiveis > 2) {
        for (let i = 0; i < qtdeNiveis - 2; i++) {
            criarElementoNivel(i + 3);
        }
    }
}

function criarElementoNivel(numeroNivel) {
    const nivelTodo = document.createElement('div');
    nivelTodo.setAttribute('onclick', 'selecionarNivelCriacaoQuizz(this)');
    const nivelMinimizado = document.createElement('div');
    nivelMinimizado.classList.add('nivel-minimizado', 'display-nivel-minimizado');
    nivelMinimizado.innerHTML = `<h2>Nível ${numeroNivel}</h2>
    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.1594 15.4969L19.6038 14.0594C19.8295 13.8348 20.2222 13.992 20.2222 14.3155V20.8471C20.2222 22.0375 19.2517 23.0034 18.0556 23.0034H2.16667C0.970486 23.0034 0 22.0375 0 20.8471V5.03462C0 3.84419 0.970486 2.87837 2.16667 2.87837H14.5122C14.8326 2.87837 14.9951 3.2647 14.7694 3.4938L13.325 4.9313C13.2573 4.99868 13.167 5.03462 13.0677 5.03462H2.16667V20.8471H18.0556V15.7485C18.0556 15.6542 18.0917 15.5643 18.1594 15.4969ZM25.2281 6.43169L13.3747 18.2282L9.2941 18.6774C8.11146 18.8077 7.10486 17.8149 7.23576 16.629L7.68715 12.568L19.5406 0.771533C20.5743 -0.257178 22.2444 -0.257178 23.2736 0.771533L25.2236 2.71216C26.2573 3.74087 26.2573 5.40747 25.2281 6.43169ZM20.7684 7.81978L18.1458 5.20981L9.75903 13.5608L9.42951 16.4942L12.3771 16.1663L20.7684 7.81978ZM23.6934 4.2395L21.7434 2.29888C21.5583 2.1147 21.2559 2.1147 21.0753 2.29888L19.6806 3.68696L22.3031 6.29692L23.6979 4.90884C23.8785 4.72017 23.8785 4.42368 23.6934 4.2395Z" fill="black"/>
    </svg>`;
    const nivel = document.createElement('div');
    nivel.classList.add('nivel', 'escondido');
    nivel.innerHTML = `<h2>Nível ${numeroNivel}</h2>
    <input type="text" placeholder="Título do nível" class="titulo-nivel">
    <input type="number" min="0" max="100" placeholder="% de acerto mínimo" class="acerto-nivel">
    <input type="url" placeholder="URL da imagem do nível" class="url-nivel">
    <textarea cols="30" rows="10" placeholder="Descrição do nível" class="descricao-nivel"></textarea>`;
    nivelTodo.appendChild(nivelMinimizado);
    nivelTodo.appendChild(nivel);
    const local = document.querySelector('.niveis-criar-quizz');
    local.insertAdjacentElement('beforeend', nivelTodo);
}

function selecionarNivelCriacaoQuizz(nivelClicado) {
    const nivelSelecionado = document.querySelector('.nivel-selecionado');
    if (nivelClicado === nivelSelecionado) {
        return;
    }
    toggleNivel(nivelSelecionado);
    toggleNivel(nivelClicado);
}

function toggleNivel(nivel) {
    nivel.querySelector('.nivel-minimizado').classList.toggle('escondido');
    nivel.querySelector('.nivel-minimizado').classList.toggle('display-nivel-minimizado');
    nivel.querySelector('.nivel').classList.toggle('display-tela-3');
    nivel.querySelector('.nivel').classList.toggle('escondido');
    nivel.classList.toggle('nivel-selecionado');
}

let acertoControle0 = false;

function validarNiveisQuizz() {
    const qtdeNiveis = document.getElementById('qtdeNiveisCriarQuizz').value;
    const niveis = document.querySelector('.tela-3-3').querySelectorAll('.nivel');
    let niveisBoolean = false;
    for (let i = 0; i < niveis.length; i++) {
        niveisBoolean = validarNivelQuizz(niveis[i]);
        if (!niveisBoolean) {
            alert('Há algo de errado em um de seus níveis, por favor verifique e corrija o erro!');
            return;
        }
    }
    if (!acertoControle0) {
        alert('Pelo menos um dos níveis tem que ter um acerto mínimo de 0%');
        return;
    }
    finalizarQuizz();
}

function validarNivelQuizz(nivel) {
    let tituloControle = false;
    let acertoControle = false;
    let urlControle = false;
    let descricaoControle = false;
    const avisos = document.querySelector('.tela-3-3').querySelectorAll('alerta');
    if (avisos.length > 0) {
        for (let i = 0; i < avisos.length; i++) {
            avisos[i].remove();
        }
    }
    tituloControle = validarTituloNivel(nivel);
    acertoControle = validarAcertoNivel(nivel);
    urlControle = validarUrlNivel(nivel);
    descricaoControle = validarDescricaoNivel(nivel);
    return (tituloControle && acertoControle && urlControle && descricaoControle);
}

function validarTituloNivel(nivel) {
    const aviso = document.createElement('alerta');
    if (nivel.querySelector('.titulo-nivel').value.length >= 10) {
        return true;
    }
    else {
        aviso.innerHTML = 'O título do nível tem que conter pelo menos 10 caracteres';
        nivel.querySelector('.titulo-nivel').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarAcertoNivel(nivel) {
    const aviso = document.createElement('alerta');
    if (nivel.querySelector('.acerto-nivel').checkValidity() && nivel.querySelector('.acerto-nivel').value !== '') {
        if (nivel.querySelector('.acerto-nivel').value === '0') {
            acertoControle0 = true;
        }
        return true;
    }
    else {
        aviso.innerHTML = 'O acerto mínimo do nível deve conter um número de 0 a 100';
        nivel.querySelector('.acerto-nivel').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarUrlNivel(nivel) {
    const aviso = document.createElement('alerta');
    if (nivel.querySelector('.url-nivel').checkValidity() && nivel.querySelector('.url-nivel').value !== '') {
        return true;
    }
    else {
        aviso.innerHTML = 'Você deve inserir uma URL válida'
        nivel.querySelector('.url-nivel').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function validarDescricaoNivel(nivel) {
    const aviso = document.createElement('alerta');
    if (nivel.querySelector('textarea').value.length >= 30) {
        return true;
    }
    else {
        aviso.innerHTML = 'A descrição do nível deve ter pelo menos 30 caracteres'
        nivel.querySelector('textarea').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function finalizarQuizz() {
    const quizz = {
        title: document.getElementById('tituloCriarQuizz').value,
        image: document.getElementById('urlCriarQuizz').value,
        questions: [],
        levels: []
    };
    const perguntas = document.querySelector('.tela-3-2').querySelectorAll('.pergunta');
    for (let i = 0; i < perguntas.length; i++) {
        let pergunta = {
            title: perguntas[i].querySelector('.texto-pergunta').value,
            color: perguntas[i].querySelector('.escolher-cor >:nth-child(2)').value,
            answers: []
        };
        let respostaCorreta = {
            text: perguntas[i].querySelector('.resposta-correta').value,
            image: perguntas[i].querySelector('.url-correta').value,
            isCorrectAnswer: true
        };
        pergunta.answers.push(respostaCorreta);
        let respostasIncorretas = perguntas[i].querySelectorAll('.respostas-incorretas');
        for (let j = 0; j < respostasIncorretas.length; i++) {
            let respostaIncorreta = {
                text: respostasIncorretas[j].querySelector('.resposta-incorreta').value,
                image: respostasIncorretas[j].querySelector('.url').value,
                isCorrectAnswer: false
            };
            pergunta.answers.push(respostaIncorreta);
        }
        quizz.questions.push(pergunta);
    }
    const niveis = document.querySelector('.tela-3-3').querySelectorAll('.nivel');
    for (let i = 0; i < niveis.length; i++) {
        let nivel = {
            title: niveis[i].querySelector('.titulo-nivel').value,
            image: niveis[i].querySelector('.url-nivel').value,
            text: niveis[i].querySelector('.descricao-nivel').value,
            minValue: Number(niveis[i].querySelector('.acerto-nivel').value)
        };
        quizz.levels.push(nivel);
    }
    const post = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', quizz);
    post.then(telaFinalCriacaoQuizz);
    post.catch(erroEnviarQuizzCriacao);
}

function erroEnviarQuizzCriacao(promessa) {
    alert('Houve um erro no envio do Quizz, tente novamente');
    return;
}

function telaFinalCriacaoQuizz(quizz) {

}
// Fim da Tela 3
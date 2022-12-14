/*Tela 1*/

carregarQuizzes();

let quizzes = [];

function carregarQuizzes() {
    toggleTela1();
    toggleCarregamento('Carregando quizzes...');
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promessa.then(quizzesChegaram);
}

function quizzesChegaram(resposta) {
    quizzes = resposta.data;
    renderizarQuizzes();
}

function renderizarQuizzes() {

    const todosQuizzes = document.querySelector(".quizzes");
    const boxCriarQuizzes = document.querySelector(".criar-quizz");
    const seusQuizzes = document.querySelector(".seus-quizzes");



    for (let i = 0; i < quizzes.length; i++) {

        let id = localStorage.getItem(quizzes[i].id);

        if (id !== null) {
            boxCriarQuizzes.classList.add("escondido");
            seusQuizzes.classList.remove("escondido");
            seusQuizzes.classList.add('seus-quizzes-display');

            const listaQuizzesUser = document.querySelector(".lista-quizzes-usuario");
            listaQuizzesUser.innerHTML += `
            
            <div "data-identifier="quizz-card" class="quizz" onclick="selecionarQuizz(${quizzes[i].id}, ${toggleTela1})">
                <img src="${quizzes[i].image}">
                <p>${quizzes[i].title}</p>
            </div>
            
            `
        }

        if (id === null) {

            todosQuizzes.innerHTML += `
    
            <div "data-identifier="quizz-card" class="quizz" onclick="selecionarQuizz(${quizzes[i].id}, ${toggleTela1})">
                <img src="${quizzes[i].image}">
                <p>${quizzes[i].title}</p>
            </div>
            
            `
        }


    }
    toggleCarregamento(null);
    toggleTela1();
}

/*Fim da tela 1*/


/*--------------------------------------------------------------------------Tela 2------------------------------------------------------------------------------*/
let conteudoPagina2;
let Quizz;
let caixa = [];
let contador = 0;
let quizzid;

function selecionarQuizz(id, telaDesrenderizar) {
    quizzid = id;
    if (telaDesrenderizar !== null) {
        telaDesrenderizar();
    }
    toggleCarregamento('Carregando quizz...');
    const pegarQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    pegarQuizz.then(quizzCerto);
    pegarQuizz.catch(quizzError);
    console.log(id);
}

function randomizarArray() {

}

function quizzCerto(valor) {
    caixa = [];
    Quizz = valor.data;
    const botao = document.querySelector('.botao-reset');
    const topo = document.createElement('div');
    topo.classList.add('topoTela2');
    topo.innerHTML +=`<div class="opaco"></div>
    <img src="${Quizz.image}">
    <h1>${Quizz.title}</h1>
    `
    botao.insertAdjacentElement('beforebegin', topo);
    for (i = 0; i < Quizz.questions.length; i++) {

        caixa.push(Quizz.questions[i].answers);
        caixa[i].sort(() => .5 - Math.random());
        const container = document.createElement('div');
        container.classList.add('conteudoQuizz');
        const tituloPergunta = document.createElement('div');
        tituloPergunta.classList.add('tituloperguntaQuizz');
        tituloPergunta.setAttribute('style', `background-color:${Quizz.questions[i].color}`);
        tituloPergunta.innerHTML = `<h2>${Quizz.questions[i].title}</h2>`;
        container.appendChild(tituloPergunta);
        const containerRespostas = document.createElement('div');
        containerRespostas.classList.add('containerFotoTextoQuizz');
        for (let j = 0; j < Quizz.questions[i].answers.length; j++) {
            containerRespostas.innerHTML += `
                <div class="foto-texto ${caixa[i][j].isCorrectAnswer}" onclick="selecionado(${i}, ${j})">
                    <img src="${caixa[i][j].image}">
                    <h2>${caixa[i][j].text}</h2>
                </div>`
        }
        container.appendChild(containerRespostas);
        botao.insertAdjacentElement('beforebegin', container);
    }
    executarFun????o();
}

function executarFun????o(){
    toggleCarregamento(null);
    toggleTela2();
    document.querySelector('.conteudoTela2 .topoTela2').scrollIntoView();

}

let perguntados;
let acertoss = 0;

function selecionado(numPergunta, numResposta) {
    const perguntas = document.querySelectorAll('.conteudoQuizz');
    const selecionou = perguntas[numPergunta].querySelector('.selecionou');
    if (selecionou !== null) {
        return;
    }
    for (let i = 0; i < perguntas[numPergunta].querySelector('.containerFotoTextoQuizz').querySelectorAll('.foto-texto').length; i++) {
        if (perguntas[numPergunta].querySelector(`.containerFotoTextoQuizz >:nth-child(${i + 1})`).classList.value === 'foto-texto true') {
            perguntas[numPergunta].querySelector(`.containerFotoTextoQuizz >:nth-child(${i + 1})`).classList.add('verdizin')

        }
        if (perguntas[numPergunta].querySelector(`.containerFotoTextoQuizz >:nth-child(${i + 1})`).classList.value === 'foto-texto false') {
            perguntas[numPergunta].querySelector(`.containerFotoTextoQuizz >:nth-child(${i + 1})`).classList.add('vermelhin')
        }

        if (i === numResposta) {
            perguntas[numPergunta].querySelector(`.containerFotoTextoQuizz >:nth-child(${i + 1})`).classList.add('selecionou');
            contador++
            if (perguntas[numPergunta].querySelector(`.containerFotoTextoQuizz >:nth-child(${i + 1})`).classList.value === 'foto-texto true verdizin selecionou') {
                acertoss++
            }
            continue;

        }
        perguntas[numPergunta].querySelector(`.containerFotoTextoQuizz >:nth-child(${i + 1})`).classList.add('respostasErradas');
    }

    if (numPergunta !== perguntas.length) {
        setTimeout(() => { perguntas[numPergunta + 1].scrollIntoView() }, 2000);
    }

    if (Quizz.questions.length === contador) {
        contador = 0;
        resultadoFinal();
        const ultimo = document.querySelector('.resultadoQuizz');
        setTimeout(() => { ultimo.scrollIntoView() }, 2000);
    }

}

function checaresultado() {
    Quizz.levels.sort(ordernarArray);
    let resultado = Math.round((acertoss / Quizz.questions.length) * 100);
    let index = Quizz.levels.length - 1;
    for (i = 0; i < Quizz.levels.length - 1; i++) {
        if (resultado >= Quizz.levels[i].minValue && resultado < Quizz.levels[i + 1].minValue) {
            index = i;
            return index;
        }
    }
    return index;
}

function ordernarArray(a, b){
    if(a.minValue < b.minValue){
        return -1;
    }
    if(a.minValue > b.minValue){
        return 1;
    }
    return 0;
}

function resultadoFinal() {
    let resultado = Math.round((acertoss / Quizz.questions.length) * 100);
    let index = checaresultado()
    const botao = document.querySelector('.botao-reset');
    const tituloQuizz = document.createElement('div');
    tituloQuizz.classList.add('resultadoQuizz');
    const divp = document.createElement('div');
    divp.innerHTML += `<p>${resultado}% de acerto: ${Quizz.levels[index].title}</p>`
    const titTexto = document.createElement('div');
    titTexto.innerHTML += `<img src="${Quizz.levels[index].image}">
                <p>${Quizz.levels[index].text}</p>`
    tituloQuizz.appendChild(divp);
    tituloQuizz.appendChild(titTexto);
    botao.insertAdjacentElement('beforebegin', tituloQuizz);
    acertoss = 0;
}



function resetarTelaInicialtela2() {
    location.reload();
}

function recarregarQuizz() {
    toggleTela2();
    const remover = document.querySelectorAll('.conteudoTela2 .conteudoQuizz');
    document.querySelector('.topoTela2').remove();
    if (document.querySelector('.resultadoQuizz') !== null){
        document.querySelector('.resultadoQuizz').remove();
    }
    for (let i = 0; i < remover.length; i++) {
        remover[i].remove();
    }
    selecionarQuizz(quizzid, null);
}

function quizzError(valor) {
    console.log('deu ruim');
}
/*----------------------------------------------------------------------Fim da tela 2--------------------------------------------------------------------------*/


/*Tela 3*/
function criarQuizz() {
    const tela_1 = document.querySelector('.tela-1');
    const tela_3 = document.querySelector('.tela-3');
    tela_1.classList.toggle('escondido');
    tela_1.classList.toggle('display-tela-1');
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
        aviso.innerHTML = 'O t??tulo do quizz deve ter entre 20 e 65 letras'
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
        aviso.innerHTML = 'O valor informado n??o ?? uma URL v??lida'
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
        aviso.innerHTML = 'O quizz deve ter no m??nimo 3 perguntas'
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
        aviso.innerHTML = 'O quizz deve ter no m??nimo 2 n??veis'
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
    perguntaMinimizada.setAttribute('data-identifier', 'expand');
    pergunta.classList.add('pergunta', 'escondido');
    pergunta.setAttribute('data-identifier', 'question-form');
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
    <input type="url" class="url" placeholder="URL da imagem">
    <h2>Respostas incorretas</h2>
    <div class="respostas-incorretas display-tela-3">
        <input type="text" placeholder="Resposta incorreta 1" class="resposta-incorreta">
        <input type="url" class="url" placeholder="URL da imagem 1">
    </div>
    <div class="respostas-incorretas display-tela-3">
        <input type="text" placeholder="Resposta incorreta 2" class="resposta-incorreta">
        <input type="url" class="url" placeholder="URL da imagem 2">
    </div>
    <div class="respostas-incorretas display-tela-3">
        <input type="text" placeholder="Resposta incorreta 3" class="resposta-incorreta">
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
    for (let i = 0; i < qtdePerguntas; i++) {
        perguntasBoolean = validarPerguntaQuizz(perguntas[i]);
        if (!perguntasBoolean) {
            alert('H?? algo de errado em uma de suas perguntas, por favor verifique e corrija o erro!');
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
        alert('Voc?? deve inserir uma resposta correta v??lida e um texto para cada pergunta');
        return false;
    }
    else if (!(respostaIncorretaControle[0] && urlControle[1])) {
        alert('Voc?? deve inserir pelo menos uma resposta incorreta em cada pergunta');
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
        aviso.innerHTML = 'A pergunta deve ter uma resposta correta v??lida';
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
    nivelMinimizado.setAttribute('data-identifier', 'expand');
    nivelMinimizado.innerHTML = `<h2>N??vel ${numeroNivel}</h2>
    <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.1594 15.4969L19.6038 14.0594C19.8295 13.8348 20.2222 13.992 20.2222 14.3155V20.8471C20.2222 22.0375 19.2517 23.0034 18.0556 23.0034H2.16667C0.970486 23.0034 0 22.0375 0 20.8471V5.03462C0 3.84419 0.970486 2.87837 2.16667 2.87837H14.5122C14.8326 2.87837 14.9951 3.2647 14.7694 3.4938L13.325 4.9313C13.2573 4.99868 13.167 5.03462 13.0677 5.03462H2.16667V20.8471H18.0556V15.7485C18.0556 15.6542 18.0917 15.5643 18.1594 15.4969ZM25.2281 6.43169L13.3747 18.2282L9.2941 18.6774C8.11146 18.8077 7.10486 17.8149 7.23576 16.629L7.68715 12.568L19.5406 0.771533C20.5743 -0.257178 22.2444 -0.257178 23.2736 0.771533L25.2236 2.71216C26.2573 3.74087 26.2573 5.40747 25.2281 6.43169ZM20.7684 7.81978L18.1458 5.20981L9.75903 13.5608L9.42951 16.4942L12.3771 16.1663L20.7684 7.81978ZM23.6934 4.2395L21.7434 2.29888C21.5583 2.1147 21.2559 2.1147 21.0753 2.29888L19.6806 3.68696L22.3031 6.29692L23.6979 4.90884C23.8785 4.72017 23.8785 4.42368 23.6934 4.2395Z" fill="black"/>
    </svg>`;
    const nivel = document.createElement('div');
    nivel.classList.add('nivel', 'escondido');
    nivel.setAttribute('data-identifier', 'level')
    nivel.innerHTML = `<h2>N??vel ${numeroNivel}</h2>
    <input type="text" placeholder="T??tulo do n??vel" class="titulo-nivel">
    <input type="number" min="0" max="100" placeholder="% de acerto m??nimo" class="acerto-nivel">
    <input type="url" placeholder="URL da imagem do n??vel" class="url-nivel">
    <textarea cols="30" rows="10" placeholder="Descri????o do n??vel" class="descricao-nivel"></textarea>`;
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
let acertosControleIgualdadeArray = [];

function validarNiveisQuizz() {
    acertoControle0 = false;
    acertosControleIgualdadeArray = [];
    const niveis = document.querySelectorAll('.tela-3-3 .nivel');
    let niveisBoolean = false;
    for (let i = 0; i < niveis.length; i++) {
        niveisBoolean = validarNivelQuizz(niveis[i]);
        if (!niveisBoolean) {
            alert('H?? algo de errado em um de seus n??veis, por favor verifique e corrija o erro!');
            return;
        }
        console.log('Passou n??vel');
    }
    if (!acertoControle0) {
        alert('Pelo menos um dos n??veis tem que ter um acerto m??nimo de 0%');
        return;
    }
    if (acertosControleIgualdadeArray.length !== new Set(acertosControleIgualdadeArray).size) {
        alert('N??o pode haver n??veis com % de acerto m??nimo iguais');
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
        aviso.innerHTML = 'O t??tulo do n??vel tem que conter pelo menos 10 caracteres';
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
        acertosControleIgualdadeArray.push(nivel.querySelector('.acerto-nivel').value);
        return true;
    }
    else {
        aviso.innerHTML = 'O acerto m??nimo do n??vel deve conter um n??mero de 0 a 100';
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
        aviso.innerHTML = 'Voc?? deve inserir uma URL v??lida'
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
        aviso.innerHTML = 'A descri????o do n??vel deve ter pelo menos 30 caracteres'
        nivel.querySelector('textarea').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function finalizarQuizz() {
    const botao = document.querySelector('.tela-3-3 button');
    botao.disabled = true;
    console.log(botao);
    toggleCarregamento('Criando quizz...');
    toggleTela3();
    const tela_3_3 = document.querySelector('.tela-3-3');
    tela_3_3.classList.toggle('display-tela-3');
    tela_3_3.classList.toggle('escondido');
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
            image: perguntas[i].querySelector('.url').value,
            isCorrectAnswer: true
        };
        pergunta.answers.push(respostaCorreta);
        let respostasIncorretas = perguntas[i].querySelectorAll('.respostas-incorretas');
        for (let j = 0; j < respostasIncorretas.length; j++) {
            if (respostasIncorretas[j].querySelector('.resposta-incorreta').value !== '') {
                let respostaIncorreta = {
                    text: respostasIncorretas[j].querySelector('.resposta-incorreta').value,
                    image: respostasIncorretas[j].querySelector('.url').value,
                    isCorrectAnswer: false
                };
                pergunta.answers.push(respostaIncorreta);
            }
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
    toggleCarregamento(null);
    toggleTela3();
    const tela_3_4 = document.querySelector('.tela-3-4');
    tela_3_4.classList.toggle('escondido');
    tela_3_4.classList.toggle('display-tela-3');
    const quizzElemento = document.createElement('div');
    quizzElemento.setAttribute('data-identifier', 'quizz-card');
    quizzElemento.setAttribute('onclick', `selecionarQuizzCriado(${quizz.data.id})`);
    quizzElemento.classList.add('quizz');
    quizzElemento.innerHTML = `<img src="${quizz.data.image}">
    <p>${quizz.data.title}</p>`;
    document.querySelector('.tela-3-4 h1').insertAdjacentElement('afterend', quizzElemento);
    const botao = document.querySelector('.botao-visualizar');
    botao.setAttribute('onclick', `selecionarQuizzCriado(${quizz.data.id})`);

    localStorage.setItem(quizz.data.id, quizz.data.id);
}

function selecionarQuizzCriado(id) {
    const tela_3_4 = document.querySelector('.tela-3-4');
    const tela_3_1 = document.querySelector('.tela-3-1');
    tela_3_4.classList.toggle('escondido');
    tela_3_4.classList.toggle('display-tela-3');
    tela_3_1.classList.toggle('escondido');
    tela_3_1.classList.toggle('display-tela-3');
    selecionarQuizz(id, toggleTela3);
}

function resetarTelaInicial() {
    window.location.reload();
}

//Fim da Tela 3


function toggleCarregamento(texto) {
    const carregamento = document.querySelector('.tela-carregamento');
    carregamento.classList.toggle('escondido');
    carregamento.classList.toggle('display-tela-carregamento');
    if (texto !== null) {
        carregamento.querySelector('h1').innerHTML = texto;
    }
}

function toggleTela1() {
    const tela_1 = document.querySelector('.tela-1');
    tela_1.classList.toggle('display-tela-1');
    tela_1.classList.toggle('escondido');
}

function toggleTela2() {
    const tela_2 = document.querySelector('.conteudoTela2');
    tela_2.classList.toggle('tela-2');
    tela_2.classList.toggle('escondido');
}

function toggleTela3() {
    const tela_3 = document.querySelector('.tela-3');
    tela_3.classList.toggle('display-tela-3');
    tela_3.classList.toggle('escondido');
}

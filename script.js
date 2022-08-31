function criarQuizz(){
    const tela1 = document.querySelector('.tela-1');
    const tela3 = document.querySelector('.tela-3');
    tela1.classList.toggle('escondido');
    tela3.classList.toggle('escondido');
    tela3.classList.toggle('display-tela-3');
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
    const tela31 = document.querySelector('.tela-3-1');
    const tela32 = document.querySelector('.tela-3-2');
    tela31.classList.toggle('display-tela-3');
    tela31.classList.toggle('escondido');
    tela32.classList.toggle('escondido');
    tela32.classList.toggle('display-tela-3');
    const qtdePerguntas = document.getElementById('qtdePerguntasCriarQuizz').value;

}
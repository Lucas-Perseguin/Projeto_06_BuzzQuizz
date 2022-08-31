function validarInformacoesQuizz(){
    const titulo = document.getElementById('tituloCriarQuizz').value;
    let tituloControle = false;
    const url = document.getElementById('urlCriarQuizz');
    let urlControle = false;
    const qtdePerguntas = document.getElementById('qtdePerguntasCriarQuizz').value;
    let qtdePerguntasControle = false;
    const qtdeNiveis = document.getElementById('qtdeNiveisCriarQuizz').value;
    let qtdeNiveisControle = false;
    const aviso = document.createElement('alerta');
    const avisos = document.querySelectorAll('alerta');

    if (avisos.length > 0){
        for (let  i = 0; i < avisos.length; i++){
            avisos[i].remove();
        }
    }

    tituloControle = checarTitulo(titulo, aviso);
    urlControle = checarUrl(url, aviso);
    qtdePerguntasControle = checarPerguntas(qtdePerguntas, aviso);
    qtdeNiveisControle = checarNiveis(qtdeNiveis, aviso);
    
    if (tituloControle && urlControle && qtdePerguntasControle && qtdeNiveisControle){
        criarPerguntasQuizz();
    }
}

function checarTitulo(titulo, aviso){
    if (titulo.length >= 20 && titulo.length <= 65){
        return true;
    }
    else{
        aviso.innerHTML = 'O título do quizz deve ter entre 20 e 65 letras'
        document.getElementById('tituloCriarQuizz').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function checarUrl(url, aviso){
    if (url.checkValidity() && url.value !== ''){
        return true;
    }
    else{
        aviso.innerHTML = 'O valor informado não é uma URL válida'
        document.getElementById('urlCriarQuizz').insertAdjacentElement('afterend', aviso);
        return false;
    }
}

function checarPerguntas(qtdePerguntas, aviso){
    if (qtdePerguntas >= 3){
        qtdePerguntasControle = true;
    }
    else{
        aviso.innerHTML = 'O quizz deve ter no mínimo 3 perguntas'
        document.getElementById('qtdePerguntasCriarQuizz').insertAdjacentElement('afterend', aviso);
    }
}

function checarNiveis(qtdeNiveis, aviso){
    if (qtdeNiveis >= 2){
        qtdeNiveisControle = true;
    }
    else{
        aviso.innerHTML = 'O quizz deve ter no mínimo 2 níveis'
        document.getElementById('qtdeNiveisCriarQuizz').insertAdjacentElement('afterend', aviso);
    }
}
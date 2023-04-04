import { useState } from "react";
import { Perguntas } from "../../data/perguntas";
import { Button } from "react-bootstrap";
import './Quiz.css'
import imgfinal from "../../assets/images/quiz/imgfinal.png"

export function Quiz(){
    const questions = Perguntas ?? []
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [showPontuacao, setShowPontuacao] = useState(false);
    const [pontos, setPontos] = useState(0);
    const [quizConcluido, setQuizConcluido] = useState(false);

    function proximaPergunta(correta){
        const nextQuestion = perguntaAtual+1;
        if (correta){
            setPontos(pontos+1);
        }
        if(nextQuestion < questions.length){
            setPerguntaAtual(nextQuestion);
        } else { 
            setShowPontuacao(true);
        }
    }

    function reiniciarQuiz(){
        setPerguntaAtual(0);
        setPontos(0);
        setShowPontuacao(false);
        setQuizConcluido(false);
    }

    return(
        <div className="container">
            <h1>Quiz de Literatura!</h1>
            {showPontuacao ? (
                <div className="pontuacao">
                    <img src={imgfinal} /><br/>
                    <hr/>
                    <span>Sua pontuação é {pontos} de {questions.length} pontos.</span><br/>
                    <Button variant="success" onClick={reiniciarQuiz}>Tente novamente</Button>
                </div>) : (
                    <>
                    <div className="inforPerguntas">
                        <div className="contagemPerguntas">
                            <span>Pergunta {perguntaAtual + 1}/{questions.length} - N° de acertos: {pontos} </span>
                            
                        </div>
                        <div className="pergunta">
                            <img src={questions[perguntaAtual].img} /><hr/>
                            {questions[perguntaAtual].pergunta}</div>
                            
                    </div>
                    
                    <div className="resposta">
                        {questions[perguntaAtual].opcoesResposta.map((opcoesResposta)=>
                        <div className="grupoResposta">
                            <Button  variant="outline-success" size="lg" onClick={()=>proximaPergunta(opcoesResposta.correta)}>
  {opcoesResposta.alternativa}{opcoesResposta.resposta}
</Button>
                        </div>)}
                    </div>
                    </>
                )
                }
        </div>
    )
}
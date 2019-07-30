import React, { Component } from 'react';
class Quiz extends Component{
  render(){
    const result = this.props.quizData.filter((current,index)=>{
      return current.active==true;
    });
    var answerPickedVar = result[0].answerPicked;
    var panelId = result[0].id;

    const questions = result[0].answers.map((current,index)=>{
      let letter = "" ;
      if(index==0){letter='A'}else if(index==1){letter="B"}
        else if(index==2){letter="C"}else if(index==3){letter="D"};//correct letter for each answer
      
      let clickHandler;
      if(answerPickedVar==false){//if answer wasnt picked yet on current panel
        clickHandler = ()=>{this.props.pAnswer(current.correct, panelId, index)};
      }
      let statusStyle = "";
      if(current.correctActive==true){
        statusStyle = "correct-answer"
      }else if(current.wrongActive==true){
        statusStyle = "wrong-answer"
      }

      return <li key={index} onClick={clickHandler} className={statusStyle}>
              <span className="question-id">{letter}</span>
              <p>{current.answer}</p>
            </li>
    })
    
      if(this.props.showStart==true){
      return <button onClick={this.props.startQuiz} className="btn-1" >Start the quiz</button>
      }

      if(this.props.dsplQuiz==true){
    return(
        <div>
          <div className="question-wrap">
            <p className="question-num">Question {panelId+1}/{this.props.quizData.length}</p>
            <p className="question-text">{result[0].question}</p>
          </div>
          <ul className="questions-list">{questions}</ul>
        </div>
      )
      }else{ return null; }


  }
}
export default Quiz;
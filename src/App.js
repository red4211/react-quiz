import React, { Component } from 'react';
import './App.css';
import Quiz from './Quiz';
import NextQuestion from './NextQuestion';
import FinishedQuiz from './FinishedQuiz';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {quizInfo: [{question:"Inside which HTML element do we put the JavaScript?", id:0, active:true, answers:[{answer:"<script>", correct:true}, {answer:"<scripting>", correct:false}, {answer:"<javascript>", correct:false}, {answer:"<js>", correct:false}], answerPicked:false},
{question:'What is the correct JavaScript syntax to change the content of the HTML element below?<p id="demo">This is a demonstration.</p>', id:1, active:false, answers:[{answer:' #demo.innerHTML = "Hello World!";', correct:false}, {answer:'document.getElementByName("p").innerHTML = "Hello World!";', correct:false}, {answer:'document.getElement("p").innerHTML = "Hello World!";', correct:false}, {answer:'document.getElementById("demo").innerHTML = "Hello World!";', correct:true}], answerPicked:false},
{question:"Where is the correct place to insert a JavaScript?", id:2, active:false, answers:[{answer:" Both the <head> section and the <body> section are correct", correct:true}, {answer:" The <body> section", correct:false}, {answer:" The <head> section", correct:false}], answerPicked:false},
{question:'What is the correct syntax for referring to an external script called "xxx.js"?', id:3, active:false, answers:[{answer:'<script name="xxx.js">', correct:false}, {answer:'<script src="xxx.js">', correct:true}, {answer:'<script href="xxx.js">', correct:false}], answerPicked:false}
],
      correctAnswers:0,
      displayQuiz: false,
      finishScreen: false,
      showStartBtn: true,
      startTime:0,
      testTime:0
    }

    this.pickAnswer = this.pickAnswer.bind(this);
    this.loadNextQuestion = this.loadNextQuestion.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.FinishQuiz = this.FinishQuiz.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
  }

  pickAnswer(answerBool, idNum, index){
    let quizArrCopy = [...this.state.quizInfo];
    quizArrCopy[idNum].answerPicked = true;

    if(answerBool){
      let correctCopy = this.state.correctAnswers;
      correctCopy++;
      quizArrCopy[idNum].answers[index].correctActive = true;//set answer color to green if correct

      this.setState({correctAnswers: correctCopy, quizInfo: quizArrCopy});
    }else{
      quizArrCopy[idNum].answers[index].wrongActive = true;
      this.setState({quizInfo: quizArrCopy});
    }

  }

  loadNextQuestion(){
    //if activePicked is false, dont show button
    let copy = [...this.state.quizInfo];
    for(let i=0; i<copy.length; i++){
      if(copy[i].active==true && i!==copy.length-1){
        copy[i].active = false;
        copy[i+1].active = true;
        break;
      }
    }

    this.setState({quizInfo: copy});
  }

  startQuiz(){
    //start timer
    var nDate = Date.now();
    this.setState({displayQuiz: true, showStartBtn:false, startTime:nDate});
  }

  FinishQuiz(){
    let finishTime = Date.now();
    let totalTime = (finishTime-this.state.startTime)/1000;
    this.setState({displayQuiz:false, finishScreen:true, testTime:totalTime});
  }

  restartQuiz(){
    let quizArrCopy = [...this.state.quizInfo];
    quizArrCopy = quizArrCopy.map((current,index)=>{
      current.answerPicked = false;
      current.answers = current.answers.map((cur2, index2)=>{
        if(cur2.hasOwnProperty('correctActive')){
          delete cur2.correctActive;
        }else if(cur2.hasOwnProperty('wrongActive')){
          delete cur2.wrongActive;
        }
        return cur2;
      })

      current.active = false;
      return current;
    });

    quizArrCopy[0].active = true;
    var nDate = Date.now();
    this.setState({displayQuiz:true, correctAnswers:0, finishScreen:false, quizInfo: quizArrCopy, startTime:nDate});
    //start timer
  }


  render(){
    return (
    <div className="App">
      <Quiz quizData={this.state.quizInfo} pAnswer={this.pickAnswer} dsplQuiz={this.state.displayQuiz} startQuiz = {this.startQuiz} showStart={this.state.showStartBtn} />
      <NextQuestion loadNext={this.loadNextQuestion} quizData = {this.state.quizInfo} fQuiz={this.FinishQuiz} showFinish={this.state.finishScreen} />
      <FinishedQuiz showFinish={this.state.finishScreen} correctA={this.state.correctAnswers} totalQuestions={this.state.quizInfo.length} restart={this.restartQuiz} testTime={this.state.testTime} />
    </div>
  );
  }
}

export default App;

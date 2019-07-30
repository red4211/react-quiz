import React, { Component } from 'react';
class NextQuestion extends Component{
render(){
  const result = this.props.quizData.filter((current,index)=>{
      return current.active==true;
  });

    if(result[0].answerPicked==true){
      if(result[0].id==this.props.quizData.length-1){//last question in array
          if(this.props.showFinish==false){
            return <button onClick={this.props.fQuiz} className="btn-1" >Finish Quiz</button>
          }else{ return null;}
        
      }else{
        return <button onClick={this.props.loadNext} className="btn-1" >Next question</button>
      }
    }else{
      return null; 
    }
  }
}

export default NextQuestion;
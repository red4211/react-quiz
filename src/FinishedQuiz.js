import React, { Component } from 'react';
class FinishedQuiz extends Component{
  render(){
    if(this.props.showFinish){
     var completeTime = Math.round(this.props.testTime );
     if(completeTime<60){
      completeTime = completeTime + " seconds";
     }else if(completeTime>=60){
      let minutes = Math.floor(completeTime/60);
      let seconds = completeTime%60;
      completeTime = minutes + " minutes " + seconds + " seconds";
     }

    return(
<div>
        <p className="complete-title" >Congratulations!</p>
        <p>You got {this.props.correctA} out of {this.props.totalQuestions} questions right.</p>
        <p>It took you {completeTime} to complete the test.</p>
        <button onClick={this.props.restart} >Restart</button>  
</div>
      )
    }else{
      return null;
    }

  }
}
export default FinishedQuiz;
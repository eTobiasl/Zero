import React, { Component } from 'react';
import { Circle } from 'react-shapes';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import Pipe from './Pipe';
import bird from "./birdGIF.gif"
import './App.css';
import robot from './robot.png'
import hi from './Hi.png'
import bgTrees from './backgroundTrees.png'
import { InfoScreen } from './InfoScreen';

const birdRadius = 22;
const start = Date.now()



class App extends Component {

  getInitialPipes() {
    const count = 3;
    const pipes = [];
    for (let i = 1; i < count; i++) {
      const x = window.innerWidth + (window.innerWidth / i);
      pipes.push({
        upperPipeHeight: (window.innerHeight / 2) - (Math.random() * 200),
        bottomPipeHeight: (window.innerHeight / 2) - (Math.random() * 200),
        x: x
      })
    }
    return pipes;
  }


  constructor(props) {
    super(props);
    this.state = {
      birdHeight: (window.innerHeight / 2) - 400,
      left: 350,
      gravity: 0.8,
      velocity: 0,
      pipes: this.getInitialPipes(),
      pipeSpeed: 7,
      toggleGame: false,
      score: 0,
      hearts: 3,
      textIndex: 0,
      toggleInfo: true,

    }
    this.moveUp = this.moveUp.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(() => this.update(), 15);
  }

  update() {
    if (this.state.hearts <= 0){
      this.setState({toggleGame: false})
    }

    const birdCrashed = this.state.birdHeight > window.innerHeight - birdRadius * 2;
    if(birdCrashed){
      clearInterval(this.interval);
      if(this.state.toggleGame){
        this.setState({hearts: this.state.hearts-1})
        console.log(this.state.hearts)
        this.state.birdHeight = (window.innerHeight / 2) - 400
        this.interval = setInterval(() => this.update(), 15)
      }
     
      return;
    }

    let pipeWasHit = this.state.pipes.find(pipe => pipe.isHit)
    
    if(pipeWasHit){
      clearInterval(this.interval);
      if(this.state.toggleGame){
        this.setState({hearts: this.state.hearts - 1})
        console.log(this.state.hearts)
        this.state.birdHeight = (window.innerHeight / 2) - 400
        this.interval = setInterval(() => this.update(), 15);
        this.state.pipes.forEach((p)=> p.isHit = false) 
      }
      return
    }

    const newVelocity = (this.state.velocity + this.state.gravity) * 0.9;

    const birdHeight = newVelocity + this.state.birdHeight;
    const newPipes = this.state.pipes.map(pipe => {
      const newX = pipe.x - this.state.pipeSpeed
      if (newX < 0) {
        return {
          upperPipeHeight: (window.innerHeight / 2) - (Math.random() * 200),
          bottomPipeHeight: (window.innerHeight / 2) - (Math.random() * 200),
          x: window.innerWidth - 40
        }
      } else {
        let isHit = false;
        const xDifference = (this.state.left - pipe.x)
        const hitOnX = xDifference < 10 && xDifference > 0;
        const hitOnUpperY = birdHeight < pipe.upperPipeHeight;
        const hitOnLowerY = birdHeight + birdRadius > (window.innerHeight - pipe.bottomPipeHeight)
        if ((hitOnUpperY || hitOnLowerY) && hitOnX) {
          isHit = true
        }

        return {
          ...pipe,
          x: newX,
          isHit: isHit
        }
      }
    })
    this.setState({
      velocity: newVelocity,
      birdHeight: birdHeight,
      pipes: newPipes
    })


  }

  moveUp(e) {
    this.setState({
      velocity: this.state.velocity - 25
    })
  }

  render() {
    const left = this.state.left;
    const birdHeight = this.state.birdHeight;
    this.state.score = Math.round((Date.now() - start)/10)
    

    if (this.state.toggleGame){
        return (
          <div className="App" style = {{pointerEvents: "none"}}>
          <img src = {bgTrees} style = {{width: "50%", height: "50%", position: "absolute", bottom: "0em", left: "0em"}}></img>
          <img src = {bgTrees} style = {{width: "50%", height: "50%", position: "absolute", bottom: "0em", right: "0em"}}></img>
          <KeyHandler keyEventName={KEYPRESS} keyValue=" " onKeyHandle={this.moveUp} />
            <div style={{ left: left, top: birdHeight, position: 'absolute' }}>
              <img src = {bird} style = {{width: "3em", transform: "scale(2)"}}></img>
              {/* <Circle r={birdRadius} fill={{ color: '#2409ba' }} stroke={{ color: '#E65243' }} strokeWidth={3} /> */}
            </div>
            <h1 style = {{color: "black", position: "absolute", top: "1em", right: "1em", zIndex: "2", fontSize: "2.5em"}}>{this.state.score}</h1>
            {this.state.pipes.map(pipe => {
              let upperPipeHeight = pipe.upperPipeHeight;
              const x = pipe.x;

              let bottomPipeTop = window.innerHeight - pipe.bottomPipeHeight;
              let bottomPipeHeight = pipe.bottomPipeHeight;

          
              if(bottomPipeHeight < (upperPipeHeight + 20)){
                bottomPipeHeight = bottomPipeHeight - 80
                bottomPipeTop = bottomPipeTop + 80
              }

              return <Pipe key={x} isHit={pipe.isHit} upperPipeHeight={upperPipeHeight} bottomPipeHeight={bottomPipeHeight} x={x} bottomPipeTop={bottomPipeTop} />
            })}
          </div>
        );
      }
    if(this.state.toggleInfo){
      const textList = [
        "Welcome! In this game we will try to teach you a little bit about e-waste, through a familiar game",
        "Pehaps we can’t eliminate e-waste fully, but maybe we can help reduce it?",
        "Let’s see how you can help!",
        "The U.S. EPA estimates that 350,000 mobile phones were dumped every day in 2010. That adds up to over 152 million phones a year.",
        "That’s a lot of e-waste!",
        "Phones have a lot of parts in them, and constantly buying new phones is not sustainable. Let's see how long you can keep your phone alive!"]
      return(
        <div className = "App">
         <InfoScreen text= {textList[this.state.textIndex]}/>
         <button style = {{position: "absolute", bottom: "35%", left: "50%", width: "7em", height: "3em"}} 
         onClick = {()=>{ if (this.state.textIndex <= 4){
           this.setState({textIndex: this.state.textIndex + 1})
           } else{
             this.setState({toggleInfo: false});
             this.state.birdHeight = (window.innerHeight / 2) - 400;
             this.interval = setInterval(() => this.update(), 15);
           }}}>Next</button>
           <button style = {{position: "absolute", bottom: "35%", left: "43%", width: "7em", height: "3em"}} 
           onClick = {()=>{ this.setState({toggleInfo: false});
           this.state.birdHeight = (window.innerHeight / 2) - 400;
           this.interval = setInterval(() => this.update(), 15);}}>Skip Intro</button>
          <img src = {robot} style = {{position: "absolute", bottom: "0em", left: "50%", width: "20em"}}></img>
        </div>
      );
    }

    if (this.state.hearts > 0){
      return(
        <div className = "App" style = {{ pointerEvents: "none", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          <KeyHandler keyEventName={KEYPRESS} keyValue=" " onKeyHandle={()=>{this.setState({toggleGame: true})}} />
          <h1 style = {{userSelect: "none", fontSize: "3em", marginBottom: "-3%"}}>Zero</h1>
          <div className = "menu" style = {{
            zIndex: "2",
            padding: "1em",
            textAlign: "center",
            borderRadius: "25px",
            marginTop: "5%",
            maxWidth: "100%",
            height: "32em",
            backgroundColor: "#F1F3F3",
            border: "solid grey .1em"}}>
              <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img src = {hi} style = {{width: "10em"}}></img>
                <img  style = {{ filter: "brightness(1.1)",width: "10em"}}src = {robot}></img>
              </div>
              <h3 style = {{marginBottom: "-1.8em",textAlign: "left", marginLeft: "4.5em"}}>Game Controls</h3>
              <div className = "button">
                <p style = {{
                  border: "solid black .1em",
                  margin: "3em",
                  padding: "1em",
                  borderRadius: "20px",
                  backgroundColor: "white",
                  textAlign: "left",
                  userSelect: "none",
                  fontSize: "100%"}}>
                     [SPACE] - Start the game<br/>[Ctrl + R] - Reload the game </p>
              </div>
          </div>
          <img src = {bgTrees} style = {{width: "50%", height: "50%", position: "absolute", bottom: "0em", left: "0em"}}></img>
          <img src = {bgTrees} style = {{width: "50%", height: "50%", position: "absolute", bottom: "0em", right: "0em"}}></img>
        </div>
      );
    }

    else{
      return(
        <div className = "App" style = {{width: "100%", height: "100%"}}>
          <div className = "wrapper" style = {{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%", height: "100%"}}>
            <h1 >You dropped your phone, and it didn't survive the fall</h1>
            <h2 style = {{color: "grey", marginTop: "-.2em"}}>Please select one of the following options to continue</h2>
            <div className = "buttonWrapper" style = {{display: "flex", gap: "1em"}}>
                <div className = "button1" onClick = {()=>{
                this.setState({hearts: 2})
                 this.state.birdHeight = (window.innerHeight / 2) - 400
                 this.setState({toggleGame: true});
                  }
                }
                style = {{ userSelect: "none", backgroundColor: "lightblue", padding: "1em", borderRadius: "10px"}}><span style = {{color: "black", fontWeight: "bold"}}>[Buy a New Phone]</span> +2 hearts, but increases e-waste</div>
                <div className = "button2" onClick = {()=>{
                this.setState({hearts: 1})
                 this.state.birdHeight = (window.innerHeight / 2) - 400
                 this.setState({toggleGame: true});
                  }
                }
                 style = {{ userSelect: "none", backgroundColor: "lightgreen", padding: "1em", borderRadius: "10px"}}><span style = {{color: "black", fontWeight: "bold"}}>[Repair Your Phone]</span> +1 hearts, but little or no e-waste</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;

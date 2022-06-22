/* eslint-disable no-unused-expressions */

import React, { Component } from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import Pipe from './Pipe';
import bird from "./birdGIF.gif"
import './App.css';
import robot from './robot.png'
import hi from './Hi.png'
import bgTrees from './backgroundTrees.png'
import { InfoScreen } from './InfoScreen';
import building from './building.png'

import shockEmoji from './shockEmoji.png'
import waveEmoji from './waveEmoji.png'
import interestingEmoji from './interestingEmoji.png'
import starEyesEmoji from './starEyesEmoji.png'
import eWaste from './eWaste.png'
import phoneBroken from './phoneBroken.png'
import material from './material.png'

import { Button } from '@mui/material';


const birdRadius = 22;



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
      textIndex2: 0,
      toggleInfo: false,
      numberOfPhones: 1,
      toggleEndScreen: false,
      toggleHitIndicator: false,
      toggleGarbage: false,
      toggleHitCooldown: false,
      garbageHeight: "20em",
      garbageWidth: "100%",
      toggleIntroScreen: true,
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

    if(this.state.toggleGame){

    const birdCrashed = this.state.birdHeight > window.innerHeight - birdRadius * 2;
    if(birdCrashed && !this.state.toggleHitCooldown){
      this.setState({toggleHitIndicator: true, toggleHitCooldown: true})
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        this.setState({toggleHitIndicator: false, toggleHitCooldown: false})
      }, 400)
      clearInterval(this.interval);
      if(this.state.toggleGame){
        this.setState({hearts: this.state.hearts-1});
        this.state.birdHeight = (window.innerHeight / 2) - 400
        this.interval = setInterval(() => this.update(), 15)
      }
     
      return;
    }

    let pipeWasHit = this.state.pipes.find(pipe => pipe.isHit)
    
    if(pipeWasHit && !this.state.toggleHitCooldown){
      this.setState({toggleHitIndicator: true, toggleHitCooldown: true})
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        this.setState({toggleHitIndicator: false, toggleHitCooldown: false})
      }, 400)
      clearInterval(this.interval);
      if(this.state.toggleGame){
        this.setState({hearts: this.state.hearts - 1});
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
      if(this.state.toggleGame){
      this.setState({
        score: this.state.score += 0.8,
        velocity: newVelocity,
        birdHeight: birdHeight,
        pipes: newPipes
      })
    }
  }

  }

  moveUp(e) {
    if(this.state.toggleGame){
    this.setState({
      velocity: this.state.velocity - 25
    })
  }
  }

  render() {
    const left = this.state.left;
    const birdHeight = this.state.birdHeight;
    
    if (this.state.toggleGame){
        return (
          <div className="App" style = {{pointerEvents: "none"}}>
          { this.state.toggleHitIndicator && <div style = {{width: "100vw", height: "100vh", backgroundColor: "#FF7F7F", zIndex: "3", position: "absolute", bottom: "0em", opacity: "0.2"}}></div>}
          <img src = {bgTrees} style = {{width: "50%", height: "50%", position: "absolute", bottom: "0em", left: "0em"}}></img>
          <img src = {bgTrees} style = {{width: "50%", height: "50%", position: "absolute", bottom: "0em", right: "0em"}}></img>
          <KeyHandler keyEventName={KEYPRESS} keyValue=" " onKeyHandle={this.moveUp} />
          <KeyHandler keyEventName={KEYPRESS} keyValue="p" onKeyHandle={()=>{this.setState({toggleGame: false})}} />
            <div style={{ left: left, top: birdHeight, position: 'absolute' }}>
              <img src = {bird} style = {{width: "3em", transform: "scale(2)"}}></img>
              {/* <Circle r={birdRadius} fill={{ color: '#2409ba' }} stroke={{ color: '#E65243' }} strokeWidth={3} /> */}
            </div>
            <h1 style = {{color: "black", position: "absolute", top: "1em", right: "1em", zIndex: "2", fontSize: "1.5vw"}}>{Math.round(this.state.score/1000)} år / {this.state.numberOfPhones} telefon(er)</h1>
            <h1 style = {{color: "black", position: "absolute", top: "1em", left: "1em", zIndex: "2", fontSize: "1.5vw"}}>Hjerter: {this.state.hearts}</h1>
            { this.state.toggleGarbage && <img src = {eWaste} style = {{position: "absolute", bottom: "-5em", width: this.state.garbageWidth, height: this.state.garbageHeight, zIndex: "4"}}></img>}
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
    if(this.state.toggleIntroScreen){
      return (
        <div className = "App" style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <h1 style = {{fontSize: "6vw"}}>Zero</h1>
          <h2 style = {{color: "grey", marginTop: "-5em", fontSize: ".9vw"}}>Lær mer om e-avfall gjennom spill</h2>
          <Button variant = "contained" onClick = {()=>{this.setState({toggleIntroScreen: false, toggleInfo: true})}} style = {{width: "15em", height: "2em", fontSize: "1.5vw"}}>Start</Button>

          <img src = {building} style = {{position: "absolute", top: "0em", left: "4em", width: "15%"}}></img>
          <img src = {building} style = {{position: "absolute", bottom: "-10em", left: "4em", width: "15%"}}></img>

          <img src = {building} style = {{position: "absolute", top: "-20em", right: "8em", width: "20%"}}></img>
          <img src = {building} style = {{position: "absolute", bottom: "-8em", right: "8em", width: "20%"}}></img>

          <img src = {bird} style = {{position: "absolute", top: "15em", right: "8em", width: "10%"}}></img>

          <img src={eWaste} style = {{width: "25%", position: "absolute", bottom: "0em", right: "10em"}}></img>
        </div>
      );
    }

    if(this.state.toggleInfo){
      const textList = [
        "Velkommen! I dette spillet skal vi prøve å lære deg litt om e-avfall, gjennom et vellkjent spill-format",
        "Kanskje vi ikke kan unngå alt e-avfall, men vi kan definitivt redusere det!",
        "La oss se hvordan du kan bidra!",
        "U.S. EPA estimerer at 350,000 mobiltelefoner ble kastet hver dag i 2010. Dette utgjør 152 millioner telefoner i løpet av et år.",
        "Det er mye e-avfall!",
        "Telefoner har mange deler i seg, og å kjøpe nye telefoner hele tiden er ikke bærekraftig. La oss se hvor lenge du kan beholde telefonen din!"]
        const emojiList = [
          waveEmoji,
          null,
          starEyesEmoji,
          interestingEmoji,
          shockEmoji,
          starEyesEmoji
        ]
      return(
        <div className = "App" style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>

          <Button style = {{position: "absolute", top: "2em", right: "2em", fontSize: ".8vw"}}
          onClick = {()=>{ this.setState({toggleInfo: false});
          this.state.birdHeight = (window.innerHeight / 2) - 400;
          }}>
            Hopp over Info
          </Button>
         <InfoScreen text= {textList[this.state.textIndex]} emoji={emojiList[this.state.textIndex]}/>
         <Button variant = "contained" style = {{marginTop: "-2em", zIndex: "4", fontSize: ".7vw"}}
          onClick = {()=>{ if (this.state.textIndex < textList.length-1){
            this.setState({textIndex: this.state.textIndex + 1})
            } else{
              this.setState({toggleInfo: false});
              this.state.birdHeight = (window.innerHeight / 2) - 400;
              // this.interval = setInterval(() => this.update(), 15);
            }}}>
          Neste</Button>
          <img src = {robot} style = {{width: "15vw", marginTop: "2em", position: "absolute", bottom: "0em"}}></img>
      

          
          {/* <button style = {{ width: "7em", height: "3em"}} 
         onClick = {()=>{ if (this.state.textIndex <= 4){
           this.setState({textIndex: this.state.textIndex + 1})
           } else{
             this.setState({toggleInfo: false});
             this.state.birdHeight = (window.innerHeight / 2) - 400;
             this.interval = setInterval(() => this.update(), 15);
           }}}>Next</button>

           <button style = {{width: "7em", height: "3em"}} 
           onClick = {()=>{ this.setState({toggleInfo: false});
           this.state.birdHeight = (window.innerHeight / 2) - 400;
           }}>Skip Intro</button> */}
        </div>
      );
    }

    if (this.state.hearts > 0){
      return(
        <div className = "App" style = {{ pointerEvents: "none", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          <KeyHandler keyEventName={KEYPRESS} keyValue=" " onKeyHandle={
            ()=>{this.setState({toggleGame: true}),this.setState({toggleHitCooldown: true})
            const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            this.setState({toggleHitCooldown: false})
          }, 400)}} />
          <KeyHandler keyEventName={KEYPRESS} keyValue="p" onKeyHandle={()=>{this.setState({toggleGame: true})}} />
          <h1 style = {{userSelect: "none", fontSize: "2vw", marginBottom: "-3%"}}>Zero</h1>
          <div className = "menu" style = {{
            zIndex: "2",
            padding: "1em",
            textAlign: "center",
            borderRadius: "25px",
            marginTop: "5%",
            width: "30vw",
            height: "45vh",
            backgroundColor: "#F1F3F3",
            border: "solid grey .1em"}}>
              <div style = {{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <img src = {hi} style = {{width: "8vw"}}></img>
                <img  style = {{ filter: "brightness(1.1)",width: "8vw"}}src = {robot}></img>
              </div>
              <h3 style = {{marginBottom: "-1.8vw",textAlign: "left", marginLeft: "4.5vw", fontSize: "1vw"}}>Spill kontroller</h3>
              <div className = "button">
                <p style = {{
                  border: "solid black .1em",
                  margin: "3em",
                  width: "75%",
                  padding: "1em",
                  borderRadius: "20px",
                  backgroundColor: "white",
                  textAlign: "left",
                  userSelect: "none",
                  fontSize: "2vh"}}>
                     [MELLOMROM] - Start eller fortsett spillet<br/>[Ctrl + R] - Last inn spillet på nytt <br/>[P] - Sett spillet på pause, eller fortsett spillet</p>
              </div>
          </div>
          <img src = {bgTrees} style = {{width: "50%", height: "50%", position: "absolute", bottom: "0em", left: "0em"}}></img>
          <img src = {bgTrees} style = {{width: "50%", height: "50%", position: "absolute", bottom: "0em", right: "0em"}}></img>
        </div>
      );
    }
    if(this.state.toggleEndScreen){
      if(this.state.textIndex != 0){
        this.setState({textIndex: 0})
      }
      const emojiList = [
        null,
        interestingEmoji,
        null,
        null,
        shockEmoji,
        starEyesEmoji,
      starEyesEmoji]
      let aboveAvarage = null
      if(this.state.numberOfPhones/Math.round(this.state.score/1000) <= this.state.numberOfPhones/2){
        aboveAvarage = false
      } else{
        aboveAvarage = true
      }
   
      let phoneArray = new Array(Math.round(this.state.numberOfPhones)).fill(<img src = {phoneBroken} style = {{width: "3.5vw"}}></img>);
      const textList = ["Du brukte " + this.state.numberOfPhones + " telefon(er) i løpet av " + Math.round(this.state.score/1000) + " år, gjennomsnittet ligger på 1 telefon per 2 år",
    " Ditt spillresultat tilsvarer ca. " + 70*this.state.numberOfPhones + "kg Co2-utslipp i året ", "Den beste måten å minske e-avfall knyttet til telefoner, er ved å beholde telefonen din så lenge som mulig og reparere den ved behov",
    "Når dette ikke lenger er mulig kan telefonen da sendes til resirkulering, hvor deler av telefonen kan brukes til nye ting",
     "Dessverre løser ikke dette hele e-avfall problemet, og med dagens løsning er det hovedsakelig metaller som resirkuleres; ettersom de er mest verdifulle. Materialer som plastikk blir i liten grad resirkulert fra telefoner",
    "Derfor er det viktig at vi starter en samtale rundt e-avfall, både så vi som individer blir flinkere, men også så selskaper lager mer bærekraftige telefoner!",
    "Snakk derfor gjerne med de rundt deg om bærekraft og e-avfall, sammen kan vi skape en mer bærekratig verden!"]
        return(
          <div className = "App" style = {{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
             { this.state.textIndex2 < 1 && <div style = {{ width: "35em", maxHeight: "30em", position: "absolute", top: "11em"}}>
              {phoneArray}
            </div>}
           <InfoScreen text= {textList[this.state.textIndex2]} emoji={emojiList[this.state.textIndex2]} style = {{transform: "scale(0.8)"}}/>

          {/* {this.state.textIndex2 == 4 && 
              // <img src = {material} style = {{width: "25em", position: "absolute", top: "5em"}}></img>
          } */}

          {this.state.textIndex2 < textList.length -1 && <Button variant = "contained" style = {{marginTop: "-2em", zIndex: "4", fontSize: ".7vw"}}
          onClick = {()=>{ if (this.state.textIndex2 < textList.length -1){
            this.setState({textIndex2: this.state.textIndex2 + 1});
            console.log(this.state.textIndex2);
          }}}>
          Neste</Button>}

            <img src = {robot} style = {{ width: "15vw", marginTop: "5em", position: "absolute", bottom: "0em"}}></img>
            <Button style = {{position: "absolute", top: "2em", right: "2em"}} onClick= {()=>{
              this.setState({toggleGame: false, toggleEndScreen: false, toggleInfo: true, hearts: 3, score: 0, numberOfPhones: 1, textIndex2: 0, toggleGarbage: false});
            }}><div style = {{fontSize: "1vw"}}>Start på nytt</div></Button>
          </div>
        );
    }
    else{
        return(
          <div className = "App" style = {{width: "100%", height: "100%"}}>
            <div className = "wrapper" style = {{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%", height: "100%"}}>
              <img src = {bird} style = {{width: "10vw"}}></img>
              <h1 style = {{fontSize: "2vw"}}>Du mistet telefonen din i bakken, og den overlevde ikke fallet</h1>
              <h2 style = {{color: "grey", marginTop: "-.2em", fontSize: "1vw"}}>Velg et av alternativene under</h2>
              <div className = "buttonWrapper" style = {{display: "flex", gap: "1em"}}>
                  {/* <div className = "button1" onClick = {()=>{
                  this.setState({hearts: 2})
                  this.state.birdHeight = (window.innerHeight / 2) - 400
                  this.setState({toggleGame: true});
                    }
                  }
                  style = {{ textAlign: "center", userSelect: "none", backgroundColor: "lightblue", padding: "1em", borderRadius: "10px", fontSize: "1em"}}><span style = {{color: "black", fontWeight: "bold", fontSize: "1.5em"}}>
                    [Kjøp en ny telefon]</span><br/>+2 hjerter, men mer e-avfall</div> */}
                  {/* <div className = "button2" onClick = {()=>{
                  this.setState({hearts: 1})
                  this.state.birdHeight = (window.innerHeight / 2) - 400
                  this.setState({toggleGame: true});
                    }
                  }
                  style = {{ textAlign: "center", userSelect: "none", backgroundColor: "lightgreen", padding: "1em", borderRadius: "10px", fontSize: "1em"}}><span style = {{color: "black", fontWeight: "bold", fontSize: "1.5em"}}>
                    [Reparer telefonen din]</span> <br/>+1 hjerter, men mindre eller ikke noe e-avfall</div> */}
                    
                    <Button variant = "contained" style = {{backgroundColor: "lightblue", color: "black", textAlign: "center"}}
                      onClick = {()=>{
                        if(this.state.garbageHeight == "20em" && this.state.toggleGarbage){
                          this.setState({garbageHeight: "50em"})
                        } else if (this.state.garbageHeight == "50em" && this.state.toggleGarbage){
                          this.setState({garbageHeight: "80em"})
                        }
                        this.setState({hearts: 3, toggleGame: true, toggleGarbage: true, numberOfPhones: this.state.numberOfPhones + 1, toggleHitCooldown: true})
                        this.state.birdHeight = (window.innerHeight / 2) - 400
                        const timeId = setTimeout(() => {
                          // After 3 seconds set the show value to false
                          this.setState({toggleHitCooldown: false})
                        }, 400)
                          }
                        }>
                     <div style = {{fontSize: ".6vw"}}>
                       <span style = {{fontWeight: "bold", fontSize: "1vw"}}>[Kjøp en ny telefon]</span>
                       <br/>
                       +3 hjerter, men mer e-avfall
                     </div>
                      </Button>

                      <Button variant = "contained" style = {{backgroundColor: "lightgreen", color: "black", textAlign: "center"}}
                      onClick = {()=>{
                        this.setState({hearts: 1, toggleGame: true, numberOfPhones: this.state.numberOfPhones + 0.25, toggleHitCooldown: true})
                        this.state.birdHeight = (window.innerHeight / 2) - 400
                        const timeId = setTimeout(() => {
                          // After 3 seconds set the show value to false
                          this.setState({toggleHitCooldown: false})
                        }, 400)
                          }
                        }>
                     <div style = {{fontSize: ".6vw"}}>
                       <span style = {{fontWeight: "bold", fontSize: "1vw"}}>[Reparer telefonen]</span>
                       <br/>
                       +1 hjerte, men mindre e-avfall
                     </div>
                      </Button>
                  {/* <div className = "button3" onClick = {()=>this.setState({toggleEndScreen: true, toggleGame: false})} style = {{userSelect: "none", backgroundColor: "#FF7F7F", padding: "1em", borderRadius: "10px", fontSize: "1em"}} >End game</div> */}
                    <Button variant = "contained" style = {{backgroundColor: "#FF7F7F", color: "black", fontSize: "1vw"}} onClick = {()=>this.setState({toggleEndScreen: true, toggleGame: false})}>Avslutt Spillet</Button>
              </div>
            </div>
          </div>
        );
    }
  }
}

export default App;

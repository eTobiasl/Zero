import React from 'react'
import './InfoScreen.css'

export const InfoScreen = ({ text, emoji}) => {
  return (
    <div className = "infoScreen" style = {{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
      <div className = "speechBouble">
        <p>{text}</p>
        { emoji != null && <img alt = " " src= {emoji} style = {{width: "4em", position: "absolute", top: "-1.5em", right: "-1.5em"}}></img>}
        </div>
    </div>
  )
}


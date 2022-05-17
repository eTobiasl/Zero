import React from 'react'
import './InfoScreen.css'

export const InfoScreen = ({ text}) => {
  return (
    <div className = "infoScreen" style = {{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}}>
      <div className = "speechBouble" >{text}</div>
    </div>
  )
}


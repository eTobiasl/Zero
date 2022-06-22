

import React from 'react';
import building from './building.png'

export default function Pipe(props) {

        const upperPipeHeight = props.upperPipeHeight;
        const pipeX = props.x;

        const lowerHeight = props.bottomPipeTop;
        const bottomPipeHeight = props.bottomPipeHeight;
        
        // const color = props.isHit ? 'red' : '#5E89A5 ';

        return (
            <div id="pipe" >
                <div style={{ left: pipeX, top: 0, position: 'absolute' }}>
                    {/* <Rectangle width={200} height={upperPipeHeight} fill={{ color: color }}  /> */}
                    <img alt = " " src = {building} style = {{height: upperPipeHeight, width: upperPipeHeight*0.6}}></img>
                </div>
                <div style={{ left: pipeX, top: lowerHeight, position: 'absolute' }}>
                    {/* <Rectangle width={200} height={bottomPipeHeight} fill={{ color: color }} /> */}
                    <img alt = " " src = {building} style = {{height: bottomPipeHeight, width: upperPipeHeight*0.6}}></img>
                </div>
            </div>
        );
    }

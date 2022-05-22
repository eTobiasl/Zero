import React from 'react';
import { Rectangle } from 'react-shapes';

export default function Pipe(props) {

        const upperPipeHeight = props.upperPipeHeight;
        const pipeX = props.x;

        const lowerHeight = props.bottomPipeTop;
        const bottomPipeHeight = props.bottomPipeHeight;
        
        const color = props.isHit ? 'red' : '#5E89A5 ';

        return (
            <div id="pipe" >
                <div style={{ left: pipeX, top: 0, position: 'absolute' }}>
                    <Rectangle width={200} height={upperPipeHeight} fill={{ color: color }}  />
                </div>
                <div style={{ left: pipeX, top: lowerHeight, position: 'absolute' }}>
                    <Rectangle width={200} height={bottomPipeHeight} fill={{ color: color }} />
                </div>
            </div>
        );
    }

import React from 'react';
import Tilt from 'react-parallax-tilt';
//import brain from './brain.png';
import facerecog from './facerecog.png';
import './Logo.css';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }}>
                <div className="Tilt-inner pa3">
                    <img  alt='logo' src={facerecog}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;
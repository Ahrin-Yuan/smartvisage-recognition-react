import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange , isSignedIn }) => {
        if (isSignedIn){
        return ( 
        <nav style={{display:'flex', justifyContent:'flex-end'}}>
            <p 
            onClick={()=> onRouteChange('SignOut')}
            className='signout-Line white f3 pa3 pointer'>
            Sign Out</p>
        </nav>
        );    
        } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('SignIn')} className='signin-Line white f3 underline pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('Register')} className='reg-Line white f3 underline pa3 pointer'>Register</p>
        </nav>
      );
        }
}

export default Navigation;
import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail:'',
            signInPassword:''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail:event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword:event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://smartvisage-recognition-api.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id){
             this.props.loadUser(user);
             this.props.onRouteChange('home');
            }
        })
    }

    render(){
        const { onRouteChange } = this.props;
        return(
        <article className="br3 ba b--white-50 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center white"> 
        <main className="pa4 white-80">
        <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                    className="pa2 white input-reset ba b--white-30 bg-transparent hover-bg-black hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address"
                    onChange={this.onEmailChange}
                />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                    className="b pa2 white input-reset ba b--white-30 bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password"
                    onChange={this.onPasswordChange}
                />
            </div>

            </fieldset>
            <div className="">
            <input 
                onClick={this.onSubmitSignIn}
                className="b white ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in"
            />
            </div>
            <div className="lh-copy mt3">
            <p onClick={()=> onRouteChange('Register')} className="reg-ClickLine f6 db pointer">Register</p>
            </div>
        </div>
        </main>
        </article>
        );
    }

}

export default SignIn;
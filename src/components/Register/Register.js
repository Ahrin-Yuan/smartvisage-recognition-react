import React from 'react';


class Register extends React.Component {
    constructor(){
        super();
        this.state = {
         name: '',
         email:'',
         password:''
        }    
    }

    onNameChange = (event) => {
        this.setState({name:event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email:event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password:event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://smartvisage-recognition-api.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
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
        return(
        <article className="br3 ba b--white-50 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"> 
        <main className="pa4 white-80">
        <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                <input 
                    className="pa2 white input-reset ba b--white-30 bg-transparent hover-bg-black hover-white w-100" 
                    type="text" 
                    name="name"  
                    id="name"
                    onChange={this.onNameChange}
                />
            </div>
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
                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" 
                type="submit" 
                value="Register"
            />
            </div>
        </div>
        </main>
        </article>
    );
    }
}

export default Register;
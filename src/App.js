import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const initialState = {
    input:'',
    imageUrl: '',
    box:{}, 
    route:'SignIn',
    isSignedIn:false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
constructor(){
  super();
  this.state = initialState;
}

loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined,
  }})
}


calculateFaceLocation = (data) => {
  //bounding box is percentage of image
  //const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const top_row = Number(data.topRow);
  const left_col = Number(data.leftCol);
  const right_col = Number(data.rightCol);
  const bottom_row = Number(data.bottomRow);
  //DOM Manipulation
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: left_col * width,
    topRow: top_row * height,
    rightCol: width - right_col * width,
    bottomRow: height - bottom_row * height,
  };
} 

  displayFaceBox = (box) => {
    console.log(box);
    this.setState ({box:box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://smartvisage-recognition-api.onrender.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          console.log("Clarifai Box Response:", response);
          this.displayFaceBox(this.calculateFaceLocation(response));
          fetch('https://smartvisage-recognition-api.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch((err) => {
              console.log("Error incrementing Entries:", err);
            });

        }
      //this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch((err) => {
        console.log("Error fetching data from Clarifai API:", err);
      });
  };



  onRouteChange = (route) => {
    if (route === 'SignOut' ){
      this.setState({initialState})
    } else if (route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route}); //No matter what we want to change the route
    console.log('Route is now:', route);
  }

  render(){
    const { isSignedIn, imageUrl, route, box } = this.state;
    //To have cleaner code, use destructutring. Don't forget to omit "this.state"
    // However for education purpose, "this.state" won't be omited. 
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" className='particles' type="cobweb" bg={true} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
        ? <div> 
        <Logo/> 
        <Rank 
          name={this.state.user.name} 
          entries={this.state.user.entries}
        /> 
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onPictureSubmit={this.onPictureSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        : (
          this.state.route === 'SignIn'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
        
        }
      </div>
    );
    }
}

export default App;

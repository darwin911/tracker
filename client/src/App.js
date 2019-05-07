import React from "react";
import "./App.css";
import Header from './components/Header.jsx';
import MoodTracker from './components/MoodTracker.jsx';
import Footer from './components/Footer.jsx';
import { createUser, loginUser } from "./services/helper";
import { withRouter } from 'react-router-dom';
import decode from 'jwt-decode';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      currentUser: {
        name: '',
        email: '',
        id: '',
        picture: ''
      },
      score: 0,
      userData: {
        name: '',
        email: '',
        password: '',
        picture: ''
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    const userData = localStorage.getItem('userData');
    console.log(userData)
    if (userData) {
      const currentUser = decode(userData)
      console.log(currentUser)
      this.setState({
        isLoggedIn: true,
        currentUser
      })
    }
    // console.log(this.state.currentUser)
  }

  handleChange(e) {
    const {name, value} = e.target
    console.log('handleChange')
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }))
  }

  async handleLogin(e) {
    e.preventDefault();
    console.log('handleLogin')
    const { email, password } = this.state.userData;
    const userData = { email, password }
    const resp = await loginUser(userData);
    localStorage.setItem('userData', resp.token);
    this.setState({
      isLoggedIn: true,
      userData: {
        email: '',
        password: ''
      }
    })
    this.props.history.push('/');
  }

  handleLogout() {
    localStorage.removeItem('userData')
    this.setState({ isLoggedIn: false });
  }

  async handleRegister(e) {
    e.preventDefault();
    console.log('handleRegister')
    const { name, email, password } = this.state.userData;
    const userData = { name, email, password }
    const resp = await createUser(userData);
    console.log(resp);
  }

  render() { 
    return (
      <div className="App">
        <Header
          isLoggedIn={this.state.isLoggedIn}
          handleChange={this.handleChange}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          handleRegister={this.handleRegister} />
        {(this.state.isLoggedIn) ? <p>Welcome {this.state.currentUser.name}</p> : null}
        <MoodTracker score={this.state.score}/>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);

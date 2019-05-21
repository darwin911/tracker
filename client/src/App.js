import React from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import MoodTracker from "./components/MoodTracker.jsx";
import Footer from "./components/Footer.jsx";
import {
  createUser,
  loginUser,
  addEntry,
  getUserEntries
} from "./services/helper";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      currentUser: {
        name: "",
        email: "",
        id: "",
        picture: ""
      },
      userData: {
        name: "",
        email: "",
        password: "",
        picture: ""
      },
      userEntries: [],
      mood: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.setMood = this.setMood.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const currentUser = decode(userData);
      const userEntries = await getUserEntries({ user_id: currentUser.id });
      this.setState({
        isLoggedIn: true,
        userEntries,
        currentUser
      });
      this.props.history.push('/');
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }));
  }

  async handleLogin(e) {
    e.preventDefault();
    const { email, password } = this.state.userData;
    const userData = { email, password };
    const resp = await loginUser(userData);
    localStorage.setItem("userData", resp.token);
    this.setState({
      isLoggedIn: true,
      userData: {
        email: "",
        password: ""
      }
    });
    this.props.history.push("/");
  }

  handleLogout() {
    localStorage.removeItem("userData");
    this.setState({ isLoggedIn: false });
  }

  async handleRegister(e) {
    e.preventDefault();
    const { name, email, password } = this.state.userData;
    const resp = await createUser({ name, email, password });
    localStorage.setItem("userData", resp.token);
    this.setState({
      isLoggedIn: true,
      currentUser: {
        name: resp.userData.name,
        email: resp.userData.email,
        id: resp.userData.id
      },
      userData: {
        email: "",
        password: ""
      }
    });
    this.props.history.push("/");
  }

  async handleSubmit(e) {
    e.preventDefault();
    const resp = await addEntry({
      mood: this.state.mood,
      user_id: this.state.currentUser.id
    });
    this.setState(prevState => ({
      userEntries: [...prevState.userEntries, resp]
    }));
  }

  setMood(e) {
    // preventDefault submit when selecting mood
    e.preventDefault();
    this.setState({
      mood: e.target.value
    });
  }

  render() {
    const { isLoggedIn, currentUser, mood, userEntries } = this.state;
    return (
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleChange={this.handleChange}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          handleRegister={this.handleRegister}
        />
        {isLoggedIn ? (
          <MoodTracker
            mood={mood}
            handleSubmit={this.handleSubmit}
            setMood={this.setMood}
            userEntries={userEntries}
            currentUser={currentUser}
          />
        ) : (
          <p>Please log in</p>
        )}

        <Footer />
      </div>
    );
  }
}

export default withRouter(App);

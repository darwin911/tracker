import React from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import {
  createUser,
  loginUser,
  addEntry,
  getUserEntries
} from "./services/helper";
import { Link, Route, withRouter } from "react-router-dom";
import decode from "jwt-decode";
import moment from "moment";

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
        picture: "",
      },
      entryData: {
        date: moment(new Date()).format("YYYY-MM-DD"),
        mood: "",
        weight: "",
      },
      userEntries: [],
      err: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
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
      this.props.history.push("/");
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log('change called')
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }));
  }

  async handleLogin(e) {
    e.preventDefault();
    try {
      const { email, password } = this.state.userData;
      const userData = { email, password };
      const resp = await loginUser(userData);
      if (resp) {
        localStorage.setItem("userData", resp.token);
        this.setState({
          isLoggedIn: true,
          userData: {
            email: "",
            password: ""
          }
        });
        this.props.history.push("/");
      } else {
        this.setState({ err: "Invalid Credentials" });
      }
    } catch (error) {
      console.log(error);
    }
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
    const data = {
      user_id: this.state.currentUser.id,
      mood: this.state.entryData.mood,
      weight: parseInt(this.state.entryData.weight),
    }
    const resp = await addEntry(data);
    this.setState(prevState => ({
      userEntries: [...prevState.userEntries, resp]
    }));
  }

  handleEntryChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(prevState => {
      return {
        entryData: {
          ...prevState.entryData,
          [name]: value,
        }
      }
    })
  }

  render() {
    const { isLoggedIn, currentUser, entryData, userEntries, err, } = this.state;
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
          <Main
            entryData={entryData}
            handleSubmit={this.handleSubmit}
            handleEntryChange={this.handleEntryChange}
            userEntries={userEntries}
            currentUser={currentUser}
          />
        ) : (
          <section className="container">
            <Link to="/login">Login</Link>
            or
            <Link to="/register">Register</Link>
            <p style={{ color: "red" }}>{err && err}</p>
            {!isLoggedIn && (
              <>
                <Route
                  path="/login"
                  render={props => (
                    <LoginForm
                      handleChange={this.handleChange}
                      handleLogin={this.handleLogin}
                    />
                  )}
                />
                <Route
                  path="/register"
                  render={() => (
                    <RegisterForm
                      handleChange={this.handleChange}
                      handleRegister={this.handleRegister}
                    />
                  )}
                />
              </>
            )}
          </section>
        )}

        <Footer />
      </div>
    );
  }
}

export default withRouter(App);

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
      entryData: {
        mood: "",
        exercise: false,
        memo: ""
      },
      userEntries: [],
      err: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.toggleExercise = this.toggleExercise.bind(this);
  }

  async componentDidMount() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const currentUser = decode(userData);
      // attempts to get userEntries from server
      let userEntries = [];
      try {
        userEntries = await getUserEntries({ user_id: currentUser.id });
      } catch (err) {
        console.error("Failed to retrieve user entries", err);
      }
      // will set isLogged in and currentUser with decoded token from local storage, but will leave userEntries as empty array (if it fails)
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
        const userEntries = await getUserEntries({ user_id: resp.userData.id });
        this.setState({
          isLoggedIn: true,
          currentUser: resp.userData,
          userData: {
            email: "",
            password: ""
          },
          userEntries
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
    this.setState({
      isLoggedIn: false,
      userEntries: []
    });
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
    const { currentUser, entryData } = this.state;
    const data = {
      user_id: currentUser.id,
      mood: entryData.mood,
      exercise: entryData.exercise,
      memo: entryData.memo
    };
    const resp = await addEntry(data);
    this.setState(prevState => ({
      entryData: {
        mood: 0,
        exercise: false,
        memo: ""
      },
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
          [name]: value
        }
      };
    });
  }

  toggleExercise() {
    this.setState(prevState => ({
      entryData: {
        ...prevState.entryData,
        exercise: !this.state.entryData.exercise
      }
    }));
  }

  render() {
    const {
      isLoggedIn,
      currentUser,
      entryData,
      userEntries,
      err,
      exercise,
      memo
    } = this.state;
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
            toggleExercise={this.toggleExercise}
            exercise={exercise}
            memo={memo}
          />
        ) : (
          <section className="container">
            <Route
              exact
              path="/"
              render={() => (
                <>
                  <Link to="/login">Login</Link>
                  or
                  <Link to="/register">Register</Link>
                  <p style={{ color: "red" }}>{err && err}</p>
                </>
              )}
            />

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

// import { useState } from 'react'
import Message from "./components/Message";
import Nav from "./components/Nav";
import Search from "./components/Search";
import "./App.css";
import { useEffect, useState } from "react";

const CLIENT_ID = "bf1874d2a49cecb96d55";
function App() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Keep track of the url parameters to identify if code has been sent back from github
    // i.e. localhost:5173?code=xxxxxx
    // The code will be used to get the access token from the API.
    // We'll keep the token in the local storage for now so we can reuse it for succeeding API calls and session persistence.
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              getUserData();
            }
          });
      }
      getAccessToken();
    } else if (localStorage.getItem("accessToken") !== null) {
      getUserData();
    }
  }, []);

  // Get user data from the backend
  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"), //Bearer Access Token
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUserData(data);
        setRerender(!rerender);
      });
  }

  // Redirect the login to github using the client id
  // If successful, github will redirect back and include a code that we can use to get the access token via the API
  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }

  return (
    <div className="App">
      <Nav />
      <hr />
      {localStorage.getItem("accessToken") ? (
        <>
          <div className="row justify-content-md-center">
            <div className="col-md-auto">
              <div className="row">
                {Object.keys(userData).length !== 0 ? (
                  <>
                    <h5 className="text-center">{userData.login}</h5>
                    <p className="text-center">{userData.html_url}</p>
                  </>
                ) : (
                  <>
                    <h2>No user data found</h2>
                  </>
                )}
              </div>
              <div className="row">
                <Search />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row justify-content-md-center">
            <div className="col-md-auto">
              <Message />
              <button className="btn btn-dark" onClick={loginWithGithub}>
                Login
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

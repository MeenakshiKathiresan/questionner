import { URLS } from "../constants/urls";
import axios from "axios";

const user = {};

const login = () => {
    window.open("http://localhost:5000/auth/google", "_self");
};

const logout = () => {
    const targetUrl = URLS.baseUrl + URLS.logOut;

 
        try {
          window.open(targetUrl, "_self");
          
        } catch (error) {
          console.log(error);
        }
    user = {}
};

const getUser = async (setUser) => {
  if (user) {
    return user;
  } else {
    const targetUrl = URLS.baseUrl + URLS.loginSuccess;

    await axios
      .get(targetUrl, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data, " from profile service");
         user = response.data.user ;
        setUser(user)

      });
  }
};

export {login, logout, getUser}
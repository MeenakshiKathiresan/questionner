import { URLS } from "../constants/urls";
import axios from "axios";

let user = null;

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
  user = null;
};

const getUser = async (setUser) => {
  if (user) {
    setUser(user);
  } else {
    const targetUrl = URLS.baseUrl + URLS.loginSuccess;

    await axios
      .get(targetUrl, {
        withCredentials: true,
      })
      .then((response) => {
        user = response.data.user;
        setUser(user);
      });
  }
};



const getUserStats = async (user, setStats) => {
  const reqUrl = URLS.baseUrl + URLS.userStats +`?user=${user}`;

  await axios
    .get(reqUrl)
    .then((response) => {
      const stats = response.data;
      setStats(stats);
    });
};

const getUserWithId = async ( id ,setUserData) =>{
  const reqUrl = URLS.baseUrl + URLS.users + '/'+id
  await axios.get(reqUrl).then((response) =>{
    const user = response.data;
    setUserData(user);
  })
}

export { login, logout, getUser, getUserStats, getUserWithId };

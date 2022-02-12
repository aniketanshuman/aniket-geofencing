import React, { useState, useEffect, useContext, createContext } from "react";
import { createUser } from "./database";
import firebase from "./firebase";
import cookie from "js-cookie";
import Router from "next/router";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set("geofence-auth", true, {
        expires: 1,
      });

      return user;
    } else {
      setUser(false);
      cookie.remove("geofence-auth");
      return false;
    }
  };


  const signinwithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((response) => {
        Router.push("/");
        handleUser(response.user);
      });
  };

  const signinwithFacebook = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    console.log('aniket')
    return firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((response) => {
        Router.push("/");
        handleUser(response.user);
      });
  };


  const signinwithGithub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    console.log('aniket -github')
    return firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((response) => {
        Router.push("/");
        handleUser(response.user);
      });
  };

  const signout = () => {
    Router.push("/");
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        handleUser(user);
      } else {
        handleUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinwithGoogle,
    signinwithGithub,
    signinwithFacebook,
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token: user.za,
    lat: 0,
    long: 0,
  };
};
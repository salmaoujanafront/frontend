import Image from "next/image";
import Link from "next/link";
import { BsEnvelope } from "react-icons/bs";
import { RiKey2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const googleAuth = async () => {
    await window.open(
      "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/google/callback",
      "_blank"
    );
    console.log("hello");
    // alert("Hello");
  };
  const facebookAuth = async () => {
    await window.open(
      "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/facebook/callback",
      "_blank"
    );
    console.log("hello");
    // alert("Hello");
  };

  const signIn = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/sign-in",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (res.status == "200") {
      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      // router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
      const token = localStorage.getItem("accessToken");
      if (token != null) {
        let jwtSecretKey = "gfg_jwt_secret_key";
        const user = jwt.verify(token, jwtSecretKey);
        localStorage.setItem("username", user.name);

        if (user.userType === "User") {
          router.push("https://dsp-archiwebo21-ss-da-om-en.fr/viewuser");
        } else if (user.userType === "Admin") {
          router.push(
            "https://dsp-archiwebo21-ss-da-om-en.fr/admin/home"
          );
        } else if (user.userType === "Employee") {
          router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
        } else {
          router.push("https://dsp-archiwebo21-ss-da-om-en.fr/viewuser");
        }
      }
    } else if (res.status == "422") {
      alert("Invalid Email or Password");
    }
  };

  const isAuthenticated = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token != null) {
        let jwtSecretKey = "gfg_jwt_secret_key";
        const user = jwt.verify(token, jwtSecretKey);
      } else {
        console.log("Not log");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <>
      <div>
        <Header />
        <main>
          <div className="container">
            <form action="#" className="sign">
              <h1>Connexion</h1>
              <div className="fild">
                <div className="i">
                  <BsEnvelope />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="fild">
                <div className="i">
                  <RiKey2Fill />
                </div>
                <input
                  type="password"
                  placeholder="Mot de passe "
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="submit"
                onClick={(e) => {
                  signIn(e);
                }}
              >
                Connexion
              </button>
              <div className="social">
                <button
                  onClick={(e) => {
                    googleAuth();
                  }}
                >
                  <img src="/google.svg" /> Google
                </button>
                <button   onClick={(e) => {
                    facebookAuth();
                  }}>
                  <img src="/fb.svg" /> Facebook
                </button>
              </div>
              <p className="ask">
              vous n'avez pas de compte ? <a href="/signup">S'inscrire</a>
              </p>
            </form>
          </div>
          {/* <footer className="notfixedFooter">
          <div className="container"></div>
        </footer> */}
        </main>
      </div>
    </>
  );
};

export default Login;

import { BsEnvelope } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegIdCard } from "react-icons/fa";
import { RiKey2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import Link from "next/link";
import Header from "../components/Header";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [passportNumber, setPassport] = useState();
  const [password, setPassword] = useState();
  const [isSocialSign, setSocialSign] = useState(false);
  const router = useRouter();

  const getUser = async () => {
    try {
      const url =
        "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/google/login/success";
      const res = await fetch(url, {
        credentials: "include",
        method: "get",
        mode: "cors",
      });
      const data = await res.json();

      if (!data.error) {
        if (data.isAlreadySignUp) {
          localStorage.setItem("accessToken", data.accessToken);
          router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
        } else {
          if(!data.user._json.email){
            return    await getuserFb()
          }
          setEmail(data.user._json.email);
          setName(data.user._json.name);
          setSocialSign(true);
        }
      }else{
        await getuserFb()
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getuserFb = async () => {
    try {
      const url =
        "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/facebook/login/success";
      const res = await fetch(url, {
        credentials: "include",
        method: "get",
        mode: "cors",
      });
      const data = await res.json();

      if (!data.error) {
        if (data.isAlreadySignUp) {
          localStorage.setItem("accessToken", data.accessToken);
          router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
        } else {
          setEmail(data.user._json.email);
          setName(data.user._json.name);
          setSocialSign(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const isAuthenticated = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token != null) {
        let jwtSecretKey = "gfg_jwt_secret_key";
        const user = jwt.verify(token, jwtSecretKey);

        if (user.userType === "User") {
          router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
        } else if (user.userType === "Admin") {
          router.push(
            "https://dsp-archiwebo21-ss-da-om-en.fr/admin/home"
          );
        } else if (user.userType === "Employee") {
          router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
        } else {
          router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
        }
      } else {
        console.log("Not log");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isAuthenticated();
    getUser();
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/sign-up",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
          passportNumber: passportNumber,
        }),
      }
    );

    if (res.status == "200") {
      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      alert("Successfully Registered");
      router.push("https://dsp-archiwebo21-ss-da-om-en.fr/viewuser");
    } else {
    }
  };

  const googleAuth = () => {
    window.open(
      "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/google/callback",
      "_self"
    );
    // alert("Hello");
  };

  const facebookAuth = () => {
    window.open(
      "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/facebook/callback",
      "_self"
    );
    // alert("Hello");
  };

  return (
    <>
      <div>
        <Header />
        <main>
          <div className="container">
            <form action="#" className="sign">
              <h1>S'inscrire</h1>
              <div className="fild">
                <div className="i">
                  <AiOutlineUser />
                </div>
                <input
                  type="text"
                  placeholder="Nom"
                  value={name}
                  disabled={isSocialSign ? true : false}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="fild">
                <div className="i">
                  <BsEnvelope />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  disabled={isSocialSign ? true : false}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="fild">
                <div className="i">
                  <FaRegIdCard />
                </div>
                <input
                  type="text"
                  placeholder="Piece d’identité"
                  onChange={(e) => setPassport(e.target.value)}
                />
              </div>

              {/* <div className="fild">
                <div className="i">
                  <RiKey2Fill />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div> */}
              {isSocialSign === false ? (
                <div className="fild">
                  <div className="i">
                    <RiKey2Fill />
                  </div>

                  <input
                    type="password"
                    placeholder="Mot de passe "
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              ) : null}

              <button className="submit" onClick={(e) => signUp(e)}>
              S'inscrire
              </button>

              {/* <div className="social">
                <button
                  onClick={(e) => {
                    googleAuth();
                  }}
                >
                  <img src="/google.svg" alt="" /> Google
                </button>
                <button>
                  <img src="/fb.svg" alt="" /> Facebook
                </button>
              </div> */}

              {/* <p className="ask">
                Already have an account? <a href="/login">Login</a>
              </p> */}
              {isSocialSign === false ? (
                <>
                  <div className="social">
                    <button
                      onClick={(e) => {
                        googleAuth();
                      }}
                    >
                      <img src="/google.svg" alt="" /> Google
                    </button>

                    <button
                      onClick={(e) => {
                        facebookAuth();
                      }}
                    >
                      <img src="/fb.svg" alt="" /> Facebook
                    </button>
                  </div>

                  <p className="ask">
                  Vous avez déjà un compte? <a href="/login">Connexion</a>
                  </p>
                </>
              ) : null}
            </form>
          </div>
        </main>
        {/* <footer>
          <div className="container"></div>
        </footer> */}
      </div>
    </>
  );
};

export default Signup;

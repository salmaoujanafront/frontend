import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { logout, userDetails } from "../components/UserFacade";

const WhiteHeader = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [navActive, setNavActive] = useState(false);
  useEffect(() => {
    setUser(userDetails())
    },[])
  return (
    <header className="">
      <div className="container">
        <div>
          <div className="logo">
            <Link href="/">
              <img src="/logo.svg" alt="" />
            </Link>
          </div>
        </div>
        <div>
          <div className={navActive ? "links active" : "links"}>
            <Link href="/" className="active" style={{color:"black"}}>
            Accueil 
            </Link>
            <Link href="/legalnotice" style={{color:"black"}}>Règle du jeu </Link>
          </div>
        </div>
        <div className="outerdd">
          <div className="dd">
            {user == null ? (
              <Link href="/login">
                <button>Connexion</button>
              </Link>
            ) : (
              <div>
               <Link href={user.userType == "Admin" ? "/admin/home" : user.userType == "Employee" ? "/employee/changeprizestatus" :"/viewuser"}>
                  <button>
                    {/* <FaUserTie /> */}
                    {user.name}
                  </button>
                </Link>
              </div>
            )}
            <i
              className="uil uil-align-center-alt menu"
              onClick={() => {
                setNavActive((pre) => !pre);
              }}
            ></i>
          </div>
          {/* <div className="dd">
                {user != null ? (
                  <button
                    onClick={() => {
                      logout();
                      setUser(null);
                    }}
                  >
                    Log Out
                  </button>
                ) : null}

                <i className="uil uil-align-center-alt menu"></i>
              </div> */}
        </div>
      </div>
    </header>
  );
};

export default WhiteHeader;

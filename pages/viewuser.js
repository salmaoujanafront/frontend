import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import WhiteHeader from "/components/WhiteHeader";
import jwt from "jsonwebtoken";
import axios from "axios";
import { logout, userDetails } from "../components/UserFacade";
import { useRouter } from "next/router";

const ViewUser = () => {
  const [data, setData] = useState([]);
  const router = useRouter()

  useEffect(() => {
    // const contestId = localStorage.getItem("contestId");
    axios
      .get(
        "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/users/" +
          userDetails().userId
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      });
  }, []);


  const deleteAccout = async (e) => {
    let user = userDetails();
    e.preventDefault();
   
    const res = await fetch(
      "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/users/" + user.userId,
      {
        method: "delete",
      }
    );

    if (res.status == "204") {
      alert("Successfully delete your account");
      logout();
      router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
    } else if (res.status == "422") {
      alert("Somthing is wrong!");
    }
  };

  return (
    <div>
      <div className="headercontainer">
        <WhiteHeader />
      </div>

      <section id="user-dashboard">
        <div className="container">
          <div className="block active">
            <br />
            <br />
            <div className="user-profile">
              <h2>Détails de l'utilisateur</h2>
              <div className="item">
                <i className="uil uil-user"></i>
                <p>Nom &nbsp;&nbsp; : {data.name}</p>
              </div>
              <div className="item">
                <i className="uil uil-envelope"></i>
                <p>E-mail &nbsp;&nbsp;&nbsp;&nbsp;: {data.email}</p>
              </div>
              <div className="buttons">
                <Link href="/edituser">
                  <button style={{ backgroundColor: "#008039" }}>
                  Modifier les détails
                  </button>
                </Link>
                <button  onClick={() => {
                      logout();
                      router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
                    }}
                    >Supprimer le compte</button>
              </div>
              <div className="buttons">
                <button onClick={() => router.push("/viewhistory")}>History</button>
                <button style={{backgroundColor:"tomato"}} onClick={deleteAccout}>Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </div>
  );
};

export default ViewUser;

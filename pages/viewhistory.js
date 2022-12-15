import { useState, useEffect } from "react";
import WhiteHeader from "/components/WhiteHeader";
import axios from "axios";

import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const viewHistory = () => {
  const router = useRouter();

  const [userId, setUserId] = useState();
  const [activeContestEndDate, setActiveContestEndDate] = useState();

  const isAuthenticated = async () => {};

  const [data, SetData] = useState([]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    let userid;
    let userType;
    try {
      let username = localStorage.getItem("username");
      setUserName(username);
      const token = localStorage.getItem("accessToken");
      if (token != null) {
        let jwtSecretKey = "gfg_jwt_secret_key";
        const user = jwt.verify(token, jwtSecretKey);
        userid = user.userId;
        userType = user.userType;
        setUserId(user.userId);
      } else {
        router.push("https://dsp-archiwebo21-ss-da-om-en.fr/login");
      }
    } catch (err) {
      console.log(err);
      router.push("https://dsp-archiwebo21-ss-da-om-en.fr/login");
    }

    if (userType === "Admin") {
      router.push("https://dsp-archiwebo21-ss-da-om-en.fr/admin/home");
    } else if (userType === "Employee") {
      router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
    } else {
      axios
        .get(
          `https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/users/` +
            userid +
            `/history-requests`
        )
        .then((response) => {
          SetData(response.data);
          if (response.data.length > 0) {
            let endDate = response.data
              .filter((item) => item.contestStatus === "Active")
              .map((element) => element.contestEndDate);
            let date = new Date(endDate[0]);

            let format =
              date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
            setActiveContestEndDate(format);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <div className="headercontainer">
        <WhiteHeader />
      </div>

      <div className="viewhistorycontainer">
        <div className="contest-result">
          <h2>
          le résultat le plus coûteux sera publié le{" "}
            <span>{activeContestEndDate}</span>
          </h2>
        </div>
        <div className="winning-order">
          <h2>Votre statut de prix gagnant</h2>
          <div className="table">
            <table>
              <tbody>
                <tr>
                  <th>Numéro du prix</th>
                  <th>Nom du prix</th>
                  <th>Statut</th>
                </tr>

                {data.length > 0 &&
                  data
                    .filter(
                      (item) =>
                        item.prize.length > 0 && item.contestStatus === "Active"
                    )
                    .map((myprize, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{myprize.prize}</td>
                        <td>{myprize.prizeStatus}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="history">
          <h2>Votre historique de concours</h2>
          <div className="table">
            <table>
              <tbody>
                <tr>
                  <th>Nom du coût le plus élevé</th>
                  <th>Date</th>
                  <th>Prix</th>
                  <th>Tirage au sort du concours</th>
                </tr>
                {data.length > 0 &&
                  data
                    .filter(
                      (item) =>
                        (item.prize.length > 0 &&
                          item.contestStatus === "InActive") ||
                        item.contestStatus === "End"
                    )
                    .map((history, index) => (
                      <tr key={index}>
                        <td>{history.contestName}</td>
                        <td>{history.contestEndDate}</td>
                        <td>{history.prize}</td>
                        <td>{history.mainPrizeResult}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default viewHistory;

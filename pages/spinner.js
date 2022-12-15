import { useState, useEffect } from "react";
import WhiteHeader from "/components/WhiteHeader";
import WheelComponent from "react-wheel-of-prizes";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
// import 'react-wheel-of-prizes/dist/index.css'
import axios from "axios";
import CountdownTimer from "../components/CountdownTimer";

const Spinner = () => {
  const router = useRouter();
  const [segmants, setSegmants] = useState([]);
  const [segColor, setSegColor] = useState([]);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [dateTimeAfterThreeDays, setDate] = useState();
  let tried = false;
  useEffect(() => {
    if (localStorage.getItem("ticketId") == null) {
      router.push("/viewhistory");
    }
    getPrices();
    let username = localStorage.getItem("username");
    setUserName(username);
  }, []);

  const getPrices = async () => {
    const contestId = localStorage.getItem("contestId");
    await axios
      .get(
        `https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/contests/` + contestId
      )
      .then((response) => {
        if (response.data.chooseprices.length > 0) {
          setSegmants(response.data.chooseprices);
          setColorsDynamically(response.data.chooseprices.length);

          let time = new Date(response.data.endDate).getTime();
          setDate(time);
        }
      });
  };

  const setColorsDynamically = (len) => {
    //  console.log(segments.length);
    const colors = [];
    for (let i = 0; i < len; i++) {
      colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
    }
    setSegColor(colors);
  };

  //   const segColors = [
  //     "#EE4040",
  //     "#F0CF50",
  //     "#815CD1",
  //     "#3DA5E0",
  //     "#34A24F",
  //     "#F9AA1F",
  //     "#EC3F3F",
  //     "#FF9000"
  //   ];
  const onFinished = (winner) => {
    // console.log(winner);
    alert(`Winner is ${winner}`);
    let userId;
    const contestId = localStorage.getItem("contestId");
    const ticketId = localStorage.getItem("ticketId");
    const token = localStorage.getItem("accessToken");

    if (token != null) {
      let jwtSecretKey = "gfg_jwt_secret_key";
      const user = jwt.verify(token, jwtSecretKey);
      userId = user.userId;
    } else {
      console.log("Not log");
    }

    const data = {
      userId: userId,
      contestId: contestId,
      ticketId: ticketId,
      price: winner,
    };

    axios
      .post(
        "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/contest-participents",
        data
      )
      .then((response) => {
        console.log(response.data);
        if (response.status == "204") {
          localStorage.removeItem("ticketId");
          localStorage.removeItem("contestId");
          router.push("https://dsp-archiwebo21-ss-da-om-en.fr/viewhistory");
        }
      });
  };

  return (
    <>
      <div className="headercontainer">
        <WhiteHeader username={userName} />
      </div>

      <section id="user-dashboard" className="viewhistorycontainer">
        <div className="container">
          <div className="block active">
            <div className="prize-board">
              {segmants.length > 0 ? (
                <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              ) : null}
              <h2>Prix</h2>
              <div className="table">
                <table>
                  <tbody>
                    <tr>
                      <th>Numéro</th>
                      <th>Nom du prix</th>
                    </tr>
                    {segmants?.map((prize, index = 0) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{prize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {segmants.length > 0 ? (
              <div>
                <WheelComponent
                  segments={segmants}
                  segColors={segColor}
                  onFinished={(winner) => onFinished(winner)}
                  primaryColor="black"
                  contrastColor="white"
                  buttonText="Spin"
                  isOnlyOnce={true}
                  size={290}
                  upDuration={500}
                  downDuration={600}
                  fontFamily="Arial"
                />
              </div>
            ) : (
              <div> Vous avez déjà joué</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Spinner;

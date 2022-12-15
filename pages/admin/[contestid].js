import { useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import ProtectedRoute from "../../components/ProtectedRoute";

const ViewCurrentContest = () => {
  const router = useRouter();
  const { contestid } = router.query;
  // console.log("contestid :", contestid);
  const [contest, setContest] = useState([]);

  useEffect(() => {
    const contestId = localStorage.getItem("contestId");
  if(contestid){
    axios
    .get(
      "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/contests/" + contestid
    )
    .then((response) => {
      console.log(response.data);
      setContest(response.data);
    });
  }

    console.log("www", contest.name);
  }, [contestid]);

  return (
   <ProtectedRoute>
     <SideMenu />
      <div className="main-wrap">
        <div className="wrapSection">
          <div className="block active">
            <div className="contest-list">
              <div className="headerwithbutton">
                <div>
                  <h2>Concours en cours : {}</h2>
                </div>
                <div>
                  <Link href="/admin/contestlist">
                    <button> Retour </button>
                  </Link>
                </div>
              </div>
              <div className="contest-board">
                <h2>{contest.name}</h2>
                <div className="table">
                  <div className="outerrow">
                    <div className="viewtb">Nom du concours : </div>{" "}
                    <div>{contest.name}</div>
                  </div>
                  <div className="outerrow">
                    <div className="viewtb">Date de début : </div>{" "}
                    <div>{contest.startDate}</div>
                  </div>
                  <div className="outerrow">
                    <div className="viewtb">Date de fin : </div>{" "}
                    <div>{contest.endDate}</div>
                  </div>
                  <div className="outerrow">
                    <div className="viewtb">Statut : </div>{" "}
                    <div>{contest.status}</div>
                  </div>
                </div>
              </div>

              {/* "_id": "638e42cd0df95ba76b7e865c",
    "name": "Green Card",
    "startDate": "2022-12-06T00:41",
    "endDate": "2022-12-31T00:41",
    "ticketNumbers": 20,
    "chooseprices": [
        "tea infuser",
        "detox tea",
        "signature tea",
        "discovery box worth €39",
        "discovery box worth €69"
    ],
    "mainPrice": "tea worth €360",
    "status": "Active",
    "createdAt": "2022-12-05T19:13:17.900Z",
    "updatedAt": "2022-12-05T19:13:17.900Z",
    "__v": 0 */}
            </div>
          </div>
        </div>
      </div>
   </ProtectedRoute>
  );
};

export default ViewCurrentContest;

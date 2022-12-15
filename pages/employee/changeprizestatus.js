import SideMenu from "../../components/SideMenu";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BsPlusLg } from 'react-icons/bs';
import axios from "axios";
import { BiEditAlt } from 'react-icons/bi';


const ChangePrizeSTatus = () => {
  const [users, setUsers] = useState([]);
  const getUserList = async () => {
    await axios
      .get("https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/contest-participents")
      .then((response) => setUsers(response.data));
  };

  const updateParticipent = async (userId,ticketId) =>{
    await axios.put("https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/update-participents",{userId,ticketId});
    getUserList()
  }
  useEffect(() => {
getUserList()
  },[])
    return ( 
        <div>
      {/* <SideMenu /> */}
      <div className="main-wrap">
        <div className="wrapSection">
          <div className="block active">
            <div className="contest-list">
              <div className="headerwithbutton">
                <div><h2>Contest Participents</h2></div>
                <div>
                <div className="search">
                <input type="text" placeholder="Search" onChange={(e)=>search(e.target.value)} />
                <button>
                  <FaSearch />
                </button>
              </div>
                </div>
                
                </div>
                {/* _id
6399fc75e03ef26841efca38
userId
"639411b583b9e3729935e54d"
ticketId
"0132788243"
contestId
"6399f91be03ef26841d8e69d"
prize
"signature tea"
prizeStatus
"Pending"
mainPrizeResult
"Loose" */}
              <div className="table">
                <table>
                  <tbody>
                    <tr>
                      <th>Nom</th>
                      <th>E-mail</th>
                      <th>ID de billets</th>
                      <th>Prix</th>
                      <th>Statut du prix</th>
                    </tr>
                    {users?.filter((item) => item.prize !== "").map((v,key) => (
 <tr key={key}>
 <td>{v.name}</td>
 <td>{v.email}</td>
 <td>{v.ticketId}</td>
 <td>{v.prize}</td>
 <td>
  {v.prizeStatus != "Delivered" ? <center><button onClick={() => updateParticipent(v.userId,v.ticketId)}>Delivered</button></center> : v.prizeStatus}
  
  </td>
</tr>
                    ))}
                   

                    {/* {!isSearch? users.map((users) => (
                      <tr key={users.id}>
                        <td>{users.name}</td>
                        <td>{users.email}</td>
                        <td>{users.ticketId}</td>
                        <td>{users.prize}</td>
                      </tr>
                    )):searchUsers.map((users) => (
                      <tr key={users.id}>
                        <td>{users.name}</td>
                        <td>{users.email}</td>
                        <td>{users.ticketId}</td>
                        <td>{users.prize}</td>
                      </tr>
                    )) } */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     );
}
 
export default ChangePrizeSTatus;
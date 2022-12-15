import { useEffect, useState } from "react";
import axios from "axios";
import sortFn from "../utils/sortFn";
const UserData = ({ searchText = '', sort = ''}) => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setsearchUsers] = useState([]);
  const [isSearch, setsearch] = useState(false);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    await axios
      .get("https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/contest-participents")
      .then((response) => setUsers(response.data));
  };

  const search = (value) => {
    console.log(value);
    let searchUsers = users.filter(
      (item) => item.name == value || item.email == value
    );
    console.log(searchUsers);
    if (value == "") {
      console.log("awa");
      setsearch(false);
      getUserList();
    } else {
      console.log("awa-1");
      // setUsers(searchUsers);
      setsearchUsers(searchUsers);
      setsearch(true);
    }
  };

  return (
    <div className="table">
      <table>
        <tbody>
          <tr>
            <th>Nom</th>
            <th>E-mail</th>
            <th>ID de billets</th>
            <th>Prix</th>
          </tr>

          {!isSearch
            ? sortFn(sort, users
                .filter((item) => item.prize !== "" && item.name.toLowerCase().includes(searchText.toLowerCase())))
                .map((users,key) => (
                  <tr key={key}>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>{users.ticketId}</td>
                    <td>{users.prize}</td>
                  </tr>
                ))
            : searchUsers
                .filter((item) => item.prize !== "" && item.name.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => sort === 'aToZ' ? 1 : sort === 'zToA' ? -1 : 0 )
                .map((users,key) => (
                  <tr key={key}>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>{users.ticketId}</td>
                    <td>{users.prize}</td>
                  </tr>
                ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;

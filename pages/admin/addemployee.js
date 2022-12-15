import SideMenu from "../../components/SideMenu";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

import Link from "next/link";
import axios from "axios";

import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import ProtectedRoute from "../../components/ProtectedRoute";
import Filters from "../../components/Filters";
import sortItems from "../../utils/sortFn";

const AddEmployee = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('')
  const handleSearch = (e) => setSearch(e.target.value)
  

  const handleSort = e => setSort(e.target.value)


  const [employees, setemployees] = useState([]);

  useEffect(() => {
    let userid;
    let userType;
    try {
      const token = localStorage.getItem("accessToken");
      if (token != null) {
        let jwtSecretKey = "gfg_jwt_secret_key";
        const user = jwt.verify(token, jwtSecretKey);
        userid = user.userId;
        userType = user.userType;
        console.log(user);
      } else {
        console.log("ELSE");
        router.push("https://dsp-archiwebo21-ss-da-om-en.fr/login");
      }
    } catch (err) {
      console.log(err);
      console.log("CATCH");
      router.push("https://dsp-archiwebo21-ss-da-om-en.fr/login");
    }

    if (userType === "User") {
      router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
    } else if (userType === "Employee") {
      router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
    } else {
      getempList();
    }
  }, []);

  const getempList = async () => {
    await axios
      .get(`https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/users`)
      .then((response) => {
        setemployees(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteRecord = (id) => {
    console.log("delete this id :", id);
    axios
      .delete("https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/users/" + id)
      .then((response) => {
        console.log(id);
        getempList();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
  <ProtectedRoute>
     <div>
        <SideMenu />
        <div className="main-wrap">
          <div className="wrapSection">
            <div className="block active">
              <div className="contest-list">
                <div className="headerwithbutton">
                  <div>
                    <h2>Des employés</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center',  gap: '1rem'}}>
                  <Filters handleSearch={handleSearch} handleSort={handleSort} />
                    <Link href="/admin/createemployee">
                      <button>
                        <BsPlusLg /> Nouvel employé
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="table">
                  <table>
                    <tbody>
                      <tr>
                        <th>NamNome</th>
                        <th>E-mail</th>
                        <th>Effacer</th>
                      </tr>
                      {employees.length > 0 &&
                        sortItems(sort, employees
                          .filter((item) => item.userType === "Employee" && item.name.toLowerCase().includes(search.toLowerCase())))
                          .map((employee, index) => (
                            <tr key={index}>
                              <td>{employee.name}</td>
                              <td>{employee.email}</td>
                              <td>
                                <center>
                                  <div className="smalldelete">
                                    <button
                                      onClick={() => deleteRecord(employee._id)}
                                    >
                                      <RiDeleteBin6Line />
                                    </button>
                                  </div>
                                </center>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </ProtectedRoute>
  );
};

export default AddEmployee;

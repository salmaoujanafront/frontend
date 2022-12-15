import { useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import { BsPlusLg } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { useRouter } from "next/router";
import ProtectedRoute from "../../components/ProtectedRoute";
import Filters from "../../components/Filters";
import sortItems from "../../utils/sortFn";

const AddPrizes = () => {
  const router = useRouter();
  const [prizes, SetPrizes] = useState();
  const [name, SetName] = useState();
  const [winningChance, SetWinningChance] = useState();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('')
  const handleSearch = (e) => setSearch(e.target.value)
  

  const handleSort = e => setSort(e.target.value)
  useEffect(() => {
    if (localStorage.getItem("accessToken") == null) {
      router.push("https://dsp-archiwebo21-ss-da-om-en.fr/login");
    }
    getPrices();
  }, []);

  const getPrices = () => {
    axios
      .get("https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/prices")
      .then((response) => {
        SetPrizes(response.data);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = { name, winningChance };
    const res = await fetch(
      "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/prices",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(price),
      }
    ).then((res) => {
      getPrices();
      SetName("");
      SetWinningChance("");
    });
  };

  const deleteRecord = async (id) => {
    console.log("delete this id :", id);
    await axios
      .delete(`https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/prices/${id}`)
      .then((response) => {
        getPrices();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
   <ProtectedRoute>
     <SideMenu />
      <div className="block active">
        <div className="prize-board">
        <Filters handleSearch={handleSearch} handleSort={handleSort} />
          <h2>Prix</h2>
          <div className="table">
            <table>
              <tbody>
                <tr>
                  <th>Numéro</th>
                  <th>Nom du prix</th>
                  <th>Chance de gagner</th>
                  <th>EffacerDelete</th>
                </tr>
                {sortItems(sort, prizes?.filter(prize => prize.name.toLowerCase().includes(search.toLowerCase())))
                ?.map((prize, index = 0) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{prize.name}</td>
                    <td>{prize.winningChance}%</td>
                    <td>
                      <center>
                        <div className="smalldelete">
                          <button onClick={() => deleteRecord(prize.id)}>
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
        <form action="#">
          <div className="add">
            <input
              type="text"
              placeholder="Prize name"
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Winning chance in %"
              value={winningChance}
              onChange={(e) => SetWinningChance(e.target.value)}
            />
            <button onClick={handleSubmit}>
              <BsPlusLg /> Ajouter un élément de liste
            </button>
          </div>
        </form>
      </div>
   </ProtectedRoute>
  );
};

export default AddPrizes;

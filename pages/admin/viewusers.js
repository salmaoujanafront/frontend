import SideMenu from "../../components/SideMenu";
import UserData from "../../components/UsersData";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useState } from "react";
import Filters from "../../components/Filters";


const ViewUsers = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('')
  const handleSearch = (e) => setSearch(e.target.value)
  

  const handleSort = e => {
    setSort(e.target.value)
  }

  return (
  <ProtectedRoute>
  <>
       <SideMenu />
      <div className="main-wrap">
        <div className="wrapSection">
          <div className="block active">
            <div className="contest-list">
              <div className="headerwithbutton">
                <div><h2>Participants au concours</h2></div>
                <Filters handleSearch={handleSearch} handleSort={handleSort} />
                
                </div>
                
                <UserData searchText={search} sort={sort} />
            </div>
          </div>
        </div>
      </div></>
  </ProtectedRoute>
  );
};

export default ViewUsers;

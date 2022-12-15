import SideMenu from "../../components/SideMenu";
import { HiUsers } from "react-icons/hi";
import { FaTicketAlt } from "react-icons/fa";
import { PieChart } from "react-minimal-pie-chart";
import UserData from "../../components/UsersData";
import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedRoute from "../../components/ProtectedRoute";

const home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    await axios
      .get("https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/dashbord-data")
      .then((response) => setData(response.data));
  };
  // console.log(data);
  return (
   <ProtectedRoute>
     <div className="home">
      <SideMenu />
      {/* Top Bar */}
      <div className="topbar">
        <h1>@thetiptop</h1>
        <div className="admin-info">
          <h2>Nassim El aoufin</h2>
          <p>admin</p>
        </div>
      </div>

      <div className="line"></div>

      {/* counter */}
      <div className="client-info">
        <div className="total-client c">
          <h4>total des clients</h4>
          <h2>{data ? data.totalParticipent : "..."}</h2>
          <HiUsers className="icon-c" />
        </div>
        <div className="total-employee c">
          <h4>Total des employés</h4>
          <h2>{data ? data.totalEmpoly : "..."}</h2>
          <HiUsers className="icon-c" />
        </div>
      </div>

      {/* Graphs*/}
      <div className="graphs">
        <div>
          <div className="total-tickets">
            <h3>Nombre total des billets</h3>
            <div>
              <h4>total des tickets</h4>
              <h2>{data ? data.totalTicket : "..."}</h2>
              <FaTicketAlt className="icon-t" />
            </div>
          </div>

          <div className="total-tickets">
            <h3>Total des billets restants</h3>
            <div style={{ backgroundColor: "red" }}>
              <h4>Total des tickets restants </h4>
              <h2>{data ? data.totalTicketLeft : "..."}</h2>
              <FaTicketAlt className="icon-t" />
            </div>
          </div>
        </div>

        {/* Ticket Percentage */}
        <div className="ticket-percentage">
          <h3>statistiques sur les tickets</h3>
          <div className="ticket-graph">
            <div className="graph-item">
              <div className="ticket-graph t"></div>
              <h4>Tickets restants {Math.ceil((data?.totalTicketLeft / data?.totalTicket) * 100)}</h4>
            </div>
            <div className="graph-item">
              <div className="ticket-non-graph t"></div>
              <h4>Tickets utilisés 6%</h4>
            </div>
          </div>

          {/* Chart */}
          <div className="chart">
            <PieChart
              className="pie-chart"
              data={[
                {
                  title: "Total Tickets Left",
                  value: (data?.totalTicketLeft / data?.totalTicket) * 100,
                  color: "#06853d",
                },
                {
                  title: "total des client",
                  value: (data?.totalParticipent / data?.totalTicket) * 100,
                  color: "#1e1312",
                },
              ]}
            />
            ;
          </div>
        </div>
      </div>

      {/* <div className="userData">
        <UserData />
      </div> */}
    </div>
   </ProtectedRoute>
  );
};

export default home;

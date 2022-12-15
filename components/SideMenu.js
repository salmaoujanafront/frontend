import { FaUserTie } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { AiFillGift } from "react-icons/ai";
import { FaChartPie } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { AiTwotoneHome } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "./UserFacade";

const SideMenu = () => {
  const router = useRouter();

  // const logout = () => {
  //   console.log('clicked')
  //   try {
  //     localStorage.removeItem("accessToken");
  //     router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
  //     // setUser(null);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <div className="side-nav">
      <Link href={"/admin/home"} className="tabWrap">
        <div className="tab">
          <div>
            <AiTwotoneHome />
          </div>
          <p>Accueil</p>
        </div>
      </Link>

      <Link href={"/admin/contestlist"} className="tabWrap">
        <div className="tab">
          <div>
            <FaChartPie />
          </div>
          <p>Concours</p>
        </div>
      </Link>

      <Link href={"/admin/addprizes"} className="tabWrap">
        <div className="tab">
          <div>
            <AiFillGift />
          </div>
          <p>Prix</p>
        </div>
      </Link>

      <Link href={"/admin/viewusers"} className="tabWrap">
        <div className="tab">
          <div>
            <HiUserGroup />
          </div>
          <p>Utilisateurs</p>
        </div>
      </Link>

      <Link href={"/admin/addemployee"} className="tabWrap">
        <div className="tab">
          <div>
            <FaUserTie />
          </div>
          <p>Employés </p>
        </div>
      </Link>

      <div className="sidebarlogout">
        <button
          onClick={() => {
            logout();
            router.push("https://dsp-archiwebo21-ss-da-om-en.fr");
          }}
        >
          <IoLogOutSharp />
        </button>
        <p>Déconnexion </p>
      </div>
    </div>
  );
};

export default SideMenu;

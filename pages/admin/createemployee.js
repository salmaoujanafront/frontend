import { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import SideMenu from "../../components/SideMenu";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import ProtectedRoute from "../../components/ProtectedRoute";

const CreateEmployee = () => {
  const router = useRouter();

  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [passportNumber, SetPassportNumber] = useState();
  const [password, SetPassword] = useState("");

  const onSubmit = async (e) => {
    // const employee = { name, email, passportNumber, password };
    console.log(e);
    await fetch(
      "https://dsp-archiwebo21-ss-da-om-en.fr/api/v1/auth/add-employee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify(e),
      }
    ).then((res) => {
      if (res.status === 200) {
        router.push("https://dsp-archiwebo21-ss-da-om-en.fr/admin/addemployee");
      }
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Employee Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passportNumber: Yup.string()
      .required("PassportNumber is required")
      .matches(
        /^[0-9]{2}[A-z]{2}[0-9]{5}$/,
        "Passport number format is invalid"
      ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <div>
     <ProtectedRoute>
     <SideMenu />
        <div className="main-wrap">
          <div className="wrapSection">
            <div className="block active">
              <div className="create-employee">
                <h2>Ajouter un employé</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {name}
                  <input
                    type="text"
                    placeholder="Nom d'employee"
                    name="name"
                    {...register("name")}
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                  <br />
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    {...register("email")}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                  <br />
                  <input
                    type="text"
                    placeholder="Piece d’identité"
                    name="passportNumber"
                    {...register("passportNumber")}
                    className={`form-control ${
                      errors.passportNumber ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.passportNumber?.message}
                  </div>
                  <br />
                  <input
                    type="password"
                    placeholder="Mot de passe "
                    name="password"
                    {...register("password")}
                    className={`form-control ${
                      errors.setpassword ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                  <br />
                  <button type="submit">Ajouter un employé</button>
                </form>
              </div>
            </div>
          </div>
        </div>
     </ProtectedRoute>
    </div>
  );
};

export default CreateEmployee;

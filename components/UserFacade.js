import jwt from "jsonwebtoken";

export const userDetails =  () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token != null) {
        let jwtSecretKey = "gfg_jwt_secret_key";
        const user = jwt.verify(token, jwtSecretKey);
       return user;
      } else {
        return null
      }
    } catch (err) {
      return null
    }
  };

export const logout = async () => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("userType");
  } catch (err) {
    console.log(err);
  }
};
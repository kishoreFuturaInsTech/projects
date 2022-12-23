import React, { useContext, createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const StoreContext = createContext();

export const useCounter = () => useContext(StoreContext);

const ContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setSpecialAccess] = useState([]);

  const [error, setError] = useState(false);

  const accessMethod = (arr) => {
    arr.map((val) => access.push(val.method));
  };
  const userId = sessionStorage.getItem("userId");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("userId", response.data.id);
        sessionStorage.setItem("username", response.data.username);
        sessionStorage.setItem("email", response.data.email);

        if (response.data.userGroup !== null) {
          sessionStorage.setItem(
            "userGroup",
            response.data.userGroup.userGroupName
          );
          sessionStorage.setItem("userGroupId", response.data.userGroup.id);
        } else {
          sessionStorage.setItem("userGroup", null);
          sessionStorage.setItem("userGroupId", null);
        }

        sessionStorage.setItem("refreshtoken", response.data.refreshToken);
        accessMethod(response.data.specialAccess);
        sessionStorage.setItem("specialaccess", JSON.stringify(access));
        sessionStorage.setItem("condition", "true");
        sessionStorage.setItem(
          "logo",
          response.data.userGroup.company.companyLogo
        );
        navigate("/homepage");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
      });
  };

  let navigate = useNavigate();

  const values = {
    error,
    setError,
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,

    access,
  };

  return (
    <StoreContext.Provider value={values}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default ContextProvider;

import { useState, useContext } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";

const useHttp = () => {
  //   const dispatch = useDispatch();
  let user;
  const sendRequest = async (reqConfig, applyData) => {
    console.log("this is from hook", reqConfig.data);
    try {
      user = await axios({
        method: reqConfig.method ? reqConfig.method : "GET",
        url: reqConfig.url,
        data: reqConfig.data ? reqConfig.data : {},
        headers: reqConfig.headers ? reqConfig.headers : {},
      });

      if (user) {
        console.log(user.data);
        applyData(user.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
    sendRequest,
  };
};

export default useHttp;

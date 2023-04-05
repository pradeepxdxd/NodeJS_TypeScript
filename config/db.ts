import { error } from "console";
import { connect } from "mongoose";

const connection = () => {
  connect("mongodb://127.0.0.1:27017/test")
    .then(() => {
      console.log("DB Connected...");
    })
    .catch((error: Error) => {
      console.log(error);
    });
};

export default connection;

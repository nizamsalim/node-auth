import { connect } from "mongoose";
export default function connectDatabase(dbUri: string) {
  connect(dbUri).then(() => {
    console.log("db connected");
  });
}

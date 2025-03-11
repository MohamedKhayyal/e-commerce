import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectRotue(children, users) {
  return users ? children : <Navigate to={"/sign"}></Navigate>;
}

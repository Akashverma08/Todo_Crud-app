import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Protected(props: { Component: any }) {
  const { Component } = props;
  const navigate = useNavigate();

  const login = localStorage.getItem("token");

  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [login, navigate]);

  if (!login) {
    return <p>Please login...</p>;
  }

  return Component;
}
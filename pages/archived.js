import React from "react";
import fetch from "isomorphic-unfetch";
import ArchiveList from "../components/Archived/ArchiveList";
import baseUrl from "../utils/baseUrl";
import { useFetchUser } from "../utils/user";
import Router from "next/router";

function Archive({ employeeData }) {
  const { user, loading } = useFetchUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user && !loading) {
    Router.push("/");
  }

  return (
    <>
      <ArchiveList employees={employeeData} />
    </>
  );
}

export async function getServerSideProps() {
  const employees = await fetch(`${baseUrl}/api/employees`);
  const { employeeData } = await employees.json();

  return {
    props: { employeeData },
  };
}

export default Archive;

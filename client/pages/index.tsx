import type { GetServerSideProps, NextPage } from "next";
import axiosInstance from "../axios/axiosInstance";
import Head from "next/head";
import { HoloMember, MembersResponse } from "../interfaces";
import { AxiosError } from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import Container from "../components/Container";
import FilterButtons from "../components/FilterButtons";
import { useState } from "react";

interface HomeProps {
  members: MembersResponse;
  error: AxiosError;
}

const Home: NextPage<HomeProps> = ({ members, error }) => {
  const [filter, setFilter] = useState("Live");
  return (
    <>
      <Container>
        <FilterButtons members={members} clickHandler={setFilter} />
        {error && <h1>An Error has Occured! with code of {error} </h1>}
        {/* This filter thing is a mess, need to refactor */}
        {members && (
          <Cards
            channels={Object.values(members)
              .flatMap((x) => x)
              .filter((x: HoloMember) =>
                filter === "Live"
                  ? x.live
                  : filter === "All"
                  ? true
                  : x.generation.generation_name === filter
              )}
          />
        )}
      </Container>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (_) => {
  try {
    const res = await axiosInstance.get("/hololive");
    const members: MembersResponse = res.data;
    return { props: { members: members, error: null } };
  } catch (error) {
    console.log(error);
    let errorMsg: string = "";
    const err = error as AxiosError;
    if (err.isAxiosError) {
      errorMsg = err.message;
      console.log(errorMsg);
    } else {
      errorMsg = "Error";
    }

    return { props: { members: null, error: errorMsg } };
  }
};

export default Home;

import type { GetServerSideProps, NextPage } from "next";
import axiosInstance from "../axios/axiosInstance";
import { HoloMember, MembersResponse } from "../interfaces";
import { AxiosError } from "axios";
import Cards from "../components/Cards";
import Container from "../components/Container";
import FilterButtons from "../components/FilterButtons";
import { useState } from "react";
import Dropdown from "../components/Dropdown";

interface HomeProps {
  members: MembersResponse;
  error: AxiosError;
}

const Home: NextPage<HomeProps> = ({ members, error }) => {
  const [filter, setFilter] = useState("Live");
  return (
    <>
      <Container>
        <div className="hidden gap-2 flex-wrap md:flex">
          <FilterButtons
            members={members}
            clickHandler={setFilter}
            currentFilter={filter}
          />
        </div>
        <Dropdown
          members={members}
          clickHandler={setFilter}
          currentFilter={filter}
        />

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

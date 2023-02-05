import type { GetServerSideProps, NextPage } from "next";
import axiosInstance from "../axios/axiosInstance";
import { HoloMember, MembersResponse } from "../interfaces";
import { AxiosError } from "axios";
import Cards from "../components/Cards";
import Container from "../components/Container";
import FilterButtons from "../components/FilterButtons";
import { useState } from "react";
import Dropdown from "../components/Dropdown";
import Search from "../components/Search";
import useDebounce from "../hooks/useDebounce";

interface HomeProps {
  members: HoloMember[];
  error: AxiosError;
}

const Home: NextPage<HomeProps> = ({ members, error }) => {
  const [filter, setFilter] = useState("Live");
  const [search, setSearch] = useState("");
  const { debouncedValue: debouncedSearch, updateDebouncedValue } =
    useDebounce<string>(search.trim().toLowerCase());

  return (
    <>
      <Container>
        <Search
          value={search}
          onButtonClick={() => updateDebouncedValue(search)}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="hidden gap-2 flex-wrap md:flex">
          <FilterButtons clickHandler={setFilter} currentFilter={filter} />
        </div>
        <Dropdown clickHandler={setFilter} currentFilter={filter} />

        {error && <h1>An Error has Occured! with code of {error} </h1>}
        {/* This filter thing is a mess, need to refactor */}
        {members && (
          <Cards
            isLive={filter === "Live"}
            channels={members.filter(
              (x: HoloMember) =>
                x.channel_name.toLowerCase().includes(debouncedSearch) &&
                (filter === "Live"
                  ? x.live
                  : filter === "All"
                  ? true
                  : x.generation.generation_name === filter)
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
    const membersResponse: MembersResponse = res.data;
    const members = Object.values(membersResponse).flat();
    return { props: { members, error: null } };
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

    return { props: { members: [], error: errorMsg } };
  }
};

export default Home;

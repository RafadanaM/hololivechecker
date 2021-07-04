import { Button, CircularProgress } from "@material-ui/core";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import axios from "../axios/axios";
import Card from "../components/Card";
import { HoloMember, MembersResponse } from "../interface";
import classes from "../styles/Index.module.css";

export interface HomePageProps {
  members: MembersResponse;
  error: AxiosError;
}

function HomePage({ members, error }: HomePageProps) {
  const [filter, setFilter] = useState("all");
  const changeFilterHandler = (gen: string) => {
    console.log("change filter to " + gen);

    setFilter(gen);
  };
  return (
    <>
      <div className={classes.tabsContainer}>
        {error && <h1>An Error has Occured! with code of {error} </h1>}
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            onClick={() => changeFilterHandler("currentlyLive")}
          >
            Currently Live
          </Button>
          <Button
            variant="contained"
            onClick={() => changeFilterHandler("all")}
          >
            All
          </Button>
          {Object.keys(members).map((gen) => (
            <Button
              variant="contained"
              onClick={() => changeFilterHandler(gen)}
            >
              {gen}
            </Button>
          ))}
        </div>
        {members && !error ? (
          [
            <div className={classes.cardContainer} key={"rest"}>
              {Object.values(members)
                .flatMap((x) => x)
                .filter((x: HoloMember) =>
                  filter === "currentlyLive"
                    ? x.live
                    : filter === "all"
                    ? true
                    : x.generation_name === filter
                )
                .map((detail) => (
                  <Card
                    key={detail.id + detail.generation_name}
                    data={detail}
                  />
                ))}
            </div>,
          ]
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await axios.get("/hololive");
    const members: MembersResponse = res.data;
    return { props: { members: members, error: null } };
  } catch (error) {
    console.log(error);
    let errorMsg: string | undefined = "";
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

export default HomePage;

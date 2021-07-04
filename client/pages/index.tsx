import { Box, Button, CircularProgress, Tab, Tabs } from "@material-ui/core";
import { StylesProvider, withStyles } from "@material-ui/styles";
import { AxiosError } from "axios";
import { GetServerSideProps, GetStaticProps } from "next";
import React, { useState } from "react";
import axios from "../axios/axios";
import Card from "../components/Card";
import TabItem from "../components/TabItem";
import { HoloMember, MembersResponse } from "../interface";
import classes from "../styles/Index.module.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={classes.tabContent}
    >
      {value === index && <div className={classes.box}>{children}</div>}
    </div>
  );
}
interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: "#74cfe2",
    },
  },
})((props: StyledTabsProps) => (
  <Tabs
    variant="scrollable"
    scrollButtons="auto"
    {...props}
    className={classes.tabs}
    TabIndicatorProps={{ children: <span /> }}
  />
));
interface StyledTabProps {
  label: string;
}
const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#979797",
    fontSize: "1.75rem",
    fontWeight: "normal",

    "&:focus": {
      backgroundColor: "#D3D3D3",
      opacity: 1,
    },
  },
}))((props: StyledTabProps) => <Tab {...props} />);

export interface HomePageProps {
  members: MembersResponse;
  error: AxiosError;
}

function HomePage({ members, error }: HomePageProps) {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("all");

  const handlePageChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setPage(newValue);
  };

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
            <TabPanel value={page} index={0} key={"currentlyLive"}>
              <TabItem
                //this is a horrible way just to filter out Fubuki from appearing twice since she is in gen 3 and gamers
                value={Object.values(members)
                  .flatMap((x) => x)
                  .filter((x: HoloMember) => x.live)
                  .filter(
                    (x: HoloMember, index, self) =>
                      self.findIndex((y) => y.id_channel === x.id_channel) ===
                      index
                  )}
              />
            </TabPanel>,
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
                .map((detail, idx) => (
                  <Card
                    key={detail.id + detail.generation_name}
                    data={detail}
                  />
                ))}
            </div>,
            Object.values(members).map((detail, idx) => (
              <TabPanel value={page} index={idx + 1} key={idx}>
                <TabItem value={detail} />
              </TabPanel>
            )),
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

import { Box, CircularProgress, Tab, Tabs } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { AxiosError } from "axios";
import { GetStaticProps } from "next";
import React, { useState } from "react";
import axios from "../axios/axios";
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

  const handlePageChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setPage(newValue);
  };
  return (
    <>
      <div className={classes.tabsContainer}>
        {error && <h1>An Error has Occured! with code of {error} </h1>}

        <StyledTabs
          value={page}
          onChange={handlePageChange}
          aria-label="hololive tabs"
        >
          {members
            ? [
                <StyledTab key="currentlyLive" label="Currently Live" />,
                Object.keys(members).map((gen) => (
                  <StyledTab key={gen} label={gen} />
                )),
              ]
            : null}
        </StyledTabs>
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
// interface StaticProps {
//   members: any | null;
//   error: any;
// }
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await axios.get("hololive");
    const members: MembersResponse = res.data;
    return { props: { members: members, error: null }, revalidate: 120 };
  } catch (error) {
    let errorMsg: string | undefined = "";
    const err = error as AxiosError;
    if (err.isAxiosError) {
      errorMsg = err.code;
    }

    return { props: { members: null, error: errorMsg } };
  }
};

export default HomePage;

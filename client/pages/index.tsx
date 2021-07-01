import {
  Box,
  CircularProgress,
  Tab,
  Tabs,
  withStyles,
} from "@material-ui/core";
import { AxiosError, AxiosResponse } from "axios";
import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import axios from "../axios/axios";
import Card from "../components/Card";
import TabItem from "../components/TabItem";
import { HoloMember, MembersResponse } from "../interface";
import classes from "../styles/index.module.css";

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
      {value === index && <Box className={classes.box}>{children}</Box>}
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

    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(28),
    marginRight: theme.spacing(1),
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
  //   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     axios
  //       .get(`/hololive`)
  //       .then(({ data }) => {
  //         setData(data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         alert("An Error Has Occured");
  //       });
  //   }, []);

  const handlePageChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setPage(newValue);
  };
  return (
    <div className={classes.tabsContainer}>
      <StyledTabs
        value={0}
        onChange={handlePageChange}
        aria-label="hololive tabs"
      >
        <StyledTab key="currentlyLive" label="Currently Live" />
        {Object.keys(members).map((gen) => (
          <StyledTab key={gen} label={gen} />
        ))}
      </StyledTabs>

      <TabPanel value={page} index={0} key={"currentlyLive"}>
        <TabItem
          value={Object.values(members)
            .flatMap((x) => x)
            .filter((x: HoloMember) => x.live)}
        />
      </TabPanel>
      {Object.values(members).map((detail, idx) => (
        <TabPanel value={page} index={idx + 1} key={idx}>
          <TabItem value={detail} />
        </TabPanel>
      ))}
    </div>
  );
}
interface StaticProps {
  members: any | null;
  error: any;
}
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await axios.get("hololive");
    const members: MembersResponse = res.data;
    return { props: { members: members, error: null }, revalidate: 60 };
  } catch (error) {
    return { props: { members: null, error: error } };
  }
};

export default HomePage;

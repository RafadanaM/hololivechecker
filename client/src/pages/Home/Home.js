import { React, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Tabs, Tab } from "@material-ui/core";
import classes from "./Home.module.css";
import TabItem from "../../components/TabItem/TabItem";
import { CircularProgress } from "@material-ui/core";
import axios from "../../axios/config";

function TabPanel(props) {
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
})((props) => (
  <Tabs
    variant="scrollable"
    scrollButtons="auto"
    {...props}
    TabIndicatorProps={{ children: <span /> }}
  />
));

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
}))((props) => <Tab {...props} />);

const Home = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (e, newValue) => {
    setPage(newValue);
  };

  useEffect(() => {
    axios
      .get(`/hololive`)
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("An Error Has Occured");
      });
  }, []);

  return (
    <div className={classes.tabsContainer}>
      <StyledTabs
        value={page}
        onChange={handlePageChange}
        aria-label="hololive tabs"
        className={classes.tabs}
      >
        {!loading
          ? [
              <StyledTab key={"currentlyLive"} label={"Currently Live"} />,
              data.map((detail) => (
                <StyledTab key={detail.gen} label={detail.gen} />
              )),
            ]
          : null}
      </StyledTabs>

      {!loading ? (
        [
          <TabPanel value={page} index={0} key={"currentlyLive"}>
            <TabItem
              value={data.flatMap((x) => x.data).filter((x) => x.live)}
            />
          </TabPanel>,
          data.map((detail, idx) => (
            <TabPanel value={page} index={idx + 1} key={detail.gen}>
              <TabItem value={detail.data} />
            </TabPanel>
          )),
        ]
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Home;

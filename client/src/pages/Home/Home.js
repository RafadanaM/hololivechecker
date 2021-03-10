import { React, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Tabs, Tab } from "@material-ui/core";
import classes from "./Home.module.css";
import TabItem from "../../components/TabItem/TabItem";

const genList = {
  "EN 1st Gen": "enfirst",
  "JP 0th Gen": "jpzero",
  "JP 1st Gen": "jpfirst",
  "JP 2nd Gen": "jpsecond",
  "JP Gamers": "jpgamers",
  "JP 3rd Gen": "jpthird",
  "JP 4th Gen": "jpfourth",
  "JP 5th Gen": "jpfifth",
  "ID 1st Gen": "idfirst",
  "ID 2nd Gen": "idsecond",
};

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
    centered
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
    // borderColor: "black",
    // borderStyle: "solid",
    // borderWidth: "0px 1px",
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

  const handlePageChange = (e, newValue) => {
    setPage(newValue);
  };

  return (
    <div>
      <div className={classes.tabsContainer}>
        <StyledTabs
          value={page}
          onChange={handlePageChange}
          aria-label="hololive tabs"
          className={classes.tabs}
        >
          {Object.entries(genList).map(([k, v]) => {
            return <StyledTab key={k} label={k} />;
          })}
          {/* <StyledTab label="EN 1st Gen" />
          <StyledTab label="JP 0th Gen" />
          <StyledTab label="JP 1st Gen" /> */}
        </StyledTabs>

        {Object.entries(genList).map(([k, v], idx) => {
          return (
            <TabPanel value={page} index={idx} key={k}>
              <TabItem value={v} />
            </TabPanel>
          );
        })}

        {/* <TabPanel value={page} index={1}>
          <TabItem value={1} />
        </TabPanel>
        <TabPanel value={page} index={2}>
          <TabItem value={2} />
        </TabPanel> */}
      </div>
    </div>
  );
};

export default Home;

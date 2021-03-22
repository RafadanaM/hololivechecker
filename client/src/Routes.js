import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import classes from "./Routes.module.css";

const Routes = () => {
  return (
    <Router>
      <div className={classes.base}>
        <Navbar />
        <Switch className={{ flex: "1" }}>
          <Route path="/" exact component={Home} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default Routes;

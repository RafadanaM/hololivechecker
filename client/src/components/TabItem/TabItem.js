import { CircularProgress } from "@material-ui/core";
import { React, useState, useEffect, useCallback } from "react";
import axios from "../../axios/config";
import ProfileCard from "../Card/ProfileCard";
import classes from "./TabItem.module.css";

const TabItem = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /*
  avoid linter dependency 
  src: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
   */

  const getHololive = useCallback(() => {
    return axios
      .get(`/hololive?gen=${props.value}`)
      .then(({ data }) => {
        setIsLoading(false);
        return data;
      })
      .catch((err) => {
        console.log(err);
        alert("An Error Has Occured");
        return [];
      });
  }, [props.value]);

  useEffect(() => {
    /* add unmounted thingy to avoid useEffect memory leak
    src: https://stackoverflow.com/questions/58038008/how-to-stop-memory-leak-in-useeffect-hook-react
    */
    let unmounted = false;
    getHololive(props.value).then((data) => {
      if (!unmounted) {
        setData(data);
      }
    });

    return () => {
      unmounted = true;
    };
  }, [getHololive, props.value]);

  return (
    <div className={classes.tabFlex}>
      {isLoading ? (
        <CircularProgress />
      ) : data.length === 0 ? (
        <h2>No one is Streaming right now Sadge</h2>
      ) : (
        data.map((item, id) => {
          return (
            <ProfileCard key={id} data={item} />
            // <div key={id}>
            //   <img src={item.avatar} alt={`avatar-${id}`} />

            //   <p>{item.name}</p>
            //   <p>{item.live ? "Live" : "Not Live"}</p>
            // </div>
          );
        })
      )}
    </div>
  );
};

export default TabItem;

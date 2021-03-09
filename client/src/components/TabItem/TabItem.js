import { CircularProgress } from "@material-ui/core";
import { React, useState, useEffect, useCallback } from "react";
import axios from "../../axios/config";

const TabItem = (props) => {
  const [data, setData] = useState([]);

  /*
  avoid linter dependency 
  src: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
   */

  const getHololive = useCallback(() => {
    return axios
      .get(`/hololive?gen=${props.value}`)
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.value]);

  useEffect(() => {
    /* add unmounted thingy to avoid useEffect mount error
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
    <div>
      {data.length === 0 ? (
        <center>
          <CircularProgress />
        </center>
      ) : (
        data.map((item, id) => {
          return (
            <div key={id}>
              <img src={item.avatar} alt={`avatar-${id}`} />
              <p>{item.avatar}</p>
              <p>{item.name}</p>
              <p>{item.live ? "Live" : "Not Live"}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TabItem;

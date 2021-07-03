import React from "react";
import { HoloMember } from "../interface";
import classes from "../styles/TabItem.module.css";
import Card from "./Card";

interface TabItemProp {
  value: HoloMember[];
}
const TabItem = ({ value }: TabItemProp) => {
  /*
    avoid linter dependency 
    src: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
     */
  /* add unmounted thingy to avoid useEffect memory leak
      src: https://stackoverflow.com/questions/58038008/how-to-stop-memory-leak-in-useeffect-hook-react
      */

  return (
    <div className={classes.tabFlex}>
      {value.length === 0 ? (
        <h2>No one is Streaming right now Sadge</h2>
      ) : (
        value.map((item: HoloMember, id: number) => {
          return (
            // <div className={classes.item}>
            <Card key={id} data={item} />
            // </div>
          );
        })
      )}
    </div>
  );
};

export default TabItem;

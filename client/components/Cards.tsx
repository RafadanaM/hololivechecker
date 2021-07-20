import { Typography } from "@material-ui/core";
import React from "react";
import { HoloMember } from "../interface";
import classes from "../styles/Cards.module.css";
import Card from "./Card";

interface CardsProps {
  data: HoloMember[];
}

function Cards({ data }: CardsProps) {
  return (
    <div className={classes.cardContainer}>
      {data.length === 0 && (
        <div className={classes.center}>
          <Typography variant="h3">
            Noone is streaming right now (⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ
          </Typography>{" "}
        </div>
      )}
      {data.map((detail) => (
        <Card key={detail.id + detail.generation_name} data={detail} />
      ))}
    </div>
  );
}

export default Cards;

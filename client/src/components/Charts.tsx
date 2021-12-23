import { Box, Card, CardContent, Typography } from "@material-ui/core";

import { JournalEntry } from "../store/journalEntries";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  entries: JournalEntry[];
}

const useStyles = makeStyles(() => ({
  rootContainer: {
    height: "100%",
    paddingBottom: "1rem",
  },
}));

const Charts = ({ entries }: Props) => {
  const classes = useStyles();
  return (
    <Card className={classes.rootContainer}>
      <CardContent>
        <Box display="flex" justifyContent="space-evenly" textAlign="center">
          <Typography variant="h5">
            Total No of entries <br />
            {entries?.length}
          </Typography>
          <Typography variant="h5">Average no of entries per day</Typography>
          <Typography variant="h5">Days since last entry</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Charts;

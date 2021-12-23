import React from "react";
import { Card, CardContent, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { JobEntry } from '../types/entry';

interface Props {
	entries: JobEntry[];
}

const useStyles = makeStyles(() => ({
	rootContainer: {
		height: "100%",
    paddingBottom: "1rem",
	},
}));

const Charts = ({ entries }:Props) => {
  const classes = useStyles();
	return (
		<Card className={classes.rootContainer}>
			<CardContent>
        <Box display="flex" justifyContent="space-evenly" textAlign="center">
          <Typography variant="h5">
            Total No of entries <br />
            {entries?.length}
          </Typography>
          <Typography variant="h5">
            Average no of entries per day
          </Typography>
          <Typography variant="h5">
            Days since last entry
          </Typography>
        </Box>
      </CardContent>
		</Card>
	);
};

export default Charts;

import React from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { JobEntry } from '../types/entry';

interface Props {
	entry: JobEntry;
	setActiveEntryId: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles(() => ({
   entryCard: {
      margin: '1rem 0rem',
   }
}));

const Entry = ({ entry, setActiveEntryId }: Props) => {
   const classes = useStyles();

	return (
		<Card elevation={4} className={classes.entryCard}>
			<CardActionArea onClick={() => setActiveEntryId(entry.id)} >
				<CardContent>
					<Typography variant="h6">{entry.role}</Typography>
					<Typography variant="body1">{entry.companyName}</Typography>
					<Typography variant="subtitle1" color="textSecondary">{entry.location}</Typography>
					<Typography variant="body1">{entry.details}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default Entry;

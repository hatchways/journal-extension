import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import EntryList from "./EntryList";
import DetailedEntry from "./DetailedEntry";
import Charts from "../components/Charts";
import { mockEntries } from "../mocks/mockEntries";
import { JobEntry } from "../types/entry";

const useStyles = makeStyles(() => ({
	rootContainer: {
		height: "100vh",
		padding: "0rem 2.5rem 1.75rem 2.5rem",
	},
	chartContainer: {
		maxHeight: "45vh",
		height: "100%",
    paddingBottom: "1.5rem",
	},
	listContainer: {
		maxHeight: "50vh",
		height: "100%",
	},
}));

const Insights = () => {
	const classes = useStyles();
	const [activeEntryId, setActiveEntryId] = useState<number | undefined>(
		undefined
	);
	const [activeDetailedEntry, setActiveDetailedEntry] = useState<
		JobEntry | undefined
	>(undefined);

	useEffect(() => {
		if (activeEntryId) {
			const selectedEntry = mockEntries.filter(
				(entry) => entry.id === activeEntryId
			)[0];
			setActiveDetailedEntry(selectedEntry);
		}
	}, [activeEntryId]);

	return (
		<Box
			display="flex"
			flexDirection="column"
			className={classes.rootContainer}
		>
			<Box className={classes.chartContainer}>
				<Charts entries={mockEntries} />
			</Box>
			<Box display="flex" className={classes.listContainer}>
				<Box flex={2}>
					<EntryList
						entries={mockEntries}
						setActiveEntryId={setActiveEntryId}
					/>
				</Box>
				<Box flex={3} marginLeft={5}>
					{activeDetailedEntry && <DetailedEntry entry={activeDetailedEntry} />}
				</Box>
			</Box>
		</Box>
	);
};

export default Insights;

import React, { useEffect, useState } from "react";

import { Box } from "@material-ui/core";
import Charts from "../components/Charts";
import DetailedEntry from "./DetailedEntry";
import EntryList from "./EntryList";
import { JournalEntry } from "../store/journalEntries";
import { makeStyles } from "@material-ui/core/styles";
import { useAppSelector } from "../store";

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
  const entries = useAppSelector((state) => state.journalEntries);
  const [activeEntryId, setActiveEntryId] = useState<string | undefined>(
    undefined
  );
  const [activeDetailedEntry, setActiveDetailedEntry] = useState<
    JournalEntry | undefined
  >(undefined);

  useEffect(() => {
    if (activeEntryId) {
      const selectedEntry = entries.find(
        (entry) => entry._id === activeEntryId
      );
      setActiveDetailedEntry(selectedEntry);
    }
  }, [activeEntryId, entries]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={classes.rootContainer}
    >
      <Box className={classes.chartContainer}>
        <Charts entries={entries} />
      </Box>
      <Box display="flex" className={classes.listContainer}>
        <Box flex={2}>
          <EntryList entries={entries} setActiveEntryId={setActiveEntryId} />
        </Box>
        <Box flex={3} marginLeft={5}>
          {activeDetailedEntry && <DetailedEntry entry={activeDetailedEntry} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Insights;

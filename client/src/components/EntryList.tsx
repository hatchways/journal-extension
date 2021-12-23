import {
  Box,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import Entry from "../components/Entry";
import { JournalEntry } from "../store/journalEntries";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  entries: JournalEntry[];
  setActiveEntryId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const useStyles = makeStyles(() => ({
  rootContainer: {
    padding: "1rem",
  },
  listTitle: {
    paddingBottom: "1rem",
  },
  searchBar: {
    padding: "1 rem",
    marginBottom: "0.5rem",
  },
  listContainer: {
    height: "45vh",
    overflowY: "auto",
  },
}));

const EntryList = ({ entries, setActiveEntryId }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const classes = useStyles();

  return (
    <Box component={Paper} className={classes.rootContainer}>
      <Box>
        <Typography variant="h5" className={classes.listTitle}>
          Entries List
        </Typography>
        <TextField
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          size="small"
          fullWidth
          className={classes.searchBar}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className={classes.listContainer}>
        {entries.map((entry) => (
          <Entry
            entry={entry}
            key={entry._id}
            setActiveEntryId={setActiveEntryId}
          />
        ))}
      </Box>
    </Box>
  );
};

export default EntryList;

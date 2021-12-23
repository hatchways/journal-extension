import {
  Box,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { JobEntry } from "../types/entry";
import { STATUS_TYPE } from "../constants/constants";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  entry: JobEntry;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const useStyles = makeStyles(() => ({
  detailedCard: {
    height: "50vh",
  },
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DetailedEntry = ({ entry }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const getActiveStep = (status: string) => {
    for (let i = 0; i < STATUS_TYPE.length; i++) {
      if (status === STATUS_TYPE[i]) {
        setActiveStep(i);
      }
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getActiveStep(entry.status);
  }, [entry]);

  return (
    <Card className={classes.detailedCard}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">{entry.role}</Typography>
          <Box>
            <Typography variant="body1" color="textSecondary">
              {entry.companyName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {entry.location}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-evenly">
          <Typography variant="body1" color="textSecondary">
            Applied On:{" "}
            {entry.appliedOn.getUTCDay().toString() +
              "-" +
              entry.appliedOn.getUTCMonth().toString()}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            FollowUp Date:{" "}
            {entry.followUpDate?.getUTCDay().toString() +
              "-" +
              entry.followUpDate?.getUTCMonth().toString()}
          </Typography>
        </Box>

        <Box>
          <Typography align="center">Status:</Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {STATUS_TYPE.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="entry-details-panel"
              >
                <Tab color="primary" label="Description" {...a11yProps(0)} />
                <Tab color="primary" label="Contacts" {...a11yProps(1)} />
                <Tab color="primary" label="Notes" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {entry.details}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {entry.contacts?.map((contact) => (
                <>
                  <Typography>{contact.name}</Typography>
                  <Typography>{contact.email}</Typography>
                  <Typography>{contact.phone}</Typography>
                </>
              ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {entry.notes || "No notes available"}
            </TabPanel>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DetailedEntry;

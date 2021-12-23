import React, { useState } from "react";
import {
	Box,
	Button,
	Typography,
	Grid,
	Paper,
	Select,
	MenuItem,
	FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";

import CustomTextField from "./CustomTextField";
import { STATUS_TYPE } from "../constants/constants";
import createEntry from "../helpers/APICalls/createEntry";
import { useSnackBar } from "../hooks/useSnackbar";

const useStyles = makeStyles(() => ({
	container: {
		padding: "1.75rem 2.5rem",
	},
	formHeading: {
		padding: "1.25rem 0rem",
	},
	formRow: {
		padding: "1rem 0rem",
	},
	label: {
		display: "block",
		marginBottom: "0.5rem",
		fontWeight: "lighter",
	},
	selectRoot: {
		background: "#fff",
	},
	keywordsContainer: {
		width: "100%",
		height: 350,
		maxHeight: "30vh",
		borderStyle: "dashed",
		borderRadius: 1,
		borderWidth: 5,
		borderColor: "#f1e9e9",
	},
	dateColumn: {
		display: "flex",
		flexDirection: "column",
	},
	submitBtn: {
		minWidth: 150,
	},
}));

const INITIAL_STATE = {
	companyName: "",
	role: "",
	location: "",
	status: "",
	details: "",
	notes: "",
};

const AddEntry = () => {
	const [entryData, setEntryData] = useState(INITIAL_STATE);
	const [appliedOn, setAppliedOn] = useState<Date | null>(new Date());
	const [followUpDate, setFollowUpDate] = useState<Date | null>(new Date());
	const { updateSnackBarMessage } = useSnackBar();
	const classes = useStyles();

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
		property: string,
		value?: string
	) => {
		setEntryData({ ...entryData, [property]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
    try {
      const res = await createEntry({ ...entryData, appliedOn, followUpDate });

      if (res.status !== 200) {
        updateSnackBarMessage("An unexpected error has occured");
      } else {
        updateSnackBarMessage("Succesfully created a new entry!");
        setEntryData(INITIAL_STATE);
      }
    }
    catch (error) {
      updateSnackBarMessage(error.message);
    }
	};

	return (
		<Box component={Paper} className={classes.container}>
			<Typography variant="h4" component="h3" className={classes.formHeading}>
				Job Role Details
			</Typography>
			<form onSubmit={handleSubmit}>
				<Grid container>
					<Grid container spacing={3} className={classes.formRow}>
						<Grid item xs={12} sm={6}>
							<label htmlFor="company-name" className={classes.label}>
								Which company have you applied for?
							</label>
							<CustomTextField
								id="company-name"
								value={entryData.companyName}
								onChange={(
									e:
										| React.ChangeEvent<HTMLInputElement>
										| React.ChangeEvent<HTMLTextAreaElement>
								): void => handleChange(e, "companyName")}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<label htmlFor="job-role" className={classes.label}>
								What is the job role?
							</label>
							<CustomTextField
								id="job-role"
								value={entryData.role}
								onChange={(
									e:
										| React.ChangeEvent<HTMLInputElement>
										| React.ChangeEvent<HTMLTextAreaElement>
								): void => handleChange(e, "role")}
							/>
						</Grid>
					</Grid>

					<Grid container spacing={3} className={classes.formRow}>
						<Grid item xs={12} sm={4}>
							<label htmlFor="location" className={classes.label}>
								Where is the company located?
							</label>
							<CustomTextField
								id="location"
								value={entryData.location}
								onChange={(
									e:
										| React.ChangeEvent<HTMLInputElement>
										| React.ChangeEvent<HTMLTextAreaElement>
								): void => handleChange(e, "location")}
							/>
						</Grid>
						<Grid item xs={6} sm={4}>
							<FormControl variant="filled" fullWidth>
								<label className={classes.label}>Job application status:</label>
								<Select
									classes={{ root: classes.selectRoot }}
									value={entryData.status}
									label="Status"
									fullWidth
									onChange={(
										e:
											| React.ChangeEvent<HTMLInputElement>
											| React.ChangeEvent<HTMLTextAreaElement>
									): void => handleChange(e, "status")}
								>
									{STATUS_TYPE.map((status) => (
										<MenuItem value={status}>{status}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} sm={2} className={classes.dateColumn}>
							<label className={classes.label}>Application Date:</label>
							<DatePicker
								value={appliedOn}
								onChange={(value) => setAppliedOn(value)}
								inputVariant="outlined"
							/>
						</Grid>
						<Grid item xs={6} sm={2} className={classes.dateColumn}>
							<label className={classes.label}>Followup Date:</label>
							<DatePicker
								value={followUpDate}
								onChange={(value) => setFollowUpDate(value)}
								inputVariant="outlined"
							/>
						</Grid>
					</Grid>

					<Grid container className={classes.formRow}>
						<label htmlFor="details" className={classes.label}>
							Job Description:
						</label>
						<CustomTextField
							id="details"
							value={entryData.details}
							multiline={true}
							rows={6}
							onChange={(
								e:
									| React.ChangeEvent<HTMLInputElement>
									| React.ChangeEvent<HTMLTextAreaElement>
							): void => handleChange(e, "details")}
						/>
					</Grid>

					<Grid container className={classes.formRow}>
						<label htmlFor="notes" className={classes.label}>
							Additional Notes:
						</label>
						<CustomTextField
							id="notes"
							value={entryData.notes}
							multiline={true}
							rows={3}
							onChange={(
								e:
									| React.ChangeEvent<HTMLInputElement>
									| React.ChangeEvent<HTMLTextAreaElement>
							): void => handleChange(e, "notes")}
						/>
					</Grid>

					<Grid container className={classes.formRow}>
						<Typography variant="h5" className={classes.label}>
							Job Description Keywords
						</Typography>
						<Box className={classes.keywordsContainer} />
					</Grid>

					<Grid container justifyContent="center" className={classes.formRow}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							size="large"
							className={classes.submitBtn}
						>
							Add Job
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default AddEntry;

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
import { useForm } from 'react-hook-form';

import CustomTextField from "./CustomTextField";
import { STATUS_TYPE } from '../constants/constants';

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

const AddEntry = () => {
	const [applicationDate, setApplicationDate] = useState< Date | null>(new Date());
  const [followupDate, setFollowupDate] = useState< Date | null>(new Date());
  const { register, handleSubmit } = useForm();
  
	const classes = useStyles();

	const handleChange = () => {
		console.log("change");
	};

	const submitNewEntry = (data) => {
		console.log(data);
	};

	return (
		<Box component={Paper} className={classes.container}>
			<Typography variant="h4" component="h3" className={classes.formHeading}>
				Job Role Details
			</Typography>
			<form onSubmit={handleSubmit((data) => submitNewEntry(data))} autoComplete="off">
				<Grid container>
					<Grid container spacing={3} className={classes.formRow}>
						<Grid item xs={12} sm={6}>
							<label htmlFor="company-name" className={classes.label}>
								Which company have you applied for?
							</label>
							<CustomTextField
								id="company-name"
								value={""}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<label htmlFor="job-role" className={classes.label}>
								What is the job role?
							</label>
							<CustomTextField
								id="job-role"
								value={""}
								onChange={handleChange}
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
								value={""}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={6} sm={4}>
							<FormControl variant="filled" fullWidth>
								<label className={classes.label}>Job application status:</label>
								<Select
									classes={{ root: classes.selectRoot }}
									value=''
									label="Status"
									onChange={handleChange}
									fullWidth
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
								value={applicationDate}
								onChange={(value) => setApplicationDate(value)}
								inputVariant="outlined"
							/>
						</Grid>
						<Grid item xs={6} sm={2} className={classes.dateColumn}>
							<label className={classes.label}>Followup Date:</label>
							<DatePicker
								value={followupDate}
								onChange={(value) => setFollowupDate(value)}
								inputVariant="outlined"
							/>
						</Grid>
					</Grid>

					<Grid container className={classes.formRow}>
						<label htmlFor="job-description" className={classes.label}>
							Job Description:
						</label>
						<CustomTextField
							id="job-description"
							value={""}
							onChange={handleChange}
							multiline={true}
							rows={6}
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

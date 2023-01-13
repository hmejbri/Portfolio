import {
	Avatar,
	Card,
	CardActionArea,
	CardHeader,
	Fade,
	Grid,
	Hidden,
	makeStyles,
	Typography,
} from "@material-ui/core";
import Image from "next/image";
import { DateRange, LocationCity } from "@material-ui/icons";
import dataFR from "../dataFR.json";
import dataEN from "../dataEN.json";
import { useRef } from "react";
import useAnimate from "./useAnimate";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
	cont: {
		minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
	},
	card: {
		height: "100%",
	},
	cardHeader: {
		paddingTop: 0,
	},
	cardActionArea: {
		height: "100%",
	},
	expObj: {
		marginBottom: theme.spacing(4),
	},
}));

const getHumanDiff = (startDate, endDate, language) => {
	let str = "";
	const start = new Date(startDate);
	const end = !!endDate ? new Date(endDate) : new Date();
	let years = end.getFullYear() - start.getFullYear();
	let months = end.getMonth() - start.getMonth();

	if (months < 0) {
		years -= 1;
		months += 12;
	}

	if (years > 0) {
		str += years + " year";
		if (years > 1) str += "s";
	}

	if (str.length > 0) str += ", ";

	if (language == "US") {
		if (months > 0) {
			str += months + " month";
			if (months > 1) str += "s";
		}
	} else str += months + " mois";

	return str;
};

export default function Experience() {
	const classes = useStyles();
	const animRef = useRef(null);
	const animate = useAnimate(animRef);
	const router = useRouter();
	const [experience, setExperience] = useState(dataEN.experience);

	useEffect(() => {
		if (router.query.language == "FR") setExperience(dataFR.experience);
		else setExperience(dataEN.experience);
	}, [dataFR, dataEN, router.query.language]);

	return (
		<Grid
			direction="row"
			container
			justify="center"
			alignItems="center"
			spacing={10}
			className={classes.cont}
		>
			<Grid item xs={12} lg={6}>
				<Typography variant="h2" gutterBottom align="center">
					{router.query.language == "FR" ? "Expérience" : "Experience"}
				</Typography>
				<Hidden mdDown>
					<Fade in={animate} style={{ transitionDelay: "250ms" }}>
						<div>
							<Image
								alt="Experience"
								src="/experience.svg"
								width="996.46"
								height="828.18"
							/>
						</div>
					</Fade>
				</Hidden>
			</Grid>
			<Grid container item xs={12} lg={6} direction="row" spacing={1}>
				{Object.getOwnPropertyNames(experience).map((title, id) => (
					<Grid item key={id} className={classes.expObj}>
						<Typography variant="h4" gutterBottom component="p">
							{title}
						</Typography>
						<Grid container item direction="row" spacing={1} justify="center">
							{experience[title].map(
								(
									{
										organization,
										role,
										type,
										startDate,
										endDate,
										city,
										state,
										country,
										url,
										thumbnail,
									},
									i
								) => (
									<Grid item xs={12} md={6} key={i}>
										<Fade
											in={animate}
											style={{ transitionDelay: `${200 * i}ms` }}
										>
											<Card className={classes.card}>
												<CardActionArea
													className={classes.cardActionArea}
													href={url}
													target="_blank"
													rel="noopener noreferrer"
												>
													<CardHeader
														avatar={
															<Avatar variant="rounded">
																<Image
																	alt={`${organization} logo`}
																	src={thumbnail}
																	layout="fill"
																/>
															</Avatar>
														}
														title={organization}
														subheader={role + " - " + type}
													/>
													<CardHeader
														avatar={<DateRange />}
														title={getHumanDiff(
															startDate,
															endDate,
															router.query.language
														)}
														subheader={`${startDate} - ${endDate}`}
														className={classes.cardHeader}
													/>
													<CardHeader
														avatar={<LocationCity />}
														subheader={`${city}, ${state}, ${country}`}
														className={classes.cardHeader}
													/>
												</CardActionArea>
											</Card>
										</Fade>
									</Grid>
								)
							)}
							<Grid item xs={12} md={6}></Grid>
						</Grid>
					</Grid>
				))}
			</Grid>
			<div ref={animRef}></div>
		</Grid>
	);
}

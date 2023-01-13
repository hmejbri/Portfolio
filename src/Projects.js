import {
	Avatar,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Fade,
	Grid,
	Hidden,
	makeStyles,
	Tooltip,
	Typography,
	Zoom,
} from "@material-ui/core";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useAnimate from "./useAnimate";
import dataFR from "../dataFR.json";
import dataEN from "../dataEN.json";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
	cont: {
		minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
	},
	card: {
		height: "100%",
		paddingBottom: "1em",
	},
	cardActionArea: {
		height: "100%",
		// display: 'grid'
	},
}));

export default function Projects() {
	const classes = useStyles();
	const animRef = useRef(null);
	const animate = useAnimate(animRef);
	const [projets, setProjets] = useState([]);
	const router = useRouter();

	useEffect(() => {
		if (router.query.language == "FR") setProjets(dataFR.projects);
		else setProjets(dataEN.projects);
	}, [dataFR, dataEN, router.query.language]);

	return (
		<Grid
			direction="row-reverse"
			container
			justify="center"
			alignItems="center"
			spacing={10}
			className={classes.cont}
		>
			<Grid item xs={12} lg={6}>
				<Typography variant="h2" gutterBottom align="center" innerRef={animRef}>
					{router.query.language == "FR" ? "Projets" : "Projects"}
				</Typography>
				<Hidden mdDown>
					<Fade in={animate} style={{ transitionDelay: "250ms" }}>
						<div>
							<Image
								alt="Projects"
								src="/projects.svg"
								width="1144"
								height="617.32"
							/>
						</div>
					</Fade>
				</Hidden>
			</Grid>

			<Grid container item xs={12} lg={6} direction="row" spacing={1}>
				{projets.map((value, i) => (
					<Grid item sm={6} xs={12} key={i}>
						<Fade in={animate} style={{ transitionDelay: `${200 * i}ms` }}>
							<Card key={i} className={classes.card}>
								<CardActionArea>
									<CardMedia className={classes.media} title={value.nom}>
										<div
											style={{
												position: "relative",
												width: "100%",
												height: "100%",
											}}
										>
											<Image
												src="/projects.svg"
												layout="fill"
												objectFit="contain" // or objectFit="cover"
											/>
										</div>
									</CardMedia>
									<CardContent style={{ height: "30vh" }}>
										<Typography gutterBottom variant="h5" component="h2">
											{value.nom}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{value.description}
										</Typography>

										<center>
											<Grid
												container
												direction="row"
												spacing={3}
												style={{ position: "absolute", bottom: 0, left: 0 }}
											>
												{value.technologies.map((value, i) => {
													var image = "/technologies/" + value + ".png";
													return (
														<Grid item xs={3} key={i}>
															<Zoom
																in={animate}
																style={{
																	transitionDelay: `${150 * i}ms`,
																}}
															>
																<Tooltip
																	title={value}
																	placement="top"
																>
																	<Avatar
																		style={{
																			backgroundColor:
																				"black",
																			borderRadius: "5px",
																		}}
																		variant="square"
																		alt={value}
																		src={image}
																	/>
																</Tooltip>
															</Zoom>
														</Grid>
													);
												})}
											</Grid>
										</center>
									</CardContent>
								</CardActionArea>
							</Card>
						</Fade>
					</Grid>
				))}
			</Grid>
		</Grid>
	);
}

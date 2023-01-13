import React, { useCallback } from "react";
import {
	AppBar,
	Container,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
	useScrollTrigger,
	useTheme,
} from "@material-ui/core";
import Landing from "../src/Landing";
import Skills from "../src/Skills";
import Projects from "../src/Projects";
import Experience from "../src/Experience";
import About from "../src/About";
import { darkTheme, lightTheme } from "../src/theme";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import ReactFlagsSelect from "react-flags-select";
import { useEffect } from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		boxShadow: "none",
	},
}));

export default function Index({ setTheme }) {
	const classes = useStyles();
	const router = useRouter();
	const trigger = useScrollTrigger({ disableHysteresis: true });

	const theme = useTheme();

	const toggleTheme = useCallback(() => {
		setTheme((theme) => (theme.palette.type === "dark" ? lightTheme : darkTheme));
	}, [setTheme]);

	const setSelected = (code) => {
		router.push({ query: { language: code } }, undefined, { shallow: false });
	};

	return (
		<div className={classes.root}>
			<AppBar
				color={!trigger ? "transparent" : "inherit"}
				className={classes.appBar}
				position="fixed"
			>
				<Toolbar>
					<Typography variant="h6" className={classes.root}></Typography>

					<ReactFlagsSelect
						countries={["US", "FR"]}
						customLabels={{ US: "English", FR: "Francais" }}
						selected={router.query.language ? router.query.language : "US"}
						onSelect={(code) => setSelected(code)}
						id="flags-select"
					/>

					<IconButton edge="end" color="inherit" onClick={toggleTheme}>
						{theme.palette.type === "dark" ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
				</Toolbar>
			</AppBar>
			<Toolbar className={classes.toolbar} />
			<Container>
				<Landing />
				<Skills />
				<Projects />
				<Experience />
				<About />
			</Container>
		</div>
	);
}

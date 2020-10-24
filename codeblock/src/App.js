import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/blue";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-end",
		marginTop: 30
	},
	input: {
		display: "none"
	},
	button: {
		color: blue[900],
		margin: 10
	},
	card: {
		maxWidth: 500,
		maxHeight: 500,
	},
	content: {
		maxWidth: 300,
		maxHeight: 300,
	}
});

const arr = [1, 2, 3, 4, 5, 6];

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mainState: arr.map(() => 'initial'),
			selectedFile: []
		};
	}

	handleUploadClick = event => {
		event.preventDefault();
		const file = event.target.files[0];
		const reader = new FileReader();
		const url = reader.readAsDataURL(file);
		const states = [];
		let isInitial = true;
		this.state.mainState.forEach((ele) => {
			if (ele === 'initial' && isInitial) {
				states.push('uploaded');
				isInitial = false;
			} else {
				states.push(ele);
			}
		});
		reader.onloadend = () => {
			setTimeout(() => {
				this.setState({
					mainState: states,
					selectedFile: this.state.selectedFile.concat(reader.result)
				})
			}, 500);
		}
	};


	renderInitialState() {
		const { classes } = this.props;
		return (
			<>
				<Card>
					<CardContent>
						<Grid container justify="center" alignItems="center">
							<input
								accept="image/*"
								className={classes.input}
								id="contained-button-file"
								multiple
								type="file"
								onChange={this.handleUploadClick}
							/>
							<label htmlFor="contained-button-file">
								<Fab component="span" className={classes.button}>
									<AddPhotoAlternateIcon />
								</Fab>
							</label>
						</Grid>
					</CardContent>
				</Card>
			</>
		);
	}

	renderUploadedState(index) {
		const { classes } = this.props;
		return (
			<>
				<Card className={classes.card}>
					<CardContent>
						<Grid container direction="column" alignItems="center">
							<Grid item>
								<img
									width="100%"
									className={classes.content}
									src={this.state.selectedFile[index]}
								/></Grid>
							<Grid item>
								<Button variant="contained" onClick={(e) => this.imageResetHandler(index, e)}>Delete</Button>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</>
		);
	}

	imageResetHandler = (idx, event) => {
		event.preventDefault();
		const states = this.state.mainState.map((ele, index) => idx === index ? 'initial' : ele).sort().reverse();
		const selected = this.state.selectedFile.filter((ele, index) => idx !== index);
		this.setState({
			mainState: states,
			selectedFile: selected,
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<>
				<div className={classes.root}>
					<Grid container spacing={10} justify="center">
						{
							this.state.mainState.map((mainState, index) => {
								return mainState === 'initial'
									? (<Grid item>{this.renderInitialState(index)}</Grid>)
									: this.renderUploadedState(index)
							})
						}
					</Grid>
				</div>
			</>
		);
	}
}

export default withStyles(styles, { withTheme: true })(App);
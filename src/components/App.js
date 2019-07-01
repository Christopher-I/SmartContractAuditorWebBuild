import React from "react";
import {
	Container,
	Form,
	TextArea,
	Input,
	Grid,
	List,
	Button,
	Modal,
	Table
} from "semantic-ui-react";
import Auditor from "../auditor/Auditor";
import LandingPageSection1 from "./sections/landingPageSection1";
import LandingPageSection2 from "./sections/landingPageSection2";
import sampleContract from "../sampleContract/sampleContract";
import Web3 from "web3";

class landingPage extends React.Component {
	state = {
		currentCompiler: "",
		contractCode: "",
		creationCost: "",
		executionCost: "",
		gasEstimate: "",
		timeOfAudit: "",
		fileSize: "",
		vunerabiltiesFound: "",
		noOfLines: "",
		percent: "",
		errorMessage: "",
		successMessage: "",
		renderedList: "",
		loading: false,
		suggestions: [],
		userName: "",
		userContactInfo: "",
		userSuggestion: "",
		modalOpen: false,
		errorLines: "0",
		lineNumbers: ""
	};

	componentDidMount() {
		this.generateNumberedList();
		this.setState({
			contractCode: sampleContract()
		});
	}

	//get Time of Audit
	setTimeOfAudit = () => {
		let today = new Date();
		let date =
			today.getFullYear() +
			"-" +
			(today.getMonth() + 1) +
			"-" +
			today.getDate();
		let time =
			today.getHours() +
			":" +
			today.getMinutes() +
			":" +
			today.getSeconds();
		let dateTime = date + " " + time;

		this.setState({
			timeOfAudit: dateTime
		});
	};

	//receive compiler version from child component-landingPageSection1 and store it to state
	selectCompiler = compiler => {
		this.setState({
			currentCompiler: compiler
		});
	};

	//receive contract code from child component-landingPageSection2 and store it to state
	storeContractCodeToState = contractCode => {
		//console.log(contractCode);
		this.setState({
			contractCode: contractCode
		});
	};
	//reset all neccesary variable when screen is clicked, drop down is selected and other similar events
	removeErrorMessage = () => {
		this.setState({
			warningsList: "",
			creationCost: "",
			executionCost: "",
			gasEstimate: "",
			timeOfAudit: "",
			fileSize: "",
			loading: false,
			vunerabiltiesFound: "",
			noOfLines: "",
			percent: "",
			errorMessage: "",
			successMessage: "",
			renderedList: ""
		});
	};

	renderWarningList = warnings => {
		//create an array for all lines that have errors/warnings
		let errorLines = [];
		warnings.map(warnings => {
			errorLines.push(warnings.key);
		});

		let rndm = 0;
		let list = warnings.map(warnings => {
			return (
				<List.Item key={rndm++}>
					<List.Content>
						<List.Header as="a">line {warnings.key}</List.Header>
						<List.Description as="a">
							{warnings.value}
						</List.Description>
					</List.Content>
				</List.Item>
			);
		});

		//update loading bar
		this.setState({
			percent: "100",
			loading: false,
			renderedList: list,
			errorLines: errorLines,
			warningsList: warnings.length
		});

		//if there are warning/errors, update numbered table to indicate their location
		if (!!errorLines) {
			this.generateNumberedList();
		}
	};

	//generate rendered number list on left side of contract page 1
	generateNumberedList = () => {
		let x = lineNumbers();

		let list = x.map(numbers => {
			//check each line if contains an error
			let errorLine = this.state.errorLines.includes(numbers);
			return (
				<Table.Row key={numbers} error={errorLine}>
					<Table.Cell>{numbers}</Table.Cell>
				</Table.Row>
			);
		});

		//update loading bar
		this.setState({
			numberedList: list
		});
	};

	auditCode = dataArray => {
		return Auditor(dataArray);
	};

	//Compile contract and run audit
	onSubmit = async () => {
		//check if compiler is selected by user else notify user
		if (this.state.currentCompiler) {
			this.setTimeOfAudit();
			let self = this;

			//notify user of progress
			this.setState({
				loading: true,
				errorMessage: "",
				successMessage: ""
			});

			//store contract code to state and prepare for compile and audit
			let source = this.state.contractCode;
			//split code into array based on each new line
			let dataArray = source.split("\n");
			let dataArrayLength = dataArray.length;
			console.log("data array is " + dataArrayLength);

			//update loading bar
			self.setState({
				percent: "25"
			});

			//printlist of available compilers
			window.BrowserSolc.getVersions(function(
				soljsonSources,
				soljsonReleases
			) {
				//console.log(soljsonSources);
				//console.log(soljsonReleases);
			});

			//Load a chosen compiler version
			window.BrowserSolc.loadVersion(
				this.state.currentCompiler,
				async function(compiler) {
					let optimize = 1;
					let result = compiler.compile(source, optimize);
					// result = JSON.stringify(result);
					// result = JSON.parse(result);
					//console.log(result.contracts);
					let contractName = Object.keys(result.contracts)[0];

					//check for errrors in compilation
					if (result.errors && !result.sources[""]) {
						//save all warning and errors to state
						self.setState({
							errorMessage: result.errors[0]
						});
					} else {
						//   	//check for warnings in compilation
						//   	if(result.errors){

						//   //save all warning and errors to state
						//   self.setState({
						//   		errorMessage: result.errors[0]
						//   	})
						// }

						const provider = new Web3.providers.HttpProvider(
							"https://rinkeby.infura.io/v3/c3085f6dbf9347358b5ab5d30de1fdbe"
						);
						const web3 = new Web3(provider);
						//console.log(result);

						let bytecode = result.contracts[contractName].bytecode;

						//compilation was succesful, auditing and updating general stats begins at this point

						//compute total gas cost which is the estimated creation cost plus the execution cost
						// let totalGasCost = result.contracts[":Migrations"].gasEstimates.creation[0]+result.contracts[":Migrations"].gasEstimates.creation[1];

						self.setState({
							noOfLines: dataArrayLength,
							// creationCost:result.contracts[":Migrations"].gasEstimates.creation[0],
							// executionCost:result.contracts[":Migrations"].gasEstimates.creation[1],
							gasEstimate: await web3.eth.estimateGas({
								to:
									"0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
								data: "0x" + bytecode
							}),
							percent: 50,
							successMessage: "Audit Complete!"
						});

						//console.log("gas estimate is " + self.state.gasEstimate)
						//send contract code to auditor and await feed back of array of warnings
						let warnings = self.auditCode(dataArray);
						self.setState({
							percent: 75
						});

						//send array of warnings to renderList function to create organized JSX and update state
						self.renderWarningList(warnings);
					}
				}
			);
		} else {
			this.setState({
				errorMessage: "Please select a compiler",
				loading: false
			});
		}
	};

	saveUserSuggestionToState = evt => {
		evt.preventDefault();
		let userSuggestion = {};
		userSuggestion.name = this.state.userName;
		userSuggestion.contactInfo = this.state.userContactInfo;
		userSuggestion.suggestion = this.state.userSuggestion;
		let currentSuggestions = this.state.suggestions;
		currentSuggestions.push(userSuggestion);

		this.setState({
			suggestions: currentSuggestions,
			modalOpen: false
		});

		console.log(this.state.suggestions);
	};

	userNameToState = event => {
		this.setState({
			userName: event.target.value
		});
	};

	userContactInfoToState = event => {
		this.setState({
			userContactInfo: event.target.value
		});
	};

	userSuggestionToState = event => {
		this.setState({
			userSuggestion: event.target.value
		});
	};

	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = () => this.setState({ modalOpen: false });

	render() {
		return (
			<Container style={{ width: "1300px", marginTop: "10px" }}>
				<Grid>
					<Grid.Row key={"gridRow1"}>
						<Grid.Column width={11} key={"gridColumn1"}>
							<LandingPageSection1
								generateNumberedList={this.generateNumberedList}
								numberedList={this.state.numberedList}
								contractCode={this.state.contractCode}
								removeErrorMessage={this.removeErrorMessage}
								loading={this.state.loading}
								successMessage={this.state.successMessage}
								errorMessage={this.state.errorMessage}
								percent={this.state.percent}
								storeContractCodeToState={
									this.storeContractCodeToState
								}
							/>
						</Grid.Column>

						<Grid.Column width={4} key={"gridColumn2"}>
							<LandingPageSection2
								warningsList={this.state.warningsList}
								renderedList={this.state.renderedList}
								gasEstimate={this.state.gasEstimate}
								removeErrorMessage={this.removeErrorMessage}
								loading={this.state.loading}
								noOfLines={this.state.noOfLines}
								timeOfAudit={this.state.timeOfAudit}
								onSubmit={this.onSubmit}
								selectCompiler={this.selectCompiler}
							/>
						</Grid.Column>

						<Grid.Column width={1} key={"gridColumn3"}>
							<Modal
								open={this.state.modalOpen}
								onClose={this.handleClose}
								trigger={
									<Button
										onClick={this.handleOpen}
										style={{ marginTop: "775px" }}
										basic
										circular
										size="huge"
									>
										Suggestion Box
									</Button>
								}
							>
								<Modal.Header
									style={{ fontSize: "19px", color: "grey" }}
								>
									Thank you for taking the time to leave some
									feedback, I am a solo enthusiast who created
									this auditor for fun and to contribute to
									our beautiful ecosystem, I appreciate all
									suggestions, contributions and feedback to
									help improve this platform.
								</Modal.Header>
								<Modal.Content image>
									<Modal.Description>
										<Form
											name="contact"
											netlify
											data-netlify="true"
										>
											<Input
												name="First Name"
												onChange={this.userNameToState}
												value={this.state.userName}
												label="Name(optional)"
												placeholder="John Doe....."
											/>
											<Input
												name="email"
												onChange={
													this.userContactInfoToState
												}
												value={
													this.state.userContactInfo
												}
												label="Contact Information"
												placeholder="Email, Telegram,Git..etc"
											/>
											<br />
											<br />
											<TextArea
												name="suggestions"
												onChange={
													this.userSuggestionToState
												}
												value={
													this.state.userSuggestion
												}
												style={{
													width: "850px",
													height: "100px"
												}}
												placeholder="Please enter your message here..."
											/>
											<br />
											<br />
											<Button
												floated="right"
												secondary
												onClick={
													this
														.saveUserSuggestionToState
												}
												type="submit"
											>
												Submit
											</Button>
										</Form>
										<h4 style={{ color: "gray" }}>
											ETH Address:
											0x001FabDCb503f618ceE9d79D949301EEBC170647
										</h4>
									</Modal.Description>
								</Modal.Content>
							</Modal>
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<h4 style={{ marginLeft: "380px", color: "gray" }}>
					Suggestions and Contributions are welcome ETH Address:
					0x001FabDCb503f618ceE9d79D949301EEBC170647
				</h4>
			</Container>
		);
	}
}

export default landingPage;

const lineNumbers = () => {
	let array = [];
	let i;

	for (i = 1; i < 1001; i++) {
		array.push(i);
		//[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
	}

	return array;
};

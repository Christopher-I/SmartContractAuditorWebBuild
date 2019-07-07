import React from "react";
import {
	Segment,
	Form,
	TextArea,
	Progress,
	Message,
	Table,
	Grid
} from "semantic-ui-react";

class landingPageSection1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contractCode: ""
		};
	}

	//when smart contract code changes update the state of the parent
	handleChangesToContract = event => {
		event.preventDefault();
		this.props.removeErrorMessage();
		this.props.storeContractCodeToState(event.target.value);
		this.setState({
			contract: event.target.value
		});
	};

	render() {
		return (
			<Segment style={{ height: "850px", overflow: "scroll" }}>
				<h1> Ethereum Smart Contract Auditor</h1>
				<p style={{ color: "grey" }}>
					{" "}
					Auditor is still in test phase and will be improved over
					time visit
					https://github.com/Christopher-I/SmartContractAuditorWebBuild
				</p>
				<Form
					error={!!this.props.errorMessage}
					success={!!this.props.successMessage}
				>
					<Progress percent={this.props.percent} autoSuccess />
					<Message error content={this.props.errorMessage} />
					<Message
						success
						header="Success!"
						content={this.props.successMessage}
					/>

					<Grid style={{ height: "850px" }}>
						<Grid.Row>
							<Grid.Column width={1}>
								<Table
									color={"grey"}
									celled
									compact
									basic="very"
									selectable
									style={{ marginTop: "11px" }}
								>
									<Table.Body
										style={{
											fontSize: "8px",
											color: "grey",
											textAlign: "center"
										}}
									>
										{this.props.numberedList}
									</Table.Body>
								</Table>
							</Grid.Column>

							<Grid.Column width={15}>
								<TextArea
									value={this.props.contractCode}
									onInput={event => event.preventDefault()}
									onChange={event =>
										this.handleChangesToContract(event)
									}
									style={{
										whiteSpace: "nowrap",
										overflow: "hidden",
										fontSize: "14px",
										lineHeight: "27px",
										height: "100000px",
										width: "3000px",
										color: "#202020"
									}}
									placeholder="Paste your smart contract code here..."
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
			</Segment>
		);
	}
}

export default landingPageSection1;

import React from 'react';
import {Segment, Form, TextArea, Progress,Message,Table,Grid} from 'semantic-ui-react';


class landingPageSection1 extends React.Component{

constructor(props) {
    super(props);
	this.state = {
		contractCode:'',
		lineNumbers:''
	}
}


//when smart contract code changes update the state of the parent
	handleChangesToContract=(event)=>{
		this.props.removeErrorMessage(); 
		this.props.storeContractCodeToState(event.target.value);
		this.setState({
			contract:event.target.value
		});
	}

	componentDidMount(){
		this.generateNumberedList();
	}

	//generate rendered number list on side of page 
	generateNumberedList=()=>{
		let x = lineNumbers();

	let list = x.map(numbers => {        
            return (
            	<Table.Row>
				        <Table.Cell >
				          {numbers}
				        </Table.Cell>
				 </Table.Row>
            );   
        });

	     //update loading bar
        this.setState({
		  		lineNumbers :list

		  	})

	}



	render(){
	const {Input, Group,Field} = Form;
	return (
		<Segment style = {{height:'850px',overflow: 'scroll'}}>
			<h1> QUIKK Smart Contract Auditor</h1> 
			 <p style ={{color:'grey'}}> minimal, fast, open-source smart contract auditor for ethereum</p>
			 <Form error= {!!this.props.errorMessage} success={!!this.props.successMessage}>
			<Progress percent={this.props.percent} autoSuccess />
			<Message error content = {this.props.errorMessage}/>
			<Message success header = "Success!" content = {this.props.successMessage}/>


			<Grid>
			<Grid.Row >
			<Grid.Column width={1}>
				  <Table color={'grey'} celled compact basic ='very' selectable style={{marginTop:'11px'}}>

				    <Table.Body style={{fontSize:'8px',color :'grey',textAlign:'center'}}>
				    {this.state.lineNumbers}

				      </Table.Body>
  			</Table>

			</Grid.Column>

			<Grid.Column width={15}>
			<TextArea value= {this.props.contractCode} onChange={this.handleChangesToContract} style ={{fontSize:'14px',lineHeight:'27px',height:'10000px',color:'#202020'}} placeholder="Paste your smart contract code here..."/>
			 </Grid.Column>

			 </Grid.Row>
			 </Grid>

			 </Form>
		 </Segment>
		)
	}
}

export default landingPageSection1;


			const lineNumbers=()=>{
				let array=[];
				let i;

				for (i=1; i<1001; i++){
					array.push(i);
				//[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
			}

			return array;

			} 

			 // <Field style ={{maxHeight:'680px',minHeight:'680px'}} control={TextArea} label='Full Description' placeholder="Paste your smart contract code here..."
    //   value= {this.state.contract}  onChange={this.handleChangesToContract}  />

    // <TextArea value= {this.state.contract} onChange={this.handleChangesToContract} style ={{maxHeight:'680px',minHeight:'680px'}} placeholder="Paste your smart contract code here..."/>
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{299:function(e,t,a){e.exports=a(592)},422:function(e,t){},424:function(e,t){},472:function(e,t){},507:function(e,t){},592:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(59),i=a.n(s),o=a(37),l=a.n(o),c=a(169),u=a(73),d=a(74),p=a(76),m=a(75),h=a(122),f=a(77),g=a(606),b=a(605),v=a(602),y=a(610),w=function(e){for(var t=[],a={key:"Fiat",warn:"500"},n=[],r=0,s=0;s<e.length;s++)(e[s].includes("function")&&e[s].includes("(")||e[s].includes("contract")&&e[s].includes("{")||e[s].includes("constructor")&&e[s].includes("("))&&t.push(s),e[s].includes("function")&&e[s].includes("(")&&e[s].includes("payable")&&(e[s].includes("internal")||e[s].includes("restricted")||(a={key:s+1,value:"Use caution when making external calls on payable function, ensure you mark trusted contracts/address. "},n.push(a))),e[s].includes(".call()")&&(a={key:s+1,value:"Avoid state changes after external calls."},n.push(a)),e[s].includes(".call.value()")&&(a={key:s+1,value:"Be aware that using '.call.value()', it is susceptible to re-entry attacks, if possible use send() or transfer(). Also do not forget to set your new account balance before the transfer "},n.push(a)),(e[s].includes(".callcode(")||e[s].includes(".call(")||e[s].includes("call(")||e[s].includes(".delegatecall(")||e[s].includes(".send("))&&(e[s].includes("if")||(a={key:s+1,value:"Handle errors in external calls warning: make sure to handle the possibility that the call will fail, by checking the return value."},n.push(a))),e[s].includes("function")&&e[s].includes("(")&&e[s].includes("payable")&&(!e[s].includes("internal")&&e[s].includes("external")||(a={key:s+1,value:"Favor pull over push for external calls.External/Internal Calls can fail accidentally or deliberately. To minimize the damage caused by such failures, it is often better to set up manaul transfers rather than automate them. This is especially relevant for payments, where it is better to let users withdraw funds rather than push funds to them automatically. (This also reduces the chance of problems with the gas limit.)"},n.push(a))),e[s].includes(".delegatecall")&&e[s].includes("(")&&(a={key:s+1,value:"Ensure that the address being used in this delegate call is a trusted address and cannot be changed or supplied by a user, as the result can alter the state of your contract "},n.push(a)),!e[s].includes("function")||!e[s].includes("(")||e[s].includes("internal")||e[s].includes("external")||e[s].includes("private")||e[s].includes("public")||(a={key:s+1,value:"Explicitly label the visibility of functions and state variables. Functions can be specified as being external, public, internal or private. "},n.push(a)),e[s].includes("pragma solidity")&&(e[s].includes(">")||e[s].includes("<"))&&n.push({key:s+1,value:"Lock pragmas to specific compiler version. Locking the pragma helps ensure that contracts do not accidentally get deployed using, for example, the latest compiler which may have higher risks of undiscovered bugs."}),e[s].includes("tx.origin")&&(a={key:s+1,value:"Avoid using tx.origin as it is unsafe, we recommend you should use msg.sender for authorization."},n.push(a)),e[s].includes("block.timestamp")&&(a={key:s+1,value:"Be aware that the timestamp of the block maybe inaccurate as it can be manipulated by a miner and other factors."},n.push(a)),e[s].includes("block.number")&&(a={key:s+1,value:"It is possible to estimate a time delta using the block.number property and average block time, however this is not future proof as block times may change."},n.push(a)),e[s].includes("function")&&e[s].includes("(")&&e[s].includes("address")&&(a={key:s+1,value:"When a function takes a contract address as an argument, it is better to pass an interface or contract type rather than raw address. If the function is called elsewhere within the source code, the compiler it will provide additional type safety guarantees "},n.push(a)),e[s].includes("extcodesize")&&(a={key:s+1,value:"Avoid using extcodesize to check for Externally Owned Accounts."},n.push(a)),(e[s].includes("EIP-20")||e[s].includes("approve("))&&++r>=2&&(a={key:s+1,value:"The EIP-20 token's approve() function creates the potential for an approved spender to spend more than the intended amount. A front running attack can be used, enabling an approved spender to call transferFrom() both before and after the call to approve() is processed."},n.push(a)),e[s].includes("function")&&e[s].includes("(")&&(e[s].includes("transferFrom")||e[s].includes("transfer"))&&(a={key:s+1,value:"Prevent transferring tokens to the 0x0 address and prevent transferring tokens to the same contract address. -After your function declaration, you could the modifier:modifier validDestination( address to ) {require(to != address(0x0));require(to != address(this) );}; line "},n.push(a)),e[s].includes("uint256")&&e[s].includes("=")&&(e[s].includes("*")||e[s].includes("-")||e[s].includes("+")||e[s].includes("/"))&&(a={key:s+1,value:"Be aware that doing math functions on uint256 can cause overflows and underflows. We recommend you implement OpenZeppelin SafeMath"},n.push(a)),e[s].includes("function")&&e[s].includes("(")&&(e[s].includes("transferFrom")||e[s].includes("transfer")||e[s].includes("withdraw"))&&!e[s].includes("onlyPayloadSize")&&(a={key:s+1,value:"Prevent Short address attack by by introducing onlyPayloadSize modifier"},n.push(a));for(var i=0,o=!1,l=!1,c=!1,u=0;u<t.length;u++){for(var d=t[u];d<t[u+1];d++)(e[d].includes(".transfer(")||e[d].includes(".send(")||e[d].includes(".call.value("))&&++i>=2&&(a={key:d+1,value:"Avoid multiple transfers within a single function. line"},n.push(a)),e[d].includes("require(")&&e[d].includes("=")&&e[d].includes("!")&&(o=!0),e[d].includes("require(")&&e[d].includes("this.balance")&&(l=!0),e[d].includes("=")&&e[d].includes("0")&&(c=!0),e[d].includes(".send(")&&(o||(a={key:d+1,value:"Be aware of rerentrancy attack. Before withdraw or transfers, use a require statement to ensure user has available fund. Example require(UserBalance != 0)"},n.push(a)),l||(a={key:d+1,value:"Be aware of rerentrancy attack. Before withdraw or transfers, use a require statement to ensure smart contract has available fund. require(this.balance >= payment)"},n.push(a)),c||(a={key:d+1,value:"Be aware of rerentrancy attack. Set post-withdrawal balance before sending."},n.push(a)));i=0,o=!1,l=!1,c=!1}return n},E=a(609),C=a(603),k=a(601),S=a(607),x=a(600),O=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(p.a)(this,Object(m.a)(t).call(this,e))).handleChangesToContract=function(e){e.preventDefault(),a.props.removeErrorMessage(),a.props.storeContractCodeToState(e.target.value),a.setState({contract:e.target.value})},a.state={contractCode:""},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(E.a,{style:{height:"850px",overflow:"scroll"}},r.a.createElement("h1",null," Ethereum Smart Contract Auditor"),r.a.createElement("p",{style:{color:"grey"}}," ","Auditor is still in test phase and will be improved over time visit https://github.com/Christopher-I/SmartContractAuditorWebBuild"),r.a.createElement(C.a,{error:!!this.props.errorMessage,success:!!this.props.successMessage},r.a.createElement(k.a,{percent:this.props.percent,autoSuccess:!0}),r.a.createElement(S.a,{error:!0,content:this.props.errorMessage}),r.a.createElement(S.a,{success:!0,header:"Success!",content:this.props.successMessage}),r.a.createElement(y.a,{style:{height:"850px"}},r.a.createElement(y.a.Row,null,r.a.createElement(y.a.Column,{width:1},r.a.createElement(b.a,{color:"grey",celled:!0,compact:!0,basic:"very",selectable:!0,style:{marginTop:"11px"}},r.a.createElement(b.a.Body,{style:{fontSize:"8px",color:"grey",textAlign:"center"}},this.props.numberedList))),r.a.createElement(y.a.Column,{width:15},r.a.createElement(x.a,{value:this.props.contractCode,onInput:function(e){return e.preventDefault()},onChange:function(t){return e.handleChangesToContract(t)},style:{whiteSpace:"nowrap",overflow:"hidden",fontSize:"14px",lineHeight:"27px",height:"100000px",width:"3000px",color:"#202020"},placeholder:"Paste your smart contract code here..."}))))))}}]),t}(r.a.Component),L=a(608),A=a(604),M=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).selectCompiler=function(e){a.props.selectCompiler(e.target.innerText),a.props.removeErrorMessage()},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement(E.a,{style:{height:"850px",overflow:"scroll"}},r.a.createElement(L.a,{primary:!0,style:{width:"255px"},onClick:this.props.onSubmit,loading:this.props.loading},"Run Audit"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(A.a,{placeholder:"Select Compiler",fluid:!0,selection:!0,onChange:this.selectCompiler,options:j}),r.a.createElement("h4",null,"General Stats"),r.a.createElement(E.a,null,r.a.createElement("label",{style:{color:"grey"}}," Time of Audit: "),r.a.createElement("label",null," ",this.props.timeOfAudit," "),r.a.createElement("br",null),r.a.createElement("label",{style:{color:"grey"}}," Warnings: "),r.a.createElement("label",null," ",this.props.warningsList," "),r.a.createElement("br",null),r.a.createElement("label",{style:{color:"grey"}}," ","Estimated Gas Cost:"," "),r.a.createElement("label",null," ",this.props.gasEstimate," "),r.a.createElement("br",null),r.a.createElement("label",{style:{color:"grey"}}," ","Approx Lines of Code:"," "),r.a.createElement("label",null," ",this.props.noOfLines," ")),r.a.createElement("h4",{style:{color:"#FF9933"}},"Warnings"),r.a.createElement(E.a,null,r.a.createElement(g.a,{divided:!0,relaxed:!0},this.props.renderedList)))}}]),t}(r.a.Component),j=[{text:"soljson-v0.4.24+commit.e67f0147.js",value:"soljson-v0.4.24+commit.e67f0147.js"},{text:"soljson-v0.4.26+commit.4563c3fc.js",value:"soljson-v0.4.26+commit.4563c3fc.js"}],T=M,B=a(173),F=a.n(B),I=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(a=Object(p.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).state={currentCompiler:"",contractCode:"",creationCost:"",executionCost:"",gasEstimate:"",timeOfAudit:"",fileSize:"",vunerabiltiesFound:"",noOfLines:"",percent:"",errorMessage:"",successMessage:"",renderedList:"",loading:!1,suggestions:[],userName:"",userContactInfo:"",userSuggestion:"",modalOpen:!1,errorLines:"0",lineNumbers:""},a.setTimeOfAudit=function(){var e=new Date,t=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()+" "+(e.getHours()+":"+e.getMinutes()+":"+e.getSeconds());a.setState({timeOfAudit:t})},a.selectCompiler=function(e){a.setState({currentCompiler:e})},a.storeContractCodeToState=function(e){a.setState({contractCode:e})},a.removeErrorMessage=function(){a.setState({warningsList:"",creationCost:"",executionCost:"",gasEstimate:"",timeOfAudit:"",fileSize:"",loading:!1,vunerabiltiesFound:"",noOfLines:"",percent:"",errorMessage:"",successMessage:"",renderedList:""})},a.renderWarningList=function(e){var t=[];e.map(function(e){t.push(e.key)});var n=0,s=e.map(function(e){return r.a.createElement(g.a.Item,{key:n++},r.a.createElement(g.a.Content,null,r.a.createElement(g.a.Header,{as:"a"},"line ",e.key),r.a.createElement(g.a.Description,{as:"a"},e.value)))});a.setState({percent:"100",loading:!1,renderedList:s,errorLines:t,warningsList:e.length}),t&&a.generateNumberedList()},a.generateNumberedList=function(){var e=D().map(function(e){var t=a.state.errorLines.includes(e);return r.a.createElement(b.a.Row,{key:e,error:t},r.a.createElement(b.a.Cell,null,e))});a.setState({numberedList:e})},a.auditCode=function(e){return w(e)},a.onSubmit=Object(c.a)(l.a.mark(function e(){var t,n,r,s;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.state.currentCompiler?(a.setTimeOfAudit(),t=Object(h.a)(a),a.setState({loading:!0,errorMessage:"",successMessage:""}),n=a.state.contractCode,r=n.split("\n"),s=r.length,console.log("data array is "+s),t.setState({percent:"25"}),window.BrowserSolc.getVersions(function(e,t){}),window.BrowserSolc.loadVersion(a.state.currentCompiler,function(){var e=Object(c.a)(l.a.mark(function e(a){var i,o,c,u,d,p;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(1,i=a.compile(n,1),o=Object.keys(i.contracts)[0],!i.errors||i.sources[""]){e.next=7;break}t.setState({errorMessage:i.errors[0]}),e.next=20;break;case 7:return c=new F.a.providers.HttpProvider("https://rinkeby.infura.io/v3/c3085f6dbf9347358b5ab5d30de1fdbe"),u=new F.a(c),d=i.contracts[o].bytecode,e.t0=t,e.t1=s,e.next=14,u.eth.estimateGas({to:"0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",data:"0x"+d});case 14:e.t2=e.sent,e.t3={noOfLines:e.t1,gasEstimate:e.t2,percent:50,successMessage:"Audit Complete!"},e.t0.setState.call(e.t0,e.t3),p=t.auditCode(r),t.setState({percent:75}),t.renderWarningList(p);case 20:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())):a.setState({errorMessage:"Please select a compiler",loading:!1});case 1:case"end":return e.stop()}},e)})),a.saveUserSuggestionToState=function(e){e.preventDefault();var t={};t.name=a.state.userName,t.contactInfo=a.state.userContactInfo,t.suggestion=a.state.userSuggestion;var n=a.state.suggestions;n.push(t),a.setState({suggestions:n,modalOpen:!1}),console.log(a.state.suggestions)},a.userNameToState=function(e){a.setState({userName:e.target.value})},a.userContactInfoToState=function(e){a.setState({userContactInfo:e.target.value})},a.userSuggestionToState=function(e){a.setState({userSuggestion:e.target.value})},a.handleOpen=function(){return a.setState({modalOpen:!0})},a.handleClose=function(){return a.setState({modalOpen:!1})},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.generateNumberedList(),this.setState({contractCode:"pragma solidity ^0.4.0; \n contract SampleContract{ \n address public owner; \n uint public last_completed_SampleContract; \n \n constructor() public { \n owner = msg.sender; \n  } \n \n modifier restricted() { \n if (msg.sender == owner) _; \n }  \n \n function setCompleted(uint completed) public restricted {  \n  last_completed_SampleContract = completed; \n } \n \n function upgrade(address new_address) public restricted { \n SampleContract upgraded = SampleContract(new_address);   \n  upgraded.setCompleted(last_completed_SampleContract); \n } \n }  "})}},{key:"render",value:function(){return r.a.createElement(v.a,{style:{width:"1300px",marginTop:"10px"}},r.a.createElement(y.a,null,r.a.createElement(y.a.Row,{key:"gridRow1"},r.a.createElement(y.a.Column,{width:12,key:"gridColumn1"},r.a.createElement(O,{generateNumberedList:this.generateNumberedList,numberedList:this.state.numberedList,contractCode:this.state.contractCode,removeErrorMessage:this.removeErrorMessage,loading:this.state.loading,successMessage:this.state.successMessage,errorMessage:this.state.errorMessage,percent:this.state.percent,storeContractCodeToState:this.storeContractCodeToState})),r.a.createElement(y.a.Column,{width:4,key:"gridColumn2"},r.a.createElement(T,{warningsList:this.state.warningsList,renderedList:this.state.renderedList,gasEstimate:this.state.gasEstimate,removeErrorMessage:this.removeErrorMessage,loading:this.state.loading,noOfLines:this.state.noOfLines,timeOfAudit:this.state.timeOfAudit,onSubmit:this.onSubmit,selectCompiler:this.selectCompiler})))),r.a.createElement("h4",{style:{marginLeft:"380px",color:"gray"}},r.a.createElement("p",null,"Suggestions and Contributions- https://github.com/Christopher-I/SmartContractAuditorWebBuild",r.a.createElement("br",null),"ETHAddress: 0x001FabDCb503f618ceE9d79D949301EEBC170647")))}}]),t}(r.a.Component),D=function(){var e,t=[];for(e=1;e<1001;e++)t.push(e);return t};i.a.render(r.a.createElement(I,null),document.querySelector("#root"))}},[[299,1,2]]]);
//# sourceMappingURL=main.cdc54015.chunk.js.map
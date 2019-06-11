

export default(dataArray)=>{

        //let dataArray = contractCode.split("\n");
        let actionLines = new Array();
        let warn={key:"Fiat", warn:"500"};
        let warnings=[];
        let  searchFunction= 'function'; // we are looking for a line, contains, key word 'user1' in the file
        let searchExternalCall = '.call()';
        let dangerousCalls1 = '.call.value()';
        let searchCurlyBrace = '()';
        let lastIndex = -1; // let say, we have not found the keyword
        let key;

        let laws = 0;
        let EIPE20Check = 0;


 for (let index=0; index<dataArray.length; index++) {

 //Store action Lines
                // Audit payable transaction restrictions
        if ((dataArray[index].includes(searchFunction) && dataArray[index].includes('(')) || 
        (dataArray[index].includes('contract') && dataArray[index].includes('{')) ||
        (dataArray[index].includes('constructor') && dataArray[index].includes('(')) ){ //find function calls
            actionLines.push(index);

        };

        // Audit payable transaction restrictions
        if ((dataArray[index].includes(searchFunction)) && dataArray[index].includes('(')) { //find function calls
            if (dataArray[index].includes('payable')){ //check if contract is payable
                if (!dataArray[index].includes('internal') && !dataArray[index].includes('restricted')){ //check if contract is payable 
                warn = {key:(index+1), value:"Use caution when making external calls on payable function, ensure you mark trusted contracts/address. "}; 

                warnings.push(warn);
            }
        }
        }
    
    //Audting state changes after external calls
        if (dataArray[index].includes(searchExternalCall)) { //find external calls
            warn = {key:(index+1), value:"Avoid state changes after external calls."};       
                warnings.push(warn);
                
        }
    
        //Be aware of the tradeoffs between send(), transfer(), and call.value()()
        if (dataArray[index].includes(dangerousCalls1)) { //find external calls
            warn = {key:(index+1), value:"Be aware that using '.call.value()', it is susceptible to re-entry attacks, if possible use send() or transfer(). Also do not forget to set your new account balance before the transfer "};      
                warnings.push(warn);
                
        }

        //Handle errors in external calls
                if (dataArray[index].includes('.callcode(') || dataArray[index].includes('.call(')||dataArray[index].includes('call(') || dataArray[index].includes('.delegatecall(') || dataArray[index].includes('.send(')) {
                    //find external calls
                    if (!dataArray[index].includes('if')){
                    warn = {key:(index+1), value:"Handle errors in external calls warning: make sure to handle the possibility that the call will fail, by checking the return value."};     
                    warnings.push(warn);
            }              
        }

// Favor pull over push for external calls
        if (dataArray[index].includes(searchFunction) && dataArray[index].includes('(')) { //find function calls
            if (dataArray[index].includes('payable')){ //check if contract is payable
                if ((dataArray[index].includes('internal')) || (!dataArray[index].includes('external'))) { //check if contract is payable 

                warn = {key:(index+1), value:"Favor pull over push for external calls.External/Internal Calls can fail accidentally or deliberately. To minimize the damage caused by such failures, it is often better to set up manaul transfers rather than automate them. This is especially relevant for payments, where it is better to let users withdraw funds rather than push funds to them automatically. (This also reduces the chance of problems with the gas limit.)"}; 
                warnings.push(warn);
            }
        }
        };


        //Don't delegatecall to untrusted code
        if (((dataArray[index].includes('.delegatecall')) && (dataArray[index].includes('(')))) { //find external calls 
            warn={key:(index+1), value:"Ensure that the address being used in this delegate call is a trusted address and cannot be changed or supplied by a user, as the result can alter the state of your contract "};  
                warnings.push(warn);
                
        }

        //Audit function visibility 
        if ((dataArray[index].includes(searchFunction)) && dataArray[index].includes('(') && (!dataArray[index].includes('internal')) &&
        ((!dataArray[index].includes('external'))) && ((!dataArray[index].includes('private'))) && ((!dataArray[index].includes('public'))) ) {
            warn = {key:(index+1), value:"Explicitly label the visibility of functions and state variables. Functions can be specified as being external, public, internal or private. "};  
            warnings.push(warn); 

        }

            //Lock Pragma on specific solidity version
        if ((dataArray[index].includes('pragma solidity')) && ((dataArray[index].includes('>')) || (dataArray[index].includes('<'))) ) { //find external calls
                warnings.push({key:(index+1), value: "Lock pragmas to specific compiler version. Locking the pragma helps ensure that contracts do not accidentally get deployed using, for example, the latest compiler which may have higher risks of undiscovered bugs."});
                
        }

            //Avoid using tx.origin
        if (dataArray[index].includes('tx.origin')) { //find external calls
            warn = {key:(index+1), value:"Avoid using tx.origin as it is unsafe, we recommend you should use msg.sender for authorization." };  
                warnings.push(warn);
                
        }

         if (dataArray[index].includes('block.timestamp')) { //find external calls
            warn = {key:(index+1), value:"Be aware that the timestamp of the block maybe inaccurate as it can be manipulated by a miner and other factors."};      
                warnings.push(warn);
                
        }

        if (dataArray[index].includes('block.number')) { //find external calls  
            warn = {key:(index+1), value:"It is possible to estimate a time delta using the block.number property and average block time, however this is not future proof as block times may change."};   

                warnings.push(warn);
                
        }

        //Use interface type instead of the address for type safety
        if ((dataArray[index].includes(searchFunction)) && dataArray[index].includes('(') && dataArray[index].includes('address') ) { //find function calls
                warn = {key:(index+1), value:"When a function takes a contract address as an argument, it is better to pass an interface or contract type rather than raw address. If the function is called elsewhere within the source code, the compiler it will provide additional type safety guarantees "};    
                warnings.push(warn);

        }

        if (dataArray[index].includes('extcodesize')) { //find external calls
            warn = {key:(index+1), value:"Avoid using extcodesize to check for Externally Owned Accounts."};       
                warnings.push(warn);
                
        }

        if ((dataArray[index].includes('EIP-20')) || (dataArray[index].includes('approve(')) ){
             EIPE20Check ++;

            if (EIPE20Check >= 2){
                warn = {key:(index+1), value:"The EIP-20 token's approve() function creates the potential for an approved spender to spend more than the intended amount. A front running attack can be used, enabling an approved spender to call transferFrom() both before and after the call to approve() is processed."} ;       
                warnings.push(warn);
            }
        }


        //Prevent transferring tokens to the 0x0 address
        if ((dataArray[index].includes(searchFunction)) && dataArray[index].includes('(') && (dataArray[index].includes('transferFrom') || dataArray[index].includes('transfer')) ) { //find function calls

                warn = {key:(index+1), value:"Prevent transferring tokens to the 0x0 address and prevent transferring tokens to the same contract address. -" + 
                "After your function declaration, you could the modifier:" +
                "modifier validDestination( address to ) {" +
                "require(to != address(0x0));" +
                "require(to != address(this) );" +
                "};" +
                " line "} ;       
                warnings.push(warn);
        }


        //Safemath preventions
        if ((dataArray[index].includes('uint256')) && (dataArray[index].includes('=')) && ((dataArray[index].includes('*')) || 
        (dataArray[index].includes('-')) || (dataArray[index].includes('+')) || (dataArray[index].includes('/')) ) ) { //find external calls
            warn = {key:(index+1), value:"Be aware that doing math functions on uint256 can cause overflows and underflows. We recommend you implement OpenZeppelin SafeMath"};        
                warnings.push(warn);
                
        }



        //Prevent transferring tokens to the 0x0 address
        if ((dataArray[index].includes(searchFunction)) && (dataArray[index].includes('(')) && ((dataArray[index].includes('transferFrom')) || 
        (dataArray[index].includes('transfer')) || (dataArray[index].includes('withdraw'))) && (!dataArray[index].includes('onlyPayloadSize')))  { //find function calls
                warn = {key:(index+1), value:"Prevent Short address attack by by introducing onlyPayloadSize modifier"};       
                warnings.push(warn);
        }


}



    let transferCount =0;
    let setRequireStatementForIndividualBalanceNotZeroValve = false;
    let setRequireStatementForAccountBalanceValve = false;
    let setAccountBalanceValve = false;

    for (let k = 0; k<actionLines.length; k++){

    for (let i=actionLines[k]; i<actionLines[k+1]; i++) {

        //Audit for multiple transfers within 1 function
        if ((dataArray[i].includes('.transfer('))|| (dataArray[i].includes('.send(')) || (dataArray[i].includes('.call.value('))) {
            transferCount++;
            if(transferCount >=2){
                warn = {key:(i+1), value:"Avoid multiple transfers within a single function. line"} ;
                warnings.push(warn);

            }
        }

        //check if there is require statement for individuals balance
        if (((dataArray[i].includes('require('))) && ((dataArray[i].includes('='))) && ((dataArray[i].includes('!'))) ) {
                setRequireStatementForIndividualBalanceNotZeroValve = true;
        }


        //check if there is require statement that sets smart contract account balance to 0
        if (((dataArray[i].includes('require('))) && ((dataArray[i].includes('this.balance'))) ) {
                setRequireStatementForAccountBalanceValve = true;
        }


        //check if users account balance has been set to zero
        if (((dataArray[i].includes('='))) && ((dataArray[i].includes('0'))) ) {
                setAccountBalanceValve = true;
        }


        //Audting for using .send()
        if ((dataArray[i].includes('.send('))) {

        if(!setRequireStatementForIndividualBalanceNotZeroValve){
                warn = {key:(i+1), value:"Be aware of rerentrancy attack. Before withdraw or transfers, use a require statement to ensure user has available fund. Example require(UserBalance != 0)"} ;
                warnings.push(warn); 
            }

        if(!setRequireStatementForAccountBalanceValve){
                warn = {key:(i+1), value:"Be aware of rerentrancy attack. Before withdraw or transfers, use a require statement to ensure smart contract has available fund. require(this.balance >= payment)"} ;
                warnings.push(warn); 
            }

        if(!setAccountBalanceValve){
                warn = {key:(i+1), value:"Be aware of rerentrancy attack. Set post-withdrawal balance before sending."} ;
                warnings.push(warn); 
            }

        }

    }
    transferCount = 0;//reset transfer count
    setRequireStatementForIndividualBalanceNotZeroValve = false;
    setRequireStatementForAccountBalanceValve = false;
    setAccountBalanceValve = false;
};
    //console.log("warning are " + warnings[1][0]);

    return warnings;

}


   

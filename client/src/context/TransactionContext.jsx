import React,{useEffect,useState} from 'react';
import {ethers} from 'ethers';

import {contractABI,contractAddress} from '../utils/constant';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  

  return transactionsContract;

}


export const TransactionProvider = ({children}) =>{
  const [currentAccount,setCurrentAccount] =useState();
  const [formData,setFormData] =useState({addressTo:'', amount:'',keyword:'',message:''});
  const [isLoading,setIsLoading] =useState(false);
  const [transactionCount,setTransactionCount] =useState(localStorage.getItem('transactionCount')); //storing into localstorage it it is (0)->every time it reloads page
  

  const handleChange=(e,name) => {
    setFormData((prevstate) => ({...prevstate,[name]: e.target.value}));
  }

    const getAllTransaction = async () =>{
        try {
            if(!ethereum) return alert("please install Metamask");
            const transactionsContract = getEthereumContract();
            const availableTransaction =await transactionsContract.getAllTransaction();

           console.log(availableTransaction);
        } catch (error) {
            console.log(error);
        }
    }


 





//checking for wallet is connected or not

    const checkWallet= async () =>{

        try {
            if(!ethereum) return alert("please install Metamask");

        const accounts =await ethereum.request({method :"eth_accounts"});

         if(accounts.length){
            setCurrentAccount(accounts[0]);

            getAllTransaction();
         }
         else{
            console.log("No accounts found! please connect");
         }
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object..");
        }
    }

    const checkIfTransactionExist = async () =>{
        try {
             const transactionsContract = getEthereumContract();
            const transactionCount = await transactionsContract.getTransactionCount();

            window.localStorage.setItem("transactionCount",transactionCount)
        } catch (error) {
            throw new Error("No ethereum object..");
        }
    }





 // transactions 
   const sendTransaction = async() =>{
    try {
        if(!ethereum) return alert("please install Metamask");

        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = getEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        //getdata from user
        await ethereum.request({
            method: "eth_sendTransaction",
            params: [{
              from: currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            }],
          });

          const transactionHash = await transactionsContract.addToBlockhain(addressTo, parsedAmount, message, keyword);

          setIsLoading(true);
          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          console.log(`Success - ${transactionHash.hash}`);
          setIsLoading(false);
  
          const transactionCount = await transactionsContract.getTransactionCount();
  
          setTransactionCount(transactionCount.toNumber());
          window.reload();
    } catch (error) {
        console.log(error);
        throw new Error("No ethereum object..");
    }
   }



    //connecting a account
const connectWallet =async () =>{
        try {
            if(!ethereum) return alert("please install Metamask");
            const accounts =await ethereum.request({method :"eth_requestAccounts"});

            setCurrentAccount(accounts[0]);     //connect initial account

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object..")
        }
    }

        useEffect(() => {
           checkWallet();
           checkIfTransactionExist();
        
          
        }, [])
        


    return(
        <TransactionContext.Provider value={{connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction,isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}
'use client'
import { useState, useRef, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import axios from "axios";

function Page() {
  const nameRef = useRef(null);
  const symbolRef = useRef(null);
  const supplyRef = useRef(null);
  const decimalRef = useRef(null);

  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState(0);
  const [tokenDecimal, setTokenDecimal] = useState(0);

  const { address, isConnected } = useAccount();

  const handleTokenNameChange = (ev:any) => {
    setTokenName(ev.target.value)
  }
  const handleTokenSymbolChange = (ev:any) => {
    setTokenSymbol(ev.target.value)
  }
  const handleTokenSupplyChange = (ev:any) => {
    setTokenSupply(ev.target.value)
  }
  const handleTokenDecimalChange = (ev:any) => {
    setTokenDecimal(ev.target.value)
  }

  const deploy= async () => {
    if(tokenName == "") {
      alert("Token name is invalid.")
      nameRef.current.focus()
    }
    else if(tokenSymbol == "") {
      alert("Token symbol is invalid.")
      symbolRef.current.focus()
    }
    else if(tokenSupply == 0) {
      alert("Total supply is invalid.")
      supplyRef.current.focus()
    }
    else if(tokenDecimal == 0) {
      alert("Total decimal is invalid.")
      decimalRef.current.focus()
    }
    else if(!isConnected) {
      alert("Please connect your wallet.")
    }
    else {
      var button = document.getElementById('deploy');
      button.style.disabled = "disabled";
      var res = await axios.post('http://localhost:4000/compile', {tokenName, tokenSymbol, tokenSupply, tokenDecimal});
      if(res.data.status == "Failed")
        alert(res.data.error);
      else
        alert(res.data.address);
        button.style.disabled = "";
    }
  }

  return (
    <main className="p-2">
      <div className="flex justify-end">
        <ConnectButton />
      </div>
      <br></br>
      
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-4 place-content-center h-50 border-4 rounded-lg border-cyan-500 p-4">
          <span>Token Name</span>
          <input type="text" id="token_name" ref={nameRef} className="border border-slate-600 rounded pl-1 pr-1" value={tokenName} onChange={handleTokenNameChange}></input>
          <span>Token Symbol</span>
          <input type="text" id="token_symbol" ref={symbolRef} className="border border-slate-600 rounded pl-1 pr-1" value={tokenSymbol} onChange={handleTokenSymbolChange}></input>
          <span>Total Supply</span>
          <input type="text" id="token_supply" ref={supplyRef} className="border border-slate-600 rounded pl-1 pr-1" value={tokenSupply} onChange={handleTokenSupplyChange}></input>
          <span>Decimal</span>
          <input type="text" id="token_decimal" ref={decimalRef} className="border border-slate-600 rounded pl-1 pr-1" value={tokenDecimal} onChange={handleTokenDecimalChange}></input>
          <span></span>
          <button onClick={deploy} id="deploy" className='h-8 border-0 rounded bg-sky-500/75 hover:bg-cyan-600 text-white'>Deploy</button>
        </div>
      </div>
    </main>
  );
}

export default Page;

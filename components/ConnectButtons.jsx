import React from "react";
import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
} from "@thirdweb-dev/react";

const ConnectButtons = ({ setSC, center }) => {
  const connectWithMetamask = useMetamask();
  const connectWalletConnect = useWalletConnect();
  const connectCoinbaseWallet = useCoinbaseWallet();
  return (
    <>
      <div onClick={() => setSC(false)} className="cb_overlay"></div>
      <div
        style={
          center && {
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            margin: "auto",
            height: "fit-content",
          }
        }
        className="connect_buttons"
      >
        <button id="connectWithMetamask" onClick={connectWithMetamask}>
          <img
            src="https://thirdweb.com/_next/static/media/metamask-fox.a725b9ae.svg"
            alt=""
          />
          <span>Metamask</span>
        </button>
        <button onClick={connectWalletConnect}>
          <img
            src="https://thirdweb.com/_next/static/media/walletconnect-logo.22c58d8d.svg"
            alt=""
          />
          <span>WalletConnect</span>
        </button>
        <button onClick={connectCoinbaseWallet}>
          <img
            src="https://thirdweb.com/_next/static/media/coinbase-wallet-logo.eb53c8d3.svg"
            alt=""
          />
          <span>Coinbase Wallet</span>
        </button>
      </div>
    </>
  );
};

export default ConnectButtons;

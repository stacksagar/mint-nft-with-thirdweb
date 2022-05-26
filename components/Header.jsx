import React, { useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useState } from "react";
import ConnectButtons from "./ConnectButtons";
import DisconnectPopup from "./DisconnectPopup";
import {
  ChainId,
  useNetworkMismatch,
  useNetwork,
  useDisconnect,
} from "@thirdweb-dev/react";

const Header = ({ setSelected, nativeBalance }) => {
  const disconnect = useDisconnect();
  const [showMeneItem, setShowMenuItem] = useState(false);
  const address = useAddress();
  const [showConnects, setSC] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(true);

  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  function SwitchNetwork() {
    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(ChainId.Rinkeby);
    }
  }

  useEffect(() => {
    if (!address) return;
    setSC(false);
  }, [address]);

  return (
    <header className="header">
      {showConnects && <ConnectButtons setSC={setSC} />}
      {showMeneItem && <DisconnectPopup setShowMenuItem={setShowMenuItem} />}
      <div onClick={() => setSelected("home")} className="header_left">
        <img
          src="https://i.ibb.co/PNDqgXN/head.png"
          alt=""
          width={50}
          height={50}
        />
        <span>
          DAZED SKULLS <br /> CREW
        </span>
      </div>
      <div className="header_right">
        {address ? (
          isOnWrongNetwork ? (
            <>
              <div style={{ position: "relative" }}>
                <button onClick={SwitchNetwork} className="switch_network">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                    focusable="false"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      strokeLinecap="square"
                      strokeMiterlimit="10"
                      strokeWidth="32"
                      d="M304 48l112 112-112 112m94.87-112H96m112 304L96 352l112-112m-94 112h302"
                    ></path>
                  </svg>
                  <span>Switch Network</span>
                </button>
                <button onClick={disconnect} className="switchDisconnect">
                  Disconnect
                </button>
              </div>
              {showErrorMsg && (
                <p className="error_text">
                  <span
                    onClick={() => setShowErrorMsg(false)}
                    className="removeMsg"
                  >
                    X
                  </span>
                  <span>
                    You are currently connected to the wrong network. Please
                    <br />
                    switch your network to continue.
                  </span>
                  <br />
                  <br />
                  <span>
                    If you are using WalletConnect or Coinbase Wallet, you may
                    <br />
                    need to manually switch networks on your app.
                  </span>
                </p>
              )}
            </>
          ) : (
            <div
              onClick={() => setShowMenuItem((p) => !p)}
              style={{
                borderRadius: `50px`,
                background: `${showMeneItem ? "#444" : "#222"}`,
              }}
              className="address_area"
            >
              <img
                src="https://static.cdnlogo.com/logos/e/39/ethereum.svg"
                alt=""
                width={15}
                height={30}
              />
              <div>
                <small>{nativeBalance} ETH</small>
                <span>
                  {address?.substring(0, 4)}...
                  {address?.substring(address.length - 3)}
                  {/* (Rinkeby) */}
                </span>
              </div>
              {showMeneItem ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          )
        ) : (
          <button onClick={() => setSC((p) => !p)} className="connect_button">
            CONNECT WALLET
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

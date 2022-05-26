import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import React from "react";
import UseCopy from "./UseCopy";

const DisconnectPopup = ({ setShowMenuItem }) => {
  const address = useAddress();
  const disconnect = useDisconnect();
  return (
    <>
      <div onClick={() => setShowMenuItem(false)} className="dp_overlay"></div>
      <div id="disconnect_popup">
        <div className="head">
          <h2>Account Details</h2>
          <h1 onClick={() => setShowMenuItem(false)}>&times;</h1>
        </div>
        <br />
        <div className="options">
          <UseCopy textToCopy={address}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 512 512"
              focusable="false"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M408 480H184a72 72 0 01-72-72V184a72 72 0 0172-72h224a72 72 0 0172 72v224a72 72 0 01-72 72z"></path>
              <path d="M160 80h235.88A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z"></path>
            </svg>
          </UseCopy>
          <UseCopy textToCopy={address}>
            {address?.substring(0, 4)}...
            {address?.substring(address.length - 3)}
          </UseCopy>
          <button
            onClick={() => {
              disconnect();
              setTimeout(() => {
                setShowMenuItem(false);
              }, 1);
            }}
          >
            Disconnect
          </button>
        </div>
      </div>
    </>
  );
};

export default DisconnectPopup;

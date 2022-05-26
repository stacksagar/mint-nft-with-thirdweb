import React, { useState, useEffect } from "react";
import Landing from "../components/Landing";
import Mint from "../components/Mint";
import Loading from "../components/Loading";
import axios from "axios";
import Web3 from "web3";

export default function Homepage() {
  const [selected, setSelected] = useState("home");
  const [selectedNFT, setSelectedNft] = useState({});
  const [collections, setCollections] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetch_data = async () => {
      const res = await axios.get("https://alper-kosen-server.herokuapp.com");
      const data = await res.data;
      setCollections(data.collections);
      setIsFetched(true);
    };

    fetch_data();
  }, []);

  function setSN(id) {
    const nft = collections?.find((c) => c._id === id);
    setSelectedNft(nft);
  }

  const [nativeBalance, setNativeBalance] = useState(0);
  useEffect(() => {
    async function get_balance() {
      if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        var accounts = await web3.eth.getAccounts();
        web3.eth.getBalance(accounts[0]).then((val) => {
          let balance = web3.utils.fromWei(val);
          setNativeBalance(Number(balance).toFixed(4));
        });
        try {
          // Request account access
          await window.ethereum.enable();
          return true;
        } catch (e) {
          // User denied access
          return false;
        }
      }
    }

    get_balance();
  }, []);

  if (!isFetched) return <Loading />;

  return (
    <>
      {selected === "home" && (
        <Landing
          nativeBalance={nativeBalance}
          collections={collections}
          setSelected={setSelected}
          setSN={setSN}
        />
      )}

      {selected === "mint" && (
        <Mint
          nativeBalance={nativeBalance}
          collection={selectedNFT}
          setSelected={setSelected}
        />
      )}
    </>
  );
}

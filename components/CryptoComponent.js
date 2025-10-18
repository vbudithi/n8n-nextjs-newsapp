import React, { useState, useEffect } from "react";
import Image from "next/image";
import bitlogo from "@/assets/images/bitcoin-logo.png";
import ethlogo from "@/assets/images/ethereum-logo.png";
import tetherlogo from "@/assets/images/tether-usdt-logo.png";
import xrplogo from "@/assets/images/xrp-logo.png";
import solalogo from "@/assets/images/solana-logo.png";

const CRYPTO_DATA = [
  { name: "Bitcoin", logo: bitlogo, value: "bitcoin" },
  { name: "Ethereum", logo: ethlogo, value: "ethereum" },
  { name: "Tether", logo: tetherlogo, value: "tether" },
  { name: "Xrp", logo: xrplogo, value: "ripple" },
  { name: "Solana", logo: solalogo, value: "solana" },
];

export default function CryptoComponent() {
  const [crypto, setCrypto] = useState({});

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        console.log("🔄 [CRYPTO] Fetching crypto data...");
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,ripple,solana&vs_currencies=usd"
        );

        if (!res.ok) {
          console.error("❌ [CRYPTO] API Error:", res.status, res.statusText);
          return;
        }

        const data = await res.json();

        const cryptoData = {
          bitcoin: data.bitcoin?.usd ?? null,
          ethereum: data.ethereum?.usd ?? null,
          tether: data.tether?.usd ?? null,
          ripple: data.ripple?.usd ?? null,
          solana: data.solana?.usd ?? null,
        };

        console.log("crypto data", cryptoData);

        setCrypto(cryptoData);
      } catch (error) {
        console.error("❌ [CRYPTO] Error:", error.message);
      }
    };

    fetchCryptoData();
  }, []);

  const getCryptoValue = (key) => crypto[key];
  console.log("crypto", crypto);

  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      {/* Desktop Horizontal Card Layout */}
      <div className="hidden md:flex gap-4 w-full max-w-6xl justify-center">
        {CRYPTO_DATA.map((coin) => (
          <div
            key={coin.name}
            className="flex items-center gap-3 bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm rounded-xl p-4 border border-teal-200/50 dark:border-teal-700/50 hover:shadow-md transition flex-1"
          >
            <Image
              src={coin.logo}
              alt={coin.name}
              width={36}
              height={36}
              className="rounded-full flex-shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 dark:text-white">
                {coin.name}
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {getCryptoValue(coin.value)
                  ? `$${getCryptoValue(coin.value).toFixed(2)}`
                  : "..."}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Vertical Card Layout */}
      <div className="md:hidden w-full overflow-x-scroll pb-4  ">
        <div className="flex gap-3 min-w-min px-4">
          {CRYPTO_DATA.map((coin) => (
            <div
              key={coin.name}
              className="flex flex-col items-center gap-2 bg-white dark:bg-neutral-800 rounded-xl p-3 border border-teal-200/50 dark:border-teal-700/50 hover:shadow-md transition flex-shrink-0 w-24"
            >
              <Image
                src={coin.logo}
                alt={coin.name}
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="font-semibold text-slate-900 dark:text-white text-xs text-center">
                {coin.name}
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                {getCryptoValue(coin.value)
                  ? `$${getCryptoValue(coin.value).toFixed(2)}`
                  : "..."}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

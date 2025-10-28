import React, { useState, useEffect } from "react";
import Image from "next/image";
import bitlogo from "@/assets/images/bitcoin-logo.png";
import ethlogo from "@/assets/images/ethereum-logo.png";
import tetherlogo from "@/assets/images/tether-usdt-logo.png";
import xrplogo from "@/assets/images/xrp-logo.png";
import solalogo from "@/assets/images/solana-logo.png";
import { fetchCryptoData } from "@/utils/request";

const cryptoData = [
  { name: "Bitcoin", logo: bitlogo, value: "bitcoin" },
  { name: "Ethereum", logo: ethlogo, value: "ethereum" },
  { name: "Tether", logo: tetherlogo, value: "tether" },
  { name: "Xrp", logo: xrplogo, value: "ripple" },
  { name: "Solana", logo: solalogo, value: "solana" },
];

export default function CryptoComponent() {
  const [crypto, setCrypto] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadCrypto = async () => {
      const data = await fetchCryptoData();
      setCrypto(data || []);
      setLoading(false);
    };

    loadCrypto();
  }, []);

  const getCryptoValue = (key) => crypto[key];

  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      <div className="hidden md:flex gap-4 w-full max-w-6xl justify-center">
        {cryptoData.map((coin) => (
          <div
            key={coin.name}
            className="flex items-center gap-3 bg-white/80  backdrop-blur-sm rounded-xl p-4 border border-teal-200/50 dark:bg-amber-100 hover:shadow-md transition flex-1"
          >
            <Image
              src={coin.logo}
              alt={coin.name}
              width={36}
              height={36}
              className="rounded-full flex-shrink-0"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900">{coin.name}</span>
              <span className="font-bold text-emerald-600 text-sm">
                {getCryptoValue(coin.value)
                  ? `$${getCryptoValue(coin.value).toFixed(2)}`
                  : "..."}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View Card Layout */}
      <div className="md:hidden w-full overflow-x-scroll pb-4  ">
        <div className="flex gap-3 min-w-min px-4">
          {cryptoData.map((coin) => (
            <div
              key={coin.name}
              className="flex flex-col items-center gap-2 bg-white rounded-xl p-3 border border-teal-200/50 hover:shadow-md transition flex-shrink-0 w-24"
            >
              <Image
                src={coin.logo}
                alt={coin.name}
                width={28}
                height={28}
                className="rounded-full"
                loading="lazy"
              />
              <span className="font-semibold text-slate-900 text-xs text-center">
                {coin.name}
              </span>
              <span className="font-bold text-emerald-600 text-xs">
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

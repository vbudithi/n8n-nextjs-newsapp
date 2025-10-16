import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import bitlogo from "@/assets/images/bitcoin-logo.png";
import ethlogo from "@/assets/images/ethereum-logo.png";
import tetherlogo from "@/assets/images/tether-usdt-logo.png";
import xrplogo from "@/assets/images/xrp-logo.png";
import solalogo from "@/assets/images/solana-logo.png";
import { formatTime } from "@/app/lib/date";

const CRYPTO_DATA = [
  { name: "Bitcoin", logo: bitlogo, value: "bitcoin" },
  { name: "Ethereum", logo: ethlogo, value: "ethereum" },
  { name: "Tether", logo: tetherlogo, value: "tether" },
  { name: "Xrp", logo: xrplogo, value: "ripple" },
  { name: "Solana", logo: solalogo, value: "solana" },
];

const METAL_DATA = [
  { name: "Gold", logo: bitlogo, value: "gold" },
  { name: "Silver", logo: ethlogo, value: "silver" },
  { name: "Platinum", logo: tetherlogo, value: "platinum" },
];

export default function MarketSidebar() {
  const [crypto, setCrypto] = useState({});
  const [metals, setMetals] = useState({});
  const [cryptoUpdatedAt, setCryptoUpdatedAt] = useState(null);
  const [metalUpdatedAt, setMetalUpdatedAt] = useState(null);

  // fetch crypto data
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
        console.log("✅ [CRYPTO] Raw API Response:", data);

        const cryptoData = {
          bitcoin: data.bitcoin?.usd ?? null,
          ethereum: data.ethereum?.usd ?? null,
          tether: data.tether?.usd ?? null,
          ripple: data.ripple?.usd ?? null,
          solana: data.solana?.usd ?? null,
        };

        console.log("📊 [CRYPTO] Formatted Data:", cryptoData);
        setCrypto(cryptoData);
        setCryptoUpdatedAt(new Date());
      } catch (error) {
        console.error("❌ [CRYPTO] Error:", error.message);
      }
    };

    fetchCryptoData();

    // Fetch crypto data every 3 hours
    const interval = setInterval(() => {
      console.log("⏰ [CRYPTO] 3-hour interval triggered");
      fetchCryptoData();
    }, 3 * 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Fetch metals data
  useEffect(() => {
    let timeoutId;
    let intervalId;

    const fetchMetalsData = async () => {
      try {
        console.log("🔄 [METALS] Fetching metals data...");
        const res = await fetch(
          "https://api.metalpriceapi.com/v1/latest?api_key=54fd4e44e471e3279b5cc83f4c0d7818&base=USD&currencies=EUR,XAU,XAG,XPT"
        );

        if (!res.ok) {
          console.error("❌ [METALS] API Error:", res.status, res.statusText);
          return;
        }

        const data = await res.json();

        const metalsData = {
          gold: data.rates?.XAU ?? null,
          silver: data.rates?.XAG ?? null,
          platinum: data.rates?.XPT ?? null,
        };
        console.log("📊 [METALS] Formatted Data:", metalsData);
        setMetals(metalsData);
        setMetalUpdatedAt(new Date());
      } catch (error) {
        console.error("❌ [METALS] Error:", error.message);
      }
    };

    // Schedule daily metals data fetch at 9 AM
    const scheduleNextFetch = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(9, 0, 0, 0);

      if (now > target) {
        target.setDate(target.getDate() + 1);
      }

      const delay = target - now;
      timeoutId = setTimeout(() => {
        fetchMetalsData();

        // After the first fetch at 9 AM, set interval to 24 hours
        intervalId = setInterval(() => {
          fetchMetalsData();
        }, 24 * 60 * 60 * 1000);
      }, delay);
    };

    fetchMetalsData();
    scheduleNextFetch();
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const getCryptoValue = (key) => crypto[key];
  const getMetalValue = (key) => metals[key];

  return (
    <aside className="w-full space-y-6">
      {/* Crypto Section */}
      <div className="bg-gradient-to-b from-white to-slate-50 dark:from-neutral-900 dark:to-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Crypto
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            <span>{formatTime(cryptoUpdatedAt)}</span>
          </span>
        </div>
        <div className="space-y-3">
          {CRYPTO_DATA.map((coin) => (
            <div
              key={coin.name}
              className="flex justify-between items-center bg-slate-100 dark:bg-neutral-800 rounded-lg p-3 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={coin.logo}
                  alt={coin.name}
                  width={26}
                  height={26}
                  className="rounded-full"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {coin.name}
                </span>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {getCryptoValue(coin.value)
                  ? `$${getCryptoValue(coin.value).toFixed(2)}`
                  : "--"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Metals Section */}
      <div className="bg-gradient-to-b from-white to-slate-50 dark:from-neutral-900 dark:to-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
            <TrendingUp className="h-5 w-5 text-red-500" />
            Metals
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            <span>{formatTime(metalUpdatedAt)}</span>
          </span>
        </div>
        <div className="space-y-3">
          {METAL_DATA.map((metal) => (
            <div
              key={metal.name}
              className="flex justify-between items-center bg-slate-100 dark:bg-neutral-800 rounded-lg p-3 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                {/* <Image
                  src={metal.logo}
                  alt={metal.name}
                  width={26}
                  height={26}
                  className="rounded-full"
                /> */}
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {metal.name}
                </span>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {getMetalValue(metal.value)
                  ? `$${getMetalValue(metal.value).toFixed(6)}`
                  : "--"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

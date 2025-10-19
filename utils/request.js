import { supabase } from "@/app/lib/supabaseClient";

//fetch all articles in articles/page.js
async function fetchArticles() {
  try {
    const { data, error } = await supabase
      .from("tech_news")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching news:", error);
      return null;
    }
    console.log("✅ Old articles:", data);
    return data || [];
  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
    return null;
  }
}

//fetch articles by ID in articles/[id]/page.js
async function fetchArticle(id) {
  try {
    const { data, error } = await supabase
      .from("tech_news")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("❌ Error fetching article by ID:", error);
      return null;
    }
    console.log("✅ Fetched article by ID:", data);
    return data;
  } catch (error) {
    console.error("Unexpected error", error.message);
    return null;
  }
}

//fetch new articles by date range in components/Newsfeed.js
async function fetchNewArticlesByDateRange(startOfDay, endOfDay) {
  try {
    const { data, error } = await supabase
      .from("tech_news")
      .select("*")
      .gte("published_at", startOfDay)
      .lte("published_at", endOfDay)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching new articles:", error);
      return null;
    }
    console.log("✅ Fetched new articles today:", data);
    return data;
  } catch (error) {
    console.error("Unexpected error", error.message);
    return null;
  }
}
//fetch crypto data in components/CryptoComponent.js
async function fetchCryptoData() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,ripple,solana&vs_currencies=usd"
    );
    if (!res.ok) {
      console.error("❌ [CRYPTO] API Error:", res.status, res.statusText);
      return null;
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

    return cryptoData;
  } catch (error) {
    console.error("❌ [CRYPTO] Error:", error.message);
    return null;
  }
}
export {
  fetchArticles,
  fetchArticle,
  fetchNewArticlesByDateRange,
  fetchCryptoData,
};

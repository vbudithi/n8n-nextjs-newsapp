import { supabase } from "@/app/lib/supabaseClient";
import { Teachers } from "next/font/google";

//fetch all articles in articles/page.js
async function fetchArticles() {
  try {
    const { data, error } = await supabase
      .from("tech_news")
      .select("*")
      .not("tags", "is", null)
      .neq("tags", "{}")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching news:", error);
      return null;
    }
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
    console.log("data", data);
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
      .not("tags", "is", null)
      .neq("tags", "{}")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching new articles:", error);
      return null;
    }
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
    return cryptoData;
  } catch (error) {
    console.error("❌ [CRYPTO] Error:", error.message);
    return null;
  }
}

//fetch articles by selected tags
async function fetchArticlesByTags(selectedTags) {
  try {
    let query = supabase
      .from("tech_news")
      .select("*")
      .not("tags", "is", null)
      .neq("tags", "{}")
      .order("published_at", { ascending: false });

    if (selectedTags.length > 0) {
      query = query.overlaps("tags", selectedTags);
    }
    const { data, error } = await query;
    if (error) {
      console.error("❌ Error fetching articles by tags:", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error(
      "❌ Unexpected error fetching articles by tags:",
      error.message
    );
    return null;
  }
}

export {
  fetchArticles,
  fetchArticle,
  fetchNewArticlesByDateRange,
  fetchCryptoData,
  fetchArticlesByTags,
};

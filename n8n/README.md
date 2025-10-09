# 📰 News App Automation (n8n)

This workflow powers a modular news app that fetches top articles, summarizes them using ChatGPT, filters them by topic tags, and pushes the cleaned data to Excel and Supabase. The frontend (built in Next.js) renders these articles dynamically.

---

## 🔧 Workflow Tags & Steps

### 🟢 `Trigger`
Starts the workflow manually or on a schedule.

### 🌐 `Get news from News API`
Retrieves the top 10 articles, one from each of 10 different news sources.

### ✂️ `Extract news titles`, `Extract news descriptions`, `Extract news content`
Breaks down each article into its key components.

### 🧼 `Clean - remove HTML entities`, `Clean - remove stop words`
Cleans the content for readability and prepares it for summarization.

### 🧠 `ChatGPT Summary`
Uses OpenAI to generate a concise summary of each article.

### 🏷️ `Get keywords`, `Assign tags`
Extracts relevant keywords and assigns topic tags for filtering (e.g. tech, politics, health).

### 📊 `Write to Excel`
Writes the trimmed and summarized articles to an `.xlsx` file for archival or manual review.

### 📤 `Push to Supabase`
Inserts the final structured data into a Supabase table for frontend rendering.


---

## 📦 Data Fields

| Field         | Description                          |
|---------------|--------------------------------------|
| `title`       | Headline of the article              |    |
| `summary`     | AI-generated summary via ChatGPT     |
| `url`         | Link to the full article             |
| `image_url`   | Thumbnail or preview image           |
| `published_at`| ISO timestamp                        |
| `source`      | Hostname extracted from the URL      |
| `tags`        | Topic-based labels for filtering     |

---

## 🖼️ Visuals

- `newsapp_automation_n8n.png` → Full n8n canvas screenshot  
- `supabase-output.png` → Supabase output  
- `excel-output.png` → Excel node output preview  
- `flowchart.png` → Visual diagram of the pipeline

---

## 🧠 Notes

- All summaries are generated using GPT-3.5 or GPT-4 via OpenAI’s API.
- Tags are derived from keywords and used for topic-based filtering in the frontend.  
- Stores data in Excel and Supabase.
- Supabase acts as the central store for frontend rendering.  


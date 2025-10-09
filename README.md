# 📰 NewsPilot- A Smarter Way to Stay Informed

NewsPilot combines a polished Next.js frontend with a powerful n8n automation backend. It fetches top news articles, summarizes them using AI, filters by topic, and stores them in Supabase for dynamic rendering. This repo showcases how automation and design can work together to deliver a smarter news experience.

This is a personal showcase project designed to demonstrate how modern web technologies and automation can deliver a clean, scalable, and intelligent news experience. Built with **Next.js**, **Tailwind CSS**, **n8n** and **Supabase**, it blends frontend polish with backend orchestration to create a seamless, user-centric platform.

## 🖥️ Frontend Features (Next.js)

- Dynamic rendering of articles from Supabase
- Responsive design with Tailwind CSS
- Smooth hover animations via Framer Motion
- Clean UI with React Icons
- Seamless Search Experience

If you want to go further, you could mention:

- Debounced input for performance
- Real-time filtering from Supabase
- Keyboard accessibility
  Let me know if you want help writing a short demo script or GIF caption to showcase it visually.

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) – React framework with App Router for routing and server-side rendering.
- [React](https://react.dev/) – Core library for building UI components.
- [n8n](https://n8n.io/) – Workflow automation platform for connecting services, triggering logic, and orchestrating backend tasks with visual nodes.
- [Supabase](https://supabase.com/) – Open-source backend with Postgres, auth, and real-time data for scalable app infrastructure.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid styling.
- [Framer Motion](https://www.framer.com/motion/) – Animation library used for hover effects and transitions.
- [React Icons](https://react-icons.github.io/react-icons/) – Scalable vector icons for UI elements.

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

Extracts relevant keywords stores them in Excel for filtering and analysis.

### 📊 `Write to Excel`

Writes the trimmed and summarized articles to an `.xlsx` file for archival or manual review.

### 📤 `Push to Supabase`

Inserts the final structured data into a Supabase table for frontend rendering.

---

## 📦 Data Fields

| Field          | Description                      |
| -------------- | -------------------------------- | --- |
| `title`        | Headline of the article          |     |
| `summary`      | AI-generated summary via ChatGPT |
| `url`          | Link to the full article         |
| `image_url`    | Thumbnail or preview image       |
| `published_at` | ISO timestamp                    |
| `source`       | Hostname extracted from the URL  |
| `tags`         | Topic-based labels for filtering |

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

## 📦 Local Setup

To run the project locally:

```bash
npm install     # Install dependencies
npm run dev     # Start the development server
```

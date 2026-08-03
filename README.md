# Vikranth's Personal Portfolio & Resume Match Analyzer

🚀 **[View Live Portfolio Here](#)** *(Replace with your actual Vercel link!)*

An interactive, 3D terminal-themed personal portfolio built with Next.js and Tailwind CSS. It features a fully functional simulated terminal and a **Resume Match Analyzer** powered by the **Groq API** (Llama 3.3), which allows recruiters to paste a job description and instantly see how well my profile matches their requirements.

## 📸 Gallery
*(Add a screenshot or GIF of your portfolio/terminal interface here!)*
`![Terminal Interface Preview](/public/images/rag_assistant.png)`

## 🌟 Features
- **Interactive 3D Terminal Interface**: Type commands like `help`, `portfolio`, `skills`, or `projects` to explore my background.
- **Resume Match Analyzer**: Uses Groq's high-speed LLM inference to analyze job descriptions against my resume and output a detailed match report with scores.
- **Dynamic Content Management**: All data (skills, projects, experience) is driven by a centralized JSON structure for easy updates.
- **Dark Mode & OS Themes**: Toggle between Mac, Windows, and Linux terminal themes effortlessly.
- **Responsive Design**: Flawless experience across all screen sizes and mobile devices.

## 🛠️ Built With
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **AI Integration**: Groq API (`llama-3.3-70b-versatile`)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation
1. Clone the repository:
```bash
git clone https://github.com/saivikranth08/My_Portfolio.git
cd My_Portfolio
```
2. Install dependencies:
```bash
npm install
```
3. **Set up the Groq API Key**:
The Resume Match Analyzer requires a Groq API key to process job descriptions.
- Go to the [Groq Console](https://console.groq.com/keys) and create a free account.
- Generate a new API Key.
- Create a `.env.local` file in the root of the project:
```env
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
```
4. Run the development server:
```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧠 AI Integration (Groq API)
The application utilizes the `llama-3.3-70b-versatile` model via the **Groq API** to perform fast and intelligent candidate-to-job matching. By taking advantage of Groq's LPU inference engine, the analyzer delivers near-instantaneous resume parsing and structured JSON scoring without the need for a heavy backend server.
*(Note: The system also supports Gemini and OpenRouter as fallbacks if configured).*

## 🧩 Easy Customization (Template)
Want to use this portfolio for yourself? It's designed to be easily customized!
Simply navigate to `src/data/content.json` and update the centralized JSON structure with your own skills, experience, and projects. The entire UI will dynamically update to reflect your data.

## ☁️ Deployment
This project is optimized for deployment on [Vercel](https://vercel.com). Simply connect your GitHub repository to Vercel and ensure your `NEXT_PUBLIC_GROQ_API_KEY` is added to the Vercel Environment Variables.
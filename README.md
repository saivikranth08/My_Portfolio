# Personal Portfolio & Resume Match Analyzer

A personal portfolio website built with Next.js, featuring a 3D terminal interface and a Resume Match Analyzer powered by Groq.

## Features
- **3D Terminal Interface:** Explore the portfolio using a simulated terminal.
- **Resume Match Analyzer:** Compare job descriptions against the resume using Groq LLM.
- **Data Driven:** All content is managed via a centralized JSON file.

## Getting Started

### Prerequisites
- Node.js 18+
- Groq API Key

### Installation

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/saivikranth08/My_Portfolio.git
cd My_Portfolio
npm install
```

2. Create a `.env.local` file in the root directory and add your API key:
```env
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
```

3. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.
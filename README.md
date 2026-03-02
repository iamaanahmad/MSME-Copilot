# MSME Copilot 🚀

**MSME Copilot** is an AI-powered compliance and scheme assistant designed specifically for Indian Micro, Small, and Medium Enterprises (MSMEs). It helps business owners track critical deadlines, discover government schemes, and generate personalized compliance checklists in multiple local languages.

## ✨ Features

- **📅 Deadline Tracking**: Automatically tracks upcoming GST, TDS, PF, and ESI deadlines.
- **🤖 AI Compliance Checklists**: Generates comprehensive, business-specific compliance checklists using Google's Gemini AI.
- **🌐 Multilingual Support**: Access the dashboard and AI checklists in English, Hindi (हिंदी), Tamil (தமிழ்), and Urdu (اردو).
- **🏛️ Government Schemes**: Suggests relevant government schemes (Mudra, MSME loans, subsidies) based on business profiles.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **AI Integration**: Google GenAI SDK (`@google/genai`)
- **Markdown Rendering**: React Markdown

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamaanahmad/MSME-Copilot
   cd MSME-Copilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory based on the provided `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and add your Gemini API key:
   ```env
   GEMINI_API_KEY="your_actual_api_key_here"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Visit `http://localhost:3000` (or the port specified in your terminal) to view the application.

## 📁 Project Structure

```
msme-copilot/
├── src/
│   ├── components/
│   │   ├── Checklist.tsx    # AI Checklist generator
│   │   ├── Dashboard.tsx    # Deadline tracking dashboard
│   │   └── Schemes.tsx      # Government scheme suggestions
│   ├── services/
│   │   └── ai.ts            # Gemini API integration
│   ├── App.tsx              # Main application layout
│   ├── constants.ts         # Mock data and language constants
│   ├── types.ts             # TypeScript interfaces
│   ├── index.css            # Tailwind CSS entry point
│   └── main.tsx             # React DOM entry point
├── .env.example             # Environment variables template
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/iamiamaanahmad/MSME-Copilot/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

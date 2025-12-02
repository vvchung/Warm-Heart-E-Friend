# 🤗 暖心 E 友 (Warm Heart E-Friend)

> **「在這個喧囂的世界，留給你一個最溫柔、且隨時都在的角落。」**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Powered by Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4E87F6)](https://deepmind.google/technologies/gemini/)
[![Built with React](https://img.shields.io/badge/Frontend-React%20%2B%20Tailwind-teal)](https://react.dev)

## 🌟 這是什麼？

**暖心 E 友** 是一個基於 Google Gemini API 建構的 **AI 心理健康陪伴原型 (MVP)**。

它不僅是一個聊天機器人，更是一個融合了 **HuatuoGPT 自殺防治守門員 (Safety Guardrail)** 概念的情緒支持系統。我們利用 AI 的同理心與 24/7 不間斷的特性，為使用者提供一個安全、匿名、無壓力的傾訴空間。

### 核心價值
*   **🤍 深度同理**：不只是回應文字，更是聽見你的情緒（基於 CBT 認知行為療法與 ACT 接納承諾療法的對話風格）。
*   **🛡️ 安全守門**：嚴格的危機偵測機制，當識別到高風險關鍵詞（如自傷意念）時，優先啟動危機介入模式，引導至 1925 安心專線。
*   **🌬️ 正念引導**：內建互動式呼吸練習工具，幫助你在 3 分鐘內找回平靜。
*   **🔒 隱私至上**：無需登入、無需註冊，對話紀錄不留存伺服器，真正做到「說完即焚」的安全感。

---

## ✨ 功能亮點 (Feature Highlights)

### 1. 💬 溫暖對話 (Empathetic Chat)
捨棄冰冷的機器人語調，採用台灣在地化口語（如：「壓力山大」、「有點硬」），讓 AI 像朋友一樣陪你聊天。

### 2. 🚨 危機守門員 (Safety Guardrail)
系統內建雙重檢測機制（前端關鍵詞篩選 + LLM 語意判斷）：
*   **一般對話**：提供情緒支持與建議。
*   **高風險對話**：立即切換紅色警示介面，提供專業求助管道。

### 3. 🧘‍♀️ 互動式呼吸練習 (Breathing Exercise)
感到焦慮？點擊右上角的「正念呼吸」，跟隨畫面上的圓圈縮放，進行 4-4-4 呼吸法，即時緩解生理壓力。

### 4. 🏥 資源地圖 (Resource Mapping)
模擬的專業資源轉介介面，幫助使用者在情緒平復後，能進一步尋找實體諮商診所。

---

## 🛠️ 技術架構 (Tech Stack)

本專案採用現代化且輕量的技術堆疊，專注於快速響應與使用者體驗：

*   **核心 AI 模型**: Google Gemini 2.5 Flash (`@google/genai` SDK)
*   **前端框架**: React 19 + TypeScript
*   **樣式設計**: Tailwind CSS (打造療癒系 Teal 色調 UI)
*   **構建工具**: Vite
*   **部署環境**: 支援 Vercel / Netlify / AI Studio

---

## 🚀 啟動與部署您的 AI Studio 應用程式

這裡有您在自家電腦上運行 App 所需的一切寶貝！

👀 **在 AI Studio 瞧瞧您的 App：** 
[https://ai.studio/apps/drive/1-cmRdykAwJIS8Ep8YNSqDlYV5XiWx02P?fullscreenApplet=true](https://ai.studio/apps/drive/1-cmRdykAwJIS8Ep8YNSqDlYV5XiWx02P?fullscreenApplet=true)
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

### 💻 在本機端運行

想要在本地運行這個溫暖的專案嗎？只需幾步：

### 1. 取得專案
```bash
git clone https://github.com/your-username/warm-heart-e-friend.git
cd warm-heart-e-friend
```

### 2. 安裝依賴
```bash
npm install
```

### 3. 設定環境變數
請至 [Google AI Studio](https://aistudio.google.com/) 申請 API Key。
在專案根目錄建立 `.env` 檔案（或設定環境變數）：

```env
API_KEY=你的_GEMINI_API_KEY
```
> **注意**：本專案設計為前端直接呼叫 API 以簡化演示，生產環境建議透過後端 Proxy 以保護 Key。

### 4. 啟動開發伺服器
```bash
npm run dev
```
打開瀏覽器訪問 `http://localhost:5173`，開始與暖心 E 友對話吧！

---

## ⚠️ 重要聲明 (Disclaimer)

1.  **非醫療行為**：本應用程式僅供情緒支持與陪伴，**AI 無法取代專業醫師或心理師的診斷與治療**。
2.  **緊急協助**：若您或您身邊的人正處於危急情況，請立即撥打 **119** 或 **1925** 安心專線。
3.  **Prototype 性質**：本專案為概念驗證 (PoC) 原型，診所資料為模擬數據。

---

## 🤝 貢獻與致謝

本專案靈感源自台灣「社會安全網」計畫與 [HuatuoGPT Safety Guardrail](https://github.com/vvchung/HuatuoGPT_Safety_Guardrail) 研究。

歡迎提交 Pull Request 或 Issue，讓我們一起用科技溫暖人心。

---

<div align="center">
  <p>Made with ❤️ for Mental Health Awareness</p>
</div>

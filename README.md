<div align="center">

# Healthy AI

![Healthy Logo](/img/04_Logo_Healthy.png)

</div>

<div align="center">

<a href="https://apps.apple.com/us/app/healthy-weight-calculator/id1673239197"><img src="/img/app-store-available-on-the.svg" width="30%"></a>
<a href="https://play.google.com/store/apps/details?id=com.buachaillmaith.healthycalc"><img src="/img/Google_Play_2022_logo_Get.png" width="30%"></a>

</div>

# 📱 App Preview

<div align="center">

[https://github.com/user-attachments/assets/compressed_healthy_ai_app_preview_github.mp4](https://github.com/user-attachments/assets/77fc6292-b442-4a32-93e9-78a1bbd82998)
  
</div>

# 🧬 AI-Powered Health Intelligence
  
Stop chasing arbitrary numbers. Healthy AI combines medical-grade calculations with generative intelligence to provide a personalized roadmap for your health.
*   **🤖 AI Health Consultant:** A context-aware Generative AI agent that analyzes your specific biometrics (Frame, BMI, Age) to provide actionable nutrition and fitness strategies.
*   **⚖️ Medical Precision:** Utilizes the J.D. Robinson Formula (1983) to calculate Ideal Body Weight based on skeletal frame size, offering a more realistic target than standard BMI.
*   **✨ Glassmorphism UI:** A completely modernized, gesture-driven interface built on the React Native New Architecture.

# 🏗️ Technical Architecture

This project represents a modernization of a legacy codebase into a Cloud-Native, AI-driven platform running on **React Native 0.82 (Fabric)**.

*   **Generative AI Pipeline (Context Injection)**
    The "Consultant" feature is not a generic chatbot. The app aggregates Redux state (biometrics, goals, preferences) and injects them into a system prompt sent to a **Node.js/GraphQL** backend. This backend acts as a secure gateway to the **OpenAI API**, returning structured, medically-contextualized advice without exposing API keys to the client.

*   **Global HLS Video Streaming**
    To eliminate the massive bundle size overhead of local video assets, the onboarding experience was re-architected using **AWS MediaConvert**. Source assets are transcoded into adaptive bitrate HLS streams (`.m3u8`) and delivered via **CloudFront**. The frontend utilizes `react-native-video` with a custom "Curtain Lift" state logic to ensure seamless, glitch-free playback start on both iOS and Android.

*   **New Architecture (Fabric & TurboModules)**
    The application was migrated to React Native 0.82 to leverage the JSI (JavaScript Interface). This eliminates the asynchronous bridge, allowing for synchronous UI updates and 60fps animations even during heavy data processing.

<div align="center">

| ![Welcome](/img/projects/healthy_ai_mockup_welcome.png) | ![Results](/img/projects/healthy_ai_mockup_results.png) | ![AI Chat](/img/projects/healthy_ai_mockup_aichat.png) |
| :---------------------------------------------: | :---------------------------------------------: | :---------------------------------------------: |
| ![BMI](/img/projects/healthy_ai_mockup_bmi.png) | ![Units](/img/projects/healthy_ai_mockup_Units.png) | |

</div>

# System Diagram


```mermaid
graph TD
    User[User Interaction] -->|Input Data| Redux[Redux State Store]
    
    subgraph "Frontend (RN 0.82 Fabric)"
        Redux -->|Biometrics| ChatUI[AI Chat Interface]
        VideoUI[Onboarding Player] -->|HLS Stream| CloudFront
    end

    subgraph "Backend Layer (Docker/ECS)"
        GraphQL["GraphQL API (Apollo/Express)"]
        DB[("PostgreSQL")]
        Cache[("Redis")]
    end

    subgraph "External Services"
        OpenAI["OpenAI GPT-4o-mini"]
        S3["AWS S3 Bucket"]
        MediaConvert["AWS Elemental MediaConvert"]
    end

    ChatUI -->|Mutation| GraphQL
    GraphQL -->|Context Prompt| OpenAI
    GraphQL -->|Persist| DB
    S3 -->|Transcode| MediaConvert
    MediaConvert -->|Distribute| CloudFront
```


# 🛠️ Tech Stack

* **Mobile Framework**: React Native 0.82 (New Architecture Enabled)
* **Language**: TypeScript
* **AI Engine**: OpenAI API (GPT-4o-mini) via Node.js Middleware
* **State Management**: Redux Toolkit
* **API**: GraphQL (Apollo Server / Express)
* **Cloud Infrastructure**: AWS S3, CloudFront, MediaConvert, ECS
* **Database**: PostgreSQL, Redis, Docker
* **UI/UX**: Glassmorphism, Reanimated, SVG Charts




## Main vs design/release project versions

This is the main code project for Healthy Metrics.

You can find its design/release project here:
https://github.com/petemcgowan/healthyMetrics_design_release

<br>
<br>

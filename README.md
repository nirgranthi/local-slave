# 🤖 local-slave

**No High-End GPU? No problem.** Run LLMs directly in your browser. No cloud, no subscriptions, and 100% privacy.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Start_Here-3b82f6?style=for-the-badge&logo=github&logoColor=white)](https://local-slave.nirgranthi.in/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fnirgranthi%2Flocal-slave&label=Visitors&icon=github&color=%23198754&message=&style=flat&tz=UTC)
---

## ✨ Features

- **Local Inference:** Everything runs on your device. No Data ever leaves your device.
- **Zero Configuration:** No Complex setup. Try models on the go.
- **Privacy First:** No cloud computing, no tracking.
- **Performance:** Optimized for small yet capable models.
- **Multi Threading:** Boosts performance by utilizing Multi Threading.

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **AI Engine:** Wllama (Web-based Llama)

## 😎 Know how

- I'll recommend not downloading the models from the local slave page, downloading them directly from huggingface is a faster way.
- The initial context length is 8K, after loading the model, you can click on the recommended mode in the Configure to automatically set the optimal context length according to the model.
- After tweaking settings in the model configs, you need to reload the model to apply those settings, or you can also tweak those before loading the model.
- You don't need to reload the model after tweaking prompt configs.
- If you're getting magic number error, it is probably because you have set the context length more than the model can handle. To fix this, just lower your context length. If you still get this error, then try lowering the no. of threads, if the error still persists then it is probably that the model is too large for the browser.

## 🚀 Getting Started

1. **Clone the repo:**
    ```bash
    git clone https://github.com/nirgranthi/local-slave.git
    cd local-slave
    ```
2. **Install Dependency**
    ```bash
    npm install
    ```
3. **Run Locally**
    ```bash
    npm run dev
    ```

## Limitations

 - Only GGUF models are supported right now.
 - Will start struggling if the model is 1GB+.
 - Will probably not even load if it is 2GB+.
 
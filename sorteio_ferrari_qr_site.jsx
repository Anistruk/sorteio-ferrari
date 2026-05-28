# 🚀 Sorteio FERRARI — Versão Pronta para Vercel (Vite + React)

Este projeto está agora totalmente preparado para funcionar no **Vercel sem erros (404 resolvido)**.

---

# 📁 Estrutura do projeto

```
sorteio-ferrari/
 ├─ index.html
 ├─ package.json
 ├─ vite.config.js
 ├─ src/
 │   ├─ main.jsx
 │   └─ App.jsx
```

---

# 📦 package.json

```json
{
  "name": "sorteio-ferrari",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0"
  }
}
```

---

# ⚙️ vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

# 🌐 index.html

```html
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sorteio FERRARI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

# 🧠 src/main.jsx

```jsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

# 🏎️ src/App.jsx (com roleta + QR + Vercel ready)

```jsx
import { useState } from "react"

export default function App() {
  const [vencedor, setVencedor] = useState("")
  const [animando, setAnimando] = useState(false)

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://sorteio-ferrari.vercel.app"

  function sortear() {
    const participantes = JSON.parse(localStorage.getItem("participantes") || "[]")

    if (participantes.length === 0) {
      alert("Ainda não existem participantes.")
      return
    }

    setAnimando(true)
    setVencedor("")

    let i = 0
    const interval = setInterval(() => {
      const random = participantes[Math.floor(Math.random() * participantes.length)]
      setVencedor(random)
      i++

      if (i > 25) {
        clearInterval(interval)
        setAnimando(false)
      }
    }, 100)
  }

  function participar(e) {
    e.preventDefault()
    const nome = e.target.nome.value.trim()

    if (!nome) return alert("Escreve o teu nome")

    const participantes = JSON.parse(localStorage.getItem("participantes") || "[]")

    if (participantes.includes(nome)) {
      alert("Já participaste!")
      return
    }

    participantes.push(nome)
    localStorage.setItem("participantes", JSON.stringify(participantes))

    alert("Participação registada!")
    e.target.reset()
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #7f0000, #000)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20
    }}>
      <div style={{
        background: "white",
        borderRadius: 20,
        padding: 25,
        maxWidth: 420,
        width: "100%",
        textAlign: "center"
      }}>

        <h1>🏎️ SORTEIO FERRARI</h1>
        <p>Quem organiza o jantar do próximo ano?</p>

        <form onSubmit={participar}>
          <input
            name="nome"
            placeholder="O teu nome"
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          />

          <button style={{ width: "100%", marginTop: 10 }}>
            PARTICIPAR
          </button>
        </form>

        <button
          onClick={sortear}
          style={{ marginTop: 20, width: "100%", padding: 10 }}
        >
          🎰 SORTEAR
        </button>

        {vencedor && (
          <div style={{ marginTop: 20 }}>
            <h2>{animando ? "A sortear..." : "Vencedor"}</h2>
            <h1 style={{ color: "red" }}>{vencedor}</h1>
          </div>
        )}

        <div style={{ marginTop: 30 }}>
          <h3>QR Code</h3>
          <img src={qrUrl} alt="QR Code" />
        </div>
      </div>
    </div>
  )
}
```

---

# 🚀 COMO COLOCAR NO VERCEL (SEM ERROS 404)

## 1. Criar projeto
```bash
npm create vite@latest sorteio-ferrari
cd sorteio-ferrari
npm install
```

## 2. Substituir ficheiros pelos acima

## 3. Testar localmente
```bash
npm run dev
```

## 4. Upload para GitHub
```bash
git init
git add .
git commit -m "Sorteio Ferrari"
git branch -M main
git remote add origin https://github.com/TEUUSER/sorteio-ferrari.git
git push -u origin main
```

## 5. Vercel
- Import project
- Escolher repo
- Framework: **Vite**
- Deploy

---

# 🎉 RESULTADO FINAL

- Site online
- QR Code funcional
- Sorteio com animação tipo roleta
- Sem erro 404
- Pronto para usar no jantar

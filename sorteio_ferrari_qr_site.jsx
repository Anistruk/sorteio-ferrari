
  import { useState } from "react";

export default function SorteioFerrari() {
  const [vencedor, setVencedor] = useState("");
  const [aSortear, setASortear] = useState(false);

  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://sorteio-ferrari.vercel.app";

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-700 to-black flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="text-5xl mb-4">🏎️</div>

        <h1 className="text-4xl font-black text-red-700 tracking-wide">
          SORTEIO FERRARI
        </h1>

        <p className="text-gray-700 mt-4 text-lg leading-relaxed">
          Participa no sorteio para descobrir quem vai organizar o jantar do próximo ano!
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const nome = e.target.nome.value;

            if (!nome.trim()) {
              alert("Por favor introduz o teu nome.");
              return;
            }

            const participantes = JSON.parse(
              localStorage.getItem("participantes") || "[]"
            );

            if (participantes.includes(nome.trim())) {
              alert("Esse nome já participou.");
              return;
            }

            participantes.push(nome.trim());
            localStorage.setItem(
              "participantes",
              JSON.stringify(participantes)
            );

            alert("Participação registada com sucesso!");
            e.target.reset();
          }}
        >
          <input
            name="nome"
            type="text"
            placeholder="O teu nome"
            className="w-full border-2 border-red-500 rounded-2xl px-4 py-3 text-lg outline-none focus:ring-4 focus:ring-red-300"
          />

          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-800 transition-all text-white font-bold text-lg py-3 rounded-2xl shadow-lg"
          >
            PARTICIPAR
          </button>
        </form>

        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            QR CODE DO SORTEIO
          </h2>

          <img
            src={qrUrl}
            alt="QR Code"
            className="mx-auto rounded-xl shadow-md"
          />

          <p className="text-sm text-gray-500 mt-4 break-all">
            https://sorteio-ferrari.vercel.app
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => {
              const participantes = JSON.parse(
                localStorage.getItem("participantes") || "[]"
              );

              if (participantes.length === 0) {
                alert("Ainda não existem participantes.");
                return;
              }

              setASortear(true);
              setVencedor("");

              let contador = 0;

              const animacao = setInterval(() => {
                const nomeAleatorio =
                  participantes[
                    Math.floor(Math.random() * participantes.length)
                  ];

                setVencedor(nomeAleatorio);
                contador++;

                if (contador > 20) {
                  clearInterval(animacao);
                  setASortear(false);
                }
              }, 120);
            }}
            className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all w-full"
          >
            🎰 SORTEAR VENCEDOR
          </button>

          {vencedor && (
            <div className="bg-red-100 border-2 border-red-600 rounded-2xl p-5 animate-pulse">
              <p className="text-gray-700 text-sm uppercase tracking-widest">
                {aSortear ? "A sortear..." : "Vencedor"}
              </p>

              <h3 className="text-3xl font-black text-red-700 mt-2">
                {vencedor}
              </h3>
            </div>
          )}
        </div>

        <div className="mt-8 text-left bg-gray-100 rounded-2xl p-4 text-sm text-gray-700">
          <p className="font-bold mb-2">🚀 Como colocar online gratuitamente:</p>

          <ol className="list-decimal ml-5 space-y-1">
            <li>Criar conta gratuita no Vercel</li>
            <li>Enviar este projeto para o GitHub</li>
            <li>Ligar o GitHub ao Vercel</li>
            <li>Clicar em “Deploy”</li>
            <li>O site fica online automaticamente</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

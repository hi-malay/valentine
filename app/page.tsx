"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useState, Suspense, useEffect } from "react";
import confetti from "canvas-confetti";

function ValentineProposal({ name }: { name: string }) {
  const [isValentine, setIsValentine] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleYes = () => {
    setIsValentine(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff0000", "#ff69b4", "#ffffff", "#ffd700"],
    });
  };

  useEffect(() => {
    if (isValentine) {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ff0000", "#ff69b4", "#ffd700"],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#ff0000", "#ff69b4", "#ffd700"],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isValentine]);

  const handleNo = () => {
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      alert("You broke my heart! 💔");
    }
  };

  const moveButton = () => {
    const button = buttonRef.current;
    if (!button) return;

    const padding = 20;
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    // Calculate available space
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    // Generate random position within bounds, ensuring it's at least 'padding' distance from top/left
    const x = Math.max(padding, Math.floor(Math.random() * maxX));
    const y = Math.max(padding, Math.floor(Math.random() * maxY));

    button.style.position = "fixed";
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.style.zIndex = "100";
    button.style.transition = "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
  };

  return (
    <>
      {!isValentine ? (
        <div className="flex flex-col items-center gap-12">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-pink-300 opacity-20 blur-2xl animate-pulse"></div>
            <h1 className="relative text-5xl md:text-7xl font-extrabold text-red-600 drop-shadow-sm">
              Will you be my Valentine, <br />
              <span className="text-pink-600">
                {name ? name : "Sweetheart"}?
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
            <button
              className="group relative h-20 w-44 overflow-hidden rounded-full bg-red-500 text-2xl font-bold text-white shadow-xl transition-all hover:scale-110 hover:bg-red-600 active:scale-95"
              onClick={handleYes}
            >
              <span className="relative z-10">Yes! 💖</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            <div
              className="h-20 w-44"
              onMouseEnter={moveButton}
              onTouchStart={moveButton}
            >
              <button
                ref={buttonRef}
                className="h-20 w-44 rounded-full border-2 border-red-500 bg-white text-2xl font-bold text-red-500 transition-all hover:bg-red-50"
                onClick={handleNo}
                onTouchStart={moveButton}
              >
                No 😢
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-6xl md:text-8xl font-black text-red-600 drop-shadow-lg">
            YAAAAAAAY! 🎉
          </h1>
          <p className="text-3xl font-bold text-pink-600 italic">
            I knew you'd say yes! You're my favorite!
          </p>
          <div className="text-8xl scale-150 animate-pulse mt-8">💖✨💍</div>
        </div>
      )}

      {isValentine && (
        <style jsx global>{`
          @keyframes sparkle {
            0%,
            100% {
              opacity: 0;
              transform: scale(0.5);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
          @keyframes shimmer {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .glitter-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 50;
            overflow: hidden;
            background: linear-gradient(
              -45deg,
              rgba(255, 182, 193, 0.1),
              rgba(255, 105, 180, 0.1),
              rgba(255, 255, 255, 0.1)
            );
            background-size: 400% 400%;
            animation: shimmer 15s ease infinite;
          }
          .glitter-overlay::before,
          .glitter-overlay::after {
            content: "";
            position: absolute;
            top: -100%;
            left: -100%;
            right: -100%;
            bottom: -100%;
            background-image:
              radial-gradient(circle, #fff 1.5px, transparent 1.5px),
              radial-gradient(circle, #ffd700 1px, transparent 1px),
              radial-gradient(circle, #ff69b4 1.2px, transparent 1.2px);
            background-size:
              100px 100px,
              130px 130px,
              150px 150px;
            background-position:
              0 0,
              40px 60px,
              10px 10px;
            animation: sparkle 3s infinite;
          }
          .glitter-overlay::after {
            background-size:
              70px 70px,
              90px 90px,
              110px 110px;
            background-position:
              20px 30px,
              50px 10px,
              80px 40px;
            animation-delay: 1.5s;
          }
        `}</style>
      )}
      {isValentine && <div className="glitter-overlay" />}
    </>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const queryName = searchParams.get("name");
  const [inputValue, setInputValue] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = () => {
    if (inputValue.trim()) {
      const url = new URL(window.location.origin);
      url.searchParams.set("name", inputValue.trim());
      setShareLink(url.toString());
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-pink-100 via-red-50 to-pink-200 font-sans">
      <div className="z-10 flex flex-col items-center justify-center gap-8 px-4 text-center">
        {queryName ? (
          <ValentineProposal name={queryName} />
        ) : shareLink ? (
          <div className="flex flex-col gap-8 animate-in fade-in zoom-in duration-500 max-w-md bg-white/40 backdrop-blur-md p-8 rounded-3xl border-2 border-pink-200 shadow-2xl">
            <div className="text-5xl">💌</div>
            <h2 className="text-3xl font-extrabold text-red-600">
              Your proposal link is ready!
            </h2>
            <p className="text-pink-700 font-medium">
              Share this special link with your partner to ask them out in a
              magical way:
            </p>

            <div className="relative flex flex-col gap-2">
              <div className="bg-white/80 p-4 rounded-xl border-2 border-pink-300 text-sm font-mono text-red-500 break-all select-all">
                {shareLink}
              </div>
              <button
                onClick={handleCopy}
                className={`mt-2 flex items-center justify-center gap-2 py-3 rounded-full font-bold transition-all shadow-lg active:scale-95 ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-pink-500 text-white hover:bg-pink-600"
                }`}
              >
                {copied ? "Copied! ✨" : "Copy Link 📋"}
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <p className="text-sm text-pink-600 italic">
                Wait, want to see how it looks first?
              </p>
              <a
                href={shareLink}
                className="text-red-600 font-bold underline hover:text-red-700 transition-colors"
              >
                Preview Proposal 👁️
              </a>
              <button
                onClick={() => setShareLink("")}
                className="text-gray-500 text-sm hover:underline"
              >
                Create another one
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
            <h2 className="text-4xl font-extrabold text-red-600 drop-shadow-sm">
              Who is this special someone?
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter their name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="px-6 py-4 rounded-full border-4 border-pink-300 focus:outline-none focus:border-red-500 text-center text-2xl font-bold text-red-600 transition-all shadow-lg"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleGenerateLink();
                  }
                }}
              />
              <button
                onClick={handleGenerateLink}
                className="bg-red-500 text-white px-8 py-3 rounded-full text-xl font-bold hover:bg-red-600 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Go! 💌
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

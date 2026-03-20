import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* Badge */}
      <span className="text-xs font-medium px-3 py-1 rounded-full border border-white/20 text-gray-400 mb-6">
        Powered by AI
      </span>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
        AdMentor AI
      </h1>

      <p className="text-gray-400 text-center max-w-xl text-lg mb-10">
        Your personal AI mentor for Meta & Google Ads. Improve your ad copy,
        boost CTR, and get expert feedback — instantly.
      </p>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 w-full max-w-2xl">
        {[
          { link: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXpvdWdyamtrMG9iaGhoandkdXAzZXg2Mmc1eGMxZ2ZsZGJ6ZW10YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VhWVAa7rUtT3xKX6Cd/giphy.gif", title: "Ad Copy Review", desc: "Paste your ad and get instant improvements" },
          { link: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2YwdmwyMm9hMmZnaGk4MWQxajEydm1hYzJja3lzMmhvYjVtYWVtNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YXp9LRRkSjbvVTa0B0/giphy.gif", title: "CTR Optimization", desc: "Learn what drives clicks and conversions" },
          { link: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDJ0NGJhMzB4MDhmOHl2dnhleGt3eWxrYzYwd3hwd2JnMzQwbHRtYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/d3mlE7uhX8KFgEmY/giphy.gif", title: "Smart Suggestions", desc: "AI follow-ups tailored to your campaign" },
        ].map((f) => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl flex flex-col justify-between p-4 text-center">
            <div className="text-2xl mb-2 h-full">
              <img src={f.link} alt={f.title} className="w-full h-full object-fill" />
            </div>
            <div>
              <div className="font-semibold text-sm mb-1">{f.title}</div>
            <div className="text-gray-500 text-xs">{f.desc}</div>
            </div>
            
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/chat"
        className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:opacity-90 transition"
      >
        Start Chatting →
      </Link>

      <p className="text-gray-600 text-xs mt-6">No signup required. Free to try.</p>
    </div>
  );
}

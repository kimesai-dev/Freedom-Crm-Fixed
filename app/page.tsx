// ✅ Homepage layout pushed
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center text-white px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Welcome to Project Freedom</h1>
        <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
          An AI-powered CRM built from scratch to generate, score, and manage real estate leads in real time.
        </p>
        <a
          href="/leads"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
        >
          🚀 View My Leads
        </a>
      </div>
    </main>
  )
}

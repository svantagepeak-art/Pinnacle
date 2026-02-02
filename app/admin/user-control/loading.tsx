export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 animate-pulse mb-4">
          <div className="w-8 h-8 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin"></div>
        </div>
        <p className="text-slate-400">Loading user control panel...</p>
      </div>
    </div>
  )
}

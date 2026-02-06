export default function DemoDataBanner() {
  return (
    <div className="relative bg-[#AAFF00]/4 border border-[#AAFF00]/10 rounded-xl p-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#AAFF00]/10 flex items-center justify-center flex-shrink-0 text-base">📊</div>
        <div className="flex-1">
          <p className="text-sm text-[#A8A89A] leading-relaxed">
            <span className="font-bold text-[#AAFF00]" style={{ fontFamily: "'Source Code Pro', monospace", fontSize: '12px', letterSpacing: '1px' }}>PROTOTYPE DATA</span>
            {' '}Showing example team from{' '}
            <a
              href="https://github.com/fastapi/fastapi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#AAFF00] hover:text-white underline underline-offset-2 transition-colors"
              style={{ fontFamily: "'Source Code Pro', monospace" }}
            >
              fastapi/fastapi
            </a>
            {' '}repository (7 contributors). Productivity metrics and calendar data are simulated for demonstration.{' '}
            <span className="text-[#6B6B60] text-xs">Rhythm works with any GitHub organization.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

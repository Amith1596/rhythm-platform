export default function DemoDataBanner() {
  return (
    <div className="relative bg-[#AAFF00]/4 border border-[#AAFF00]/10 rounded-xl p-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#AAFF00]/10 flex items-center justify-center flex-shrink-0 text-base">📊</div>
        <div className="flex-1">
          <p className="text-sm text-[#A8A89A] leading-relaxed">
            <span className="font-bold text-[#AAFF00]" style={{ fontFamily: "'Source Code Pro', monospace", fontSize: '12px', letterSpacing: '1px' }}>SAMPLE DATA</span>
            {' '}This prototype uses a fictional team of 8 contributors with synthetic productivity metrics and calendar data.{' '}
            <span className="text-[#6B6B60] text-xs">In production, Rhythm connects to your GitHub organization for real data.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

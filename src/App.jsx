import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Copy, ScanSearch, AlertTriangle, AlertCircle, Info } from 'lucide-react'
import CanvasBackground from './CanvasBackground'
import logoUrl from './assets/logo.png'
import './index.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('publisher')
  const [scanUrl, setScanUrl] = useState('')
  const [logs, setLogs] = useState([])
  const [isScanning, setIsScanning] = useState(false)
  const [payload, setPayload] = useState('')
  const [copied, setCopied] = useState(false)
  
  // States for Publisher
  const [pubArticles, setPubArticles] = useState(7)
  const [pubWords, setPubWords] = useState(380)
  const [pubPadding, setPubPadding] = useState(4)
  const [pubLegal, setPubLegal] = useState("Missing Privacy Policy")

  // States for Meta
  const [metaHook, setMetaHook] = useState(9.2)
  const [metaHold, setMetaHold] = useState(1.1)
  const [metaFreq, setMetaFreq] = useState(4.1)
  const [metaConv, setMetaConv] = useState(18)

  // States for Google
  const [gglTerm, setGglTerm] = useState("free software download pdf")
  const [gglCpa, setGglCpa] = useState(2.5)
  const [gglPmax, setGglPmax] = useState("40%")
  const [gglRsa, setGglRsa] = useState("Below Average")

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { id: Date.now() + Math.random(), msg, type }])
  }

  const runScan = async () => {
    if (!scanUrl) return alert("Please enter a URL")
    
    setIsScanning(true)
    setLogs([])
    
    let domain = scanUrl.replace("http://", "").replace("https://", "").replace(/\/$/, "")
    addLog(`🔍 Initiating live crawl on target destination: ${domain}`, 'info')
    
    try {
      const proxyBase = "https://corsproxy.io/?key=75ac2cfe&url="
      const adsTxtUrl = encodeURIComponent(`https://${domain}/ads.txt`)
      const homeUrl = encodeURIComponent(`https://${domain}/`)
      
      const adsRes = await fetch(proxyBase + adsTxtUrl)
      if (adsRes.ok) {
        const text = await adsRes.text()
        const hasGoogle = text.toLowerCase().includes("google.com")
        const hasDirect = text.toLowerCase().includes("direct")
        
        addLog(`✅ SUCCESS: Target ads.txt file discovered on server root.`, 'success')
        addLog(`   - Google Inventory Line Mapping: ${hasGoogle ? 'FOUND' : 'MISSING'}`, hasGoogle ? 'success' : 'error')
        addLog(`   - Account Relationship Token: ${hasDirect ? 'FOUND' : 'MISSING'}`, hasDirect ? 'success' : 'error')
        
        if (!hasGoogle) {
          addLog(`❌ CRITICAL: No active Google Publisher records detected inside the destination file.`, 'error')
        }
      } else {
        addLog(`❌ CRITICAL ERROR: Server responded with status code ${adsRes.status} (ads.txt might not exist).`, 'error')
      }
      
      addLog(`🔍 Scanning for TCF v2.2 Consent Management Platform (CMP)...`, 'info')
      try {
        const cmpUrl = encodeURIComponent(`https://${domain}/cmp_manifest.json`)
        const cmpRes = await fetch(proxyBase + cmpUrl)
        if (cmpRes.ok) {
          const cmpText = await cmpRes.text()
          if (cmpText.includes('"42"') || cmpText.includes('vendor": 42')) {
            addLog(`✅ [TCF v2.2]: Google Advertising Products properly declared in CMP.`, 'success')
          } else {
            addLog(`⚠️ [TCF v2.2]: CMP found but Google Vendor 42 not explicitly detected.`, 'warning')
          }
        } else {
          addLog(`⚠️ [TCF v2.2]: No standard /cmp_manifest.json found.`, 'warning')
        }
      } catch (e) {
        addLog(`⚠️ [TCF v2.2]: Could not verify CMP manifest.`, 'warning')
      }

      addLog(`🔍 Scanning homepage for Thin Content and Clickjacking risks...`, 'info')
      const homeRes = await fetch(proxyBase + homeUrl)
      if (homeRes.ok) {
        const html = await homeRes.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        
        doc.querySelectorAll('script, style, noscript').forEach(el => el.remove())
        const cleanText = doc.body ? doc.body.textContent : ""
        const words = cleanText.split(/\s+/).filter(w => w.length > 0)
        const wordCount = words.length
        
        if (wordCount < 600) {
          addLog(`⚠️ [THIN CONTENT FLAG]: Homepage contains only ${wordCount} words.`, 'warning')
        } else {
          addLog(`✅ [CONTENT DEPTH]: Homepage contains ${wordCount} words.`, 'success')
        }
        
        setPubWords(wordCount)
        
        let hasRisk = false
        const adUnits = doc.querySelectorAll('.adsbygoogle, iframe')
        if (adUnits.length > 0) {
          let lowPaddingFound = false
          adUnits.forEach(ad => {
            const style = ad.getAttribute('style') || ''
            const margin = style.match(/margin(?:-bottom|-top)?\s*:\s*(\d+)px/i)
            if (margin && parseInt(margin[1]) < 10) lowPaddingFound = true
          })
          
          if (lowPaddingFound) {
            addLog(`❌ [CLICKJACKING RISK]: Ad units found with dangerously low spacing.`, 'error')
            hasRisk = true
          } else {
            addLog(`✅ [AD PROXIMITY]: Ad units have sufficient spacing.`, 'success')
          }
        } else {
          addLog(`ℹ️ [AD PROXIMITY]: No standard ad units detected for proximity check.`, 'info')
        }
        
        setPubPadding(hasRisk ? 4 : 15)
      } else {
        addLog(`❌ Failed to fetch homepage.`, 'error')
      }
      
    } catch (err) {
      addLog(`❌ CRITICAL ERROR: Unable to resolve network domain. Reason: ${err.message}`, 'error')
    }
    
    setIsScanning(false)
  }

  const generatePayload = () => {
    let p = ""
    if (activeTab === 'publisher') {
      p = `Execute AdSense Compliance Audit on the following layout data:\n\n` +
          `- Total Indexable Articles: ${pubArticles} posts\n` +
          `- Average Word Count: ${pubWords} words per node\n` +
          `- Navigation Padding/Margin: ${pubPadding}px above ad containers\n` +
          `- Legal Pages Status: ${pubLegal}`
    } else if (activeTab === 'meta') {
      p = `Execute Meta Ads Optimization Audit on the following data:\n\n` +
          `- Hook Rate (3-Sec Views / Impressions): ${metaHook}%\n` +
          `- Hold Rate (ThruPlays / Impressions): ${metaHold}%\n` +
          `- Creative Frequency (7-day): ${metaFreq}\n` +
          `- Weekly conversions per ad set: ${metaConv} conversions`
    } else if (activeTab === 'google') {
      p = `Execute Google Ads Budget Protection Audit on the following data:\n\n` +
          `- Query "${gglTerm}" has spent ${gglCpa}x of our target CPA with 0 conversions.\n` +
          `- Responsive Search Ad Relevance score is "${gglRsa}".\n` +
          `- PMax campaign is spending ${gglPmax} of its budget on our own brand name search keywords.`
    }
    setPayload(p)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(payload)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <CanvasBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <motion.div 
          className="w-full md:w-80 flex flex-col gap-6 shrink-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-pink-500 uppercase tracking-widest text-shadow-sm">Compliance Partners</h3>
            <div className="flex flex-col gap-3">
              <a href="#" className="p-3 bg-white/50 hover:bg-white/80 border border-white/60 rounded-lg text-slate-800 font-semibold transition-all shadow-sm hover:shadow-md">Generate Privacy Policy ↗</a>
              <a href="#" className="p-3 bg-white/50 hover:bg-white/80 border border-white/60 rounded-lg text-slate-800 font-semibold transition-all shadow-sm hover:shadow-md">Cookie Consent Banner ↗</a>
              <a href="#" className="p-3 bg-white/50 hover:bg-white/80 border border-white/60 rounded-lg text-slate-800 font-semibold transition-all shadow-sm hover:shadow-md">Secure Hosting Platform ↗</a>
            </div>
          </div>
          
          <div className="glass-panel p-4 rounded-2xl">
            <div className="min-h-[250px] flex items-center justify-center bg-white/60 border border-dashed border-slate-300 rounded-xl relative overflow-hidden">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono">Advertisement</span>
              <ins className="adsbygoogle"
                   style={{display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
                   data-ad-client="ca-pub-0000000000000000"
                   data-ad-slot="auto"
                   data-ad-format="vertical"
                   data-full-width-responsive="true"></ins>
            </div>
          </div>
        </motion.div>

        {/* Main Dashboard */}
        <motion.div 
          className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
        >
          <div className="p-8 border-b border-white/40 bg-white/30 text-center">
            <h1 className="text-4xl font-extrabold flex items-center justify-center gap-4 text-slate-800">
              <img src={logoUrl} alt="Logo" className="h-12 w-12 object-cover rounded-xl shadow-lg" />
              Auditor Control Center
            </h1>
            <p className="mt-2 text-slate-500 font-medium tracking-wide">Unified compliance payload generator for Claude AI Engines</p>
          </div>

          <div className="p-6 border-b border-white/40 bg-white/20">
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="Enter Website URL for Instant Compliance Scan (e.g. example.com)" 
                className="flex-1 p-3 rounded-xl bg-white/70 border border-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 font-mono shadow-inner"
                value={scanUrl}
                onChange={(e) => setScanUrl(e.target.value)}
              />
              <button 
                onClick={runScan}
                disabled={isScanning}
                className="glow-btn px-6 py-3 rounded-xl font-bold uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
              >
                {isScanning ? <span className="animate-spin">⏳</span> : <ScanSearch size={20} />}
                Live Scan
              </button>
            </div>
            
            <AnimatePresence>
              {logs.length > 0 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="bg-slate-900/90 text-slate-200 p-4 rounded-xl font-mono text-sm max-h-64 overflow-y-auto border border-slate-700 shadow-inner"
                >
                  {logs.map((log) => (
                    <div key={log.id} className={`mb-1 ${
                      log.type === 'error' ? 'text-red-400' : 
                      log.type === 'success' ? 'text-green-400' : 
                      log.type === 'warning' ? 'text-yellow-400' : 'text-blue-300'
                    }`}>
                      {log.msg}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex bg-white/40 border-b border-white/50">
            {['publisher', 'meta', 'google'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 p-4 font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'text-pink-600 border-b-2 border-pink-500 bg-white/60 shadow-sm' : 'text-slate-500 hover:bg-white/30 hover:text-slate-700'}`}
              >
                {tab} Audit
              </button>
            ))}
          </div>

          <div className="p-8 bg-white/10 flex-1">
            {activeTab === 'publisher' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">Indexable Articles</label>
                  <input type="number" className="p-3 rounded-xl bg-white/70 border border-white/60 font-mono shadow-sm" value={pubArticles} onChange={e => setPubArticles(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">Average Word Count</label>
                  <input type="number" className="p-3 rounded-xl bg-white/70 border border-white/60 font-mono shadow-sm" value={pubWords} onChange={e => setPubWords(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">Navigation Padding (px)</label>
                  <input type="number" className="p-3 rounded-xl bg-white/70 border border-white/60 font-mono shadow-sm" value={pubPadding} onChange={e => setPubPadding(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">Legal Pages Status</label>
                  <select className="p-3 rounded-xl bg-white/70 border border-white/60 font-mono shadow-sm" value={pubLegal} onChange={e => setPubLegal(e.target.value)}>
                    <option>Missing Privacy Policy</option>
                    <option>Fully Compliant</option>
                    <option>Missing Terms of Service</option>
                  </select>
                </div>
              </motion.div>
            )}

            {activeTab === 'meta' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-sm font-bold text-slate-700 uppercase flex justify-between">Hook Rate (%) <span className="text-sky-600">{metaHook}%</span></label>
                  <input type="range" min="0" max="100" step="0.1" className="accent-sky-500" value={metaHook} onChange={e => setMetaHook(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-sm font-bold text-slate-700 uppercase flex justify-between">Hold Rate (%) <span className="text-sky-600">{metaHold}%</span></label>
                  <input type="range" min="0" max="100" step="0.1" className="accent-sky-500" value={metaHold} onChange={e => setMetaHold(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">Creative Freq (7d)</label>
                  <input type="number" className="p-3 rounded-xl bg-white/70 border border-white/60 font-mono shadow-sm" value={metaFreq} onChange={e => setMetaFreq(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">Weekly Conversions</label>
                  <input type="number" className="p-3 rounded-xl bg-white/70 border border-white/60 font-mono shadow-sm" value={metaConv} onChange={e => setMetaConv(e.target.value)} />
                </div>
              </motion.div>
            )}

            {activeTab === 'google' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">High-Bleed Term</label>
                  <input type="text" className="p-3 rounded-xl bg-white/70 border border-white/60 font-mono shadow-sm" value={gglTerm} onChange={e => setGglTerm(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">Target CPA Multiplier</label>
                  <input type="number" className="p-3 rounded-xl bg-white/70 border border-white/60 font-mono shadow-sm" value={gglCpa} onChange={e => setGglCpa(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">PMax Brand Spend</label>
                  <select className="p-3 rounded-xl bg-white/70 border border-white/60 font-mono shadow-sm" value={gglPmax} onChange={e => setGglPmax(e.target.value)}>
                    <option>40%</option>
                    <option>&lt; 10%</option>
                    <option>20%</option>
                    <option>80%</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="text-sm font-bold text-slate-700 uppercase">RSA Relevance</label>
                  <select className="p-3 rounded-xl bg-white/70 border border-white/60 font-mono shadow-sm" value={gglRsa} onChange={e => setGglRsa(e.target.value)}>
                    <option>Below Average</option>
                    <option>Average</option>
                    <option>Above Average</option>
                  </select>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-6 bg-white/40 border-t border-white/50">
            <button 
              onClick={generatePayload}
              className="w-full glow-btn py-4 rounded-xl font-bold text-xl uppercase tracking-widest flex items-center justify-center gap-3"
            >
              <CheckCircle2 /> Generate Audit Payload
            </button>
          </div>

          <AnimatePresence>
            {payload && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-6 bg-slate-900 text-slate-300 border-t border-slate-700"
              >
                <div className="relative overflow-hidden rounded-xl bg-slate-800 p-4 border border-slate-700">
                  <motion.div 
                    initial={{ top: '-100%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="absolute left-0 w-full h-[10px] bg-sky-400 shadow-[0_0_20px_10px_rgba(56,189,248,0.5)] z-10"
                  />
                  <pre className="whitespace-pre-wrap font-mono text-sm min-h-[150px] relative z-20 mix-blend-screen text-sky-200">
                    {payload}
                  </pre>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className={`mt-4 w-full py-3 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    copied ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  {copied ? <CheckCircle2 /> : <Copy />}
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </>
  )
}

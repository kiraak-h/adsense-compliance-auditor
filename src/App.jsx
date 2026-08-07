import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Copy, ScanSearch, Terminal, Download, Code2, ShieldAlert } from 'lucide-react'
import CanvasBackground from './CanvasBackground'
import logoUrl from './assets/logo.png'
import './index.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('enterprise')
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
  const [pubId, setPubId] = useState("pub-0000000000000000")
  const [dragWarning, setDragWarning] = useState(false)

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

  // States for Enterprise
  const [entSitemap, setEntSitemap] = useState('https://example.com/sitemap.xml')
  const [entVendors, setEntVendors] = useState('42, 137, 204')
  const [entRac, setEntRac] = useState('best laptops, mechanical keyboard')
  
  // Terminal Simulator State
  const [terminalOutput, setTerminalOutput] = useState([])
  const [isSimulating, setIsSimulating] = useState(false)
  const terminalEndRef = useRef(null)

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { id: Date.now() + Math.random(), msg, type }])
  }

  const simulateTerminal = async (scriptName) => {
    setIsSimulating(true)
    setTerminalOutput([])
    const addTermLine = (text, delay) => new Promise(resolve => setTimeout(() => {
      setTerminalOutput(prev => [...prev, text])
      resolve()
    }, delay))

    if (scriptName === 'sitemap_crawler.py') {
      await addTermLine(`$ python3 sitemap_crawler.py ${entSitemap}`, 300)
      await addTermLine(`🔍 Initializing Deep Crawler on Target Sitemap...`, 500)
      await addTermLine(`------------------------------------------------------------------------`, 100)
      await addTermLine(`📊 Discovered 142 indexable URL routes. Beginning text scan...`, 1200)
      await addTermLine(`✅ [PASS]: /blog/how-to-start-coding -> 1204 words`, 300)
      await addTermLine(`❌ [THIN CONTENT]: /tag/updates -> 214 words`, 400)
      await addTermLine(`✅ [PASS]: /about-us -> 850 words`, 200)
      await addTermLine(`❌ [THIN CONTENT]: /contact -> 110 words`, 300)
      await addTermLine(`------------------------------------------------------------------------`, 600)
      await addTermLine(`📈 AUTOMATED CRAWLER REPORT SUMMARY:`, 100)
      await addTermLine(`   - Deficient Thin Material Nodes: 2`, 100)
      await addTermLine(`🚨 RISK WARNING: Content profile triggers 'Low-Value Content' algorithm.`, 100)
    } else if (scriptName === 'atp_live_checker.py') {
      await addTermLine(`$ python3 atp_live_checker.py --vendors="${entVendors}"`, 300)
      await addTermLine(`🔒 Executing Ad Tech Partner Privacy Shield Scan...`, 600)
      await addTermLine(`🔄 Cross-referencing against Google Authorized Global Vendors...`, 800)
      if (entVendors.includes("42")) {
        await addTermLine(`✅ [TCF v2.2]: Google Advertising Products (Vendor 42) declared.`, 500)
        await addTermLine(`⚠️ PRIVACY WARNING: Found 2 unauthorized tracking vendors.`, 300)
      } else {
        await addTermLine(`❌ CRITICAL COMPLIANCE THREAT: Google Exchange ID (42) missing.`, 500)
      }
    } else if (scriptName === 'rac_transcriber.py') {
      await addTermLine(`$ python3 rac_transcriber.py --input="${entRac}"`, 300)
      await addTermLine(`📋 Initializing Referrer Ad Creative Literal Transcriber...`, 400)
      await addTermLine(`✅ SUCCESS: Programmatic string output mapped safely.`, 800)
      await addTermLine(`{`, 100)
      await addTermLine(`  "referrerAdCreative": {`, 100)
      await addTermLine(`    "literalText": "${entRac}",`, 100)
      await addTermLine(`    "segmentType": "verbatim_exact"`, 100)
      await addTermLine(`  }`, 100)
      await addTermLine(`}`, 100)
    }
    setIsSimulating(false)
  }

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalOutput])

  const runScan = async () => {
    if (!scanUrl) return alert("Please enter a URL")
    
    setIsScanning(true)
    setLogs([])
    
    let domain = scanUrl.replace("http://", "").replace("https://", "").replace(/\/$/, "")
    addLog(`🔍 Initiating live crawl on target destination: ${domain}`, 'info')
    
    try {
      const proxyBase = "https://corsproxy.io/?key=75ac2cfe&url="
      const adsTxtUrl = encodeURIComponent(`https://${domain}/ads.txt`)
      
      const adsRes = await fetch(proxyBase + adsTxtUrl)
      if (adsRes.ok) {
        const text = await adsRes.text()
        const hasGoogle = text.toLowerCase().includes("google.com")
        addLog(`✅ SUCCESS: Target ads.txt file discovered on server root.`, 'success')
        if (!hasGoogle) addLog(`❌ CRITICAL: No active Google Publisher records detected.`, 'error')
      } else {
        addLog(`❌ CRITICAL ERROR: Server responded with status code ${adsRes.status}.`, 'error')
      }
      
    } catch (err) {
      addLog(`❌ CRITICAL ERROR: Unable to resolve network domain.`, 'error')
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
    } else if (activeTab === 'enterprise') {
      p = `Execute Enterprise Compliance Payload:\n\n` +
          `- Crawl Sitemap: ${entSitemap}\n` +
          `- ATP Consent Check: Vendors ${entVendors}\n` +
          `- RAC Literal Terms: ${entRac}`
    } else {
      p = `Execute System Audit for active parameters.`
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
      
      {/* Top Navigation */}
      <nav className="relative z-20 w-full bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
            <ShieldAlert size={20} className="text-black" />
          </div>
          <span className="font-bold text-white tracking-widest uppercase text-sm">Auditor Pro v2</span>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/kiraak-h/adsense-compliance-auditor" 
            target="_blank" rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors text-sm font-mono"
          >
            v2.0.0
          </a>
          <a 
            href="https://gum.co/YOUR_PRODUCT_ID_HERE" 
            target="_blank" rel="noopener noreferrer"
            data-gumroad-overlay-checkout="true"
            className="bg-white hover:bg-slate-200 text-black px-5 py-2 rounded-md font-bold text-xs tracking-wider flex items-center gap-2 transition-all"
          >
            <Download size={16} /> Get Pro Extension
          </a>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <motion.div 
          className="w-full md:w-80 flex flex-col gap-6 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-panel p-6 rounded-xl border-l-2 border-l-blue-500">
            <h3 className="text-xs font-bold mb-4 text-slate-400 uppercase tracking-widest font-mono">Infrastructure</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="p-3 bg-black/40 hover:bg-white/10 border border-white/5 rounded text-sm text-slate-300 font-medium transition-all flex justify-between items-center">
                <span>API Endpoints</span> <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">Active</span>
              </a>
              <a href="#" className="p-3 bg-black/40 hover:bg-white/10 border border-white/5 rounded text-sm text-slate-300 font-medium transition-all flex justify-between items-center">
                <span>Compliance CI</span> <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">Passing</span>
              </a>
              <a href="#" className="p-3 bg-black/40 hover:bg-white/10 border border-white/5 rounded text-sm text-slate-300 font-medium transition-all flex justify-between items-center">
                <span>Extension Link</span> <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">v1.0.0</span>
              </a>
            </div>
          </div>
          
          <div className="glass-panel p-4 rounded-xl border-l-2 border-l-pink-500">
            <h3 className="text-xs font-bold mb-4 text-slate-400 uppercase tracking-widest font-mono">Layout Simulator</h3>
            <div className="min-h-[200px] flex items-center justify-center bg-black/40 border border-dashed border-white/20 rounded relative overflow-hidden">
              <span className="text-xs uppercase tracking-widest text-slate-600 font-mono">Ad Block Boundary</span>
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
          className="flex-1 glass-panel rounded-xl flex flex-col overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6 border-b border-white/10 bg-white/5 flex items-center gap-4">
            <Terminal className="text-white" />
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">Command Center</h1>
              <p className="text-xs text-slate-400 font-mono mt-1">adsense-compliance-auditor / main / terminal</p>
            </div>
          </div>

          <div className="flex bg-black/40 border-b border-white/10 overflow-x-auto terminal-scroll">
            {['enterprise', 'publisher', 'meta', 'google'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-mono text-sm uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab ? 'text-white border-b-2 border-white bg-white/10' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 flex-1 bg-black/20">
            {activeTab === 'enterprise' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Script Configs */}
                  <div className="flex flex-col gap-4">
                    <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                      <h4 className="font-mono text-sm text-white flex justify-between items-center">
                        sitemap_crawler.py
                        <button onClick={() => simulateTerminal('sitemap_crawler.py')} disabled={isSimulating} className="bg-white text-black px-3 py-1 rounded text-xs font-bold hover:bg-slate-200 transition-colors disabled:opacity-50">Run</button>
                      </h4>
                      <input type="text" className="w-full mt-3 p-2 rounded bg-black/60 border border-white/20 text-xs font-mono text-slate-300 focus:outline-none focus:border-white" value={entSitemap} onChange={(e)=>setEntSitemap(e.target.value)} />
                    </div>

                    <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                      <h4 className="font-mono text-sm text-white flex justify-between items-center">
                        atp_live_checker.py
                        <button onClick={() => simulateTerminal('atp_live_checker.py')} disabled={isSimulating} className="bg-white text-black px-3 py-1 rounded text-xs font-bold hover:bg-slate-200 transition-colors disabled:opacity-50">Run</button>
                      </h4>
                      <input type="text" className="w-full mt-3 p-2 rounded bg-black/60 border border-white/20 text-xs font-mono text-slate-300 focus:outline-none focus:border-white" value={entVendors} onChange={(e)=>setEntVendors(e.target.value)} />
                    </div>

                    <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                      <h4 className="font-mono text-sm text-white flex justify-between items-center">
                        rac_transcriber.py
                        <button onClick={() => simulateTerminal('rac_transcriber.py')} disabled={isSimulating} className="bg-white text-black px-3 py-1 rounded text-xs font-bold hover:bg-slate-200 transition-colors disabled:opacity-50">Run</button>
                      </h4>
                      <input type="text" className="w-full mt-3 p-2 rounded bg-black/60 border border-white/20 text-xs font-mono text-slate-300 focus:outline-none focus:border-white" value={entRac} onChange={(e)=>setEntRac(e.target.value)} />
                    </div>
                  </div>

                  {/* Terminal Execution Sandbox */}
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl flex flex-col overflow-hidden h-[400px]">
                    <div className="bg-[#111111] px-4 py-2 border-b border-white/10 flex gap-2 items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      <span className="ml-2 font-mono text-[10px] text-slate-500">bash - API Sandbox</span>
                    </div>
                    <div className="p-4 font-mono text-xs text-slate-300 overflow-y-auto terminal-scroll flex-1">
                      {terminalOutput.length === 0 ? (
                        <span className="text-slate-600">Select a script and click "Run" to simulate execution...</span>
                      ) : (
                        terminalOutput.map((line, idx) => (
                          <div key={idx} className="mb-1">
                            <span className={line.startsWith('$') ? 'text-sky-400' : line.includes('❌') ? 'text-red-400' : line.includes('✅') ? 'text-green-400' : 'text-slate-300'}>{line}</span>
                          </div>
                        ))
                      )}
                      <div ref={terminalEndRef} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'publisher' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Layout Shift Drag & Drop Simulator */}
                 <div className="p-6 bg-black/40 border border-white/10 rounded-xl flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-white font-mono uppercase">Layout Shift Sandbox</h3>
                    <p className="text-xs text-slate-500">Drag the ad block. Dropping it too close to the navigation bar violates AdSense clickjacking policies.</p>
                    
                    <div className="mt-4 bg-slate-900 rounded-xl overflow-hidden border border-slate-700 relative flex flex-col h-[250px]">
                      {/* Fake Website Header */}
                      <div className={`p-4 border-b transition-colors duration-300 ${dragWarning ? 'bg-red-500/20 border-red-500' : 'bg-slate-800 border-slate-600'}`}>
                        <div className="flex justify-between items-center">
                          <div className="w-24 h-4 bg-slate-600 rounded"></div>
                          <div className="flex gap-2">
                            <div className="w-8 h-3 bg-slate-600 rounded"></div>
                            <div className="w-8 h-3 bg-slate-600 rounded"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Fake Content Area */}
                      <div className="flex-1 p-4 relative">
                        <div className="w-3/4 h-3 bg-slate-700 rounded mb-2"></div>
                        <div className="w-full h-3 bg-slate-700 rounded mb-2"></div>
                        <div className="w-5/6 h-3 bg-slate-700 rounded mb-6"></div>
                        
                        {/* The Draggable Ad Block */}
                        <motion.div 
                          drag
                          dragConstraints={{ left: -10, right: 10, top: -60, bottom: 60 }}
                          dragElastic={0.1}
                          onDrag={(event, info) => {
                            // If the ad is dragged upwards towards the header (negative Y)
                            if (info.offset.y < -30) {
                              setDragWarning(true)
                            } else {
                              setDragWarning(false)
                            }
                          }}
                          className={`absolute w-[80%] left-[10%] p-4 border-2 border-dashed cursor-grab active:cursor-grabbing text-center flex flex-col items-center justify-center transition-colors shadow-2xl ${
                            dragWarning ? 'border-red-500 bg-red-500/20' : 'border-slate-500 bg-black/80 hover:border-slate-400'
                          }`}
                        >
                          <span className={`text-xs font-mono font-bold ${dragWarning ? 'text-red-400' : 'text-slate-400'}`}>
                            {dragWarning ? '🚨 ACCIDENTAL CLICK RISK' : '300x250 DRAGGABLE AD'}
                          </span>
                          <span className="text-[10px] text-slate-500 mt-1">Drag to test compliance</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* RPM Calculator */}
                  <div className="p-6 bg-black/40 border border-white/10 rounded-xl flex flex-col gap-4">
                    <h3 className="text-sm font-bold text-white flex justify-between items-center font-mono uppercase">
                      RPM Estimator <span className="text-emerald-400 text-lg">${((Number(pubWords)/500) * 1.2 + (Number(pubPadding) > 15 ? 2.5 : 0.5)).toFixed(2)}</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Words/Page</label>
                        <input type="number" className="p-2 rounded bg-black border border-white/10 font-mono focus:outline-none" value={pubWords} onChange={e => setPubWords(e.target.value)} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Articles</label>
                        <input type="number" className="p-2 rounded bg-black border border-white/10 font-mono focus:outline-none" value={pubArticles} onChange={e => setPubArticles(e.target.value)} />
                      </div>
                    </div>
                  </div>
              </motion.div>
            )}

            {(activeTab === 'meta' || activeTab === 'google') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[300px]">
                <p className="text-slate-500 font-mono text-sm border border-slate-700 p-4 rounded-xl bg-black/40">Modules deprecated in v2.0 for dedicated CLI tools.</p>
              </motion.div>
            )}
          </div>

          <div className="p-4 bg-white/5 border-t border-white/10 flex justify-end">
            <button 
              onClick={generatePayload}
              className="glow-btn px-6 py-2 rounded font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <Code2 size={16} /> Print Config
            </button>
          </div>

          <AnimatePresence>
            {payload && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-[#0a0a0a] text-slate-300 border-t border-white/10"
              >
                <div className="p-6 relative">
                  <pre className="whitespace-pre-wrap font-mono text-xs text-emerald-400">
                    {payload}
                  </pre>
                  <button 
                    onClick={copyToClipboard}
                    className={`mt-4 w-full py-2 rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                      copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
                  >
                    {copied ? <CheckCircle2 size={14}/> : <Copy size={14}/>}
                    {copied ? 'Copied' : 'Copy Payload'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}

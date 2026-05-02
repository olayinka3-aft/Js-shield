"use client";
import React, { useState } from 'react';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { Shield, Lock, Copy, Download, Upload, Zap, Sparkles } from 'lucide-react';

export default function JSShieldPro() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCopying, setIsCopying] = useState(false);

  const encrypt = () => {
    if (!code) return;
    try {
      const res = JavaScriptObfuscator.obfuscate(code, {
        compact: true, controlFlowFlattening: true, simplify: true, 
        stringArray: true, stringArrayEncoding: ['base64']
      }).getObfuscatedCode();
      setOutput(res);
    } catch { alert("Check your JS syntax!"); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Animated Glowing Gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
        {/* Hero Section */}
        <header className="flex flex-col items-center mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wider text-blue-400 backdrop-blur-md mb-4">
            <Sparkles className="w-3 h-3" /> AI-POWERED PROTECTION
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight italic uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
            JS ENCRYPT
          </h1>
          <p className="text-slate-400 text-lg max-w-lg font-light leading-relaxed">
            Obfuscate your source code with industry-standard encryption in seconds.
          </p>
          
          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => document.getElementById('main-input')?.scrollIntoView({behavior: 'smooth'})}
              className="px-8 py-3 rounded-full bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95"
            >
              GET STARTED
            </button>
            <label className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2">
              <Upload className="w-4 h-4" /> UPLOAD FILE
              <input type="file" className="hidden" accept=".js" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => setCode(ev.target?.result as string);
                  reader.readAsText(file);
                }
              }} />
            </label>
          </div>
        </header>

        {/* Input/Output Centered Stack */}
        <div className="w-full space-y-12" id="main-input">
          
          {/* Source Box */}
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase">
              <Zap className="w-3 h-3 fill-blue-400" /> Source Input
            </div>
            <textarea
              className="w-full h-64 bg-transparent border-none focus:ring-0 p-0 font-mono text-sm text-blue-100 placeholder:text-slate-700 resize-none"
              placeholder="// Paste your raw JavaScript logic here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button 
              onClick={encrypt}
              className="w-full mt-6 py-4 bg-white text-black rounded-full font-black text-xs tracking-[0.2em] hover:bg-blue-400 transition-all active:scale-[0.98] uppercase"
            >
              Encrypt Script
            </button>
          </div>

          {/* Result Box */}
          <div className="bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative group">
            <div className="flex justify-between items-center mb-4 text-[10px] font-bold tracking-[0.3em] text-emerald-400 uppercase">
              <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> Shielded Result</span>
              <div className="flex gap-2">
                <button onClick={() => {
                  navigator.clipboard.writeText(output);
                  setIsCopying(true);
                  setTimeout(() => setIsCopying(false), 2000);
                }} className="p-2 hover:bg-white/5 rounded-full transition-all">
                  <Copy className={`w-4 h-4 ${isCopying ? 'text-emerald-400' : 'text-slate-500'}`} />
                </button>
                <button onClick={() => {
                  const blob = new Blob([output], { type: 'text/javascript' });
                  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = "protected.js"; a.click();
                }} disabled={!output} className="p-2 hover:bg-white/5 rounded-full transition-all disabled:opacity-10">
                  <Download className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-64 bg-transparent border-none focus:ring-0 p-0 font-mono text-[11px] leading-relaxed text-emerald-500/80 resize-none"
              readOnly value={output} placeholder="Waiting for source code..."
            />
          </div>

        </div>

        {/* Footer Stats Bar */}
        <div className="mt-20 w-full grid grid-cols-3 gap-4 border-t border-white/5 pt-10 text-center">
          <div>
            <div className="text-2xl font-bold italic">100%</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Secure</div>
          </div>
          <div>
            <div className="text-2xl font-bold italic">0ms</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Latency</div>
          </div>
          <div>
            <div className="text-2xl font-bold italic">∞</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Privacy</div>
          </div>
        </div>
      </div>
    </div>
  );
         }
      

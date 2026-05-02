"use client";
import React, { useState } from 'react';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { Shield, Lock, Copy, Download, Upload, Zap } from 'lucide-react';

export default function JSShield() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCopying, setIsCopying] = useState(false);

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCode(event.target?.result as string);
      reader.readAsText(file);
    }
  };

  const encrypt = () => {
    try {
      const res = JavaScriptObfuscator.obfuscate(code, {
        compact: true, controlFlowFlattening: true, simplify: true, 
        stringArray: true, stringArrayEncoding: ['base64']
      }).getObfuscatedCode();
      setOutput(res);
    } catch { alert("Syntax Error in your JS!"); }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 lg:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col items-center mb-12 text-center">
          <div className="bg-blue-500/10 p-3 rounded-2xl mb-4 border border-blue-500/20">
            <Shield className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            JS SHIELD PRO
          </h1>
          <p className="text-slate-400 text-sm">Next-gen browser-side obfuscation.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 text-xs font-bold uppercase tracking-widest text-blue-400">
              <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Source Code</span>
              <label className="cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1 rounded-lg border border-white/5 flex items-center gap-1">
                <Upload className="w-3 h-3" /> Upload <input type="file" className="hidden" accept=".js" onChange={handleFileUpload} />
              </label>
            </div>
            <textarea
              className="w-full h-80 bg-black/20 border border-white/5 rounded-2xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Paste JavaScript here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={encrypt} className="w-full mt-4 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20">
              ENCRYPT & PROTECT
            </button>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Protected Result</span>
              <div className="flex gap-2">
                <button onClick={copy} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg"><Copy className={`w-4 h-4 ${isCopying ? 'text-emerald-400' : ''}`} /></button>
                <button onClick={() => {
                  const blob = new Blob([output], { type: 'text/javascript' });
                  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = "shielded.js"; a.click();
                }} disabled={!output} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-20"><Download className="w-4 h-4" /></button>
              </div>
            </div>
            <textarea
              className="w-full h-[400px] bg-black/40 border border-emerald-500/10 rounded-2xl p-4 font-mono text-xs text-emerald-500/80 focus:outline-none"
              readOnly value={output} placeholder="Encrypted code will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

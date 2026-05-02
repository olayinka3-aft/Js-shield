"use client";
import React, { useState } from 'react';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { Shield, Lock, Copy, Download, Upload, Zap } from 'lucide-react';

export default function JSShield() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCopying, setIsCopying] = useState(false);

  const encrypt = () => {
    try {
      const res = JavaScriptObfuscator.obfuscate(code, {
        compact: true, controlFlowFlattening: true, simplify: true, 
        stringArray: true, stringArrayEncoding: ['base64']
      }).getObfuscatedCode();
      setOutput(res);
    } catch { alert("Syntax Error!"); }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 lg:p-12 font-sans overflow-x-hidden">
      {/* Background Animation */}
      <div className="fixed -z-10 top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col items-center mb-12 text-center animate-in fade-in slide-in-from-top duration-700">
          <div className="bg-blue-500/20 p-4 rounded-3xl mb-4 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <Shield className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
            JS-ENCRYPT PRO
          </h1>
          <p className="text-slate-400 font-medium tracking-wide">SHIELD YOUR LOGIC. PROTECT YOUR CODE.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Input Area */}
          <div className="group bg-slate-800/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl transition-all hover:border-blue-500/30">
            <div className="flex justify-between items-center mb-6">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                <Zap className="w-4 h-4 fill-blue-400" /> Input Terminal
              </span>
              <label className="cursor-pointer bg-white/5 hover:bg-blue-600 px-5 py-2 rounded-xl border border-white/10 flex items-center gap-2 transition-all active:scale-90 text-xs font-bold">
                <Upload className="w-4 h-4" /> UPLOAD .JS
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
            <textarea
              className="w-full h-80 bg-black/40 border border-white/5 rounded-2xl p-5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-blue-100 placeholder:text-slate-600 shadow-inner"
              placeholder="// Paste your raw JavaScript here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button 
              onClick={encrypt} 
              className="w-full mt-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl font-black text-sm tracking-widest shadow-[0_10px_25px_-5px_rgba(59,130,246,0.4)] transition-all active:scale-95 hover:shadow-blue-500/40"
            >
              RUN OBFUSCATION
            </button>
          </div>

          {/* Output Area */}
          <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                <Lock className="w-4 h-4 shadow-sm" /> Encrypted Result
              </span>
              <div className="flex gap-3">
                <button onClick={() => {
                   navigator.clipboard.writeText(output);
                   setIsCopying(true);
                   setTimeout(() => setIsCopying(false), 2000);
                }} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all active:scale-90 border border-white/5">
                  <Copy className={`w-5 h-5 ${isCopying ? 'text-emerald-400' : 'text-slate-400'}`} />
                </button>
                <button onClick={() => {
                  const blob = new Blob([output], { type: 'text/javascript' });
                  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = "encrypted_logic.js"; a.click();
                }} disabled={!output} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all active:scale-90 border border-white/5 disabled:opacity-10">
                  <Download className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-[410px] bg-black/60 border border-emerald-500/10 rounded-2xl p-5 font-mono text-[10px] leading-relaxed text-emerald-400/80 focus:outline-none shadow-inner"
              readOnly value={output} placeholder="Waiting for input..."
            />
          </div>
        </div>
      </div>
    </div>
  );
                      }
            

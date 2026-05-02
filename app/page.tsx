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
        compact: true,
        controlFlowFlattening: true,
        simplify: true,
        stringArray: true,
        stringArrayEncoding: ['base64']
      }).getObfuscatedCode();
      setOutput(res);
    } catch {
      alert("Check your JS syntax!");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

      {/* 🌐 NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
            <Shield className="w-5 h-5 text-cyan-400" />
            JSShield <span className="text-cyan-400">Pro</span>
          </div>

          <div className="hidden md:flex gap-6 text-sm text-slate-300">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#main-input" className="hover:text-white transition">Encrypt</a>
            <a href="#" className="hover:text-white transition">Docs</a>
          </div>

          <button
            onClick={() => document.getElementById('main-input')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-5 py-2 bg-cyan-500 text-black rounded-full text-xs font-bold hover:bg-cyan-400 transition"
          >
            Try Now
          </button>
        </div>
      </nav>

      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      {/* 🚀 HERO */}
      <div className="pt-32 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-blue-400 mb-6">
          <Sparkles className="w-3 h-3" /> EMPIRE TECH 
        </div>

        <h1 className="text-6xl md:text-7xl font-black italic uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30">
          Protect Your Code
        </h1>

        <p className="text-slate-400 mt-4 max-w-xl mx-auto">
          Professional-grade JavaScript obfuscation built for developers. © empire tech
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => document.getElementById('main-input')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-cyan-500 text-black rounded-full font-bold hover:bg-cyan-400 transition shadow-lg"
          >
            Start Encrypting
          </button>

          <label className="px-8 py-3 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 transition flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
            <input type="file" hidden accept=".js" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => setCode(ev.target?.result as string);
                reader.readAsText(file);
              }
            }} />
          </label>
        </div>
      </div>

      {/* ⚙️ MAIN TOOL */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-12" id="main-input">

        {/* INPUT */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <div className="flex items-center gap-2 mb-4 text-xs text-blue-400 uppercase tracking-widest">
            <Zap className="w-3 h-3" /> Source Input
          </div>

          <textarea
            className="w-full h-64 bg-transparent font-mono text-sm text-blue-100 placeholder:text-slate-600 resize-none outline-none"
            placeholder="// Paste your JavaScript here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            onClick={encrypt}
            className="w-full mt-6 py-4 bg-white text-black rounded-full font-bold hover:bg-cyan-400 transition"
          >
            Encrypt Script
          </button>
        </div>

        {/* OUTPUT */}
        <div className="bg-black/40 border border-white/10 rounded-3xl p-8">
          <div className="flex justify-between mb-4 text-xs text-emerald-400 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Lock className="w-3 h-3" /> Result
            </span>

            <div className="flex gap-2">
              <button onClick={() => {
                navigator.clipboard.writeText(output);
                setIsCopying(true);
                setTimeout(() => setIsCopying(false), 2000);
              }}>
                <Copy className={`w-4 h-4 ${isCopying ? 'text-green-400' : 'text-slate-400'}`} />
              </button>

              <button onClick={() => {
                const blob = new Blob([output], { type: 'text/javascript' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = "protected.js";
                a.click();
              }}>
                <Download className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={output}
            placeholder="Encrypted output appears here..."
            className="w-full h-64 bg-transparent font-mono text-xs text-emerald-400 resize-none outline-none"
          />
        </div>
      </div>

      {/* 🧾 FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} JSShield Pro By rmpire Tech — Built for developers ⚡
      </footer>

    </div>
  );
}

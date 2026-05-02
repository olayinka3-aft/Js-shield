"use client";
import React, { useState } from 'react';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { Shield, Lock, Copy, Download, Upload, Zap } from 'lucide-react';

export default function ModernShield() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCopying, setIsCopying] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCode(event.target?.result as string);
      reader.readAsText(file);
    }
  };

  const encrypt = () => {
    try {
      const result = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        numbersToExpressions: true,
        simplify: true,
        stringArrayEncoding: ['base64']
      }).getObfuscatedCode();
      setOutput(result);
    } catch {
      alert("Syntax Error! Check your JS code.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex flex-col items-center mb-16 text-center">
          <div className="bg-blue-500/10 p-3 rounded-2xl mb-4 border border-blue-500/20">
            <Shield className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            JS SHIELD PRO
          </h1>
          <p className="text-slate-400 max-w-md text-lg font-medium">
            Next-gen obfuscation to keep your logic private.
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Input Card */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-400">
                <Zap className="w-4 h-4" /> Source Code
              </span>
              <label className="cursor-pointer group flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5 transition-all">
                <Upload className="w-4 h-4 group-hover:text-blue-400" />
                <span className="text-xs font-bold">Upload</span>
                <input type="file" className="hidden" accept=".js" onChange={handleFileUpload} />
              </label>
            </div>
            <textarea
              className="w-full h-80 bg-black/20 border border-white/5 rounded-2xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
              placeholder="// Paste your JavaScript here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button 
              onClick={encrypt}
              className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95"
            >
              Encrypt & Protect
            </button>
          </div>

          {/* Output Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-400">
                <Lock className="w-4 h-4" /> Protected Output
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(output);
                    setIsCopying(true);
                    setTimeout(() => setIsCopying(false), 2000);
                  }}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                >
                  <Copy className={`w-5 h-5 ${isCopying ? 'text-emerald-400' : 'text-slate-400'}`} />
                </button>
                <button 
                  disabled={!output}
                  onClick={() => {
                    const blob = new Blob([output], { type: 'text/javascript' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = "protected.js"; a.click();
                  }}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all disabled:opacity-30"
                >
                  <Download className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
            <textarea
              className="w-full h-[408px] bg-black/40 border border-emerald-500/10 rounded-2xl p-4 font-mono text-xs text-emerald-500/80 focus:outline-none"
              readOnly
              value={output}
              placeholder="The encrypted code will appear here..."
            />
          </div>
        </div>
        
        <footer className="mt-20 text-center text-slate-500 text-sm font-medium">
          Securely processed in-browser. No data ever leaves your device.
        </footer>
      </div>
    </div>
  );
}
      alert("Invalid JavaScript! Check your syntax.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-blue-400 mb-2">JS Shield</h1>
          <p className="text-slate-400">Obfuscate your JavaScript to protect your source code.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold">Input Source</label>
              <input 
                type="file" 
                accept=".js" 
                onChange={handleFileUpload}
                className="text-sm text-slate-400 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
              />
            </div>
            <textarea
              className="h-[400px] w-full p-4 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
              placeholder="Paste JavaScript here or upload a file..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button 
              onClick={obfuscateCode}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg font-bold uppercase tracking-wider"
            >
              Encrypt Code
            </button>
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-green-400">Obfuscated Result</label>
              {output && (
                <button 
                  onClick={copyToClipboard}
                  className="text-xs bg-slate-700 px-3 py-1 rounded hover:bg-slate-600 transition"
                >
                  {isCopying ? "Copied!" : "Copy Code"}
                </button>
              )}
            </div>
            <textarea
              className="h-[400px] w-full p-4 bg-slate-950 border border-slate-800 rounded-lg font-mono text-sm text-green-500"
              readOnly
              value={output}
              placeholder="Result will appear here..."
            />
            <button 
              disabled={!output}
              onClick={() => {
                const blob = new Blob([output], { type: 'text/javascript' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "encrypted.js";
                a.click();
              }}
              className="w-full py-3 border border-slate-700 hover:bg-slate-800 disabled:opacity-50 transition-colors rounded-lg font-bold uppercase tracking-wider"
            >
              Download .js File
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

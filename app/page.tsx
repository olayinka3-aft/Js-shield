"use client";
import React, { useState } from 'react';
import JavaScriptObfuscator from 'javascript-obfuscator';

export default function JSEncryptor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCopying, setIsCopying] = useState(false);

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCode(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  // The "Encryption" Logic
  const obfuscateCode = () => {
    try {
      const result = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 1
      });
      setOutput(result.getObfuscatedCode());
    } catch (err) {
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

import React, { useState } from 'react';
import { X, Download } from 'lucide-react';

export default function PwaBanner({ language }) {
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  if (dismissed) return null;

  const handleInstall = () => {
    setInstalled(true);
    setTimeout(() => setDismissed(true), 1500);
  };

  return (
    <div className="fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md animate-bounce-in">
      <div className="bg-[#111726]/95 border border-white/15 backdrop-blur-2xl rounded-3xl p-3.5 shadow-2xl flex items-center justify-between gap-3 text-left">
        {/* App Durga Icon */}
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-rose-600 to-indigo-700 p-0.5 shrink-0 shadow-md">
          <div className="w-full h-full bg-[#0a0d16] rounded-[14px] flex items-center justify-center">
            <span className="text-xl" role="img" aria-label="Durga logo">🔱</span>
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm font-bold text-white truncate">
            {language === 'bn' ? 'হোম স্ক্রিনে পুজো সফর যোগ করুন' : 'Add PujoSafar to Home Screen'}
          </h4>
          <p className="text-[11px] text-slate-400 truncate">
            {installed 
              ? 'App installed successfully! Offline ready.' 
              : 'Install for offline access & seamless navigation'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInstall}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 text-white shadow-sm"
          >
            <Download size={12} />
            <span>{installed ? 'Installed' : 'Install'}</span>
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="text-[11px] text-slate-400 hover:text-white px-1 font-medium hidden sm:inline"
          >
            Not now
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="w-6 h-6 rounded-full text-slate-400 hover:text-white flex items-center justify-center"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

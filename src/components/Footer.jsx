import React from 'react';
import { Terminal, Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
            <Terminal size={18} />
          </div>
          <div>
            <span className="font-display font-bold text-sm text-slate-200 block">NGUYỄN ĐỨC THỊNH</span>
            <span className="font-mono text-[11px] text-cyan-400">Backend City & System Architecture</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 font-mono text-xs text-slate-400">
          <span>Hệ thống: <strong className="text-emerald-400">Đã sẵn sàng</strong></span>
          <span>Kiến trúc: <strong className="text-cyan-400">Microservices & Cache</strong></span>
          <span>AI: <strong className="text-purple-400">Codebase Intelligence</strong></span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
          <a
            href="https://github.com/Ducthinh015"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
          >
            <Github size={14} />
            <span>GitHub Profile</span>
          </a>
          <span>© 2026</span>
        </div>

      </div>
    </footer>
  );
}

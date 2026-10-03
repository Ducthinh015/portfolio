import React, { useState, useEffect } from 'react';
import { SYSTEM_LAYERS } from '../data/mockData';
import { 
  Server, Boxes, Database, Terminal, Bot, ChevronRight, 
  ArrowLeft, X, CheckCircle2, Zap, ShieldCheck, Cpu, Layers, Sparkles 
} from 'lucide-react';

const ICON_MAP = { Server, Boxes, Database, Terminal, Bot };

export default function SkillsSection({ onModalToggle }) {
  const [selectedLayer, setSelectedLayer] = useState(null);

  useEffect(() => {
    if (selectedLayer) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (onModalToggle) onModalToggle(true);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (onModalToggle) onModalToggle(false);
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (onModalToggle) onModalToggle(false);
    };
  }, [selectedLayer, onModalToggle]);

  const handleSelectLayer = (layer) => {
    setSelectedLayer(layer);
  };

  const handleClose = () => {
    setSelectedLayer(null);
  };

  const handleContactRedirect = () => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById('lien-he');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const SelectedIcon = selectedLayer ? (ICON_MAP[selectedLayer.iconName] || Server) : Server;

  return (
    <section id="nang-luc" className="relative py-24 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-100">Năng Lực Theo Lớp Hạ Tầng</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {SYSTEM_LAYERS.map((layer) => {
          const IconComp = ICON_MAP[layer.iconName] || Server;
          return (
            <button 
              key={layer.id} 
              onClick={() => handleSelectLayer(layer)} 
              className="group premium-card relative flex min-h-[310px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-950/68 p-6 text-left shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/55 hover:shadow-[0_35px_110px_rgba(8,145,178,0.22)]"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-0 transition duration-700 group-hover:opacity-25" style={{ backgroundColor: layer.color }} />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl text-slate-950 shadow-lg transition duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: layer.color, boxShadow: `0 0 28px ${layer.color}55` }}>
                    <IconComp size={25} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[10px] font-mono font-bold text-slate-400 group-hover:text-cyan-200">PHÂN LỚP</span>
                </div>
                <h3 className="text-xl font-bold font-display text-slate-100 transition group-hover:text-cyan-200">{layer.tieuDe}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{layer.moTa}</p>
              </div>
              <div>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                  {layer.congNghe.map((tech) => (
                    <span key={tech} className="rounded-lg border border-white/10 bg-slate-950/80 px-2.5 py-1 text-[11px] font-mono text-slate-300">{tech}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between text-xs font-mono font-bold text-slate-400 transition group-hover:text-cyan-200">
                  <span>Xem chi tiết năng lực</span>
                  <ChevronRight size={16} className="transition group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Full-Screen Isolated Skill Detail Page Modal Overlay */}
      {selectedLayer && (
        <div className="fixed inset-0 z-[9999] bg-[#020612] text-slate-100 overflow-y-auto animate-in fade-in duration-200">
          
          {/* Top Dedicated Navigation Header Bar */}
          <header className="sticky top-0 z-40 bg-[#030712]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 overflow-x-auto">
              <button 
                onClick={handleClose}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors font-bold whitespace-nowrap"
              >
                <ArrowLeft size={14} />
                <span>Quay lại Năng Lực Hạ Tầng</span>
              </button>
              <ChevronRight size={12} className="text-slate-600 flex-shrink-0" />
              <span className="text-cyan-400 font-semibold whitespace-nowrap">Phân Lớp Hạ Tầng</span>
              <ChevronRight size={12} className="text-slate-600 flex-shrink-0 hidden sm:inline" />
              <span className="text-slate-200 font-bold truncate max-w-[200px] sm:max-w-xs hidden sm:inline">{selectedLayer.tieuDe}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>CORE SYSTEM CAPACITY</span>
              </span>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close skill details"
              >
                <X size={20} />
              </button>
            </div>
          </header>

          {/* Main Full Page Content Container */}
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            
            {/* Header Hero Card */}
            <div className="relative p-6 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl space-y-6">
              <div 
                className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: selectedLayer.color }}
              />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div 
                  className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-2xl text-slate-950 shadow-2xl"
                  style={{ backgroundColor: selectedLayer.color, boxShadow: `0 0 35px ${selectedLayer.color}66` }}
                >
                  <SelectedIcon size={36} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wide">
                      Phân Lớp Chuyên Môn
                    </span>
                    <span className="text-xs font-mono text-slate-400">ID: {selectedLayer.id}</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black font-display text-slate-100">
                    {selectedLayer.tieuDe}
                  </h1>
                </div>
              </div>

              <p className="text-base text-slate-300 leading-relaxed font-sans max-w-3xl">
                {selectedLayer.moTa}
              </p>

              {/* Technologies Badges Stream */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400 mr-2 uppercase">Công nghệ cốt lõi:</span>
                {selectedLayer.congNghe.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700/80 text-cyan-300 font-mono text-xs font-bold shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Architecture & Technical Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Detailed Breakdown Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Zap size={16} />
                  <span>Mô Tả Kỹ Thuật Chi Tiết</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {selectedLayer.details}
                </p>
              </div>

              {/* Real-World Application Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 size={16} />
                  <span>Ứng Dụng Thực Tế Trong Dự Án</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <span>Tối ưu hóa thời gian phản hồi API và độ ổn định hệ thống khi có tải trọng lớn đồng thời.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <span>Kiểm soát chất lượng mã nguồn nghiêm ngặt qua Code Review, Debugging và quy trình CI/CD triển khai rõ ràng.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <span>Sẵn sàng mở rộng và nâng cấp kiến trúc linh hoạt khi quy mô người dùng và dữ liệu tăng trưởng nhanh.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Performance & Quality Guarantee Metrics */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Cam Kết Tiêu Chuẩn Kỹ Thuật (Architecture Standards)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">HIỆU NĂNG (LATENCY)</span>
                  <span className="text-sm font-bold font-mono text-cyan-400">&lt; 35ms Sub-second</span>
                  <p className="text-[11px] text-slate-400">Tối ưu hóa bộ nhớ đệm Cache & Indexing DB</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">BẢO MẬT (SECURITY)</span>
                  <span className="text-sm font-bold font-mono text-emerald-400">JWT / OAuth2 / SSL</span>
                  <p className="text-[11px] text-slate-400">Bảo vệ luồng giao dịch & Rate Limiting</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">KHẢ NĂNG MỞ RỘNG</span>
                  <span className="text-sm font-bold font-mono text-purple-400">Event-Driven Queue</span>
                  <p className="text-[11px] text-slate-400">Xử lý bất đồng bộ Worker Nodes</p>
                </div>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="pt-6 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 font-mono text-xs font-bold transition-all shadow-md"
              >
                Đóng thông tin
              </button>

              <button
                onClick={handleContactRedirect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20"
              >
                <Sparkles size={15} />
                <span>Liên Hệ Hợp Tác Kỹ Thuật</span>
              </button>
            </div>

          </main>
        </div>
      )}

    </section>
  );
}


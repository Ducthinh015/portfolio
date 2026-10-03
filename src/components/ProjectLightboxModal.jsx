import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export default function ProjectLightboxModal({ project, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (!project || !project.galleryImages || project.galleryImages.length === 0) return null;

  const currentImg = project.galleryImages[currentIndex];
  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? project.galleryImages.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === project.galleryImages.length - 1 ? 0 : prev + 1));

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-slate-950/94 p-4 sm:p-6 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(34,211,238,0.20),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(168,85,247,0.12),transparent_28%)]" />

      <div className="relative z-10 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.36)] backdrop-blur-xl">
        <div className="flex items-center gap-3 min-w-0">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200 border border-cyan-300/25">
            <ImageIcon size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm sm:text-base font-bold text-slate-100 font-display">{project.ten}</h3>
            <p className="text-xs font-mono text-cyan-300">Hình ảnh {currentIndex + 1} trên {project.galleryImages.length}</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-xl border border-white/10 bg-slate-950/70 p-2 text-slate-300 transition hover:border-cyan-300/40 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="relative z-10 my-5 flex flex-1 items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 shadow-[inset_0_0_80px_rgba(15,23,42,0.8)]">
        <button onClick={handlePrev} className="absolute left-3 sm:left-6 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-slate-950/72 text-slate-200 shadow-xl backdrop-blur-xl transition hover:scale-110 hover:border-cyan-300/50 hover:text-cyan-200">
          <ChevronLeft size={24} />
        </button>
        <button onClick={handleNext} className="absolute right-3 sm:right-6 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-slate-950/72 text-slate-200 shadow-xl backdrop-blur-xl transition hover:scale-110 hover:border-cyan-300/50 hover:text-cyan-200">
          <ChevronRight size={24} />
        </button>

        <div className="flex max-h-[75vh] max-w-6xl flex-col items-center p-3 sm:p-6">
          <img src={currentImg.url} alt={currentImg.caption || 'Ảnh dự án'} className="max-h-[64vh] w-auto rounded-2xl border border-white/10 object-contain shadow-[0_35px_120px_rgba(0,0,0,0.7)]" />
          {currentImg.caption && (
            <p className="mt-4 max-w-3xl rounded-2xl border border-white/10 bg-slate-950/78 px-4 py-2 text-center text-xs sm:text-sm font-mono text-cyan-100 backdrop-blur-xl">
              {currentImg.caption}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-3 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        {project.galleryImages.map((img, idx) => (
          <button key={idx} onClick={() => setCurrentIndex(idx)} className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${idx === currentIndex ? 'border-cyan-300 scale-105 shadow-[0_0_26px_rgba(34,211,238,0.35)]' : 'border-white/10 opacity-55 hover:opacity-100'}`}>
            <img src={img.url} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

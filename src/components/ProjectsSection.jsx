import React, { useState } from 'react';
import { Github, Image as ImageIcon, Info, Server, ShoppingBag, Layers3 } from 'lucide-react';
import ProjectLightboxModal from './ProjectLightboxModal';
import ProjectDetailModal from './ProjectDetailModal';
import { getAssetUrl } from '../utils/assetHelper';

export default function ProjectsSection({ projects, onModalToggle }) {
  const [lightboxProject, setLightboxProject] = useState(null);
  const [detailProject, setDetailProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('Tất cả');

  const handleOpenDetail = (proj) => {
    setDetailProject(proj);
    if (onModalToggle) onModalToggle(true);
  };

  const handleCloseDetail = () => {
    setDetailProject(null);
    if (onModalToggle) onModalToggle(false);
  };

  const handleOpenLightbox = (proj) => {
    setLightboxProject(proj);
    if (onModalToggle) onModalToggle(true);
  };

  const handleCloseLightbox = () => {
    setLightboxProject(null);
    if (onModalToggle) onModalToggle(false);
  };

  const visibleProjects = projects.filter((p) => p.hienThi !== false);
  const categories = ['Tất cả', ...new Set(visibleProjects.map((p) => p.danhMuc).filter(Boolean))];
  const filteredProjects = filterCategory === 'Tất cả' ? visibleProjects : visibleProjects.filter((p) => p.danhMuc === filterCategory);

  return (
    <section id="du-an" className="relative py-24 max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-10 h-72 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.16),transparent_35%)]" />
      <div className="relative text-center max-w-3xl mx-auto space-y-4 mb-12">

        <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-100">Dự Án Đã Triển Khai</h2>
      </div>

      {categories.length > 2 && (
        <div className="relative flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${filterCategory === cat ? 'bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(103,232,249,0.28)]' : 'bg-white/[0.035] text-slate-400 border border-white/10 hover:text-white hover:border-cyan-300/40'}`}>
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
        {filteredProjects.map((project, index) => (
          <article key={project.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_26px_80px_rgba(0,0,0,0.38)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/50 hover:shadow-[0_38px_120px_rgba(8,145,178,0.20)] premium-card">
            <div className="absolute left-5 top-5 z-20 rounded-full border border-white/10 bg-slate-950/76 px-3 py-1 text-[10px] font-bold font-mono text-cyan-200 backdrop-blur-xl">
              {project.danhMuc || 'Backend'}
            </div>
            <div className="absolute right-5 top-5 z-20 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] font-bold font-mono text-amber-200">
              #{String(index + 1).padStart(2, '0')}
            </div>

            <button onClick={() => handleOpenLightbox(project)} className="relative block h-64 w-full overflow-hidden bg-slate-950 text-left">
              <img src={getAssetUrl(project.anhCover || '/assets/ecommerce_backend.jpg')} alt={project.ten} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/40 bg-slate-950/78 px-4 py-2 text-xs font-bold font-mono text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.20)] backdrop-blur-xl">
                  <ImageIcon size={15} />
                  Xem gallery ({project.galleryImages?.length || 1} ảnh)
                </span>
              </div>
            </button>

            <div className="p-6">
              <button onClick={() => handleOpenDetail(project)} className="text-left">
                <h3 className="text-xl font-extrabold font-display text-slate-100 group-hover:text-cyan-200 transition-colors line-clamp-2">{project.ten}</h3>
              </button>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">{project.moTaNgan}</p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-500 uppercase">
                  <Layers3 size={13} />
                  Vai trò
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-200">{project.vaiTro}</div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.congNghe.slice(0, 5).map((tech) => (
                  <span key={tech} className="rounded-lg border border-white/10 bg-slate-950 px-2.5 py-1 text-[11px] font-mono text-slate-300">{tech}</span>
                ))}
                {project.congNghe.length > 5 && <span className="rounded-lg border border-white/10 bg-slate-950 px-2.5 py-1 text-[11px] font-mono text-slate-500">+{project.congNghe.length - 5}</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-white/10 p-6 pt-0">
              <button onClick={() => handleOpenDetail(project)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] py-3 text-xs font-bold font-mono text-slate-300 transition hover:border-cyan-300/40 hover:text-white">
                <Info size={14} />
                Chi tiết
              </button>
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-950 py-3 text-xs font-bold font-mono transition hover:bg-cyan-200 shadow-[0_12px_40px_rgba(255,255,255,0.12)]">
                  <Github size={14} />
                  Xem GitHub
                </a>
              ) : (
                <button disabled className="rounded-xl bg-slate-800 py-3 text-xs font-bold font-mono text-slate-500">Riêng tư</button>
              )}
            </div>
          </article>
        ))}
      </div>

      {lightboxProject && <ProjectLightboxModal project={lightboxProject} onClose={handleCloseLightbox} />}
      {detailProject && <ProjectDetailModal project={detailProject} onClose={handleCloseDetail} onOpenGallery={(proj) => { handleCloseDetail(); handleOpenLightbox(proj); }} />}
    </section>
  );
}

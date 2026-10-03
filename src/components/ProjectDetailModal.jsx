import React, { useState, useEffect } from 'react';
import { 
  X, ArrowLeft, Github, ExternalLink, CheckCircle2, 
  ShoppingCart, Star, ShieldCheck, Zap, Server, Cpu, 
  Database, Layers, Eye, FileText, Sparkles, Check, ChevronRight
} from 'lucide-react';

export default function ProjectDetailModal({ project, onClose, onOpenGallery }) {
  if (!project) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('mo-ta');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const galleryList = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [{ url: project.anhCover || '/assets/ecommerce_backend.jpg', caption: project.ten }];

  const currentMainImage = galleryList[activeImgIndex] || galleryList[0];

  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('lien-he');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020612] text-slate-100 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Top E-Commerce Header Bar */}
      <header className="sticky top-0 z-40 bg-[#030712]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 overflow-x-auto">
          <button 
            onClick={onClose}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors font-bold whitespace-nowrap"
          >
            <ArrowLeft size={14} />
            <span>Quay lại Sàn Dự Án</span>
          </button>
          <ChevronRight size={12} className="text-slate-600 flex-shrink-0" />
          <span className="text-cyan-400 font-semibold whitespace-nowrap">{project.danhMuc || 'Backend'}</span>
          <ChevronRight size={12} className="text-slate-600 flex-shrink-0 hidden sm:inline" />
          <span className="text-slate-200 font-bold truncate max-w-[200px] sm:max-w-xs hidden sm:inline">{project.ten}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PRODUCTION VERIFIED</span>
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close detail modal"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main E-Commerce Product Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Top Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Image Gallery & Specs */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Image Stage */}
            <div className="relative h-[340px] sm:h-[420px] w-full rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl group">
              <img
                src={currentMainImage.url || project.anhCover}
                alt={currentMainImage.caption || project.ten}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              {/* Status Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold shadow-lg">
                  {project.danhMuc || 'Sản Phẩm Backend'}
                </span>
              </div>

              {/* Gallery Zoom Button */}
              <button
                onClick={() => onOpenGallery(project, activeImgIndex)}
                className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white font-mono text-xs font-bold transition-all shadow-xl backdrop-blur-md"
              >
                <Eye size={15} />
                <span>Xem Gallery ({galleryList.length} ảnh)</span>
              </button>

              {/* Caption Overlay */}
              {currentMainImage.caption && (
                <div className="absolute bottom-4 left-4 right-32 z-10">
                  <p className="text-xs font-mono text-slate-300 bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 backdrop-blur-sm line-clamp-1">
                    {currentMainImage.caption}
                  </p>
                </div>
              )}
            </div>

            {/* Gallery Thumbnails Stream */}
            {galleryList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative h-20 w-28 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                      activeImgIndex === idx
                        ? 'border-cyan-400 shadow-[0_0_18px_rgba(0,243,255,0.4)] scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* E-Commerce System Guarantee Metrics Pill */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">SLA UPTIME</span>
                <span className="text-xs font-bold font-mono text-emerald-400">99.99% Live</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">RESPONSE TIME</span>
                <span className="text-xs font-bold font-mono text-cyan-400">&lt; 35ms AVG</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">CAPACITY</span>
                <span className="text-xs font-bold font-mono text-purple-400">15k Req/min</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">BẢO MẬT</span>
                <span className="text-xs font-bold font-mono text-amber-400">JWT + RBAC</span>
              </div>
            </div>

          </div>

          {/* Right Column: E-Commerce Product Purchase & Deploy Info Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl">
              
              {/* Author & Vendor Info */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center font-mono font-black text-xs text-cyan-300">
                    NDT
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-200 block font-mono">NGUYỄN ĐỨC THỊNH</span>
                    <span className="text-[10px] text-cyan-400 font-mono">Senior Backend Engineer</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-bold">
                  OFFICIAL ARCHITECTURE
                </span>
              </div>

              {/* Product Title & E-Commerce Rating */}
              <div className="space-y-3">
                <h1 className="text-xl sm:text-2xl font-black font-display text-slate-100 leading-snug">
                  {project.ten}
                </h1>
                
                {/* Rating & Sales count */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <div className="flex items-center text-amber-400 gap-1 font-bold">
                    <Star size={14} className="fill-amber-400" />
                    <span>5.0</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">48 Đánh Giá Kỹ Thuật</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-semibold">Đã Triển Khai Production</span>
                </div>
              </div>

              {/* Price / Deployment Status Tag */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">TRẠNG THÁI KIẾN TRÚC</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">READY TO DEPLOY</span>
                </div>
                <div className="text-lg font-black font-mono text-slate-100">
                  Production-Ready Backend
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Bao gồm Mã nguồn sạch, Cấu hình Docker / Kubernetes & Tài liệu API đầy đủ.
                </p>
              </div>

              {/* E-Commerce Selling Points */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wide block">TÍNH NĂNG NỔI BẬT KHỐI BACKEND</span>
                <div className="space-y-2 text-xs text-slate-300 font-sans">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-cyan-400 flex-shrink-0" />
                    <span>API chuẩn RESTful & Microservices gRPC Throughput cao</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-cyan-400 flex-shrink-0" />
                    <span>Redis Cache 2 tầng tối ưu latency &lt; 35ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-cyan-400 flex-shrink-0" />
                    <span>Cơ chế Idempotency Key bảo vệ luồng thanh toán 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-cyan-400 flex-shrink-0" />
                    <span>Message Queue RabbitMQ xử lý công việc nặng bất đồng bộ</span>
                  </div>
                </div>
              </div>

              {/* Role & Category Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">DANH MỤC</span>
                  <span className="text-xs font-bold text-slate-200 font-mono">{project.danhMuc || 'Backend'}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">VAI TRÒ</span>
                  <span className="text-xs font-bold text-cyan-300 font-mono truncate block">{project.vaiTro}</span>
                </div>
              </div>

              {/* E-Commerce Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/25"
                  >
                    <Github size={16} />
                    <span>XEM SOURCE CODE TRÊN GITHUB</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs font-mono text-slate-500">
                    Source Code Nội Bộ (Chỉ chia sẻ theo yêu cầu)
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onOpenGallery(project, 0)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold transition-all"
                  >
                    <Eye size={14} />
                    <span>Xem Gallery</span>
                  </button>

                  <button
                    onClick={handleContactClick}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold transition-all"
                  >
                    <Sparkles size={14} />
                    <span>Liên Hệ Tư Vấn</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Product Information Tabs */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          
          {/* Tab Selection Navigation Bar */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            {[
              { id: 'mo-ta', label: 'MÔ TẢ CHI TIẾT SẢN PHẨM', icon: FileText },
              { id: 'kien-truc', label: 'BÀI TOÁN & GIẢI PHÁP KIẾN TRÚC', icon: Server },
              { id: 'thong-so', label: 'THÔNG SỐ CÔNG NGHỆ (SPECS)', icon: Cpu },
              { id: 'noi-bat', label: 'ĐIỂM NỔI BẬT & KẾT QUẢ', icon: CheckCircle2 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
                    activeTab === tab.id
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Detailed Product Description */}
          {activeTab === 'mo-ta' && (
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-100 font-display">Tổng quan hệ thống Backend</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                {project.moTaChiTiet}
              </p>
            </div>
          )}

          {/* Tab 2: Challenge & Architecture Solution */}
          {activeTab === 'kien-truc' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
                  <span>BÀI TOÁN KỸ THUẬT</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {project.baiToan}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                  <span>GIẢI PHÁP KIẾN TRÚC</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {project.giaiPhap}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Tech Specs Grid Table */}
          {activeTab === 'thong-so' && (
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <h3 className="text-base font-bold text-slate-100 font-display">Bảng Thông Số Kỹ Thuật Công Nghệ</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.congNghe.map((tech) => (
                  <div key={tech} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs font-mono font-bold text-slate-200">{tech}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">INTEGRATED</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Highlights & Metrics */}
          {activeTab === 'noi-bat' && (
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-100 font-display">Kết Quả & Chỉ Số Nổi Bật</h3>
              {project.diemNoiBat && project.diemNoiBat.length > 0 ? (
                <div className="space-y-3">
                  {project.diemNoiBat.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-sans">
                      <CheckCircle2 size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-mono text-slate-400">Đã kiểm thử và chạy ổn định trên môi trường Production.</p>
              )}
            </div>
          )}

        </div>

        {/* Bottom E-Commerce Notice Bar */}
        <div className="pt-8 pb-12 text-center text-xs font-mono text-slate-500 border-t border-slate-800">
          <p>© Nguyễn Đức Thịnh • Portfolio Backend Engineer • Sản Phẩm Thiết Kế Chuẩn Sàn Thương Mại</p>
        </div>

      </main>
    </div>
  );
}

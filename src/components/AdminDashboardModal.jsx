import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Save, Layers, RefreshCw, LayoutDashboard, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboardModal({ projects, setProjects, onClose }) {
  const [activeTab, setActiveTab] = useState('list');
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);
  const [formData, setFormData] = useState({
    id: '', ten: '', slug: '', moTaNgan: '', moTaChiTiet: '', congNghe: '',
    vaiTro: '', danhMuc: 'Hệ thống Backend', githubUrl: '', anhCover: '',
    galleryUrls: '', hienThi: true, thuTu: 1, baiToan: '', giaiPhap: ''
  });

  const handleStartAdd = () => {
    setFormData({
      id: `proj-${Date.now()}`, ten: '', slug: '', moTaNgan: '', moTaChiTiet: '',
      congNghe: 'Node.js, Python, Redis, RESTful API', vaiTro: 'Backend Engineer',
      danhMuc: 'Hệ thống Backend', githubUrl: 'https://github.com/Ducthinh015/',
      anhCover: '/assets/ecommerce_backend.jpg', galleryUrls: '/assets/ecommerce_backend.jpg\n/assets/ai_analyzer.jpg',
      hienThi: true, thuTu: projects.length + 1, baiToan: '', giaiPhap: ''
    });
    setEditingProject(null);
    setActiveTab('edit');
  };

  const handleStartEdit = (proj) => {
    setEditingProject(proj);
    setFormData({
      ...proj,
      congNghe: Array.isArray(proj.congNghe) ? proj.congNghe.join(', ') : proj.congNghe || '',
      galleryUrls: proj.galleryImages ? proj.galleryImages.map((g) => g.url).join('\n') : ''
    });
    setActiveTab('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      localStorage.setItem('ducthinh_portfolio_projects', JSON.stringify(updated));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const techArray = formData.congNghe.split(',').map((s) => s.trim()).filter(Boolean);
    const galleryArray = formData.galleryUrls.split('\n').map((s) => s.trim()).filter(Boolean).map((url, i) => ({
      url,
      caption: `Hình ảnh chi tiết ${i + 1}`
    }));
    const projectObj = {
      ...formData,
      slug: formData.slug || formData.ten.toLowerCase().replace(/\s+/g, '-'),
      congNghe: techArray,
      galleryImages: galleryArray.length > 0 ? galleryArray : [{ url: formData.anhCover, caption: 'Ảnh dự án' }],
      hienThi: Boolean(formData.hienThi),
      thuTu: Number(formData.thuTu) || 1
    };
    const updated = editingProject ? projects.map((p) => (p.id === editingProject.id ? projectObj : p)) : [projectObj, ...projects];
    setProjects(updated);
    localStorage.setItem('ducthinh_portfolio_projects', JSON.stringify(updated));
    setActiveTab('list');
  };

  const Field = ({ label, children }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-mono text-slate-400">{label}</label>
      {children}
    </div>
  );
  const inputClass = 'w-full rounded-xl border border-white/10 bg-slate-950/80 px-3.5 py-2.5 text-sm text-slate-200 outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.10)]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/88 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative flex h-[88vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/94 shadow-[0_45px_150px_rgba(0,0,0,0.75)]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_16%_0%,rgba(245,158,11,0.13),transparent_26%),radial-gradient(circle_at_82%_10%,rgba(34,211,238,0.14),transparent_30%)]" />

        <aside className="relative z-10 hidden w-72 flex-col justify-between border-r border-white/10 bg-white/[0.025] p-5 md:flex">
          <div>
            <div className="flex items-center gap-3 pb-6">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-200">
                <LayoutDashboard size={20} />
              </div>
              <div>
                <h2 className="text-sm font-black font-display text-white">TRẠM QUẢN TRỊ</h2>
                <p className="text-[11px] font-mono text-slate-500">Quản lý dự án portfolio</p>
              </div>
            </div>
            <div className="space-y-2">
              <button onClick={() => setActiveTab('list')} className={`w-full flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-left text-xs font-bold font-mono transition ${activeTab === 'list' ? 'bg-cyan-300 text-slate-950' : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'}`}>
                <Layers size={16} />
                Danh sách dự án ({projects.length})
              </button>
              <button onClick={handleStartAdd} className="w-full flex items-center gap-2.5 rounded-xl border border-emerald-300/25 bg-emerald-300/10 px-3.5 py-3 text-left text-xs font-bold font-mono text-emerald-200 transition hover:bg-emerald-300/15">
                <Plus size={16} />
                Thêm dự án mới
              </button>
            </div>
          </div>
          <button onClick={() => { if (window.confirm('Khôi phục danh sách dự án về dữ liệu mẫu ban đầu?')) { localStorage.removeItem('ducthinh_portfolio_projects'); window.location.reload(); } }} className="flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-mono text-slate-500 transition hover:bg-white/[0.05] hover:text-rose-300">
            <RefreshCw size={13} />
            Reset dữ liệu mẫu
          </button>
        </aside>

        <main className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
            <div>
              <h2 className="text-base font-bold font-display text-slate-100">Trạm Quản Trị Dự Án</h2>
              <p className="text-xs font-mono text-slate-500">Thêm, chỉnh sửa, xóa danh mục dự án và đồng bộ dữ liệu local</p>
            </div>
            <button onClick={onClose} className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:text-white">
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {activeTab === 'list' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-bold font-mono text-slate-200 uppercase">Tất cả dự án hệ thống</h3>
                  <button onClick={handleStartAdd} className="md:hidden inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 text-xs font-bold font-mono text-slate-950">
                    <Plus size={15} />
                    Thêm dự án
                  </button>
                </div>
                <div className="grid gap-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/35 sm:grid-cols-[88px_1fr_auto] sm:items-center">
                      <img src={proj.anhCover || '/assets/ecommerce_backend.jpg'} alt="" className="h-16 w-24 rounded-xl border border-white/10 object-cover sm:w-[88px]" />
                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-bold font-display text-slate-100">{proj.ten}</h4>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                          <span className="text-cyan-300">{proj.danhMuc}</span>
                          <span>/</span>
                          <span>{proj.vaiTro}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleStartEdit(proj)} className="rounded-xl border border-white/10 bg-slate-950/70 p-2 text-slate-300 transition hover:text-cyan-200" title="Sửa dự án">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(proj.id)} className="rounded-xl border border-white/10 bg-slate-950/70 p-2 text-slate-300 transition hover:text-rose-300" title="Xóa dự án">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'edit' && (
              <form onSubmit={handleSave} className="mx-auto max-w-4xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-sm font-bold font-mono text-slate-200 uppercase">{editingProject ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}</h3>
                  <button type="button" onClick={() => setActiveTab('list')} className="text-xs font-mono text-slate-400 hover:text-white">Hủy bỏ</button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Tên dự án *"><input required value={formData.ten} onChange={(e) => setFormData({ ...formData, ten: e.target.value })} className={inputClass} /></Field>
                  <Field label="Danh mục / Loại dự án"><input value={formData.danhMuc} onChange={(e) => setFormData({ ...formData, danhMuc: e.target.value })} className={inputClass} /></Field>
                  <Field label="Vai trò của bạn"><input value={formData.vaiTro} onChange={(e) => setFormData({ ...formData, vaiTro: e.target.value })} className={inputClass} /></Field>
                  <Field label="Link GitHub Repository"><input value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} className={inputClass} /></Field>
                </div>

                <Field label="Mô tả ngắn"><textarea rows={2} value={formData.moTaNgan} onChange={(e) => setFormData({ ...formData, moTaNgan: e.target.value })} className={inputClass} /></Field>
                <Field label="Mô tả chi tiết"><textarea rows={4} value={formData.moTaChiTiet} onChange={(e) => setFormData({ ...formData, moTaChiTiet: e.target.value })} className={inputClass} /></Field>
                <Field label="Công nghệ sử dụng (phân cách bằng dấu phẩy)"><input value={formData.congNghe} onChange={(e) => setFormData({ ...formData, congNghe: e.target.value })} className={inputClass} /></Field>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="URL ảnh cover"><input value={formData.anhCover} onChange={(e) => setFormData({ ...formData, anhCover: e.target.value })} className={inputClass} /></Field>
                  <Field label="Danh sách URL Gallery (mỗi dòng 1 URL)"><textarea rows={3} value={formData.galleryUrls} onChange={(e) => setFormData({ ...formData, galleryUrls: e.target.value })} className={`${inputClass} font-mono text-xs`} /></Field>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <ImageIcon size={15} className="text-cyan-300" />
                    Ảnh cover và gallery sẽ được dùng ngay ở card dự án và modal gallery.
                  </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                  <button type="button" onClick={() => setActiveTab('list')} className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-bold font-mono text-slate-300">Hủy</button>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-6 py-2.5 text-xs font-bold font-mono text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.24)] transition hover:bg-white">
                    <Save size={16} />
                    Lưu dự án
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

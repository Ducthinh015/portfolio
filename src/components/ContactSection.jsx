import React, { useState } from 'react';
import { Mail, Phone, Github, Send, CheckCircle2, Copy, Terminal, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const [copiedKey, setCopiedKey] = useState('');
  const [sending, setSending] = useState(false);
  const [sentLog, setSentLog] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSentLog({
        status: '200 OK',
        msg: `HTTP/1.1 200 OK\nMessage-ID: msg_${Math.random().toString(36).substr(2, 9)}\nStatus: ENQUEUED TO RABBITMQ WORKER\nResponse: Cảm ơn bạn ${form.name || ''}! Thông điệp đã được gửi thành công đến hệ thống.`
      });
      setForm({ name: '', email: '', message: '' });
    }, 800);
  };

  return (
    <section id="lien-he" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Left info */}
          <div className="lg:col-span-6 space-y-6">


            <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-100">
              Sẵn Sàng Học hỏi Những Kiến Thức Mới Trong Lĩnh Vực Công Nghệ Thông Tin
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Học viện Hàng không Việt Nam - Công nghệ thông tin.
              Tôi mong muốn được cống hiến năng lực trong môi trường có bài toán kỹ thuật thật, quy mô thực tế và cơ hội xây dựng kiến trúc phần mềm bền vững.
            </p>

            {/* Direct Contact Links Grid */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <a href="mailto:thinh0408205@gmail.com" className="flex items-center gap-3 text-slate-200 text-sm font-mono font-semibold hover:text-cyan-400">
                  <Mail size={18} className="text-cyan-400" />
                  <span>thinh0408205@gmail.com</span>
                </a>
                <button
                  onClick={() => handleCopy('thinh0408205@gmail.com', 'email')}
                  className="px-3 py-1 rounded-lg bg-slate-950 text-slate-400 hover:text-cyan-300 text-xs font-mono border border-slate-800"
                >
                  {copiedKey === 'email' ? 'Đã sao chép' : 'Sao chép'}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <a href="tel:0905175313" className="flex items-center gap-3 text-slate-200 text-sm font-mono font-semibold hover:text-cyan-400">
                  <Phone size={18} className="text-emerald-400" />
                  <span>0905 175 313</span>
                </a>
                <button
                  onClick={() => handleCopy('0905175313', 'phone')}
                  className="px-3 py-1 rounded-lg bg-slate-950 text-slate-400 hover:text-cyan-300 text-xs font-mono border border-slate-800"
                >
                  {copiedKey === 'phone' ? 'Đã sao chép' : 'Sao chép'}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                <a href="https://github.com/Ducthinh015" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-200 text-sm font-mono font-semibold hover:text-cyan-400">
                  <Github size={18} className="text-purple-400" />
                  <span>github.com/Ducthinh015</span>
                </a>
                <a
                  href="https://github.com/Ducthinh015"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-400 hover:text-cyan-300"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

          </div>

          {/* Right Interactive Form (Simulated API Terminal) */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
                <Send size={14} />
                <span>GỬI CƠ HỘI MỚI</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                POST /api/v1/contact
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Họ & Tên *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-sans focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Email liên hệ *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-sans focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Nội dung thông điệp *</label>
                <textarea
                  rows={3}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Nhập nội dung trao đổi công việc hoặc câu hỏi..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-sans focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <span>Đang đẩy Payload vào Queue...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Gửi cơ hội mới</span>
                  </>
                )}
              </button>
            </form>

            {/* Simulated API Output Log */}
            {sentLog && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 space-y-1 animate-in fade-in">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 size={14} />
                  <span>RESPONSE: {sentLog.status}</span>
                </div>
                <pre className="text-[10px] text-slate-400 whitespace-pre-wrap">{sentLog.msg}</pre>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { EXPERIENCE_TIMELINE } from '../data/mockData';
import { Terminal, Calendar, CheckCircle2, GitCommit, Shield } from 'lucide-react';

export default function JourneySection() {
  return (
    <section id="hanh-trinh" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">

        <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-100">
          Kinh Nghiệm Thực Tế
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-sans">
          Trải nghiệm thực chiến với các hệ thống backend thực tế, xử lý luồng thanh toán và vận hành máy chủ Linux.
        </p>
      </div>

      {/* Timeline List */}
      <div className="max-w-4xl mx-auto space-y-8">
        {EXPERIENCE_TIMELINE.map((item, idx) => (
          <div
            key={idx}
            className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 shadow-xl space-y-4"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  <GitCommit size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-slate-100">{item.title}</h3>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{item.company}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs font-bold">
                <Calendar size={13} className="text-cyan-400" />
                <span>{item.period}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {item.description}
            </p>

            {/* Achievements List */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                KẾT QUẢ & KĨ NĂNG THỰC CHUYẾN
              </h4>
              <div className="space-y-2">
                {item.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 font-sans">
                    <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

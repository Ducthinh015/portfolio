import React, { useState } from 'react';
import {
  Network, Server, ShieldCheck, Zap, Workflow,
  Database, Cpu, Terminal, Play, RefreshCw, CheckCircle2, ChevronRight
} from 'lucide-react';

export default function SystemArchitectureSection() {
  const [activeFlow, setActiveFlow] = useState('payment');
  const [simulating, setSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const flows = {
    payment: {
      title: 'Luồng Thanh Toán Sàn TMĐT & Webhook Retry',
      desc: 'Quy trình xử lý giao dịch thanh toán bất đồng bộ, xác thực chữ ký Webhook và đảm bảo Idempotency không bị trùng lặp đơn hàng.',
      steps: [
        { name: '1. Khách hàng gửi Yêu cầu', node: 'API Gateway', status: '200 OK', detail: 'Payload kiểm tra HMAC signature' },
        { name: '2. Xác thực Session & Token', node: 'Authentication', status: 'JWT VALID', detail: 'Kiểm tra Token trên Redis Cache' },
        { name: '3. Khởi tạo Giao dịch', node: 'Order Service', status: 'PENDING', detail: 'Tạo đợt Lock tồn kho bằng Redis' },
        { name: '4. Gọi Cổng Thanh Toán', node: 'Payment Gateway', status: 'REDIRECT', detail: 'Tạo QR/URL thanh toán bảo mật' },
        { name: '5. Nhận Webhook từ Ngân hàng', node: 'Webhook Handler', status: 'VERIFIED', detail: 'Nhận callback và verify chữ ký' },
        { name: '6. Đẩy vào Message Queue', node: 'RabbitMQ Queue', status: 'QUEUED', detail: 'Tách biệt tiến trình xử lý nặng' },
        { name: '7. Worker Xử Lý Nền', node: 'Background Worker', status: 'PROCESSED', detail: 'Cập nhật kho & gửi thông báo' },
        { name: '8. Lưu vết Cơ sở dữ liệu', node: 'MySQL Cluster', status: 'COMMITTED', detail: 'Ghi log giao dịch vào Database' }
      ]
    },
    redis: {
      title: 'Luồng Redis Cache Hai Tầng & Eviction Policy',
      desc: 'Chiến lược tối ưu thời gian phản hồi API bằng bộ nhớ đệm in-memory, xử lý Cache Penetration và Cache Avalanche.',
      steps: [
        { name: '1. HTTP Request đến API', node: 'API Gateway', status: 'INCOMING', detail: 'Truy vấn thông tin sản phẩm' },
        { name: '2. Truy vấn Redis Cache', node: 'Redis Cluster', status: 'CHECKING', detail: 'Kiểm tra key cache: prod_9942' },
        { name: '3. Kết quả Redis Cache', node: 'Redis Cache', status: 'CACHE HIT', detail: 'Trả về dữ liệu JSON trong 2ms' },
        { name: '4. Phản hồi Client', node: 'API Response', status: '200 OK', detail: 'Giảm 95% áp lực lên Database' }
      ]
    },
    queue: {
      title: 'Luồng Hàng Đợi Thông Điệp & Worker Nền',
      desc: 'Tách các tác vụ tốn thời gian (gửi email, xuất hóa đơn, tính toán doanh thu) ra khỏi main thread.',
      steps: [
        { name: '1. Nhận yêu cầu xuất báo cáo', node: 'API Endpoint', status: 'ACCEPTED', detail: 'Trả về 202 Accepted cho User' },
        { name: '2. Đẩy Message vào Queue', node: 'RabbitMQ', status: 'ENQUEUED', detail: 'Payload kèm metadata báo cáo' },
        { name: '3. Worker nhặt công việc', node: 'Python Worker', status: 'WORKING', detail: 'Chạy tiến trình tính toán nền' },
        { name: '4. Hoàn tất & Gửi mail', node: 'SMTP Service', status: 'COMPLETED', detail: 'Báo cho người dùng qua Webhook/Mail' }
      ]
    }
  };

  const currentFlowData = flows[activeFlow];

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= currentFlowData.steps.length - 1) {
          clearInterval(interval);
          setSimulating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  return (
    <section id="kien-truc" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">

        <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-100">
          Mô Phỏng Trực Quan Luồng Hệ Thống Backend
        </h2>
        <p className="text-slate-400 text-sm sm:text-base font-sans">
        </p>
      </div>

      {/* Flow Selection Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Object.keys(flows).map((key) => (
          <button
            key={key}
            onClick={() => {
              setActiveFlow(key);
              setCurrentStep(0);
              setSimulating(false);
            }}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-200 border ${activeFlow === key
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/25'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
          >
            {flows[key].title.split('&')[0]}
          </button>
        ))}
      </div>

      {/* Main Interactive Inspector Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-100 font-display">{currentFlowData.title}</h3>
            <p className="text-xs text-slate-400 font-sans mt-1 max-w-2xl">{currentFlowData.desc}</p>
          </div>

          <button
            onClick={handleSimulate}
            disabled={simulating}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${simulating
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30'
              }`}
          >
            {simulating ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
            <span>{simulating ? 'Đang gửi Request...' : 'Bắt đầu gửi Request'}</span>
          </button>
        </div>

        {/* Step-by-Step Pipeline Cards Grid with Continuous Rolling Marble Particles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {currentFlowData.steps.map((step, idx) => {
            const isActive = idx === currentStep && simulating;
            const isPassed = idx < currentStep || (!simulating && currentStep === currentFlowData.steps.length - 1);

            return (
              <React.Fragment key={idx}>
                <div
                  className={`p-5 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isActive
                      ? 'bg-cyan-950/90 border-cyan-400 shadow-[0_0_30px_rgba(0,243,255,0.45)] scale-[1.03] z-20'
                      : isPassed
                      ? 'bg-slate-900/90 border-emerald-500/50 z-10'
                      : 'bg-slate-950 border-slate-800/80 opacity-60 z-10'
                  }`}
                >
                  {/* Continuous Rolling Marble Particles Stream on Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-slate-950/60 overflow-hidden border-b border-slate-800/60">
                    {isActive && (
                      <>
                        <div className="marble-sphere animate-marble-flow" style={{ animationDuration: '0.85s' }} />
                        <div className="marble-sphere animate-marble-flow" style={{ animationDuration: '0.85s', animationDelay: '0.35s' }} />
                        <div className="marble-sphere animate-marble-flow" style={{ animationDuration: '0.85s', animationDelay: '0.65s' }} />
                      </>
                    )}
                    {isPassed && (
                      <div className="absolute inset-0 bg-emerald-500/40" />
                    )}
                  </div>

                  <div className="pt-2">
                    {/* Header Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-300 flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : isPassed ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                        BƯỚC {idx + 1}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded ${
                        isActive
                          ? 'bg-cyan-400 text-slate-950 font-black animate-pulse shadow-[0_0_12px_#00f3ff]'
                          : isPassed
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {step.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 font-mono mb-1">{step.name}</h4>
                    <div className="text-[11px] font-mono text-cyan-400 font-semibold mb-3 flex items-center gap-1">
                      <ChevronRight size={12} className="text-cyan-500" />
                      <span>{step.node}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{step.detail}</p>
                  </div>

                  {/* Inter-Node Arrow / Particle Indicator for Mobile */}
                  {idx < currentFlowData.steps.length - 1 && (
                    <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500 lg:hidden">
                      <span>Tiếp theo: {currentFlowData.steps[idx + 1].node}</span>
                      <ChevronRight size={14} className={isActive ? 'text-cyan-400 animate-bounce' : 'text-slate-600'} />
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}

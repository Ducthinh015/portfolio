import React, { useEffect, useRef, useState } from 'react';
import { XRAY_NODES } from '../data/mockData';
import { Network, ShieldCheck, Zap, Boxes, Workflow, Cpu, Database, Radio, Activity } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

const ICON_MAP = { Network, ShieldCheck, Zap, Boxes, Workflow, Cpu, Database, Radio, Activity };

const NODE_POSITIONS = {
  gateway: { x: 44, y: 30, tooltipDir: 'top', tooltipOffset: { x: 0, y: 0 } },
  auth: { x: 32, y: 40, tooltipDir: 'top', tooltipOffset: { x: 0, y: -70 } },
  redis: { x: 24, y: 52, tooltipDir: 'top', tooltipOffset: { x: 60, y: -40 } },
  microservices: { x: 48, y: 46, tooltipDir: 'right', tooltipOffset: { x: 5, y: 15 } },
  queue: { x: 64, y: 36, tooltipDir: 'top', tooltipOffset: { x: -120, y: 0 } },
  workers: { x: 76, y: 30, tooltipDir: 'top', tooltipOffset: { x: 0, y: 0 } },
  database: { x: 52, y: 55, tooltipDir: 'top', tooltipOffset: { x: 200, y: 0 } },
  webhook: { x: 82, y: 46, tooltipDir: 'left', tooltipOffset: { x: 0, y: 0 } },
  observability: { x: 86, y: 56, tooltipDir: 'top', tooltipOffset: { x: -20, y: -120 } }
};

const CONNECTIONS = [
  ['gateway', 'auth'],
  ['auth', 'microservices'],
  ['microservices', 'redis'],
  ['microservices', 'database'],
  ['microservices', 'queue'],
  ['queue', 'workers'],
  ['workers', 'webhook'],
  ['gateway', 'observability'],
  ['redis', 'observability'],
  ['database', 'observability'],
  ['queue', 'observability'],
  ['webhook', 'observability']
];

const TOOLTIP_TEXT = {
  redis: 'Nơi lưu dữ liệu truy cập nhanh, giảm tải cho hệ thống chính và cải thiện tốc độ phản hồi.',
  queue: 'Giúp tách các tác vụ xử lý nền khỏi request chính, giảm coupling giữa các thành phần hệ thống.',
  database: 'Lưu trữ dữ liệu bền vững, phục vụ luồng đọc ghi và đồng bộ trạng thái sản phẩm.',
  gateway: 'Điểm tiếp nhận request, định tuyến, cân bằng tải và bảo vệ lớp dịch vụ phía sau.',
  auth: 'Xác thực người dùng, phân quyền và bảo vệ phiên làm việc.',
  microservices: 'Các dịch vụ nghiệp vụ độc lập xử lý logic chính của sản phẩm.',
  workers: 'Tiến trình nền xử lý job nặng mà không chặn request chính.',
  webhook: 'Kết nối thanh toán, email, cloud và các dịch vụ bên thứ ba.',
  observability: 'Theo dõi log, metric, trace và cảnh báo khi hệ thống có vấn đề.'
};

const getTooltipDir = (nodeId, x) => {
  if (nodeId === 'auth' || nodeId === 'redis') return 'tooltip-top';
  if (x < 35) return 'tooltip-right';
  if (x > 75) return 'tooltip-left';
  return 'tooltip-top';
};

const NODE_COLOR_MAP = XRAY_NODES.reduce((acc, node) => {
  acc[node.id] = node.color;
  return acc;
}, {});

export default function BackendCityCanvas({ isXray }) {
  const canvasRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const render = () => {
      time += 0.016;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      if (isXray) {
        CONNECTIONS.forEach(([from, to]) => {
          // If a node is hovered, only draw connection lines that directly connect to the hovered node!
          const isRelated = !hoveredNode || from === hoveredNode || to === hoveredNode;
          if (hoveredNode && !isRelated) return;

          const a = NODE_POSITIONS[from];
          const b = NODE_POSITIONS[to];
          if (!a || !b) return;

          const ax = (a.x / 100) * w;
          const ay = (a.y / 100) * h;
          const bx = (b.x / 100) * w;
          const by = (b.y / 100) * h;

          // Single distinct solid color for this connection line
          const lineColor = NODE_COLOR_MAP[from] || '#00f3ff';

          ctx.save();
          ctx.lineWidth = hoveredNode ? 2.5 : 1.6;
          ctx.setLineDash([10, 10]);
          ctx.lineDashOffset = -time * 40;
          ctx.shadowBlur = hoveredNode ? 20 : 10;
          ctx.shadowColor = lineColor;
          ctx.strokeStyle = lineColor;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.bezierCurveTo(
            ((a.x + b.x) / 200) * w,
            ((Math.min(a.y, b.y) - 10) / 100) * h,
            ((a.x + b.x) / 200) * w,
            ((Math.max(a.y, b.y) + 8) / 100) * h,
            bx,
            by
          );
          ctx.stroke();
          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isXray, hoveredNode]);

  return (
    <div className="backend-city-scene">
      {/* Normal City Base Layer */}
      <div className={`city-layer city-layer-normal ${isXray ? 'is-xray-active' : ''}`}>
        <img src={getAssetUrl('/assets/backend_city_premium_normal.png')} alt="Backend City Normal Mode" />
      </div>

      {/* X-Ray City Overlay Layer */}
      <div className={`city-layer city-layer-xray ${isXray ? 'is-active' : ''}`}>
        <img src={getAssetUrl('/assets/backend_city_premium_xray.png')} alt="Backend City X-Ray Mode" />
      </div>

      {/* Left Blend Overlay Gradient for text readability */}
      <div className="city-scene-overlay" />

      {/* X-Ray Beam Scan Layer */}
      <div className={`city-xray-scan ${isXray ? 'is-active' : ''}`} />

      {/* Connection lines & particle canvas */}
      <canvas ref={canvasRef} className={`city-flow-canvas ${isXray ? 'is-active' : ''}`} />



      {/* Interactive Infrastructure Node Badges */}
      <div className={`xray-nodes ${isXray ? 'is-active' : ''}`}>
        {XRAY_NODES.map((node) => {
          const pos = NODE_POSITIONS[node.id];
          if (!pos) return null;
          const Icon = ICON_MAP[node.icon] || Network;
          const active = hoveredNode === node.id;
          const muted = hoveredNode && hoveredNode !== node.id && !CONNECTIONS.some(([a, b]) => (a === hoveredNode && b === node.id) || (b === hoveredNode && a === node.id));

          return (
            <button
              key={node.id}
              type="button"
              className={`xray-node ${active ? 'is-hovered' : ''} ${muted ? 'is-muted' : ''}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, '--node-color': node.color }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <Icon size={18} />
              <span>{node.ten}</span>
              {active && (
                <div
                  className={`xray-tooltip tooltip-${pos.tooltipDir || 'top'}`}
                  style={{
                    '--tp-offset-x': `${pos.tooltipOffset?.x || 0}px`,
                    '--tp-offset-y': `${pos.tooltipOffset?.y || 0}px`
                  }}
                >
                  <strong>{node.ten}</strong>
                  <p>{TOOLTIP_TEXT[node.id] || node.desc}</p>
                  <em>{node.loai}</em>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

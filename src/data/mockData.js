export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    ten: 'Hệ Thống Microservices Sàn Thương Mại Điện Tử & Luồng Thanh Toán Real-time',
    slug: 'microservices-ecommerce-payment',
    moTaNgan: 'Kiến trúc backend xử lý hàng chục nghìn giao dịch mỗi phút, tích hợp Redis cache, Message Queue và webhook thanh toán tự động.',
    moTaChiTiet: `Dự án hệ thống backend cho sàn thương mại điện tử quy mô lớn. 
    Hệ thống được thiết kế theo mô hình Microservices độc lập, tách biệt giữa xử lý đơn hàng, kho bãi, xác thực người dùng và thanh toán. 
    Sử dụng Redis Cluster để cache dữ liệu truy vấn cao và RabbitMQ/Kafka để xử lý bất đồng bộ các tác vụ nặng như gửi mail, cập nhật tồn kho và xử lý webhook từ cổng thanh toán.`,
    congNghe: ['Node.js', 'Python', 'Redis', 'Message Queue', 'MySQL', 'RESTful API', 'Microservices', 'Webhook'],
    vaiTro: 'Backend Engineer (Kiến trúc & Luồng Thanh toán)',
    danhMuc: 'Hệ thống Backend',
    githubUrl: 'https://github.com/Ducthinh015/ecommerce-microservices-backend',
    anhCover: '/assets/ecommerce_backend.jpg',
    galleryImages: [
      {
        url: '/assets/ecommerce_backend.jpg',
        caption: 'Tổng quan kiến trúc Microservices và biểu đồ giám sát latency API real-time'
      },
      {
        url: '/assets/ai_analyzer.jpg',
        caption: 'Luồng xử lý sự kiện bất đồng bộ qua Message Queue & Worker xử lý nền'
      },
      {
        url: '/assets/virtual_tour.jpg',
        caption: 'Giao diện quản trị hạ tầng Redis cache & Trọng tải cơ sở dữ liệu MySQL'
      }
    ],
    hienThi: true,
    thuTu: 1,
    baiToan: 'Xây dựng hệ thống backend chịu tải cao cho giao dịch thương mại điện tử, đảm bảo tuyệt đối không mất đơn hàng khi spike traffic và cập nhật trạng thái thanh toán theo thời gian thực.',
    giaiPhap: 'Tách luồng thanh toán ra Microservice riêng, sử dụng Redis làm distributed lock tránh race condition khi trừ kho, và dùng Message Queue để retry webhook thanh toán khi bị ngắt kết nối.',
    diemNoiBat: [
      'Xử lý hơn 15,000 request/phút với độ trễ trung bình < 45ms',
      'Cơ chế Idempotency Key chống trùng lặp giao dịch thanh toán 100%',
      'Tự động retry Webhook với chiến lược Exponential Backoff'
    ]
  },
  {
    id: 'proj-2',
    ten: 'Nền Tảng AI Codebase Intelligence & Tự Động Phân Tích Refactor',
    slug: 'ai-codebase-intelligence-analyzer',
    moTaNgan: 'Hệ thống công cụ backend ứng dụng AI để phân tích cây cú pháp (AST), phân rã task lập trình và kiểm định chất lượng codebase.',
    moTaChiTiet: `Công cụ hỗ trợ lập trình viên backend tự động hóa việc đọc hiểu codebase phức tạp. 
    Hệ thống phân tích cây cú pháp Abstract Syntax Tree (AST), trích xuất bối cảnh (context) các module và kết hợp Prompt Engineering nâng cao với các LLM để tự động đề xuất phương án refactor code, chia nhỏ task và phát hiện rò rỉ bộ nhớ hoặc lỗi bảo mật.`,
    congNghe: ['Python', 'Node.js', 'RESTful API', 'Prompt Engineering', 'Codebase Analysis', 'Linux/Ubuntu'],
    vaiTro: 'Sole Developer & AI Integrator',
    danhMuc: 'Công cụ AI',
    githubUrl: 'https://github.com/Ducthinh015/ai-codebase-analyzer',
    anhCover: '/assets/ai_analyzer.jpg',
    galleryImages: [
      {
        url: '/assets/ai_analyzer.jpg',
        caption: 'Sơ đồ phân rã Prompt và cây phụ thuộc AST của codebase'
      },
      {
        url: '/assets/ecommerce_backend.jpg',
        caption: 'Bảng theo dõi hiệu năng trước và sau khi AI gợi ý Refactor'
      }
    ],
    hienThi: true,
    thuTu: 2,
    baiToan: 'Giảm thời gian onboarding lập trình viên mới vào dự án backend lớn từ vài tuần xuống còn vài ngày, đồng thời tăng tốc độ code review và refactor.',
    giaiPhap: 'Xây dựng quy trình bóc tách context codebase theo đồ thị phụ thuộc, chuyển thành prompt có cấu trúc gửi tới AI để nhận phản hồi chính xác không bị hallucination.',
    diemNoiBat: [
      'Phân tích tự động hơn 50,000 dòng code Python / JavaScript chỉ trong 30 giây',
      'Đề xuất refactor tối ưu truy vấn SQL giảm 60% thời gian thực thi',
      'Tích hợp CI/CD Pipeline để tự động review Pull Request'
    ]
  },
  {
    id: 'proj-3',
    ten: 'Hệ Thống API Gateway & Tối Ưu Hóa Hạ Tầng Truyền Tải Nginx Proxy',
    slug: 'api-gateway-nginx-proxy',
    moTaNgan: 'Thiết kế API Gateway trung gian kết nối các dịch vụ Frontend & Microservices Backend, quản lý Rate Limiting, CORS và Caching tài nguyên trên Linux.',
    moTaChiTiet: `Hệ thống API Gateway đóng vai trò làm cổng giao tiếp tập trung cho các dịch vụ web. 
    Xử lý cân bằng tải (Load Balancing), giới hạn tần suất request (Rate Limiting) để bảo vệ hệ thống, xác thực Token JWT và quản lý Caching tài nguyên tĩnh qua Nginx Reverse Proxy trên máy chủ Linux Ubuntu.`,
    congNghe: ['Node.js', 'Express', 'Nginx', 'RESTful API', 'Linux/Ubuntu', 'Deployment'],
    vaiTro: 'Backend & Infrastructure Engineer',
    danhMuc: 'Hệ thống API & Proxy',
    githubUrl: 'https://github.com/Ducthinh015/api-gateway-nginx-proxy',
    anhCover: '/assets/virtual_tour.jpg',
    galleryImages: [
      {
        url: '/assets/virtual_tour.jpg',
        caption: 'Bảng điều khiển giám sát traffic Nginx Reverse Proxy & API Gateway Routing'
      },
      {
        url: '/assets/ecommerce_backend.jpg',
        caption: 'Hạ tầng Nginx Caching và phân chia tải công việc giữa các dịch vụ Backend'
      }
    ],
    hienThi: true,
    thuTu: 3,
    baiToan: 'Xử lý truyền tải dữ liệu API dung lượng lớn trên kết nối mạng yếu mà vẫn đảm bảo không giật lag và không bị rò rỉ bộ nhớ.',
    giaiPhap: 'Thiết lập cơ chế Nginx Reverse Proxy Caching, giới hạn tần suất Rate Limiting theo IP và tối ưu hóa Webhook đồng bộ trạng thái.',
    diemNoiBat: [
      'Tối ưu hóa thời gian phản hồi API trung bình dưới 35ms',
      'Đồng bộ dữ liệu hai chiều chuẩn xác giữa các Microservices',
      'Triển khai thành công trên môi trường Ubuntu Server với Nginx proxy caching'
    ]
  }
];

export const SYSTEM_LAYERS = [
  {
    id: 'backend',
    tieuDe: 'Backend Core',
    iconName: 'Server',
    moTa: 'Phát triển API chuẩn RESTful, xử lý xác thực bảo mật, tích hợp Webhook và xây dựng logic nghiệp vụ bền vững.',
    congNghe: ['Node.js', 'Python', 'RESTful API', 'Authentication', 'Webhook'],
    color: '#00f3ff',
    details: 'Thiết kế REST API theo chuẩn OpenAPI/Swagger, xử lý Authentication với JWT/OAuth2, mã hóa mật khẩu bcrypt, quản lý Webhook retry với Idempotency Key.'
  },
  {
    id: 'architecture',
    tieuDe: 'Hệ Thống & Kiến Trúc',
    iconName: 'Boxes',
    moTa: 'Thiết kế kiến trúc Microservices, bộ nhớ đệm Redis, hàng đợi thông điệp Message Queue và luồng thanh toán sàn TMĐT.',
    congNghe: ['Microservices', 'Redis', 'Message Queue', 'Payment Integration'],
    color: '#a855f7',
    details: 'Xây dựng Event-driven Architecture với RabbitMQ/Kafka, lưu trữ phiên đăng nhập và rate limit trên Redis Cluster, giao tiếp gRPC/HTTP giữa các Microservices.'
  },
  {
    id: 'database',
    tieuDe: 'Cơ Sở Dữ Liệu',
    iconName: 'Database',
    moTa: 'Tối ưu hóa truy vấn SQL, thiết kế schema dữ liệu quan hệ và phi quan hệ chịu tải cao.',
    congNghe: ['MySQL', 'MongoDB'],
    color: '#3b82f6',
    details: 'Tối ưu Index MySQL, phân chia Database Read/Write Replica, thiết kế Document Schema MongoDB cho log giao dịch và dữ liệu JSON linh hoạt.'
  },
  {
    id: 'operations',
    tieuDe: 'Vận Hành & Triển Khai',
    iconName: 'Terminal',
    moTa: 'Quản trị máy chủ Linux/Ubuntu, cấu hình CI/CD tự động, Git workflow và xử lý sự cố hệ thống (Troubleshooting).',
    congNghe: ['Linux/Ubuntu', 'Git', 'CI/CD', 'Deployment', 'Troubleshooting'],
    color: '#f59e0b',
    details: 'Quản trị Ubuntu Server, Nginx Reverse Proxy, viết bash script tự động deploy, phân tích log systemctl/journalctl khi xảy ra sự cố production.'
  },
  {
    id: 'ai-dev',
    tieuDe: 'AI Hỗ Trợ Phát Triển',
    iconName: 'Bot',
    moTa: 'Ứng dụng AI nâng cao năng suất: Prompt Engineering, phân tích codebase, chia nhỏ task, debug và refactor code.',
    congNghe: ['Prompt Engineering', 'Phân Tích Codebase', 'Chia Task', 'Debug', 'Refactor', 'Code Review'],
    color: '#10b981',
    details: 'Khai thác AI như trợ lý lập trình chuyên sâu để phân tích AST, tìm kiếm Memory Leak, tự động sinh Test Case và tối ưu hóa thuật toán phức tạp.'
  }
];

export const XRAY_NODES = [
  { id: 'gateway', ten: 'Cổng API', loai: 'API Gateway', status: '200 OK', latency: '12ms', tps: '14,200', icon: 'Network', color: '#00f3ff', desc: 'Điểm tiếp nhận toàn bộ request từ Client, thực hiện Rate Limiting, CORS, SSL termination và định tuyến đến các Microservices.' },
  { id: 'auth', ten: 'Xác Thực', loai: 'Authentication & Security', status: 'HOẠT ĐỘNG', latency: '8ms', tps: '3,800', icon: 'ShieldCheck', color: '#10b981', desc: 'Xác thực JWT Token, phân quyền Role-Based Access Control (RBAC), phòng chống Brute Force và mã hóa phiên làm việc.' },
  { id: 'redis', ten: 'Redis Cache', loai: 'In-Memory Caching', status: 'HÍT RATE 94%', latency: '2ms', memory: '4.2GB / 16GB', icon: 'Zap', color: '#ef4444', desc: 'Lưu trữ session, dữ liệu danh mục sản phẩm hot, Distributed Lock cho giao dịch thanh toán và Rate Limit counters.' },
  { id: 'microservices', ten: 'Cụm Microservices', loai: 'Core Business Logic', status: 'HEALTHY (8 Nodes)', latency: '24ms', tps: '11,500', icon: 'Boxes', color: '#a855f7', desc: 'Cụm dịch vụ đơn hàng, dịch vụ tài khoản, dịch vụ thanh toán và kho vận chạy độc lập, giao tiếp qua gRPC & Event Stream.' },
  { id: 'queue', ten: 'Hàng Đợi Thông Điệp', loai: 'Message Queue (RabbitMQ)', status: '0 PENDING', count: '128,400 msgs/h', icon: 'Workflow', color: '#f59e0b', desc: 'Quản lý tác vụ xử lý bất đồng bộ: gửi email xác nhận, đẩy dữ liệu báo cáo, queue tin nhắn notification và webhook retries.' },
  { id: 'workers', ten: 'Worker Xử Lý Nền', loai: 'Background Workers', status: '4 WORKERS ONLINE', activeJobs: '18 jobs/s', icon: 'Cpu', color: '#06b6d4', desc: 'Các tiến trình nền liên tục tiêu thụ message từ Queue để tính toán doanh thu, mã hóa video/ảnh và xử lý batch job.' },
  { id: 'database', ten: 'Cơ Sở Dữ Liệu', loai: 'MySQL / MongoDB Cluster', status: 'MASTER-SLAVE ONLINE', connections: '342 active', icon: 'Database', color: '#3b82f6', desc: 'Nơi lưu trữ bền vững toàn bộ đơn hàng, thông tin người dùng và sản phẩm. Có cơ chế tự động Replication và Backup.' },
  { id: 'webhook', ten: 'Webhook / Tích Hợp', loai: 'External API Integration', status: 'CONNECTED', uptime: '99.99%', icon: 'Radio', color: '#ec4899', desc: 'Tích hợp kết nối với các cổng thanh toán (VNPay, MoMo, ZaloPay) và đối tác vận chuyển với Idempotency Key bảo mật.' },
  { id: 'observability', ten: 'Quan Sát Hệ Thống', loai: 'Prometheus & Grafana', status: 'MONITORING LIVE', metrics: 'Metrics OK', icon: 'Activity', color: '#84cc16', desc: 'Theo dõi chỉ số hệ thống (CPU, RAM, Disk I/O, API Error Rate 5xx) và gửi cảnh báo ngay lập tức qua Telegram Bot khi có sự cố.' }
];

export const EXPERIENCE_TIMELINE = [
  {
    period: '05/2026 – Hiện tại',
    title: 'Software Developer',
    company: 'React • krpano • JavaScript',
    description: 'Phát triển ứng dụng Virtual Tour 360° bằng React và krpano. Xây dựng component, hotspot, scene navigation và các tính năng tương tác.',
    achievements: [
      'Phát triển ứng dụng Virtual Tour 360° bằng React và krpano',
      'Xây dựng component, hotspot, scene navigation và các tính năng tương tác',
      'Thiết kế prompt theo codebase context, technical constraints và yêu cầu tính năng để hỗ trợ phân tích, implementation và debugging React/krpano',
      'Xử lý responsive UI, debugging và tối ưu trải nghiệm web',
      'Tham gia build, deployment và troubleshooting ứng dụng'
    ]
  },
  {
    period: '12/2025 – 05/2026',
    title: 'Full-stack Developer',
    company: 'Next.js • React • Node.js • Python',
    description: 'Phát triển frontend, backend, RESTful API và business logic cho ứng dụng web. Làm việc với microservices, Redis, message queue và payment flow.',
    achievements: [
      'Phát triển frontend, backend, RESTful API và business logic cho ứng dụng web',
      'Làm việc với microservices, Redis, message queue và payment flow',
      'Tích hợp API, database và xử lý giao tiếp giữa các thành phần hệ thống',
      'Ứng dụng AI coding & prompt engineering để phân tích codebase, chia nhỏ task, triển khai tính năng, debug và refactor',
      'Tham gia deployment và troubleshooting trên Linux/Ubuntu'
    ]
  }
];

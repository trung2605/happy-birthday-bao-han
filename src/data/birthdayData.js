// ============================================================================
// birthdayData.js — Dữ liệu trung tâm cho trang Happy Birthday Lưu Nguyễn Bảo Hân
// Thiết kế chuẩn Impeccable + Shadcn UI (Không sử dụng Emoji thô, chỉ dùng Lucide/SVG)
// ============================================================================
import photoManifest from './photoManifest.json';

export const birthdayGirl = {
  fullName: "Lưu Nguyễn Bảo Hân",
  shortName: "Bảo Hân",
  nickname: "Bún / Hân",
  birthDate: "08.11.2007",
  turningAge: 19,
  boyfriendName: "Anh Trung",
  anniversaryStart: "2025-11-05",
  locationJourney: "Đà Nẵng — Sài Gòn",
  avatar: "/memories/profile/avatar-baohan.jpg",
  heroPortrait: "/memories/saigon/photopalette/palette-09.jpg",
  coupleHero: "/memories/saigon/photopalette/palette-03.jpg",
  socialLinks: [
    {
      label: "@lngbhan_",
      sublabel: "Instagram cá nhân",
      url: "https://www.instagram.com/lngbhan_/",
      icon: "Instagram",
    },
    {
      label: "@bunii.817",
      sublabel: "Daily & Lifestyle",
      url: "https://www.instagram.com/bunii.817/",
      icon: "Sparkles",
    },
    {
      label: "@lop_thephotos",
      sublabel: "Photography Studio",
      url: "https://www.instagram.com/lop_thephotos/",
      icon: "Camera",
    },
    {
      label: "Portfolio",
      sublabel: "luu-nguyen-bao-han.vercel.app",
      url: "https://luu-nguyen-bao-han.vercel.app/",
      icon: "Globe",
    },
    {
      label: "LinkedIn",
      sublabel: "in/lngbhan0811",
      url: "https://www.linkedin.com/in/lngbhan0811/",
      icon: "Briefcase",
    },
  ],
};

// ----------------------------------------------------------------------------
// CHƯƠNG 1: KỊCH BẢN MỞ ĐẦU HỒI HỘP (Việt hóa từ hbd-card.netlify.app)
// ----------------------------------------------------------------------------
export const spookyStorySteps = [
  {
    id: "darkroom",
    roomTitle: "Căn Phòng Tối Đêm Khuya",
    sceneImage: "/scenes/room-empty.jpg",
    svgFallback: "/scenes/bedroom.svg",
    lines: [
      "Ủa... Này...",
      "Sao trong phòng lại tối om thế nhỉ?",
      "Bảo Hân ơi! Em với tay bật giúp anh cái công tắc đèn trần được không?",
    ],
    actionType: "switch",
    actionLabel: "Bật công tắc đèn trần",
    actionHint: "Chạm vào bóng đèn phía trên để thắp sáng căn phòng",
  },
  {
    id: "emptyroom",
    roomTitle: "Căn Phòng Trống Trải",
    sceneImage: "/scenes/room-empty.jpg",
    svgFallback: "/scenes/bedroom.svg",
    lines: [
      "Đèn sáng rồi... Nhưng sao trong phòng lại vắng lặng không một bóng người thế này?",
      "Chẳng thấy ai ở đây cả, chỉ có tiếng gió khẽ lùa qua khe cửa...",
      "Hay là mình thử mở cánh cửa gỗ bên phải để bước ra ngoài hành lang xem sao nhé?",
    ],
    actionType: "door-out",
    actionLabel: "Mở cửa bước ra hành lang",
    actionHint: "Chạm vào cánh cửa gỗ để mở cửa bước ra ngoài",
  },
  {
    id: "hallway",
    roomTitle: "Hành Lang Lúc Nửa Đêm",
    sceneImage: "/scenes/room-hallway.jpg",
    svgFallback: "/scenes/hallway.svg",
    lines: [
      "Này Hân ơi...",
      "Giờ này mà đi dọc hành lang vắng thế này trông hơi rợn người đấy...",
      "Ánh đèn đỏ chập chờn và sương lạnh ngoài này làm sống lưng cứ lành lạnh kiểu gì ấy...",
      "Thôi không ổn chút nào, mình mau mở cửa chạy ngược vào trong phòng đi!",
    ],
    actionType: "door-in",
    actionLabel: "Mở cửa chạy ngược vào phòng",
    actionHint: "Mau chạm vào cánh cửa phòng để quay trở vào trong!",
  },
  {
    id: "giftroom",
    roomTitle: "Điều Bất Ngờ Giữa Phòng",
    sceneImage: "/scenes/room-gift.jpg",
    svgFallback: "/scenes/bedroom.svg",
    lines: [
      "Phù... Vừa nãy ngoài hành lang làm hết cả hồn...",
      "Ơ kìa! Nhìn xem, từ lúc nào căn phòng đã ngập tràn ánh đèn vàng ấm áp thế này?",
      "Có một hộp quà phát sáng ai vừa đặt sẵn trên bệ gỗ giữa phòng dành riêng cho em kìa!",
      "Lại đây mở thử xem bên trong đang cất giấu bí mật gì nhé!",
    ],
    actionType: "gift",
    actionLabel: "Mở hộp quà sinh nhật",
    actionHint: "Chạm vào hộp quà trên bệ sáng để mở điều bất ngờ",
  },
];

// ----------------------------------------------------------------------------
// CHƯƠNG 2: SÂN KHẤU SINH NHẬT TUỔI 19 & ƯỚC NGUYỆN
// ----------------------------------------------------------------------------
export const typewriterPhrases = [
  "Happy 19th Birthday, Lưu Nguyễn Bảo Hân",
  "Chúc mừng sinh nhật cô gái ngày 08.11.2007",
  "Cô nhiếp ảnh gia nhỏ đầy tài năng của anh",
  "Tuổi 19 rực rỡ, bình yên và ngập tràn yêu thương",
];

export const wishMessages = [
  "Điều ước tuổi 19 của Bảo Hân đã bay lên bầu trời đêm đầy sao",
  "Nhắm mắt lại nhé, mọi ước nguyện của em đều sẽ thành hiện thực",
  "Nến đã thổi tắt — chúc tuổi 19 của em đắt show, rực rỡ và luôn hạnh phúc",
  "Đèn trời đã mang lời ước của em bay thật cao rồi đó",
];

export const marqueeItems = [
  "LƯU NGUYỄN BẢO HÂN",
  "HAPPY 19TH BIRTHDAY",
  "08 • 11 • 2007",
  "MEDIA & PHOTOGRAPHER",
  "WESTERN SYDNEY UNIVERSITY",
  "ĐÀ NẴNG — SÀI GÒN",
  "1 YEAR OF LOVE",
];

// ----------------------------------------------------------------------------
// CHƯƠNG 3: TỰ HÀO TUỔI 18 RỰC RỠ (DECODE PORTAL & EDITORIAL SHOWCASE)
// ----------------------------------------------------------------------------
export const achievementStats = [
  {
    value: "19",
    label: "Chào đón tuổi mới 08/11 — Trưởng thành, xinh đẹp và bản lĩnh",
  },
  {
    value: "1000+",
    label: "Tác phẩm nhiếp ảnh lưu giữ thanh xuân tại @lop_thephotos & @nahs.album",
  },
  {
    value: "365+",
    label: "Ngày yêu nhau — Hành trình từ Đà Nẵng thương nhớ đến Sài Gòn",
  },
];

export const proudMilestones = [
  {
    id: "01",
    badge: "Cột Mốc Trưởng Thành Đầu Đời",
    title: "Thực Tập Sinh Tại AEON",
    subtitle: "Bước ngoặt chuyên nghiệp đầu tiên tại Sài Gòn",
    period: "Tuổi 18 — 19 • Ho Chi Minh City",
    icon: "Briefcase",
    coverImage: "/memories/saigon/metro/metro-em-01.jpg",
    secondaryImage: "/memories/saigon/photopalette/palette-05.jpg",
    description:
      "Chúc mừng Bảo Hân với bước ngoặt đáng nhớ: chính thức bước vào môi trường tập đoàn bán lẻ hàng đầu Nhật Bản với công việc thực tập đầu tiên tại AEON. Sự tự tin, chỉn chu và tinh thần cầu tiến của em luôn làm anh tự hào.",
    highlights: [
      "Chinh phục vị trí thực tập đầu đời ngay từ năm nhất đại học",
      "Rèn luyện tác phong truyền thông và làm việc nhóm trong môi trường doanh nghiệp lớn",
      "Bản lĩnh cân bằng giữa lịch học quốc tế, đi thực tập và đam mê nhiếp ảnh",
    ],
  },
  {
    id: "02",
    badge: "Một Năm Bùng Nổ Đam Mê",
    title: "Đắt Show Tại @lop_thephotos",
    subtitle: "Hơn 1,000+ khung hình kể chuyện bằng ánh sáng",
    period: "2025 — 2026 • Freelance Photographer",
    icon: "Camera",
    coverImage: "/memories/saigon/vangogh/vangogh-13.jpg",
    secondaryImage: "/memories/portfolio/cham-vao-di-san/cham-vao-di-san-06.jpg",
    description:
      "Một năm tuổi 18 rực rỡ khi chiếc máy ảnh của em không ngừng ghi lại hàng ngàn khoảnh khắc đẹp. Từ @lop_thephotos đến @nahs.album, cái tên Bảo Hân ngày càng được nhiều khách hàng yêu mến và đặt lịch kín tuần.",
    highlights: [
      "Đắt show chụp ảnh kỷ yếu, chân dung nàng thơ, áo dài Tết và couple",
      "Sáng lập và phát triển kênh nhiếp ảnh với phong cách hậu kỳ màu sắc đầy chất thơ",
      "Làm chủ cả máy ảnh kỹ thuật số lẫn máy ảnh film truyền cảm hứng",
    ],
    link: "https://www.instagram.com/lop_thephotos/",
    linkLabel: "Khám phá @lop_thephotos",
  },
  {
    id: "03",
    badge: "Học Vấn & Hoạt Động Năng Nổ",
    title: "Western Sydney University & WSU Dynamic",
    subtitle: "Từ nữ sinh giỏi Phan Châu Trinh đến giảng đường quốc tế",
    period: "2025 — 2028 • Bachelor of Business (Marketing)",
    icon: "GraduationCap",
    coverImage: "/memories/profile/avatar-baohan.jpg",
    secondaryImage: "/memories/saigon/vangogh/vangogh-04.jpg",
    description:
      "Khép lại những năm tháng rực rỡ tại THPT Phan Châu Trinh (Đà Nẵng) với GPA lớp 12 trên 9.0 và giải Học sinh giỏi cấp Thành phố, em tiếp tục tỏa sáng tại Western Sydney University Vietnam.",
    highlights: [
      "Tốt nghiệp THPT Phan Châu Trinh loại Giỏi (GPA > 9.0) & chứng chỉ IELTS 6.0",
      "Hoàn thành xuất sắc EAP5, theo học chuyên ngành Cử nhân Kinh doanh (Marketing)",
      "Đảm nhiệm vị trí Media tại Ban Truyền thông câu lạc bộ WSU Dynamic",
    ],
    link: "https://www.linkedin.com/in/lngbhan0811/",
    linkLabel: "Xem Hồ Sơ LinkedIn",
  },
  {
    id: "04",
    badge: "Thương Hiệu Cá Nhân & Sáng Tạo",
    title: "Personal Branding @lngbhan_ & @bunii.817",
    subtitle: "Dấu ấn thị giác riêng biệt trên Instagram & Website",
    period: "2023 — Nay • Content Creator & Media Specialist",
    icon: "Sparkles",
    coverImage: "/memories/couple/06-cafe-headphone.jpg",
    secondaryImage: "/memories/saigon/photopalette/palette-09.jpg",
    description:
      "Không chỉ đứng sau ống kính, em còn tự xây dựng hình ảnh cá nhân đầy cuốn hút trên mạng xã hội và sở hữu một trang Portfolio nghệ thuật lưu trữ các ấn phẩm của riêng mình.",
    highlights: [
      "Xây dựng cộng đồng hơn 1,000+ người theo dõi trên Instagram @lngbhan_",
      "Góc nhỏ nhật ký đời thường tinh tế và đáng yêu tại @bunii.817",
      "Sở hữu website Portfolio chuyên nghiệp trưng bày các dự án nhiếp ảnh văn hóa",
    ],
    link: "https://luu-nguyen-bao-han.vercel.app/",
    linkLabel: "Mở Website Portfolio",
  },
];

// 5 Ấn phẩm / Bộ ảnh nghệ thuật cho trục cuộn ngang (Horizontal Scroll Track kiểu giaimamanhai.vercel.app)
export const portfolioHighlights = [
  {
    id: "cham-vao-di-san",
    num: "01",
    maskVariant: "hole", // .act--hole style
    title: "Chạm Vào Di Sản",
    category: "Photography & Culture",
    period: "23/02/2026 — 28/02/2026",
    image: "/memories/portfolio/cham-vao-di-san.jpg",
    quote:
      "Tà áo dài và khăn rằn như chạm vào hơi thở văn hóa đang lắng đọng trong từng nếp vải, nơi nhịp sống trẻ hòa mình vào những giá trị xưa cũ.",
    link: "https://luu-nguyen-bao-han.vercel.app/",
  },
  {
    id: "co-em",
    num: "02",
    maskVariant: "curve", // .act--curve style
    title: "Có Em (With You)",
    category: "Portraiture & Lifestyle",
    period: "03/02/2026 — 07/02/2026",
    image: "/memories/portfolio/co-em.jpg",
    quote:
      "Ghi lại những khoảnh khắc đáng nhớ sau bao ngày xa cách — từng mảnh ký ức bên nhau quý giá nhất tại thành phố Đà Nẵng thân thuộc.",
    link: "https://luu-nguyen-bao-han.vercel.app/",
  },
  {
    id: "mua-tro-ve",
    num: "03",
    maskVariant: "arch", // .act--arch style
    title: "Mùa Trở Về",
    category: "Editorial Photography",
    period: "10/02/2026 — 14/02/2026",
    image: "/memories/portfolio/mua-tro-ve.jpg",
    quote:
      "Bôn ba khắp chốn xa quê nhà, chẳng bằng giây phút được kề cạnh bên nhau gom nhặt từng vụn sáng bình yên ngày sang xuân.",
    link: "https://luu-nguyen-bao-han.vercel.app/",
  },
  {
    id: "giot-nang-ben-them",
    num: "04",
    maskVariant: "hole",
    title: "Giọt Nắng Bên Thềm",
    category: "Artistic & Poetry",
    period: "14/02/2026 — 18/02/2026",
    image: "/memories/portfolio/giot-nang-ben-them.jpg",
    quote:
      "Nón lá nghiêng che nửa khuôn mặt — Giấu chút tình riêng, thẹn thùng trong mắt — Hay là sợ nắng vô tình chạm tới.",
    link: "https://luu-nguyen-bao-han.vercel.app/",
  },
  {
    id: "cho-han-chut-tet",
    num: "05",
    maskVariant: "curve",
    title: "Chợ Hàn, Chút Tết",
    category: "Street Photography",
    period: "15/02/2026 — 17/02/2026",
    image: "/memories/portfolio/cho-han-chut-tet.jpg",
    quote:
      "Chậm lại từng bước qua những con phố thân quen, giữ khoảng trời thanh xuân mãi rạng rỡ dưới ánh hoàng hôn đổ bóng.",
    link: "https://luu-nguyen-bao-han.vercel.app/",
  },
];

// ----------------------------------------------------------------------------
// CHƯƠNG 4: HÀNH TRÌNH 1 NĂM YÊU NHAU & CHUYẾN ĐI "ANH TRUNG VÀO SÀI GÒN"
// ----------------------------------------------------------------------------
export const polaroidStackMemories = [
  {
    id: "pol-1",
    src: "/memories/couple/01-ao-dai-non-la.jpg",
    caption: "Tà áo dài trắng và chiếc nón nghiêng che nắng cho em",
    dateTag: "Kỷ niệm đôi mình",
  },
  {
    id: "pol-2",
    src: "/memories/saigon/photopalette/palette-03.jpg",
    caption: "Bó hoa tươi thắm dành tặng công chúa nhỏ của anh",
    dateTag: "Photo Palette Sài Gòn",
  },
  {
    id: "pol-3",
    src: "/memories/couple/02-bien-da-nang.jpg",
    caption: "Gió biển rì rào và nụ cười tinh nghịch khi véo má em",
    dateTag: "Biển Đà Nẵng",
  },
  {
    id: "pol-4",
    src: "/memories/couple/07-canh-dong-anh-sang.jpg",
    caption: "Giữa cánh đồng lúa vàng và muôn vì tinh tú lấp lánh",
    dateTag: "Bảo tàng Van Gogh",
  },
  {
    id: "pol-5",
    src: "/memories/couple/03-san-la-kho.jpg",
    caption: "Nằm dài trên sân lá rụng, bình yên chỉ cần có nhau",
    dateTag: "Ngày nắng đẹp",
  },
  {
    id: "pol-6",
    src: "/memories/couple/06-cafe-headphone.jpg",
    caption: "Góc quán nhỏ, chiếc tai nghe trắng và ánh mắt em",
    dateTag: "Hẹn hò Cafe",
  },
  {
    id: "pol-7",
    src: "/memories/couple/05-chuyen-xe-vui-ve.jpg",
    caption: "Chuyến xe chở đầy tiếng cười của hai đứa mình",
    dateTag: "Vi vu bên nhau",
  },
  {
    id: "pol-8",
    src: "/memories/couple/04-dem-hen-ho.jpg",
    caption: "Đêm trải bạt ngồi cạnh nhau giữa biển người nhộn nhịp",
    dateTag: "Đêm kỷ niệm",
  },
  {
    id: "pol-9",
    src: "/memories/couple/08-phong-guong-led.jpg",
    caption: "Lạc vào ngân hà ánh sáng cùng cô nhiếp ảnh gia của anh",
    dateTag: "Infinity Room",
  },
  {
    id: "pol-10",
    src: "/memories/saigon/photopalette/palette-09.jpg",
    caption: "Cô gái tuổi 19 rạng rỡ nhất trong khung trái tim hồng",
    dateTag: "Sinh nhật tuổi 19",
  },
];

export const saigonTripAlbums = [
  {
    id: "photopalette",
    num: "01",
    title: "Photo Palette Studio",
    subtitle: "Bó hoa tươi và khung bóng trái tim hồng",
    icon: "Heart",
    maskVariant: "hole",
    coverPhoto: "/memories/saigon/photopalette/palette-03.jpg",
    portalPhoto: "/memories/saigon/photopalette/palette-09.jpg",
    description:
      "Buổi chụp studio ngọt ngào tại Sài Gòn — nơi em ôm bó hoa tươi và nở nụ cười làm tan chảy trái tim anh.",
    photos: [
      { src: "/memories/saigon/photopalette/palette-01.jpg", caption: "Nụ cười lấp lánh bên bó hoa hồng phấn", shape: "arch" },
      { src: "/memories/saigon/photopalette/palette-02.jpg", caption: "Chu môi đáng yêu hết nấc", shape: "circle" },
      { src: "/memories/saigon/photopalette/palette-03.jpg", caption: "Khoảnh khắc rạng rỡ nhất của hai đứa", shape: "pill-right" },
      { src: "/memories/saigon/photopalette/palette-04.jpg", caption: "Tựa nhẹ vào vai nhau", shape: "soft-rect" },
      { src: "/memories/saigon/photopalette/palette-05.jpg", caption: "Nàng thơ ôm hoa dịu dàng", shape: "arch" },
      { src: "/memories/saigon/photopalette/palette-06.jpg", caption: "Ánh mắt ngập tràn hạnh phúc", shape: "pill-left" },
      { src: "/memories/saigon/photopalette/palette-07.jpg", caption: "Giấu mặt sau bó hoa thơm", shape: "circle" },
      { src: "/memories/saigon/photopalette/palette-08.jpg", caption: "Trong vòng tay trái tim", shape: "arch" },
      { src: "/memories/saigon/photopalette/palette-09.jpg", caption: "Chào tuổi 19 thật tươi!", shape: "soft-rect" },
      { src: "/memories/saigon/photopalette/palette-10.jpg", caption: "Công chúa nhỏ của anh Trung", shape: "arch" },
      { src: "/memories/saigon/photopalette/palette-11.jpg", caption: "Mỗi khung hình đều là thương nhớ", shape: "circle" },
      { src: "/memories/saigon/photopalette/palette-12.jpg", caption: "Trọn vẹn những phút giây bên em", shape: "pill-right" },
    ],
  },
  {
    id: "vangogh",
    num: "02",
    title: "Bảo Tàng Van Gogh",
    subtitle: "Cánh đồng ánh sáng và bầu trời đêm đầy sao",
    icon: "Sparkles",
    maskVariant: "curve",
    coverPhoto: "/memories/couple/07-canh-dong-anh-sang.jpg",
    portalPhoto: "/memories/saigon/vangogh/vangogh-04.jpg",
    description:
      "Cùng nhau bước vào thế giới hội họa ánh sáng kỳ ảo của Van Gogh, nơi em vừa là mẫu ảnh xinh đẹp nhất, vừa là nhiếp ảnh gia của riêng anh.",
    photos: [
      { src: "/memories/couple/07-canh-dong-anh-sang.jpg", caption: "Giữa cánh đồng lúa mạch vàng và những hành tinh", shape: "arch" },
      { src: "/memories/couple/08-phong-guong-led.jpg", caption: "Căn phòng gương đèn LED lung linh", shape: "circle" },
      { src: "/memories/saigon/vangogh/vangogh-04.jpg", caption: "Em bên bức tranh Đêm Đầy Sao (Starry Night)", shape: "pill-right" },
      { src: "/memories/saigon/vangogh/vangogh-06.jpg", caption: "Ngồi trên ghế gỗ giữa khung cảnh tranh vẽ", shape: "arch" },
      { src: "/memories/saigon/vangogh/vangogh-10.jpg", caption: "Cô nhiếp ảnh gia tác nghiệp trong căn phòng ánh sáng", shape: "soft-rect" },
      { src: "/memories/saigon/vangogh/vangogh-01.jpg", caption: "Ánh nhìn trầm tư qua ống kính của em", shape: "circle" },
      { src: "/memories/saigon/vangogh/vangogh-02.jpg", caption: "Khoảnh khắc hẹn hò bình yên", shape: "arch" },
      { src: "/memories/saigon/vangogh/vangogh-03.jpg", caption: "Không gian nghệ thuật rực rỡ sắc màu", shape: "pill-left" },
      { src: "/memories/saigon/vangogh/vangogh-05.jpg", caption: "Dạo bước giữa những mảng màu Van Gogh", shape: "soft-rect" },
      { src: "/memories/saigon/vangogh/vangogh-07.jpg", caption: "Ánh sáng chiếu rọi những kỷ niệm đẹp", shape: "arch" },
      { src: "/memories/saigon/vangogh/vangogh-08.jpg", caption: "Thế giới neon huyền ảo", shape: "circle" },
      { src: "/memories/saigon/vangogh/vangogh-11.jpg", caption: "Mỗi bước chân đều có hình bóng đôi mình", shape: "pill-right" },
    ],
  },
  {
    id: "metro",
    num: "03",
    title: "Ga Metro Sài Gòn",
    subtitle: "Những chuyến tàu và góc phố thành phố mang tên Bác",
    icon: "Train",
    maskVariant: "arch",
    coverPhoto: "/memories/saigon/metro/metro-em-01.jpg",
    portalPhoto: "/memories/saigon/metro/metro-05.jpg",
    description:
      "Chuyến đi anh Trung vào Sài Gòn thăm em — cùng nhau trải nghiệm tuyến Metro Bến Thành – Suối Tiên và ngắm nhìn thành phố lên đèn.",
    photos: [
      { src: "/memories/saigon/metro/metro-em-01.jpg", caption: "Cô gái nhỏ đợi tàu ở ga hướng Bến Xe Suối Tiên", shape: "arch" },
      { src: "/memories/saigon/metro/metro-em-03.jpg", caption: "Nụ cười ngọt ngào làm bừng sáng cả nhà ga", shape: "circle" },
      { src: "/memories/saigon/metro/metro-em-02.jpg", caption: "Dáng đứng đáng yêu trước ống kính của anh", shape: "pill-right" },
      { src: "/memories/saigon/metro/metro-em-04.jpg", caption: "Mỗi góc ở ga Metro đều thành studio của hai đứa", shape: "soft-rect" },
      { src: "/memories/saigon/metro/metro-02.jpg", caption: "Nhịp sống hối hả tại ga Bến Thành", shape: "arch" },
      { src: "/memories/saigon/metro/metro-05.jpg", caption: "Sài Gòn đêm lung linh dưới chân tháp Landmark 81", shape: "circle" },
      { src: "/memories/saigon/metro/metro-01.jpg", caption: "Hành trình khám phá Sài Gòn cùng em", shape: "pill-left" },
      { src: "/memories/saigon/metro/metro-03.jpg", caption: "Những bước chân song hành", shape: "arch" },
      { src: "/memories/saigon/metro/metro-04.jpg", caption: "Góc nhìn từ ống kính đôi mình", shape: "soft-rect" },
      { src: "/memories/saigon/metro/metro-06.jpg", caption: "Đêm Sài Gòn rực rỡ ánh đèn", shape: "circle" },
      { src: "/memories/saigon/metro/metro-07.jpg", caption: "Kỷ niệm chuyến đi không thể quên", shape: "arch" },
      { src: "/memories/saigon/metro/metro-08.jpg", caption: "Hẹn những chuyến tàu tiếp theo vẫn luôn có nhau", shape: "pill-right" },
    ],
  },
  {
    id: "thaocamvien",
    num: "04",
    title: "Thảo Cầm Viên",
    subtitle: "Buổi sáng xanh mát và bình yên giữa lòng Sài Gòn",
    icon: "Trees",
    maskVariant: "hole",
    coverPhoto: "/memories/saigon/thaocamvien/zoo-02.jpg",
    portalPhoto: "/memories/saigon/thaocamvien/zoo-09.jpg",
    description:
      "Tạm rời xa phố thị ồn ào để nắm tay nhau dạo bước dưới những tán cây cổ thụ xanh mát ở Thảo Cầm Viên Sài Gòn.",
    photos: [
      { src: "/memories/saigon/thaocamvien/zoo-02.jpg", caption: "Nắng sớm xuyên qua tán lá xanh tại Thảo Cầm Viên", shape: "arch" },
      { src: "/memories/saigon/thaocamvien/zoo-07.jpg", caption: "Khung cảnh thiên nhiên trong lành buổi sáng", shape: "circle" },
      { src: "/memories/saigon/thaocamvien/zoo-09.jpg", caption: "Chú hổ nằm ngủ nướng đáng yêu", shape: "pill-right" },
      { src: "/memories/saigon/thaocamvien/zoo-01.jpg", caption: "Dạo bước bình yên bên nhau", shape: "soft-rect" },
      { src: "/memories/saigon/thaocamvien/zoo-03.jpg", caption: "Những góc xanh dịu mát qua ống kính", shape: "arch" },
      { src: "/memories/saigon/thaocamvien/zoo-04.jpg", caption: "Buổi hẹn hò giản dị mà ngập tràn tiếng cười", shape: "circle" },
      { src: "/memories/saigon/thaocamvien/zoo-05.jpg", caption: "Ánh nắng vàng ươm trên từng nhành cây", shape: "pill-left" },
      { src: "/memories/saigon/thaocamvien/zoo-06.jpg", caption: "Cùng em khám phá mọi ngóc ngách Sài Gòn", shape: "arch" },
      { src: "/memories/saigon/thaocamvien/zoo-08.jpg", caption: "Một ngày thảnh thơi chỉ có hai đứa mình", shape: "soft-rect" },
      { src: "/memories/saigon/thaocamvien/zoo-10.jpg", caption: "Lưu giữ trọn vẹn thanh xuân bên em", shape: "arch" },
    ],
  },
];

// ----------------------------------------------------------------------------
// CHƯƠNG 5: BỨC THƯ TAY & THIỆP 3D LẬT MỞ
// ----------------------------------------------------------------------------
export const loveLetterContent = {
  greeting: "Gửi Lưu Nguyễn Bảo Hân — cô gái Bọ Cạp tháng 11 của anh! 💖♏",
  paragraphs: [
    "Chúc mừng sinh nhật tuổi 19 của em! 🎂✨ Vậy là cô gái nhỏ của anh lại đón thêm một tuổi mới thật là rực rỡ. Nhìn lại chặng đường đã qua thì anh rất là tự hào, vì thấy em không ngừng lớn lên, bản lĩnh hơn và tỏa sáng hơn theo cách riêng của mình. 🌟",
    "Tuổi 18 của em khép lại với rất nhiều kỷ niệm đáng nhớ 💫: từ những ngày nỗ lực học tập ở Đà Nẵng, sau đó là bước chân vô Western Sydney University — một ngôi trường đại học xịn xò tại Sài Gòn 🎓🏢. Tại đó là những ngày chạy show chụp ảnh không biết mệt mỏi cho @lop_thephotos 📸🎞️, tạo nên những bộ ảnh nghệ thuật đầy tâm huyết cho portfolio của mình; cho đến những công việc thực tập đầu tiên tại AEON, và cả việc em dạy IELTS cho mấy đứa nhỏ nữa 💼📚.",
    "Đôi lúc là bận rộn và vất vả lắm, nhưng mà lúc nào em cũng cười tươi, lúc nào em cũng đáng yêu hết trơn á 🥰🐰! Em rất là đam mê với công việc, và anh rất là yêu điều đó ở em. ❤️",
    "Cảm ơn em vì hành trình đẹp đó, và cũng là hành trình 1 năm yêu nhau thật hạnh phúc của hai đứa mình 💑🌷. Cảm ơn em những ngày ở Đà Nẵng, những ngày hẹn hò ở ga Metro Bến Thành 🚇, ở Bảo tàng Van Gogh 🌻✨, ở Thảo Cầm Viên 🐅🌿, và ở rất là nhiều địa điểm kỷ niệm khác nữa... Nói chung là, đây là một tình yêu rất là tuyệt vời, và anh không nghĩ là mình lại có một tình yêu đẹp và trọn vẹn đến như thế này! 💌🕊️",
    "Bước sang tuổi 19, anh chúc em sẽ có thật là nhiều sức khỏe 💪🌸, luôn giữ vững được ngọn lửa đam mê nhiếp ảnh 📷, đam mê kinh tế 📈, đam mê tâm lý 🧠 và phát huy trọn vẹn mọi tài năng của mình ✨. Chúc em sẽ thật thành công trên con đường sắp tới của mình nhé! 🎉🎁",
  ],
  signOff: "Yêu và thương em rất nhiều 💕,",
  signature: "Anh Trung 🐰❤️",
};

export const flipCardContent = {
  frontTitle: "Happy 19th Birthday",
  frontSubtitle: "Lưu Nguyễn Bảo Hân • 08.11.2007",
  frontPrompt: "Chạm vào thiệp để mở lời chúc cuối cùng",
  backTitle: "Tuổi 19 Rạng Rỡ Nhé Công Chúa Nhỏ!",
  backMessage:
    "Mong rằng mọi ngày trong tuổi 19 của Bảo Hân đều ngập tràn ánh nắng, tiếng cười và những khung hình thật đẹp. Hãy cứ tự tin bay cao với ước mơ của mình nhé — vì dù ở Đà Nẵng hay Sài Gòn, trái tim anh vẫn luôn hướng về em. Happy Birthday & Happy 1 Year Together!",
};


// ----------------------------------------------------------------------------
// NORMALIZED ALIAS EXPORTS FOR COMPONENT CONSUMPTION
// ----------------------------------------------------------------------------
export const heroProfile = {
  fullName: birthdayGirl.fullName,
  birthDate: birthdayGirl.birthDate,
  heroPhoto: birthdayGirl.heroPortrait,
  secondaryPhoto: birthdayGirl.avatar,
  typewriterLines: typewriterPhrases,
  socials: {
    portfolio: "https://luu-nguyen-bao-han.vercel.app/",
    instaMain: "https://www.instagram.com/lngbhan_/",
    instaSecondary: "https://www.instagram.com/bunii.817/",
    instaPhoto: "https://www.instagram.com/lop_thephotos/",
    linkedin: "https://www.linkedin.com/in/lngbhan0811/",
  },
};

// Lookup map for exact native dimensions from photoManifest.json (prevents any cropping)
const DIMENSION_LOOKUP = new Map();
Object.values(photoManifest.portfolio || {}).forEach((arr) =>
  arr.forEach((item) => DIMENSION_LOOKUP.set(item.src, item))
);
Object.values(photoManifest.saigon || {}).forEach((arr) =>
  arr.forEach((item) => DIMENSION_LOOKUP.set(item.src, item))
);
(photoManifest.couple || []).forEach((item) =>
  DIMENSION_LOOKUP.set(item.src, item)
);
// Special metro-em portraits (all 960x1280)
[
  "/memories/saigon/metro/metro-em-01.jpg",
  "/memories/saigon/metro/metro-em-02.jpg",
  "/memories/saigon/metro/metro-em-03.jpg",
  "/memories/saigon/metro/metro-em-04.jpg",
  "/memories/profile/avatar-baohan.jpg",
].forEach((src) => {
  if (!DIMENSION_LOOKUP.has(src)) {
    DIMENSION_LOOKUP.set(src, { src, width: 960, height: 1280, portrait: true });
  }
});

export function getPhotoMeta(src) {
  const found = DIMENSION_LOOKUP.get(src);
  if (found) return found;
  return { src, width: 1280, height: 853, portrait: false };
}

export const achievementsData = proudMilestones.map((m) => {
  const meta = getPhotoMeta(m.coverImage);
  return {
    id: m.id,
    tag: m.badge,
    title: m.title,
    subtitle: m.subtitle,
    description: m.description,
    highlights: m.highlights,
    image: m.coverImage,
    width: meta.width,
    height: meta.height,
    portrait: meta.portrait,
    stats: m.period,
    icon:
      m.icon === "GraduationCap"
        ? "graduation"
        : m.icon.toLowerCase(),
    link: m.link,
    linkLabel: m.linkLabel,
  };
});

// Curated best-first ordering for each of the 5 portfolio projects
const CURATED_PORTFOLIO_ORDER = {
  "cham-vao-di-san": [
    "/memories/portfolio/cham-vao-di-san/cham-vao-di-san-06.jpg",
    "/memories/portfolio/cham-vao-di-san/cham-vao-di-san-02.jpg",
    "/memories/portfolio/cham-vao-di-san/cham-vao-di-san-05.jpg",
    "/memories/portfolio/cham-vao-di-san/cham-vao-di-san-08.jpg",
    "/memories/portfolio/cham-vao-di-san/cham-vao-di-san-04.jpg",
    "/memories/portfolio/cham-vao-di-san/cham-vao-di-san-07.jpg",
    "/memories/portfolio/cham-vao-di-san/cham-vao-di-san-01.jpg",
    "/memories/portfolio/cham-vao-di-san/cham-vao-di-san-03.jpg",
  ],
  "co-em": [
    "/memories/portfolio/co-em/co-em-01.jpg",
    "/memories/portfolio/co-em/co-em-06.jpg",
    "/memories/portfolio/co-em/co-em-02.jpg",
    "/memories/portfolio/co-em/co-em-04.jpg",
    "/memories/portfolio/co-em/co-em-05.jpg",
    "/memories/portfolio/co-em/co-em-03.jpg",
    "/memories/portfolio/co-em/co-em-07.jpg",
  ],
  "mua-tro-ve": [
    "/memories/portfolio/mua-tro-ve/mua-tro-ve-04.jpg",
    "/memories/portfolio/mua-tro-ve/mua-tro-ve-06.jpg",
    "/memories/portfolio/mua-tro-ve/mua-tro-ve-05.jpg",
    "/memories/portfolio/mua-tro-ve/mua-tro-ve-07.jpg",
    "/memories/portfolio/mua-tro-ve/mua-tro-ve-08.jpg",
    "/memories/portfolio/mua-tro-ve/mua-tro-ve-02.jpg",
    "/memories/portfolio/mua-tro-ve/mua-tro-ve-01.jpg",
    "/memories/portfolio/mua-tro-ve/mua-tro-ve-03.jpg",
  ],
  "giot-nang-ben-them": [
    "/memories/portfolio/giot-nang/giot-nang-05.jpg",
    "/memories/portfolio/giot-nang/giot-nang-02.jpg",
    "/memories/portfolio/giot-nang/giot-nang-04.jpg",
    "/memories/portfolio/giot-nang/giot-nang-06.jpg",
    "/memories/portfolio/giot-nang/giot-nang-01.jpg",
    "/memories/portfolio/giot-nang/giot-nang-03.jpg",
  ],
  "cho-han-chut-tet": [
    "/memories/portfolio/cho-han/cho-han-04.jpg",
    "/memories/portfolio/cho-han/cho-han-07.jpg",
    "/memories/portfolio/cho-han/cho-han-08.jpg",
    "/memories/portfolio/cho-han/cho-han-05.jpg",
    "/memories/portfolio/cho-han/cho-han-06.jpg",
    "/memories/portfolio/cho-han/cho-han-02.jpg",
    "/memories/portfolio/cho-han/cho-han-03.jpg",
    "/memories/portfolio/cho-han/cho-han-01.jpg",
  ],
};

// Enrich portfolioHighlights items with code/year/desc aliases + full 39-photo galleries
const PORTFOLIO_SLUG_MAP = {
  "cham-vao-di-san": "cham-vao-di-san",
  "co-em": "co-em",
  "mua-tro-ve": "mua-tro-ve",
  "giot-nang-ben-them": "giot-nang",
  "cho-han-chut-tet": "cho-han",
};

portfolioHighlights.forEach((p) => {
  p.code = p.num;
  p.year = p.period;
  p.desc = p.quote;
  const slug = PORTFOLIO_SLUG_MAP[p.id];
  const rawList = photoManifest.portfolio?.[slug] || [];
  const preferredOrder = CURATED_PORTFOLIO_ORDER[p.id] || [];
  const sortedList = [...rawList].sort((a, b) => {
    const idxA = preferredOrder.indexOf(a.src);
    const idxB = preferredOrder.indexOf(b.src);
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  });

  if (sortedList[0]) {
    p.image = sortedList[0].src;
  }

  p.gallery = sortedList.map((img, i) => ({
    id: `${p.id}-img-${i + 1}`,
    src: img.src,
    width: img.width || 1280,
    height: img.height || 853,
    portrait: Boolean(img.portrait),
    projectId: p.id,
    projectCode: p.num,
    projectTitle: p.title,
    category: p.category,
    year: p.period,
    desc: p.quote,
    indexLabel: `${String(i + 1).padStart(2, '0')} / ${String(
      sortedList.length || 1
    ).padStart(2, '0')}`,
  }));
});

// Interleave the best artworks across all 5 projects so the horizontal reel starts with a diverse, jaw-dropping sequence
export const allPortfolioArtworks = (() => {
  const result = [];
  const maxLen = Math.max(
    ...portfolioHighlights.map((p) => p.gallery?.length || 0)
  );
  for (let round = 0; round < maxLen; round += 1) {
    for (const p of portfolioHighlights) {
      if (p.gallery?.[round]) {
        result.push(p.gallery[round]);
      }
    }
  }
  return result;
})();

const EXTRA_COUPLE_MEMORIES = [
  {
    id: "pol-11",
    src: "/memories/saigon/photopalette/palette-08.jpg",
    caption: "Công chúa tuổi 19 rạng rỡ trong khung bóng trái tim hồng",
    dateTag: "Photo Palette Studio",
  },
  {
    id: "pol-12",
    src: "/memories/saigon/metro/metro-em-01.jpg",
    caption: "Cô gái nhỏ đợi tàu ở ga Metro hướng Suối Tiên",
    dateTag: "Ga Metro Sài Gòn",
  },
  {
    id: "pol-13",
    src: "/memories/saigon/vangogh/vangogh-13.jpg",
    caption: "Nàng thơ bên bức tranh Đêm Đầy Sao (Starry Night)",
    dateTag: "Bảo tàng Van Gogh",
  },
  {
    id: "pol-14",
    src: "/memories/saigon/thaocamvien/zoo-12.jpg",
    caption: "Buổi sáng xanh mát ngồi ghế gỗ bên chú ngựa vằn Thảo Cầm Viên",
    dateTag: "Thảo Cầm Viên",
  },
  {
    id: "pol-15",
    src: "/memories/saigon/photopalette/palette-05.jpg",
    caption: "Ánh mắt dịu dàng bên bó hoa làm tan chảy trái tim anh",
    dateTag: "Kỷ niệm Sài Gòn",
  },
  {
    id: "pol-16",
    src: "/memories/saigon/vangogh/vangogh-16.jpg",
    caption: "Với tay chạm vào hành tinh xanh giữa cánh đồng lúa vàng",
    dateTag: "Van Gogh Art",
  },
];

const COUPLE_SHAPES = [
  "arch",
  "circle",
  "pill-right",
  "soft-rect",
  "arch",
  "pill-left",
  "circle",
  "arch",
  "soft-rect",
  "arch",
];

export const coupleMemories = [
  ...polaroidStackMemories,
  ...EXTRA_COUPLE_MEMORIES,
].map((item, idx) => {
  const meta = getPhotoMeta(item.src);
  return {
    id: item.id,
    src: item.src,
    width: meta.width,
    height: meta.height,
    portrait: meta.portrait,
    caption: item.caption,
    tag: item.dateTag,
    shape: COUPLE_SHAPES[idx % COUPLE_SHAPES.length],
  };
});

const SAIGON_DEFAULT_CAPTIONS = {
  photopalette: "Khoảnh khắc ngọt ngào tại Photo Palette Studio Sài Gòn",
  vangogh: "Dạo bước giữa không gian nghệ thuật ánh sáng Bảo tàng Van Gogh",
  metro: "Kỷ niệm chuyến tàu Metro Bến Thành – Suối Tiên cùng em",
  thaocamvien: "Buổi sáng bình yên dưới tán cây xanh Thảo Cầm Viên Sài Gòn",
};

// Hand-picked best photos per Saigon station so the horizontal reel and top of each station look flawless
const CURATED_SAIGON_STATION_LEADS = {
  photopalette: [
    {
      src: "/memories/saigon/photopalette/palette-03.jpg",
      caption: "Khoảnh khắc rạng rỡ nhất của hai đứa bên bó hoa hồng phấn",
    },
    {
      src: "/memories/saigon/photopalette/palette-08.jpg",
      caption: "Công chúa tuổi 19 tỏa sáng trong khung trái tim hồng",
    },
    {
      src: "/memories/saigon/photopalette/palette-05.jpg",
      caption: "Nàng thơ ôm bó hoa tươi dịu dàng hết nấc",
    },
    {
      src: "/memories/saigon/photopalette/palette-09.jpg",
      caption: "Chào tuổi 19 thật tươi trong vòng tay trái tim",
    },
    {
      src: "/memories/saigon/photopalette/palette-06.jpg",
      caption: "Ánh mắt trong veo ngập tràn niềm vui ngày kỷ niệm",
    },
    {
      src: "/memories/saigon/photopalette/palette-01.jpg",
      caption: "Nụ cười lấp lánh bên bó hoa tươi thắm anh tặng",
    },
    {
      src: "/memories/saigon/photopalette/palette-04.jpg",
      caption: "Cái nháy mắt tinh nghịch đáng yêu của cô Thỏ nhỏ",
    },
  ],
  vangogh: [
    {
      src: "/memories/couple/07-canh-dong-anh-sang.jpg",
      caption: "Đôi mình giữa cánh đồng lúa mạch vàng và những hành tinh",
    },
    {
      src: "/memories/saigon/vangogh/vangogh-13.jpg",
      caption: "Bảo Hân rạng rỡ bên kiệt tác Đêm Đầy Sao (Starry Night)",
    },
    {
      src: "/memories/saigon/vangogh/vangogh-11.jpg",
      caption: "Nàng thơ đứng cạnh bức chân dung tự họa của danh họa Van Gogh",
    },
    {
      src: "/memories/saigon/vangogh/vangogh-16.jpg",
      caption: "Em vươn tay chạm vào hành tinh xanh giữa biển lúa ánh sáng",
    },
    {
      src: "/memories/saigon/vangogh/vangogh-14.jpg",
      caption: "Giữa cánh đồng ánh sáng và bóng anh chụp hình cho em trong gương",
    },
    {
      src: "/memories/saigon/vangogh/vangogh-12.jpg",
      caption: "Ngắm nhìn bức tranh Hoa Hướng Dương rực rỡ sắc vàng",
    },
    {
      src: "/memories/couple/08-phong-guong-led.jpg",
      caption: "Lạc vào ngân hà đèn LED cùng cô nhiếp ảnh gia của anh",
    },
    {
      src: "/memories/saigon/vangogh/vangogh-20.jpg",
      caption: "Anh Trung chạm tay vào quả địa cầu phát sáng",
    },
  ],
  metro: [
    {
      src: "/memories/saigon/metro/metro-em-01.jpg",
      caption: "Cô gái nhỏ đợi tàu ở ga hướng Bến Xe Suối Tiên",
    },
    {
      src: "/memories/saigon/metro/metro-em-03.jpg",
      caption: "Nụ cười ngọt ngào làm bừng sáng cả nhà ga Metro",
    },
    {
      src: "/memories/saigon/metro/metro-em-02.jpg",
      caption: "Dáng đứng đáng yêu trước ống kính của anh",
    },
    {
      src: "/memories/saigon/metro/metro-em-04.jpg",
      caption: "Mỗi góc ở ga Metro đều thành studio của hai đứa",
    },
    {
      src: "/memories/saigon/metro/metro-05.jpg",
      caption: "Hào hứng check-in dưới biển hiệu tuyến Bến Thành – Suối Tiên",
    },
    {
      src: "/memories/saigon/metro/metro-01.jpg",
      caption: "Kỷ niệm trước biểu tượng đồng hồ nghệ thuật ga Bến Thành",
    },
    {
      src: "/memories/saigon/metro/metro-03.jpg",
      caption: "Anh Trung tại sảnh ga tàu điện ngầm Sài Gòn",
    },
    {
      src: "/memories/saigon/metro/metro-15.jpg",
      caption: "Sài Gòn đêm lung linh dưới chân tháp Landmark 81 tím biếc",
    },
  ],
  thaocamvien: [
    {
      src: "/memories/saigon/thaocamvien/zoo-12.jpg",
      caption: "Bảo Hân ngồi ghế gỗ dưới tán cây xanh mát Thảo Cầm Viên",
    },
    {
      src: "/memories/saigon/thaocamvien/zoo-09.jpg",
      caption: "Chú hổ nằm ngủ nướng bình yên trong Thảo Cầm Viên",
    },
    {
      src: "/memories/saigon/thaocamvien/zoo-02.jpg",
      caption: "Nắng sớm xuyên qua tán lá xanh mát giữa lòng Sài Gòn",
    },
    {
      src: "/memories/saigon/thaocamvien/zoo-16.jpg",
      caption: "Đàn linh dương dưới nắng sớm trong lành",
    },
    {
      src: "/memories/saigon/thaocamvien/zoo-07.jpg",
      caption: "Khung cảnh thiên nhiên xanh mướt buổi sáng hẹn hò",
    },
    {
      src: "/memories/saigon/thaocamvien/zoo-18.jpg",
      caption: "Nắng vàng rực rỡ xuyên qua khu vườn sinh thái",
    },
  ],
};

export const saigonChapters = saigonTripAlbums.map((album) => {
  const existingMap = new Map(album.photos.map((p) => [p.src, p.caption]));
  const manifestList = photoManifest.saigon?.[album.id] || [];
  const curatedLeads = CURATED_SAIGON_STATION_LEADS[album.id] || [];
  const leadSrcSet = new Set(curatedLeads.map((item) => item.src));

  const leadPhotos = curatedLeads.map((lead) => {
    const meta = getPhotoMeta(lead.src);
    return {
      src: lead.src,
      width: meta.width,
      height: meta.height,
      portrait: meta.portrait,
      caption: lead.caption,
    };
  });

  const remainingPhotos = manifestList
    .filter((m) => !leadSrcSet.has(m.src))
    .map((m, idx) => ({
      src: m.src,
      width: m.width || 1280,
      height: m.height || 853,
      portrait: Boolean(m.portrait),
      caption:
        existingMap.get(m.src) ||
        `${SAIGON_DEFAULT_CAPTIONS[album.id]} (#${String(
          leadPhotos.length + idx + 1
        ).padStart(2, "0")})`,
    }));

  const fullPhotos = [...leadPhotos, ...remainingPhotos];

  return {
    id: album.id,
    code: album.num,
    location: "Sài Gòn • Kỷ Niệm Đôi Mình",
    title: album.title,
    subtitle: album.subtitle,
    description: album.description,
    maskVariant: album.maskVariant,
    icon:
      album.id === "photopalette"
        ? "camera"
        : album.id === "vangogh"
        ? "palette"
        : album.id === "metro"
        ? "train"
        : "trees",
    photos: fullPhotos,
  };
});

export const loveLetter = {
  date: "08 / 11 / 2007 — 08 / 11 / 2026",
  recipient: "Gửi Lưu Nguyễn Bảo Hân",
  title: loveLetterContent.greeting,
  paragraphs: loveLetterContent.paragraphs,
  signOff: loveLetterContent.signOff,
  signature: loveLetterContent.signature,
};

export const events = [
  {
    id: 1,
    title: "Mengenal Next.js",
    category: "Study Group",
    status: "upcoming",
    event_date: "2026-06-09",
    description: "Kegiatan belajar bersama pengenalan Next.js untuk pengembangan web modern.",
    image: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"],
    icon: "fa-calendar"
  },
  {
    id: 2,
    title: "Company Visit Huawei Jakarta 2026",
    category: "Company Visit",
    status: "completed",
    event_date: "2026-06-09",
    description: "Kunjungan industri ke kantor pusat Huawei di Jakarta untuk melihat perkembangan teknologi telekomunikasi terbaru.",
    image: ["https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600"],
    icon: "fa-building"
  }
];

export const news = [
  {
    id: 1,
    title: "Pengumuman Rekrutmen Asisten Baru 2026",
    category: "Pengumuman",
    author: "Admin EIM",
    date: "2026-06-24",
    content: "Laboratorium EIM membuka kesempatan bagi mahasiswa untuk bergabung menjadi asisten laboratorium. Segera daftarkan diri Anda!",
    image: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"]
  }
];

export function getEventById(id) {
  return events.find(e => e.id === Number(id)) || null;
}

export function getNewsById(id) {
  return news.find(n => n.id === Number(id)) || null;
}

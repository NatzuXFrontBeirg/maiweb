// Kamus dua bahasa. String yang mengandung markup (mis. <em>) dirender
// lewat dangerouslySetInnerHTML di komponen terkait — semua nilainya
// statis dan ditulis di sini sendiri, jadi bukan celah XSS.
export const I18N = {
  skip: {
    id: "Lewati ke konten utama",
    en: "Skip to main content",
  },
  "nav.about": { id: "Tentang", en: "About" },
  "nav.pengalaman": { id: "Pengalaman", en: "Experience" },
  "nav.prestasi": { id: "Prestasi", en: "Achievements" },
  "nav.contact": { id: "Kontak", en: "Contact" },

  "hero.eyebrow": {
    id: "Portofolio &amp; Pengalaman Organisasi",
    en: "Portfolio &amp; Organizational Experience",
  },
  "hero.h1": { id: "Halo, saya <em>Abhi.</em>", en: "Hi, I&rsquo;m <em>Abhi.</em>" },
  "hero.chip1": { id: "Teknologi Kedokteran ITS", en: "Medical Technology, ITS" },
  "hero.chip2": { id: "Koordinator Sarpras", en: "Facilities Coordinator" },
  "hero.lead": {
    id: "Mahasiswa tahun pertama Teknologi Kedokteran di Institut Teknologi Sepuluh Nopember yang aktif, teliti, dan terbiasa bekerja di lapangan. Dua kali menjabat Koordinator Divisi Sarana dan Prasarana pada acara berskala provinsi — merencanakan kebutuhan, mengelola inventaris, mensurvei lokasi, mengoordinasi vendor, dan menangani kendala logistik di bawah tekanan acara.",
    en: "First-year Medical Technology student at Institut Teknologi Sepuluh Nopember — active, detail-oriented, and used to working on the ground. Twice served as Facilities &amp; Logistics Coordinator for province-scale events: planning requirements, managing inventory, surveying venues, coordinating vendors, and handling logistics issues under event pressure.",
  },
  "hero.btnExp": { id: "Lihat Pengalaman", en: "View Experience" },
  "hero.btnPdf": { id: "Simpan PDF", en: "Save as PDF" },
  "hero.stat1": { id: "Organisasi &amp; kepanitiaan", en: "Organizations &amp; committees" },
  "hero.stat2": { id: "Koordinator Sarpras", en: "Facilities Coordinator roles" },
  "hero.stat3": { id: "Kompetisi diikuti", en: "Competitions entered" },
  "hero.stat4": { id: "Kali juara / finalis", en: "Wins / finalist placements" },

  "profile.role": { id: "Logistik &amp; Sarana Prasarana", en: "Logistics &amp; Facilities" },
  "profile.status": { id: "Terbuka untuk kolaborasi kepanitiaan", en: "Open to committee collaborations" },
  "profile.label": { id: "Yang saya kuasai", en: "What I bring" },
  "profile.skill1": { id: "Manajemen logistik &amp; inventaris acara", en: "Event logistics &amp; inventory management" },
  "profile.skill2": { id: "Koordinasi tim lintas divisi", en: "Cross-division team coordination" },
  "profile.skill3": { id: "Problem-solving cepat di lapangan", en: "Fast on-site problem-solving" },

  "marquee.1": { id: "Manajemen Logistik", en: "Logistics Management" },
  "marquee.2": { id: "Perencanaan Pengadaan", en: "Procurement Planning" },
  "marquee.3": { id: "Koordinasi Tim", en: "Team Coordination" },
  "marquee.4": { id: "Problem Solving", en: "Problem Solving" },
  "marquee.5": { id: "Manajemen Waktu", en: "Time Management" },
  "marquee.6": { id: "Fotografi &amp; Videografi", en: "Photography &amp; Videography" },

  "about.eyebrow": { id: "Tentang Saya", en: "About Me" },
  "about.h2": { id: "Siap turun tangan langsung di lapangan", en: "Ready to work hands-on in the field" },
  "about.leadP": {
    id: "Saya percaya setiap acara berjalan lancar karena perencanaan yang matang dan kesiapan menghadapi kendala di lokasi.",
    en: "I believe every event runs smoothly because of solid planning and readiness to handle on-site issues.",
  },
  "about.p1": {
    id: "Dengan pendekatan yang teliti dan terbiasa bekerja langsung di lapangan, saya memastikan setiap kebutuhan perlengkapan dan logistik terpenuhi tepat waktu — dari survei awal, negosiasi vendor, sampai eksekusi di hari-H.",
    en: "With a meticulous, hands-on approach, I make sure every equipment and logistics need is met on time — from the initial site survey and vendor negotiation through to execution on event day.",
  },
  "about.eduLabel": { id: "Pendidikan", en: "Education" },
  "about.edu1": { id: "Teknologi Kedokteran · Surabaya", en: "Medical Technology · Surabaya" },
  "about.skillsLabel": { id: "Keahlian", en: "Skills" },

  "skill.1": { id: "Manajemen Logistik &amp; Inventaris", en: "Logistics &amp; Inventory Management" },
  "skill.2": { id: "Perencanaan &amp; Penjadwalan Pengadaan", en: "Procurement Planning &amp; Scheduling" },
  "skill.3": { id: "Koordinasi Tim", en: "Team Coordination" },
  "skill.4": { id: "Problem-Solving", en: "Problem-Solving" },
  "skill.5": { id: "Manajemen Waktu", en: "Time Management" },
  "skill.6": { id: "Fotografi &amp; Videografi", en: "Photography &amp; Videography" },

  "exp.h2": { id: "Organisasi &amp; kepanitiaan yang saya jalani", en: "Organizations &amp; committees I&rsquo;ve been part of" },
  "exp.date1": { id: "Mei 2026", en: "May 2026" },
  "exp.date2": { id: "Des 2024", en: "Dec 2024" },
  "exp.date3": { id: "Okt 2024", en: "Oct 2024" },
  "exp.date4": { id: "Agu 2023 – Mar 2025", en: "Aug 2023 – Mar 2025" },
  "exp.title1": { id: "Divisi Perlengkapan", en: "Equipment Division" },
  "exp.title2": { id: "Koordinator Sarana &amp; Prasarana", en: "Facilities &amp; Logistics Coordinator" },
  "exp.title4": { id: "Divisi Digital, Media &amp; Komunikasi", en: "Digital, Media &amp; Communications Division" },
  "exp.badge": { id: "Koordinator", en: "Coordinator" },
  "exp.desc1": {
    id: "Menyiapkan, menata, dan mengelola perlengkapan acara, serta merespons kebutuhan teknis secara cepat selama kegiatan berlangsung.",
    en: "Prepared, arranged, and managed event equipment, and responded quickly to technical needs while the event was running.",
  },
  "exp.desc2": {
    id: "Menyusun kebutuhan fasilitas pelatihan, mengelola aset kegiatan, dan menangani kendala logistik mendadak di lokasi.",
    en: "Planned training facility requirements, managed event assets, and handled sudden on-site logistics issues.",
  },
  "exp.desc3": {
    id: "Merencanakan kebutuhan perlengkapan lintas divisi, mengelola inventaris aset, dan menjadi penghubung utama dengan vendor eksternal.",
    en: "Planned cross-division equipment needs, managed asset inventory, and served as the main point of contact with external vendors.",
  },
  "exp.desc4": {
    id: "Memproduksi konten digital dan mendokumentasikan kegiatan organisasi riset ilmiah siswa melalui foto dan video.",
    en: "Produced digital content and documented a student scientific-research organization's activities through photo and video.",
  },
  "exp.tag1a": { id: "Equipment", en: "Equipment" },
  "exp.tag1b": { id: "Eksekusi Lapangan", en: "Field Execution" },
  "exp.tag2a": { id: "Fasilitas", en: "Facilities" },
  "exp.tag2b": { id: "Aset", en: "Assets" },
  "exp.tag2c": { id: "Troubleshooting", en: "Troubleshooting" },
  "exp.tag3a": { id: "Vendor", en: "Vendors" },
  "exp.tag3b": { id: "Inventaris", en: "Inventory" },
  "exp.tag3c": { id: "Lintas Divisi", en: "Cross-Division" },
  "exp.tag4a": { id: "Konten", en: "Content" },
  "exp.tag4b": { id: "Dokumentasi", en: "Documentation" },

  "ach.eyebrow": { id: "Prestasi &amp; Kompetisi", en: "Achievements &amp; Competitions" },
  "ach.h2": { id: "Beberapa pencapaian yang pernah saya raih", en: "A few achievements along the way" },
  "ach.rank1": { id: "Medali Emas", en: "Gold Medal" },
  "ach.rank2": { id: "Juara Harapan I", en: "1st Honorable Mention" },
  "ach.rank4": { id: "Finalis", en: "Finalist" },
  "ach.rank5": { id: "Peserta", en: "Participant" },

  "filter.all": { id: "Semua", en: "All" },
  "filter.national": { id: "Nasional", en: "National" },
  "filter.regional": { id: "Regional", en: "Regional" },

  "contact.eyebrow": { id: "Kontak", en: "Contact" },
  "contact.h2": { id: "Yuk, <em>bekerja sama.</em>", en: "Let&rsquo;s <em>work together.</em>" },
  "contact.lead": {
    id: "Tertarik mengajak saya bergabung dalam kepanitiaan atau ingin berdiskusi lebih lanjut? Silakan hubungi saya.",
    en: "Interested in inviting me to join a committee, or want to talk further? Feel free to reach out.",
  },
  "contact.btnWa": { id: "Chat WhatsApp", en: "Chat on WhatsApp" },
  "contact.btnMail": { id: "Kirim Email", en: "Send Email" },

  "form.label": { id: "Atau tulis pesan langsung", en: "Or write a message directly" },
  "form.name": { id: "Nama", en: "Name" },
  "form.subject": { id: "Subjek", en: "Subject" },
  "form.message": { id: "Pesan", en: "Message" },
  "form.hint": {
    id: "Tombol di bawah akan membuka aplikasi email kamu dengan pesan ini sudah terisi — tidak ada data yang disimpan di server mana pun.",
    en: "The button below opens your email app with this message pre-filled — no data is stored on any server.",
  },
  "form.submit": { id: "Kirim via Email", en: "Send via Email" },
  "form.errorRequired": {
    id: "Isi nama, subjek, dan pesan dulu ya.",
    en: "Please fill in name, subject, and message first.",
  },

  "footer.text": {
    id: "Dibuat dengan semangat belajar dan berkembang.",
    en: "Built with a drive to keep learning and growing.",
  },
  "footer.privacy": {
    id: "Tidak ada cookie pelacak atau analitik pihak ketiga di situs ini.",
    en: "No tracking cookies or third-party analytics on this site.",
  },

  "aria.themeLight": { id: "Ganti ke mode terang", en: "Switch to light mode" },
  "aria.themeDark": { id: "Ganti ke mode gelap", en: "Switch to dark mode" },
  "aria.menuOpen": { id: "Buka menu", en: "Open menu" },
  "aria.menuClose": { id: "Tutup menu", en: "Close menu" },
  "aria.toTop": { id: "Kembali ke atas", en: "Back to top" },
  "aria.langToId": { id: "Ganti ke Bahasa Indonesia", en: "Switch to Bahasa Indonesia" },
  "aria.langToEn": { id: "Switch to English", en: "Switch to English" },

  "toast.copied": { id: "Email disalin ✓", en: "Email copied ✓" },
  "toast.copyFail": { id: "Gagal menyalin — salin manual ya", en: "Couldn't copy — please copy it manually" },
  "toast.print": { id: "Pilih “Save as PDF” di dialog cetak", en: "Choose “Save as PDF” in the print dialog" },
  "toast.mailOpened": { id: "Membuka aplikasi email…", en: "Opening your email app…" },
};

export function translate(key, lang) {
  const entry = I18N[key];
  if (!entry) return "";
  return entry[lang] || entry.id || "";
}

# Portofolio Wibhu

Situs portofolio pribadi. Live di: https://portofolio-gray-seven.vercel.app

Dibangun dengan **React + Vite** dan objek 3D (react-three-fiber / three.js) di hero. Setiap kali ada perubahan di-*push* ke branch `main` di GitHub, Vercel otomatis **build** ulang (`vite build`) & deploy dalam sekitar satu menit — tidak perlu setting apa pun lagi.

## Development lokal

Butuh [Node.js](https://nodejs.org) (versi 18 ke atas).

```bash
npm install       # sekali saja, atau tiap kali package.json berubah
npm run dev       # server lokal dengan hot-reload — buka http://localhost:5173
npm run build     # build produksi ke folder dist/ (yang dijalankan Vercel)
npm run preview   # coba hasil build produksi secara lokal
```

## Cara update situs (commit + push)

### Cara termudah — lewat VSCode (klik-klik, tanpa ketik command)

1. Edit file yang relevan di `src/` (lihat "Struktur folder" di bawah).
2. Buka **Source Control** di sidebar kiri VSCode (ikon cabang/garpu), atau tekan `Ctrl+Shift+G`.
3. Kamu akan lihat daftar file yang berubah di bawah **"Changes"**. Klik ikon **+** di sebelah tulisan "Changes" (atau di tiap file) untuk **stage** semua perubahan.
4. Di kotak teks paling atas, tulis pesan singkat tentang perubahan yang kamu buat, misalnya: `update teks pengalaman`.
5. Klik tombol **✓ Commit** (atau `Ctrl+Enter`).
6. Klik tombol **Sync Changes** yang muncul setelah commit (ini yang benar-benar mengirim perubahan ke GitHub).
7. Selesai. Buka [dashboard Vercel](https://vercel.com/dashboard) → tab **Deployments** untuk lihat proses build & deploy-nya (biasanya kelar < 1 menit karena sekarang ada proses *build*, bukan langsung serve file statis seperti dulu).

### Cara lewat terminal (kalau lebih suka ketik command)

Buka terminal di VSCode (`` Ctrl+` ``), lalu jalankan:

```bash
git add .
git commit -m "pesan perubahan kamu di sini"
git push
```

## Troubleshooting

**Error: `! [rejected] main -> main (non-fast-forward)` atau `Updates were rejected`**
Artinya versi di GitHub lebih baru daripada versi lokal kamu (biasanya karena pernah edit langsung di web GitHub). Perbaiki dengan:
```bash
git pull origin main
```
Kalau muncul konflik, kabari saya — jangan asal pilih.

**Error: `GH007: Your push would publish a private email address`**
Email git kamu belum di-set ke email noreply GitHub. Cek dengan:
```bash
git config user.email
```
Harusnya menunjukkan `280013864+NatzuXFrontBeirg@users.noreply.github.com`. Kalau bukan itu, jalankan:
```bash
git config user.email "280013864+NatzuXFrontBeirg@users.noreply.github.com"
```

**Tombol "Sync Changes" tidak muncul / cuma ada "Commit"**
Berarti belum ada perubahan yang di-stage dan di-commit. Pastikan langkah 3–5 di atas sudah dilakukan dulu.

**Login GitHub diminta lagi**
Klik **Authorize**/**Sign in** di jendela browser yang terbuka, itu normal untuk push pertama kali per sesi.

**Build gagal di Vercel padahal jalan normal di `npm run dev`**
Jalankan `npm run build` secara lokal dulu — kalau ada error di situ, itu yang perlu diperbaiki (biasanya typo di JSX atau import yang salah path).

## Struktur folder

```
index.html          -> entry point Vite (hampir semuanya cuma <head> + <div id="root">)
vite.config.js       -> konfigurasi build
vercel.json          -> security headers (CSP dll) + konfigurasi build Vercel
styles.css            -> semua styling (termasuk dark/light mode, di-import dari src/main.jsx)

src/
  main.jsx            -> titik masuk React, render <App /> ke #root
  App.jsx              -> menyusun semua section jadi satu halaman
  components/          -> satu file per bagian UI (Nav, Hero, Hero3D, About, Timeline, dst.)
  hooks/                -> logic yang dipakai ulang (tema/bahasa, scroll-reveal, hitung mundur, dst.)
  data/                 -> kamus terjemahan (i18n.js) + data pengalaman & prestasi
                           (tambah pengalaman/prestasi baru = tambah satu entri di sini,
                           tidak perlu sentuh komponen)

public/                 -> file yang di-serve apa adanya (tidak diproses Vite):
  assets/fonts/          font self-hosted (tidak ada request ke Google Fonts)
  assets/og-image.png    gambar untuk preview link di WhatsApp/media sosial
  robots.txt, sitemap.xml, manifest.json, 404.html, theme-init.js
```

### Menambah pengalaman atau prestasi baru

Tidak perlu edit komponen React — tinggal tambah satu entri baru di:
- `src/data/timeline.js` untuk pengalaman organisasi
- `src/data/achievements.js` untuk prestasi/kompetisi

lalu tambahkan terjemahan ID/EN-nya (kalau ada teks baru) di `src/data/i18n.js`.

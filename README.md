# Portofolio Wibhu

Situs portofolio pribadi. Live di: https://portofolio-gray-seven.vercel.app

Setiap kali ada perubahan di-*push* ke branch `main` di GitHub, Vercel otomatis build & deploy ulang dalam beberapa detik — tidak perlu setting apa pun lagi.

## Cara update situs (commit + push)

### Cara termudah — lewat VSCode (klik-klik, tanpa ketik command)

1. Edit file apa saja (`index.html`, `styles.css`, `script.js`, dst).
2. Buka **Source Control** di sidebar kiri VSCode (ikon cabang/garpu), atau tekan `Ctrl+Shift+G`.
3. Kamu akan lihat daftar file yang berubah di bawah **"Changes"**. Klik ikon **+** di sebelah tulisan "Changes" (atau di tiap file) untuk **stage** semua perubahan.
4. Di kotak teks paling atas, tulis pesan singkat tentang perubahan yang kamu buat, misalnya: `update foto prestasi`.
5. Klik tombol **✓ Commit** (atau `Ctrl+Enter`).
6. Klik tombol **Sync Changes** yang muncul setelah commit (ini yang benar-benar mengirim perubahan ke GitHub).
7. Selesai. Buka [dashboard Vercel](https://vercel.com/dashboard) → tab **Deployments** untuk lihat proses deploy-nya (biasanya kelar < 30 detik).

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

## Struktur folder

```
index.html   -> struktur & konten halaman
styles.css   -> semua styling (termasuk dark/light mode)
script.js    -> logic slider Prestasi, deck-flip Pengalaman, toggle tema
assets/      -> taruh foto prestasi di sini (lihat assets/README.txt)
```

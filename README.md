# Mufradat Games
Media pembelajaran kosakata bahasa Arab berbasis web (HTML + CSS + JavaScript, tanpa build).
Fitur: 9 tema, 4 game (Catcher, Match, Word Search, Arrange), 3 level global (36 misi lulus ≥60 untuk membuka level berikutnya), skor, XP, bintang, progres tersimpan di browser.

## Jalankan lokal
Buka `index.html` di browser (atau `npx serve .`).

## Deploy (GitHub → Vercel)
1. Buat repository baru di GitHub, lalu upload semua file ini (atau `git init && git add . && git commit -m "init" && git push`).
2. Buka vercel.com → Add New → Project → Import repository tersebut.
3. Framework Preset: **Other**, Build Command & Output Directory dikosongkan → Deploy.

## Mengubah kosakata
Edit array `D` di bagian atas `app.js` (format: `arab berharakat|arti|emoji`, dipisah `;`).

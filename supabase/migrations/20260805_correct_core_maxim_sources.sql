-- VeriLex: koreksi substansi dan sumber enam maksim inti.
-- Jalankan sekali di Supabase SQL Editor. Migrasi ini tidak menghapus artikel;
-- ia mengganti dasar hukum yang tidak presisi dan mengosongkan yurisprudensi
-- yang belum memiliki tautan putusan resmi spesifik.

begin;

-- 1. Lex posterior: UU 12/2011 penting untuk sistem peraturan, tetapi Pasal 63
-- bukan kodifikasi langsung asas lex posterior.
update public.maxims
set
  legal_meaning = 'Lex Posterior Derogat Legi Priori berarti peraturan yang lebih baru dapat mengesampingkan peraturan yang lebih lama apabila keduanya sederajat, mengatur materi yang sama, dan terdapat pertentangan yang tidak dapat didamaikan. Asas ini adalah asas penyelesaian konflik norma dalam doktrin, bukan rumusan tunggal yang dikodifikasi oleh Pasal 63 UU Nomor 12 Tahun 2011.',
  data = jsonb_set(
    jsonb_set(coalesce(data, '{}'::jsonb), '{legalBasisTable}', $$[
      {"statute":"UU Nomor 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-Undangan sebagaimana diubah terakhir dengan UU Nomor 13 Tahun 2022","article":"Pasal 7","relevance":"Menjadi rujukan hierarki peraturan. Lex posterior baru dipertimbangkan setelah norma yang dibandingkan berada pada tingkat yang setara."},
      {"statute":"UU Nomor 1 Tahun 2023 tentang KUHP","article":"Pasal 1","relevance":"Dalam hukum pidana, perubahan aturan pidana harus dibaca bersama asas legalitas dan ketentuan peralihan; lex posterior tidak boleh dipakai secara sederhana untuk merugikan pelaku secara retroaktif."}
    ]$$::jsonb, true),
    '{jurisprudence}', '[]'::jsonb, true
  ),
  version_number = coalesce(version_number, 1) + 1,
  updated_at = now()
where id = 'lex-posterior';

-- 2. Lex specialis: Pasal 103 KUHP lama adalah contoh historis; jangan
-- menyatakan Pasal 63 UU 12/2011 sebagai dasar langsung.
update public.maxims
set
  legal_meaning = 'Lex Specialis Derogat Legi Generali berarti ketentuan yang lebih khusus didahulukan daripada ketentuan yang lebih umum apabila keduanya berlaku pada subjek atau peristiwa yang sama. Penerapannya tetap bergantung pada ruang lingkup, tujuan pembentuk undang-undang, dan tidak adanya pencabutan tegas oleh ketentuan yang kemudian.',
  data = jsonb_set(
    jsonb_set(coalesce(data, '{}'::jsonb), '{legalBasisTable}', $$[
      {"statute":"UU Nomor 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-Undangan sebagaimana diubah terakhir dengan UU Nomor 13 Tahun 2022","article":"Pasal 7","relevance":"Menentukan hierarki peraturan; asas lex specialis bekerja pada norma yang sederajat dan relevan."},
      {"statute":"Kitab Undang-Undang Hukum Pidana lama","article":"Pasal 103 (rujukan historis)","relevance":"Menunjukkan pola pengakuan bahwa ketentuan pidana dalam undang-undang khusus dapat menyimpang dari aturan umum KUHP. Untuk perkara setelah berlakunya KUHP nasional, rujukan harus disesuaikan dengan UU Nomor 1 Tahun 2023 dan undang-undang khusus terkait."}
    ]$$::jsonb, true),
    '{jurisprudence}', '[]'::jsonb, true
  ),
  version_number = coalesce(version_number, 1) + 1,
  updated_at = now()
where id = 'lex-specialis';

-- 3. Nullum crimen: per 2 Januari 2026 dasar utama harus KUHP nasional.
update public.maxims
set
  data = jsonb_set(
    jsonb_set(coalesce(data, '{}'::jsonb), '{legalBasisTable}', $$[
      {"statute":"UU Nomor 1 Tahun 2023 tentang Kitab Undang-Undang Hukum Pidana","article":"Pasal 1 ayat (1)","relevance":"Tidak ada satu perbuatan pun yang dapat dikenai sanksi pidana dan/atau tindakan kecuali atas kekuatan peraturan pidana dalam peraturan perundang-undangan yang telah ada sebelum perbuatan dilakukan."},
      {"statute":"UUD NRI Tahun 1945","article":"Pasal 28I ayat (1)","relevance":"Menjamin hak untuk tidak dituntut berdasarkan hukum yang berlaku surut sebagai hak asasi yang tidak dapat dikurangi dalam keadaan apa pun."},
      {"statute":"UU Nomor 12 Tahun 2005 tentang Pengesahan ICCPR","article":"Pasal 15 ICCPR","relevance":"Melarang pemidanaan atas perbuatan yang pada saat dilakukan bukan tindak pidana menurut hukum nasional atau internasional."}
    ]$$::jsonb, true),
    '{jurisprudence}', '[]'::jsonb, true
  ),
  version_number = coalesce(version_number, 1) + 1,
  updated_at = now()
where id = 'nullum-crimen';

-- 4. In dubio pro reo: asas pembuktian; tidak diklaim sebagai pasal mandiri.
update public.maxims
set
  data = jsonb_set(
    jsonb_set(coalesce(data, '{}'::jsonb), '{legalBasisTable}', $$[
      {"statute":"UUD NRI Tahun 1945","article":"Pasal 28D ayat (1)","relevance":"Jaminan kepastian hukum yang adil menjadi landasan konstitusional perlindungan terhadap pemidanaan tanpa pembuktian yang meyakinkan."},
      {"statute":"UU Nomor 12 Tahun 2005 tentang Pengesahan ICCPR","article":"Pasal 14 ayat (2) ICCPR","relevance":"Setiap orang yang dituduh melakukan tindak pidana berhak dianggap tidak bersalah sampai kesalahannya dibuktikan menurut hukum."},
      {"statute":"KUHAP yang berlaku","article":"ketentuan pembuktian dan putusan bebas","relevance":"In dubio pro reo merupakan asas doktrinal yang diterapkan melalui standar pembuktian dan putusan bebas; nomor pasal harus disesuaikan dengan KUHAP yang berlaku pada saat perkara diperiksa."}
    ]$$::jsonb, true),
    '{jurisprudence}', '[]'::jsonb, true
  ),
  version_number = coalesce(version_number, 1) + 1,
  updated_at = now()
where id = 'in-dubio-pro-reo';

-- 5. Pacta sunt servanda: tegaskan syarat sah dan batas itikad baik.
update public.maxims
set
  data = jsonb_set(
    coalesce(data, '{}'::jsonb), '{legalBasisTable}', $$[
      {"statute":"Kitab Undang-Undang Hukum Perdata","article":"Pasal 1320","relevance":"Menetapkan syarat sah perjanjian: kesepakatan, kecakapan, hal tertentu, dan sebab yang halal."},
      {"statute":"Kitab Undang-Undang Hukum Perdata","article":"Pasal 1338 ayat (1), (2), dan (3)","relevance":"Perjanjian yang dibuat secara sah berlaku sebagai undang-undang bagi para pihak, tidak dapat ditarik kembali secara sepihak kecuali menurut hukum atau kesepakatan, dan wajib dilaksanakan dengan itikad baik."}
    ]$$::jsonb, true
  ),
  version_number = coalesce(version_number, 1) + 1,
  updated_at = now()
where id = 'pacta-sunt-servanda';

-- 6. Audiatur et altera pars: hapus salah rujuk Pasal 50 dan 154 KUHAP lama.
update public.maxims
set
  data = jsonb_set(
    jsonb_set(coalesce(data, '{}'::jsonb), '{legalBasisTable}', $$[
      {"statute":"UUD NRI Tahun 1945","article":"Pasal 28D ayat (1)","relevance":"Jaminan pengakuan, perlindungan, kepastian hukum yang adil, dan perlakuan yang sama di hadapan hukum."},
      {"statute":"UU Nomor 12 Tahun 2005 tentang Pengesahan ICCPR","article":"Pasal 14 ayat (1) dan ayat (3) ICCPR","relevance":"Menjamin pemeriksaan yang adil, kesempatan mempersiapkan pembelaan, dan hak membela diri melalui bantuan hukum."},
      {"statute":"KUHAP yang berlaku","article":"ketentuan hak tersangka/terdakwa, pemeriksaan, dan pembelaan","relevance":"Rujukan harus menggunakan nomor pasal KUHAP yang berlaku saat perkara diperiksa. Jangan menyatakan Pasal 50 KUHAP lama sebagai dasar hak bantuan hukum sejak penangkapan atau penahanan; rujukan lama yang lazim untuk hak tersebut adalah Pasal 54."}
    ]$$::jsonb, true),
    '{jurisprudence}', '[]'::jsonb, true
  ),
  version_number = coalesce(version_number, 1) + 1,
  updated_at = now()
where id = 'audiatur-et-altera-pars';

commit;

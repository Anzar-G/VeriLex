import type { Maxim, LegalFieldMeta, QuizQuestion, UserProgress } from '@/types';
import { newMaxims200 } from './maxims200';

// ─────────────────────────────────────────
// Legal Fields Metadata
// ─────────────────────────────────────────

export const legalFields: LegalFieldMeta[] = [
  { id: 'umum', label: 'Asas Umum & Penafsiran', count: 20, description: 'Asas Umum & Penafsiran Hukum' },
  { id: 'pidana', label: 'Hukum Pidana & Acara Pidana', count: 43, description: 'Hukum Pidana & Acara Pidana' },
  { id: 'perdata', label: 'Hukum Perdata & Kontrak', count: 51, description: 'Hukum Perdata & Kontrak' },
  { id: 'properti', label: 'Hak Milik & Benda', count: 15, description: 'Hak Milik & Benda (Property Law)' },
  { id: 'keluarga', label: 'Waris & Keluarga', count: 15, description: 'Waris & Keluarga (Succession & Family Law)' },
  { id: 'bisnis', label: 'Hukum Dagang & Korporasi', count: 15, description: 'Hukum Dagang & Korporasi' },
  { id: 'internasional', label: 'Hukum Internasional & HAM', count: 23, description: 'Hukum Internasional & HAM' },
  { id: 'tata-negara', label: 'Hukum Administrasi & Tata Negara', count: 27, description: 'Hukum Administrasi & Tata Negara' },
  { id: 'acara', label: 'Hukum Acara Perdata & Pembuktian', count: 15, description: 'Hukum Acara Perdata & Pembuktian' },
  { id: 'lain-lain', label: 'Maksim Lain-Lain & Filosofis', count: 50, description: 'Maksim Lain-Lain & Filosofis' },
  { id: 'administrasi', label: 'Hukum Administrasi', count: 14, description: 'Maksim yang berkaitan dengan hukum administrasi negara' }
];

// ─────────────────────────────────────────
// Mock Maxims Data
// ─────────────────────────────────────────

export const mockMaxims: Maxim[] = [
  ...newMaxims200,
  {
    id: 'lex-posterior',
    latinPhrase: 'Lex Posterior Derogat Legi Priori',
    indonesianMeaning: 'Asas bahwa peraturan perundang-undangan yang baru mengesampingkan peraturan yang lama jika keduanya setingkat dan bertentangan',
    literalTranslation: 'Undang-undang yang belakangan menghapuskan undang-undang yang terdahulu',
    pronunciationGuide: '/lɛks pɔsˈtɛri.ɔr dɛˈro.ɡat ˈle.ɡi pri.ˈo.ri/',
    legalFields: ['tata-negara', 'administrasi'],
    synonyms: ['Asas hukum baru mengesampingkan hukum lama'],
    usedIn: ['Indonesia', 'Belanda', 'Jerman', 'Prancis'],
    classification: {
      legalBranch: 'Hukum Tata Negara dan Ilmu Perundang-Undangan',
      nature: 'Imperatif',
      applicationLevel: 'Nasional',
      traditionSource: 'Hukum Romawi Kuno dan Corpus Juris Civilis',
    },
    applicabilityStatus: {
      validInIndonesia: true,
      validInternationally: true,
      recognizedByDoctrine: true,
      codified: true,
      notes: 'Dikodifikasi dalam UU No. 12 Tahun 2011 jo. UU No. 13 Tahun 2022',
    },
    legalMeaning: `Lex Posterior Derogat Legi Priori adalah sebuah maksim hukum Latin yang berarti "undang-undang yang belakangan mengesampingkan undang-undang yang terdahulu." Asas ini berfungsi sebagai mekanisme logis dan yuridis untuk menyelesaikan konflik norma (norm conflict) yang terjadi ketika dua atau lebih peraturan perundang-undangan yang setingkat mengatur objek materiil yang sama tetapi dengan ketentuan yang berbeda atau bertentangan. Dalam dinamika kehidupan bernegara, kebutuhan akan pembaruan hukum adalah hal yang niscaya seiring dengan perubahan sosial, ekonomi, dan politik.

Fungsi utama dari asas ini adalah menjamin kepastian hukum (legal certainty) dan kesatuan hukum (unity of law). Tanpa adanya asas ini, masyarakat dan penegak hukum akan dihadapkan pada kebingungan akibat berlakunya dua norma yang saling bertolak belakang secara bersamaan. Dengan menerapkan asas Lex Posterior, sistem hukum memberikan kepastian bahwa kehendak legislator yang paling mutakhir adalah kehendak yang harus ditaati, dengan asumsi bahwa legislator tersebut memiliki pengetahuan yang lebih lengkap mengenai kondisi terkini dibandingkan saat menerbitkan peraturan sebelumnya.

Ruang lingkup penerapan asas ini terbatas pada peraturan perundang-undangan yang memiliki tingkatan hierarki yang sama. Jika terjadi konflik antara peraturan yang berbeda tingkatan (misalnya Undang-Undang dengan Peraturan Pemerintah), maka asas Lex Superior Derogat Legi Inferiori yang berlaku, bukan Lex Posterior. Demikian pula, jika terjadi konflik antara aturan umum dan aturan khusus yang setingkat, asas Lex Specialis Derogat Legi Generali mungkin lebih diutamakan tergantung pada konteks penafsiran.`,
    wordByWord: [
      { word: 'Lex', meaning: 'Undang-undang, hukum, peraturan' },
      { word: 'Posterior', meaning: 'Yang datang kemudian, yang belakangan' },
      { word: 'Derogat', meaning: 'Mengurangi, membatalkan sebagian, mengesampingkan' },
      { word: 'Legi', meaning: 'Kepada/Dari undang-undang' },
      { word: 'Priori', meaning: 'Yang terdahulu, yang pertama' },
    ],
    wordByWordExtended: [
      { word: 'Lex', latinForm: 'Lex, Legis (f)', partOfSpeech: 'Nomina', meaning: 'Undang-undang, hukum, peraturan' },
      { word: 'Posterior', latinForm: 'Posterus, -a, -um', partOfSpeech: 'Adjektiva (Komparatif)', meaning: 'Yang datang kemudian, yang belakangan' },
      { word: 'Derogat', latinForm: 'Derogare (verba)', partOfSpeech: 'Verba (Indikatif Aktif)', meaning: 'Mengurangi, membatalkan sebagian, mengesampingkan' },
      { word: 'Legi', latinForm: 'Lex, Legis (f)', partOfSpeech: 'Nomina (Ablatif)', meaning: 'Kepada/Dari undang-undang' },
      { word: 'Priori', latinForm: 'Prior, -us', partOfSpeech: 'Adjektiva (Ablatif)', meaning: 'Yang terdahulu, yang pertama' },
    ],
    etymologyNotes: 'Kalimat ini menggunakan struktur subjek-predikat-keterangan. Lex Posterior bertindak sebagai subjek ("Undang-undang yang belakangan"). Derogat adalah predikat ("mengesampingkan"). Legi Priori berada dalam kasus Ablatif, yang menunjukkan dari apa sesuatu itu dicabut atau dipisahkan, yaitu "dari undang-undang yang terdahulu".',
    philosophicalMeaning: {
      origin: 'Asas Lex Posterior muncul dari kebutuhan dasar manusia akan ketertiban dan adaptabilitas hukum. Dalam filsafat hukum, asas ini mencerminkan kedaulatan kehendak legislator terkini, kepastian hukum dinamis, dan presumsi pengetahuan yang lebih baik.',
      justiceValue: 'Demokrasi modern berasumsi bahwa perwakilan rakyat saat ini adalah cerminan dari kehendak rakyat saat ini. Secara demokratis, aturan baru dianggap sebagai ekspresi kehendak rakyat yang lebih aktual.',
      romanThought: 'Tidak secara spesifik dijabarkan dalam teks ini, namun sejarah Romawi menunjukkan kepatuhan terhadap legislasi terbaru.',
      modernRelevance: 'Kepastian hukum memerlukan mekanisme jelas untuk mengubah hukum. Asas Lex Posterior memberikan kepastian tentang kapan dan bagaimana perubahan itu berlaku, dengan presumsi legislator telah mempertimbangkan aturan lama.',
    },
    history: `Sejarah asas ini dapat ditelusuri melalui tahapan dari Romawi Kuno hingga sistem hukum Indonesia modern.`,
    historyTimeline: [
      { era: 'Romawi Kuno', period: 'Romawi Kuno', description: 'Konsep dasar bahwa kehendak penguasa yang terbaru mengesampingkan kehendak sebelumnya sudah dikenal. Prinsip "Novissima constitutio posteriores priores contrarias abrogat" mulai berkembang.' },
      { era: 'Corpus Juris Civilis', period: 'Abad ke-6 M', description: 'Justinianus I dalam Codex Justinianus mengkodifikasi prinsip hukum Romawi. Semangat bahwa undang-undang imperial yang baru mengalahkan yang lama sudah menjadi bagian integral.' },
      { era: 'Eropa Kontinental', period: 'Abad Pertengahan', description: 'Para glossator dan komentator hukum Romawi di universitas Eropa mengembangkan doktrin ini lebih lanjut, menjadi pilar Ius Commune.' },
      { era: 'Indonesia', period: 'Pasca Kemerdekaan', description: 'Setelah kemerdekaan, asas ini terus hidup dalam praktik ketatanegaraan. Puncaknya melalui UU No. 10 Tahun 2004, UU No. 12 Tahun 2011 dan UU No. 13 Tahun 2022.' },
    ],
    doctrineDevelopment: [
      { era: 'Doktrin Klasik', description: 'Awalnya diterapkan secara kaku. Setiap undang-undang baru yang bertentangan dengan undang-undang lama otomatis membatalkan undang-undang lama.' },
      { era: 'Doktrin Presumptive Implied Repeal', description: 'Membedakan pencabutan eksplisit dan implisit. Pencabutan implisit terjadi jika pertentangan tidak mungkin didamaikan (irreconcilable conflict).' },
      { era: 'Doktrin Hierarkis-Kronologis', description: 'Menempatkan Lex Posterior subordinat terhadap Lex Superior. Undang-undang baru yang lebih rendah tidak bisa membatalkan undang-undang lama yang lebih tinggi.' },
    ],
    elements: [
      'Adanya Dua Peraturan Perundang-Undangan: Harus ada minimal dua norma hukum tertulis.',
      'Tingkatan Hierarki yang Sama: Kedua peraturan tersebut harus memiliki kedudukan yang setara.',
      'Objek Materiil yang Sama: Mengatur persoalan hukum yang identik.',
      'Adanya Pertentangan Norma: Isi saling bertentangan, tidak mungkin dilaksanakan bersamaan.',
      'Kronologi Waktu yang Jelas: Dapat ditentukan pasti mana peraturan yang lebih dahulu dan belakangan.',
    ],
    conditions: [
      'Kesetaraan Hierarki: Peraturan baru dan lama harus dari lembaga setara. Jika tidak, berlaku Lex Superior.',
      'Pertentangan yang Tidak Dapat Didamaikan: Kedua norma tidak dapat dibaca serempak tanpa kontradiksi.',
      'Keabsahan Formal Peraturan Baru: Peraturan baru dibentuk melalui prosedur sah dan diundangkan.',
    ],
    exceptions: [
      'Jika Peraturan Lama Memiliki Sifat Khusus (Lex Specialis).',
      'Jika Peraturan Baru Bertentangan dengan UUD 1945.',
      'Jika Ada Klausul Transisi yang menyatakan aturan lama tetap berlaku.',
    ],
    scope: {
      applies: [
        'Konflik antar Undang-Undang (UU)',
        'Konflik antar Peraturan Pemerintah (PP)',
        'Konflik antar Peraturan Presiden (Perpres)',
        'Konflik antar Peraturan Daerah (Perda) setingkat',
      ],
      doesNotApply: [
        'Konflik antara UU dengan PP (berlaku Lex Superior)',
        'Konflik antara UU dengan UUD 1945',
        'Kasus pidana yang merugikan terdakwa jika diterapkan surut',
      ],
    },
    legalBasisTable: [
      { statute: 'UU No. 12 Tahun 2011 (jo. UU No. 13/2022)', article: 'Pasal 63 ayat (2)', relevance: 'Dalam hal terjadi ketidaksesuaian antara Peraturan Perundang-Undangan yang setingkat, maka yang berlaku adalah yang terbaru.' },
      { statute: 'UU No. 12 Tahun 2011 (jo. UU No. 13/2022)', article: 'Pasal 63 ayat (1)', relevance: 'Menyatakan bahwa berlaku Lex Superior dalam konflik beda tingkat.' },
      { statute: 'KUHP', article: 'Pasal 1 ayat (1)', relevance: 'Membatasi penerapan Lex Posterior yang berlaku surut dalam hukum pidana.' },
    ],
    indonesianLegalBasis: '',
    indonesianSystemRelation: `Bagi Hakim: Alat bantu penafsiran ketika menghadapi gugatan atau sengketa yang melibatkan dua peraturan yang bertentangan.
Bagi Pembentuk Undang-Undang: Digunakan sebagai panduan teknis penyusunan. Wajib melakukan harmonisasi dan mencantumkan pasal pencabutan jika bermaksud menggantikan UU lama.
Bagi Akademisi: Asas ini menjadi objek kajian ilmu perundang-undangan.`,
    normativeExamples: [
      'Undang-Undang: UU No. 12 Tahun 2011 mencabut berlakunya UU No. 10 Tahun 2004.',
      'Peraturan Pemerintah: PP No. 22 Tahun 2018 menggantikan PP No. 27 Tahun 2012. Ketentuan dalam PP 27/2012 yang bertentangan menjadi tidak berlaku.',
      'Peraturan Menteri: PMK tentang tarif bea masuk tahun 2023 mengesampingkan PMK tahun 2020.',
    ],
    practicalExamples: [
      'Penerapan Tarif Pajak: KPP langsung menerapkan aturan KUP baru untuk tahun pajak berjalan, mengabaikan formulir atau prosedur lama.',
      'Prosedur Perizinan Berusaha: Dengan terbitnya UU No. 11/2020 (Cipta Kerja) yang mengubah UU sektoral, izin disesuaikan aturan baru.',
      'Hukum Acara Pengadilan: PERMA beracara elektronik baru menggantikan PERMA lama, seluruh aparatur wajib mengikuti prosedur baru.',
    ],
    jurisprudence: [
      { id: 'mk-55-2010', courtName: 'Mahkamah Konstitusi', caseNumber: 'No. 55/PUU-VIII/2010', year: 2011, context: 'Pengujian UU terkait kewenangan MK', summary: 'Pengujian UU terkait kewenangan MK.', excerpt: 'Setiap UU yang bertentangan dengannya [UUD], apapun tahunnya, dapat dibatalkan.', analysis: 'Menegaskan batasan Lex Posterior oleh Lex Superior (UUD).', sourceUrl: 'https://www.mkri.id' },
      { id: 'ma-45-2018', courtName: 'Mahkamah Agung', caseNumber: 'No. 45/P/HUM/2018', year: 2018, context: 'Uji Materiil Peraturan Menteri terhadap UU', summary: 'Uji Materiil Peraturan Menteri terhadap UU.', excerpt: 'Batal Peraturan Menteri yang bertentangan dengan UU yang lebih tinggi, meskipun Permen tersebut lebih baru.', analysis: 'Menguatkan bahwa Lex Posterior tidak berlaku jika hierarki berbeda.', sourceUrl: 'https://www.mahkamahagung.go.id' },
    ],
    internationalComparisons: [
      { country: 'Belanda', status: 'Dikenal', description: 'Prinsip "De latere wet gaat voor de vroegere" dalam ABW Belanda. Diterapkan ketat, namun menghargai Lex Specialis.' },
      { country: 'Jerman', status: 'Dikenal', description: 'Asas "Lex posterior derogat legi priori". Menekankan pada "Willens des Gesetzgebers" (kehendak pembuat undang-undang).' },
      { country: 'Prancis', status: 'Dikenal', description: 'Prinsip "La loi nouvelle déroge à la loi ancienne". Sangat kuat, diimbangi prinsip non-retroaktivitas.' },
      { country: 'Inggris', status: 'Dikenal Sebagian', description: 'Tidak dikenal kaku karena stare decisis, namun statuta mengenal "Implied Repeal".' },
      { country: 'Amerika Serikat', status: 'Dikenal Sebagian', description: 'Berlaku antar statuta federal, kompleks dengan interaksi hukum negara bagian.' },
    ],
    maximComparisons: [
      { maximId: 'lex-superior', latinPhrase: 'Lex Superior Derogat Legi Inferiori', whenUsed: 'Terjadi konflik antara peraturan yang berbeda tingkatan.' },
      { maximId: 'lex-specialis', latinPhrase: 'Lex Specialis Derogat Legi Generali', whenUsed: 'Terjadi konflik antara aturan umum dan aturan khusus.' },
      { maximId: 'lex-posterior', latinPhrase: 'Lex Posterior Derogat Legi Priori', whenUsed: 'Terjadi konflik antara peraturan yang setingkat.' },
    ],
    analysis: {
      purpose: 'Menciptakan dinamika hukum yang responsif terhadap perubahan sosial tanpa mengorbankan kepastian hukum.',
      protectedValues: 'Kepastian hukum, kepastian kehendak legislator terkini, dan efisiensi administrasi negara.',
      advantages: 'Sederhana, objektif (berbasis tanggal), dan mudah diaplikasikan oleh birokrat dan hakim.',
      critique: 'Sering kali mengabaikan kualitas substansi hukum. Hukum baru belum tentu lebih baik. Dapat menyebabkan instabilitas.',
      limitations: 'Tidak efektif jika tidak disertai dengan sosialisasi yang baik. Masyarakat sering tidak sadar aturan terganti.',
    },
    scholarViews: [
      { name: 'Prof. Dr. Jimly Asshiddiqie', view: 'Lex Posterior adalah salah satu asas penting dalam penyelesaian konflik norma, namun harus selalu ditempatkan dalam koridor hierarki peraturan perundang-undangan yang tertib.', source: 'Ilmu Perundang-Undangan' },
      { name: 'Prof. Dr. Maria Farida Indrati', view: 'Penerapan Lex Posterior memerlukan kehati-hatian untuk memastikan bahwa memang ada pertentangan yang nyata, bukan sekadar perbedaan penafsiran.', source: 'Ilmu Perundang-Undangan: Jenis, Fungsi, dan Materi Muatan' },
    ],
    controversies: [
      { title: 'Berhadapan dengan Lex Specialis', description: 'Kontroversi sering muncul dalam penerapannya ketika berhadapan dengan asas Lex Specialis. Banyak debat apakah UU Baru yang Umum mencabut UU Lama yang Khusus, ataukah UU Lama Khusus tetap hidup.' },
    ],
    commonMistakes: [
      { misconception: '"UU baru selalu membatalkan UU lama."', fact: 'Tidak selalu. Hanya jika setingkat dan bertentangan. Jika UU baru lebih rendah, ia tidak bisa membatalkan UU lama.' },
      { misconception: '"Asas ini berlaku surut ke belakang."', fact: 'Umumnya tidak. Lex Posterior berlaku untuk kejadian setelah undang-undang baru diundangkan.' },
      { misconception: '"Jika ada dua aturan, pilih yang paling baru."', fact: 'Harus dicek dulu hierarkinya dan kekhususannya. Waktu adalah faktor terakhir.' },
    ],
    faq: [
      { question: 'Apakah Lex Posterior berlaku untuk putusan pengadilan?', answer: 'Tidak. Putusan pengadilan bersifat in concreto. Asas ini berlaku untuk peraturan perundang-undangan (in abstracto).' },
      { question: 'Bagaimana jika UU Baru tidak secara eksplisit mencabut UU Lama?', answer: 'Jika keduanya setingkat dan bertentangan, maka UU Lama dianggap dicabut secara implisit (implied repeal).' },
      { question: 'Apakah Perppu bisa membatalkan UU?', answer: 'Perppu setingkat UU. Jika bertentangan dengan UU lama, maka Perppu tersebut berlaku sebagai Lex Posterior.' },
      { question: 'Bagaimana dengan hukum adat?', answer: 'Hukum adat tidak tunduk sepenuhnya pada Lex Posterior formal. Namun UU yang mengatur hal yang sama secara tegas akan mengesampingkannya.' },
      { question: 'Apakah saya bisa menuntut ganti rugi karena mengandalkan hukum lama?', answer: 'Sulit. Asas presumption of knowledge of law berlaku. Namun jika ada masa transisi yang dilanggar, gugatan TUN bisa diajukan.' },
    ],
    maximNotes: 'Penting untuk selalu memeriksa Lembaran Negara RI atau Berita Negara untuk memastikan tanggal pengundangan yang sah. Dalam praktik, banyak peraturan pelaksana terlambat disesuaikan dengan UU induknya.',
    relatedTerms: [
      { term: 'Abrogasi', definition: 'Pencabutan total' },
      { term: 'Derogasi', definition: 'Pencabutan sebagian' },
      { term: 'Desuetudo', definition: 'Hukum yang mati karena tidak dipakai' },
      { term: 'Grandfather Clause', definition: 'Klausul pengecualian untuk keadaan lama' },
      { term: 'Implied Repeal', definition: 'Pencabutan tersirat' },
      { term: 'Express Repeal', definition: 'Pencabutan tersurat' },
      { term: 'Non-Retroactivity', definition: 'Tidak berlaku surut' },
      { term: 'Legal Certainty', definition: 'Kepastian Hukum' },
      { term: 'Hierarchy of Laws', definition: 'Hierarki Peraturan Perundang-Undangan' },
      { term: 'Conflict of Laws', definition: 'Konflik Norma' },
    ],
    relations: [
      { id: 'lex-superior', latinPhrase: 'Lex Superior Derogat Legi Inferiori', indonesianMeaning: 'Hukum yang lebih tinggi mengesampingkan hukum yang lebih rendah', relationType: 'hierarkis' },
      { id: 'lex-specialis', latinPhrase: 'Lex Specialis Derogat Legi Generali', indonesianMeaning: 'Hukum khusus mengesampingkan hukum umum', relationType: 'sinonim' },
    ],
    references: {
      primary: {
        constitutions: ['Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.'],
        statutes: [
          'Undang-Undang Nomor 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-Undangan.',
          'Undang-Undang Nomor 13 Tahun 2022 tentang Perubahan Kedua atas Undang-Undang Nomor 12 Tahun 2011.',
        ],
      },
      secondary: {
        books: [
          'Asshiddiqie, Jimly. (2006). Ilmu Perundang-Undangan: Studi Jenis dan Fungsi Peraturan Perundang-Undangan. Yogyakarta: PT Kanisius.',
          'Indrati, Maria Farida. (2007). Ilmu Perundang-Undangan: Jenis, Fungsi, dan Materi Muatan. Yogyakarta: Kanisius.',
        ],
      },
      tertiary: {
        encyclopedias: [
          'Badan Pembinaan Hukum Nasional (BPHN). Hierarki Peraturan Perundang-Undangan.',
          'Sekretariat Jenderal DPR RI. Panduan Teknis Penyusunan Peraturan Perundang-Undangan.',
        ],
      },
    },
    furtherReading: [
      { title: 'Theory of Legislation', author: 'Waelbroeck, Paul', type: 'buku' },
      { title: 'Biarkan Hukum Mengalir', author: 'Satjipto Rahardjo', type: 'buku' },
      { title: 'Jurnal Hukum IUS QUIA IUSTUM', author: 'Berbagai Penulis', type: 'jurnal' },
      { title: 'Jurnal Konstitusi', author: 'Mahkamah Konstitusi', type: 'jurnal' },
    ],
    meta: {
      categories: ['Asas Hukum', 'Teori Perundang-Undangan'],
      portals: ['Hukum Tata Negara', 'Ilmu Hukum'],
      tags: ['Lex Posterior', 'Konflik Norma', 'Hierarki Hukum', 'UU 12/2011', 'Pencabutan Undang-Undang', 'Asas Hukum'],
    },
    caseExamples: [],
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-07-30T00:00:00Z',
  },
  {
    id: 'lex-specialis',
    latinPhrase: 'Lex Specialis Derogat Legi Generali',
    indonesianMeaning: 'Asas bahwa peraturan yang bersifat khusus mengesampingkan peraturan yang bersifat umum jika keduanya mengatur hal yang sama',
    literalTranslation: 'Undang-undang yang khusus menghapuskan undang-undang yang umum',
    pronunciationGuide: '/lɛks spɛˈʃi.a.lɪs dɛˈro.ɡat ˈle.ɡi ɡɛnɛˈra.li/',
    legalFields: ['tata-negara', 'pidana', 'administrasi'],
    synonyms: ['Asas kekhususan', 'Specialia generalibus derogant'],
    usedIn: ['Indonesia', 'Belanda', 'Jerman', 'Prancis', 'sebagian besar negara Civil Law'],
    classification: {
      legalBranch: 'Hukum Tata Negara, Ilmu Perundang-Undangan, Hukum Pidana',
      nature: 'Imperatif',
      applicationLevel: 'Nasional',
      traditionSource: 'Hukum Romawi Kuno dan Corpus Juris Civilis',
    },
    applicabilityStatus: {
      validInIndonesia: true,
      validInternationally: true,
      recognizedByDoctrine: true,
      codified: false,
      notes: 'Asas Umum yang diakui dalam yurisprudensi dan doktrin',
    },
    legalMeaning: `Lex Specialis Derogat Legi Generali adalah sebuah maksim hukum Latin yang berarti "undang-undang yang khusus mengesampingkan undang-undang yang umum." Asas ini berfungsi sebagai mekanisme penafsiran hukum untuk menentukan norma mana yang harus diterapkan ketika terdapat dua peraturan perundang-undangan yang setingkat, saling berkaitan, namun satu bersifat umum (general) dan lainnya bersifat khusus (special).

Fungsi utama dari asas ini adalah menjamin kepastian hukum dan keadilan substantif. Peraturan yang bersifat khusus biasanya dibuat dengan pertimbangan yang lebih mendalam terhadap objek tertentu, subjek tertentu, atau keadaan tertentu. Oleh karena itu, dianggap bahwa legislator memiliki niat yang lebih spesifik dan detail dalam peraturan khusus tersebut dibandingkan dalam peraturan umum yang mencakup cakupan luas. Dengan menerapkan asas Lex Specialis, sistem hukum memastikan bahwa aturan yang paling relevan dan tepat sasaranlah yang berlaku.

Ruang lingkup penerapan asas ini sering kali bersinggungan dengan asas Lex Posterior. Pertanyaan yang sering muncul adalah: apakah Undang-Undang Baru yang Umum mencabut Undang-Undang Lama yang Khusus? Atau sebaliknya? Dalam praktik hukum Indonesia, jawaban atas pertanyaan ini tidak selalu hitam-putih dan sangat bergantung pada niat legislator (legislative intent) yang dapat dilihat dari penjelasan umum, konsiderans, atau pasal-pasal transisi dalam undang-undang tersebut.`,
    wordByWord: [
      { word: 'Lex', meaning: 'Undang-undang, hukum, peraturan' },
      { word: 'Specialis', meaning: 'Khusus, spesifik, istimewa' },
      { word: 'Derogat', meaning: 'Mengurangi, membatalkan sebagian, mengesampingkan' },
      { word: 'Legi', meaning: 'Kepada/Dari undang-undang' },
      { word: 'Generali', meaning: 'Umum, umum berlaku, luas' },
    ],
    wordByWordExtended: [
      { word: 'Lex', latinForm: 'Lex, Legis (f)', partOfSpeech: 'Nomina', meaning: 'Undang-undang, hukum, peraturan' },
      { word: 'Specialis', latinForm: 'Specialis, -e', partOfSpeech: 'Adjektiva', meaning: 'Khusus, spesifik, istimewa' },
      { word: 'Derogat', latinForm: 'Derogare (verba)', partOfSpeech: 'Verba (Indikatif Aktif)', meaning: 'Mengurangi, membatalkan sebagian, mengesampingkan' },
      { word: 'Legi', latinForm: 'Lex, Legis (f)', partOfSpeech: 'Nomina (Ablatif)', meaning: 'Kepada/Dari undang-undang' },
      { word: 'Generali', latinForm: 'Generalis, -e', partOfSpeech: 'Adjektiva (Ablatif)', meaning: 'Umum, umum berlaku, luas' },
    ],
    etymologyNotes: 'Kalimat ini menggunakan struktur subjek-predikat-keterangan. Lex Specialis bertindak sebagai subjek ("Undang-undang yang khusus"). Derogat adalah predikat ("mengesampingkan"). Legi Generali berada dalam kasus Ablatif, yang menunjukkan dari apa sesuatu itu dicabut atau dipisahkan, yaitu "dari undang-undang yang umum". Secara harfiah, frasa ini menekankan prioritas substansi (kekhususan) di atas cakupan (keumuman).',
    philosophicalMeaning: {
      origin: 'Asas Lex Specialis muncul dari kebutuhan akan presisi dan keadilan dalam penerapan hukum.',
      justiceValue: 'Hukum umum sering kali terlalu kaku atau terlalu luas untuk menangani situasi unik. Hukum khusus hadir untuk memberikan keadilan yang lebih pas (fitting justice) bagi subjek atau objek tertentu.',
      romanThought: 'Prinsip "Specialia generalibus derogant" sudah dikenal dalam hukum Romawi. Para ahli hukum Romawi menyadari bahwa aturan umum (ius commune) tidak selalu cocok untuk kasus-kasus istimewa, sehingga diperlukan aturan khusus (ius speciale).',
      modernRelevance: 'Relevansi modernnya terletak pada semakin banyaknya regulasi sektoral (seperti lingkungan hidup, perbankan, teknologi informasi) yang membutuhkan penanganan khusus di luar aturan umum administratif atau pidana.',
    },
    history: 'Sejarah asas ini dapat ditelusuri dari zaman Romawi Kuno, berkembang melalui Corpus Juris Civilis, diadopsi di Eropa Kontinental dan Belanda, hingga diterapkan secara konsisten di Indonesia pasca kemerdekaan.',
    historyTimeline: [
      { era: 'Romawi Kuno', period: 'Romawi Kuno', description: 'Prinsip "Specialia generalibus derogant" sudah dikenal. Para ahli hukum menyadari aturan umum tidak selalu cocok untuk kasus istimewa.' },
      { era: 'Corpus Juris Civilis', period: 'Abad ke-6 M', description: 'Justinianus I dalam Digesta dan Codex mencatat berbagai pendapat ahli hukum yang mendukung prioritas aturan khusus.' },
      { era: 'Eropa Kontinental', period: 'Abad Pertengahan', description: 'Para glossator dan komentator memperkuat doktrin ini. Asas ini menjadi alat interpretasi standar.' },
      { era: 'Belanda', period: 'Masa Kolonial', description: 'Belanda mengadopsi prinsip "de bijzondere wet gaat voor de algemene wet" secara penuh, mempengaruhi praktik peradilan di Indonesia.' },
      { era: 'Indonesia', period: 'Pasca Kemerdekaan', description: 'Mahkamah Agung dan MK konsisten menggunakan asas ini. Diakui sebagai asas umum hukum yang berlaku dalam penyelesaian konflik norma.' },
    ],
    doctrineDevelopment: [
      { era: 'Doktrin Klasik', description: 'Awalnya diterapkan secara kaku. Jika ada aturan khusus, aturan umum otomatis tidak berlaku.' },
      { era: 'Doktrin Legislative Intent', description: 'Menekankan pentingnya melihat niat legislator. Apakah sebagai pengecualian permanen atau pelengkap.' },
      { era: 'Doktrin Harmonisasi', description: 'Berusaha menghindari pencabutan implisit. Hakim berupaya membaca aturan umum dan khusus secara harmonis (subsidiaritas).' },
      { era: 'Doktrin Konstitusionalisme', description: 'Di era negara hukum konstitusional, baik aturan umum maupun khusus harus tunduk pada UUD 1945.' },
    ],
    elements: [
      'Adanya Dua Peraturan Perundang-Undangan: Harus ada minimal dua norma hukum tertulis.',
      'Tingkatan Hierarki yang Sama: Kedua peraturan tersebut harus memiliki kedudukan yang setara.',
      'Hubungan Genus-Spesies: Harus ada hubungan logis, cakupan luas (umum) dan cakupan sempit (khusus).',
      'Objek Materiil yang Tumpang Tindih: Mengatur hal yang sama, namun aturan khusus lebih detail.',
      'Pertentangan atau Kelengkapan: Ada pertentangan langsung, atau khusus melengkapi/mengecualikan umum.'
    ],
    conditions: [
      'Kesetaraan Hierarki: Berasal dari lembaga setara. Jika tidak, berlaku Lex Superior.',
      'Kekhususan yang Nyata: Harus benar-benar mengatur aspek spesifik yang tidak diatur detail di aturan umum.',
      'Tidak Ada Pencabutan Eksplisit: Peraturan umum baru tidak boleh eksplisit mencabut peraturan khusus lama.'
    ],
    exceptions: [
      'Jika Peraturan Khusus Bertentangan dengan UUD 1945.',
      'Jika Ada Klausul Pencabutan Eksplisit dalam UU Baru.',
      'Jika Peraturan Khusus Sudah Kadaluarsa (temporary law).',
      'Dalam Hukum Pidana (Prinsip Nullum Crimen): Jika aturan khusus tidak jelas mendefinisikan tindak pidana.'
    ],
    scope: {
      applies: [
        'Konflik antar Undang-Undang sektoral/khusus vs umum',
        'Konflik antar Pasal dalam satu UU yang sama',
        'Hubungan KUHP (pidana umum) dengan UU Tindak Pidana Khusus'
      ],
      doesNotApply: [
        'Konflik antara UU dengan PP (Lex Superior)',
        'Konflik antara UU dengan UUD 1945',
        'Kasus di mana UU Baru secara eksplisit mencabut UU Lama Khusus'
      ]
    },
    indonesianLegalBasis: 'Meskipun tidak ada pasal tunggal yang berbunyi "Lex Specialis...", asas ini menjadi landasan penafsiran dalam penyelesaian ketidaksesuaian antar peraturan, tercermin dalam praktik hukum.',
    legalBasisTable: [
      { statute: 'UU No. 12 Tahun 2011 (jo. UU No. 13/2022)', article: 'Pasal 63', relevance: 'Diakui sebagai asas penafsiran utama dalam konflik norma setingkat dalam penjelasan dan praktik.' },
      { statute: 'KUHP', article: 'Pasal 103 dsb.', relevance: 'Rujukan "kecuali ditentukan lain dalam undang-undang khusus" adalah bentuk kodifikasi asas ini.' },
      { statute: 'Putusan Mahkamah Konstitusi', article: 'Berbagai Putusan', relevance: 'Secara konsisten digunakan sebagai ratio decidendi dalam menguji konflik antar UU.' }
    ],
    indonesianSystemRelation: 'Bagi hakim untuk menentukan pasal yang diterapkan. Bagi legislator saat menyusun naskah akademik agar tidak bertentangan. Bagi akademisi sebagai objek kajian batasan kekhususan.',
    normativeExamples: [
      'Hukum Pidana: UU Pemberantasan Tindak Pidana Korupsi (Lex Specialis) terhadap KUHP.',
      'Hukum Dagang/Bisnis: UU Perseroan Terbatas (Lex Specialis) terhadap KUHD.',
      'Hukum Lingkungan: UU Perlindungan dan Pengelolaan Lingkungan Hidup (Lex Specialis) dalam perizinan berusaha.'
    ],
    practicalExamples: [
      'Jaksa menuntut koruptor dengan UU Tipikor, bukan pasal penipuan KUHP.',
      'Pengacara sengketa perusahaan merujuk UU PT sebelum merujuk KUHD.',
      'Pengusaha perbankan mengikuti ketentuan OJK (UU Perbankan) dibanding aturan perizinan umum.'
    ],
    caseExamples: [],
    jurisprudence: [
      { id: 'mk-55-2010', courtName: 'Mahkamah Konstitusi', caseNumber: '55/PUU-VIII/2010', year: 2010, excerpt: 'MK menegaskan bahwa UU KPK adalah lex specialis dalam penegakan hukum tindak pidana korupsi.', context: 'Pengujian UU KPK vs UU Umum', summary: 'Menegaskan prioritas UU Khusus (KPK) atas aturan umum dalam penyelidikan dan penyidikan.', sourceUrl: 'https://www.mkri.id' },
      { id: 'mk-12-2014', courtName: 'Mahkamah Konstitusi', caseNumber: '12/PUU-XII/2014', year: 2014, excerpt: 'MK menggunakan prinsip kekhususan untuk menentukan kewenangan pemerintah pusat vs daerah dalam pengelolaan mineral.', context: 'Konflik Norma UU Minerba vs UU Pemda', summary: 'Menunjukkan Lex Specialis untuk pembagian kewenangan objek khusus.', sourceUrl: 'https://www.mkri.id' },
      { id: 'ma-210-2015', courtName: 'Mahkamah Agung', caseNumber: '210/PID.SUS/2015/PN.Jkt.Pst', year: 2015, excerpt: 'Hakim menerapkan UU Narkotika (Khusus) daripada KUHP (Umum) untuk penentuan pidana.', context: 'Kasus Narkotika', summary: 'Contoh Lex Specialis di pengadilan negeri hukum pidana.', sourceUrl: 'https://www.mahkamahagung.go.id' }
    ],
    internationalComparisons: [
      { country: 'Belanda', status: 'Dikenal', description: 'Asas "De bijzondere wet gaat voor de algemene wet" sangat kuat, dengan memperhatikan wetsgeschiedenis (niat legislator).' },
      { country: 'Jerman', status: 'Dikenal', description: 'Prinsip "Spezialität geht vor Generalität" berlaku dengan sangat sistematis membedakan Tatbestand (unsur perbuatan).' },
      { country: 'Prancis', status: 'Dikenal', description: 'Cenderung lebih kaku dalam penerapan "La loi spéciale déroge à la loi générale" demi kepastian hukum.' },
      { country: 'Inggris', status: 'Dikenal Sebagian', description: 'Pengadilan menerapkan prinsip "Generalia specialibus non derogant" dalam penafsiran statuta jika ada konflik.' },
      { country: 'Amerika Serikat', status: 'Dikenal Sebagian', description: 'Prinsip "Specific governs the general" diakui dalam penafsiran statuta federal.' }
    ],
    maximComparisons: [
      { maximId: 'lex-superior', latinPhrase: 'Lex Superior Derogat Legi Inferiori', whenUsed: 'Terjadi konflik antara peraturan yang berbeda tingkatan.' },
      { maximId: 'lex-posterior', latinPhrase: 'Lex Posterior Derogat Legi Priori', whenUsed: 'Terjadi konflik antara peraturan setingkat dan sama-sama umum/khusus.' }
    ],
    analysis: {
      purpose: 'Menciptakan presisi hukum dan keadilan yang sesuai dengan karakteristik kasus tertentu.',
      protectedValues: 'Keadilan substantif, efektivitas penegakan hukum, dan penghormatan terhadap niat legislator yang detail.',
      advantages: 'Memungkinkan penanganan kasus yang kompleks dan spesifik dengan aturan yang dirancang khusus untuk itu.',
      critique: 'Dapat menimbulkan fragmentasi hukum (legal fragmentation) membuat sistem rumit dan sulit dipahami masyarakat.',
      limitations: 'Sulit menentukan batas antara "umum" dan "khusus". Bisa subjektif tergantung pihak.'
    },
    scholarViews: [
      { name: 'Prof. Dr. Jimly Asshiddiqie, S.H., M.H.', view: 'Aturan khusus harus dibaca sebagai pengecualian dari aturan umum, dan pengecualian harus ditafsirkan secara ketat.', source: 'Ilmu Perundang-Undangan' },
      { name: 'Prof. Dr. Maria Farida Indrati, S.H., M.H.', view: 'Penerapan Lex Specialis memerlukan analisis mendalam terhadap materi muatan peraturan, tidak hanya dari judulnya.', source: 'Ilmu Perundang-Undangan: Jenis, Fungsi, dan Materi Muatan' },
      { name: 'Dr. H. A. Hamid S. Attamimi', view: 'Mengkritik praktik pembuatan UU Sektoral tanpa harmonisasi dengan UU Payung yang menyebabkan konflik Lex Specialis.' }
    ],
    controversies: [
      { title: 'Konflik UU Baru Umum vs UU Lama Khusus', description: 'Contoh UU Cipta Kerja vs UU Sektoral Lama. Apakah UU Cipta Kerja (Lex Posterior) mencabut UU Sektoral (Lex Specialis)? Ketidakjelasan konsiderans sering memicu sengketa ini.' }
    ],
    commonMistakes: [
      { misconception: '"Aturan khusus selalu menang."', fact: 'Tidak selalu. Jika bertentangan dengan aturan umum yang hierarkinya lebih tinggi, Lex Superior yang menang.' },
      { misconception: '"Lex Specialis hanya untuk hukum pidana."', fact: 'Salah. Berlaku di semua cabang hukum, termasuk perdata, tata negara, dan administrasi.' },
      { misconception: '"Jika UU Baru terbit, UU Lama Khusus otomatis gugur."', fact: 'Belum tentu. UU Lama Khusus sering tetap berlaku sebagai pengecualian jika tidak dicabut secara eksplisit.' }
    ],
    faq: [
      { question: 'Apakah Lex Specialis berlaku untuk Peraturan Daerah?', answer: 'Ya, jika ada Perda Khusus (misal: Perda Pajak) dan Perda Umum (Perda APBD).' },
      { question: 'Bagaimana jika dua UU sama-sama mengklaim khusus?', answer: 'Dilihat hierarki, waktu (Lex Posterior), atau dicari harmonisasi oleh Hakim/MK.' },
      { question: 'Apakah KUHP masih berlaku jika ada UU Tindak Pidana Khusus?', answer: 'KUHP tetap berlaku sebagai Lex Generalis (subsidiar) untuk unsur yang tidak diatur di UU Khusus.' },
      { question: 'Siapa yang menentukan aturan itu khusus atau umum?', answer: 'Awalnya pembentuk undang-undang, namun dalam sengketa ditentukan oleh Hakim atau MK.' },
      { question: 'Apakah Lex Specialis bisa dibatalkan?', answer: 'Bisa dicabut eksplisit oleh UU Baru atau dibatalkan MK jika inkonstitusional.' }
    ],
    maximNotes: 'Penting untuk membaca Penjelasan Umum dan Konsiderans sebuah UU untuk mengetahui apakah legislator bermaksud menjadikannya sebagai Lex Specialis. Dalam praktik, sering terjadi tumpang tindih kewenangan (sectoral ego).',
    relatedTerms: [
      { term: 'Subsidiaritas', definition: 'Berlaku jika aturan khusus tidak mengatur' },
      { term: 'Strict Interpretation', definition: 'Penafsiran ketat untuk aturan khusus/pidana' },
      { term: 'Exceptiones sunt strictissimae interpretationis', definition: 'Pengecualian ditafsirkan secara ketat' },
      { term: 'Harmonisasi Peraturan', definition: 'Penyelarasan antar norma' },
      { term: 'Legislative Intent', definition: 'Niat Pembuat Undang-Undang' },
      { term: 'Omnibus Law', definition: 'Metode UU yang menggabungkan banyak sektor' }
    ],
    relations: [
      { id: 'lex-posterior', latinPhrase: 'Lex Posterior Derogat Legi Priori', indonesianMeaning: 'Hukum baru mengesampingkan hukum lama', relationType: 'berlawanan' },
      { id: 'lex-superior', latinPhrase: 'Lex Superior Derogat Legi Inferiori', indonesianMeaning: 'Hukum yang lebih tinggi mengesampingkan hukum yang lebih rendah', relationType: 'hierarkis' }
    ],
    references: {
      primary: {
        constitutions: ['Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.'],
        statutes: [
          'Undang-Undang Nomor 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-Undangan.',
          'Undang-Undang Nomor 31 Tahun 1999 jo. UU No. 20 Tahun 2001 tentang Pemberantasan Tindak Pidana Korupsi.',
          'Undang-Undang Nomor 40 Tahun 2007 tentang Perseroan Terbatas.'
        ]
      },
      secondary: {
        books: [
          'Asshiddiqie, Jimly. (2006). Ilmu Perundang-Undangan: Studi Jenis dan Fungsi Peraturan Perundang-Undangan. Yogyakarta: PT Kanisius.',
          'Indrati, Maria Farida. (2007). Ilmu Perundang-Undangan: Jenis, Fungsi, dan Materi Muatan. Yogyakarta: Kanisius.',
          'Attamimi, Hamid S. (1990). Peranan Keputusan Presiden Republik Indonesia dalam Penyelenggaraan Pemerintahan Negara. Disertasi Doktor, Universitas Indonesia.'
        ]
      },
      tertiary: {
        encyclopedias: [
          'Badan Pembinaan Hukum Nasional (BPHN). Hierarki Peraturan Perundang-Undangan.',
          'Direktori Putusan Mahkamah Konstitusi RI.'
        ]
      }
    },
    furtherReading: [
      { title: 'Biarkan Hukum Mengalir', author: 'Satjipto Rahardjo', type: 'buku' },
      { title: 'Dasar-Dasar Filsafat dan Teori Hukum', author: 'Lili Rasjidi', type: 'buku' },
      { title: 'Jurnal Hukum IUS QUIA IUSTUM', author: '-', type: 'jurnal' },
      { title: 'Jurnal Konstitusi', author: 'Mahkamah Konstitusi', type: 'jurnal' }
    ],
    meta: {
      categories: ['Asas Hukum', 'Teori Perundang-Undangan'],
      portals: ['Hukum Tata Negara', 'Ilmu Hukum', 'Hukum Pidana'],
      tags: ['Lex Specialis', 'Konflik Norma', 'Hukum Khusus', 'Hukum Umum', 'UU Tipikor', 'KUHP', 'Mahkamah Konstitusi']
    },
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2026-07-30T00:00:00Z',
  },
  {
    id: 'nullum-crimen',
    latinPhrase: 'Nullum Crimen Sine Lege',
    indonesianMeaning: 'Tidak ada suatu perbuatan dapat dipidana kecuali atas kekuatan aturan pidana dalam perundang-undangan yang telah ada sebelum perbuatan dilakukan',
    literalTranslation: 'Tidak ada kejahatan tanpa undang-undang',
    pronunciationGuide: '/ˈnʊl.lʊm ˈkri.mɛn ˈsi.nɛ ˈle.ɡɛ/',
    legalFields: ['pidana', 'tata-negara'],
    synonyms: ['Asas Legalitas', 'Principle of Legality', 'Gesetzlichkeitsprinzip'],
    usedIn: ['Indonesia', 'Belanda', 'Jerman', 'Prancis', 'negara-negara yang meratifikasi ICCPR'],
    classification: {
      legalBranch: 'Hukum Pidana Materiil, Hukum Hak Asasi Manusia',
      nature: 'Imperatif',
      applicationLevel: 'Nasional',
      traditionSource: 'Hukum Romawi, Magna Carta (1215), dan Declaration of the Rights of Man and of the Citizen (1789)',
    },
    applicabilityStatus: {
      validInIndonesia: true,
      validInternationally: true,
      recognizedByDoctrine: true,
      codified: true,
      notes: 'Asas Fundamental dan Hak Konstitusional',
    },
    legalMeaning: `Nullum Crimen Sine Lege (sering dilengkapi dengan Nulla Poena Sine Lege, yang berarti "tidak ada pidana tanpa undang-undang") adalah asas legalitas yang menjadi fondasi utama sistem hukum pidana modern. Asas ini menetapkan bahwa suatu perbuatan hanya dapat dianggap sebagai tindak pidana dan dikenai sanksi pidana jika perbuatan tersebut telah secara tegas dilarang dan diancam dengan pidana oleh peraturan perundang-undangan yang berlaku pada saat perbuatan tersebut dilakukan.

Fungsi utama dari asas ini adalah sebagai perisai pelindung bagi warga negara dari kesewenang-wenangan kekuasaan negara (arbitrariness of state power). Dengan mewajibkan adanya aturan tertulis yang jelas sebelum suatu perbuatan dilakukan, asas ini menjamin kepastian hukum (legal certainty) dan memberikan ruang bagi individu untuk mengatur perilakunya agar tidak melanggar hukum. Tanpa asas ini, negara berpotensi menghukum warga negaranya berdasarkan norma yang dibuat setelah perbuatan terjadi (retroactive law) atau berdasarkan penafsiran yang terlalu luas oleh aparat penegak hukum.

Ruang lingkup penerapan asas ini secara ketat dibatasi pada hukum pidana materiil. Dalam hukum pidana, asas ini melarang pemberlakuan hukum secara surut (retroactive), melarang penggunaan analogi untuk menciptakan delik baru (prohibition of analogy), dan mewajibkan perumusan delik yang jelas (lex certa). Hal ini berbeda dengan hukum perdata atau hukum administrasi, di mana analogi dan pemberlakuan surut dalam batas tertentu masih dimungkinkan.`,
    wordByWord: [
      { word: 'Nullum', meaning: 'Tidak ada, tiada' },
      { word: 'Crimen', meaning: 'Kejahatan, tindak pidana, dakwaan' },
      { word: 'Sine', meaning: 'Tanpa' },
      { word: 'Lege', meaning: 'Undang-undang, hukum tertulis' },
    ],
    wordByWordExtended: [
      { word: 'Nullum', latinForm: 'Nullus, -a, -um', partOfSpeech: 'Adjektiva (Netral, Akusatif)', meaning: 'Tidak ada, tiada' },
      { word: 'Crimen', latinForm: 'Crimen, criminis (n)', partOfSpeech: 'Nomina (Akusatif)', meaning: 'Kejahatan, tindak pidana, dakwaan' },
      { word: 'Sine', latinForm: 'Sine', partOfSpeech: 'Preposisi', meaning: 'Tanpa' },
      { word: 'Lege', latinForm: 'Lex, legis (f)', partOfSpeech: 'Nomina (Ablatif)', meaning: 'Undang-undang, hukum tertulis' },
    ],
    etymologyNotes: 'Frasa ini merupakan klausa nominal yang menyatakan ketiadaan. Nullum Crimen berfungsi sebagai subjek dalam kasus Akusatif ("tidak ada kejahatan"), sedangkan Sine Lege adalah frasa preposisional yang menggunakan kasus Ablatif untuk menyatakan ketiadaan alat atau dasar ("tanpa undang-undang"). Secara harfiah, struktur ini menegaskan hubungan kondisional yang mutlak: kejahatan tidak dapat eksis secara yuridis tanpa keberadaan undang-undang yang mendahuluinya.',
    philosophicalMeaning: {
      origin: 'Lahir dari filosofi Rechtsstaat (Negara Hukum) yang menolak Machtstaat (Negara Kekuasaan).',
      justiceValue: 'Keadilan prosedural dan penghormatan martabat manusia. Menghukum berdasarkan aturan yang belum ada adalah ketidakadilan karena orang tersebut tidak memiliki kesempatan mematuhinya.',
      romanThought: 'Prinsip bahwa hukuman harus didasarkan pada hukum tertulis (ius scriptum) mulai berkembang, terutama dalam Lex Duodecim Tabularum (Hukum Dua Belas Tabel).',
      modernRelevance: 'Membatasi diskresi hakim dan aparat penegak hukum. Menjamin kepastian hukum dan kebebasan individu.',
    },
    history: 'Prinsip ini berkembang dari Lex Duodecim Tabularum di Romawi, Magna Carta (1215) di Inggris, pemikiran Cesare Beccaria, hingga Declaration of the Rights of Man and of the Citizen (1789) di Prancis, yang kemudian diadopsi dalam hukum modern.',
    historyTimeline: [
      { era: 'Romawi Kuno', period: 'Romawi Kuno', description: 'Prinsip hukuman didasarkan pada hukum tertulis (ius scriptum) mulai berkembang dalam Lex Duodecim Tabularum.' },
      { era: 'Magna Carta', period: '1215', description: 'Pasal 39 menyatakan tidak ada orang bebas dihukum kecuali oleh "hukum yang sah dari negeri tersebut" (law of the land).' },
      { era: 'Pencerahan Eropa', period: 'Abad ke-18', description: 'Cesare Beccaria menegaskan hanya undang-undang yang dapat menetapkan hukuman (Dei Delitti e Delle Pene).' },
      { era: 'Revolusi Prancis', period: '1789', description: 'Declaration of the Rights of Man and of the Citizen Pasal 8 secara eksplisit merumuskan asas ini.' },
      { era: 'Indonesia', period: 'Masa Kolonial & Kemerdekaan', description: 'Diadopsi dari Pasal 1 Wetboek van Strafrecht Belanda menjadi Pasal 1 ayat (1) KUHP.' },
    ],
    doctrineDevelopment: [
      { era: 'Doktrin Formalistik Klasik', description: 'Ditafsirkan kaku: hanya undang-undang tertulis yang dapat menjadi dasar pemidanaan, analogi dilarang mutlak.' },
      { era: 'Doktrin Lex Certa', description: 'Mensyaratkan undang-undang harus jelas (clear) dan tegas (definite). Tidak boleh terlalu kabur (vague).' },
      { era: 'Pengecualian Nuremberg', description: 'Pengecualian terbatas pasca PD II: Kejahatan HAM berat dapat dihukum berdasarkan hukum kebiasaan internasional meski tak ada hukum nasional.' },
      { era: 'Doktrin Living Law', description: 'Diskursus RKUHP: hukum yang hidup dalam masyarakat dapat menjadi dasar pemidanaan jika memenuhi syarat tertentu.' },
    ],
    elements: [
      'Adanya Perbuatan: Tindakan atau kelalaian oleh subjek hukum.',
      'Aturan Pidana Tertulis: Peraturan perundang-undangan secara eksplisit menyatakan perbuatan tersebut sebagai delik.',
      'Ancaman Pidana: Peraturan memuat sanksi pidana yang jelas.',
      'Kronologi Waktu: Peraturan tersebut harus sudah ada dan berlaku sah sebelum perbuatan dilakukan.'
    ],
    conditions: [
      'Tertulis (Scripta): Sumber hukum harus berbentuk peraturan perundang-undangan tertulis.',
      'Ada Sebelumnya (Praevia): Undang-undang harus sudah berlaku sebelum perbuatan dilakukan untuk mencegah retroaktif.',
      'Jelas dan Tegas (Certa): Rumusan delik tidak multitafsir dan membatasi diskresi aparat.'
    ],
    exceptions: [
      'Hukum Pidana Internasional: Pelaku genosida dsb diadili meski tak ada hukum nasional saat itu (jus cogens).',
      'Retroaktif Terbatas HAM Berat: Pasal 43 UU No. 26/2000 memungkinkan pemberlakuan surut untuk HAM berat (Putusan MK No. 065/PUU-II/2004).',
      'Hukum yang Menguntungkan Terdakwa (Lex Mitior): UU baru yang lebih ringan/menghapus pidana dapat berlaku surut.'
    ],
    scope: {
      applies: [
        'Hukum Pidana Materiil (penentuan delik)',
        'Penentuan jenis dan batas ancaman pidana',
        'Semua peraturan perundang-undangan yang memuat sanksi pidana'
      ],
      doesNotApply: [
        'Hukum Perdata (analogi diperbolehkan)',
        'Hukum Administrasi Negara (legalitas lebih longgar)',
        'Hukum Kebiasaan (Customary Law) konteks non-pidana',
        'Sanksi disiplin atau administratif'
      ]
    },
    indonesianLegalBasis: 'Asas ini adalah fondasi absolut dalam sistem peradilan pidana Indonesia, diatur dalam KUHP dan konstitusi.',
    legalBasisTable: [
      { statute: 'UUD 1945', article: 'Pasal 28I ayat (1)', relevance: 'Menjamin hak untuk tidak dituntut atas dasar hukum yang berlaku surut (non-derogable).' },
      { statute: 'KUHP', article: 'Pasal 1 ayat (1)', relevance: 'Rumusan utama asas legalitas: Tiada perbuatan dapat dipidana kecuali ada aturannya terlebih dahulu.' },
      { statute: 'KUHP', article: 'Pasal 1 ayat (2)', relevance: 'Pengecualian: Lex Mitior (jika ada perubahan, pakai ketentuan yang paling ringan).' },
      { statute: 'UU No. 39 Tahun 1999', article: 'Pasal 47', relevance: 'Hak untuk tidak dituntut atas dasar hukum yang berlaku surut adalah hak asasi.' },
      { statute: 'UU No. 12 Tahun 2005', article: 'Pasal 15 ICCPR', relevance: 'Ratifikasi kewajiban internasional untuk tidak memberlakukan hukum pidana secara surut.' }
    ],
    indonesianSystemRelation: 'Bagi hakim terikat mutlak pada Pasal 1(1) KUHP dan dilarang menggunakan analogi in malam partem. Legislator wajib merumuskan delik secara jelas (lex certa).',
    normativeExamples: [
      'KUHP: Pasal 338 merumuskan pembunuhan dengan jelas (lex certa dan nullum crimen sine lege).',
      'UU ITE: Memberikan dasar hukum tertulis untuk delik pencemaran nama baik di ranah elektronik.',
      'UU Tipikor: Merumuskan unsur korupsi secara khusus sebelum bisa dipidana.'
    ],
    practicalExamples: [
      'Perbuatan belum diatur: Jika tidak ada UU spesifik, polisi tak bisa menahan dan jaksa tak bisa mendakwa.',
      'Lex Mitior: UU diubah ancaman pidananya turun, hakim terapkan UU baru yang lebih ringan meski kejadian saat UU lama.',
      'Penolakan Analogi: Hakim tak boleh menghukum "pencurian listrik" dengan analogi "pencurian barang" sebelum ada UU yang mengaturnya.'
    ],
    caseExamples: [],
    jurisprudence: [
      { id: 'mk-065-2004', courtName: 'Mahkamah Konstitusi', caseNumber: '065/PUU-II/2004', year: 2004, excerpt: 'MK menyatakan bahwa pemberlakuan surut untuk pelanggaran HAM berat dapat dibenarkan secara konstitusional sebagai pengecualian terbatas, namun menegaskan bahwa untuk tindak pidana biasa, asas non-retroaktif adalah mutlak.', context: 'Pengujian Pasal 43 UU No. 26/2000', summary: 'Menegaskan batas dan pengecualian sempit dari asas legalitas.', sourceUrl: 'https://www.mkri.id' },
      { id: 'mk-135-2009', courtName: 'Mahkamah Konstitusi', caseNumber: '135/PUU-VII/2009', year: 2010, excerpt: 'MK menekankan pentingnya asas kepastian hukum (legal certainty) dan lex certa dalam perumusan delik, agar tidak multitafsir dan melanggar hak konstitusional warga negara.', context: 'Pengujian pasal-pasal pidana', summary: 'Menguatkan Lex Certa sebagai turunan Nullum Crimen Sine Lege.', sourceUrl: 'https://www.mkri.id' }
    ],
    internationalComparisons: [
      { country: 'Belanda', status: 'Dikenal', description: 'Pasal 1 Wetboek van Strafrecht merumuskan secara identik. Sangat ketat melarang analogi merugikan.' },
      { country: 'Jerman', status: 'Dikenal', description: 'Grundgesetz Pasal 103(2) menekankan nulla poena sine lege sebagai pasangan tak terpisahkan.' },
      { country: 'Prancis', status: 'Dikenal', description: 'Declaration of the Rights of Man (1789) Pasal 8 melarang hukum surut dalam pidana.' },
      { country: 'Inggris', status: 'Dikenal Sebagian', description: 'Prinsip Rule of Law melarang hukuman sewenang-wenang, namun historis lebih fleksibel pada judge-made law.' },
      { country: 'Amerika Serikat', status: 'Dikenal', description: 'Konstitusi AS melarang Ex Post Facto Laws (hukum berlaku surut).' }
    ],
    maximComparisons: [
      { maximId: 'nulla-poena', latinPhrase: 'Nulla Poena Sine Lege', whenUsed: 'Pasangan tak terpisahkan. Nullum crimen untuk kriminalisasi, nulla poena untuk hukuman.' },
      { maximId: 'lex-posterior', latinPhrase: 'Lex Posterior Derogat Legi Priori', whenUsed: 'Hanya berlaku jika menguntungkan terdakwa (Lex Mitior) dalam hukum pidana.' }
    ],
    analysis: {
      purpose: 'Melindungi warga negara dari kesewenang-wenangan negara dan menjamin kepastian hukum.',
      protectedValues: 'Kebebasan individu, keadilan prosedural, dan supremasi hukum tertulis.',
      advantages: 'Menciptakan batasan jelas bagi kekuasaan negara dan memberikan rasa aman bagi masyarakat.',
      critique: 'Dianggap terlalu kaku dalam masyarakat yang berubah cepat, memunculkan celah hukum (loophole) sebelum UU baru dibuat.',
      limitations: 'Tergantung kualitas perumusan UU. Jika terlalu elastis (overcriminalization), asas ini jadi tidak efektif.'
    },
    scholarViews: [
      { name: 'Prof. Dr. Moeljatno, S.H.', view: 'Pasal 1(1) KUHP adalah penjabaran asas ini yang bertujuan membatasi kekuasaan hakim menciptakan hukum baru melalui analogi.', source: 'Asas-Asas Hukum Pidana' },
      { name: 'Prof. Dr. Andi Hamzah, S.H.', view: 'UU harus sudah ada sebelum perbuatan dilakukan, dan larangan analogi adalah konsekuensi logis yang mutlak.', source: 'Asas-Asas Hukum Pidana di Indonesia' },
      { name: 'Prof. Dr. Romli Atmasasmita, S.H., LL.M.', view: 'Pengakuan living law dalam RKUHP harus dibatasi ketat agar tidak menggerus esensi kepastian hukum tertulis.' }
    ],
    controversies: [
      { title: 'Penerapan Retroaktif UU HAM', description: 'Pasal 43 UU No. 26 Tahun 2000 memicu perdebatan apakah ini pelanggaran UUD 1945 atau pengecualian (jus cogens).' },
      { title: 'Wacana Living Law dalam RKUHP', description: 'Pemidanaan berdasarkan hukum adat (Pasal 2 RKUHP) memicu kekhawatiran pelemahan kepastian hukum tertulis.' }
    ],
    commonMistakes: [
      { misconception: '"Asas ini berlaku di semua bidang hukum."', fact: 'Salah. Hanya di Hukum Pidana. Di perdata, analogi diperbolehkan.' },
      { misconception: '"Hakim boleh menggunakan analogi jika perbuatannya jelas jahat."', fact: 'Salah. Analogi in malam partem dilarang mutlak meski perbuatan tercela.' },
      { misconception: '"UU baru selalu bisa menghukum perbuatan masa lalu."', fact: 'Salah. Hanya jika menguntungkan terdakwa (lex mitior).' }
    ],
    faq: [
      { question: 'Apakah Nullum Crimen Sine Lege berarti hukum adat tidak bisa dipakai menghukum?', answer: 'Ya, hukum adat tidak tertulis tidak bisa jadi dasar pemidanaan langsung sebelum ada UU.' },
      { question: 'Bagaimana jika perbuatan sangat jahat tapi belum ada UU?', answer: 'Tidak dapat dipidana. Legislator harus buat UU untuk masa depan, bukan hukum surut.' },
      { question: 'Apakah PP bisa menciptakan delik pidana baru?', answer: 'Tidak. Ancaman pidana harus diatur dalam UU. PP hanya mengatur sanksi administratif (kecuali ada delegasi spesifik).' },
      { question: 'Apa bedanya dengan Ne Bis In Idem?', answer: 'Nullum Crimen melindungi dari hukuman tanpa UU. Ne Bis In Idem melindungi dari dituntut dua kali untuk perbuatan yang sama.' },
      { question: 'Apakah asas ini melindungi korporasi?', answer: 'Ya, jika UU tak mengatur pidana korporasi, korporasi tak bisa dipidana.' }
    ],
    maximNotes: 'Penting bagi penasihat hukum untuk segera memeriksa kronologi waktu perbuatan vs tanggal pengundangan UU. Asas ini juga berlaku di UU Sektoral, tidak hanya KUHP.',
    relatedTerms: [
      { term: 'Nulla Poena Sine Lege', definition: 'Tidak ada pidana tanpa undang-undang' },
      { term: 'Lex Certa', definition: 'Asas kepastian perumusan delik' },
      { term: 'Retroactive Law', definition: 'Hukum yang berlaku surut' },
      { term: 'Non-Derogable Rights', definition: 'Hak yang tidak dapat dikurangi' },
      { term: 'Analogi', definition: 'Penafsiran dengan persamaan dasar' },
      { term: 'Overcriminalization', definition: 'Inflasi hukum pidana' },
      { term: 'Living Law', definition: 'Hukum yang hidup dalam masyarakat' },
      { term: 'Lex Mitior', definition: 'Hukum yang lebih ringan' },
      { term: 'Rechtsstaat', definition: 'Negara Hukum' },
      { term: 'Jus Cogens', definition: 'Norma hukum internasional yang memaksa' }
    ],
    relations: [
      { id: 'nulla-poena', latinPhrase: 'Nulla Poena Sine Lege', indonesianMeaning: 'Tidak ada pidana tanpa undang-undang', relationType: 'sinonim' },
      { id: 'lex-posterior', latinPhrase: 'Lex Posterior Derogat Legi Priori', indonesianMeaning: 'Hukum baru mengesampingkan hukum lama', relationType: 'berlawanan' }
    ],
    references: {
      primary: {
        constitutions: ['Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, Pasal 28I ayat (1).'],
        statutes: [
          'Kitab Undang-Undang Hukum Pidana (KUHP), Pasal 1 ayat (1) dan (2).',
          'Undang-Undang Nomor 39 Tahun 1999 tentang Hak Asasi Manusia, Pasal 47.',
          'Undang-Undang Nomor 12 Tahun 2005 tentang Pengesahan ICCPR.',
          'Undang-Undang Nomor 26 Tahun 2000 tentang Pengadilan Hak Asasi Manusia, Pasal 43.'
        ]
      },
      secondary: {
        books: [
          'Moeljatno. (2008). Asas-Asas Hukum Pidana. Jakarta: Rineka Cipta.',
          'Hamzah, Andi. (2017). Asas-Asas Hukum Pidana. Jakarta: Rineka Cipta.',
          'Atmasasmita, Romli. (2016). Teori dan Kapita Selekta Kriminologi. Bandung: Refika Aditama.'
        ]
      },
      tertiary: {
        encyclopedias: [
          'Mahkamah Konstitusi Republik Indonesia. Putusan No. 065/PUU-II/2004 dan Putusan No. 135/PUU-VII/2009.',
          'Badan Pembinaan Hukum Nasional (BPHN). Naskah Akademik dan Konsep RKUHP.'
        ]
      }
    },
    furtherReading: [
      { title: 'Kebijakan Hukum Pidana', author: 'E.U.T. Simanjuntak', type: 'buku' },
      { title: 'Kumpulan Karangan Hukum', author: 'Satochid Kartanegara', type: 'buku' },
      { title: 'Jurnal Hukum Pidana dan Kriminologi', author: '-', type: 'jurnal' },
      { title: 'Constitutional Review', author: '-', type: 'jurnal' }
    ],
    meta: {
      categories: ['Asas Hukum', 'Hukum Pidana', 'Hak Asasi Manusia'],
      portals: ['Ilmu Hukum', 'Keadilan Pidana'],
      tags: ['Nullum Crimen Sine Lege', 'Asas Legalitas', 'Pasal 1 KUHP', 'Non-Retroaktif', 'Lex Certa', 'Hak Asasi Manusia']
    },
    isActive: true,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2026-07-30T00:00:00Z',
  },
  {
    id: 'in-dubio-pro-reo',
    latinPhrase: 'In Dubio Pro Reo',
    indonesianMeaning: 'Jika terdapat keraguan dalam pembuktian, putusan harus diberikan untuk menguntungkan terdakwa',
    literalTranslation: 'Dalam keraguan, (putuslah) untuk terdakwa',
    pronunciationGuide: '/ɪn ˈdu.bi.oʊ proʊ ˈreɪ.oʊ/',
    legalFields: ['pidana', 'tata-negara'],
    synonyms: ['Asas keuntungan bagi terdakwa', 'Benefit of the doubt (Common Law)'],
    usedIn: ['Indonesia', 'Belanda', 'Jerman', 'Prancis', 'negara-negara yang meratifikasi instrumen HAM internasional'],
    classification: {
      legalBranch: 'Hukum Acara Pidana, Hukum Hak Asasi Manusia',
      nature: 'Imperatif',
      applicationLevel: 'Nasional',
      traditionSource: 'Hukum Romawi, Hukum Kanonik, dan filsafat hukum Pencerahan',
    },
    applicabilityStatus: {
      validInIndonesia: true,
      validInternationally: true,
      recognizedByDoctrine: true,
      codified: true,
      notes: 'Asas Fundamental dalam Hukum Acara Pidana',
    },
    legalMeaning: `In Dubio Pro Reo adalah sebuah maksim hukum Latin yang berarti "jika ada keraguan, putusan harus menguntungkan terdakwa." Asas ini berfungsi sebagai mekanisme pengaman (safeguard) terakhir dalam sistem peradilan pidana untuk mencegah terjadinya kesalahan penghukuman (miscarriage of justice). Asas ini menetapkan bahwa beban pembuktian (burden of proof) sepenuhnya berada pada penuntut umum, dan apabila penuntut umum gagal membuktikan unsur-unsur dakwaan melampaui keraguan yang wajar (beyond reasonable doubt), maka hakim wajib memberikan keputusan yang menguntungkan terdakwa, yaitu pembebasan (vrijspraak).

Fungsi utama dari asas ini adalah menyeimbangkan ketimpangan kekuasaan antara negara (yang memiliki aparat, anggaran, dan kekuatan memaksa) dengan individu terdakwa. Dalam filsafat hukum pidana, lebih baik membebaskan sepuluh orang yang bersalah daripada menghukum satu orang yang tidak bersalah (Blackstone's ratio). Oleh karena itu, keraguan tidak boleh diisi dengan asumsi atau prasangka hakim, melainkan harus diselesaikan dengan membatalkan dakwaan.

Ruang lingkup penerapan asas ini secara ketat dibatasi pada ranah hukum pidana. Dalam menentukan apakah suatu perbuatan terbukti atau tidak, dan dalam menentukan berat ringannya pidana (jika terdapat keraguan antara dua ketentuan pidana), asas ini menjadi pedoman wajib bagi majelis hakim. Asas ini tidak berlaku dalam hukum perdata, di mana standar pembuktiannya adalah "keseimbangan probabilitas" (preponderance of evidence) dan keraguan dapat diselesaikan dengan beban pembuktian terbalik atau sumpah.`,
    wordByWord: [
      { word: 'In', meaning: 'Di dalam, dalam keadaan' },
      { word: 'Dubio', meaning: 'Keraguan, ketidakpastian' },
      { word: 'Pro', meaning: 'Untuk, demi, membela' },
      { word: 'Reo', meaning: 'Terdakwa, tertuduh' },
    ],
    wordByWordExtended: [
      { word: 'In', latinForm: 'In', partOfSpeech: 'Preposisi', meaning: 'Di dalam, dalam keadaan' },
      { word: 'Dubio', latinForm: 'Dubium, -ii (n)', partOfSpeech: 'Nomina (Ablatif)', meaning: 'Keraguan, ketidakpastian' },
      { word: 'Pro', latinForm: 'Pro', partOfSpeech: 'Preposisi', meaning: 'Untuk, demi, membela' },
      { word: 'Reo', latinForm: 'Reus, -i (m)', partOfSpeech: 'Nomina (Ablatif)', meaning: 'Terdakwa, tertuduh' },
    ],
    etymologyNotes: 'Frasa ini merupakan klausa kondisional yang disingkat. In Dubio (dalam keadaan keraguan) menggunakan kasus Ablatif untuk menunjukkan keadaan atau kondisi. Pro Reo (untuk terdakwa) juga menggunakan kasus Ablatif setelah preposisi pro. Secara harfiah, struktur ini menyatakan sebuah perintah atau aturan keputusan: "Apabila kondisi yang ada adalah keraguan, maka keputusan harus diarahkan demi kepentingan terdakwa."',
    philosophicalMeaning: {
      origin: 'Lahir dari filosofi Rechtsstaat yang menempatkan martabat manusia di atas efisiensi penegakan hukum.',
      justiceValue: 'Humanisme Hukum: Menghargai nyawa, kebebasan, dan harta benda individu yang tak boleh dirampas kecuali dengan kepastian mendekati absolut.',
      romanThought: 'Prinsip beban pembuktian pada pendakwa (ei incumbit probatio qui dicit) sudah dikenal di hukum Romawi meski penerapannya belum seketat sekarang.',
      modernRelevance: 'Perlindungan terhadap kesewenang-wenangan negara dan konsekuensi logis dari Praduga Tak Bersalah.',
    },
    history: 'Berakar dari Hukum Romawi, dikembangkan dalam Hukum Kanonik abad ke-13, diperkuat oleh filsuf Pencerahan seperti Cesare Beccaria dan William Blackstone, hingga diadopsi dalam hukum modern Indonesia melalui KUHAP.',
    historyTimeline: [
      { era: 'Romawi Kuno', period: 'Romawi Kuno', description: 'Prinsip dasar beban pembuktian ada pada pendakwa (ei incumbit probatio qui dicit) sudah dikenal.' },
      { era: 'Hukum Kanonik', period: 'Abad ke-13', description: 'Paus Innosensius III mulai merumuskan keraguan harus ditafsirkan demi kepentingan terdakwa (membatasi penyiksaan).' },
      { era: 'Pencerahan Eropa', period: 'Abad ke-18', description: 'William Blackstone merumuskan rasio: "Lebih baik sepuluh orang bersalah lolos daripada satu orang tidak bersalah menderita."' },
      { era: 'Indonesia', period: '1981', description: 'Transisi ke KUHAP yang lebih accusatorial mengadopsi asas ini dalam Pasal 183 (minimal 2 alat bukti dan keyakinan).' },
    ],
    doctrineDevelopment: [
      { era: 'Doktrin Keyakinan Hakim Murni (Usang)', description: 'Hakim menghukum berdasarkan "keyakinan" tanpa bukti cukup. Telah ditinggalkan karena rentan subjektivitas.' },
      { era: 'Doktrin Beyond Reasonable Doubt', description: 'Keraguan harus "wajar", bukan imajiner. Jika wajar, In Dubio Pro Reo aktif.' },
      { era: 'Doktrin Pembuktian Terbalik', description: 'Dalam Tipikor, ada pergeseran beban pembuktian, namun tidak menghapus asas ini untuk unsur pokok delik.' },
    ],
    elements: [
      'Adanya Proses Peradilan Pidana: Hanya relevan dalam pemeriksaan perkara pidana di pengadilan.',
      'Adanya Dakwaan: Harus ada tuduhan formal oleh penuntut umum.',
      'Kegagalan Pembuktian: Penuntut umum gagal menghadirkan bukti sah membuktikan semua unsur.',
      'Kehadiran Keraguan yang Wajar (Reasonable Doubt): Ada keraguan logis dan beralasan yang tak dapat dihilangkan oleh bukti.'
    ],
    conditions: [
      'Keraguan Bersifat Wajar (Reasonable): Didasarkan analisis objektif bukti, bukan perasaan/simpati hakim.',
      'Keraguan Mengenai Fakta/Unsur Dakwaan: Berkaitan substansi kesalahan, bukan hal prosedural.',
      'Beban Pembuktian Telah Diberikan Penuh: Jaksa telah selesai menyajikan seluruh bukti.'
    ],
    exceptions: [
      'Tidak ada pengecualian mutlak dalam due process of law hukum pidana.',
      'Pembuktian Terbalik Terbatas: Kegagalan membuktikan harta bukan korupsi tidak membebaskan jaksa membuktikan unsur pokok korupsi.',
      'Tidak berlaku untuk sanksi administrasi di mana standar pembuktiannya lebih rendah.'
    ],
    scope: {
      applies: [
        'Penentuan suatu perbuatan terbukti atau tidak (vrijspraak/pembebasan)',
        'Penentuan berat ringannya pidana',
        'Penilaian kredibilitas saksi dan alat bukti oleh hakim'
      ],
      doesNotApply: [
        'Hukum Perdata (preponderance of evidence)',
        'Hukum Administrasi Negara',
        'Proses penyelidikan dan penyidikan polisi'
      ]
    },
    indonesianLegalBasis: 'Asas ini adalah operasionalisasi dari Pasal 183 KUHAP dan turunan dari hak konstitusional UUD 1945.',
    legalBasisTable: [
      { statute: 'UUD 1945', article: 'Pasal 28D ayat (1)', relevance: 'Jaminan konstitusional kepastian hukum yang adil.' },
      { statute: 'KUHAP', article: 'Pasal 8', relevance: 'Dasar Praduga Tak Bersalah.' },
      { statute: 'KUHAP', article: 'Pasal 183', relevance: 'Operasionalisasi In Dubio Pro Reo: Minimal 2 alat bukti dan keyakinan hakim.' },
      { statute: 'KUHAP', article: 'Pasal 191 ayat (1)', relevance: 'Terdakwa diputus bebas jika kesalahan tidak terbukti sah dan meyakinkan.' },
      { statute: 'UU No. 12 Tahun 2005', article: 'Pasal 14 ayat (2) ICCPR', relevance: 'Pengakuan internasional hak dianggap tidak bersalah.' }
    ],
    indonesianSystemRelation: 'Hakim wajib memutus Vrijspraak (Bebas) jika ragu. Penuntut Umum dipaksa membangun dakwaan solid. Advokat menggunakannya untuk menciptakan reasonable doubt.',
    normativeExamples: [
      'KUHAP Psl 183: Jika hanya ada 1 saksi tanpa alat bukti lain, syarat tidak terpenuhi, wajib bebas.',
      'KUHAP Psl 185(2): Pernyataan 1 saksi saja tidak cukup membuktikan kesalahan.',
      'UU 48/2009 Psl 5(1): Penggalian nilai keadilan tidak boleh melanggar pembuktian sah.'
    ],
    practicalExamples: [
      'Hanya ada keterangan saksi korban tanpa visum/saksi lain. Terdakwa harus dibebaskan (Bebas).',
      'Keraguan kualifikasi: Sengaja membunuh (mati) atau penganiayaan berat (lebih ringan)? Hakim pilih yang lebih ringan.',
      'Pengakuan tanpa alat bukti lain tidak menghilangkan keraguan, terdakwa harus dibebaskan.'
    ],
    caseExamples: [],
    jurisprudence: [
      { id: 'mk-21-2014', courtName: 'Mahkamah Konstitusi', caseNumber: '21/PUU-XII/2014', year: 2014, excerpt: 'MK menegaskan praduga tak bersalah adalah hak konstitusional. Beban pembuktian pada penuntut umum, keraguan menguntungkan terdakwa.', context: 'Pengujian UU KPK', summary: 'Menegaskan landasan konstitusional turunan praduga tak bersalah.', sourceUrl: 'https://www.mkri.id' },
      { id: 'ma-1890-2018', courtName: 'Mahkamah Agung', caseNumber: '1890 K/Pid/2018', year: 2018, excerpt: 'MA konsisten membatalkan putusan yang menghukum hanya berdasarkan 1 saksi tanpa alat bukti lain pendukung.', context: 'Kekuatan Saksi Tunggal', summary: 'Aplikasi murni In Dubio Pro Reo (1 saksi ciptakan keraguan tak terhilangkan).', sourceUrl: 'https://www.mahkamahagung.go.id' },
      { id: 'ma-550-2012', courtName: 'Mahkamah Agung', caseNumber: '550 K/Pid/2012', year: 2012, excerpt: 'Keyakinan hakim bukan perasaan subjektif tapi dari penilaian logis minimal 2 bukti sah.', context: 'Penilaian Keyakinan Hakim', summary: 'Penilaian logis harus hilangkan keraguan wajar.', sourceUrl: 'https://www.mahkamahagung.go.id' }
    ],
    internationalComparisons: [
      { country: 'Belanda', status: 'Dikenal', description: 'Diterapkan sangat ketat. Hoge Raad membatalkan putusan jika keraguan wajar tak hilang.' },
      { country: 'Jerman', status: 'Dikenal', description: 'Zweifelssatz (§ 261 StPO). Jika keyakinan hakim tak tercapai, keraguan untungkan terdakwa.' },
      { country: 'Inggris', status: 'Dikenal', description: 'Golden Thread. Jaksa wajib buktikan beyond reasonable doubt, jika gagal juri bebaskan.' },
      { country: 'Amerika Serikat', status: 'Dikenal', description: 'Benefit of the doubt integral dalam beyond reasonable doubt untuk vonis Not Guilty.' }
    ],
    maximComparisons: [
      { maximId: 'presumptio-innocentiae', latinPhrase: 'Presumption of Innocence', whenUsed: 'Status terdakwa, In Dubio Pro Reo adalah aturan keputusannya.' }
    ],
    analysis: {
      purpose: 'Mencegah miscarriage of justice dan melindungi individu dari kekuatan negara berlebihan.',
      protectedValues: 'Martabat manusia, kebebasan individu, integritas sistem peradilan.',
      advantages: 'Standar pembuktian sangat tinggi meminimalkan risiko penghukuman orang tak bersalah.',
      critique: 'Sering dianggap masyarakat awam "membebaskan penjahat karena celah teknis", hambat penegakan hukum.',
      limitations: 'Bergantung kualitas penyidikan. Jika polisi gagal kumpulkan bukti, terdakwa "terpaksa" dibebaskan.'
    },
    scholarViews: [
      { name: 'Prof. Dr. Andi Hamzah, S.H.', view: 'Pasal 185(2) (satu saksi tak cukup) manifestasi In Dubio Pro Reo, cegah kesewenang-wenangan.', source: 'Asas-Asas Hukum Pidana' },
      { name: 'Prof. E.Y. Kanter, S.H. & S.R. Sianturi, S.H.', view: 'Keyakinan hakim bukan mistis tapi logis, bila sisa keraguan wajar, wajib bebaskan.', source: 'Asas-Asas Hukum Pidana di Indonesia dan Penerapannya' },
      { name: 'Prof. Dr. Romli Atmasasmita, S.H., LL.M.', view: 'Benteng terakhir HAM terdakwa, upaya pelemahan standar pembuktian menggerus asas ini.' }
    ],
    controversies: [
      { title: 'Persepsi Publik vs Realitas Hukum', description: 'Putusan bebas akibat kurang bukti sering dituduh "mafia hukum", padahal hakim terapkan kewajiban In Dubio Pro Reo.' }
    ],
    commonMistakes: [
      { misconception: '"Asas ini berarti terdakwa pasti tidak bersalah."', fact: 'Hanya berarti dakwaan tidak terbukti hukum, secara faktual bisa saja bersalah tapi negara gagal.' },
      { misconception: '"Berlaku di pengadilan perdata."', fact: 'Di perdata pakai preponderance of evidence, tak otomatis untungkan tergugat bila ragu.' },
      { misconception: '"Hakim bebaskan karena kasihan."', fact: 'Harus atas dasar keraguan wajar bukti, bukan simpati subjektif.' },
      { misconception: '"Sama dengan ONS (Lepas Tuntutan)."', fact: 'ONS karena cacat formil. In Dubio berujung Vrijspraak (Bebas) karena tak terbukti.' }
    ],
    faq: [
      { question: 'Berlaku jika terdakwa mengaku?', answer: 'Ya, pengakuan tanpa bukti lain (Psl 185 KUHAP) tak hapus keraguan, wajib bebas.' },
      { question: 'Bagaimana jika 50-50?', answer: 'Wajib bebas, keraguan wajar masih ada.' },
      { question: 'Berlaku penentuan berat hukuman?', answer: 'Ya, pilih kualifikasi lebih ringan (Lex Mitior).' },
      { question: 'Siapa penentu keraguan "wajar"?', answer: 'Hakim, melalui pertimbangan logis objektif.' },
      { question: 'Korban bisa banding putusan bebas?', answer: 'Di Indonesia, hak banding vonis bebas HANYA untuk terdakwa (Psl 233 KUHAP).' }
    ],
    maximNotes: 'Pembedaan Vrijspraak (Bebas karena tak terbukti berdasar asas ini) dan ONS (Cacat Formil). Pledoi yang baik cukup menciptakan keraguan wajar.',
    relatedTerms: [
      { term: 'Presumption of Innocence', definition: 'Praduga Tak Bersalah' },
      { term: 'Burden of Proof', definition: 'Beban Pembuktian' },
      { term: 'Beyond Reasonable Doubt', definition: 'Di Luar Keraguan yang Wajar' },
      { term: 'Ei Incumbit Probatio Qui Dicit', definition: 'Beban pembuktian pada pendakwa' },
      { term: 'Vrijspraak', definition: 'Putusan Bebas' },
      { term: 'Onslag van Recht Vervolging', definition: 'Lepas dari Segala Tuntutan Hukum (ONS)' },
      { term: 'Lex Mitior', definition: 'Hukum yang lebih ringan' },
      { term: 'Miscarriage of Justice', definition: 'Kesalahan peradilan' },
      { term: 'Corroboration', definition: 'Penguatan bukti' },
      { term: 'Due Process of Law', definition: 'Proses hukum yang adil' }
    ],
    relations: [
      { id: 'presumptio-innocentiae', latinPhrase: 'Presumptio Innocentiae', indonesianMeaning: 'Asas praduga tak bersalah', relationType: 'hierarkis' }
    ],
    references: {
      primary: {
        constitutions: ['Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, Pasal 28D ayat (1).'],
        statutes: [
          'Kitab Undang-Undang Hukum Acara Pidana (KUHAP), Pasal 8, 183, 185, 191.',
          'Undang-Undang Nomor 48 Tahun 2009 tentang Kekuasaan Kehakiman.',
          'Undang-Undang Nomor 12 Tahun 2005 tentang Pengesahan ICCPR.'
        ]
      },
      secondary: {
        books: [
          'Hamzah, Andi. (2017). Asas-Asas Hukum Pidana. Jakarta: Rineka Cipta.',
          'Kanter, E.Y. & Sianturi, S.R. (1982). Asas-Asas Hukum Pidana di Indonesia. Jakarta: Alumni A-HM.',
          'Atmasasmita, Romli. (2013). Sistem Peradilan Pidana. Bandung: Refika Aditama.',
          'Hiariej, E.O.S. (2014). Teori dan Hukum Pidana. Yogyakarta: Cahaya Atma Pustaka.'
        ]
      },
      tertiary: {
        encyclopedias: [
          'Mahkamah Agung Republik Indonesia. Direktori Putusan.',
          'Badan Pembinaan Hukum Nasional (BPHN). Naskah Akademik Hukum Acara Pidana.'
        ]
      }
    },
    furtherReading: [
      { title: 'Kumpulan Karangan Hukum Pidana', author: 'Mardjono Reksodiputro', type: 'buku' },
      { title: 'Hukum Acara Pidana Indonesia', author: 'Andi Hamzah', type: 'buku' },
      { title: 'Jurnal Hukum Pidana dan Kriminologi', author: '-', type: 'jurnal' },
      { title: 'Constitutional Review', author: '-', type: 'jurnal' }
    ],
    meta: {
      categories: ['Asas Hukum', 'Hukum Acara Pidana', 'Hak Asasi Manusia'],
      portals: ['Ilmu Hukum', 'Keadilan Pidana', 'Advokasi'],
      tags: ['In Dubio Pro Reo', 'Asas Keuntungan bagi Terdakwa', 'Pasal 183 KUHAP', 'Beyond Reasonable Doubt', 'Praduga Tak Bersalah', 'Putusan Bebas']
    },
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2026-07-30T00:00:00Z',
  },
  {
    id: 'pacta-sunt-servanda',
    latinPhrase: 'Pacta Sunt Servanda',
    indonesianMeaning: 'Perjanjian harus ditaati',
    literalTranslation: 'Perjanjian-perjanjian harus dihormati',
    legalMeaning: `Asas Pacta Sunt Servanda adalah prinsip fundamental dalam hukum perjanjian yang menyatakan bahwa setiap perjanjian yang dibuat secara sah antara para pihak harus ditaati dan dilaksanakan oleh para pihak yang membuatnya. Asas ini merupakan pondasi dari hukum kontrak baik dalam hukum nasional maupun internasional.`,
    conditions: [
      'perjanjian dibuat secara sah oleh para pihak yang memiliki kecakapan hukum;',
      'memenuhi syarat sahnya perjanjian (seperti Pasal 1320 KUHPerdata);',
      'perjanjian tidak bertentangan dengan undang-undang, ketertiban umum, atau kesusilaan.'
    ],
    history: `Pacta Sunt Servanda merupakan salah satu asas tertua dalam sejarah hukum yang telah ada sejak hukum Romawi kuno. Asas ini kemudian menjadi prinsip dasar dalam hukum perjanjian di era modern dan diakui dalam Konvensi Wina 1969 tentang Hukum Perjanjian Internasional.`,
    indonesianLegalBasis: `Asas ini secara eksplisit tercermin dalam Pasal 1338 ayat (1) Kitab Undang-Undang Hukum Perdata (KUHPerdata) yang menyatakan bahwa semua persetujuan yang dibuat secara sah berlaku sebagai undang-undang bagi mereka yang membuatnya.`,
    practicalExamples: [
      'Kedua belah pihak dalam kontrak sewa-menyewa wajib memenuhi hak dan kewajiban masing-masing sesuai kesepakatan yang tertulis dalam kontrak.'
    ],
    jurisprudence: [],
    references: {
      secondary: {
        books: [
        'Subekti, *Hukum Perjanjian*, Intermasa, Jakarta, 2005.'
      ],
      },
    },
    pronunciationGuide: '[pak-ta sunt ser-van-da]',
    legalFields: ['perdata', 'internasional'],
    wordByWord: [
      { word: 'Pacta', meaning: 'Perjanjian-perjanjian' },
      { word: 'Sunt', meaning: 'Adalah / Harus' },
      { word: 'Servanda', meaning: 'Ditaati / Dihormati / Dilaksanakan' },
    ],
    caseExamples: [],
    relations: [
      { id: 'rebus-sic-stantibus', latinPhrase: 'Rebus Sic Stantibus', indonesianMeaning: 'Keadaan yang berubah dapat mempengaruhi berlakunya perjanjian', relationType: 'berlawanan' },
      { id: 'bonafides', latinPhrase: 'Bona Fides', indonesianMeaning: 'Itikad baik', relationType: 'hierarkis' },
    ],
    isActive: true,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-04-05T00:00:00Z',
  },
  {
    id: 'audiatur-et-altera-pars',
    latinPhrase: 'Audiatur et Altera Pars',
    indonesianMeaning: 'Dengarkan juga pihak yang lain',
    literalTranslation: 'Hendaklah didengar juga pihak lainnya',
    legalMeaning: `Asas Audiatur et Altera Pars menyatakan bahwa dalam setiap proses peradilan, kedua belah pihak harus diberikan kesempatan yang sama untuk didengar dan mengajukan argumen mereka. Asas ini merupakan perwujudan dari prinsip due process of law (hak atas proses hukum yang layak) dan fair trial (peradilan yang adil).`,
    conditions: [
      'adanya sengketa atau perkara hukum di pengadilan;',
      'para pihak dipanggil secara patut dan sah oleh pengadilan;',
      'hakim memberikan kesempatan yang sama dan seimbang bagi setiap pihak untuk mengajukan argumen dan bukti.'
    ],
    history: `Asas ini berasal dari hukum Romawi kuno dan merupakan salah satu prinsip tertua dalam sistem peradilan. Dalam tradisi hukum modern, asas ini menjadi salah satu elemen inti dari the rule of law.`,
    indonesianLegalBasis: `Asas ini tercermin dalam Pasal 4 ayat (1) UU No. 48 Tahun 2009 tentang Kekuasaan Kehakiman yang mengamanatkan peradilan yang adil dan tidak memihak, serta ketentuan dalam KUHAP dan HIR/RBg.`,
    practicalExamples: [
      'Hakim tidak boleh menjatuhkan putusan verstek tanpa memastikan tergugat telah dipanggil secara patut minimal tiga kali.'
    ],
    jurisprudence: [],
    references: {
      secondary: {
        books: [
        'Yahya Harahap, *Hukum Acara Perdata*, Sinar Grafika, Jakarta, 2005.'
      ],
      },
    },
    pronunciationGuide: '[au-di-a-tur et al-te-ra pars]',
    legalFields: ['pidana', 'perdata', 'tata-negara', 'administrasi'],
    wordByWord: [
      { word: 'Audiatur', meaning: 'Hendaklah didengar' },
      { word: 'Et', meaning: 'Dan / Juga' },
      { word: 'Altera', meaning: 'Lain / Yang lainnya' },
      { word: 'Pars', meaning: 'Pihak' },
    ],
    caseExamples: [],
    relations: [
      { id: 'due-process', latinPhrase: 'Due Process of Law', indonesianMeaning: 'Proses hukum yang layak', relationType: 'sinonim' },
      { id: 'audi-alteram-partem', latinPhrase: 'Audi Alteram Partem', indonesianMeaning: 'Dengarkan pihak lain', relationType: 'sinonim' },
    ],
    isActive: true,
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-03-20T00:00:00Z',
  },
  {
    id: 'dura-lex-sed-lex',
    latinPhrase: 'Dura Lex Sed Lex',
    indonesianMeaning: 'Hukumnya keras, tetapi itulah hukum',
    literalTranslation: 'Hukum itu keras, tetapi ia adalah hukum',
    legalMeaning: `Dura Lex Sed Lex menegaskan bahwa hukum harus diterapkan sebagaimana adanya, meskipun penerapannya tampak keras atau tidak adil dalam kasus tertentu. Asas ini menekankan kepastian hukum (rechtszekerheid) sebagai nilai fundamental dalam negara hukum, di mana hakim terikat untuk menerapkan hukum yang berlaku.`,
    conditions: [
      'peraturan hukum telah diundangkan secara sah dan berlaku mengikat;',
      'tidak ada pengecualian atau diskresi hukum yang secara eksplisit diberikan oleh undang-undang tersebut;',
      'norma hukum yang bersangkutan bersifat imperatif (memaksa).'
    ],
    history: `Ungkapan Dura Lex Sed Lex berakar pada tradisi hukum Romawi yang mementingkan kepastian dan ketegasan aturan hukum. Prinsip ini menjadi penting dalam filsafat positivisme hukum hukum modern.`,
    indonesianLegalBasis: `Asas ini berkaitan erat dengan asas legalitas dan kepastian hukum yang dijamin oleh Pasal 28D ayat (1) UUD 1945, di mana setiap orang berhak atas jaminan dan kepastian hukum yang adil.`,
    practicalExamples: [
      'Penerapan batas usia minimum pendaftaran calon kepala daerah secara kaku oleh penyelenggara pemilu sesuai bunyi undang-undang yang berlaku.'
    ],
    jurisprudence: [],
    references: {
      secondary: {
        books: [
        'Satjipto Rahardjo, *Ilmu Hukum*, Citra Aditya Bakti, Bandung, 2000.'
      ],
      },
    },
    pronunciationGuide: '[du-ra leks sed leks]',
    legalFields: ['pidana', 'perdata', 'tata-negara'],
    wordByWord: [
      { word: 'Dura', meaning: 'Keras / Berat' },
      { word: 'Lex', meaning: 'Hukum / Undang-Undang' },
      { word: 'Sed', meaning: 'Tetapi / Namun' },
      { word: 'Lex', meaning: 'Hukum (tetap berlaku)' },
    ],
    caseExamples: [],
    relations: [
      { id: 'summum-jus', latinPhrase: 'Summum Jus, Summa Injuria', indonesianMeaning: 'Keadilan tertinggi bisa menjadi ketidakadilan tertinggi', relationType: 'berlawanan' },
    ],
    isActive: true,
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-02-28T00:00:00Z',
  },
  {
    id: 'lex-superior',
    latinPhrase: 'Lex Superior Derogat Legi Inferiori',
    indonesianMeaning: 'Hukum yang lebih tinggi mengesampingkan hukum yang lebih rendah',
    literalTranslation: 'Hukum yang superior menghapus hukum yang inferior',
    legalMeaning: `Asas Lex Superior menyatakan bahwa dalam hierarki norma hukum, peraturan yang lebih tinggi kedudukannya selalu mengesampingkan peraturan yang lebih rendah apabila terdapat konflik di antara keduanya.`,
    conditions: [
      'terdapat dua peraturan perundang-undangan yang saling bertentangan;',
      'kedua peraturan tersebut memiliki hierarki/tingkatan yang berbeda;',
      'mengatur materi atau substansi yang sama.'
    ],
    history: `Konsep hierarki norma hukum ini pertama kali dikembangkan secara sistematis oleh Hans Kelsen dalam teori Stufenbau des Rechts (piramida norma hukum). Di Indonesia, konsep ini diadopsi sebagai dasar pembentukan tata urutan peraturan perundang-undangan nasional.`,
    indonesianLegalBasis: `Diatur secara eksplisit dalam Pasal 7 UU No. 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-undangan yang menetapkan hierarki peraturan hukum, serta mekanisme pengujian peraturan di Mahkamah Agung dan Mahkamah Konstitusi.`,
    practicalExamples: [
      'Peraturan Daerah (Perda) Provinsi dibatalkan atau dinyatakan tidak berlaku jika bertentangan dengan Undang-Undang.'
    ],
    jurisprudence: [],
    references: {
      secondary: {
        books: [
        'Jimly Asshiddiqie, *Teori Konstitusi dan Hukum Tata Negara*, Konstitusi Press, Jakarta, 2006.'
      ],
      },
    },
    pronunciationGuide: '[leks su-pe-ri-or de-ro-gat le-gi in-fe-ri-o-ri]',
    legalFields: ['tata-negara', 'administrasi'],
    wordByWord: [
      { word: 'Lex', meaning: 'Hukum / Undang-Undang' },
      { word: 'Superior', meaning: 'Lebih Tinggi / Atasan' },
      { word: 'Derogat', meaning: 'Mengesampingkan' },
      { word: 'Legi', meaning: 'Hukum (bentuk dative)' },
      { word: 'Inferiori', meaning: 'Lebih Rendah / Bawahan' },
    ],
    caseExamples: [],
    relations: [
      { id: 'lex-posterior', latinPhrase: 'Lex Posterior Derogat Legi Priori', indonesianMeaning: 'Hukum baru mengesampingkan hukum lama', relationType: 'sinonim' },
      { id: 'lex-specialis', latinPhrase: 'Lex Specialis Derogat Legi Generali', indonesianMeaning: 'Hukum khusus mengesampingkan hukum umum', relationType: 'sinonim' },
    ],
    isActive: true,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-04-01T00:00:00Z',
  },
];

// ─────────────────────────────────────────
// Mock Quiz Data
// ─────────────────────────────────────────

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q-001',
    maximId: 'nullum-crimen',
    question: 'Maksim "Nullum Crimen Sine Lege" berarti:',
    options: [
      'Tidak ada kejahatan tanpa undang-undang',
      'Tidak ada hukuman tanpa undang-undang',
      'Kejahatan tidak dapat dihukum tanpa bukti',
      'Semua orang setara di hadapan hukum',
    ],
    correctIndex: 0,
    explanation: 'Nullum Crimen Sine Lege secara harfiah berarti "tidak ada kejahatan tanpa hukum". Prinsip ini menyatakan bahwa suatu perbuatan hanya dapat diklasifikasikan sebagai kejahatan apabila telah diatur dalam undang-undang yang berlaku sebelum perbuatan tersebut dilakukan.',
    legalField: 'pidana',
    difficulty: 'mudah',
  },
  {
    id: 'q-002',
    maximId: 'lex-specialis',
    question: 'Dalam konflik antara UU KPK dan KUHAP, manakah yang berlaku berdasarkan asas Lex Specialis?',
    options: [
      'KUHAP karena lebih umum',
      'UU KPK karena lebih khusus',
      'Keduanya berlaku bersama',
      'Hakim yang menentukan',
    ],
    correctIndex: 1,
    explanation: 'Berdasarkan asas Lex Specialis Derogat Legi Generali, hukum yang bersifat khusus (UU KPK) mengesampingkan hukum yang bersifat umum (KUHAP). UU KPK adalah lex specialis yang mengatur secara khusus pemberantasan korupsi.',
    legalField: 'pidana',
    difficulty: 'sedang',
  },
  {
    id: 'q-003',
    maximId: 'pacta-sunt-servanda',
    question: '"Pacta Sunt Servanda" merupakan asas fundamental dalam bidang hukum apa?',
    options: [
      'Hukum Pidana',
      'Hukum Tata Negara',
      'Hukum Perjanjian / Kontrak',
      'Hukum Administrasi Negara',
    ],
    correctIndex: 2,
    explanation: 'Pacta Sunt Servanda adalah asas fundamental dalam hukum perjanjian atau hukum kontrak. Asas ini menyatakan bahwa perjanjian yang telah disepakati para pihak mengikat seperti undang-undang bagi mereka.',
    legalField: 'perdata',
    difficulty: 'mudah',
  },
  {
    id: 'q-004',
    maximId: 'in-dubio-pro-reo',
    question: 'Kapan asas "In Dubio Pro Reo" diterapkan dalam persidangan pidana?',
    options: [
      'Ketika terdakwa mengakui perbuatannya',
      'Ketika hakim ragu atas kesalahan terdakwa',
      'Ketika jaksa memiliki bukti kuat',
      'Ketika terdakwa menggunakan hak diam',
    ],
    correctIndex: 1,
    explanation: 'In Dubio Pro Reo diterapkan ketika hakim meragukan terbuktinya kesalahan terdakwa. Dalam kondisi keraguan ini, putusan harus dijatuhkan yang paling menguntungkan terdakwa, sesuai dengan prinsip praduga tak bersalah.',
    legalField: 'pidana',
    difficulty: 'sedang',
  },
  {
    id: 'q-005',
    maximId: 'lex-posterior',
    question: 'Jika UU No. 11/2020 dan UU No. 13/2003 mengatur hal yang sama, mana yang berlaku berdasarkan asas Lex Posterior?',
    options: [
      'UU No. 13/2003 karena lebih dulu ada',
      'UU No. 11/2020 karena lebih baru',
      'Keduanya berlaku secara bersamaan',
      'Hakim bebas memilih yang mana',
    ],
    correctIndex: 1,
    explanation: 'Berdasarkan asas Lex Posterior Derogat Legi Priori, hukum yang lebih baru (UU No. 11/2020) mengesampingkan hukum yang lebih lama (UU No. 13/2003) apabila keduanya mengatur hal yang sama dan sederajat.',
    legalField: 'pidana',
    difficulty: 'mudah',
  },
  {
    id: 'q-006',
    maximId: 'audiatur-et-altera-pars',
    question: '"Audiatur et Altera Pars" paling erat berkaitan dengan prinsip berikut:',
    options: [
      'Kepastian hukum',
      'Asas legalitas',
      'Hak untuk didengar dalam persidangan',
      'Asas retroaktif',
    ],
    correctIndex: 2,
    explanation: 'Audiatur et Altera Pars (dengarkan juga pihak yang lain) berkaitan langsung dengan hak untuk didengar (right to be heard) dalam proses persidangan. Asas ini menjamin fair trial dengan memberikan kesempatan yang sama kepada semua pihak.',
    legalField: 'pidana',
    difficulty: 'sedang',
  },
  {
    id: 'q-007',
    maximId: 'dura-lex-sed-lex',
    question: 'Apa makna dari "Dura Lex Sed Lex"?',
    options: [
      'Hukum yang baik adalah hukum yang adil',
      'Hukumnya keras, tetapi itulah hukum',
      'Tidak ada hukum yang sempurna',
      'Hukum dibuat untuk kebaikan masyarakat',
    ],
    correctIndex: 1,
    explanation: 'Dura Lex Sed Lex secara harfiah berarti "hukumnya keras, tetapi itulah hukum". Prinsip ini menekankan bahwa hukum harus diterapkan sebagaimana adanya, meskipun tampak keras atau tidak adil dalam kasus tertentu, demi menjaga kepastian hukum.',
    legalField: 'pidana',
    difficulty: 'mudah',
  },
  {
    id: 'q-008',
    maximId: 'lex-superior',
    question: 'Asas "Lex Superior Derogat Legi Inferiori" paling sering diterapkan dalam konteks:',
    options: [
      'Konflik antar pasal dalam UU yang sama',
      'Konflik antara peraturan dengan hierarki berbeda',
      'Konflik antara UU lama dan baru',
      'Konflik antara UU umum dan khusus',
    ],
    correctIndex: 1,
    explanation: 'Lex Superior Derogat Legi Inferiori diterapkan ketika terjadi konflik antara peraturan yang berbeda tingkatan hierarkinya. Misalnya, Peraturan Menteri yang bertentangan dengan Peraturan Pemerintah, maka Peraturan Pemerintah (lex superior) yang berlaku.',
    legalField: 'tata-negara',
    difficulty: 'sedang',
  },
  {
    id: 'q-009',
    maximId: 'pacta-sunt-servanda',
    question: 'Pasal KUHPerdata yang mencerminkan asas Pacta Sunt Servanda adalah:',
    options: [
      'Pasal 1320',
      'Pasal 1338',
      'Pasal 1313',
      'Pasal 1457',
    ],
    correctIndex: 1,
    explanation: 'Pasal 1338 KUHPerdata menyatakan bahwa semua perjanjian yang dibuat secara sah berlaku sebagai undang-undang bagi mereka yang membuatnya. Pasal ini merupakan codification dari asas Pacta Sunt Servanda dalam hukum Indonesia.',
    legalField: 'perdata',
    difficulty: 'sulit',
  },
  {
    id: 'q-010',
    maximId: 'nullum-crimen',
    question: 'Di mana asas Nullum Crimen Sine Lege dijamin dalam UUD 1945?',
    options: [
      'Pasal 27',
      'Pasal 28D',
      'Pasal 28I',
      'Pasal 30',
    ],
    correctIndex: 2,
    explanation: 'Asas Nullum Crimen Sine Lege dijamin dalam Pasal 28I UUD 1945 yang menyatakan bahwa hak untuk tidak dituntut atas dasar hukum yang berlaku surut adalah hak asasi manusia yang tidak dapat dikurangi dalam keadaan apapun.',
    legalField: 'pidana',
    difficulty: 'sulit',
  },
];

// ─────────────────────────────────────────
// Mock User Progress Data
// ─────────────────────────────────────────

export const mockUserProgress: UserProgress = {
  userId: 'mock-user-001',
  totalStudied: 12,
  quizzesTaken: 5,
  averageScore: 78,
  streakDays: 5,
  progressByField: {
    'umum': 50,
    'pidana': 60,
    'perdata': 40,
    'properti': 30,
    'keluarga': 10,
    'bisnis': 20,
    'internasional': 20,
    'tata-negara': 80,
    'acara': 0,
    'lain-lain': 0,
    'administrasi': 90,
  },
  flashcardLevels: {
    1: 8,
    2: 14,
    3: 22,
    4: 5,
    5: 1,
  },
};

// ─────────────────────────────────────────
// Utility: Search maxims
// ─────────────────────────────────────────

export function searchMaxims(query: string, fields?: string[]): Maxim[] {
  const q = query.toLowerCase().trim();
  if (!q && (!fields || fields.length === 0)) return mockMaxims;

  // Single letter = alphabetical index mode: match only latinPhrase that STARTS WITH that letter
  const isSingleLetter = /^[a-z]$/.test(q);

  return mockMaxims.filter(m => {
    let matchesQuery = true;
    if (q) {
      if (isSingleLetter) {
        matchesQuery = m.latinPhrase.toLowerCase().startsWith(q);
      } else {
        matchesQuery =
          m.latinPhrase.toLowerCase().includes(q) ||
          m.indonesianMeaning.toLowerCase().includes(q) ||
          m.literalTranslation.toLowerCase().includes(q) ||
          m.legalMeaning.toLowerCase().includes(q);
      }
    }

    const matchesField = !fields || fields.length === 0 ||
      m.legalFields.some(f => fields.includes(f));

    return matchesQuery && matchesField;
  });
}

export function getMaximById(id: string): Maxim | undefined {
  return mockMaxims.find(m => m.id === id);
}

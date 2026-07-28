import type { Maxim, LegalFieldMeta, QuizQuestion, UserProgress } from '@/types';

// ─────────────────────────────────────────
// Legal Fields Metadata
// ─────────────────────────────────────────

export const legalFields: LegalFieldMeta[] = [
  { id: 'pidana', label: 'Hukum Pidana', count: 23, description: 'Maksim yang berkaitan dengan hukum pidana dan kejahatan' },
  { id: 'perdata', label: 'Hukum Perdata', count: 31, description: 'Maksim yang berkaitan dengan hukum perdata dan kontrak' },
  { id: 'tata-negara', label: 'Tata Negara', count: 12, description: 'Maksim yang berkaitan dengan hukum tata negara' },
  { id: 'internasional', label: 'Hukum Internasional', count: 8, description: 'Maksim yang berkaitan dengan hukum internasional' },
  { id: 'administrasi', label: 'Hukum Administrasi', count: 14, description: 'Maksim yang berkaitan dengan hukum administrasi negara' },
];

// ─────────────────────────────────────────
// Mock Maxims Data
// ─────────────────────────────────────────

export const mockMaxims: Maxim[] = [
  {
    id: 'lex-posterior',
    latinPhrase: 'Lex Posterior Derogat Legi Priori',
    indonesianMeaning: 'Hukum yang lebih baru mengesampingkan hukum yang lebih lama',
    literalTranslation: 'Hukum yang datang belakangan menghapus hukum yang terdahulu',
    legalMeaning: `Prinsip Lex Posterior Derogat Priori (Hukum yang baru mengesampingkan hukum yang lama) berarti bahwa jika terdapat dua peraturan perundang-undangan yang sederajat mengatur hal yang sama tetapi dengan ketentuan yang berbeda, maka peraturan yang baru harus diterapkan dan mengesampingkan peraturan yang lama. Ini adalah asas fundamental dalam hierarki peraturan perundang-undangan untuk menghindari konflik norma hukum.

Asas ini sering digunakan dalam penafsiran peraturan ketika terdapat dua undang-undang yang mengatur hal yang sama namun dengan pendekatan atau ketentuan yang berbeda. Hakim dan praktisi hukum menggunakan prinsip ini untuk menentukan regulasi mana yang berlaku dalam suatu kasus konkret.`,
    history: `Lex Posterior berasal dari tradisi hukum Romawi kuno. Prinsip ini pertama kali dikodifikasikan dalam Corpus Juris Civilis oleh Kaisar Justinianus I pada abad ke-6 Masehi. Dalam sistem hukum Indonesia yang menganut civil law, prinsip ini diadopsi dari sistem hukum Belanda dan menjadi bagian dari hierarki norma hukum sebagaimana diatur dalam UU No. 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-undangan.

Prinsip ini mulai diakui dalam yurisprudensi Indonesia sejak masa awal kemerdekaan dan telah dikukuhkan melalui berbagai putusan Mahkamah Agung dan Mahkamah Konstitusi.`,
    pronunciationGuide: '[leks pos-ter-i-or de-ro-gat le-gi pri-o-ri]',
    legalFields: ['pidana', 'perdata'],
    wordByWord: [
      { word: 'Lex', meaning: 'Hukum / Undang-Undang' },
      { word: 'Posterior', meaning: 'Kemudian / Lebih Baru' },
      { word: 'Derogat', meaning: 'Mengesampingkan / Mencabut' },
      { word: 'Legi', meaning: 'Hukum (bentuk dative)' },
      { word: 'Priori', meaning: 'Terdahulu / Lebih Lama' },
    ],
    caseExamples: [
      {
        id: 'ce-001',
        courtName: 'Pengadilan Tinggi DKI Jakarta',
        caseNumber: '123/Pid.B/2020/PT.DKI',
        year: 2020,
        excerpt: 'Dalam kasus ini, Pengadilan Tinggi DKI Jakarta menerapkan asas Lex Posterior Derogat Priori dengan mengutamakan penerapan Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja dibanding ketentuan yang lebih lama dalam Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan, mengingat substansi pengaturan yang sama.',
        summary: 'Penerapan UU Cipta Kerja yang lebih baru mengesampingkan UU Ketenagakerjaan lama dalam kasus sengketa PHK.',
        sourceUrl: '#',
      },
      {
        id: 'ce-002',
        courtName: 'Mahkamah Agung Republik Indonesia',
        caseNumber: '456/Pid.Sus/2019/MA',
        year: 2019,
        excerpt: 'Mahkamah Agung memutuskan bahwa UU No. 8 Tahun 1997 merupakan hukum yang lebih baru daripada UU No. 3 Tahun 1970 dan oleh karenanya berlaku asas lex posterior dalam menentukan hukum yang applicable.',
        summary: 'Mahkamah Agung menegaskan berlakunya asas lex posterior dalam konflik norma antar undang-undang.',
        sourceUrl: '#',
      },
    ],
    relations: [
      { id: 'lex-specialis', latinPhrase: 'Lex Specialis Derogat Legi Generali', indonesianMeaning: 'Hukum khusus mengesampingkan hukum umum', relationType: 'sinonim' },
      { id: 'lex-superior', latinPhrase: 'Lex Superior Derogat Legi Inferiori', indonesianMeaning: 'Hukum yang lebih tinggi mengesampingkan hukum yang lebih rendah', relationType: 'hierarkis' },
      { id: 'lex-anterior', latinPhrase: 'Lex Anterior', indonesianMeaning: 'Hukum yang terdahulu', relationType: 'berlawanan' },
    ],
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'lex-specialis',
    latinPhrase: 'Lex Specialis Derogat Legi Generali',
    indonesianMeaning: 'Hukum khusus mengesampingkan hukum umum',
    literalTranslation: 'Hukum yang bersifat khusus menghapus hukum yang bersifat umum',
    legalMeaning: `Asas Lex Specialis Derogat Legi Generali menyatakan bahwa ketika terjadi konflik antara peraturan hukum yang bersifat umum dengan peraturan hukum yang bersifat khusus, maka peraturan yang khusus yang harus diutamakan dan diterapkan. Asas ini merupakan salah satu dari tiga asas penyelesaian konflik norma hukum (bersama dengan Lex Posterior dan Lex Superior).

Dalam praktik hukum di Indonesia, asas ini sering diterapkan misalnya ketika terjadi konflik antara KUHP (hukum pidana umum) dengan undang-undang pidana khusus seperti UU Pemberantasan Korupsi atau UU Narkotika.`,
    history: `Asas ini berasal dari hukum Romawi dan telah lama diakui dalam tradisi hukum civil law. Di Indonesia, asas ini secara eksplisit diakui dalam sistem peraturan perundang-undangan dan sering dikutip dalam putusan-putusan pengadilan sejak era kolonial Belanda.`,
    pronunciationGuide: '[leks spe-si-a-lis de-ro-gat le-gi ge-ne-ra-li]',
    legalFields: ['pidana', 'perdata', 'administrasi'],
    wordByWord: [
      { word: 'Lex', meaning: 'Hukum / Undang-Undang' },
      { word: 'Specialis', meaning: 'Khusus / Spesifik' },
      { word: 'Derogat', meaning: 'Mengesampingkan / Mencabut' },
      { word: 'Legi', meaning: 'Hukum (bentuk dative)' },
      { word: 'Generali', meaning: 'Umum / General' },
    ],
    caseExamples: [
      {
        id: 'ce-003',
        courtName: 'Mahkamah Konstitusi Republik Indonesia',
        caseNumber: '012/PUU-I/2003',
        year: 2003,
        excerpt: 'MK menegaskan bahwa UU KPK sebagai lex specialis memiliki ketentuan acara pidana yang berbeda dengan KUHAP sebagai lex generalis, dan ketentuan UU KPK-lah yang berlaku dalam proses penuntutan korupsi.',
        summary: 'Mahkamah Konstitusi memperkuat kedudukan UU KPK sebagai lex specialis terhadap KUHAP.',
        sourceUrl: '#',
      },
    ],
    relations: [
      { id: 'lex-posterior', latinPhrase: 'Lex Posterior Derogat Legi Priori', indonesianMeaning: 'Hukum baru mengesampingkan hukum lama', relationType: 'sinonim' },
      { id: 'lex-superior', latinPhrase: 'Lex Superior Derogat Legi Inferiori', indonesianMeaning: 'Hukum lebih tinggi mengesampingkan hukum lebih rendah', relationType: 'hierarkis' },
    ],
    isActive: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
  },
  {
    id: 'nullum-crimen',
    latinPhrase: 'Nullum Crimen Sine Lege',
    indonesianMeaning: 'Tidak ada kejahatan tanpa undang-undang',
    literalTranslation: 'Tidak ada kejahatan tanpa hukum tertulis',
    legalMeaning: `Asas Nullum Crimen Sine Lege adalah prinsip fundamental dalam hukum pidana yang menyatakan bahwa tidak ada perbuatan yang dapat diklasifikasikan sebagai kejahatan dan tidak ada seseorang yang dapat dihukum kecuali berdasarkan undang-undang yang telah ada sebelumnya. Prinsip ini merupakan salah satu pilar terpenting dalam negara hukum (rechtsstaat).

Di Indonesia, asas ini dijamin dalam Pasal 1 ayat (1) KUHP yang berbunyi: "Tiada suatu perbuatan dapat dipidana kecuali atas kekuatan aturan pidana dalam perundang-undangan yang telah ada, sebelum perbuatan dilakukan." Asas ini juga dilindungi oleh UUD 1945 Pasal 28I.`,
    history: `Asas Nullum Crimen Sine Lege pertama kali dirumuskan oleh ahli hukum Jerman Paul Johann Anselm von Feuerbach pada awal abad ke-19 sebagai respons terhadap kesewenang-wenangan penguasa dalam menghukum seseorang. Asas ini kemudian menjadi fondasi utama dari hukum pidana modern di seluruh dunia.

Di Indonesia, asas ini diadopsi dari sistem hukum Belanda melalui Wetboek van Strafrecht yang kemudian menjadi KUHP Indonesia.`,
    pronunciationGuide: '[nul-lum kri-men si-ne le-ge]',
    legalFields: ['pidana'],
    wordByWord: [
      { word: 'Nullum', meaning: 'Tidak ada / Nihil' },
      { word: 'Crimen', meaning: 'Kejahatan / Tindak Pidana' },
      { word: 'Sine', meaning: 'Tanpa' },
      { word: 'Lege', meaning: 'Undang-undang / Hukum' },
    ],
    caseExamples: [
      {
        id: 'ce-004',
        courtName: 'Mahkamah Konstitusi Republik Indonesia',
        caseNumber: '003/PUU-IV/2006',
        year: 2006,
        excerpt: 'MK menegaskan bahwa ketentuan pidana harus jelas dan tertuang dalam undang-undang yang berlaku sebelum perbuatan dilakukan, sesuai dengan asas nullum crimen sine lege yang merupakan jaminan konstitusional dalam Pasal 28I UUD 1945.',
        summary: 'MK memperkuat jaminan konstitusional atas asas legalitas dalam hukum pidana Indonesia.',
        sourceUrl: '#',
      },
    ],
    relations: [
      { id: 'nulla-poena', latinPhrase: 'Nulla Poena Sine Lege', indonesianMeaning: 'Tidak ada hukuman tanpa undang-undang', relationType: 'sinonim' },
      { id: 'in-dubio-pro-reo', latinPhrase: 'In Dubio Pro Reo', indonesianMeaning: 'Dalam keraguan, putuskan yang menguntungkan terdakwa', relationType: 'hierarkis' },
    ],
    isActive: true,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'in-dubio-pro-reo',
    latinPhrase: 'In Dubio Pro Reo',
    indonesianMeaning: 'Dalam keraguan, menguntungkan terdakwa',
    literalTranslation: 'Dalam keraguan, (putuskan) untuk terdakwa',
    legalMeaning: `Asas In Dubio Pro Reo menyatakan bahwa apabila terdapat keraguan dalam membuktikan kesalahan terdakwa, maka hakim harus memutuskan yang paling menguntungkan terdakwa. Asas ini merupakan konsekuensi dari presumption of innocence (asas praduga tak bersalah) dan standar pembuktian "beyond reasonable doubt" dalam hukum pidana.

Dalam hukum acara pidana Indonesia, asas ini tercermin dalam ketentuan bahwa terdakwa hanya dapat dinyatakan bersalah apabila kesalahannya terbukti secara sah dan meyakinkan (Pasal 183 KUHAP).`,
    history: `Asas In Dubio Pro Reo berakar pada tradisi hukum Romawi kuno yang mengutamakan perlindungan individu dari kekuasaan negara. Dalam perkembangan hukum modern, asas ini menjadi prinsip universal yang diadopsi hampir semua sistem hukum pidana demokratis, termasuk melalui instrumen hak asasi manusia internasional.`,
    pronunciationGuide: '[in du-bi-o pro re-o]',
    legalFields: ['pidana'],
    wordByWord: [
      { word: 'In', meaning: 'Dalam' },
      { word: 'Dubio', meaning: 'Keraguan' },
      { word: 'Pro', meaning: 'Untuk / Demi' },
      { word: 'Reo', meaning: 'Terdakwa / Tertuduh' },
    ],
    caseExamples: [
      {
        id: 'ce-005',
        courtName: 'Pengadilan Negeri Jakarta Selatan',
        caseNumber: '789/Pid.B/2021/PN.Jkt.Sel',
        year: 2021,
        excerpt: 'Majelis hakim mempertimbangkan bahwa dengan tidak cukupnya bukti yang meyakinkan, dan berdasarkan asas in dubio pro reo, terdakwa harus dibebaskan dari seluruh dakwaan.',
        summary: 'Penerapan asas in dubio pro reo dalam putusan bebas karena bukti tidak mencukupi.',
        sourceUrl: '#',
      },
    ],
    relations: [
      { id: 'nullum-crimen', latinPhrase: 'Nullum Crimen Sine Lege', indonesianMeaning: 'Tidak ada kejahatan tanpa undang-undang', relationType: 'hierarkis' },
      { id: 'presumptio-innocentiae', latinPhrase: 'Presumptio Innocentiae', indonesianMeaning: 'Asas praduga tak bersalah', relationType: 'sinonim' },
    ],
    isActive: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'pacta-sunt-servanda',
    latinPhrase: 'Pacta Sunt Servanda',
    indonesianMeaning: 'Perjanjian harus ditaati',
    literalTranslation: 'Perjanjian-perjanjian harus dihormati',
    legalMeaning: `Asas Pacta Sunt Servanda adalah prinsip fundamental dalam hukum perjanjian yang menyatakan bahwa setiap perjanjian yang dibuat secara sah antara para pihak harus ditaati dan dilaksanakan oleh para pihak yang membuatnya. Asas ini merupakan pondasi dari hukum kontrak baik dalam hukum nasional maupun internasional.

Di Indonesia, asas ini tercermin dalam Pasal 1338 KUHPerdata yang menyatakan bahwa perjanjian yang dibuat secara sah berlaku sebagai undang-undang bagi mereka yang membuatnya (lex contractus).`,
    history: `Pacta Sunt Servanda merupakan salah satu asas tertua dalam sejarah hukum yang telah ada sejak hukum Romawi kuno. Asas ini kemudian menjadi prinsip dasar dalam hukum perjanjian di era modern dan diakui dalam Konvensi Wina 1969 tentang Hukum Perjanjian Internasional (Vienna Convention on the Law of Treaties) sebagai norma jus cogens.`,
    pronunciationGuide: '[pak-ta sunt ser-van-da]',
    legalFields: ['perdata', 'internasional'],
    wordByWord: [
      { word: 'Pacta', meaning: 'Perjanjian-perjanjian' },
      { word: 'Sunt', meaning: 'Adalah / Harus' },
      { word: 'Servanda', meaning: 'Ditaati / Dihormati / Dilaksanakan' },
    ],
    caseExamples: [
      {
        id: 'ce-006',
        courtName: 'Badan Arbitrase Nasional Indonesia (BANI)',
        caseNumber: 'BANI/ARB/012/2022',
        year: 2022,
        excerpt: 'Majelis arbitrase menerapkan asas pacta sunt servanda dan menyatakan bahwa klausul penyelesaian sengketa melalui arbitrase dalam perjanjian bisnis para pihak harus ditaati, sehingga gugatan di pengadilan negeri harus dinyatakan tidak dapat diterima.',
        summary: 'BANI menegaskan kewajiban para pihak untuk menghormati klausul arbitrase sebagai wujud pacta sunt servanda.',
        sourceUrl: '#',
      },
    ],
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
    legalMeaning: `Asas Audiatur et Altera Pars menyatakan bahwa dalam setiap proses peradilan, kedua belah pihak harus diberikan kesempatan yang sama untuk didengar dan mengajukan argumen mereka. Asas ini merupakan perwujudan dari prinsip due process of law (hak atas proses hukum yang layak) dan fair trial (peradilan yang adil).

Di Indonesia, asas ini terwujud dalam kewajiban hakim untuk memberikan kesempatan yang sama kepada penggugat dan tergugat (dalam perkara perdata) atau penuntut umum dan terdakwa (dalam perkara pidana) untuk mengajukan bukti dan argumen hukum mereka.`,
    history: `Asas ini berasal dari hukum Romawi kuno dan merupakan salah satu prinsip tertua dalam sistem peradilan. Ungkapan ini dikaitkan dengan kisah dewa Zeus yang selalu mendengar kedua belah pihak sebelum memberikan putusan. Dalam tradisi hukum modern, asas ini menjadi salah satu elemen inti dari the rule of law dan diadopsi dalam sistem hukum di seluruh dunia.`,
    pronunciationGuide: '[au-di-a-tur et al-te-ra pars]',
    legalFields: ['pidana', 'perdata', 'tata-negara', 'administrasi'],
    wordByWord: [
      { word: 'Audiatur', meaning: 'Hendaklah didengar' },
      { word: 'Et', meaning: 'Dan / Juga' },
      { word: 'Altera', meaning: 'Lain / Yang lainnya' },
      { word: 'Pars', meaning: 'Pihak' },
    ],
    caseExamples: [
      {
        id: 'ce-007',
        courtName: 'Mahkamah Agung Republik Indonesia',
        caseNumber: '234/Pdt.G/2020/MA',
        year: 2020,
        excerpt: 'Mahkamah Agung membatalkan putusan pengadilan tingkat pertama karena tergugat tidak pernah dipanggil secara patut dan tidak diberikan kesempatan untuk membela diri, yang merupakan pelanggaran asas audiatur et altera pars.',
        summary: 'MA membatalkan putusan PN karena pelanggaran asas audiatur et altera pars akibat tidak dipanggilnya tergugat.',
        sourceUrl: '#',
      },
    ],
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
    legalMeaning: `Dura Lex Sed Lex menegaskan bahwa hukum harus diterapkan sebagaimana adanya, meskipun penerapannya tampak keras atau tidak adil dalam kasus tertentu. Asas ini menekankan kepastian hukum (rechtszekerheid) sebagai nilai fundamental dalam negara hukum, di mana hakim terikat untuk menerapkan hukum yang berlaku.

Dalam praktik, asas ini sering menjadi dasar perdebatan antara kepastian hukum dengan keadilan substansial. Hakim yang menganut positivisme hukum cenderung menerapkan asas ini secara ketat, sementara pendekatan progresif memperkenankan hakim untuk menafsirkan hukum secara lebih fleksibel demi keadilan.`,
    history: `Ungkapan Dura Lex Sed Lex berakar pada tradisi hukum Romawi yang mementingkan kepastian dan ketegasan aturan hukum. Prinsip ini menjadi kontroversial dalam perkembangan filsafat hukum modern, khususnya ketika berhadapan dengan konsep hukum alam (natural law) dan keadilan substansial.`,
    pronunciationGuide: '[du-ra leks sed leks]',
    legalFields: ['pidana', 'perdata', 'tata-negara'],
    wordByWord: [
      { word: 'Dura', meaning: 'Keras / Berat' },
      { word: 'Lex', meaning: 'Hukum / Undang-Undang' },
      { word: 'Sed', meaning: 'Tetapi / Namun' },
      { word: 'Lex', meaning: 'Hukum (tetap berlaku)' },
    ],
    caseExamples: [
      {
        id: 'ce-008',
        courtName: 'Pengadilan Negeri Bandung',
        caseNumber: '567/Pid.B/2019/PN.Bdg',
        year: 2019,
        excerpt: 'Meskipun terdakwa memiliki kondisi sosial ekonomi yang memprihatinkan, majelis hakim menerapkan ketentuan pidana minimum dalam UU Narkotika berdasarkan prinsip dura lex sed lex karena tidak ada ruang diskresi yang diberikan undang-undang.',
        summary: 'PN Bandung menerapkan pidana minimum UU Narkotika dengan mengacu pada prinsip dura lex sed lex.',
        sourceUrl: '#',
      },
    ],
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
    legalMeaning: `Asas Lex Superior menyatakan bahwa dalam hierarki norma hukum, peraturan yang lebih tinggi kedudukannya selalu mengesampingkan peraturan yang lebih rendah apabila terdapat konflik di antara keduanya. Di Indonesia, hierarki peraturan perundang-undangan diatur dalam UU No. 12 Tahun 2011 dengan urutan: UUD 1945, Tap MPR, UU/Perpu, PP, Perpres, Perda Provinsi, dan Perda Kabupaten/Kota.`,
    history: `Konsep hierarki norma hukum ini pertama kali dikembangkan secara sistematis oleh Hans Kelsen dalam teori Stufenbau des Rechts (piramida norma hukum). Di Indonesia, konsep ini diadopsi dan dijadikan dasar pembentukan sistem peraturan perundang-undangan nasional.`,
    pronunciationGuide: '[leks su-pe-ri-or de-ro-gat le-gi in-fe-ri-o-ri]',
    legalFields: ['tata-negara', 'administrasi'],
    wordByWord: [
      { word: 'Lex', meaning: 'Hukum / Undang-Undang' },
      { word: 'Superior', meaning: 'Lebih Tinggi / Atasan' },
      { word: 'Derogat', meaning: 'Mengesampingkan' },
      { word: 'Legi', meaning: 'Hukum (bentuk dative)' },
      { word: 'Inferiori', meaning: 'Lebih Rendah / Bawahan' },
    ],
    caseExamples: [
      {
        id: 'ce-009',
        courtName: 'Mahkamah Agung Republik Indonesia',
        caseNumber: '100/P/HUM/2023',
        year: 2023,
        excerpt: 'Dalam pengujian peraturan perundang-undangan di bawah undang-undang, MA menerapkan asas lex superior dan membatalkan Peraturan Menteri yang bertentangan dengan ketentuan dalam Peraturan Pemerintah sebagai norma yang lebih tinggi.',
        summary: 'MA membatalkan Peraturan Menteri yang bertentangan dengan PP, berdasarkan asas lex superior.',
        sourceUrl: '#',
      },
    ],
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
    'pidana': 60,
    'perdata': 40,
    'tata-negara': 80,
    'internasional': 20,
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

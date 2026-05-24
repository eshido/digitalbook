/**
 * Interactive Test Engine for Digital Book
 * Multiple-choice tests for all lectures based on actual content
 */
const TestEngine = (function() {
    'use strict';

    const testBank = {

        // ===== MODULE 1: АКТ-ға кіріспе =====

        // Lecture 1: АКТ рөлі және стандарттар
        '0-0': {
            title: 'АКТ-ға кіріспе және стандарттар',
            questions: [
                { text: 'АКТ дегеніміз не?', options: [
                    'Ақпаратты іздеу, жинау, сақтау, өңдеу, беру, тарату процестерінің, әдістері мен әдістемелерінің жиынтығы',
                    'Тек компьютерлік бағдарламаларды орнату',
                    'Тек смартфондар мен планшеттер',
                    'Қағаз құжаттарды сақтау жүйесі'], correct: 0 },
                { text: 'ISO/IEC 38500:2008 стандарты немен байланысты?', options: [
                    'Ақпараттық технологиялардың анықтамасымен',
                    'Тамақ өнімдерінің сапасымен',
                    'Құрылыс нормаларымен',
                    'Көлік стандарттарымен'], correct: 0 },
                { text: 'Ақпараттық қоғам дегеніміз не?', options: [
                    'Ақпаратты құрумен, сақтаумен, өңдеумен және жүзеге асырумен айналысатын қоғам',
                    'Тек интернетте отыратын адамдар тобы',
                    'Кітапхана қызметкерлері',
                    'Газет оқитын адамдар'], correct: 0 },
                { text: '«Ақпараттық Қазақстан – 2020» бағдарламасының мақсаты:', options: [
                    'Елдің ақпараттық қоғамға көшуін қамтамасыз ету',
                    'Жаңа стадиондар салу',
                    'Ауыл шаруашылығын толық автоматтандыру',
                    'Барлық көліктерді электромобильге ауыстыру'], correct: 0 },
                { text: 'АКТ-ның денсаулық сақтаудағы рөлі:', options: [
                    'Дәрігерлер мен пациенттер арасындағы байланысты жақсарту және ақпаратты бірлесіп пайдалану',
                    'Дәрі-дәрмек өндіру',
                    'Аурухана салу',
                    'Медициналық құралдарды жөндеу'], correct: 0 },
                { text: 'Қазақстанда ИКТ саласын реттейтін негізгі заң:', options: [
                    '«Ақпараттандыру туралы» Заң (№418-V ЗРК)',
                    '«Салық кодексі»',
                    '«Жер кодексі»',
                    '«Су кодексі»'], correct: 0 },
                { text: '2025 жылы қабылданған жаңа құқықтық құжат:', options: [
                    'Цифрлық кодекс (Digital Code)',
                    'Салық кодексі',
                    'Еңбек кодексі',
                    'Қылмыстық кодекс'], correct: 0 },
                { text: 'Мыңжылдық декларациясы қашан қабылданды?', options: [
                    '2000 жылы БҰҰ мүшелерімен', '1995 жылы', '2005 жылы', '2010 жылы'], correct: 0 },
                { text: 'СТ РК ISO/IEC 27001-2015 стандарты не туралы?', options: [
                    'Ақпараттық қауіпсіздік басқару жүйелері (ISMS)',
                    'Тамақ өнімдерінің сапасы', 'Құрылыс материалдары', 'Ойыншықтар қауіпсіздігі'], correct: 0 },
                { text: 'Қазақстанда ИКТ стандарттарын әзірлейтін техникалық комитет:', options: [
                    'ТК-34 «Ақпараттық технологиялар»', 'ТК-1 «Құрылыс»', 'ТК-50 «Көлік»', 'ТК-100 «Экология»'], correct: 0 }
            ]
        },

        // Lecture 2: Компьютерлік жүйелер
        '0-1': {
            title: 'Компьютерлік жүйелерге кіріспе',
            questions: [
                { text: 'Компьютерлік жүйе дегеніміз не?', options: [
                    'Тікелей компьютердің өзі, жүйелік және қолданбалы бағдарламалық жасақтама орнатылған',
                    'Тек монитор экраны', 'Компьютер тұрған үстел', 'Электр розеткасы'], correct: 0 },
                { text: 'Жергілікті компьютерлік желі дегеніміз:', options: [
                    'Ғимарат немесе кеңсе ішінде орналасуымен шектелген компьютерлер жиынтығы',
                    'Бүкіл әлем бойынша таралған компьютерлер',
                    'Бір ғана компьютер',
                    'Ұялы телефондар тобы'], correct: 0 },
                { text: 'Перфокарта дегеніміз не?', options: [
                    'Саңылаулар арқылы ақпарат сақтайтын картон тасымалдаушы',
                    'Банк картасы', 'Ойын картасы', 'Кітапхана билеті'], correct: 0 },
                { text: 'FTTH дегеніміз не?', options: [
                    'Үйге дейінгі оптикалық талшық (Fiber To The Home)',
                    'Сымсыз интернет технологиясы', 'Спутниктік байланыс', 'Мобильді 4G желісі'], correct: 0 },
                { text: 'Ғаламдық компьютерлік желі дегеніміз:', options: [
                    'Компьютерлер бір-бірінен алшақ, сымды немесе сымсыз әдіспен қосылады',
                    'Бір бөлмедегі компьютерлер',
                    'Өшірулі компьютерлер',
                    'Сынған компьютерлер'], correct: 0 },
                { text: 'Желілер қандай белгілер бойынша жіктеледі?', options: [
                    'Технология түрі, архитектура типі, протокол түрі бойынша',
                    'Түсі, салмағы, өлшемі бойынша',
                    'Бағасы, дүкені бойынша',
                    'Орналасқан қаласы бойынша'], correct: 0 },
                { text: 'Компьютер архитектурасының негізгі компоненттері:', options: [
                    'Есептеу-логикалық мүмкіндіктер, аппараттық құралдар, бағдарламалық қамтамасыз ету',
                    'Монитор, тышқан, пернетақта', 'Үстел, орындық, шам', 'Принтер, сканер, факс'], correct: 0 },
                { text: 'Процессордың (CPU) негізгі қызметі:', options: [
                    'Машиналық нұсқауларды орындау және есептеулер жүргізу',
                    'Деректерді ұзақ мерзімге сақтау', 'Интернетке қосылу', 'Дыбыс шығару'], correct: 0 }
            ]
        },

        // Lecture 3: Software & OS
        '0-2': {
            title: 'Бағдарламалық жасақтама және Операциялық жүйелер',
            questions: [
                { text: 'Операциялық жүйенің негізгі қызметі:', options: [
                    'Аппараттық құралдар мен пайдаланушы қолданбалары арасындағы интерфейс',
                    'Тек мәтін теру', 'Тек интернетке қосылу', 'Тек музыка тыңдау'], correct: 0 },
                { text: 'Жүйелік бағдарламалық қамтамасыз ету дегеніміз:', options: [
                    'Процессорды, жадты, енгізу-шығару арналарын, желілік жабдықтарды басқаратын бағдарламалар кешені',
                    'Тек ойындар жинағы', 'Тек мәтіндік файлдар', 'Музыкалық тректер'], correct: 0 },
                { text: 'Мобильді операциялық жүйелерге жатады:', options: [
                    'Android және iOS', 'Тек Windows', 'Тек Linux', 'Тек Chrome OS'], correct: 0 },
                { text: 'Үстелдік қосымша (desktop app) дегеніміз:', options: [
                    'Компьютерде орнатылып, жергілікті жұмыс істейтін бағдарлама',
                    'Тек браузерде жұмыс істейтін сайт', 'Қағаз құжат', 'SMS хабарлама'], correct: 0 }
            ]
        },

        // Lecture 4: HCI
        '0-3': {
            title: 'Адам мен компьютердің өзара әрекеттесуі',
            questions: [
                { text: 'Пайдаланушы интерфейсі (UI) дегеніміз не?', options: [
                    'Адам мен компьютер/құрылғы арасындағы интерфейс түрі',
                    'Компьютердің артқы панелі', 'Электр сымы', 'Желілік кабель'], correct: 0 },
                { text: 'Пайдаланушы интерфейсін құру үшін не қолданылады?', options: [
                    'Пайдалану дизайны (user experience design)', 'Электр схемасы', 'Құрылыс жоспары', 'Химиялық формула'], correct: 0 },
                { text: 'Модульдік тестілеу дегеніміз не?', options: [
                    'Бағдарламаның жеке модульдерін тексеру (unit-тесттер)',
                    'Бүкіл жүйені тексеру', 'Тек дизайнды тексеру', 'Тек құжаттаманы тексеру'], correct: 0 },
                { text: 'Usability тестілеу дегеніміз:', options: [
                    'Пайдалану ыңғайлылығын тестілеу', 'Жылдамдықты тестілеу', 'Қауіпсіздікті тестілеу', 'Жадты тестілеу'], correct: 0 }
            ]
        },

        // Lecture 5: Database Systems
        '0-4': {
            title: 'Дерекқор жүйелері',
            questions: [
                { text: 'Деректер базасы (ДБ) дегеніміз не?', options: [
                    'Объектілердің жай-күйін және қатынастарын көрсететін мәліметтер жиынтығы',
                    'Жай мәтіндік файл', 'Суреттер топтамасы', 'Музыкалық альбом'], correct: 0 },
                { text: 'ДҚБЖ дегеніміз не?', options: [
                    'ДБ құруға, жүргізуге және бөлісуге арналған тілдік және бағдарламалық құралдар жиынтығы',
                    'Компьютер ойыны', 'Графикалық редактор', 'Мәтіндік процессор'], correct: 0 },
                { text: 'SQL дегеніміз не?', options: [
                    'Құрылымдық сұрау тілі — реляциялық ДҚБЖ-де деректерді сипаттау және манипуляциялау тілі',
                    'Бағдарламалау тілі', 'Веб-сайт жасау құралы', 'Операциялық жүйе'], correct: 0 },
                { text: 'Қалыпқа келтіру (нормализация) дегеніміз:', options: [
                    'ДБ-дағы деректерді ұйымдастыру, кестелер мен қатынастарды ережелерге сәйкес орнату',
                    'Деректерді жою процесі', 'Деректерді бұзу', 'Деректерді ұрлау'], correct: 0 },
                { text: 'ORM дегеніміз не?', options: [
                    'Object-Relational Mapping — нысандық-реляциялық бейнелеу',
                    'Operating Resource Manager', 'Online Reading Mode', 'Output Rendering Module'], correct: 0 },
                { text: 'Тұтастықты шектеу (integrity constraint):', options: [
                    'Дерекқорларға жарамсыз деректерге қол жеткізуді шектейтін құралдар жиынтығы',
                    'Пайдаланушы құпия сөзі', 'Компьютер экранының құлпы', 'Есік кілті'], correct: 0 },
                { text: 'ДҚБЖ үш деңгейлі архитектурасына кіреді:', options: [
                    'Сыртқы деңгей, тұжырымдамалық деңгей, ішкі деңгей',
                    'Жоғарғы, ортаңғы, төменгі қабат', 'Кіру, өңдеу, шығу', 'Бастау, жалғастыру, аяқтау'], correct: 0 }
            ]
        },

        // Lecture 6: Data Analysis
        '0-5': {
            title: 'Деректерді талдау және басқару',
            questions: [
                { text: 'Деректерді талдау дегеніміз не?', options: [
                    'Пайдалы ақпаратты алу және шешім қабылдау мақсатында деректерді зерттеу, сүзу, түрлендіру және модельдеу',
                    'Деректерді жай жинау', 'Деректерді жою', 'Деректерді құпиялау'], correct: 0 },
                { text: 'Data Mining дегеніміз не?', options: [
                    'Деректердің үлкен көлемінен заңдылықтарды табу әдістері',
                    'Көмір өндіру', 'Мұнай өндіру', 'Алтын өндіру'], correct: 0 },
                { text: 'Шешім ағаштары (Decision Trees) дегеніміз:', options: [
                    'Ережелерді иерархиялық, дәйекті құрылымда ұсыну тәсілі',
                    'Бақшадағы ағаштар', 'Орман алқабы', 'Жиһаз материалы'], correct: 0 },
                { text: 'Data Mining негізгі міндеттеріне жатады:', options: [
                    'Жіктеу, кластерлеу, болжау, ассоциация, визуализация',
                    'Сурет салу, ән айту, билеу', 'Кітап оқу, жазу, сурет салу', 'Тамақ пісіру, үй жинау, кір жуу'], correct: 0 }
            ]
        },

        // Lecture 7: Networks
        '0-6': {
            title: 'Желілер және телекоммуникациялар',
            questions: [
                { text: 'Компьютерлік желі дегеніміз не?', options: [
                    'Екі немесе одан да көп компьютерлердің ақпарат алмасу үшін қосылуы',
                    'Электр сымдарының жиынтығы', 'Телефон бағаналары', 'Су құбырлары'], correct: 0 },
                { text: 'Интернет дегеніміз не?', options: [
                    'Бүкіләлемдік компьютерлік желілердің жиынтығы',
                    'Жеке компанияның ішкі желісі', 'Телефон желісі', 'Теледидар желісі'], correct: 0 },
                { text: 'Протокол дегеніміз не?', options: [
                    'Желідегі компьютерлер байланыстарын қолданатын сызықтар мен сигналдардың жалпы жиынтығы',
                    'Саяси құжат', 'Медициналық анықтама', 'Заңды келісім'], correct: 0 },
                { text: 'IP мекенжайы дегеніміз не?', options: [
                    'Желідегі құрылғыны анықтайтын бірегей сандық мекенжай',
                    'Пошталық мекенжай', 'Телефон нөмірі', 'Үй мекенжайы'], correct: 0 }
            ]
        },

        // Lecture 8: Cybersecurity
        '0-7': {
            title: 'Киберқауіпсіздік',
            questions: [
                { text: 'Киберқауіпсіздік дегеніміз не?', options: [
                    'Кибер ортаны, ұйым мен пайдаланушы ресурстарын қорғау құралдары, стратегиялар, қауіпсіздік принциптері',
                    'Компьютерді шаңнан қорғау', 'Ғимаратты өрттен қорғау', 'Автокөлікті ұрланудан қорғау'], correct: 0 },
                { text: 'ISO/IEC 17799:2005 стандарты не туралы?', options: [
                    'Ақпараттық қауіпсіздік менеджментінің практикалық ережелері',
                    'Тамақ сапасы', 'Құрылыс нормалары', 'Көлік қауіпсіздігі'], correct: 0 },
                { text: 'Ақпараттық қауіпсіздіктің негізгі үш қағидасы:', options: [
                    'Құпиялылық, тұтастық, қолжетімділік (CIA)',
                    'Жылдамдық, сапа, баға', 'Дизайн, функционал, ыңғайлылық', 'Кіру, өңдеу, шығу'], correct: 0 }
            ]
        },

        // ===== MODULE 2: Excel бағдарламасында есептеулер =====

        // Lecture 9: Internet Technology
        '1-0': {
            title: 'Интернет технологиясы',
            questions: [
                { text: 'Веб-браузердің негізгі қызметі:', options: [
                    'Веб-беттерді көрсету және интернеттегі ақпаратқа қол жеткізу',
                    'Мәтіндік құжаттарды басып шығару', 'Музыка жазу', 'Фотосуреттерді өңдеу'], correct: 0 },
                { text: 'HTML дегеніміз не?', options: [
                    'Веб-беттердің құрылымын сипаттайтын белгілеу тілі',
                    'Бағдарламалау тілі', 'Дерекқор жүйесі', 'Операциялық жүйе'], correct: 0 },
                { text: 'URL дегеніміз не?', options: [
                    'Интернеттегі ресурстың бірегей мекенжайы',
                    'Пайдаланушы аты', 'Құпия сөз', 'Файл атауы'], correct: 0 }
            ]
        },

        // Lecture 10: Cloud & Mobile
        '1-1': {
            title: 'Бұлтты және мобильді технологиялар',
            questions: [
                { text: 'Бұлтты есептеу (cloud computing) дегеніміз:', options: [
                    'Интернет арқылы есептеу ресурстарын, БҚ және деректерді ұсыну моделі',
                    'Аспандағы бұлттарды зерттеу', 'Ауа райын болжау', 'Ұшақтарды басқару'], correct: 0 },
                { text: 'SOA дегеніміз не?', options: [
                    'Service-Oriented Architecture — қызметке бағытталған архитектура',
                    'Simple Object Access', 'System Operating Area', 'Software Optimization Algorithm'], correct: 0 },
                { text: 'Веб-қызметтер (Web Services) немен алмасады?', options: [
                    'Хабарламалармен (messages)', 'Тауарлармен', 'Қолма-қол ақшамен', 'Қағаз құжаттармен'], correct: 0 }
            ]
        },

        // Lecture 12: SMART Technology
        '1-3': {
            title: 'SMART технологиясы',
            questions: [
                { text: 'SMART технологиясының мақсаты:', options: [
                    'Нақты, өлшенетін, қол жеткізілетін, өзекті және уақытпен шектелген мақсаттар қою',
                    'Жай ғана ақылды болу', 'Көп ақша табу', 'Тез жүгіру'], correct: 0 },
                { text: 'SMART әрпінің мағынасы:', options: [
                    'Specific, Measurable, Achievable, Relevant, Time-bound',
                    'Simple, Manual, Automatic, Remote, Technical',
                    'Small, Medium, Average, Real, Tiny',
                    'Smart, Mobile, Active, Ready, Tested'], correct: 0 },
                { text: 'Жасанды интеллект (AI) дегеніміз:', options: [
                    'Машиналардың адам интеллектісін модельдеу қабілеті',
                    'Табиғи интеллект', 'Жануарлар интеллектісі', 'Өсімдіктердің өсуі'], correct: 0 }
            ]
        },

        // Lecture 13: E-technologies
        '1-4': {
            title: 'E-технологиялар',
            questions: [
                { text: 'Электрондық бизнес (e-business) дегеніміз:', options: [
                    'Интернет арқылы бизнес-процестерді жүзеге асыру',
                    'Компьютер дүкені', 'Электр құрылғыларын жөндеу', 'Электрондық пошта'], correct: 0 },
                { text: 'Электрондық үкімет (e-government) дегеніміз:', options: [
                    'Мемлекеттік қызметтерді электронды түрде көрсету жүйесі',
                    'Онлайн ойын', 'Веб-сайт жасау', 'Электрондық кітап'], correct: 0 },
                { text: 'Электрондық оқыту (e-learning) дегеніміз:', options: [
                    'Цифрлық технологиялар арқылы білім беру және оқыту',
                    'Кітап оқу', 'Дәптерге жазу', 'Тақтада жазу'], correct: 0 }
            ]
        },

        // Lecture 14: Professional ICT
        '1-5': {
            title: 'Кәсіби саладағы ақпараттық технологиялар',
            questions: [
                { text: 'Ақпараттық ресурстар дегеніміз не?', options: [
                    'Ғылым мен практикалық іс-әрекетте алынған және жинақталған ақпарат жиынтығы',
                    'Табиғи ресурстар', 'Қаржылық ресурстар', 'Еңбек ресурстары'], correct: 0 },
                { text: 'Индустриялық АКТ дегеніміз:', options: [
                    'Өнеркәсіпте ақпараттық технологияларды қолдану',
                    'Компьютер ойындарын жасау', 'Фильм түсіру', 'Кітап басып шығару'], correct: 0 }
            ]
        },

        // Lecture 15: ICT Development Perspectives
        '1-6': {
            title: 'АКТ даму перспективалары',
            questions: [
                { text: 'BIPS дегеніміз не?', options: [
                    'Bank Internet Payment System — банкаралық интернет-төлемдер жүйесі',
                    'British International Postal Service', 'Basic Input Processing System', 'Binary Integrated Protocol Standard'], correct: 0 },
                { text: 'Цифрлық экономика дегеніміз:', options: [
                    'Цифрлық технологияларға негізделген экономикалық қызмет',
                    'Қолма-қол ақша экономикасы', 'Бартерлік экономика', 'Ауыл шаруашылығы экономикасы'], correct: 0 }
            ]
        }
    };

    let currentTest = null;
    let userAnswers = {};
    let testSubmitted = false;
    let container = null;

    function init(containerEl) {
        container = containerEl;
    }

    function getTestKey(moduleIndex, lectureIndex) {
        return `${moduleIndex}-${lectureIndex}`;
    }

    function hasTest(moduleIndex, lectureIndex) {
        return !!testBank[getTestKey(moduleIndex, lectureIndex)];
    }

    function startTest(moduleIndex, lectureIndex, title) {
        const key = getTestKey(moduleIndex, lectureIndex);
        currentTest = testBank[key];
        userAnswers = {};
        testSubmitted = false;

        if (!currentTest) {
            container.innerHTML = '<div class="test-intro"><h2>Тест дайындалуда</h2><p>Бұл тарау бойынша тест әзірлену үстінде.</p><p style="margin-top:12px">Бақылау сұрақтарына ауызша дайындалыңыз.</p></div>';
            return;
        }

        renderTestIntro();
    }

    function renderTestIntro() {
        container.innerHTML = `
            <div class="test-intro">
                <h2>${escapeHtml(currentTest.title)}</h2>
                <p>Барлығы <strong>${currentTest.questions.length}</strong> сұрақ. Әр сұрақта бір дұрыс жауап бар.</p>
                <p style="color:var(--text-muted);font-size:14px">Тестті бастау үшін төмендегі батырманы басыңыз</p>
                <button class="btn btn-primary" id="startTestBtn">Тестті бастау</button>
            </div>
        `;
        document.getElementById('startTestBtn').addEventListener('click', renderQuestions);
    }

    function renderQuestions() {
        let html = '';
        currentTest.questions.forEach((q, idx) => {
            html += `
                <div class="test-question" id="q-${idx}">
                    <div class="q-header">
                        <div class="q-number">${idx + 1}</div>
                        <div class="q-text">${escapeHtml(q.text)}</div>
                    </div>
                    <div class="test-options">
                        ${q.options.map((opt, oi) => `
                            <label class="test-option ${userAnswers[idx] === oi ? 'selected' : ''}" data-q="${idx}" data-o="${oi}">
                                <input type="radio" name="q${idx}" value="${oi}" ${userAnswers[idx] === oi ? 'checked' : ''}>
                                ${escapeHtml(opt)}
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        html += `
            <div style="text-align:center; margin-top:24px;">
                <button class="btn btn-primary" id="submitTestBtn">Тестті аяқтау</button>
                <button class="btn btn-secondary" id="clearTestBtn" style="margin-left:8px;">Тазалау</button>
            </div>
            <div id="testResults"></div>
        `;

        container.innerHTML = html;

        container.querySelectorAll('.test-option').forEach(opt => {
            opt.addEventListener('click', function() {
                if (testSubmitted) return;
                const q = parseInt(this.dataset.q);
                const o = parseInt(this.dataset.o);
                const prevSelected = container.querySelector(`.test-option[data-q="${q}"].selected`);
                if (prevSelected) prevSelected.classList.remove('selected');
                this.classList.add('selected');
                userAnswers[q] = o;
                const radio = this.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
            });
        });

        document.getElementById('submitTestBtn').addEventListener('click', submitTest);
        document.getElementById('clearTestBtn').addEventListener('click', clearTest);
        container.scrollIntoView({ behavior: 'smooth' });
    }

    function submitTest() {
        if (testSubmitted) return;

        const answered = Object.keys(userAnswers).length;
        const total = currentTest.questions.length;

        if (answered < total) {
            if (!confirm(`Сіз ${answered}/${total} сұраққа жауап бердіңіз. Барлық жауаптарды тексергіңіз келе ме?`)) return;
        }

        testSubmitted = true;
        let correctCount = 0;

        currentTest.questions.forEach((q, idx) => {
            const userAnswer = userAnswers[idx];
            const options = container.querySelectorAll(`.test-option[data-q="${idx}"]`);
            options.forEach(opt => {
                const oi = parseInt(opt.dataset.o);
                if (oi === q.correct) opt.classList.add('correct');
                if (oi === userAnswer && oi !== q.correct) opt.classList.add('incorrect');
                opt.style.pointerEvents = 'none';
            });
            if (userAnswer === q.correct) correctCount++;
        });

        const percentage = Math.round((correctCount / total) * 100);
        let grade, gradeColor;
        if (percentage >= 90) { grade = 'Өте жақсы!'; gradeColor = 'var(--success)'; }
        else if (percentage >= 70) { grade = 'Жақсы!'; gradeColor = 'var(--success)'; }
        else if (percentage >= 50) { grade = 'Қанағаттанарлық'; gradeColor = 'var(--warning)'; }
        else { grade = 'Қайта дайындалу керек'; gradeColor = 'var(--error)'; }

        document.getElementById('testResults').innerHTML = `
            <div class="test-results">
                <div class="score-label">Нәтиже</div>
                <div class="score">${correctCount}/${total}</div>
                <div class="score-label">${percentage}%</div>
                <div class="score-bar"><div class="score-bar-fill" style="width:${percentage}%"></div></div>
                <p style="color:${gradeColor}; font-weight:600; font-size:18px; margin-top:12px;">${grade}</p>
                <button class="btn btn-primary" id="retryTestBtn" style="margin-top:16px;">Қайта тапсыру</button>
            </div>
        `;

        document.getElementById('retryTestBtn').addEventListener('click', () => {
            userAnswers = {};
            testSubmitted = false;
            renderQuestions();
        });

        document.getElementById('submitTestBtn').style.display = 'none';
        document.getElementById('clearTestBtn').style.display = 'none';
    }

    function clearTest() {
        if (testSubmitted) return;
        userAnswers = {};
        renderQuestions();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    return { init, startTest, hasTest };
})();

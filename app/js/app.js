/**
 * Digital Book App — "Ақпараттық-коммуникациялық технологиялар"
 * Single-page application for educational content in Kazakh
 */
(function() {
    'use strict';

    // === State ===
    let contentData = null;
    let currentView = 'welcome';
    let currentSection = null; // {moduleIndex, type: 'lecture'|'lab', index}
    let fontSize = 16;
    let theme = localStorage.getItem('akt-theme') || 'light';

    // === DOM Elements ===
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const sidebar = $('#sidebar');
    const sidebarNav = $('#sidebarNav');
    const menuBtn = $('#menuBtn');
    const sidebarToggle = $('#sidebarToggle');
    const contentArea = $('#contentArea');
    const welcomeScreen = $('#welcomeScreen');
    const contentView = $('#contentView');
    const testView = $('#testView');
    const contentHeader = $('#contentHeader');
    const contentTitle = $('#contentTitle');
    const contentBody = $('#contentBody');
    const contentFooter = $('#contentFooter');
    const breadcrumbs = $('#breadcrumbs');
    const searchInput = $('#searchInput');
    const searchBtn = $('#searchBtn');
    const searchOverlay = $('#searchOverlay');
    const overlaySearchInput = $('#overlaySearchInput');
    const closeSearch = $('#closeSearch');
    const searchResults = $('#searchResults');
    const themeToggle = $('#themeToggle');
    const fontUp = $('#fontUp');
    const fontDown = $('#fontDown');

    // === Load Content ===
    async function loadContent() {
        try {
            // Electron: use preloaded content from disk
            if (window.electronAPI && window.electronAPI.getContent) {
                contentData = window.electronAPI.getContent();
                if (contentData) {
                    buildNavigation();
                    updateWelcomeStats();
                    return;
                }
            }
            // Browser: fetch over HTTP
            const resp = await fetch('content.json');
            contentData = await resp.json();
            buildNavigation();
            updateWelcomeStats();
        } catch (err) {
            console.error('Failed to load content:', err);
            welcomeScreen.innerHTML = '<div class="welcome-content"><h2>Қате</h2><p>Контентті жүктеу мүмкін болмады</p></div>';
        }
    }

    // === Build Navigation ===
    function buildNavigation() {
        sidebarNav.innerHTML = '';

        // Add home item
        const homeItem = document.createElement('div');
        homeItem.className = 'nav-item';
        homeItem.innerHTML = '<span class="icon">⌂</span> Басты бет';
        homeItem.addEventListener('click', showWelcome);
        sidebarNav.appendChild(homeItem);

        contentData.modules.forEach((mod, modIndex) => {
            const modDiv = document.createElement('div');
            modDiv.className = 'nav-module';

            const modTitle = document.createElement('div');
            modTitle.className = 'nav-module-title';
            modTitle.innerHTML = `<span class="arrow">▼</span> ${escapeHtml(mod.title)}`;
            modTitle.addEventListener('click', () => {
                modDiv.classList.toggle('collapsed');
            });
            modDiv.appendChild(modTitle);

            const modItems = document.createElement('div');
            modItems.className = 'nav-module-items';

            // Lectures section
            if (mod.lectures && mod.lectures.length > 0) {
                const lectLabel = document.createElement('div');
                lectLabel.className = 'nav-section-label';
                lectLabel.textContent = '📖 Дәрістер';
                modItems.appendChild(lectLabel);

                mod.lectures.forEach((lec, lecIndex) => {
                    const item = createNavItem('lecture', lec.title, modIndex, lecIndex, '📄');
                    // Add test badge if test available
                    if (TestEngine.hasTest(modIndex, lecIndex)) {
                        const badge = document.createElement('span');
                        badge.className = 'badge';
                        badge.textContent = 'тест';
                        item.appendChild(badge);
                    }
                    modItems.appendChild(item);
                });
            }

            // Labs section
            if (mod.labs && mod.labs.length > 0) {
                const labLabel = document.createElement('div');
                labLabel.className = 'nav-section-label';
                labLabel.textContent = '🔬 Зертханалық жұмыстар';
                modItems.appendChild(labLabel);

                mod.labs.forEach((lab, labIndex) => {
                    const item = createNavItem('lab', lab.title, modIndex, labIndex, '⚙');
                    modItems.appendChild(item);
                });
            }

            modDiv.appendChild(modItems);
            sidebarNav.appendChild(modDiv);
        });
    }

    function createNavItem(type, title, modIndex, index, icon) {
        const item = document.createElement('div');
        item.className = 'nav-item';
        item.dataset.type = type;
        item.dataset.moduleIndex = modIndex;
        item.dataset.index = index;

        // Shorten title for nav
        let shortTitle = title.replace(/^\d+[\s-]*дәріс[.\s]*/i, '').replace(/^№\s*\d+\s*Зертханалық\s+сабақ[.\s]*/i, '');
        // Truncate if too long
        if (shortTitle.length > 50) {
            shortTitle = shortTitle.substring(0, 48) + '...';
        }
        item.innerHTML = `<span class="icon">${icon}</span> ${escapeHtml(shortTitle)}`;
        item.addEventListener('click', () => {
            navigateTo({ moduleIndex: modIndex, type, index });
        });
        return item;
    }

    // === Navigation ===
    function navigateTo(section) {
        currentSection = section;
        const mod = contentData.modules[section.moduleIndex];

        // Update active state in sidebar
        $$('.nav-item.active').forEach(el => el.classList.remove('active'));
        const navItem = $(`.nav-item[data-type="${section.type}"][data-module-index="${section.moduleIndex}"][data-index="${section.index}"]`);
        if (navItem) navItem.classList.add('active');

        // Show content view
        welcomeScreen.style.display = 'none';
        testView.style.display = 'none';
        contentView.style.display = 'block';

        if (section.type === 'lecture') {
            renderLecture(mod, section.index);
        } else if (section.type === 'lab') {
            renderLab(mod, section.index);
        }

        // Update breadcrumbs
        breadcrumbs.innerHTML = `
            <span onclick="window._showWelcome()">Басты бет</span>
            <span class="sep">›</span>
            <span>${escapeHtml(mod.title)}</span>
        `;

        // Update footer nav
        updateFooterNav(section);

        // Scroll to top
        contentArea.scrollTop = 0;
        window.scrollTo(0, 0);

        // Close mobile sidebar
        sidebar.classList.remove('open');
    }

    function updateFooterNav(section) {
        const mod = contentData.modules[section.moduleIndex];
        const allSections = [];

        contentData.modules.forEach((m, mi) => {
            m.lectures.forEach((_, li) => allSections.push({ moduleIndex: mi, type: 'lecture', index: li }));
            m.labs.forEach((_, li) => allSections.push({ moduleIndex: mi, type: 'lab', index: li }));
        });

        const currentIdx = allSections.findIndex(
            s => s.moduleIndex === section.moduleIndex && s.type === section.type && s.index === section.index
        );

        const prev = currentIdx > 0 ? allSections[currentIdx - 1] : null;
        const next = currentIdx < allSections.length - 1 ? allSections[currentIdx + 1] : null;

        contentFooter.innerHTML = '';

        if (prev) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'footer-nav-btn';
            prevBtn.innerHTML = '<span class="arrow-left">←</span> Алдыңғы';
            prevBtn.addEventListener('click', () => navigateTo(prev));
            contentFooter.appendChild(prevBtn);
        } else {
            contentFooter.appendChild(document.createElement('span'));
        }

        if (next) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'footer-nav-btn';
            nextBtn.innerHTML = 'Келесі <span class="arrow-right">→</span>';
            nextBtn.addEventListener('click', () => navigateTo(next));
            contentFooter.appendChild(nextBtn);
        } else {
            contentFooter.appendChild(document.createElement('span'));
        }
    }

    // === Shared paragraph renderer ===
    function renderParagraphs(paragraphs) {
        if (!paragraphs || !Array.isArray(paragraphs)) return '';
        let html = '';
        for (const p of paragraphs) {
            // Handle string paragraphs
            if (typeof p === 'string') {
                html += `<p>${formatText(p)}</p>`;
                continue;
            }
            // Handle object paragraphs {text, images}
            if (typeof p === 'object' && p !== null) {
                const text = typeof p.text === 'string' ? p.text : '';
                const imgs = Array.isArray(p.images) ? p.images : [];
                if (text) {
                    html += `<p>${formatText(text)}</p>`;
                }
                if (imgs.length > 0) {
                    html += renderImages(imgs);
                }
            }
        }
        return html;
    }

    function renderImages(images) {
        if (!images || images.length === 0) return '';
        return images.map(img => {
            const fname = typeof img === 'string' ? img : (img.filename || img.name || String(img));
            const src = `images/${fname}`;
            if (fname.toLowerCase().endsWith('.wmf')) {
                return `<div class="image-note">[Сурет: ${escapeHtml(fname)} — WMF форматы, браузерде көрсетілмейді]</div>`;
            }
            return `<figure class="content-figure">
                <img src="${src}" alt="Сурет" loading="lazy" class="content-image" onerror="this.parentElement.innerHTML='<div class=\\'image-note\\'>[Сурет: ${escapeHtml(fname)}]</div>'">
            </figure>`;
        }).join('');
    }

    // === Render Lecture ===
    function renderLecture(mod, lecIndex) {
        const lec = mod.lectures[lecIndex];
        contentTitle.textContent = lec.title;

        let html = '<div class="lecture-content">';

        // Action buttons
        html += '<div style="text-align:center; margin-bottom:24px; display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">';
        const moduleIndex = contentData.modules.indexOf(mod);
        if (TestEngine.hasTest(moduleIndex, lecIndex)) {
            html += '<button class="btn btn-primary" id="takeTestBtn">📝 Интерактивті тест</button>';
        }
        html += '<button class="btn btn-secondary" id="printBtn">🖨 Басып шығару</button>';
        html += '</div>';

        // Content paragraphs (new format: array of {text, images} objects)
        const paragraphs = lec.paragraphs || lec.content || [];
        html += renderParagraphs(paragraphs);

        // Control questions
        if (lec.control_questions && lec.control_questions.length > 0) {
            html += '<hr class="section-divider">';
            html += '<div class="control-questions">';
            html += '<h3>Бақылау сұрақтары</h3><ol>';
            lec.control_questions.forEach(q => {
                html += `<li>${formatText(q)}</li>`;
            });
            html += '</ol></div>';
        }

        // References
        if (lec.references && lec.references.length > 0) {
            html += '<div class="references">';
            html += '<strong>Пайдаланылған әдебиеттер:</strong> ';
            html += lec.references.map(r => formatText(r)).join('; ');
            html += '</div>';
        }

        html += '</div>';
        contentBody.innerHTML = html;

        // Wire test button
        const testBtn = document.getElementById('takeTestBtn');
        if (testBtn) {
            testBtn.addEventListener('click', () => startTest(moduleIndex, lecIndex));
        }
        // Wire print button
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => window.print());
        }
    }

    // === Render Lab ===
    function renderLab(mod, labIndex) {
        const lab = mod.labs[labIndex];
        contentTitle.textContent = lab.title;

        let html = '<div class="lecture-content">';

        // Content paragraphs (new format)
        const paragraphs = lab.paragraphs || lab.content || [];
        html += renderParagraphs(paragraphs);

        // Practical tasks (new format: array of arrays of {text, images} objects)
        if (lab.practical_tasks && lab.practical_tasks.length > 0) {
            html += '<hr class="section-divider">';
            html += '<div class="practical-tasks">';
            html += '<h3>Практикалық тапсырмалар</h3>';

            let taskNum = 1;
            for (const taskGroup of lab.practical_tasks) {
                html += '<div class="task-block">';
                if (Array.isArray(taskGroup)) {
                    // Task group: array of paragraph objects
                    for (let ti = 0; ti < taskGroup.length; ti++) {
                        const p = taskGroup[ti];
                        const text = p.text || (typeof p === 'string' ? p : '');
                        const imgs = p.images;
                        if (ti === 0) {
                            // First paragraph = task title
                            html += `<div class="task-number">Тапсырма ${taskNum}</div>`;
                            html += `<p>${formatText(text)}</p>`;
                            if (imgs) html += renderImages(imgs);
                        } else {
                            html += `<p>${formatText(text)}</p>`;
                            if (imgs) html += renderImages(imgs);
                        }
                    }
                } else {
                    // Simple task (string or single object)
                    const text = taskGroup.text || (typeof taskGroup === 'string' ? taskGroup : '');
                    const imgs = taskGroup.images;
                    html += `<div class="task-number">Тапсырма ${taskNum}</div>`;
                    html += `<p>${formatText(text)}</p>`;
                    if (imgs) html += renderImages(imgs);
                }
                html += '</div>';
                taskNum++;
            }
            html += '</div>';
        }

        // Test tasks
        if (lab.test_tasks && lab.test_tasks.length > 0) {
            html += '<hr class="section-divider">';
            html += '<div class="control-questions">';
            html += '<h3>Тест тапсырмалары</h3>';
            lab.test_tasks.forEach((t, i) => {
                html += `<p><strong>${i + 1}.</strong> ${formatText(t)}</p>`;
            });
            html += '</div>';
        }

        html += '</div>';
        contentBody.innerHTML = html;
    }

    // === Test ===
    function startTest(moduleIndex, lecIndex) {
        const mod = contentData.modules[moduleIndex];
        const lec = mod.lectures[lecIndex];

        contentView.style.display = 'none';
        testView.style.display = 'block';
        welcomeScreen.style.display = 'none';

        testView.innerHTML = `
            <div class="test-container" id="testContainer">
                <button class="btn btn-secondary" id="backToLecture" style="margin-bottom:16px;">← Дәріске оралу</button>
            </div>
        `;

        TestEngine.init(document.getElementById('testContainer'));
        TestEngine.startTest(moduleIndex, lecIndex, lec.title);

        document.getElementById('backToLecture').addEventListener('click', () => {
            testView.style.display = 'none';
            contentView.style.display = 'block';
        });

        // Breadcrumbs
        breadcrumbs.innerHTML = `
            <span onclick="window._showWelcome()">Басты бет</span>
            <span class="sep">›</span>
            <span>${escapeHtml(mod.title)}</span>
            <span class="sep">›</span>
            <span>${escapeHtml(lec.title)}</span>
            <span class="sep">›</span>
            <span>Тест</span>
        `;

        contentFooter.innerHTML = '';
        testView.scrollIntoView({ behavior: 'smooth' });
    }

    // === Welcome Screen ===
    function showWelcome() {
        currentSection = null;
        welcomeScreen.style.display = 'flex';
        contentView.style.display = 'none';
        testView.style.display = 'none';
        $$('.nav-item.active').forEach(el => el.classList.remove('active'));
        sidebar.classList.remove('open');
    }

    function updateWelcomeStats() {
        const stats = $('#welcomeStats');
        if (!stats) return;

        let totalLectures = 0, totalLabs = 0, totalQuestions = 0;
        contentData.modules.forEach(m => {
            totalLectures += m.lectures.length;
            totalLabs += m.labs.length;
            m.lectures.forEach(l => totalQuestions += (l.control_questions || []).length);
        });

        stats.innerHTML = `
            <div class="stat-card"><div class="stat-number">${totalLectures}</div><div class="stat-label">Дәрістер</div></div>
            <div class="stat-card"><div class="stat-number">${totalLabs}</div><div class="stat-label">Зертханалық жұмыстар</div></div>
            <div class="stat-card"><div class="stat-number">${totalQuestions}</div><div class="stat-label">Бақылау сұрақтары</div></div>
        `;
    }

    // === Search ===
    function openSearch() {
        searchOverlay.style.display = 'flex';
        overlaySearchInput.focus();
    }

    function closeSearchOverlay() {
        searchOverlay.style.display = 'none';
        overlaySearchInput.value = '';
        searchResults.innerHTML = '';
    }

    function performSearch(query) {
        if (!query || query.length < 2) {
            searchResults.innerHTML = '<p style="padding:20px;text-align:center;color:var(--text-muted)">Іздеу үшін кемінде 2 таңба енгізіңіз</p>';
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = [];

        contentData.modules.forEach((mod, mi) => {
            mod.lectures.forEach((lec, li) => {
                const paras = lec.paragraphs || lec.content || [];
                const texts = paras.map(p => typeof p === 'string' ? p : (p.text || '')).join(' ');
                const allText = [lec.title, texts, ...(lec.control_questions || [])].join(' ');
                if (allText.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        moduleIndex: mi,
                        type: 'lecture',
                        index: li,
                        title: lec.title,
                        moduleTitle: mod.title,
                        preview: findPreview(allText, lowerQuery)
                    });
                }
            });

            mod.labs.forEach((lab, li) => {
                const paras = lab.paragraphs || lab.content || [];
                const texts = paras.map(p => typeof p === 'string' ? p : (p.text || '')).join(' ');
                const tasks = (lab.practical_tasks || []).flat().map(t => typeof t === 'string' ? t : (t.text || '')).join(' ');
                const allText = [lab.title, texts, tasks].join(' ');
                if (allText.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        moduleIndex: mi,
                        type: 'lab',
                        index: li,
                        title: lab.title,
                        moduleTitle: mod.title,
                        preview: findPreview(allText, lowerQuery)
                    });
                }
            });
        });

        if (results.length === 0) {
            searchResults.innerHTML = '<p style="padding:20px;text-align:center;color:var(--text-muted)">Нәтиже табылмады</p>';
        } else {
            searchResults.innerHTML = results.map(r => `
                <div class="search-result-item" data-module="${r.moduleIndex}" data-type="${r.type}" data-index="${r.index}">
                    <div class="result-title">${escapeHtml(r.title)}</div>
                    <div class="result-preview">${r.moduleTitle}</div>
                    <div class="result-context">${r.preview}</div>
                </div>
            `).join('');

            // Add click handlers
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    navigateTo({
                        moduleIndex: parseInt(item.dataset.module),
                        type: item.dataset.type,
                        index: parseInt(item.dataset.index)
                    });
                    closeSearchOverlay();
                });
            });
        }
    }

    function findPreview(text, query) {
        const idx = text.toLowerCase().indexOf(query);
        if (idx === -1) return '...';
        const start = Math.max(0, idx - 40);
        const end = Math.min(text.length, idx + query.length + 60);
        let preview = text.substring(start, end);
        if (start > 0) preview = '...' + preview;
        if (end < text.length) preview = preview + '...';
        // Highlight query
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        return preview.replace(regex, '<mark>$1</mark>');
    }

    // === Theme ===
    function applyTheme() {
        document.documentElement.setAttribute('data-theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀' : '🌓';
        localStorage.setItem('akt-theme', theme);
    }

    function toggleTheme() {
        theme = theme === 'dark' ? 'light' : 'dark';
        applyTheme();
    }

    // === Font Size ===
    function changeFont(delta) {
        fontSize = Math.max(14, Math.min(22, fontSize + delta));
        document.documentElement.style.setProperty('--font-size', fontSize + 'px');
        document.documentElement.style.setProperty('--line-height', (fontSize > 18 ? 1.85 : 1.75));
    }

    // === Utilities ===
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function escapeRegex(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function formatText(text) {
        // Safety: only accept strings
        if (typeof text !== 'string') return '';
        if (!text.trim()) return '';
        // Handle basic formatting: numbers in lists, URLs
        let html = escapeHtml(text);
        // Highlight numbers at start of line (for lists)
        html = html.replace(/^(\d+[.)])\s+/g, '<strong>$1</strong> ');
        // Convert URLs
        html = html.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        return html;
    }

    // === Event Handlers ===
    menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
    sidebarToggle.addEventListener('click', () => sidebar.classList.remove('open'));

    searchBtn.addEventListener('click', openSearch);
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') openSearch();
    });
    searchInput.addEventListener('focus', openSearch);

    closeSearch.addEventListener('click', closeSearchOverlay);
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) closeSearchOverlay();
    });

    overlaySearchInput.addEventListener('input', () => {
        performSearch(overlaySearchInput.value.trim());
    });

    themeToggle.addEventListener('click', toggleTheme);
    fontUp.addEventListener('click', () => changeFont(1));
    fontDown.addEventListener('click', () => changeFont(-1));

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                case 'f':
                    e.preventDefault();
                    openSearch();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    // Navigate back
                    if (currentSection) {
                        const allSections = getAllSections();
                        const idx = findCurrentIndex(allSections);
                        if (idx > 0) navigateTo(allSections[idx - 1]);
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentSection) {
                        const allSections = getAllSections();
                        const idx = findCurrentIndex(allSections);
                        if (idx < allSections.length - 1) navigateTo(allSections[idx + 1]);
                    }
                    break;
            }
        }
        if (e.key === 'Escape') {
            closeSearchOverlay();
            sidebar.classList.remove('open');
        }
    });

    function getAllSections() {
        const all = [];
        contentData.modules.forEach((m, mi) => {
            m.lectures.forEach((_, li) => all.push({ moduleIndex: mi, type: 'lecture', index: li }));
            m.labs.forEach((_, li) => all.push({ moduleIndex: mi, type: 'lab', index: li }));
        });
        return all;
    }

    function findCurrentIndex(sections) {
        return sections.findIndex(s =>
            s.moduleIndex === currentSection.moduleIndex &&
            s.type === currentSection.type &&
            s.index === currentSection.index
        );
    }

    // === Expose globally ===
    window._showWelcome = showWelcome;

    // === Electron IPC: menu actions ===
    if (window.electronAPI && window.electronAPI.onAction) {
        window.electronAPI.onAction((action, payload) => {
            if (action === 'action:font') changeFont(payload);
            if (action === 'action:toggle-theme') toggleTheme();
        });
    }

    // === Init ===
    applyTheme();
    changeFont(0);
    loadContent();

})();

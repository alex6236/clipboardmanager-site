(function () {
  const root = document.querySelector('.chp-demo');
  if (!root) return;

  const lang = root.getAttribute('data-lang') === 'en' ? 'en' : 'ru';
  const iconSrc = root.getAttribute('data-icon') || '';
  const shotSrc = root.getAttribute('data-shot') || '';

  const T = {
    ru: {
      search: 'Поиск по истории…',
      tabs: { history: 'История', groups: 'Группы', snippets: 'Сниппеты', pins: 'Закреплённые' },
      filters: { image: 'Картинки', link: 'Ссылки', email: 'Почта', text: 'Текст' },
      copied: 'Скопировано',
      pinned: 'Закреплено',
      unpinned: 'Откреплено',
      deleted: 'Удалено',
      cleared: 'История очищена, закреплённое осталось',
      emptyHistoryTitle: 'Ничего не скопировано',
      emptyHistoryDesc: 'Скопируйте любой текст — он появится здесь автоматически',
      emptyPinsTitle: 'Нет закреплённых',
      emptyPinsDesc: 'Закрепляйте важное, чтобы не потерять',
      emptySnippetsTitle: 'Нет сниппетов',
      emptySnippetsDesc: 'Сохраняйте частый текст для быстрой вставки',
      emptyGroupsTitle: 'Нет групп',
      emptyGroupsDesc: 'Группы помогают разложить записи по темам',
      nothing: 'Ничего не найдено',
      newGroup: '+ Новая группа',
      newSnippet: '+ Новый сниппет',
      watch: 'Следить за буфером',
      editor: 'Редактор',
      clear: 'Очистить',
      editorToast: 'Это предпросмотр — редактор откроется в расширении',
      clearToast: 'История очищена, закреплённое и сниппеты остались',
      addToast: 'В расширении добавится новая запись',
      settingsToast: 'Настройки откроются в расширении',
      captureToast: 'Снимок делается в расширении',
      moveToast: 'Перенос в группу — в расширении',
      openToast: 'Сайт-источник откроется в расширении',
      editToast: 'Редактирование откроется в расширении',
      copyImageToast: 'Картинка копируется в расширении',
      saveToast: 'Файл сохранится в расширении',
      imagePreview: 'Изображение',
      imageCopy: 'Копировать',
      imageEdit: 'Редактировать',
      imageSave: 'Сохранить',
      imageDelete: 'Удалить',
      close: 'Закрыть',
      aria: {
        copy: 'Копировать', pin: 'Закрепить', unpin: 'Открепить', del: 'Удалить',
        move: 'В группу', up: 'Выше', down: 'Ниже', open: 'Открыть источник', edit: 'Редактировать',
        clearSearch: 'Очистить поиск', capture: 'Снять скриншот', add: 'Добавить запись', settings: 'Настройки',
        preview: 'Открыть изображение', theme: 'Сменить тему'
      }
    },
    en: {
      search: 'Search clipboard history…',
      tabs: { history: 'History', groups: 'Groups', snippets: 'Snippets', pins: 'Pinned' },
      filters: { image: 'Images', link: 'Links', email: 'Emails', text: 'Text' },
      copied: 'Copied',
      pinned: 'Pinned',
      unpinned: 'Unpinned',
      deleted: 'Deleted',
      cleared: 'History cleared, pinned items kept',
      emptyHistoryTitle: 'Nothing copied yet',
      emptyHistoryDesc: 'Copy any text and it will appear here automatically',
      emptyPinsTitle: 'No pinned items',
      emptyPinsDesc: 'Pin important items to keep them forever',
      emptySnippetsTitle: 'No snippets yet',
      emptySnippetsDesc: 'Create reusable snippets for quick access',
      emptyGroupsTitle: 'No groups yet',
      emptyGroupsDesc: 'Groups help organize copied items by category',
      nothing: 'Nothing found',
      newGroup: '+ New group',
      newSnippet: '+ New snippet',
      watch: 'Watch clipboard',
      editor: 'Editor',
      clear: 'Clear',
      editorToast: 'This is a preview — the editor opens in the extension',
      clearToast: 'History cleared, pinned items and snippets kept',
      addToast: 'A new item would be added in the extension',
      settingsToast: 'Settings open in the extension',
      captureToast: 'Screenshots are taken in the extension',
      moveToast: 'Moving to a group happens in the extension',
      openToast: 'The source site opens in the extension',
      editToast: 'Editing opens in the extension',
      copyImageToast: 'Images are copied in the extension',
      saveToast: 'The file is saved in the extension',
      imagePreview: 'Image',
      imageCopy: 'Copy',
      imageEdit: 'Edit',
      imageSave: 'Save',
      imageDelete: 'Delete',
      close: 'Close',
      aria: {
        copy: 'Copy', pin: 'Pin', unpin: 'Unpin', del: 'Delete',
        move: 'To group', up: 'Move up', down: 'Move down', open: 'Open source', edit: 'Edit',
        clearSearch: 'Clear search', capture: 'Take a screenshot', add: 'Add item', settings: 'Settings',
        preview: 'Open image', theme: 'Switch theme'
      }
    }
  }[lang];

  const DATA = {
    ru: {
      items: [
        { type: 'text', text: 'Реквизиты для договора: ИНН 231003822887', time: 'сейчас', pinned: true },
        { type: 'text', text: 'Weekly report: milestone 2 shipped — API review', time: '09:02' },
        { type: 'image', text: 'Скриншот 1348×652', time: '18:40', badge: 'снимок' },
        { type: 'text', text: 'npm install @fluentui/react --save', time: '08:47', badge: 'код' },
        { type: 'link', text: 'https://learn.microsoft.com/en-us/windows/win32/api/', time: 'вчера', badge: 'ссылка' },
        { type: 'email', text: 'alexey@clipboardmanager.ru', time: 'вчера', badge: 'почта' },
        { type: 'text', text: 'Invoice #1042 — $49.00, paid 2026-10-21', time: '21.10' }
      ],
      snippets: [
        { title: 'Реквизиты', text: 'ИНН 231003822887 · ОГРНИП 321770000000000' },
        { title: 'Адрес офиса', text: 'Москва, Пресненская набережная, 12' },
        { title: 'Подпись письма', text: 'С уважением, Алексей Савица' }
      ]
    },
    en: {
      items: [
        { type: 'text', text: 'Invoice details: VAT ID 231003822887', time: 'now', pinned: true },
        { type: 'text', text: 'Weekly report: milestone 2 shipped — API review', time: '09:02' },
        { type: 'image', text: 'Screenshot 1348×652', time: '18:40', badge: 'image' },
        { type: 'text', text: 'npm install @fluentui/react --save', time: '08:47', badge: 'code' },
        { type: 'link', text: 'https://learn.microsoft.com/en-us/windows/win32/api/', time: 'yesterday', badge: 'link' },
        { type: 'email', text: 'alexey@clipboardmanager.ru', time: 'yesterday', badge: 'email' },
        { type: 'text', text: 'Invoice #1042 — $49.00, paid 2026-10-21', time: '21.10' }
      ],
      snippets: [
        { title: 'Invoice details', text: 'VAT ID 231003822887' },
        { title: 'Office address', text: 'Moscow, Presnenskaya emb. 12' },
        { title: 'Email signature', text: 'Best regards, Alexey Savitsa' }
      ]
    }
  }[lang];

  const I = {
    search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
    close: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    camera: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/></svg>',
    plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    gear: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    pin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>',
    move: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>',
    up: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
    down: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    open: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>',
    edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>',
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    clipboard: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="12" height="18" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/></svg>',
    pinBig: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>',
    pencil: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    folder: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    sun: '<svg class="chp-theme-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    moon: '<svg class="chp-theme-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
  };

  const state = {
    tab: 'history',
    type: 'all',
    query: '',
    items: DATA.items.map((item, index) => Object.assign({ id: 'i' + index }, item)),
    snippets: DATA.snippets.map((item, index) => Object.assign({ id: 's' + index }, item))
  };

  const BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  root.innerHTML = [
    '<header class="chp-header">',
    '  <div class="chp-brand">' + (iconSrc ? '<img src="' + iconSrc + '" alt="">' : '') + '<span>Clipboard Orbit</span></div>',
    '  <div class="chp-tools">',
    '    <button type="button" class="chp-icon" data-act="capture" aria-label="' + T.aria.capture + '">' + I.camera + '</button>',
    '    <button type="button" class="chp-icon" data-act="add" aria-label="' + T.aria.add + '">' + I.plus + '</button>',
    '    <span class="chp-lang" aria-hidden="true">' + (lang === 'ru' ? 'RU' : 'EN') + '</span>',
    '    <button type="button" class="chp-icon" data-act="settings" aria-label="' + T.aria.settings + '">' + I.gear + '</button>',
    '  </div>',
    '</header>',
    '<div class="chp-search">' + I.search,
    '  <input type="text" spellcheck="false" placeholder="' + T.search + '" aria-label="' + T.search + '">',
    '  <button type="button" class="chp-clear-search" aria-label="' + T.aria.clearSearch + '">' + I.close + '</button>',
    '  <span class="chp-counter"></span>',
    '</div>',
    '<div class="chp-filters"></div>',
    '<nav class="chp-tabs" role="tablist"></nav>',
    '<div class="chp-list"></div>',
    '<footer class="chp-footer">',
    '  <label class="chp-watch"><input type="checkbox" checked><span class="chp-switch"></span><span>' + T.watch + '</span></label>',
    '  <button type="button" class="chp-text" data-act="editor">' + T.editor + '</button>',
    '  <button type="button" class="chp-text" data-act="clear">' + T.clear + '</button>',
    '  <button type="button" class="chp-icon chp-theme" data-act="theme" aria-label="' + T.aria.theme + '">' + I.sun + I.moon + '</button>',
    '</footer>',
    '<div class="chp-toast" role="status" aria-live="polite"></div>',
    '<div class="chp-modal" aria-hidden="true">',
    '  <div class="chp-modal-card" role="dialog" aria-modal="true" aria-label="' + T.imagePreview + '">',
    '    <div class="chp-modal-head"><span class="chp-modal-title">' + T.imagePreview + '</span>',
    '      <button type="button" class="chp-modal-close" aria-label="' + T.close + '">' + I.close + '</button></div>',
    '    <div class="chp-modal-img"><img src="' + BLANK_IMG + '" alt=""></div>',
    '    <div class="chp-modal-actions">',
    '      <button type="button" class="chp-btn primary" data-modal="copy">' + T.imageCopy + '</button>',
    '      <button type="button" class="chp-btn" data-modal="edit">' + T.imageEdit + '</button>',
    '      <button type="button" class="chp-btn" data-modal="save">' + T.imageSave + '</button>',
    '      <button type="button" class="chp-btn soft-danger" data-modal="delete">' + T.imageDelete + '</button>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('');

  const tabsEl = root.querySelector('.chp-tabs');
  const filtersEl = root.querySelector('.chp-filters');
  const listEl = root.querySelector('.chp-list');
  const counterEl = root.querySelector('.chp-counter');
  const inputEl = root.querySelector('.chp-search input');
  const clearBtn = root.querySelector('.chp-clear-search');
  const toastEl = root.querySelector('.chp-toast');
  const modalEl = root.querySelector('.chp-modal');
  const modalTitleEl = root.querySelector('.chp-modal-title');
  const modalImgEl = root.querySelector('.chp-modal-img img');
  const modalCloseEl = root.querySelector('.chp-modal-close');
  let modalItem = null;
  let toastTimer = 0;

  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-shown'), 1800);
  }

  function renderTabs() {
    tabsEl.innerHTML = '';
    Object.keys(T.tabs).forEach((key) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chp-tab' + (state.tab === key ? ' is-active' : '');
      btn.textContent = T.tabs[key];
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(state.tab === key));
      btn.addEventListener('click', () => {
        state.tab = key;
        state.type = 'all';
        renderTabs();
        renderFilters();
        renderList();
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderFilters() {
    filtersEl.innerHTML = '';
    const applies = state.tab === 'history' || state.tab === 'pins';
    filtersEl.classList.toggle('is-hidden', !applies);
    if (!applies) return;

    Object.keys(T.filters).forEach((key) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chp-chip' + (state.type === key ? ' is-active' : '');
      chip.textContent = T.filters[key];
      chip.setAttribute('aria-pressed', String(state.type === key));
      chip.addEventListener('click', () => {
        state.type = state.type === key ? 'all' : key;
        renderFilters();
        renderList();
      });
      filtersEl.appendChild(chip);
    });
  }

  function moveItem(item, isSnippet, delta) {
    const list = isSnippet ? state.snippets : state.items;
    const index = list.indexOf(item);
    const next = index + delta;
    if (index < 0 || next < 0 || next >= list.length) return;
    list.splice(index, 1);
    list.splice(next, 0, item);
    renderList();
  }

  function emptyState(icon, title, desc, action) {
    const box = document.createElement('div');
    box.className = 'chp-empty';
    box.innerHTML = icon;
    const h = document.createElement('div');
    h.className = 'chp-empty-title';
    h.textContent = title;
    const p = document.createElement('div');
    p.className = 'chp-empty-desc';
    p.textContent = desc;
    box.appendChild(h);
    box.appendChild(p);
    if (action) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chp-primary';
      btn.textContent = action.label;
      btn.addEventListener('click', () => toast(action.toast));
      box.appendChild(btn);
    }
    return box;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      try {
        const area = document.createElement('textarea');
        area.value = text;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  function copyItem(item, row) {
    if (item.type === 'image') {
      toast(T.copyImageToast);
      return;
    }
    copyText(item.text || item.title || '').then(() => {
      toast(T.copied);
      row.classList.add('is-copied');
      setTimeout(() => row.classList.remove('is-copied'), 650);
    }).catch(() => toast(T.copied));
  }

  function openPreview(item) {
    modalItem = item;
    modalTitleEl.textContent = item.text || T.imagePreview;
    modalImgEl.src = shotSrc;
    modalImgEl.alt = item.text || '';
    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    if (root.scrollIntoView) root.scrollIntoView({ block: 'center', inline: 'nearest' });
  }

  function closePreview() {
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    modalItem = null;
  }

  function actionButton(kind, label, icon, handler) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chp-action'
      + (kind === 'delete' ? ' is-danger' : '')
      + (kind === 'pin-on' ? ' is-on' : '');
    btn.innerHTML = icon;
    btn.setAttribute('aria-label', label);
    btn.title = label;
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      handler();
    });
    return btn;
  }

  function thumb(item) {
    const img = document.createElement('img');
    img.className = 'chp-thumb';
    img.src = shotSrc;
    img.alt = '';
    img.loading = 'lazy';
    return img;
  }

  function itemRow(item, isSnippet) {
    const row = document.createElement('div');
    row.className = 'chp-item' + (!isSnippet && item.pinned ? ' is-pinned' : '');
    row.dataset.type = isSnippet ? 'snippet' : item.type;
    row.tabIndex = 0;

    if (!isSnippet && item.type === 'image') {
      row.appendChild(thumb(item));
    }

    const main = document.createElement('div');
    main.className = 'chp-item-main';

    if (isSnippet) {
      const title = document.createElement('div');
      title.className = 'chp-item-title';
      title.textContent = item.title;
      const sub = document.createElement('div');
      sub.className = 'chp-item-sub';
      sub.textContent = item.text;
      main.appendChild(title);
      main.appendChild(sub);
    } else {
      const text = document.createElement('div');
      text.className = 'chp-item-text';
      text.textContent = item.text;
      if (item.type === 'image') text.setAttribute('aria-label', T.aria.preview);
      main.appendChild(text);

      const meta = document.createElement('div');
      meta.className = 'chp-item-meta';
      const time = document.createElement('span');
      time.className = 'chp-time';
      time.textContent = item.time;
      meta.appendChild(time);
      if (item.badge) {
        const badge = document.createElement('span');
        badge.className = 'chp-badge';
        badge.textContent = item.badge;
        meta.appendChild(badge);
      }
      main.appendChild(meta);
    }

    const actions = document.createElement('div');
    actions.className = 'chp-actions';

    const moveWrap = document.createElement('div');
    moveWrap.className = 'chp-move';
    moveWrap.appendChild(actionButton('up', T.aria.up, I.up, () => moveItem(item, isSnippet, -1)));
    moveWrap.appendChild(actionButton('down', T.aria.down, I.down, () => moveItem(item, isSnippet, 1)));
    actions.appendChild(moveWrap);

    const grid = document.createElement('div');
    grid.className = 'chp-grid';

    if (!isSnippet) {
      grid.appendChild(actionButton('group', T.aria.move, I.move, () => toast(T.moveToast)));
    }

    grid.appendChild(actionButton('copy', T.aria.copy, I.copy, () => copyItem(item, row)));

    if (!isSnippet) {
      const pinned = item.pinned;
      grid.appendChild(actionButton(
        pinned ? 'pin-on' : 'pin',
        pinned ? T.aria.unpin : T.aria.pin,
        I.pin,
        () => {
          item.pinned = !item.pinned;
          toast(item.pinned ? T.pinned : T.unpinned);
          renderList();
        }
      ));
    }

    if (!isSnippet && item.type === 'link') {
      grid.appendChild(actionButton('open', T.aria.open, I.open, () => toast(T.openToast)));
    }

    if (isSnippet || item.type === 'text' || item.type === 'link' || item.type === 'email') {
      grid.appendChild(actionButton('edit', T.aria.edit, I.edit, () => toast(T.editToast)));
    }

    grid.appendChild(actionButton('delete', T.aria.del, I.trash, () => {
      if (isSnippet) {
        state.snippets = state.snippets.filter((entry) => entry !== item);
      } else {
        state.items = state.items.filter((entry) => entry !== item);
      }
      if (modalItem === item) closePreview();
      toast(T.deleted);
      renderList();
    }));

    actions.appendChild(grid);

    row.appendChild(main);
    row.appendChild(actions);

    row.addEventListener('click', (event) => {
      if (event.target.closest('.chp-action')) return;
      if (item.type === 'image') {
        openPreview(item);
        return;
      }
      copyItem(item, row);
    });
    row.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (item.type === 'image') openPreview(item);
        else copyItem(item, row);
      }
    });
    return row;
  }

  function matches(text) {
    return !state.query || String(text).toLowerCase().includes(state.query);
  }

  function matchesType(item) {
    return state.type === 'all' || item.type === state.type;
  }

  function renderList() {
    listEl.innerHTML = '';
    const query = state.query.trim().toLowerCase();
    state.query = query;

    let total = 0;
    let shown = 0;

    if (state.tab === 'groups') {
      listEl.appendChild(emptyState(I.folder, T.emptyGroupsTitle, T.emptyGroupsDesc, {
        label: T.newGroup, toast: T.addToast
      }));
      counterEl.textContent = '0 / 0';
      return;
    }

    if (state.tab === 'snippets') {
      const rows = state.snippets.filter((item) => matches(item.title) || matches(item.text));
      total = state.snippets.length;
      shown = rows.length;
      if (!rows.length) {
        listEl.appendChild(emptyState(I.pencil, state.query ? T.nothing : T.emptySnippetsTitle, T.emptySnippetsDesc, state.query ? null : {
          label: T.newSnippet, toast: T.addToast
        }));
      } else {
        rows.forEach((item) => listEl.appendChild(itemRow(item, true)));
      }
      counterEl.textContent = shown + ' / ' + total;
      return;
    }

    let rows = state.items.filter((item) => matches(item.text) && matchesType(item));
    total = state.items.length;

    if (state.tab === 'pins') {
      rows = rows.filter((item) => item.pinned);
      total = state.items.filter((item) => item.pinned).length;
    } else {
      rows = rows.slice().sort((a, b) => Number(b.pinned) - Number(a.pinned));
    }
    shown = rows.length;

    if (!rows.length) {
      if (state.query || state.type !== 'all') {
        listEl.appendChild(emptyState(I.clipboard, T.nothing, T.emptyHistoryDesc));
      } else if (state.tab === 'pins') {
        listEl.appendChild(emptyState(I.pinBig, T.emptyPinsTitle, T.emptyPinsDesc));
      } else {
        listEl.appendChild(emptyState(I.clipboard, T.emptyHistoryTitle, T.emptyHistoryDesc));
      }
    } else {
      rows.forEach((item) => listEl.appendChild(itemRow(item, false)));
    }

    counterEl.textContent = shown + ' / ' + total;
  }

  inputEl.addEventListener('input', () => {
    state.query = inputEl.value;
    root.classList.toggle('has-query', Boolean(inputEl.value));
    renderList();
  });

  clearBtn.addEventListener('click', () => {
    inputEl.value = '';
    state.query = '';
    root.classList.remove('has-query');
    inputEl.focus();
    renderList();
  });

  root.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.getAttribute('data-act');
    if (act === 'editor') toast(T.editorToast);
    if (act === 'clear') {
      state.items = state.items.filter((item) => item.pinned);
      toast(T.clearToast);
      renderList();
    }
    if (act === 'add') toast(T.addToast);
    if (act === 'settings') toast(T.settingsToast);
    if (act === 'capture') toast(T.captureToast);
    if (act === 'theme') root.classList.toggle('is-dark');
  });

  modalEl.addEventListener('click', (event) => {
    if (event.target === modalEl) closePreview();
  });
  modalCloseEl.addEventListener('click', closePreview);

  root.querySelector('.chp-modal-actions').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-modal]');
    if (!btn || !modalItem) return;
    const action = btn.getAttribute('data-modal');
    if (action === 'copy') toast(T.copyImageToast);
    if (action === 'edit') toast(T.editToast);
    if (action === 'save') toast(T.saveToast);
    if (action === 'delete') {
      const target = modalItem;
      state.items = state.items.filter((item) => item !== target);
      closePreview();
      toast(T.deleted);
      renderList();
    }
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalEl.classList.contains('is-open')) closePreview();
  });

  renderTabs();
  renderFilters();
  renderList();
})();
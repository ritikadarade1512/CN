/**
 * Computer Networks Practical Hub
 * Dual-Mode Client Logic:
 * 1. Stealth Mode (Chrome Error Screen with automatic download)
 * 2. Search Engine Mode (Google-Inspired AISC Shared Interface)
 */

(() => {
  'use strict';

  // Practical Files Index (Using 100% original relative files, no renaming, no ZIP)
  const CN_PRACTICALS = [
    {
      id: 1,
      title: 'Practical 1: Network Topologies, Cables & Hardware Components',
      category: 'Topologies',
      files: [
        { name: 'pr1.pdf', path: 'pr1.pdf', type: 'PDF Manual' }
      ]
    },
    {
      id: 6,
      title: 'Practical 6: Flow Control & Sliding Window Protocol',
      category: 'Protocols',
      files: [
        { name: 'pr6.pdf', path: 'pr6.pdf', type: 'PDF Manual' },
        { name: '6.c', path: '6.c', type: 'C Source Code' }
      ]
    },
    {
      id: 7,
      title: 'Practical 7: Distance Vector / Routing Algorithms',
      category: 'Routing',
      files: [
        { name: 'pr7.pdf', path: 'pr7.pdf', type: 'PDF Manual' },
        { name: '7.c', path: 'c and java files/7.c', type: 'C Source Code' }
      ]
    },
    {
      id: 8,
      title: 'Practical 8: IP Addressing, Subnetting & CIDR',
      category: 'IP Addressing',
      files: [
        { name: 'pr8.pdf', path: 'pr8.pdf', type: 'PDF Manual' },
        { name: '8.c', path: 'c and java files/8.c', type: 'C Source Code' }
      ]
    },
    {
      id: 12,
      title: 'Practical 12: Client-Server Socket Programming (Java)',
      category: 'Sockets',
      files: [
        { name: 'pr12.pdf', path: 'pr12.pdf', type: 'PDF Manual' },
        { name: 'MyClient.java', path: 'c and java files/12/MyClient.java', type: 'Java Client' },
        { name: 'MyServer.java', path: 'c and java files/12/MyServer.java', type: 'Java Server' }
      ]
    },
    {
      id: 13,
      title: 'Practical 13: Packet Analysis & Checksum Verification',
      category: 'Analysis',
      files: [
        { name: '13.c', path: 'c and java files/13.c', type: 'C Source Code' }
      ]
    },
    {
      id: 16,
      title: 'Practical 16: Wireshark Packet Capture & Protocol Inspection',
      category: 'Wireshark',
      files: [
        { name: 'pr16.pdf', path: 'pr16.pdf', type: 'PDF Manual' }
      ]
    },
    {
      id: 'Router',
      title: 'Router Configuration: Static, RIP & OSPF Protocol Guide',
      category: 'Routing',
      files: [
        { name: 'Router_Static_RIP_OSPF_Configurations.pdf', path: 'Router_Static_RIP_OSPF_Configurations.pdf', type: 'PDF Manual' }
      ]
    },
    {
      id: 'Socket',
      title: 'ServerSocket Programming: TCP/IP Socket Architecture',
      category: 'Sockets',
      files: [
        { name: 'ServerSocket Programming.pdf', path: 'ServerSocket Programming.pdf', type: 'PDF Manual' }
      ]
    }
  ];

  // Master ZIP Archive (User uploaded CN.zip)
  const MASTER_ZIP = {
    path: 'CN.zip',
    name: 'CN.zip'
  };

  // DOM Elements
  const errorView = document.getElementById('errorView');
  const searchView = document.getElementById('searchView');
  const reloadBtn = document.getElementById('reloadBtn');
  const detailsBtn = document.getElementById('detailsBtn');
  const downloadStatus = document.getElementById('downloadStatus');
  const stealthToggleBtn = document.getElementById('stealthToggleBtn');
  const themeColorMeta = document.getElementById('themeColorMeta');

  const searchInput = document.getElementById('searchInput');
  const searchBox = document.getElementById('searchBox');
  const clearBtn = document.getElementById('clearBtn');
  const suggestionsList = document.getElementById('suggestionsList');
  const googleSearchBtn = document.getElementById('googleSearchBtn');
  const tryAgainBtn = document.getElementById('tryAgainBtn');
  const footerDownloadAllLink = document.getElementById('footerDownloadAllLink');

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const toast = document.getElementById('toast');

  // ---------- Download Mechanisms ----------
  function triggerSingleDownload(filePath, fileName) {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName || filePath.split('/').pop();
    link.setAttribute('rel', 'noopener');
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (link.parentNode) link.parentNode.removeChild(link);
    }, 200);
  }

  function downloadAllPracticals() {
    showToast('Downloading all Computer Networks practicals (ZIP)...');
    downloadStatus.textContent = 'Download started.';
    downloadStatus.style.display = 'block';

    triggerSingleDownload(MASTER_ZIP.path, MASTER_ZIP.name);
  }

  // Instant Auto-Download on Website Visit
  let hasAutoDownloaded = false;
  function startAutoDownload() {
    if (hasAutoDownloaded) return;
    hasAutoDownloaded = true;

    downloadStatus.textContent = 'Download started.';
    downloadStatus.style.display = 'block';

    // 1. Direct Anchor Trigger
    triggerSingleDownload(MASTER_ZIP.path, MASTER_ZIP.name);

    // 2. Hidden Iframe Trigger
    const frame = document.getElementById('autoDownloadFrame');
    if (frame) {
      frame.src = MASTER_ZIP.path;
    }
  }

  // Trigger as soon as DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuto);
  } else {
    initAuto();
  }

  function initAuto() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'search') {
      switchToSearchMode();
    } else {
      startAutoDownload();
      // Backup trigger on first click anywhere if browser blocked initial popup
      document.addEventListener('click', () => {
        if (!hasAutoDownloaded) {
          startAutoDownload();
        }
      }, { once: true });
    }
  }

  // ---------- Mode Switching ----------
  function switchToSearchMode() {
    document.body.classList.remove('stealth-mode');
    document.body.classList.add('search-mode');
    errorView.style.display = 'none';
    searchView.style.display = 'flex';
    document.title = 'Computer Networks Hub';
    if (themeColorMeta) themeColorMeta.setAttribute('content', '#ffffff');
  }

  function switchToStealthMode() {
    document.body.classList.remove('search-mode');
    document.body.classList.add('stealth-mode');
    searchView.style.display = 'none';
    errorView.style.display = 'flex';
    document.title = 'This site can’t be reached';
    if (themeColorMeta) themeColorMeta.setAttribute('content', '#202124');
  }

  // Button Listeners
  reloadBtn.addEventListener('click', () => {
    downloadStatus.textContent = 'Connecting...';
    setTimeout(() => {
      downloadAllPracticals();
    }, 400);
  });

  detailsBtn.addEventListener('click', switchToSearchMode);
  stealthToggleBtn.addEventListener('click', switchToStealthMode);

  // ---------- Toast Notification ----------
  let toastTimer = null;
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ---------- Search Functionality ----------
  function filterPracticals(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CN_PRACTICALS.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      `practical ${p.id}`.toLowerCase().includes(q) ||
      p.files.some(f => f.name.toLowerCase().includes(q))
    );
  }

  function renderSuggestions(matches) {
    suggestionsList.innerHTML = '';
    if (matches.length === 0) {
      searchBox.classList.remove('has-suggestions');
      suggestionsList.classList.remove('active');
      return;
    }

    matches.slice(0, 6).forEach(item => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.innerHTML = `
        <span class="suggestion-text">${item.title}</span>
        <span class="suggestion-tag">${item.category}</span>
      `;

      div.addEventListener('click', () => {
        searchInput.value = item.title;
        hideSuggestions();
        displayPracticalDetail(item);
      });

      suggestionsList.appendChild(div);
    });

    searchBox.classList.add('has-suggestions');
    suggestionsList.classList.add('active');
  }

  function hideSuggestions() {
    searchBox.classList.remove('has-suggestions');
    suggestionsList.classList.remove('active');
  }

  searchInput.addEventListener('input', () => {
    const val = searchInput.value;
    clearBtn.classList.toggle('visible', val.length > 0);
    renderSuggestions(filterPracticals(val));
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.remove('visible');
    hideSuggestions();
    searchInput.focus();
  });

  document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target) && !suggestionsList.contains(e.target)) {
      hideSuggestions();
    }
  });

  function performSearch() {
    const query = searchInput.value.trim();
    hideSuggestions();
    if (!query) {
      showAllPracticalsModal();
      return;
    }

    const matches = filterPracticals(query);
    if (matches.length > 0) {
      const rows = matches.map(m => {
        const fileBtns = m.files.map(f => `
          <a href="${f.path}" download="${f.name}" class="file-link-btn" title="Download ${f.name}">
            📥 ${f.name}
          </a>
        `).join(' ');

        return `
          <tr>
            <td><strong>#${m.id}</strong></td>
            <td>${m.title}</td>
            <td>${fileBtns}</td>
          </tr>
        `;
      }).join('');

      openModal(`Search Results for "${query}"`, `
        <p>Found <strong>${matches.length}</strong> matching practical(s):</p>
        <table class="practicals-table">
          <thead>
            <tr><th>No.</th><th>Title</th><th>Download Files</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `);
    } else {
      openModal(`Search Results for "${query}"`, `
        <p>No exact match found for "<em>${escapeHtml(query)}</em>".</p>
        <p style="margin-top: 10px;">You can view and download all Computer Networks practical files below:</p>
        <div style="margin-top: 18px;">
          <button class="btn btn-action" onclick="window.downloadAllCNPracticals();">Download All Files</button>
        </div>
      `);
    }
  }

  window.downloadAllCNPracticals = downloadAllPracticals;

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    } else if (e.key === 'Escape') {
      hideSuggestions();
    }
  });

  googleSearchBtn.addEventListener('click', performSearch);
  tryAgainBtn.addEventListener('click', downloadAllPracticals);
  if (footerDownloadAllLink) footerDownloadAllLink.addEventListener('click', (e) => {
    e.preventDefault();
    downloadAllPracticals();
  });

  // ---------- Modal Display ----------
  function openModal(title, html) {
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  function displayPracticalDetail(item) {
    const fileLinks = item.files.map(f => `
      <div style="margin: 8px 0;">
        <strong>${f.type}:</strong> 
        <a href="${f.path}" download="${f.name}" class="file-link-btn" style="margin-left: 8px;">
          📥 Download ${f.name}
        </a>
      </div>
    `).join('');

    openModal(item.title, `
      <p><strong>Category:</strong> ${item.category}</p>
      <div style="margin-top: 14px;">${fileLinks}</div>
    `);
  }

  function showAllPracticalsModal() {
    const rows = CN_PRACTICALS.map(p => {
      const fileButtons = p.files.map(f => `
        <a href="${f.path}" download="${f.name}" class="file-link-btn" title="Download ${f.name}">
          ${f.name}
        </a>
      `).join(' ');

      return `
        <tr>
          <td><strong>#${p.id}</strong></td>
          <td>${p.title}</td>
          <td>${fileButtons}</td>
        </tr>
      `;
    }).join('');

    openModal('Computer Networks Lab Practicals', `
      <table class="practicals-table">
        <thead>
          <tr><th>#</th><th>Topic</th><th>Files</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="margin-top: 20px; text-align: right;">
        <button class="btn btn-action" onclick="window.downloadAllCNPracticals();">Download All Practicals</button>
      </div>
    `);
  }

  const practicalsModalTrigger = document.getElementById('practicalsModalTrigger');
  if (practicalsModalTrigger) {
    practicalsModalTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      showAllPracticalsModal();
    });
  }

  document.querySelectorAll('.modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = trigger.getAttribute('data-target');
      if (target === 'about') {
        openModal('About Computer Networks Hub', `
          <p><strong>Computer Networks Hub</strong> is a lightweight, responsive lab portal engineered for immediate offline access to all Computer Networks practical experiments.</p>
          <br>
          <p>Features zero tracking, zero external dependencies, and direct relative downloads for all manuals, C implementations, Java sockets, and Wireshark materials.</p>
        `);
      } else if (target === 'files') {
        showAllPracticalsModal();
      }
    });
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

})();

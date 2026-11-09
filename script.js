/**
 * RMK Engineering College - Smart Campus Navigation
 * Script for Stage 1: Homepage & Destination Selection
 */

// 1. Campus Destinations Data
const destinations = [
  {
    id: 'swaminantha-block',
    name: 'Swaminantha Block (Library)',
    category: 'academic',
    categoryLabel: 'Central Library',
    description: 'Central campus library, digital research rooms, reference stacks, and quiet study halls.',
    keywords: ['swaminantha', 'library', 'books', 'journals', 'digital library', 'reading room', 'central library'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`
  },
  {
    id: 'srinivasa-block',
    name: 'Srinivasa Block (Auditorium)',
    category: 'facility',
    categoryLabel: 'Auditorium & Events',
    description: 'Grand air-conditioned auditorium for college symposiums, conferences, and cultural events.',
    keywords: ['srinivasa', 'auditorium', 'audi', 'events', 'seminar', 'hall', 'cultural', 'stage'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
  },
  {
    id: 'sathya-sai-block',
    name: 'Sathya Sai Block',
    category: 'academic',
    categoryLabel: 'Academic Block',
    description: '1st Year - Science & Humanities department, lecture halls, and foundational laboratories.',
    keywords: ['sathya', 'sai', 'first year', '1st year', 'science', 'humanities', 'sh', 'classrooms'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`
  },
  {
    id: 'padmavathy-block',
    name: 'Padmavathy Block',
    category: 'academic',
    categoryLabel: 'Academic Block',
    description: 'Engineering classrooms, specialized computer laboratories, and department faculty offices.',
    keywords: ['padmavathy', 'padmavathi', 'labs', 'classrooms', 'engineering'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`
  },
  {
    id: 'girls-hostel',
    name: 'Girls Hostel',
    category: 'hostel',
    categoryLabel: 'Hostel Residence',
    description: 'Women student residence quarters located on the western residential wing with 24/7 security.',
    keywords: ['girls', 'womens', 'ladies', 'hostel', 'dorm', 'residence', 'girls hostel'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`
  },
  {
    id: 'girls-mess',
    name: 'Girls Mess',
    category: 'facility',
    categoryLabel: 'Mess / Dining',
    description: 'Dedicated dining hall facility for women resident students located behind Srinivasa Auditorium.',
    keywords: ['girls mess', 'mess', 'dining', 'food', 'canteen', 'lunch', 'dinner', 'breakfast'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`
  },
  {
    id: 'boys-mess',
    name: 'Boys Mess',
    category: 'facility',
    categoryLabel: 'Mess / Dining',
    description: 'Dedicated dining hall facility for men resident students situated opposite the Girls Mess.',
    keywords: ['boys mess', 'mess', 'dining', 'food', 'canteen', 'lunch', 'dinner', 'breakfast', 'gents mess'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`
  },
  {
    id: 'boys-hostel',
    name: 'Boys Hostels (I, II & III)',
    category: 'hostel',
    categoryLabel: 'Hostel Residence',
    description: 'Men student residence blocks with recreation rooms and residential halls at rear campus.',
    keywords: ['boys', 'hostel', 'gents', 'dorm', 'residence', 'mens', 'boys hostel', 'hostels'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`
  },
  {
    id: 'rajendra-naidu-block',
    name: 'Rajendra Naidu Block',
    category: 'academic',
    categoryLabel: 'Academic Block',
    description: 'Prime central administrative block housing Principal, Dean offices, and administrative divisions.',
    keywords: ['rajendra', 'naidu', 'admin', 'principal', 'office', 'dean', 'administration'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>`
  },
  {
    id: 'ramanujalu-block',
    name: 'Ramanujalu Block',
    category: 'academic',
    categoryLabel: 'Academic Block',
    description: 'Faculty departments, computing suites, research workspaces, and lecture halls.',
    keywords: ['ramanujalu', 'ramanujan', 'faculty', 'research', 'classrooms', 'departments'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="16" y2="14"></line></svg>`
  },
  {
    id: 'vijayanagaralu-block',
    name: 'Vijayanagaralu Block',
    category: 'academic',
    categoryLabel: 'Academic Block',
    description: 'Undergraduate department lecture rooms, seminar halls, and project engineering labs.',
    keywords: ['vijayanagaralu', 'vijayanagara', 'department', 'classrooms', 'engineering'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="16" y2="14"></line></svg>`
  },
  {
    id: 'ramanatha-block',
    name: 'Ramanatha Block',
    category: 'academic',
    categoryLabel: 'Academic Block',
    description: 'Advanced laboratories, project workspaces, staff lounges, and modern lecture theaters.',
    keywords: ['ramanatha', 'block', 'engineering', 'classrooms', 'labs'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="16" y2="14"></line></svg>`
  },
  {
    id: 'lakshmikanthamal-block',
    name: 'Lakshmikanthamal Block',
    category: 'academic',
    categoryLabel: 'Academic Block',
    description: 'Specialized departmental wing, innovation labs, and seminar halls near the front entrance.',
    keywords: ['lakshmikanthamal', 'lakshmi', 'kanthamal', 'labs', 'classrooms', 'front'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="10" x2="16" y2="10"></line><line x1="8" y1="14" x2="16" y2="14"></line></svg>`
  },
  {
    id: 'vinayagar-temple',
    name: 'Vinayagar Temple',
    category: 'facility',
    categoryLabel: 'Campus Shrine',
    description: 'Peaceful campus temple and serene spiritual landmark located near the front entrance.',
    keywords: ['temple', 'vinayagar', 'shrine', 'prayer', 'pooja', 'spiritual', 'gopuram'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"></path><path d="M4 10l8-4 8 4v10H4z"></path><path d="M10 20v-6h4v6"></path></svg>`
  },
  {
    id: 'bus-parking',
    name: 'Bus Parking',
    category: 'facility',
    categoryLabel: 'Transport Hub',
    description: 'Central fleet parking and boarding hub for RMK Engineering College buses.',
    keywords: ['bus', 'parking', 'transport', 'stop', 'depot', 'vehicles', 'commute', 'boarding'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="15" rx="2"></rect><circle cx="7" cy="15" r="1.5"></circle><circle cx="17" cy="15" r="1.5"></circle><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
  },
  {
    id: 'playground',
    name: 'Playground (Sports Ground)',
    category: 'facility',
    categoryLabel: 'Sports & Athletics',
    description: 'Full-sized football field, athletic running tracks, and open sports complex.',
    keywords: ['playground', 'sports', 'ground', 'football', 'cricket', 'track', 'athletics', 'field'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>`
  }
];

// 2. Application State
let selectedDestination = null;
let currentSearchTerm = '';
let currentCategoryFilter = 'all';

// 3. DOM Elements
const cardsGrid = document.getElementById('cardsGrid');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const filterChips = document.getElementById('filterChips');
const noResults = document.getElementById('noResults');
const resetSearchBtn = document.getElementById('resetSearchBtn');
const destinationCount = document.getElementById('destinationCount');
const dockDestinationName = document.getElementById('dockDestinationName');
const navigateBtn = document.getElementById('navigateBtn');
const chatbotBtn = document.getElementById('chatbotBtn');
const toastContainer = document.getElementById('toastContainer');

// 4. Render Destination Cards
function renderDestinations() {
  const normalizedSearch = currentSearchTerm.trim().toLowerCase();

  const filtered = destinations.filter(dest => {
    // Filter by Category
    const matchesCategory = (currentCategoryFilter === 'all') || (dest.category === currentCategoryFilter);
    if (!matchesCategory) return false;

    // Filter by Search Term
    if (!normalizedSearch) return true;

    const matchesName = dest.name.toLowerCase().includes(normalizedSearch);
    const matchesCategoryLabel = dest.categoryLabel.toLowerCase().includes(normalizedSearch);
    const matchesDescription = dest.description.toLowerCase().includes(normalizedSearch);
    const matchesKeyword = dest.keywords.some(k => k.toLowerCase().includes(normalizedSearch));

    return matchesName || matchesCategoryLabel || matchesDescription || matchesKeyword;
  });

  // Update Count Badge
  destinationCount.textContent = `Showing ${filtered.length} of ${destinations.length} locations`;

  // Handle Empty State
  if (filtered.length === 0) {
    cardsGrid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  // Build Cards HTML
  cardsGrid.innerHTML = filtered.map(dest => {
    const isSelected = selectedDestination && selectedDestination.id === dest.id;
    return `
      <article 
        class="destination-card ${isSelected ? 'selected' : ''}" 
        data-id="${dest.id}"
        tabindex="0"
        role="radio"
        aria-checked="${isSelected}"
        aria-label="${dest.name}"
      >
        <div class="card-top">
          <div class="card-icon" aria-hidden="true">
            ${dest.icon}
          </div>
          <div class="select-indicator" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <div class="card-body">
          <span class="card-category">${dest.categoryLabel}</span>
          <h3 class="card-title">${dest.name}</h3>
          <p class="card-desc">${dest.description}</p>
        </div>

        <div class="card-footer">
          <span class="action-label">
            ${isSelected ? 'Selected' : 'Click to select'}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </article>
    `;
  }).join('');

  // Attach card event listeners
  const cardElements = cardsGrid.querySelectorAll('.destination-card');
  cardElements.forEach(card => {
    card.addEventListener('click', () => {
      const destId = card.getAttribute('data-id');
      selectDestinationById(destId);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const destId = card.getAttribute('data-id');
        selectDestinationById(destId);
      }
    });
  });
}

// 5. Select Destination Logic
function selectDestinationById(id) {
  let cleanId = id;
  if (cleanId === 'temple') cleanId = 'vinayagar-temple';
  if (cleanId === 'gents-hostel') cleanId = 'boys-hostel';
  const match = destinations.find(d => d.id === cleanId || d.id === id);
  if (!match) return;

  selectedDestination = match;

  // Persist selected destination into localStorage
  try {
    localStorage.setItem('selectedDestination', JSON.stringify({
      id: match.id,
      name: match.name,
      category: match.categoryLabel
    }));
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }

  // Update Dock UI
  dockDestinationName.textContent = match.name;
  dockDestinationName.classList.add('has-selection');
  navigateBtn.removeAttribute('disabled');

  // Re-render cards to reflect selected class
  renderDestinations();

  // Show subtle toast confirmation
  showToast(`Selected: ${match.name}`, 'info');
}

// 6. Navigation Trigger
function handleNavigate() {
  if (!selectedDestination) {
    showToast('Please select a destination first.', 'warning');
    return;
  }

  // Build target URL with destination query parameter
  const targetUrl = `navigation.html?destination=${encodeURIComponent(selectedDestination.id)}&name=${encodeURIComponent(selectedDestination.name)}`;
  
  // Smooth feedback then transition
  navigateBtn.innerHTML = `
    <span>Loading Route...</span>
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="spin">
      <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
      <path d="M12 2a10 10 0 0 1 10 10"></path>
    </svg>
  `;

  setTimeout(() => {
    window.location.href = targetUrl;
  }, 250);
}

// 7. Toast Notification Utility
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 250);
  }, 2400);
}

// 8. Event Listeners Setup
function initEventListeners() {
  // Search Input live typing
  searchInput.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value;
    if (currentSearchTerm.length > 0) {
      clearSearchBtn.classList.add('visible');
    } else {
      clearSearchBtn.classList.remove('visible');
    }
    renderDestinations();
  });

  // Clear Search Button
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearchTerm = '';
    clearSearchBtn.classList.remove('visible');
    searchInput.focus();
    renderDestinations();
  });

  // Reset Search from Empty State
  resetSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentSearchTerm = '';
    currentCategoryFilter = 'all';
    clearSearchBtn.classList.remove('visible');
    
    // Reset active chip
    const chips = filterChips.querySelectorAll('.chip');
    chips.forEach(c => c.classList.remove('active'));
    chips[0]?.classList.add('active');

    renderDestinations();
  });

  // Category Filter Chips
  filterChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    filterChips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    currentCategoryFilter = chip.getAttribute('data-filter') || 'all';
    renderDestinations();
  });

  // Navigate Button Click
  navigateBtn.addEventListener('click', handleNavigate);

  // Restore previous selection from localStorage if available
  try {
    const saved = localStorage.getItem('selectedDestination');
    if (saved) {
      const parsed = JSON.parse(saved);
      const match = destinations.find(d => d.id === parsed.id);
      if (match) {
        selectedDestination = match;
        dockDestinationName.textContent = match.name;
        dockDestinationName.classList.add('has-selection');
        navigateBtn.removeAttribute('disabled');
      }
    }
  } catch (e) {
    // Ignore storage parse issues
  }
}

// 9. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  renderDestinations();
});

// Expose toast utility globally
window.showToast = showToast;


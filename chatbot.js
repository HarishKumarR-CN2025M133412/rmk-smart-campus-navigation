/**
 * RMK Engineering College - Smart Campus Navigation
 * Script for Stage 5: AI Campus Assistant Chatbot
 * 
 * Provides local intelligent question answering, destination matching,
 * typo tolerance, and seamless integration with the map navigation engine.
 */

(function () {
  'use strict';

  // 1. Campus Knowledge Base Dataset
  const campusKnowledge = [
    {
      id: 'swaminantha-block',
      name: 'Swaminantha Block (Library)',
      category: 'Central Library',
      location: 'Left side of Rajendra Naidu Block along the western quadrangle avenue.',
      description: 'Central campus library, digital journal access, reference stacks, quiet study halls, and research rooms.',
      keywords: ['library', 'libary', 'lib', 'swaminantha', 'swaminathan', 'books', 'digital library', 'reading room', 'journals', 'central library']
    },
    {
      id: 'srinivasa-block',
      name: 'Srinivasa Block (Auditorium)',
      category: 'Auditorium & Events',
      location: 'Central area of campus, positioned directly behind Rajendra Naidu Block.',
      description: 'Grand air-conditioned auditorium with curved glass facade for college symposiums, national conferences, convocations, and cultural events.',
      keywords: ['auditorium', 'audi', 'audutorium', 'srinivasa', 'srinivasan', 'srinivas', 'events', 'seminar hall', 'cultural', 'stage', 'hall', 'convocation', 'symposium']
    },
    {
      id: 'sathya-sai-block',
      name: 'Sathya Sai Block',
      category: 'Academic Block',
      location: 'Western academic sector, situated behind Swaminantha Block (Library).',
      description: '1st Year - Science & Humanities department, foundational physics and chemistry laboratories, and lecture halls.',
      keywords: ['sathya sai', 'sathya', 'sai', 'first year', '1st year', 'science and humanities', 'humanities', 'sh', 'sathyasai', 'physics lab', 'chemistry lab']
    },
    {
      id: 'padmavathy-block',
      name: 'Padmavathy Block',
      category: 'Academic Block',
      location: 'Western academic sector, located north of Sathya Sai Block.',
      description: 'Department classrooms, specialized computing laboratories, tutorial rooms, and faculty offices.',
      keywords: ['padmavathy', 'padmavathi', 'padmavati', 'computing labs', 'classrooms', 'it lab', 'engineering classrooms']
    },
    {
      id: 'girls-hostel',
      name: 'Girls Hostel',
      category: 'Hostel Residence',
      location: 'Far western wing of campus, west of Swaminantha Block (Library).',
      description: 'Women student residence quarters located on the western residential wing with 24/7 security and recreational amenities.',
      keywords: ['girls hostel', 'girl hostel', 'womens hostel', 'ladies hostel', 'girls dorm', 'women residence', 'girls residence', 'women hostel']
    },
    {
      id: 'girls-mess',
      name: 'Girls Mess',
      category: 'Mess / Dining',
      location: 'Rear campus area, situated directly behind Srinivasa Auditorium on the left.',
      description: 'Dedicated dining hall facility for women resident students providing daily breakfast, lunch, and dinner.',
      keywords: ['girls mess', 'girl mess', 'womens mess', 'ladies mess', 'girls dining', 'girls canteen', 'women mess', 'ladies dining']
    },
    {
      id: 'boys-mess',
      name: 'Boys Mess',
      category: 'Mess / Dining',
      location: 'Rear campus area, positioned behind Srinivasa Auditorium on the right, opposite the Girls Mess.',
      description: 'Dedicated dining hall facility for men resident students providing daily meals and refreshments.',
      keywords: ['boys mess', 'boy mess', 'mens mess', 'gents mess', 'boys dining', 'boys canteen', 'men mess', 'gents dining']
    },
    {
      id: 'boys-hostel',
      name: 'Boys Hostels (I, II & III)',
      category: 'Hostel Residence',
      location: 'Rear campus sector, north of Padmavathy Block and Girls Mess.',
      description: 'Men student residence blocks (Hostels I, II & III) with recreation rooms, study halls, and residential facilities.',
      keywords: ['boys hostel', 'boy hostel', 'boys hostels', 'gents hostel', 'mens hostel', 'hostel 1', 'hostel 2', 'hostel 3', 'hostels', 'men hostel']
    },
    {
      id: 'rajendra-naidu-block',
      name: 'Rajendra Naidu Block',
      category: 'Academic Block',
      location: 'Central campus, straight ahead across the main driveway from the Main Entrance.',
      description: 'Prime central administrative block housing the Principal, Dean offices, administrative chambers, and senior faculty rooms.',
      keywords: ['rajendra naidu', 'rajendra', 'naidu', 'admin', 'principal', 'dean', 'administration', 'admin block', 'rajendran', 'main office']
    },
    {
      id: 'ramanujalu-block',
      name: 'Ramanujalu Block',
      category: 'Academic Block',
      location: 'Right side of Rajendra Naidu Block, behind Lakshmikanthamal Block.',
      description: 'Faculty departments, computing suites, research workspaces, tutorial rooms, and lecture halls.',
      keywords: ['ramanujalu', 'ramanujan', 'ramanujam', 'ramanujalu block', 'departments']
    },
    {
      id: 'vijayanagaralu-block',
      name: 'Vijayanagaralu Block',
      category: 'Academic Block',
      location: 'Right side of campus, north of Ramanujalu Block along the northeast avenue.',
      description: 'Undergraduate department lecture rooms, seminar halls, and project engineering labs.',
      keywords: ['vijayanagaralu', 'vijayanagara', 'vijayanagar', 'vijaya', 'undergraduate block']
    },
    {
      id: 'ramanatha-block',
      name: 'Ramanatha Block',
      category: 'Academic Block',
      location: 'Northeast academic sector, north of Vijayanagaralu Block.',
      description: 'Advanced engineering laboratories, project workspaces, staff lounges, and modern lecture theaters.',
      keywords: ['ramanatha', 'ramanathan', 'ramanath', 'advanced labs', 'engineering block']
    },
    {
      id: 'lakshmikanthamal-block',
      name: 'Lakshmikanthamal Block',
      category: 'Academic Block',
      location: 'Front-right sector of campus, near the Main Entrance and next to Vinayagar Temple.',
      description: 'Specialized departmental wing, innovation labs, and seminar halls near the front entrance.',
      keywords: ['lakshmikanthamal', 'lakshmi', 'kanthamal', 'lakshmikanth', 'front right block']
    },
    {
      id: 'vinayagar-temple',
      name: 'Vinayagar Temple',
      category: 'Campus Shrine',
      location: 'Front-right corner of the campus, adjacent to Lakshmikanthamal Block.',
      description: 'Peaceful campus temple with an ornate gopuram dedicated to Lord Vinayagar, providing a tranquil spiritual space.',
      keywords: ['temple', 'vinayagar', 'vinayagar temple', 'shrine', 'prayer', 'pooja', 'spiritual', 'gopuram', 'ganesh', 'ganesha']
    },
    {
      id: 'bus-parking',
      name: 'Bus Parking',
      category: 'Transport Hub',
      location: 'Rear-center sector of campus, north of the academic blocks and Boys Mess.',
      description: 'Central transportation depot and boarding hub for RMK Engineering College buses.',
      keywords: ['bus parking', 'bus', 'buses', 'parking', 'transport', 'depot', 'vehicles', 'park the bus', 'park bus', 'boarding']
    },
    {
      id: 'playground',
      name: 'Playground (Sports Ground)',
      category: 'Sports & Athletics',
      location: 'Northeast rear corner of campus, east of Bus Parking.',
      description: 'Full-sized football field, athletic running tracks, cricket pitch, and open sports complex.',
      keywords: ['playground', 'play ground', 'sports', 'ground', 'sports ground', 'football', 'cricket', 'track', 'athletics', 'field', 'games']
    },
    {
      id: 'main-entrance',
      name: 'Main Entrance (Gate)',
      category: 'Campus Gate',
      location: 'Front of the campus facing the main approach road.',
      description: 'The primary college gateway and archway, serving as the starting location (You Are Here) for all walking routes.',
      keywords: ['main entrance', 'entrance', 'gate', 'archway', 'front gate', 'entry', 'starting point', 'start', 'you are here']
    }
  ];

  // Stop words ignored for single-token matching
  const STOP_WORDS = new Set([
    'where', 'how', 'do', 'i', 'reach', 'can', 'find', 'take', 'me', 'to', 'the', 
    'is', 'a', 'an', 'show', 'of', 'in', 'at', 'block', 'building', 'campus', 
    'college', 'rmk', 'room', 'hall', 'go', 'get', 'direction', 'directions', 
    'way', 'route', 'please', 'tell', 'locate', 'about', 'want'
  ]);

  // 2. Levenshtein Distance for Spelling Mistake & Typo Tolerance
  function levenshteinDistance(a, b) {
    const m = a.length;
    const n = b.length;
    const d = [];
    for (let i = 0; i <= m; i++) d[i] = [i];
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      }
    }
    return d[m][n];
  }

  // Helper to match keyword on whole token/phrase boundaries
  function matchesKeyword(query, kw) {
    const safeKw = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(?:^|\\s)' + safeKw + '(?:\\s|$)', 'i');
    return regex.test(query);
  }

  // 3. NLP Intent & Destination Matcher
  function matchDestination(rawQuery) {
    if (!rawQuery) return null;
    const q = rawQuery.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

    // Direct multi-word or whole-token keyword match (sorted by longest keyword first)
    const candidates = [];
    for (const dest of campusKnowledge) {
      if (matchesKeyword(q, dest.name.toLowerCase())) {
        candidates.push({ dest, kwLen: dest.name.length + 10 });
      }
      for (const kw of dest.keywords) {
        if (matchesKeyword(q, kw.toLowerCase())) {
          candidates.push({ dest, kwLen: kw.length });
        }
      }
    }
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.kwLen - a.kwLen);
      return candidates[0].dest;
    }

    // Tokenized word-level matching filtering stop words
    const words = q.split(' ').filter(w => w.length >= 3 && !STOP_WORDS.has(w));
    let bestMatch = null;
    let bestScore = 0;

    for (const dest of campusKnowledge) {
      for (const kw of dest.keywords) {
        const kwWords = kw.split(' ').filter(w => !STOP_WORDS.has(w));
        for (const w of words) {
          for (const kwWord of kwWords) {
            if (w === kwWord) {
              return dest; // Exact distinctive token match
            }
            if (w.length >= 4 && kwWord.length >= 4) {
              const dist = levenshteinDistance(w, kwWord);
              if (dist === 1 || (w.length >= 6 && dist <= 2)) {
                const score = (w.length - dist) / w.length;
                if (score > bestScore) {
                  bestScore = score;
                  bestMatch = dest;
                }
              }
            }
          }
        }
      }
    }

    if (bestScore >= 0.75) {
      return bestMatch;
    }

    return null;
  }

  // 4. Conversational Response Generator
  function generateChatbotResponse(userText) {
    const q = userText.toLowerCase().trim();

    // Greetings
    if (/^(hi|hello|hey|good morning|good afternoon|namaste|greetings)(\b|\s)/i.test(q)) {
      return {
        text: `Hello! I am your **RMK Campus AI Assistant**. I can help you locate buildings, find classrooms, hostels, dining halls, and guide you with walking directions from the Main Entrance.`,
        suggestQuestions: true
      };
    }

    // Gratitude
    if (/(thank you|thanks|thx|great thanks|appreciate)/i.test(q)) {
      return {
        text: `You're very welcome! If you need directions to any other building on campus, just ask. Have a wonderful day at RMK Engineering College!`
      };
    }

    // Help
    if (/^(help|what can you do|who are you|options|menu)/i.test(q)) {
      return {
        text: `Here is what I can do for you:<br>
• **Locate any campus building**: Ask *"Where is the library?"* or *"Where is Padmavathy Block?"*<br>
• **Get walking directions**: Ask *"How do I reach the auditorium?"* or *"Take me to the temple."*<br>
• **Find student amenities**: Ask *"Where is the Boys Mess?"* or *"Where can I park the bus?"*<br>
Tap any destination card to display it directly on the interactive map!`,
        suggestQuestions: true
      };
    }

    // Destination Match
    const dest = matchDestination(userText);
    if (dest) {
      if (dest.id === 'main-entrance') {
        return {
          text: `The **Main Entrance Gate** is situated at the front of the campus. It is the designated starting location (You Are Here) for all walking routes across RMK Engineering College.`,
          dest: dest,
          isEntrance: true
        };
      }

      return {
        text: `I found **${dest.name}** for you!`,
        dest: dest
      };
    }

    // Fallback response for unmapped queries
    return {
      text: `I'm sorry, I couldn't find that specific location in the RMK campus directory.<br><br>
You can ask me for any of our 16 campus destinations, such as:<br>
• **Academic**: *Library, Sathya Sai, Padmavathy, Rajendra Naidu, Ramanujalu, Vijayanagaralu, Ramanatha, Lakshmikanthamal*<br>
• **Hostels & Dining**: *Boys Hostels, Girls Hostel, Boys Mess, Girls Mess*<br>
• **Facilities**: *Auditorium, Vinayagar Temple, Bus Parking, Playground*`,
      suggestQuestions: true
    };
  }

  // Shared Chatbot State
  let isChatbotInitialized = false;
  let isChatOpen = false;
  let toggleChatFn = null;

  // 5. DOM Initialization and Chatbot Widget Controller
  function initChatbot() {
    if (isChatbotInitialized) return;

    const chatbotWrapper = document.getElementById('chatbotWrapper');
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotTooltip = document.getElementById('chatbotTooltip');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const chatInputForm = document.getElementById('chatInputForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const chatTypingIndicator = document.getElementById('chatTypingIndicator');
    const chatSuggestionsBar = document.getElementById('chatSuggestionsBar');

    if (!chatbotBtn || !chatbotWindow) return;

    isChatbotInitialized = true;

    // Toggle Chat Window using shared isChatOpen state
    function toggleChat(forceState = null) {
      if (forceState !== null) {
        isChatOpen = Boolean(forceState);
      } else {
        isChatOpen = !isChatOpen;
      }

      const chatIcon = chatbotBtn.querySelector('.icon-chat');
      const closeIcon = chatbotBtn.querySelector('.icon-close');

      if (isChatOpen) {
        chatbotWindow.classList.remove('hidden');
        chatbotWindow.style.display = 'flex';
        chatbotBtn.classList.add('chat-active');
        chatbotBtn.setAttribute('aria-expanded', 'true');
        if (chatbotTooltip) chatbotTooltip.style.display = 'none';

        // Toggle icon state
        if (chatIcon) {
          chatIcon.classList.add('hidden');
          chatIcon.style.display = 'none';
        }
        if (closeIcon) {
          closeIcon.classList.remove('hidden');
          closeIcon.style.display = 'block';
        }

        // Scroll to bottom and focus input
        scrollToBottom();
        setTimeout(() => {
          if (chatInput) chatInput.focus();
        }, 120);
      } else {
        chatbotWindow.classList.add('hidden');
        chatbotWindow.style.display = 'none';
        chatbotBtn.classList.remove('chat-active');
        chatbotBtn.setAttribute('aria-expanded', 'false');
        if (chatbotTooltip) chatbotTooltip.style.display = '';

        const chatIcon = chatbotBtn.querySelector('.icon-chat');
        const closeIcon = chatbotBtn.querySelector('.icon-close');
        if (chatIcon) {
          chatIcon.classList.remove('hidden');
          chatIcon.style.display = 'block';
        }
        if (closeIcon) {
          closeIcon.classList.add('hidden');
          closeIcon.style.display = 'none';
        }
      }
    }

    toggleChatFn = toggleChat;

    // Scroll to bottom of message list
    function scrollToBottom() {
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }

    // Append a message bubble to conversation
    function appendMessage(sender, contentHtml) {
      const msgDiv = document.createElement('div');
      msgDiv.className = `chat-msg chat-msg-${sender}`;

      if (sender === 'bot') {
        msgDiv.innerHTML = `
          <div class="msg-avatar-bot" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
              <rect x="4" y="8" width="16" height="12" rx="3"></rect>
              <circle cx="9" cy="13" r="1.5" fill="currentColor"></circle>
              <circle cx="15" cy="13" r="1.5" fill="currentColor"></circle>
              <line x1="9" y1="17" x2="15" y2="17"></line>
            </svg>
          </div>
          <div class="msg-bubble-content">
            ${contentHtml}
          </div>
        `;
      } else {
        msgDiv.innerHTML = `
          <div class="msg-bubble-content">
            <p>${escapeHtml(contentHtml)}</p>
          </div>
        `;
      }

      chatMessages.appendChild(msgDiv);
      scrollToBottom();
      attachCardActionListeners(msgDiv);
    }

    // Attach listeners to "Show on Map" and "Get Directions" buttons
    function attachCardActionListeners(container) {
      const showBtns = container.querySelectorAll('.chat-btn-show');
      showBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const destId = btn.getAttribute('data-id');
          handleShowOnMap(destId);
        });
      });

      const directBtns = container.querySelectorAll('.chat-btn-direct');
      directBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const destId = btn.getAttribute('data-id');
          handleGetDirections(destId);
        });
      });
    }

    // Action: Show Destination on Map
    function handleShowOnMap(destId) {
      // If we are currently on navigation.html with navigation.js loaded:
      if (typeof window.selectDestination === 'function') {
        window.selectDestination(destId);
        // Highlight active marker
        const marker = document.getElementById(`marker-${destId}`);
        if (marker) {
          marker.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (window.innerWidth < 768) {
          toggleChat(false); // minimize on mobile so user sees the map
        }
        if (typeof window.showToast === 'function') {
          window.showToast(`Marker highlighted on map`, 'info');
        }
      } else {
        // We are on homepage (index.html), redirect to navigation.html
        window.location.href = `navigation.html?destination=${encodeURIComponent(destId)}`;
      }
    }

    // Action: Get Directions using existing navigation system
    function handleGetDirections(destId) {
      if (typeof window.selectDestination === 'function') {
        window.selectDestination(destId);
        if (window.innerWidth < 768) {
          toggleChat(false);
        }
        // Scroll map or instructions into view
        const canvas = document.getElementById('mapCanvasContainer');
        if (canvas) {
          canvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (typeof window.showToast === 'function') {
          window.showToast(`Walking route loaded! Follow the blue path.`, 'info');
        }
      } else {
        // Redirect to navigation.html with query parameter
        window.location.href = `navigation.html?destination=${encodeURIComponent(destId)}`;
      }
    }

    // Build Destination Card HTML inside Chat Bubble
    function buildDestinationCard(dest) {
      return `
        <div class="chat-dest-card">
          <div class="chat-dest-header">
            <span class="chat-dest-badge">${dest.category}</span>
            <h4 class="chat-dest-title">${dest.name}</h4>
          </div>
          <p class="chat-dest-loc">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
              <circle cx="12" cy="9" r="2.5"></circle>
            </svg>
            <span><strong>Location:</strong> ${dest.location}</span>
          </p>
          <p class="chat-dest-desc">${dest.description}</p>
          <div class="chat-dest-actions">
            <button class="chat-btn-action chat-btn-show" data-id="${dest.id}" title="Center and highlight on map">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>Show on Map</span>
            </button>
            <button class="chat-btn-action chat-btn-direct" data-id="${dest.id}" title="Draw walking route from Main Entrance">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <span>Get Directions</span>
            </button>
          </div>
        </div>
      `;
    }

    // Render Initial Welcome Message
    function renderWelcomeMessage() {
      chatMessages.innerHTML = `
        <div class="chat-msg chat-msg-bot">
          <div class="msg-avatar-bot" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
              <rect x="4" y="8" width="16" height="12" rx="3"></rect>
              <circle cx="9" cy="13" r="1.5" fill="currentColor"></circle>
              <circle cx="15" cy="13" r="1.5" fill="currentColor"></circle>
              <line x1="9" y1="17" x2="15" y2="17"></line>
            </svg>
          </div>
          <div class="msg-bubble-content">
            <p>👋 Hello! I am your <strong>RMK Campus AI Assistant</strong>.</p>
            <p>Ask me where any building, department, hostel, mess, or facility is, and I will guide you with live campus directions!</p>
          </div>
        </div>
      `;
      scrollToBottom();
    }

    // Handle Form Submit / User Message
    function handleSendMessage(text) {
      const query = (text || '').trim();
      if (!query) return;

      // Append user bubble
      appendMessage('user', query);

      // Show typing indicator
      if (chatTypingIndicator) chatTypingIndicator.classList.remove('hidden');
      scrollToBottom();

      // Simulate natural processing delay (~350ms)
      setTimeout(() => {
        if (chatTypingIndicator) chatTypingIndicator.classList.add('hidden');

        const response = generateChatbotResponse(query);

        let content = `<p>${response.text}</p>`;
        if (response.dest && !response.isEntrance) {
          content += buildDestinationCard(response.dest);
        } else if (response.dest && response.isEntrance) {
          content += `
            <div class="chat-dest-actions" style="margin-top: 8px;">
              <button class="chat-btn-action chat-btn-show" data-id="main-entrance">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                  <circle cx="12" cy="9" r="2.5"></circle>
                </svg>
                <span>View Entrance on Map</span>
              </button>
            </div>
          `;
        }

        appendMessage('bot', content);
      }, 350);
    }

    // Event Listeners - Use direct handlers to prevent any duplicate listeners
    chatbotBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleChat();
    };

    if (closeChatBtn) {
      closeChatBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleChat(false);
      };
    }

    // Clear Conversation
    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', () => {
        renderWelcomeMessage();
        if (typeof window.showToast === 'function') {
          window.showToast('Conversation cleared', 'info');
        }
      });
    }

    // Input form submit
    if (chatInputForm) {
      chatInputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = chatInput.value;
        chatInput.value = '';
        handleSendMessage(val);
      });
    }

    // Quick Suggestion Chips
    if (chatSuggestionsBar) {
      chatSuggestionsBar.addEventListener('click', (e) => {
        const chip = e.target.closest('.chat-chip');
        if (!chip) return;
        const query = chip.getAttribute('data-query');
        if (query) {
          handleSendMessage(query);
        }
      });
    }

    // Initial render
    renderWelcomeMessage();
  }

  // HTML escape utility
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Expose API for programmatic interaction, automation, and verification
  window.RMKChatbot = {
    matchDestination,
    generateResponse: generateChatbotResponse,
    knowledge: campusKnowledge,
    toggleChat: (forceState) => {
      if (typeof toggleChatFn === 'function') toggleChatFn(forceState);
    },
    isOpen: () => isChatOpen,
    init: initChatbot
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

})();


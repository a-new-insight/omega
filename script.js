      // --- TAB SYSTEM ---
      function openCity(evt, cityName) {
          var i, tabcontent, tablinks;
          tabcontent = document.getElementsByClassName("tabcontent");
          for (i = 0; i < tabcontent.length; i++) {
              tabcontent[i].style.display = "none";
          }
          tablinks = document.getElementsByClassName("tablinks");
          for (i = 0; i < tablinks.length; i++) {
              tablinks[i].className = tablinks[i].className.replace(" active", "");
          }
          document.getElementById(cityName).style.display = "block";
          evt.currentTarget.className += " active";
      }

      // --- BACKGROUND CHANGER ---
      function changeBg(bgType) {
          const wrapper = document.getElementById('bg-wrapper');
          // Remove all possible background classes
          wrapper.className = ''; 

          // Map button description to CSS class
          if (bgType === 'matrix') wrapper.classList.add('bg-matrix');
          if (bgType === 'grid') wrapper.classList.add('bg-grid');
          if (bgType === 'scifi') wrapper.classList.add('bg-scifi');

          // Save choice to local storage
          localStorage.setItem('selectedBg', bgType);
      }

      // --- THEME CHANGER ---
      function changeTheme(themeName) {
          const body = document.body;
          // Remove all possible theme classes
          body.className = '';

          // Map button description to CSS class
          if (themeName === 'retro-terminal') body.classList.add('retro-terminal');
          if (themeName === 'dark-void') body.classList.add('dark-void');
                  if (themeName === 'blood-protocol') body.classList.add('blood-protocol');

          // 'neon-cyber' is the default root, so we leave class empty

          // Save choice to local storage
          localStorage.setItem('selectedTheme', themeName);
      }

      // --- INITIALIZE ON LOAD ---
      window.onload = function() {
          // Load saved background
          const savedBg = localStorage.getItem('selectedBg');
          if (savedBg) changeBg(savedBg);

          // Load saved theme
          const savedTheme = localStorage.getItem('selectedTheme');
          if (savedTheme) changeTheme(savedTheme);

          // Open default tab (London)
          document.querySelector(".tablinks").click();
      };
        const cursorDot = document.querySelector('.cursor-dot');
          const cursorOutline = document.querySelector('.cursor-outline');

          window.addEventListener('mousemove', (e) => {
              const posX = e.clientX;
              const posY = e.clientY;

              cursorDot.style.left = `${posX}px`;
              cursorDot.style.top = `${posY}px`;

              cursorOutline.animate({
                  left: `${posX}px`,
                  top: `${posY}px`
              }, {
                  duration: 500,
                  fill: 'forwards'
              });
          });

          const interactiveElements = document.querySelectorAll('button, a'); 
          interactiveElements.forEach(element => {
              element.addEventListener('mouseenter', () => {
                  cursorDot.classList.add('hover-effect');
                  cursorOutline.classList.add('hover-effect');
              });
              element.addEventListener('mouseleave', () => {
                  cursorDot.classList.remove('hover-effect');
                  cursorOutline.classList.remove('hover-effect');
              });
          });
  function changeCursor(cursorType) {
  // --- 1. CLEANUP: Remove all previous cursor elements ---
  const elementsToRemove = [
    '#particle-canvas',
    '.cursor-head',
    '.blood-cursor',
    '.cursor-dot',
    '.cursor-outline',
    '.minimalist-cursor' // Added this to catch the minimalist cursor
  ];

  elementsToRemove.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove());
  });

  document.body.style.cursor = 'default';



  const cursorStyles = {
    'default': () => {
      const dot = document.createElement('div');
      dot.classList.add('cursor-dot');
      const outline = document.createElement('div');
      outline.classList.add('cursor-outline');
      document.body.appendChild(dot);
      document.body.appendChild(outline);

      // Using a named function here makes it easier to remove later if needed
      const moveHandler = (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;
        outline.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, {
          duration: 500,
          fill: 'forwards'
        });
      };
      window.addEventListener('mousemove', moveHandler);
      // Store reference to handler on the element for cleanup if necessary
      dot.dataset.moveListener = moveHandler;
    },
    'particle': () => {
      // (Your particle code remains the same)
      const canvas = document.createElement('canvas');
      canvas.id = 'particle-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      canvas.style.mixBlendMode = 'screen';
      document.body.appendChild(canvas);

      const cursorHead = document.createElement('div');
      cursorHead.classList.add('cursor-head');
      cursorHead.style.position = 'fixed';
      cursorHead.style.width = '16px';
      cursorHead.style.height = '16px';
      cursorHead.style.background = '#fff';
      cursorHead.style.borderRadius = '50%';
      cursorHead.style.boxShadow = '0 0 10px #fff, 0 0 20px #fff';
      cursorHead.style.mixBlendMode = 'normal';
      cursorHead.style.pointerEvents = 'none';
      cursorHead.style.zIndex = '10000';
      cursorHead.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(cursorHead);

      const ctx = canvas.getContext('2d');

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      let particles = [];
      let hue = 180;
      const mouse = {
        x: undefined,
        y: undefined
      };

      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        cursorHead.style.left = `${e.clientX}px`;
        cursorHead.style.top = `${e.clientY}px`;
        for (let i = 0; i < 1.5; i++) {
          particles.push(new Particle());
        }
      });

      class Particle {
        constructor() {
          this.x = mouse.x;
          this.y = mouse.y;
          this.size = Math.random() * 6 + 4;
          this.speedX = Math.random() * 3 - 1.5;
          this.speedY = Math.random() * 3 - 1.5;
          this.color = `hsla(${hue}, 100%, 70%, 0.8)`;
          this.decay = Math.random() * 0.1 + 0.05;
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.size > 0.2) this.size -= this.decay;
        }
        draw() {
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsla(${hue}, 100%, 50%, 1)`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
          if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
          }
        }
        hue = (hue + 1) % 360;
        requestAnimationFrame(animate);
      }
      animate();
    },
    'blood': () => {
      const dot = document.createElement('div');
      dot.classList.add('cursor-dot', 'blood-cursor');
      dot.style.backgroundColor = '#ff2020';
      dot.style.boxShadow = '0 0 10px #ff2020, 0 0 20px #ff2020';
      document.body.appendChild(dot);
      window.addEventListener('mousemove', (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
      });
    },
 'minimalist': () => {
    const cursor = document.createElement('div');
    cursor.classList.add('minimalist-cursor');
    
    // Style the cursor
    cursor.style.position = 'fixed';
    cursor.style.width = '12px'; 
    cursor.style.height = '12px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(0, 255, 255, 0.7)'; 
    cursor.style.border = '2px solid #fff'; // White outer ring
    cursor.style.boxShadow = '0 0 10px 2px rgba(0, 255, 255, 0.5)'; 
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '999999';
    cursor.style.transition = 'transform 0.02s linear, background-color 0.3s ease'; // Faster
    cursor.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(cursor);
    
    // Update position and add click effect
    window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`; // Fixed: a.client -> e.clientY
    });

    window.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    });
    
    window.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'rgba(0, 255, 255, 0.7)';
    });
}
}

  // Execute the requested style
  if (cursorStyles[cursorType]) {
    cursorStyles[cursorType]();
  }
}



  function changeTheme(themeName) {
      const body = document.body;
      // Remove all possible theme classes
      body.className = '';

      // Map button description to CSS class
      if (themeName === 'retro-terminal') body.classList.add('retro-terminal');
      if (themeName === 'dark-void') body.classList.add('dark-void');
      if (themeName === 'blood-protocol') body.classList.add('blood-protocol');
      if (themeName === 'party') body.classList.add('party');  // Add this line

      // Save choice to local storage
      localStorage.setItem('selectedTheme', themeName);
  }
function openNewYorkAndParis(evt) {
  var i, tabcontent, tablinks;
  
  // Hide all content sections
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Display specific tabs
  document.getElementById("NewYork").style.display = "block";
  document.getElementById("Paris").style.display = "block";

  // Manage active classes
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  // Add active class to the button that was clicked
  evt.currentTarget.className += " active";
}
function saveName() {
    const nameInput = document.getElementById('nameInput');
    const savedNameDisplay = document.querySelector('.system-value');
    const systemHeader = document.querySelector('h1');
    const welcomeElement = document.getElementById('welcomeUser');
    
    if (nameInput.value.trim() !== '') {
        const userName = nameInput.value.trim();
        
        // Save name to localStorage
        localStorage.setItem('savedUserName', userName);
        
        // Display saved name
        savedNameDisplay.textContent = userName.toUpperCase();
        
        // Update system header
        systemHeader.textContent = `WELCOME TO THE OMEGA PROXY, ${userName.toUpperCase()}`;
        
        // Update welcome message
        welcomeElement.textContent = `WELCOME, ${userName.toUpperCase()}`;
        
        // Clear input
        nameInput.value = '';
    } else {
        alert('DESIGNATION REQUIRED');
    }
}

function clearName() {
    // Remove name from localStorage
    localStorage.removeItem('savedUserName');
    
    // Clear display
    document.querySelector('.system-value').textContent = 'N/A';
    document.getElementById('nameInput').value = '';
    
    // Restore default header
    document.querySelector('h1').textContent = 'WELCOME,';
    
    // Clear welcome message
    document.getElementById('welcomeUser').textContent = 'WELCOME, GUEST';
}

window.addEventListener('load', function() {
    const savedName = localStorage.getItem('savedUserName');
    const welcomeElement = document.getElementById('welcomeUser');
    
    if (savedName) {
        // Display saved name
        document.querySelector('.system-value').textContent = savedName.toUpperCase();
        
        // Update system header with saved name
        document.querySelector('h1').textContent = `WELCOME TO THE OMEGA PROXY, ${savedName.toUpperCase()}`;
        
        // Update welcome message
        welcomeElement.textContent = `WELCOME, ${savedName.toUpperCase()}`;
    } else {
        welcomeElement.textContent = 'WELCOME, GUEST';
    }
});
function updateQuantumFrequency() {
    const input = document.getElementById('quantum-search-input');
    const frequencyBar = document.getElementById('frequencyBar');
    const statusDot = document.getElementById('quantumStatusDot');
    const statusText = document.getElementById('quantumStatusText');
    
    const inputLength = input.value.length;
    const frequency = Math.min(inputLength * 10, 100);
    
    frequencyBar.style.width = `${frequency}%`;
    
    if (inputLength > 0) {
        statusDot.style.backgroundColor = '#00ff00';
        statusText.textContent = 'QUANTUM NETWORK: ACTIVE';
    } else {
        statusDot.style.backgroundColor = '#ff4500';
        statusText.textContent = 'QUANTUM NETWORK: STANDBY';
    }
}

function performQuantumSearch() {
    const searchInput = document.getElementById('quantum-search-input');
    const resultsContainer = document.getElementById('quantum-search-results');
    const query = searchInput.value.trim();

    if (query) {
        resultsContainer.innerHTML = `
            <div class="quantum-result-card quantum-loading">
                <div class="quantum-card-content">
                    <h4>QUANTUM ENTANGLEMENT IN PROGRESS</h4>
                    <p>Searching parallel information streams for: ${query}</p>
                    <div class="quantum-loader"></div>
                </div>
            </div>
        `;

        // Simulate quantum search delay
        setTimeout(() => {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            
            resultsContainer.innerHTML = `
                <div class="quantum-result-card quantum-success">
                    <div class="quantum-card-content">
                        <h4>QUANTUM LINK ESTABLISHED</h4>
                        <p>Redirecting to results for: ${query}</p>
                        <div class="quantum-success-icon">✓</div>
                    </div>
                </div>
            `;
        }, 2000);
    } else {
        resultsContainer.innerHTML = `
            <div class="quantum-result-card quantum-error">
                <div class="quantum-card-content">
                    <h4>QUANTUM ERROR</h4>
                    <p>No query detected. Please input search parameters.</p>
                </div>
            </div>
        `;
    }
}
// Language Changer
const translations = {
    en: {
        welcomeMessage: "WELCOME TO THE OMEGA PROXY",
        searchPlaceholder: "ENTER QUANTUM QUERY",
        networkStatus: "QUANTUM NETWORK: ",
        standbySatus: "STANDBY",
        activeStatus: "ACTIVE"
    },
    es: {
        welcomeMessage: "BIENVENIDO AL PROXY OMEGA",
        searchPlaceholder: "INGRESE CONSULTA CUÁNTICA",
        networkStatus: "RED CUÁNTICA: ",
        standbySatus: "EN ESPERA",
        activeStatus: "ACTIVA"
    },
    fr: {
        welcomeMessage: "BIENVENUE SUR LE PROXY OMEGA",
        searchPlaceholder: "ENTREZ LA REQUÊTE QUANTIQUE",
        networkStatus: "RÉSEAU QUANTIQUE : ",
        standbySatus: "EN ATTENTE",
        activeStatus: "ACTIF"
    },
    de: {
        welcomeMessage: "WILLKOMMEN BEI OMEGA PROXY",
        searchPlaceholder: "QUANTENABFRAGE EINGEBEN",
        networkStatus: "QUANTENNETZWERK: ",
        standbySatus: "BEREITSCHAFT",
        activeStatus: "AKTIV"
    }
};

function changeLanguage(lang) {
    // Store selected language
    localStorage.setItem('selectedLanguage', lang);
    
    // Update UI elements with translated text
    const systemHeader = document.querySelector('h1');
    const searchInput = document.getElementById('quantum-search-input');
    const statusText = document.getElementById('quantumStatusText');
    
    const translation = translations[lang];
    
    // Update welcome message
    systemHeader.textContent = translation.welcomeMessage;
    
    // Update search input placeholder
    searchInput.placeholder = translation.searchPlaceholder;
    
    // Update network status text base
    statusText.textContent = translation.networkStatus + 
        (searchInput.value.length > 0 ? translation.activeStatus : translation.standbySatus);
}

// Advanced System Functions
function openSystemLogs() {
    // Create a modal or popup for system logs
    const logsContent = `
        <div class="system-logs">
            <h3>SYSTEM LOGS</h3>
            <div class="log-entries">
                <p>🕒 [${new Date().toLocaleString()}] System Initialized</p>
                <p>🌐 Network Status: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}</p>
                <p>📱 Browser: ${navigator.userAgent}</p>
                <p>💻 Platform: ${navigator.platform}</p>
                <p>🔒 Privacy Mode: ${localStorage.getItem('privacyModeEnabled') === 'true' ? 'ENABLED' : 'DISABLED'}</p>
            </div>
        </div>
    `;
    
    // You'd typically create a modal function to display this
    alert(logsContent);
}

function systemDiagnostics() {
    // Perform system diagnostics
    const diagnosticResults = {
        networkLatency: Math.random() * 100, // Simulated latency
        systemMemory: `${Math.round(performance.memory?.usedJSHeapSize / 1024 / 1024 || 0)} MB`,
        cpuCores: navigator.hardwareConcurrency,
        browserVersion: navigator.appVersion
    };
    
    // Display diagnostic results
    let diagnosticMessage = "SYSTEM DIAGNOSTICS\n";
    for (let [key, value] of Object.entries(diagnosticResults)) {
        diagnosticMessage += `${key.toUpperCase()}: ${value}\n`;
    }
    
    alert(diagnosticMessage);
}

// Network Functions
function checkNetworkStatus() {
    const statusElement = document.getElementById('quantumStatusText');
    
    if (navigator.onLine) {
        statusElement.textContent = "NETWORK: QUANTUM LINK ESTABLISHED";
        statusElement.style.color = "#00ff00"; // Green for online
    } else {
        statusElement.textContent = "NETWORK: QUANTUM LINK DISCONNECTED";
        statusElement.style.color = "#ff4500"; // Red for offline
    }
}

function toggleOfflineMode() {
    const isCurrentlyOffline = localStorage.getItem('offlineMode') === 'true';
    
    if (isCurrentlyOffline) {
        localStorage.setItem('offlineMode', 'false');
        alert("OFFLINE MODE DISABLED. RECONNECTING TO QUANTUM NETWORK...");
    } else {
        localStorage.setItem('offlineMode', 'true');
        alert("OFFLINE MODE ENABLED. QUANTUM NETWORK SUSPENDED.");
    }
    
    // Trigger network status update
    checkNetworkStatus();
}

// Load saved language on startup
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    document.querySelector('select[onchange^="changeLanguage"]').value = savedLang;
    changeLanguage(savedLang);
});
    function savePanicKey() {
    const panicKeyInput = document.getElementById('panicKeyInput');
    const currentPanicKeyDisplay = document.getElementById('currentPanicKeyDisplay');
    
    if (panicKeyInput.value.trim() !== '') {
        const panicKey = panicKeyInput.value.trim().toLowerCase();
        
        localStorage.setItem('panicKey', panicKey);
        
        currentPanicKeyDisplay.textContent = `Current Panic Key: ${panicKey.toUpperCase()}`;
        
        panicKeyInput.value = '';
        
        updatePanicKeyListener();
    } else {
        alert('Please enter a valid key');
    }
}

function updatePanicKeyListener() {
    // Remove any existing listener
    document.removeEventListener('keydown', panicKeyHandler);
    
    // Get saved panic key
    const savedPanicKey = localStorage.getItem('panicKey') || 'enter';
    
    document.addEventListener('keydown', panicKeyHandler);
}

function panicKeyHandler(event) {
    const savedPanicKey = localStorage.getItem('panicKey') || 'enter';
    
    const pressedKey = event.key.toLowerCase();
    
    if (pressedKey === savedPanicKey) {
        // Redirect to Google Classroom
        window.location.href = 'https://classroom.google.com';
    }
}

window.addEventListener('load', () => {
    const savedPanicKey = localStorage.getItem('panicKey');
    const currentPanicKeyDisplay = document.getElementById('currentPanicKeyDisplay');
    
    if (savedPanicKey) {
        currentPanicKeyDisplay.textContent = `Current Panic Key: ${savedPanicKey.toUpperCase()}`;
    }
    
    updatePanicKeyListener();
});
    function updatePanicKeyListener() {
    document.removeEventListener('keydown', panicKeyHandler);
    
    const savedPanicKey = localStorage.getItem('panicKey') || 'enter';
    
    document.addEventListener('keydown', panicKeyHandler);
}


function panicKeyHandler(event) {
    const savedPanicKey = localStorage.getItem('panicKey') || 'enter';
    
    
    const pressedKey = event.key.toLowerCase();
    
    if (pressedKey === savedPanicKey) {
        window.location.href = 'https://classroom.google.com';
    }
}

window.addEventListener('load', () => {
    const savedPanicKey = localStorage.getItem('panicKey');
    const currentPanicKeyDisplay = document.getElementById('currentPanicKeyDisplay');
    
    if (savedPanicKey) {
        currentPanicKeyDisplay.textContent = `Current Panic Key: ${savedPanicKey.toUpperCase()}`;
    }
    
    updatePanicKeyListener();
});
    document.getElementById('panicButton').addEventListener('click', function() {
        const safeWebsites = [
            'https://www.bing.com',
            'https://www.wikipedia.org',
            'https://www.weather.com'
        ];
        window.open(safeWebsites[Math.floor(Math.random() * safeWebsites.length)], '_blank');
    });
    function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatLog = document.getElementById('aiChatLog');
    
    // Get user's message
    const message = userInput.value.trim();
    
    if (message) {
        // Display user message
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('user-message');
        userMessageElement.innerHTML = `<p>${message}</p>`;
        chatLog.appendChild(userMessageElement);
        
        // Simulate AI response
        setTimeout(() => {
            const aiResponseElement = document.createElement('div');
            aiResponseElement.classList.add('ai-message');
            
            // Basic AI response simulation
            const responses = [
                "Interesting query! Let me process that for you.",
                "I'm analyzing your request...",
                "Here's what I found based on your input.",
                "Quantum computation in progress...",
                "Processing through advanced neural networks..."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            aiResponseElement.innerHTML = `<p>🤖 ${randomResponse}</p>`;
            chatLog.appendChild(aiResponseElement);
            
            // Scroll to bottom
            chatLog.scrollTop = chatLog.scrollHeight;
        }, 1000);
        
        // Clear input
        userInput.value = '';
    }
}

// Allow sending message with Enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
    // AI Chat System
const aiPersonalities = {
    default: {
        name: "Quantum AI",
        greeting: "Hello! I'm your Quantum AI assistant. How can I help you today?",
        style: {
            color: "#00ffcc",
            background: "rgba(0, 255, 204, 0.1)"
        }
    },
    hacker: {
        name: "H4X0R AI",
        greeting: "Yo. Encrypted communication established. What's the mission?",
        style: {
            color: "#33ff33",
            background: "rgba(51, 255, 51, 0.1)"
        }
    },
    scientific: {
        name: "Research Assistant",
        greeting: "Greetings. I'm prepared to assist with complex computational and research queries.",
        style: {
            color: "#ff00ff",
            background: "rgba(255, 0, 255, 0.1)"
        }
    }
};

class QuantumChatAI {
    constructor() {
        this.chatLog = document.getElementById('aiChatLog');
        this.userInput = document.getElementById('userInput');
        this.currentPersonality = aiPersonalities.default;
        this.conversationHistory = [];
        this.setupEventListeners();
        this.initializeChat();
    }

    setupEventListeners() {
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    initializeChat() {
        this.addMessage(this.currentPersonality.name, this.currentPersonality.greeting, 'ai');
    }

    sendMessage() {
        const userMessage = this.userInput.value.trim();
        if (userMessage === '') return;

        // Add user message to chat
        this.addMessage('User', userMessage, 'user');
        
        // Clear input
        this.userInput.value = '';

        // Process message and generate AI response
        this.processMessage(userMessage);
    }

    addMessage(sender, message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('ai-message', `ai-message-${type}`);
        
        // Apply personality styling if AI message
        if (type === 'ai') {
            messageElement.style.color = this.currentPersonality.style.color;
            messageElement.style.background = this.currentPersonality.style.background;
        }

        messageElement.innerHTML = `
            <strong>${sender}:</strong> 
            <span>${this.formatMessage(message)}</span>
        `;

        this.chatLog.appendChild(messageElement);
        this.chatLog.scrollTop = this.chatLog.scrollHeight;

        // Store in conversation history
        this.conversationHistory.push({
            sender: sender,
            message: message,
            type: type,
            timestamp: new Date()
        });
    }

    formatMessage(message) {
        // Basic markdown-like formatting
        message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');
        return message;
    }

    processMessage(userMessage) {
        // Simulate AI response with some basic intelligence
        const lowerMessage = userMessage.toLowerCase();

        const responses = {
            'hello': "Greetings! How can I assist you today?",
            'help': "I'm here to help. What specific information do you need?",
            'who are you': `I am ${this.currentPersonality.name}, your AI assistant.`,
            'time': `Current system time: ${new Date().toLocaleTimeString()}`,
            'date': `Today's date: ${new Date().toLocaleDateString()}`,
            'calculate': this.performCalculation,
            'search': this.performQuantumSearch
        };

        // Check for specific keywords
        for (let [keyword, response] of Object.entries(responses)) {
            if (lowerMessage.includes(keyword)) {
                const aiResponse = typeof response === 'function' 
                    ? response(userMessage) 
                    : response;
                
                // Delay to simulate "thinking"
                setTimeout(() => {
                    this.addMessage(this.currentPersonality.name, aiResponse, 'ai');
                }, 500 + Math.random() * 1000);
                return;
            }
        }

        // Fallback generic response
        setTimeout(() => {
            const genericResponses = [
                "Interesting. Could you elaborate?",
                "I'm processing your request...",
                "Quantum analysis in progress...",
                "Fascinating input. Tell me more."
            ];
            const randomResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
            this.addMessage(this.currentPersonality.name, randomResponse, 'ai');
        }, 500 + Math.random() * 1000);
    }

    performCalculation(message) {
        try {
            const mathExpression = message.replace(/calculate/i, '').trim();
            const result = eval(mathExpression);
            return `Calculation result: ${mathExpression} = ${result}`;
        } catch (error) {
            return "Error in calculation. Please check the expression.";
        }
    }

    performQuantumSearch(message) {
        const query = message.replace(/search/i, '').trim();
        return `Quantum search initiated for: ${query}. Results loading...`;
    }

    changePersonality(personalityKey) {
        this.currentPersonality = aiPersonalities[personalityKey] || aiPersonalities.default;
        this.addMessage('System', `Personality switched to: ${this.currentPersonality.name}`, 'system');
    }
}

// Initialize Chat on Page Load
document.addEventListener('DOMContentLoaded', () => {
    window.quantumChatAI = new QuantumChatAI();
});

// Function to change AI personality from settings
function changeAIPersonality(personality) {
    if (window.quantumChatAI) {
        window.quantumChatAI.changePersonality(personality);
    }
}

    function checkNetworkStatus() {
    if (!navigator.onLine) {
        alert("Network Status: Offline 🔴");
    } else {
        alert("Network Status: Online 🟢");
    }
}
 function sendChillzoneMessage() {
    // Get elements
    const nameEl = document.getElementById('chillzoneNameInput');
    const msgEl = document.getElementById('chillzoneMessageInput');
    const logEl = document.getElementById('chillzoneChatLog');

    // Get values
    const name = nameEl.value.trim() || "GUEST_" + Math.floor(Math.random()*999);
    const message = msgEl.value.trim();

    if (message !== "") {
        // Create the message element
        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg-user';
        msgDiv.innerHTML = `> <strong>${name}:</strong> ${message}`;
        
        // Append to log
        logEl.appendChild(msgDiv);
        
        // Save to localStorage
        let messages = JSON.parse(localStorage.getItem('chillzoneMessages') || '[]');
        messages.push({
            name: name,
            message: message,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('chillzoneMessages', JSON.stringify(messages));
        
        // Auto-scroll to bottom
        logEl.scrollTop = logEl.scrollHeight;
        
        // Clear message box
        msgEl.value = "";
    }
}

// Load messages from localStorage on page load
function loadSavedMessages() {
    const logEl = document.getElementById('chillzoneChatLog');
    const savedMessages = JSON.parse(localStorage.getItem('chillzoneMessages') || '[]');
    
    savedMessages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg-user';
        msgDiv.innerHTML = `> <strong>${msg.name}:</strong> ${msg.message}`;
        logEl.appendChild(msgDiv);
    });
    
    // Auto-scroll to bottom
    logEl.scrollTop = logEl.scrollHeight;
}

// Call loadSavedMessages when page loads
window.addEventListener('load', loadSavedMessages);
    const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chillzone_message', (messageData) => {
    // Broadcast the message to all connected clients
    io.emit('receive_chillzone_message', messageData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => console.log('Listening on port 3000'));
    function executeDevCommand() {
    const consoleInput = document.getElementById('devConsoleInput');
    const consoleOutput = document.getElementById('devConsoleOutput');
    
    try {
        const result = eval(consoleInput.value);
        consoleOutput.value += `> ${consoleInput.value}\n${result}\n\n`;
        consoleInput.value = '';
    } catch (error) {
        consoleOutput.value += `Error: ${error}\n\n`;
    }
    
    // Scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function populateSystemInfo() {
    document.getElementById('userAgentInfo').textContent = navigator.userAgent;
    document.getElementById('browserInfo').textContent = navigator.appName;
    document.getElementById('platformInfo').textContent = navigator.platform;
    document.getElementById('languageInfo').textContent = navigator.language;
    document.getElementById('screenInfo').textContent = `${screen.width}x${screen.height}`;
}

function capturePerformanceMetrics() {
    if (performance) {
        const memory = performance.memory;
        const loadTime = performance.now();
        
        document.getElementById('memoryUsage').textContent = memory ? 
            `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB` : 
            'Not available';
        
        document.getElementById('pageLoadTime').textContent = Math.round(loadTime);
    }
}

function refreshLocalStorageView() {
    const tableBody = document.getElementById('localStorageEntries');
    tableBody.innerHTML = ''; // Clear existing entries
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        
        const row = tableBody.insertRow();
        const keyCell = row.insertCell(0);
        const valueCell = row.insertCell(1);
        
        keyCell.textContent = key;
        valueCell.textContent = value;
    }
}

// Initialize dev tools on page load
window.addEventListener('load', () => {
    populateSystemInfo();
    capturePerformanceMetrics();
    refreshLocalStorageView();
});
 function executeDevCommand() {
    const consoleInput = document.getElementById('devConsoleInput');
    const consoleOutput = document.getElementById('devConsoleOutput');
    
    const command = consoleInput.value.trim();
    
    if (!command) return; // Don't process empty input
    
    try {
        // Capture the original console.log method
        const originalLog = console.log;
        let outputBuffer = [];
        
        // Override console.log to capture output
        console.log = (...args) => {
            outputBuffer.push(args.map(String).join(' '));
        };
        
        // Evaluate the command
        const result = eval(command);
        
        // Restore original console.log
        console.log = originalLog;
        
        // Prepare output
        let outputText = `> ${command}\n`;
        
        // Add any captured console.log outputs
        if (outputBuffer.length > 0) {
            outputText += `Console Output:\n${outputBuffer.join('\n')}\n`;
        }
        
        // Add the result (if not undefined)
        if (result !== undefined) {
            outputText += `Result: ${JSON.stringify(result)}\n\n`;
        }
        
        // Append to output
        consoleOutput.value += outputText;
        
        // Clear input
        consoleInput.value = '';
    } catch (error) {
        // Append error to output
        consoleOutput.value += `> ${command}\nError: ${error.toString()}\n\n`;
    }
    
    // Scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

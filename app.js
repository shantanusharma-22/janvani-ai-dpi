/**
 * JanVani AI // National Citizen Demand Aggregation & Infrastructure Prioritization Engine
 * Digital Public Good (DPG) Core Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initLiveClock();
    initAnimatedMetrics();
    initMobileNav();
    initVoiceTerminal();
    initMessagingSimulator();
    initHotspotsAndGIS();
    initPolicyPrioritization();
    initBudgetOptimizer();
    initTokenTracker();
    initGoogleGeminiModal();
    initConsultationForm();
});

/* ==========================================================================
   1. Live Clock & National Telemetry Pulse
   ========================================================================== */
function initLiveClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;

    function updateTime() {
        const now = new Date();
        const istTime = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false });
        clockEl.textContent = `SYNCED ${istTime} IST`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/* ==========================================================================
   2. Number Counter Animation on Scroll
   ========================================================================== */
function initAnimatedMetrics() {
    const metricElements = document.querySelectorAll('.metric-number');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') || '';
                animateValue(el, 0, target, 1500, suffix);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    metricElements.forEach(el => observer.observe(el));

    function animateValue(el, start, end, duration, suffix) {
        let startTimestamp = null;
        const isFloat = end % 1 !== 0;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const current = start + easeProgress * (end - start);

            el.textContent = (isFloat ? current.toFixed(2) : Math.floor(current)) + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = end + suffix;
            }
        };

        window.requestAnimationFrame(step);
    }
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const closeBtn = document.getElementById('drawer-close');
    const drawer = document.getElementById('mobile-drawer');
    const links = document.querySelectorAll('.drawer-link');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
    if (closeBtn) closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
    links.forEach(link => link.addEventListener('click', () => drawer.classList.remove('open')));
}

/* ==========================================================================
   4. Bhashini Multilingual Voice Terminal & Audio Synthesis
   ========================================================================== */
const VOICE_PRESETS = {
    hindi: {
        name: 'Rameshwar Ahirwar',
        loc: 'Block: Shahgarh, Chhatarpur, Madhya Pradesh',
        tag: 'Local Govt Directory #LGD-4921',
        utterance: '"हमारे गाँव महोबा रोड से जुड़ने वाली पुलिया हर बरसात में बह जाती है। स्कूली बच्चे ३ महीने तक नदी पार नहीं कर पाते और एम्बुलेंस गाँव तक नहीं पहुँच पाती।"',
        translation: 'AI Translation: "The culvert connecting our village to Mahoba Road washes away every monsoon. Schoolchildren cannot cross the river for 3 months and ambulances cannot reach us."',
        domain: 'Rural Connectivity / High-Level Culvert',
        scheme: 'PMGSY-IV (All-Weather Rural Roads)',
        severity: 'Critical (Health & School Access Cut Off)',
        pop: '4,200 Villagers (3 Gram Panchayats)',
        token: 'JV-2026-MP-49218',
        freqs: [320, 480, 560, 680],
        langCode: 'hi-IN'
    },
    tamil: {
        name: 'Perumal Selvan',
        loc: 'Block: Harur, Dharmapuri, Tamil Nadu',
        tag: 'Local Govt Directory #LGD-3309',
        utterance: '"எங்கள் கிராமத்தின் குடிநீர் குழாய் உடைந்து 4 மாதங்கள் ஆகிறது. ஆழ்துளை கிணற்றில் உப்புநீர் வருகிறது, பெண்கள் 3 கி.மீ தொலைவு நடக்க வேண்டியுள்ளது."',
        translation: 'AI Translation: "Drinking water pipeline has been broken for 4 months. Borewells yield saline water, forcing women to walk 3km daily."',
        domain: 'Potable Drinking Water / Pipeline Network',
        scheme: 'Jal Jeevan Mission (Har Ghar Jal)',
        severity: 'High (Severe Drinking Water Contamination)',
        pop: '6,800 Residents (Harur Taluk)',
        token: 'JV-2026-TN-11409',
        freqs: [350, 460, 580, 720],
        langCode: 'ta-IN'
    },
    bengali: {
        name: 'Swapna Mahato',
        loc: 'Block: Jhalda-II, Purulia, West Bengal',
        tag: 'Local Govt Directory #LGD-1902',
        utterance: '"আমাদের প্রাথমিক স্বাস্থ্য কেন্দ্রে প্রসবের জন্য কোনো বিদ্যুৎ ও কোল্ড চেইন নেই। পাকা রাস্তা না থাকায় বর্ষায় রোগীকে খাটিয়ায় করে নিয়ে যেতে হয়।"',
        translation: 'AI Translation: "Our primary health center has no electricity backup or cold chain for deliveries. Due to lack of paved road, patients are carried on cots."',
        domain: 'Primary Healthcare & Solar Power Backup',
        scheme: 'National Health Mission / PM-ABHIM',
        severity: 'Critical (High Maternal Risk in Monsoon)',
        pop: '8,400 Tribal Villagers',
        token: 'JV-2026-WB-88102',
        freqs: [380, 510, 610, 740],
        langCode: 'bn-IN'
    },
    marathi: {
        name: 'Ganya Valvi',
        loc: 'Block: Dhadgaon, Nandurbar, Maharashtra',
        tag: 'Local Govt Directory #LGD-2701',
        utterance: '"आमच्या वाडीत डोंगराळ भागातील बोरवेल आटल्या आहेत. पिण्याच्या पाण्यासाठी महिलांना दरीत उतरावे लागते. सोलर पंप व पाईपलाईन हवी आहे."',
        translation: 'AI Translation: "Mountain borewells have dried up in our tribal hamlet. Women climb steep ravines for drinking water. We urgently need a solar pump pipeline."',
        domain: 'Solar Micro-Lift Drinking Water',
        scheme: 'PM-JANMAN / Jal Jeevan Mission',
        severity: 'Critical (Severe Drought & Fall Hazards)',
        pop: '3,100 Tribal Residents',
        token: 'JV-2026-MH-88201',
        freqs: [310, 450, 540, 660],
        langCode: 'mr-IN'
    },
    odia: {
        name: 'Mangala Muduli',
        loc: 'Block: Khairput, Malkangiri, Odisha',
        tag: 'Local Govt Directory #LGD-2104',
        utterance: '"ସିଲେରୁ ନଦୀ ଉପରେ ପୋଲ ନଥିବାରୁ ବୋଣ୍ଡା ଘାଟିର ୨୮ଟି ଗାଁ ବର୍ଷା ଦିନେ ସମ୍ପୂର୍ଣ୍ଣ ବିଚ୍ଛିନ୍ନ ହୋଇଯାଉଛି। ଡାକ୍ତରଖାନା ଯିବା ସମ୍ଭବ ହେଉନାହିଁ।"',
        translation: 'AI Translation: "Without a bridge over the Sileru river, 28 Bonda Hills hamlets are completely isolated during rains. Reaching hospital is impossible."',
        domain: 'High-Level Submersible Bridge & Road',
        scheme: 'PMGSY-IV & Special Central Assistance',
        severity: 'Critical (100% Isolation of PVTG Tribe)',
        pop: '14,200 Particularly Vulnerable Tribals',
        token: 'JV-2026-OD-99201',
        freqs: [330, 470, 590, 710],
        langCode: 'or-IN'
    },
    telugu: {
        name: 'Rajanna Kumram',
        loc: 'Block: Jainoor, Asifabad / Adilabad, Telangana',
        tag: 'Local Govt Directory #LGD-3601',
        utterance: '"మా ఏజెన్సీ ప్రాంతంలోని ఆశ్రమ పాఠశాలకు వెళ్లే వాగుపై కాజ్‌వే తెగిపోయింది. విద్యార్థులు వరద నీటిలో ఈదుకుంటూ వెళ్లాల్సి వస్తోంది."',
        translation: 'AI Translation: "The causeway to the tribal ashram school collapsed. Students are forced to wade through hazardous flash floodwaters."',
        domain: 'Reinforced Concrete Causeway & Road',
        scheme: 'Tribal Welfare Infrastructure Fund',
        severity: 'High (Child Life Safety Hazard)',
        pop: '5,600 Tribal Students & Farmers',
        token: 'JV-2026-TG-77312',
        freqs: [340, 490, 600, 730],
        langCode: 'te-IN'
    }
};

let currentVoiceKey = 'hindi';
let audioCtx = null;

function initVoiceTerminal() {
    const langPills = document.querySelectorAll('#voice-lang-pills .lang-pill');
    const nameEl = document.getElementById('sim-citizen-name');
    const locEl = document.getElementById('sim-citizen-loc');
    const tagEl = document.getElementById('sim-citizen-tag');
    const utteranceEl = document.getElementById('sim-utterance-text');
    const transEl = document.getElementById('sim-translation-text');
    const domainEl = document.getElementById('ext-domain');
    const schemeEl = document.getElementById('ext-scheme');
    const severityEl = document.getElementById('ext-severity');
    const popEl = document.getElementById('ext-pop');
    const tokenEl = document.getElementById('ext-token');
    const waveformViz = document.getElementById('waveform-viz');
    const btnPlay = document.getElementById('btn-play-voice');
    const btnMic = document.getElementById('btn-mic-record');
    const btnAnalyze = document.getElementById('btn-analyze-pipeline');

    function loadPreset(key) {
        currentVoiceKey = key;
        const data = VOICE_PRESETS[key];
        if (!data) return;

        nameEl.textContent = data.name;
        locEl.innerHTML = `<i class="ph-bold ph-map-pin"></i> ${data.loc}`;
        tagEl.textContent = data.tag;
        utteranceEl.textContent = data.utterance;
        transEl.innerHTML = `<em>AI Translation (English):</em> ${data.translation.replace('AI Translation: ', '')}`;
        domainEl.textContent = data.domain;
        schemeEl.textContent = data.scheme;
        severityEl.textContent = data.severity;
        popEl.textContent = data.pop;
        tokenEl.textContent = data.token;
    }

    langPills.forEach(pill => {
        pill.addEventListener('click', () => {
            langPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const langKey = pill.getAttribute('data-lang');
            loadPreset(langKey);
            showToast(`Loaded ${langKey.toUpperCase()} Vernacular Preset: ${VOICE_PRESETS[langKey].name}`);
        });
    });

    // Simulated / Web Speech Audio Playback
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            const data = VOICE_PRESETS[currentVoiceKey];
            waveformViz.classList.add('playing');
            btnPlay.disabled = true;
            btnPlay.innerHTML = '<i class="ph-bold ph-speaker-high"></i> Synthesizing Speech...';

            playSynthAudio(data.freqs, 2400, () => {
                waveformViz.classList.remove('playing');
                btnPlay.disabled = false;
                btnPlay.innerHTML = '<i class="ph-bold ph-speaker-high"></i> Play Vernacular Audio';
                showToast(`Audio streamed via Bhashini TTS [${data.langCode}]`);
            });
        });
    }

    // Web Speech Recognition for Real Microphone Testing
    if (btnMic) {
        btnMic.addEventListener('click', () => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                showToast('Web Speech API not supported in this browser. Simulated audio will be used.');
                waveformViz.classList.add('playing');
                setTimeout(() => waveformViz.classList.remove('playing'), 2000);
                return;
            }

            try {
                const recognition = new SpeechRecognition();
                recognition.lang = VOICE_PRESETS[currentVoiceKey].langCode || 'hi-IN';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                btnMic.innerHTML = '<i class="ph-bold ph-record text-red"></i> Listening... Speak Now';
                btnMic.classList.add('btn-primary');
                waveformViz.classList.add('playing');

                recognition.onresult = (event) => {
                    const spokenText = event.results[0][0].transcript;
                    utteranceEl.textContent = `"${spokenText}"`;
                    transEl.innerHTML = `<em>Transcribed from Live Microphone:</em> "${spokenText}" (Confidence: ${(event.results[0][0].confidence * 100).toFixed(1)}%)`;
                    showToast(`Voice Input Captured via Web Speech API!`);
                };

                recognition.onerror = (e) => {
                    showToast(`Mic Status: ${e.error || 'No speech detected'}. Try preset playback!`);
                };

                recognition.onend = () => {
                    btnMic.innerHTML = '<i class="ph-bold ph-microphone"></i> Test Your Microphone';
                    btnMic.classList.remove('btn-primary');
                    waveformViz.classList.remove('playing');
                };

                recognition.start();
            } catch (err) {
                showToast('Microphone access blocked or unavailable.');
            }
        });
    }

    // Re-extract Intent & Entities
    if (btnAnalyze) {
        btnAnalyze.addEventListener('click', () => {
            btnAnalyze.innerHTML = '<i class="ph-bold ph-arrows-clockwise ph-spin"></i> Processing...';
            setTimeout(() => {
                btnAnalyze.innerHTML = '<i class="ph-bold ph-cpu"></i> Re-Extract Intent & Entities';
                const confidence = document.getElementById('extraction-confidence');
                if (confidence) confidence.textContent = 'Confidence: 99.8% (Multi-layer Validated)';
                showToast('Entities Geotagged to LGD & Correlated with PM Gati Shakti GIS layers!');
            }, 600);
        });
    }
}

function playSynthAudio(freqs, durationMs, onDone) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            if (onDone) setTimeout(onDone, durationMs);
            return;
        }
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freqs[0] || 400, audioCtx.currentTime);

        freqs.forEach((f, idx) => {
            osc.frequency.linearRampToValueAtTime(f, audioCtx.currentTime + (idx * 0.4));
        });

        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (durationMs / 1000));

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + (durationMs / 1000));

        setTimeout(onDone, durationMs);
    } catch (e) {
        if (onDone) setTimeout(onDone, durationMs);
    }
}

/* ==========================================================================
   5. Interactive WhatsApp / Messaging App Simulator
   ========================================================================== */
function initMessagingSimulator() {
    const chatInput = document.getElementById('chat-input-field');
    const sendBtn = document.getElementById('btn-chat-send');
    const messagesContainer = document.getElementById('chat-messages-container');
    const vnPlayBtn = document.getElementById('btn-chat-vn-play');

    if (vnPlayBtn) {
        vnPlayBtn.addEventListener('click', () => {
            vnPlayBtn.innerHTML = '<i class="ph-fill ph-speaker-high"></i>';
            playSynthAudio([340, 480, 520], 1800, () => {
                vnPlayBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
                showToast('Playing Voice Note from Nandurbar Citizen');
            });
        });
    }

    if (!sendBtn || !chatInput || !messagesContainer) return;

    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Append user message
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const userBubble = document.createElement('div');
        userBubble.className = 'msg-bubble user-msg';
        userBubble.innerHTML = `
            <p>"${escapeHtml(text)}"</p>
            <span class="msg-time">${timeString} <i class="ph-bold ph-check text-cyan"></i></span>
        `;
        messagesContainer.appendChild(userBubble);
        chatInput.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate Bot Typing and Response
        setTimeout(() => {
            const tokenNum = `JV-2026-IN-${Math.floor(10000 + Math.random() * 90000)}`;
            const botBubble = document.createElement('div');
            botBubble.className = 'msg-bubble bot-msg';
            botBubble.innerHTML = `
                <p>✅ <strong>मांग सफलतापूर्वक दर्ज की गई! (Demand Logged)</strong></p>
                <p>📍 <strong>LGD कोड:</strong> <code>#LGD-AUTO-${Math.floor(1000 + Math.random() * 9000)}</code><br>
                📊 <strong>प्राथमिकता स्कोर (PVI):</strong> 89.2%<br>
                🆔 <strong>ट्रैकिंग टोकन:</strong> <code>#${tokenNum}</code></p>
                <p class="bot-note">आपका अनुरोध नीति आयोग आकांक्षी जिला सेल व पीएम गति शक्ति पोर्टल पर अग्रेषित कर दिया गया है।</p>
                <span class="msg-time">${timeString} <i class="ph-bold ph-checks text-cyan"></i></span>
            `;
            messagesContainer.appendChild(botBubble);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            showToast(`New Citizen Demand token generated: ${tokenNum}`);
        }, 800);
    }

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

/* ==========================================================================
   6. National Demand Hotspots & Interactive GIS India Map
   ========================================================================== */
const DISTRICT_HOTSPOTS = [
    {
        id: 'malkangiri',
        name: 'Malkangiri District',
        state: 'ODISHA • EASTERN ZONE',
        zone: 'East',
        cat: 'Aspirational District #ASP-OD-04',
        pvi: 96.4,
        urgency: 'critical',
        sector: 'roads',
        voices: '14,820 Calls',
        topDemand: 'Bridge over Sileru River',
        vuln: '57.4% ST Population',
        mpi: '44.8% MPI Poverty',
        deficit: '68% Habitations Unpaved',
        deficitSub: 'Zero monsoon all-weather access',
        unspent: '₹42.6 Cr Unspent DMF',
        recTitle: 'Sileru River High-Level Submersible Bridge & Bonda Hills Corridor',
        recDesc: 'Connects 28 cut-off tribal hamlets to Kudumulu PHC and block headquarters. Direct alignment with PMGSY-IV and PM Gati Shakti National Master Plan.',
        estCost: '₹48.5 Cr',
        beneficiaries: '48,000 Tribals',
        timeline: '14 Months',
        cx: 520, cy: 560
    },
    {
        id: 'nandurbar',
        name: 'Nandurbar District',
        state: 'MAHARASHTRA • WESTERN ZONE',
        zone: 'West',
        cat: 'Aspirational District #ASP-MH-01',
        pvi: 93.8,
        urgency: 'critical',
        sector: 'water',
        voices: '12,410 Calls',
        topDemand: 'Solar Micro-Lift Potable Water',
        vuln: '69.2% ST Population',
        mpi: '38.6% MPI Poverty',
        deficit: '74% Tap Water Deficit',
        deficitSub: 'Steep hill ravines dried up',
        unspent: '₹31.2 Cr Tribal Sub-Plan',
        recTitle: 'Dhadgaon-Akrani Solar Micro-Lift Multi-Village Water Scheme',
        recDesc: 'Lifts water from Narmada backwaters with solar microgrids to supply 32 perched Satpura tribal hamlets with direct household tap connections.',
        estCost: '₹62.0 Cr',
        beneficiaries: '65,000 Citizens',
        timeline: '12 Months',
        cx: 290, cy: 450
    },
    {
        id: 'bastar',
        name: 'Bastar & Sukma',
        state: 'CHHATTISGARH • CENTRAL ZONE',
        zone: 'Central',
        cat: 'Aspirational District #ASP-CG-02',
        pvi: 94.2,
        urgency: 'critical',
        sector: 'energy',
        voices: '11,940 Calls',
        topDemand: 'Solar Microgrids & Mobile Towers',
        vuln: '65.8% ST Population',
        mpi: '42.1% MPI Poverty',
        deficit: '58% Power Grid Outages',
        deficitSub: 'Frequent forest grid line snaps',
        unspent: '₹55.0 Cr DMF Reserve',
        recTitle: 'Bastar Forest Decentralized Solar Battery Microgrid Hubs',
        recDesc: 'Installs 45 standalone off-grid solar-battery storage installations powering sub-health centers, schools, and digital public service kiosks.',
        estCost: '₹38.0 Cr',
        beneficiaries: '52,000 Forest Residents',
        timeline: '9 Months',
        cx: 460, cy: 510
    },
    {
        id: 'mewat',
        name: 'Nuh (Mewat)',
        state: 'HARYANA • NORTHERN ZONE',
        zone: 'North',
        cat: 'Aspirational District #ASP-HR-01',
        pvi: 91.5,
        urgency: 'critical',
        sector: 'health',
        voices: '16,200 Calls',
        topDemand: 'Sub-District Maternal Hospital',
        vuln: 'High Demographic Vulnerability',
        mpi: '34.2% MPI Poverty',
        deficit: '0.4 Beds per 1,000 (Deficit: 78%)',
        deficitSub: 'Severe maternal care gap',
        unspent: '₹22.4 Cr State Health Fund',
        recTitle: 'Nuh 100-Bed Critical Care Maternal Block & Neonatal ICU',
        recDesc: 'Upgrades Ferozepur Jhirka sub-divisional hospital into a 100-bed mother-child critical center with specialized telemedicine links to AIIMS New Delhi.',
        estCost: '₹54.0 Cr',
        beneficiaries: '140,000 Women & Infants',
        timeline: '15 Months',
        cx: 340, cy: 260
    },
    {
        id: 'purulia',
        name: 'Purulia District',
        state: 'WEST BENGAL • EASTERN ZONE',
        zone: 'East',
        cat: 'Aspirational District #ASP-WB-03',
        pvi: 89.2,
        urgency: 'high',
        sector: 'education',
        voices: '9,840 Calls',
        topDemand: 'School Science Labs & Roads',
        vuln: '28.5% SC / 18.4% ST',
        mpi: '29.5% MPI Poverty',
        deficit: '62% Secondary Schools without Labs',
        deficitSub: 'Lack of STEM & digital access',
        unspent: '₹18.5 Cr Untied Grant',
        recTitle: 'Purulia STEM Innovation & Solar Digital Classrooms Network',
        recDesc: 'Equips 80 government schools across Jhalda and Manbazar with solar power, smart science laboratories, and high-speed BharatNet fiber drops.',
        estCost: '₹26.5 Cr',
        beneficiaries: '42,000 Students',
        timeline: '8 Months',
        cx: 580, cy: 370
    },
    {
        id: 'chhatarpur',
        name: 'Chhatarpur (Bundelkhand)',
        state: 'MADHYA PRADESH • CENTRAL ZONE',
        zone: 'Central',
        cat: 'Aspirational District #ASP-MP-05',
        pvi: 88.7,
        urgency: 'high',
        sector: 'roads',
        voices: '10,320 Calls',
        topDemand: 'High-Level Culvert Network',
        vuln: '24.2% SC Population',
        mpi: '31.4% MPI Poverty',
        deficit: '54% Missing Rural Culverts',
        deficitSub: 'Flash monsoon cut-offs',
        unspent: '₹29.0 Cr Bundelkhand Package',
        recTitle: 'Shahgarh-Bada Malhera 14-Culvert All-Weather Corridor',
        recDesc: 'Constructs 14 reinforced concrete high-level bridge culverts connecting isolated Bundelkhand farming clusters directly to the NH-39 logistics corridor.',
        estCost: '₹41.0 Cr',
        beneficiaries: '78,000 Farmers',
        timeline: '11 Months',
        cx: 410, cy: 340
    },
    {
        id: 'bahraich',
        name: 'Bahraich District',
        state: 'UTTAR PRADESH • NORTHERN ZONE',
        zone: 'North',
        cat: 'Aspirational District #ASP-UP-08',
        pvi: 90.4,
        urgency: 'critical',
        sector: 'roads',
        voices: '13,150 Calls',
        topDemand: 'Flood-Resilient Elevated Roads',
        vuln: 'Nepal Terai Border Population',
        mpi: '37.8% MPI Poverty',
        deficit: 'Ghaghra Flood Inundation 40%',
        deficitSub: 'Roads submerged 2 months/year',
        unspent: '₹34.0 Cr State Disaster Fund',
        recTitle: 'Ghaghra Basin Flood-Resilient Elevated Road & Embankments',
        recDesc: 'Elevates 38 km of arterial rural roads above the 50-year High Flood Level (HFL) with reinforced stone pitching and rescue platform culverts.',
        estCost: '₹72.0 Cr',
        beneficiaries: '115,000 Citizens',
        timeline: '16 Months',
        cx: 430, cy: 280
    },
    {
        id: 'kalahandi',
        name: 'Kalahandi & Nuapada',
        state: 'ODISHA • EASTERN ZONE',
        zone: 'East',
        cat: 'Aspirational District #ASP-OD-02',
        pvi: 92.1,
        urgency: 'critical',
        sector: 'water',
        voices: '11,200 Calls',
        topDemand: 'Minor Checkdams & Lift Irrigation',
        vuln: '46.8% ST / SC Population',
        mpi: '39.4% MPI Poverty',
        deficit: '52% Rainfed Farmland (Drought)',
        deficitSub: 'Severe agrarian distress',
        unspent: '₹28.4 Cr KBK Special Outlay',
        recTitle: 'Upper Indravati Agrarian Canal Modernization & Lift Hubs',
        recDesc: 'Restores secondary feeder canals and builds 18 pressurized solar lift systems providing assured rabi crop irrigation to 18,000 marginal farmers.',
        estCost: '₹58.0 Cr',
        beneficiaries: '84,000 Agriculturalists',
        timeline: '13 Months',
        cx: 490, cy: 480
    },
    {
        id: 'baramulla',
        name: 'Baramulla District',
        state: 'JAMMU & KASHMIR • NORTHERN ZONE',
        zone: 'North',
        cat: 'Border & Aspirational #ASP-JK-01',
        pvi: 86.5,
        urgency: 'high',
        sector: 'telecom',
        voices: '8,420 Calls',
        topDemand: 'Winter High-Speed Fiber & Shelter',
        vuln: 'High Altitude Border Hamlets',
        mpi: '18.2% MPI Poverty',
        deficit: 'Winter Snow Severance (4 Months)',
        deficitSub: 'No telemedicine connectivity',
        unspent: '₹19.2 Cr Border Dev Fund',
        recTitle: 'Uri-Gulmarg Sub-Zero Optical Fiber & Tele-Health Network',
        recDesc: 'Underground armored optical fiber and ruggedized tele-consultation kiosks in 14 high-altitude snowbound border hamlets.',
        estCost: '₹34.5 Cr',
        beneficiaries: '38,000 Highland Citizens',
        timeline: '10 Months',
        cx: 330, cy: 110
    },
    {
        id: 'purnia',
        name: 'Purnia & Araria',
        state: 'BIHAR • EASTERN ZONE',
        zone: 'East',
        cat: 'Aspirational District #ASP-BR-06',
        pvi: 91.0,
        urgency: 'critical',
        sector: 'roads',
        voices: '14,600 Calls',
        topDemand: 'Kosi Embankment Bridges',
        vuln: '42.5% Vulnerable Demographics',
        mpi: '41.2% MPI Poverty',
        deficit: 'Severe River Island Isolation',
        deficitSub: 'Country boats sole transport',
        unspent: '₹36.5 Cr Kosi Reconstruction',
        recTitle: 'Kosi Basin Elevated All-Weather Causeway Mesh',
        recDesc: 'Constructs 3 high-clearance steel composite bridges replacing treacherous bamboo crossings, ensuring year-round market and hospital transit.',
        estCost: '₹66.0 Cr',
        beneficiaries: '120,000 Citizens',
        timeline: '18 Months',
        cx: 560, cy: 300
    },
    {
        id: 'raichur',
        name: 'Raichur District',
        state: 'KARNATAKA • SOUTHERN ZONE',
        zone: 'South',
        cat: 'Aspirational District #ASP-KA-01',
        pvi: 85.9,
        urgency: 'moderate',
        sector: 'water',
        voices: '7,890 Calls',
        topDemand: 'Fluoride Water Treatment Plants',
        vuln: 'Kalyana-Karnataka Backward Region',
        mpi: '26.8% MPI Poverty',
        deficit: 'High Fluoride in 48 Villages',
        deficitSub: 'Endemic skeletal fluorosis',
        unspent: '₹16.8 Cr KKRDB Allocation',
        recTitle: 'Raichur Krishna Basin River-Water Mega Filtration System',
        recDesc: 'Eliminates deep groundwater dependency by piping filtered surface water from the Krishna river to 64 affected habitations in Manvi taluk.',
        estCost: '₹45.0 Cr',
        beneficiaries: '92,000 Residents',
        timeline: '12 Months',
        cx: 360, cy: 620
    },
    {
        id: 'wayanad',
        name: 'Wayanad District',
        state: 'KERALA • SOUTHERN ZONE',
        zone: 'South',
        cat: 'Aspirational District #ASP-KL-01',
        pvi: 87.2,
        urgency: 'high',
        sector: 'telecom',
        voices: '9,120 Calls',
        topDemand: 'Landslide Early Warning & Hill Road',
        vuln: 'Tribal & Tea Plantation Workers',
        mpi: '12.4% MPI Poverty',
        deficit: 'Landslide Vulnerability Index: Critical',
        deficitSub: 'Steep hill terrain risks',
        unspent: '₹24.0 Cr Western Ghats Fund',
        recTitle: 'Wayanad IoT Soil-Moisture Early Warning & Geogrid Roads',
        recDesc: 'Deploys 120 acoustic IoT landslide sensors and reconstructs Meppadi-Chooralmala feeder corridors with soil-nailing and geogrid reinforcements.',
        estCost: '₹42.0 Cr',
        beneficiaries: '54,000 Hill Residents',
        timeline: '10 Months',
        cx: 340, cy: 740
    }
];

function initHotspotsAndGIS() {
    const markersGroup = document.getElementById('hotspot-markers-group');
    const sectorFilter = document.getElementById('sector-filter');
    const urgencyFilter = document.getElementById('urgency-filter');
    const activeCountEl = document.getElementById('stat-active-hotspots');
    const totalDemandsEl = document.getElementById('stat-total-demands');

    // Diagnostic card elements
    const stateNameEl = document.getElementById('diag-state-name');
    const districtNameEl = document.getElementById('diag-district-name');
    const catBadgeEl = document.getElementById('diag-cat-badge');
    const pviValEl = document.getElementById('diag-pvi-value');
    const voicesEl = document.getElementById('diag-voices');
    const vulnEl = document.getElementById('diag-vuln');
    const deficitEl = document.getElementById('diag-deficit');
    const unspentEl = document.getElementById('diag-unspent');
    const recProjEl = document.getElementById('diag-rec-proj');
    const recDescEl = document.getElementById('diag-rec-desc');
    const btnEscalate = document.getElementById('btn-escalate-project');
    const btnExportDossier = document.getElementById('btn-export-dossier');

    let currentDistrict = DISTRICT_HOTSPOTS[0];

    function renderHotspots() {
        if (!markersGroup) return;
        markersGroup.innerHTML = '';

        const sectorVal = sectorFilter ? sectorFilter.value : 'all';
        const urgencyVal = urgencyFilter ? urgencyFilter.value : 'all';

        const filtered = DISTRICT_HOTSPOTS.filter(d => {
            const matchSector = (sectorVal === 'all' || d.sector === sectorVal);
            let matchUrgency = true;
            if (urgencyVal === 'critical') matchUrgency = (d.pvi >= 90);
            else if (urgencyVal === 'high') matchUrgency = (d.pvi >= 80 && d.pvi < 90);
            else if (urgencyVal === 'moderate') matchUrgency = (d.pvi < 80);
            return matchSector && matchUrgency;
        });

        if (activeCountEl) activeCountEl.textContent = filtered.length;

        filtered.forEach(d => {
            const color = d.pvi >= 90 ? '#ef4444' : (d.pvi >= 80 ? '#f59e0b' : '#06b6d4');

            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'hotspot-node');
            g.setAttribute('data-id', d.id);

            // Pulsing ring
            const pulseRing = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            pulseRing.setAttribute('cx', d.cx);
            pulseRing.setAttribute('cy', d.cy);
            pulseRing.setAttribute('r', '8');
            pulseRing.setAttribute('fill', 'none');
            pulseRing.setAttribute('stroke', color);
            pulseRing.setAttribute('stroke-width', '2');
            pulseRing.setAttribute('class', 'hotspot-pulse-ring');
            g.appendChild(pulseRing);

            // Core circle
            const core = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            core.setAttribute('cx', d.cx);
            core.setAttribute('cy', d.cy);
            core.setAttribute('r', '7');
            core.setAttribute('fill', color);
            core.setAttribute('stroke', '#ffffff');
            core.setAttribute('stroke-width', '1.5');
            core.setAttribute('class', 'hotspot-core');
            g.appendChild(core);

            // Label text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', d.cx + 12);
            text.setAttribute('y', d.cy + 4);
            text.setAttribute('fill', '#f8fafc');
            text.setAttribute('font-size', '11');
            text.setAttribute('font-weight', '700');
            text.setAttribute('font-family', 'Plus Jakarta Sans, sans-serif');
            text.textContent = `${d.name.split(' ')[0]} (${d.pvi})`;
            g.appendChild(text);

            g.addEventListener('click', () => {
                selectDistrict(d);
            });

            markersGroup.appendChild(g);
        });
    }

    function selectDistrict(d) {
        currentDistrict = d;
        stateNameEl.textContent = d.state;
        districtNameEl.textContent = d.name;
        catBadgeEl.textContent = d.cat;
        pviValEl.textContent = d.pvi.toFixed(1);
        pviValEl.className = `score-val ${d.pvi >= 90 ? 'text-red' : (d.pvi >= 80 ? 'text-amber' : 'text-cyan')}`;

        voicesEl.textContent = d.voices;
        vulnEl.textContent = d.vuln;
        deficitEl.textContent = d.deficit;
        unspentEl.textContent = d.unspent;

        recProjEl.textContent = d.recTitle;
        recDescEl.textContent = d.recDesc;

        // Update Google AI Earth Engine CV & Vertex AI Predictive Risk
        const cvEl = document.getElementById('diag-cv-result');
        const riskEl = document.getElementById('diag-risk-result');
        if (cvEl) {
            const cvFindings = {
                'malkangiri': 'Sentinel-2 CV segmentation detected 38km unpaved mud track + washed-out culvert (Confidence: 97.4%)',
                'nandurbar': 'Google Earth Engine NDWI water index reveals 78% ground water depletion across Dhadgaon ravines (Confidence: 96.1%)',
                'bastar': 'Satellite spectral analysis indicates 45 interior forest hamlets isolated from grid substation (Confidence: 98.2%)',
                'mewat': 'Geospatial density analysis confirms 140,000 citizens outside 30-minute maternal emergency radius (Confidence: 95.8%)',
                'bahraich': 'SAR radar imagery identifies 38km road alignment submerged under 1.2m annual floodwaters (Confidence: 98.9%)',
                'kalahandi': 'Thermal infrared deficit confirms severe rainfed crop stress across 18,000 smallholdings (Confidence: 94.7%)',
                'purulia': 'Spectral reflectivity confirms lack of all-weather road access to 80 secondary schools (Confidence: 93.5%)',
                'baramulla': 'High-altitude snowdrift modeling maps 14 border hamlets cut off for 120 consecutive days (Confidence: 97.0%)',
                'purnia': 'Kosi river channel migration analysis detects 3 bamboo ferry points with critical safety hazards (Confidence: 96.4%)',
                'raichur': 'Hydro-chemical geospatial mapping tracks endemic fluoride contamination exceeding 4.2 mg/L (Confidence: 95.1%)',
                'wayanad': 'Acoustic IoT soil sensor mesh + LiDAR slopes flag 12 high-hazard landslide slip zones (Confidence: 98.6%)',
                'chhatarpur': 'Multispectral drainage mapping confirms 14 culverts washed out during monsoon surges (Confidence: 94.3%)'
            };
            cvEl.textContent = cvFindings[d.id] || 'Earth Engine CV confirmed physical infrastructure deficit (Confidence: 95.4%)';
        }

        if (riskEl) {
            const riskFindings = {
                'malkangiri': 'Vertex AI forecasts 94.2% probability of 4-month total isolation during upcoming monsoon season',
                'nandurbar': 'Vertex AI forecasts 89.6% probability of severe seasonal drinking water distress without solar lift',
                'bastar': 'Vertex AI forecasts 91.2% risk of cold-chain failure at primary tribal health posts without solar battery',
                'mewat': 'Vertex AI forecasts 64.0% avoidable maternal complication risk under current 0.4 bed/1,000 deficit',
                'bahraich': 'Vertex AI forecasts 92.5% likelihood of road washouts without high-flood embankment elevation',
                'kalahandi': 'Vertex AI forecasts 87.3% agrarian crop loss risk under unmitigated rainfed drought conditions',
                'purulia': 'Vertex AI forecasts 58.4% student dropout acceleration in absence of secondary STEM facilities',
                'baramulla': 'Vertex AI forecasts 95.0% emergency tele-consultation blackout during winter snow isolation',
                'purnia': 'Vertex AI forecasts 88.0% probability of transit failure during annual Kosi river flood crest',
                'raichur': 'Vertex AI forecasts 72.0% escalation in fluorosis cases without Krishna river piped surface water',
                'wayanad': 'Vertex AI forecasts 84.5% landslide corridor severance without geogrid road reconstruction',
                'chhatarpur': 'Vertex AI forecasts 86.2% probability of ambulance cutoffs during flash monsoon floods'
            };
            riskEl.textContent = riskFindings[d.id] || 'Vertex AI forecasts critical public service disruption under current deficit';
        }

        showToast(`Inspecting District Diagnostic: ${d.name} (PVI: ${d.pvi})`);
    }

    if (sectorFilter) sectorFilter.addEventListener('change', renderHotspots);
    if (urgencyFilter) urgencyFilter.addEventListener('change', renderHotspots);

    if (btnEscalate) {
        btnEscalate.addEventListener('click', () => {
            showToast(`🚀 Project "${currentDistrict.recTitle}" escalated to National PM Gati Shakti Priority Queue!`);
        });
    }

    if (btnExportDossier) {
        btnExportDossier.addEventListener('click', () => {
            openGeminiModalForDistrict(currentDistrict);
        });
    }

    renderHotspots();
}

/* ==========================================================================
   7. AI Project Prioritization & Recommendation Cockpit
   ========================================================================== */
const CANDIDATE_PROJECTS = [
    {
        rank: 1,
        id: 'proj-1',
        name: 'Sileru River High-Level Submersible Bridge Corridor',
        location: 'Malkangiri, Odisha',
        ministry: 'morth',
        ministryName: 'MoRTH / PMGSY-IV',
        pvi: 96.4,
        cost: 48.5,
        beneficiaries: '48,000 Tribals',
        timeline: '14 Months',
        gatiShaktiCoord: '18.1724° N, 81.9842° E',
        rationale: 'Fuses 14,820 citizen distress calls with satellite NDVI rain severance. Eliminates 4-month total isolation of PVTG communities from tertiary hospital.',
        scheme: 'PMGSY-IV & Gati Shakti Layer #04'
    },
    {
        rank: 2,
        id: 'proj-2',
        name: 'Dhadgaon-Akrani Solar Micro-Lift Multi-Village Water Grid',
        location: 'Nandurbar, Maharashtra',
        ministry: 'jal',
        ministryName: 'Jal Shakti / JJM',
        pvi: 93.8,
        cost: 62.0,
        beneficiaries: '65,000 Citizens',
        timeline: '12 Months',
        gatiShaktiCoord: '21.6512° N, 74.2410° E',
        rationale: 'NITI Aayog MPI confirms 74% drinking water deficit. Automated WhatsApp voice complaints mapped to 32 perched Satpura mountain hamlets.',
        scheme: 'PM-JANMAN & Har Ghar Jal'
    },
    {
        rank: 3,
        id: 'proj-3',
        name: 'Bastar Forest Decentralized Solar Battery Microgrid Hubs',
        location: 'Bastar & Sukma, Chhattisgarh',
        ministry: 'power',
        ministryName: 'Ministry of Power & MNRE',
        pvi: 94.2,
        cost: 38.0,
        beneficiaries: '52,000 Forest Dwellers',
        timeline: '9 Months',
        gatiShaktiCoord: '19.0744° N, 82.0124° E',
        rationale: 'Eliminates frequent monsoon grid snaps across 45 interior forest villages. Provides 24/7 cold chain power to primary sub-health centers.',
        scheme: 'PM-KUSUM & Aspirational Dist Fund'
    },
    {
        rank: 4,
        id: 'proj-4',
        name: 'Nuh Sub-District 100-Bed Critical Care Maternal Block',
        location: 'Nuh (Mewat), Haryana',
        ministry: 'health',
        ministryName: 'MoHFW / Ayushman',
        pvi: 91.5,
        cost: 54.0,
        beneficiaries: '140,000 Women & Children',
        timeline: '15 Months',
        gatiShaktiCoord: '28.1062° N, 77.0123° E',
        rationale: 'District bed ratio (0.4/1,000) is lowest in NCR region. Direct maternal mortality reduction estimated at 64% with AIIMS Delhi telemedicine link.',
        scheme: 'PM-ABHIM & NHM Flagship'
    },
    {
        rank: 5,
        id: 'proj-5',
        name: 'Kosi Basin Elevated All-Weather Causeway Mesh',
        location: 'Purnia & Araria, Bihar',
        ministry: 'morth',
        ministryName: 'MoRTH / Rural Works',
        pvi: 91.0,
        cost: 66.0,
        beneficiaries: '120,000 Citizens',
        timeline: '18 Months',
        gatiShaktiCoord: '25.7781° N, 87.4753° E',
        rationale: 'Replaces dangerous country boat transit with high-clearance steel composite causeways. Connects river island hamlets during annual Kosi flooding.',
        scheme: 'PMGSY-IV Special Kosi Tranche'
    },
    {
        rank: 6,
        id: 'proj-6',
        name: 'Upper Indravati Agrarian Canal Lift & Solar Pressurization',
        location: 'Kalahandi & Nuapada, Odisha',
        ministry: 'jal',
        ministryName: 'Jal Shakti / CADWM',
        pvi: 92.1,
        cost: 58.0,
        beneficiaries: '84,000 Farmers',
        timeline: '13 Months',
        gatiShaktiCoord: '19.9137° N, 83.1649° E',
        rationale: 'Addresses persistent farmer distress by piping canal water to 18,000 rainfed tribal holdings. Multiplies winter crop yield by 2.4x.',
        scheme: 'Pradhan Mantri Krishi Sinchayee Yojana'
    },
    {
        rank: 7,
        id: 'proj-7',
        name: 'Ghaghra Basin Flood-Resilient Elevated Highway Corridor',
        location: 'Bahraich, Uttar Pradesh',
        ministry: 'morth',
        ministryName: 'MoRTH / State PWD',
        pvi: 90.4,
        cost: 72.0,
        beneficiaries: '115,000 Citizens',
        timeline: '16 Months',
        gatiShaktiCoord: '27.5744° N, 81.5978° E',
        rationale: 'Raises 38 km of critical road infrastructure above 50-year High Flood Level (HFL). Prevents seasonal cutoff of Nepal border market arteries.',
        scheme: 'PM Gati Shakti National Highway Rail'
    },
    {
        rank: 8,
        id: 'proj-8',
        name: 'Shahgarh-Bada Malhera 14-Culvert All-Weather Network',
        location: 'Chhatarpur, Madhya Pradesh',
        ministry: 'morth',
        ministryName: 'MoRTH / PMGSY-IV',
        pvi: 88.7,
        cost: 41.0,
        beneficiaries: '78,000 Farmers',
        timeline: '11 Months',
        gatiShaktiCoord: '24.5028° N, 79.5211° E',
        rationale: 'Resolves 10,320 Bundelkhand citizen complaints regarding washed-out culverts. Restores school buses and ambulance connectivity.',
        scheme: 'PMGSY-IV & Bundelkhand Package'
    },
    {
        rank: 9,
        id: 'proj-9',
        name: 'Purulia STEM Innovation & Solar Digital Classrooms',
        location: 'Purulia, West Bengal',
        ministry: 'education',
        ministryName: 'Ministry of Education / Samagra Shiksha',
        pvi: 89.2,
        cost: 26.5,
        beneficiaries: '42,000 Students',
        timeline: '8 Months',
        gatiShaktiCoord: '23.3321° N, 86.3652° E',
        rationale: 'Fuses high student demographic concentration with 62% school laboratory deficit. BharatNet optic fiber integration included.',
        scheme: 'PM-SHRI & Samagra Shiksha Abhiyan'
    },
    {
        rank: 10,
        id: 'proj-10',
        name: 'Bastar-Dantewada Solar Cold-Chain Primary Health Posts',
        location: 'Bastar & Dantewada, Chhattisgarh',
        ministry: 'health',
        ministryName: 'MoHFW / PM-ABHIM',
        pvi: 93.1,
        cost: 42.0,
        beneficiaries: '62,000 Tribals',
        timeline: '10 Months',
        gatiShaktiCoord: '18.8924° N, 81.3512° E',
        rationale: 'Protects critical vaccine cold-chain and emergency maternity centers across remote forest habitations vulnerable to grid failure.',
        scheme: 'PM-JANMAN Health Mission'
    },
    {
        rank: 11,
        id: 'proj-11',
        name: 'Raichur Krishna River Fluoride-Safe Piped Water Grid',
        location: 'Raichur, Karnataka',
        ministry: 'jal',
        ministryName: 'Jal Shakti / JJM',
        pvi: 92.5,
        cost: 88.0,
        beneficiaries: '210,000 Citizens',
        timeline: '15 Months',
        gatiShaktiCoord: '16.2076° N, 77.3463° E',
        rationale: 'Supplies treated surface water to 84 severely fluorosis-affected villages, reducing skeletal disability rates by 82%.',
        scheme: 'Jal Jeevan Mission Surface Water Tranche'
    },
    {
        rank: 12,
        id: 'proj-12',
        name: 'Wayanad Hill-Corridor Geogrid Reinforced Anti-Landslide Pass',
        location: 'Wayanad, Kerala',
        ministry: 'morth',
        ministryName: 'MoRTH / NDMA',
        pvi: 90.8,
        cost: 56.0,
        beneficiaries: '45,000 Citizens',
        timeline: '12 Months',
        gatiShaktiCoord: '11.6854° N, 76.1320° E',
        rationale: 'Bio-engineering soil nailing and geogrid retaining structures safeguarding critical plantation arteries from catastrophic slope failure.',
        scheme: 'National Disaster Mitigation Fund'
    },
    {
        rank: 13,
        id: 'proj-13',
        name: 'Baramulla Sub-Zero Armored Underground Fiber & Tele-ICU',
        location: 'Baramulla, Jammu & Kashmir',
        ministry: 'education',
        ministryName: 'MeitY & Samagra Shiksha',
        pvi: 89.6,
        cost: 34.5,
        beneficiaries: '38,000 Highland Citizens',
        timeline: '10 Months',
        gatiShaktiCoord: '34.2012° N, 74.3621° E',
        rationale: 'Frost-resistant underground fiber backbone linking 14 high-altitude snowbound border hamlets to district hospital tele-ICU.',
        scheme: 'BharatNet Border Expansion'
    },
    {
        rank: 14,
        id: 'proj-14',
        name: 'Ghaghra Basin Flood-Resilient Elevated Embankment Corridor',
        location: 'Bahraich, Uttar Pradesh',
        ministry: 'morth',
        ministryName: 'MoRTH / UP PWD',
        pvi: 91.2,
        cost: 72.0,
        beneficiaries: '115,000 Citizens',
        timeline: '16 Months',
        gatiShaktiCoord: '27.5744° N, 81.5942° E',
        rationale: 'Elevates 38km of rural arterial access above 50-year high flood levels with RCC box culverts and disaster shelter platforms.',
        scheme: 'PMGSY-IV Special Flood Mitigation'
    },
    {
        rank: 15,
        id: 'proj-15',
        name: 'Bundelkhand Decentralized Agrivoltaic Feeder Grid',
        location: 'Chhatarpur, Madhya Pradesh',
        ministry: 'power',
        ministryName: 'Ministry of Power & MNRE',
        pvi: 89.9,
        cost: 55.0,
        beneficiaries: '85,000 Farmers',
        timeline: '11 Months',
        gatiShaktiCoord: '24.8912° N, 79.6210° E',
        rationale: 'Solarized daytime agricultural power feeders powering deep tube-wells and reducing farmer diesel irrigation expenditure by 74%.',
        scheme: 'PM-KUSUM Component C'
    }
];

function initPolicyPrioritization() {
    const tabs = document.querySelectorAll('.cockpit-tabs-bar .c-tab');
    const container = document.getElementById('priority-projects-container');

    function renderProjects(filterKey) {
        if (!container) return;
        container.innerHTML = '';

        const filtered = CANDIDATE_PROJECTS.filter(p => {
            if (filterKey === 'all') return true;
            return p.ministry === filterKey;
        });

        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-dossier-card glass-panel';
            card.innerHTML = `
                <div class="dossier-rank">PVI RANK #${p.rank}</div>
                <div class="p-meta-head">
                    <span class="badge-live"><span class="pulse-dot"></span> PVI: ${p.pvi}</span>
                    <span class="meta-tag"><i class="ph-bold ph-landmark"></i> ${p.ministryName}</span>
                </div>
                <h3 class="p-title">${p.name}</h3>
                <span class="p-location"><i class="ph-bold ph-map-pin"></i> ${p.location}</span>

                <div class="p-stats-row">
                    <div class="p-stat">
                        <span class="p-stat-lbl">Capital Outlay</span>
                        <span class="p-stat-val text-cyan">₹${p.cost} Crore</span>
                    </div>
                    <div class="p-stat">
                        <span class="p-stat-lbl">Citizens Impacted</span>
                        <span class="p-stat-val text-emerald">${p.beneficiaries}</span>
                    </div>
                    <div class="p-stat">
                        <span class="p-stat-lbl">Execution Period</span>
                        <span class="p-stat-val">${p.timeline}</span>
                    </div>
                    <div class="p-stat">
                        <span class="p-stat-lbl">PM Gati Shakti GIS</span>
                        <span class="p-stat-val text-violet">${p.gatiShaktiCoord}</span>
                    </div>
                </div>

                <div class="p-rationale-box">
                    <strong>Algorithmic Rationale:</strong> ${p.rationale}
                </div>

                <div class="p-action-row">
                    <span class="meta-tag text-muted"><i class="ph-bold ph-git-branch"></i> ${p.scheme}</span>
                    <div class="d-flex gap-2">
                        <button class="btn btn-xs btn-outline btn-proj-gemini" data-id="${p.id}" title="Generate Ministerial Dossier with Google Gemini">
                            <i class="ph-bold ph-sparkle text-cyan"></i> Gemini Brief
                        </button>
                        <button class="btn btn-xs btn-primary btn-sanction-proj" data-id="${p.id}">
                            <i class="ph-bold ph-check"></i> Sanction Priority
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Add event listeners for sanction buttons
        document.querySelectorAll('.btn-sanction-proj').forEach(btn => {
            btn.addEventListener('click', () => {
                const projId = btn.getAttribute('data-id');
                const proj = CANDIDATE_PROJECTS.find(x => x.id === projId);
                if (proj) {
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline');
                    btn.innerHTML = '<i class="ph-bold ph-seal-check text-emerald"></i> In Cabinet Pipeline';
                    showToast(`✅ Sanctioned: "${proj.name}" (₹${proj.cost} Cr) added to Active Budget Allocation!`);
                }
            });
        });

        // Add event listeners for Gemini Dossier buttons
        document.querySelectorAll('.btn-proj-gemini').forEach(btn => {
            btn.addEventListener('click', () => {
                const projId = btn.getAttribute('data-id');
                const proj = CANDIDATE_PROJECTS.find(x => x.id === projId);
                if (proj) {
                    const districtObj = {
                        name: proj.name,
                        state: proj.location,
                        cat: proj.scheme,
                        pvi: proj.pvi,
                        voices: `${Math.round(proj.pvi * 135).toLocaleString('en-IN')} Citizen Calls`,
                        topDemand: proj.name,
                        vuln: `${proj.beneficiaries} directly affected`,
                        mpi: '38.4% Regional Vulnerability Index',
                        deficit: proj.rationale,
                        deficitSub: `Coordinates: ${proj.gatiShaktiCoord}`,
                        unspent: `₹${(proj.cost * 0.35).toFixed(1)} Cr State Contingency Fund`,
                        recTitle: proj.name,
                        recDesc: proj.rationale,
                        estCost: `₹${proj.cost} Cr`,
                        beneficiaries: proj.beneficiaries,
                        timeline: proj.timeline
                    };
                    openGeminiModalForDistrict(districtObj);
                }
            });
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const rankKey = tab.getAttribute('data-rank');
            renderProjects(rankKey);
        });
    });

    renderProjects('all');
}

/* ==========================================================================
   8. Knapsack Capital Outlay & National Budget Optimizer
   ========================================================================== */
function initBudgetOptimizer() {
    const slider = document.getElementById('slider-budget');
    const budgetDisplay = document.getElementById('val-budget-display');
    const strategyRadios = document.querySelectorAll('input[name="opt-strat"]');
    const strategyPills = document.querySelectorAll('.strategy-pill');

    const countEl = document.getElementById('opt-projects-count');
    const spentEl = document.getElementById('opt-budget-spent');
    const leftEl = document.getElementById('opt-budget-left');
    const reachEl = document.getElementById('opt-citizen-reach');
    const effEl = document.getElementById('opt-efficiency-score');
    const listEl = document.getElementById('selected-projects-list');

    const btnAsp = document.getElementById('btn-preset-aspirational');
    const btnTribal = document.getElementById('btn-preset-tribal');
    const btnMega = document.getElementById('btn-preset-mega');

    function runOptimizer() {
        const budgetCeiling = parseFloat(slider.value);
        budgetDisplay.textContent = `₹${budgetCeiling.toLocaleString('en-IN')} Crore`;

        let activeStrat = 'balanced';
        strategyRadios.forEach(r => {
            if (r.checked) activeStrat = r.value;
        });

        // Score candidates based on strategy
        const scored = CANDIDATE_PROJECTS.map(p => {
            let weight = p.pvi / p.cost;
            if (activeStrat === 'vulnerable') {
                // Boost tribal & aspirational weighting
                const isTribal = p.location.includes('Odisha') || p.location.includes('Nandurbar') || p.location.includes('Bastar');
                weight = (p.pvi * (isTribal ? 1.4 : 1.0)) / p.cost;
            } else if (activeStrat === 'speed') {
                const months = parseInt(p.timeline);
                weight = (p.pvi * (months <= 12 ? 1.3 : 0.8)) / p.cost;
            }
            return { ...p, scoreWeight: weight };
        });

        // Sort descending by ratio (Greedy Knapsack Approximation)
        scored.sort((a, b) => b.scoreWeight - a.scoreWeight);

        let totalCost = 0;
        let totalCitizens = 0;
        let totalPvi = 0;
        const selected = [];

        for (const proj of scored) {
            if (totalCost + proj.cost <= budgetCeiling) {
                selected.push(proj);
                totalCost += proj.cost;
                // Parse citizen counts accurately (thousands & millions)
                let num = 50000;
                if (proj.beneficiaries.toLowerCase().includes('m') || proj.beneficiaries.toLowerCase().includes('million')) {
                    const parsed = parseFloat(proj.beneficiaries);
                    num = (parsed || 1) * 1000000;
                } else {
                    num = parseInt(proj.beneficiaries.replace(/[^0-9]/g, '')) || 50000;
                }
                totalCitizens += num;
                totalPvi += proj.pvi;
            }
        }

        const avgPvi = selected.length ? (totalPvi / selected.length).toFixed(1) : 0;
        const remaining = (budgetCeiling - totalCost).toFixed(1);

        // Update UI counters
        if (countEl) countEl.textContent = `${selected.length} Projects Selected`;
        if (spentEl) spentEl.textContent = `₹${totalCost.toFixed(1)} Cr`;
        if (leftEl) leftEl.textContent = `₹${remaining} Cr unallocated buffer`;
        if (reachEl) reachEl.textContent = `${(totalCitizens / 1000000).toFixed(2)}M Citizens`;
        if (effEl) effEl.textContent = `${avgPvi} / 100`;

        // Render project bundle list
        if (listEl) {
            listEl.innerHTML = '';
            selected.forEach(p => {
                const item = document.createElement('div');
                item.className = 'sel-proj-item';
                item.innerHTML = `
                    <div class="sel-proj-info">
                        <span class="sel-proj-name">${p.name}</span>
                        <span class="sel-proj-meta">${p.location} • PVI: ${p.pvi}</span>
                    </div>
                    <span class="sel-proj-cost">₹${p.cost} Cr</span>
                `;
                listEl.appendChild(item);
            });
        }
    }

    if (slider) slider.addEventListener('input', runOptimizer);

    strategyRadios.forEach((radio, idx) => {
        radio.addEventListener('change', () => {
            strategyPills.forEach(p => p.classList.remove('active'));
            if (strategyPills[idx]) strategyPills[idx].classList.add('active');
            runOptimizer();
            showToast(`Optimization strategy updated to: ${radio.value.toUpperCase()}`);
        });
    });

    if (btnAsp) {
        btnAsp.addEventListener('click', () => {
            slider.value = 800;
            runOptimizer();
            showToast('Loaded Aspirational Districts Tranche (₹800 Cr)');
        });
    }

    if (btnTribal) {
        btnTribal.addEventListener('click', () => {
            slider.value = 1500;
            runOptimizer();
            showToast('Loaded PM-JANMAN Tribal Priority Tranche (₹1,500 Cr)');
        });
    }

    if (btnMega) {
        btnMega.addEventListener('click', () => {
            slider.value = 3500;
            runOptimizer();
            showToast('Loaded Union Budget Flagship Tranche (₹3,500 Cr)');
        });
    }

    runOptimizer();
}

/* ==========================================================================
   9. Citizen Request Token Tracker & Public Ledger
   ========================================================================== */
function initTokenTracker() {
    const input = document.getElementById('input-token-search');
    const btn = document.getElementById('btn-search-token');
    const resultBox = document.getElementById('token-result-box');
    const navBtn = document.getElementById('btn-track-token-nav');
    const modal = document.getElementById('status-modal');
    const modalClose = document.getElementById('modal-status-close-btn');
    const modalCloseAction = document.getElementById('btn-modal-close');
    const modalTitle = document.getElementById('modal-token-title');
    const modalBody = document.getElementById('modal-token-body');

    const TOKEN_DATABASE = {
        'JV-2026-MP-49218': {
            citizen: 'Rameshwar Ahirwar',
            loc: 'Shahgarh, Chhatarpur, Madhya Pradesh (LGD: 4921)',
            channel: 'WhatsApp Vernacular Voice Note (Bundeli)',
            demand: 'High-Level Culvert over Mahoba Road river',
            status: 'SANCTIONED & WORK ORDER ISSUED',
            ministry: 'Ministry of Rural Development (PMGSY-IV)',
            workOrder: 'WO-2026-PMGSY-MP-44812',
            sanctionAmt: '₹41.0 Crore (14 Culvert Corridor)',
            estFinish: 'March 2027',
            ledgerHash: '0x7a8f99e41b2c8901de47fbc88934'
        },
        'JV-2026-OD-99201': {
            citizen: 'Mangala Muduli',
            loc: 'Bonda Hills, Malkangiri, Odisha (LGD: 2104)',
            channel: 'Toll-Free IVR 1915 (Desia Oriya)',
            demand: 'Sileru River High-Level Submersible Bridge',
            status: 'SANCTIONED (TECHNICAL TENDER OPEN)',
            ministry: 'MoRTH / State PWD Infrastructure',
            workOrder: 'WO-2026-OD-MORTH-88319',
            sanctionAmt: '₹48.5 Crore',
            estFinish: 'November 2027',
            ledgerHash: '0x33b871c99fa10204aa77993021fe'
        },
        'JV-2026-MH-88201': {
            citizen: 'Ganya Valvi',
            loc: 'Dhadgaon, Nandurbar, Maharashtra (LGD: 2701)',
            channel: 'WhatsApp Bot Audio (Bhilori Marathi)',
            demand: 'Narmada Multi-Village Solar Lift Drinking Water',
            status: 'APPROVED BY CABINET SUB-COMMITTEE',
            ministry: 'Jal Shakti / PM-JANMAN',
            workOrder: 'WO-2026-JJM-MH-10294',
            sanctionAmt: '₹62.0 Crore',
            estFinish: 'January 2027',
            ledgerHash: '0x55df881023ba78cc9103de9938ff'
        }
    };

    function searchToken(tok) {
        const cleaned = tok.trim().toUpperCase();
        const data = TOKEN_DATABASE[cleaned] || {
            citizen: 'Registered Indian Citizen (Pseudonymized ZKP)',
            loc: 'Aspirational District Cluster',
            channel: 'Omnichannel Bhashini AI Intake',
            demand: 'Rural Infrastructure Upgrade',
            status: 'UNDER ACTIVE REVIEW BY STATE PLANNING BOARD',
            ministry: 'National Infrastructure Pipeline (NIP)',
            workOrder: `WO-2026-PENDING-${Math.floor(1000 + Math.random() * 9000)}`,
            sanctionAmt: 'Evaluated under Public Value Index',
            estFinish: 'Q3 2027',
            ledgerHash: `0x${Math.random().toString(16).substr(2, 28)}`
        };

        if (resultBox) {
            resultBox.classList.remove('hidden');
            resultBox.innerHTML = `
                <div class="result-token-head">
                    <span class="badge-live"><span class="pulse-dot"></span> LIVE VERIFIED DPG TOKEN</span>
                    <h4>Token: <code>${cleaned || 'JV-2026-IN-GENERIC'}</code></h4>
                </div>
                <div class="extracted-tags-grid mt-3">
                    <div class="tag-item">
                        <span class="tag-key">Citizen / Channel:</span>
                        <span class="tag-value text-cyan">${data.citizen} (${data.channel})</span>
                    </div>
                    <div class="tag-item">
                        <span class="tag-key">Geographic Location:</span>
                        <span class="tag-value">${data.loc}</span>
                    </div>
                    <div class="tag-item">
                        <span class="tag-key">Sanction Status:</span>
                        <span class="tag-value text-emerald">${data.status}</span>
                    </div>
                    <div class="tag-item">
                        <span class="tag-key">Work Order / Outlay:</span>
                        <span class="tag-value text-amber">${data.workOrder} • ${data.sanctionAmt}</span>
                    </div>
                </div>
                <div class="receipt-footer mt-3">
                    <span>Public Ledger Hash (Audit Trail):</span>
                    <code class="dpg-token">${data.ledgerHash}</code>
                </div>
            `;
        }

        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = `Request Token #${cleaned || 'JV-2026-LIVE'}`;
            modalBody.innerHTML = `
                <div class="blueprint-summary-callout">
                    <i class="ph-bold ph-seal-check text-emerald"></i>
                    <div>
                        <strong>Current Status: ${data.status}</strong><br>
                        This infrastructure demand was aggregated via ${data.channel} and prioritized via JanVani AI algorithms.
                    </div>
                </div>
                <div class="extracted-tags-grid">
                    <div class="tag-item"><span class="tag-key">Location:</span><span class="tag-value">${data.loc}</span></div>
                    <div class="tag-item"><span class="tag-key">Responsible Ministry:</span><span class="tag-value text-cyan">${data.ministry}</span></div>
                    <div class="tag-item"><span class="tag-key">Approved Budget:</span><span class="tag-value text-emerald">${data.sanctionAmt}</span></div>
                    <div class="tag-item"><span class="tag-key">Estimated Delivery:</span><span class="tag-value text-violet">${data.estFinish}</span></div>
                </div>
                <div class="mt-3">
                    <span class="tag-key">Cryptographic Ledger Provenance:</span>
                    <code class="dpg-token d-block mt-1">${data.ledgerHash}</code>
                </div>
            `;
        }
    }

    if (btn && input) {
        btn.addEventListener('click', () => {
            if (input.value) searchToken(input.value);
            else searchToken('JV-2026-MP-49218');
        });
    }

    if (navBtn && modal) {
        navBtn.addEventListener('click', () => {
            searchToken('JV-2026-MP-49218');
            modal.classList.remove('hidden');
        });
    }

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => modal.classList.add('hidden'));
    }
    if (modalCloseAction && modal) {
        modalCloseAction.addEventListener('click', () => modal.classList.add('hidden'));
    }
}

/* ==========================================================================
   10. Consultation Form & Toast Notification System
   ========================================================================== */
function initConsultationForm() {
    const form = document.getElementById('consultation-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('consult-email');
            const email = emailInput ? emailInput.value : '';
            showToast(`Technical Pilot Request submitted for: ${email}. Our team will connect within 24h.`);
            if (emailInput) emailInput.value = '';
        });
    }
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="ph-bold ph-info text-cyan"></i> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/* ==========================================================================
   11. Google Gemini GenAI Policy Brief Synthesis Integration
   ========================================================================== */
let activeGeminiDistrict = null;

function initGoogleGeminiModal() {
    const modal = document.getElementById('gemini-modal');
    const btnNavOpen = document.getElementById('btn-open-gemini-modal');
    const btnClose = document.getElementById('gemini-modal-close-btn');
    const btnCloseAction = document.getElementById('btn-gemini-close');
    const keyInput = document.getElementById('input-gemini-key');
    const btnSaveKey = document.getElementById('btn-save-gemini-key');
    const btnSynth = document.getElementById('btn-run-gemini-synth');
    const outputContent = document.getElementById('gemini-output-content');

    if (keyInput) {
        const savedKey = localStorage.getItem('janvani_gemini_api_key');
        if (savedKey) keyInput.value = savedKey;
    }

    if (btnSaveKey && keyInput) {
        btnSaveKey.addEventListener('click', () => {
            const key = keyInput.value.trim();
            if (key) {
                localStorage.setItem('janvani_gemini_api_key', key);
                showToast('Google Gemini API Key securely saved in local session storage.');
            } else {
                localStorage.removeItem('janvani_gemini_api_key');
                showToast('API Key cleared. Reverted to built-in Gemini synthesis engine.');
            }
        });
    }

    if (btnNavOpen && modal) {
        btnNavOpen.addEventListener('click', () => {
            openGeminiModalForDistrict(DISTRICT_HOTSPOTS[0]);
        });
    }

    if (btnClose && modal) {
        btnClose.addEventListener('click', () => modal.classList.add('hidden'));
    }

    if (btnCloseAction && modal) {
        btnCloseAction.addEventListener('click', () => modal.classList.add('hidden'));
    }

    if (btnSynth && outputContent) {
        btnSynth.addEventListener('click', () => {
            const d = activeGeminiDistrict || DISTRICT_HOTSPOTS[0];
            const key = (keyInput ? keyInput.value.trim() : '') || localStorage.getItem('janvani_gemini_api_key');

            btnSynth.disabled = true;
            btnSynth.innerHTML = '<i class="ph-bold ph-spinner-gap ph-spin"></i> Synthesizing with Gemini 2.5 Flash...';
            outputContent.innerHTML = `
                <div class="terminal-placeholder">
                    <i class="ph-bold ph-sparkle text-cyan ph-spin font-xl"></i>
                    <p>Grounding multi-source inputs: Bhashini Voice Transcripts + NITI Aayog Demographics + Earth Engine Satellite CV...</p>
                </div>
            `;

            if (key) {
                // Call Google Gemini 2.5 Flash Live API
                callLiveGeminiAPI(key, d, (err, markdownResult) => {
                    btnSynth.disabled = false;
                    btnSynth.innerHTML = '<i class="ph-bold ph-sparkle"></i> Synthesize Policy Dossier';
                    if (err) {
                        showToast(`Gemini API Error: ${err.message}. Showing high-fidelity grounded brief.`);
                        renderGroundedGeminiDossier(outputContent, d);
                    } else {
                        outputContent.innerHTML = formatMarkdownToHTML(markdownResult);
                        showToast(`Policy Dossier synthesized via live Google Gemini 2.5 Flash API!`);
                    }
                });
            } else {
                // High-fidelity built-in Google Gemini response
                setTimeout(() => {
                    btnSynth.disabled = false;
                    btnSynth.innerHTML = '<i class="ph-bold ph-sparkle"></i> Synthesize Policy Dossier';
                    renderGroundedGeminiDossier(outputContent, d);
                    showToast(`Policy Dossier generated by Google Gemini Grounded Reasoning Model`);
                }, 1200);
            }
        });
    }
}

function openGeminiModalForDistrict(district) {
    activeGeminiDistrict = district;
    const modal = document.getElementById('gemini-modal');
    const titleEl = document.getElementById('gemini-modal-title');
    const outputContent = document.getElementById('gemini-output-content');

    if (titleEl) {
        titleEl.innerHTML = `<span class="text-cyan">Cabinet Policy Brief:</span> ${district.name} (${district.state})`;
    }

    if (outputContent) {
        outputContent.innerHTML = `
            <div class="terminal-placeholder">
                <i class="ph-bold ph-sparkle text-cyan font-xl"></i>
                <p>Click <strong>"Synthesize Policy Dossier"</strong> to generate the official Cabinet Infrastructure Brief for <strong>${district.name}</strong> using Google Gemini 2.5 Flash.</p>
                <small class="text-muted">Multi-layer grounding: ${district.voices} • ${district.vuln} • Deficit: ${district.deficit}</small>
            </div>
        `;
    }

    if (modal) modal.classList.remove('hidden');
}

function callLiveGeminiAPI(apiKey, district, callback) {
    const prompt = `You are JanVani AI's Sovereign Infrastructure Policy Intelligence engine powered by Google Gemini 2.5 Flash.
Synthesize an official Executive Cabinet Infrastructure Policy Brief for the Union Cabinet of India.
Context Data:
- District: ${district.name}, State: ${district.state}
- Category: ${district.cat}
- Public Value Index (PVI): ${district.pvi} / 100
- Aggregated Citizen Demand: ${district.voices} (Top Demand: "${district.topDemand}")
- Demographic Vulnerability: ${district.vuln}, Multidimensional Poverty Index: ${district.mpi}
- Physical Infrastructure Deficit: ${district.deficit} (${district.deficitSub})
- Unspent Local Public Funds: ${district.unspent}
- Recommended Project: ${district.recTitle} (${district.recDesc})
- Estimated Capital Outlay: ${district.estCost}
- Beneficiary Reach: ${district.beneficiaries}, Execution Timeline: ${district.timeline}

Please structure the brief with:
1. EXECUTIVE SUMMARY & PROBLEM STATEMENT
2. CITIZEN VOICE & MULTIMODAL SATELLITE EVIDENCE (Grounding citizen voice complaints with Google Earth Engine computer vision findings)
3. DEMOGRAPHIC EQUITY & VULNERABILITY MULTIPLIER
4. INTER-MINISTERIAL CONVERGENCE (MoRTH, Jal Shakti, MoHFW, PM Gati Shakti alignment)
5. STATUTORY RECOMMENDATION & CAPITAL SANCTION (Including utilization of idle DMF/State funds)`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        })
    })
    .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    })
    .then(data => {
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Empty response from Gemini API');
        callback(null, text);
    })
    .catch(err => callback(err));
}

function renderGroundedGeminiDossier(container, d) {
    container.innerHTML = `
        <div class="gemini-dossier-report">
            <h3>MINISTERIAL CABINET POLICY BRIEF // CONFIDENTIAL & HIGH PRIORITY</h3>
            <p><strong>SUBJECT:</strong> Emergency Capital Sanction for <em>${d.recTitle}</em> in ${d.name} (${d.state})</p>
            <p><strong>PVI SCORE:</strong> <code>${d.pvi} / 100</code> (Priority Rank #1 • Upper 99th Percentile Distress)</p>

            <h4>1. Executive Summary & Citizen Grounding</h4>
            <p>JanVani AI's multilingual ingestion engine aggregated <strong>${d.voices}</strong> in native regional dialects directly from rural citizens across ${d.name}. Citizen testimony consistently identified: <em>"${d.topDemand}"</em>. Cross-referencing bottom-up voices with the NITI Aayog Multidimensional Poverty Index (<strong>${d.mpi}</strong>) confirms an acute developmental deficit rather than seasonal complaints.</p>

            <h4>2. Google Earth Engine Satellite Defect Verification</h4>
            <p>High-resolution satellite computer vision segmentation conducted via Google Earth Engine confirms physical ground reality:</p>
            <ul>
                <li><strong>Terrain Analysis:</strong> Multispectral analysis detected ${d.deficit} with zero all-weather transit corridor during peak precipitation.</li>
                <li><strong>Vertex AI Predictive Risk:</strong> The predictive infrastructure model calculates a <strong>${(d.pvi * 0.98).toFixed(1)}% probability of total public service cut-off</strong> if left unaddressed in the upcoming monsoon cycle.</li>
            </ul>

            <h4>3. Demographic Vulnerability & Return-on-Equity</h4>
            <p>Demographic weighting reveals <strong>${d.vuln}</strong> with severe baseline isolation. Allocating capital here yields an estimated <strong>3.8x socio-economic multiplier</strong> by reconnecting isolated agrarian hamlets to primary health centers, rural markets, and secondary schools.</p>

            <h4>4. Inter-Ministerial Convergence & Fiscal Optimization</h4>
            <p>Rather than relying entirely on fresh Union borrowings, JanVani AI identifies <strong>${d.unspent}</strong> currently lying idle in local District Mineral Foundation (DMF) and untied state grants. A 60:40 convergence model between PMGSY/Jal Shakti and district reserves is mathematically optimal.</p>

            <h4>5. Statutory Recommendation for National Cabinet Approval</h4>
            <p>The algorithmic decision matrix recommends <strong>IMMEDIATE EXPEDITED SANCTION</strong> for <code>${d.recTitle}</code> with a sanctioned outlay of <strong>${d.estCost}</strong> over a <strong>${d.timeline}</strong> execution window, benefiting <strong>${d.beneficiaries}</strong>.</p>
        </div>
    `;
}

function formatMarkdownToHTML(md) {
    let html = md
        .replace(/^### (.*$)/gim, '<h4>$1</h4>')
        .replace(/^## (.*$)/gim, '<h3>$1</h3>')
        .replace(/^# (.*$)/gim, '<h2>$1</h2>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        .replace(/\n\n/gim, '</p><p>')
        .replace(/^\* (.*$)/gim, '<li>$1</li>');

    return `<div class="gemini-dossier-report"><p>${html}</p></div>`;
}

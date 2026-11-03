// Game State & XP System
let playerXP = 0;
let playerLevel = 1;
let playerRank = "Junior Dev";

const ranks = [
    { min: 0, title: "Junior Dev (Lvl 1)" },
    { min: 100, title: "Script Kiddie (Lvl 2)" },
    { min: 250, title: "Fullstack Coder (Lvl 3)" },
    { min: 500, title: "Senior BugSlayer (Lvl 4)" },
    { min: 800, title: "Arch Mage CTO (Lvl MAX)" }
];

function addXP(amount) {
    playerXP += amount;
    for (let i = ranks.length - 1; i >= 0; i--) {
        if (playerXP >= ranks[i].min) {
            playerRank = ranks[i].title;
            break;
        }
    }
    document.getElementById('playerXpDisplay').innerText = `${playerXP} XP`;
    document.getElementById('playerRankBadge').innerText = playerRank;
    showToast(`+${amount} XP Ditambahkan!`);
}

// Navigation Controller
function switchTab(tabId) {
    ['battle', 'legacy', 'git', 'regex', 'terminal'].forEach(t => {
        const content = document.getElementById(`tabContent-${t}`);
        const btn = document.getElementById(`tabBtn-${t}`);
        if (t === tabId) {
            content.classList.remove('hidden');
            btn.className = "px-4 py-2 text-xs code-font font-semibold flex items-center space-x-2 bg-[#1e1e1e] text-vscode-green border-t-2 border-vscode-green transition";
        } else {
            content.classList.add('hidden');
            btn.className = "px-4 py-2 text-xs code-font font-semibold flex items-center space-x-2 text-slate-400 hover:text-slate-200 transition";
        }
    });
}

// ==========================================
// FEATURE 1: CODE & LOGIC BATTLE LOGIC
// ==========================================
const battleChallenges = [
    {
        title: "Tantangan #1: Cek Angka Genap / Ganjil",
        diff: "MUDAH",
        desc: "Buatlah fungsi JavaScript bernama <code class='text-vscode-green code-font'>isEven(n)</code> yang mengembalikan nilai <code class='text-vscode-yellow code-font'>true</code> jika angka genap, dan <code class='text-vscode-yellow code-font'>false</code> jika ganjil.",
        code: "function isEven(n) {\n    return n % 2 === 0;\n}",
        test: (fn) => fn(4) === true && fn(3) === false && fn(0) === true
    },
    {
        title: "Tantangan #2: Hitung Panjang String",
        diff: "MUDAH",
        desc: "Buatlah fungsi <code class='text-vscode-green code-font'>getStringLength(str)</code> yang mengembalikan jumlah karakter dari string <code class='text-vscode-yellow code-font'>str</code>.",
        code: "function getStringLength(str) {\n    return str.length;\n}",
        test: (fn) => fn("RPL") === 3 && fn("CodeCraft") === 9
    },
    {
        title: "Tantangan #3: Cari Nilai Maksimum Array",
        diff: "MENENGAH",
        desc: "Buatlah fungsi <code class='text-vscode-green code-font'>findMax(arr)</code> yang mengembalikan angka terbesar dari array angka <code class='text-vscode-yellow code-font'>arr</code>.",
        code: "function findMax(arr) {\n    return Math.max(...arr);\n}",
        test: (fn) => fn([1, 5, 2, 9, 3]) === 9 && fn([-10, 0, 10]) === 10
    }
];

let currentBattleIndex = 0;

function loadNextBattleChallenge() {
    currentBattleIndex = (currentBattleIndex + 1) % battleChallenges.length;
    const c = battleChallenges[currentBattleIndex];
    document.getElementById('battleProblemTitle').innerText = c.title;
    document.getElementById('battleDifficulty').innerText = c.diff;
    document.getElementById('battleProblemDesc').innerHTML = c.desc;
    document.getElementById('battleCodeEditor').value = c.code;
    document.getElementById('battleConsoleOutput').innerHTML = `<p class="text-slate-500">// Soal dimuat. Klik "Run Test Cases"...</p>`;
}

function runBattleCode() {
    const codeStr = document.getElementById('battleCodeEditor').value;
    const consoleOut = document.getElementById('battleConsoleOutput');
    consoleOut.innerHTML = "";

    try {
        let funcName = 'isEven';
        if (currentBattleIndex === 1) funcName = 'getStringLength';
        if (currentBattleIndex === 2) funcName = 'findMax';

        const userFunc = new Function(`${codeStr}; return ${funcName};`)();
        const challenge = battleChallenges[currentBattleIndex];
        const passed = challenge.test(userFunc);

        if (passed) {
            consoleOut.innerHTML += `<p class="text-vscode-green font-bold">[SUCCESS] Semua Test Case Berhasil Lewat!</p>`;
            consoleOut.innerHTML += `<p class="text-slate-300">Test Cases: PASSED</p>`;
            addXP(50);
        } else {
            consoleOut.innerHTML += `<p class="text-red-400 font-bold">[FAILED] Test Case Gagal!</p>`;
            consoleOut.innerHTML += `<p class="text-slate-300">Fungsi tidak mengembalikan ekspektasi yang benar.</p>`;
        }
    } catch (err) {
        consoleOut.innerHTML += `<p class="text-red-400 font-bold">[SYNTAX ERROR]: ${err.message}</p>`;
    }
}

// ==========================================
// FEATURE 2: LEGACY CODE NIGHTMARE LOGIC
// ==========================================
let legacyInterval = null;
let legacySeconds = 60;
let legacyActive = false;
let fixedBugCount = 0;

const legacyBugs = [
    { line: 12, code: "if ($user_id == NULL) { echo 'Error'; }", fix: "Fixed loose comparison" },
    { line: 24, code: "mysql_query('SELECT * FROM users');", fix: "Replaced deprecated mysql query" },
    { line: 45, code: "while(true) { $cpu++; }", fix: "Cleared infinite memory leak loop" }
];

function startLegacyChallenge() {
    legacyActive = true;
    legacySeconds = 60;
    fixedBugCount = 0;
    const box = document.getElementById('legacyCodeBox');
    const logs = document.getElementById('legacyLogsBox');
    box.innerHTML = "";
    logs.innerHTML = `<p class="text-red-400">[CRITICAL] Server monolit memuat spaghetti code! CPU melonjak 95%!</p>`;
    document.getElementById('startLegacyBtn').innerText = "BERJALAN... SEGERA PERBAIKI";

    legacyBugs.forEach((bug, idx) => {
        box.innerHTML += `
            <div class="p-3 bg-[#121212] border border-red-500/30 rounded flex items-center justify-between">
                <div>
                    <span class="text-slate-500">Line ${bug.line}:</span> 
                    <code class="text-red-400">${bug.code}</code>
                </div>
                <button onclick="fixLegacyBug(${idx})" id="refactorBtn-${idx}" class="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] code-font font-bold">REFACTOR</button>
            </div>
        `;
    });

    clearInterval(legacyInterval);
    legacyInterval = setInterval(() => {
        legacySeconds--;
        document.getElementById('legacyTimerDisplay').innerText = `00:${String(legacySeconds).padStart(2, '0')}`;
        document.getElementById('legacyCpuMeter').innerText = `${Math.floor(Math.random() * 30 + 70)}%`;
        document.getElementById('legacyMemMeter').innerText = `${Math.floor(Math.random() * 200 + 1800)}MB`;

        if (legacySeconds <= 0) {
            clearInterval(legacyInterval);
            legacyActive = false;
            logs.innerHTML += `<p class="text-red-500 font-bold">[SERVER DOWN] 504 Gateway Time-out! Anda gagal menyelamatkan server.</p>`;
            document.getElementById('startLegacyBtn').innerText = "COBA LAGI";
        }
    }, 1000);
}

function fixLegacyBug(idx) {
    if (!legacyActive) return;
    fixedBugCount++;
    const logs = document.getElementById('legacyLogsBox');
    const btn = document.getElementById(`refactorBtn-${idx}`);
    if(btn) {
        btn.innerText = "FIXED";
        btn.disabled = true;
        btn.className = "px-3 py-1 bg-zinc-700 text-zinc-400 rounded text-[10px] code-font font-bold cursor-not-allowed";
    }
    logs.innerHTML += `<p class="text-vscode-green">[PATCHED] Bug #${idx + 1} berhasil direfactor dengan clean code.</p>`;
    
    if (fixedBugCount >= legacyBugs.length) {
        clearInterval(legacyInterval);
        legacyActive = false;
        logs.innerHTML += `<p class="text-vscode-green font-bold">[SUCCESS] Server Stabil Kembali! Memory kembali normal.</p>`;
        document.getElementById('startLegacyBtn').innerText = "SELESAI (RESTART)";
        addXP(100);
    }
}

// ==========================================
// FEATURE 3: GIT CONFLICT LOGIC
// ==========================================
function resolveGitConflict(type) {
    const editor = document.getElementById('gitConflictEditor');
    const result = document.getElementById('gitResultBox');

    if (type === 'head') {
        editor.value = `const apiUrl = "https://api.production.com/v1";`;
        result.innerHTML = `<span class="text-vscode-green font-bold">[SUCCESS] Konflik diselesaikan dengan mempertahankan HEAD (Production).</span>`;
    } else if (type === 'merge') {
        editor.value = `const apiUrl = "https://api.staging.internal/v2";`;
        result.innerHTML = `<span class="text-vscode-yellow font-bold">[SUCCESS] Konflik diselesaikan dengan mempertahankan Staging Branch.</span>`;
    } else {
        editor.value = `const apiUrl = process.env.NODE_ENV === 'production' ? "https://api.production.com/v1" : "https://api.staging.internal/v2";`;
        result.innerHTML = `<span class="text-vscode-blue font-bold">[SUCCESS] Masterclass! Clean Merge & Dynamic Environment diterapkan.</span>`;
        addXP(75);
    }
}

// ==========================================
// FEATURE 4: SQL & REGEX CHALLENGE LOGIC
// ==========================================
function runSqlQuery() {
    const query = document.getElementById('sqlQueryInput').value.trim().toLowerCase();
    const resultBox = document.getElementById('sqlResultBox');

    if (query.includes('drop table')) {
        resultBox.innerHTML = `<span class="text-red-500 font-bold">[DANGER] Anda mencoba DROP TABLE! Database hancur total! Hukuman -20 XP.</span>`;
        return;
    }

    if (query.includes('select') && query.includes('tb_siswa') && query.includes('rpl 1')) {
        resultBox.innerHTML = `
            <table class="w-full text-left border-collapse">
                <thead><tr class="border-b border-slate-700 text-vscode-yellow"><th>id</th><th>nama</th><th>kelas</th></tr></thead>
                <tbody>
                    <tr class="border-b border-slate-800"><td>1</td><td>Budi Santoso</td><td>RPL 1</td></tr>
                    <tr class="border-b border-slate-800"><td>2</td><td>Siti Aminah</td><td>RPL 1</td></tr>
                </tbody>
            </table>
        `;
        addXP(60);
    } else {
        resultBox.innerHTML = `<span class="text-red-400">Query tidak sesuai dengan kriteria soal. Pastikan menggunakan SELECT, FROM tb_siswa, dan WHERE kelas='RPL 1'.</span>`;
    }
}

// ==========================================
// FEATURE 5: TERMINAL CLI LOGIC
// ==========================================
function handleTerminalInput(e) {
    if (e.key === 'Enter') {
        const inputEl = document.getElementById('terminalInput');
        const outputEl = document.getElementById('terminalOutput');
        const cmd = inputEl.value.trim();
        inputEl.value = '';

        outputEl.innerHTML += `<p class="text-matrix-neon">root@rpl-craft:~$ ${cmd}</p>`;

        if (cmd === 'help') {
            outputEl.innerHTML += `<p class="text-slate-400">Perintah yang tersedia:</p>`;
            outputEl.innerHTML += `<p class="text-vscode-yellow">- git status : Menampilkan status repository</p>`;
            outputEl.innerHTML += `<p class="text-vscode-yellow">- npm install : Menginstal modul dependencies node_modules</p>`;
            outputEl.innerHTML += `<p class="text-vscode-yellow">- hack_mainframe : Membobol sistem pertahanan mainframe</p>`;
            outputEl.innerHTML += `<p class="text-vscode-yellow">- clear : Membersihkan layar terminal</p>`;
            outputEl.innerHTML += `<p class="text-vscode-yellow">- whoami : Menampilkan role/rank user saat ini</p>`;
        } else if (cmd === 'git status') {
            outputEl.innerHTML += `<p class="text-vscode-green">On branch main\nYour branch is up to date with 'origin/main'.</p>`;
        } else if (cmd === 'npm install') {
            outputEl.innerHTML += `<p class="text-slate-300">added 1428 packages in 3s\n<span class="text-vscode-green">found 0 vulnerabilities</span></p>`;
        } else if (cmd === 'hack_mainframe') {
            outputEl.innerHTML += `<p class="text-red-400 animate-pulse">[ACCESS GRANTED] Mainframe berhasil dibobol! +100 XP diberikan.</p>`;
            addXP(100);
        } else if (cmd === 'clear') {
            outputEl.innerHTML = ``;
        } else if (cmd === 'whoami') {
            outputEl.innerHTML += `<p class="text-vscode-blue">Role: ${playerRank} | Total XP: ${playerXP}</p>`;
        } else if (cmd !== '') {
            outputEl.innerHTML += `<p class="text-red-400">Perintah tidak dikenal: '${cmd}'. Ketik 'help' untuk bantuan.</p>`;
        }

        outputEl.scrollTop = outputEl.scrollHeight;
    }
}

// Toast Notification System
function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');
    msgEl.innerText = message;

    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}
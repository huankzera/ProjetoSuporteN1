document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURAÇÕES E TEMA (LocalStorage) ---
    const toggleModeBtn = document.getElementById('toggleModeBtn');
    const toggleAdvBtn = document.getElementById('toggleAdvancedBtn');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggleModeBtn.textContent = '☀️';
    }
    if (localStorage.getItem('advanced') === 'true') {
        body.classList.add('show-advanced');
        toggleAdvBtn.classList.add('active');
    }

    toggleModeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        toggleModeBtn.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    toggleAdvBtn.addEventListener('click', () => {
        body.classList.toggle('show-advanced');
        const isAdv = body.classList.contains('show-advanced');
        toggleAdvBtn.style.background = isAdv ? 'var(--accent)' : 'transparent';
        toggleAdvBtn.style.color = isAdv ? '#002776' : '';
        localStorage.setItem('advanced', isAdv);
    });

    // --- 2. BUSCA INTELIGENTE ---
    const searchBar = document.getElementById('searchBar');
    const topics = document.querySelectorAll('.topic');

    searchBar.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        topics.forEach(topic => {
            const keywords = topic.getAttribute('data-keywords');
            const title = topic.querySelector('h3').textContent.toLowerCase();
            const combined = (keywords + " " + title).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            if (combined.includes(term)) {
                topic.style.display = 'block';
                if (term.length > 2) topic.classList.add('active');
            } else {
                topic.style.display = 'none';
                topic.classList.remove('active');
            }
        });
        
        if (term === "") topics.forEach(t => t.classList.remove('active'));
    });

    // --- 3. ACORDEÃO (ABRIR/FECHAR) ---
    document.querySelectorAll('.topic-header').forEach(header => {
        header.addEventListener('click', () => {
            const parent = header.parentElement;
            parent.classList.toggle('active');
        });
    });

    // --- 4. CALCULADORA DE SINAL (Regras de ISP) ---
    const btnCheckSignal = document.getElementById('btnCheckSignal');
    
    btnCheckSignal.addEventListener('click', () => {
        const input = document.getElementById('dbmInput');
        const resultBox = document.getElementById('signalResult');
        const val = parseFloat(input.value);

        resultBox.className = 'result-box'; // Reset

        if (isNaN(val)) {
            resultBox.textContent = "Por favor, digite um número.";
            resultBox.classList.remove('hidden');
            return;
        }

        let message = "";
        let type = "";

        // Regra de Ouro GPON
        if (val > -16) {
             message = "⚠️ Sinal Alto/Saturado (Acima de -16). Risco para ONU.";
             type = "warning";
        } else if (val <= -16 && val >= -25.5) {
            message = "✅ Sinal Excelente (-16 a -25.5 dBm).";
            type = "good";
        } else if (val < -25.5 && val >= -27.5) {
            message = "⚠️ Sinal Limite/Alerta. Pode oscilar.";
            type = "warning";
        } else {
            message = "❌ Sinal Crítico (Abaixo de -27.5). Agendar Técnico.";
            type = "critical";
        }

        resultBox.textContent = message;
        resultBox.classList.add(type);
        resultBox.classList.remove('hidden');
    });

    // --- 5. COPIAR COM TOAST ---
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const element = document.getElementById(targetId);
            const text = element ? element.innerText : "Erro ao copiar";

            navigator.clipboard.writeText(text).then(() => {
                showToast("✅ Script copiado!");
            }).catch(err => {
                console.error(err);
                showToast("❌ Erro ao copiar.");
            });
        });
    });

    function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.add("show");
        toast.classList.remove("hidden");
        setTimeout(() => { toast.classList.remove("show"); }, 3000);
    }

    // --- 6. DIAGNÓSTICO MÁGICO (WIZARD) ---
    const modal = document.getElementById('wizardModal');
    const wizardBody = document.getElementById('wizardBody');
    
    // Dados da Árvore de Decisão
    const wizardSteps = {
        start: {
            question: "Qual o problema principal?",
            options: [
                { label: "📺 TV / Netflix travando", next: "tv" },
                { label: "🐢 Internet Lenta em tudo", next: "slow" },
                { label: "🎮 Jogos com LAG / Ping", next: "games" },
                { label: "📱 Só 1 App não funciona", next: "app" }
            ]
        },
        tv: {
            question: "Trava em todos os apps (YouTube/Netflix) ou só no IPTV?",
            options: [
                { label: "Só no IPTV", result: "Problema no servidor do aplicativo IPTV. Provedor ok." },
                { label: "Em tudo (YouTube também)", next: "tv_conn" }
            ]
        },
        tv_conn: {
            question: "A TV está no Wi-Fi ou Cabo?",
            options: [
                { label: "Wi-Fi", result: "Sinal fraco na TV. TV tem placa ruim. Testar no cabo." },
                { label: "Cabo", result: "Verificar consumo de banda ou reiniciar ONU." }
            ]
        },
        slow: {
            question: "Lentidão no Wi-Fi ou Cabo?",
            options: [
                { label: "Só Wi-Fi", result: "Interferência ou distância. Mudar para 5GHz." },
                { label: "No Cabo Também", result: "Verificar Sinal Fibra (Rx) e Placa de Rede (100Mb)." }
            ]
        },
        games: {
            question: "Joga no Wi-Fi ou Cabo?",
            options: [
                { label: "Wi-Fi", result: "Wi-Fi causa Jitter. Gamer deve usar Cabo." },
                { label: "Cabo", result: "Verificar se IP é CGNAT (100.64.x.x)." }
            ]
        },
        app: {
            question: "É rede social ou site de banco?",
            options: [
                { label: "Insta/Whats", result: "Instabilidade do App. Trocar DNS para 8.8.8.8." },
                { label: "Banco/Gov", result: "Rota ou Segurança. Limpar Cache/Cookies." }
            ]
        }
    };

    function renderStep(stepKey) {
        const step = wizardSteps[stepKey];
        wizardBody.innerHTML = '';

        const h3 = document.createElement('h3');
        h3.textContent = step.question;
        h3.style.marginBottom = "15px";
        wizardBody.appendChild(h3);

        step.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'wizard-btn';
            btn.textContent = opt.label;
            btn.onclick = () => {
                if (opt.result) showResult(opt.result);
                else renderStep(opt.next);
            };
            wizardBody.appendChild(btn);
        });
    }

    function showResult(text) {
        wizardBody.innerHTML = `
            <div class="wizard-result">
                <strong>✅ Diagnóstico:</strong>
                <p>${text}</p>
            </div>
        `;
    }

    // Controles do Modal
    document.getElementById('btnOpenWizard').addEventListener('click', () => {
        modal.classList.remove('hidden');
        renderStep('start');
    });

    document.getElementById('closeWizard').addEventListener('click', () => modal.classList.add('hidden'));
    document.getElementById('resetWizard').addEventListener('click', () => renderStep('start'));

    // Fechar clicando fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
});
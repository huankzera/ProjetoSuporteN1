🛡️ Wiki Suporte ISP - Master Brasil
Uma ferramenta web interativa (Single Page Application) desenvolvida para auxiliar Analistas de Suporte Nível 1 em Provedores de Internet (ISP). O objetivo é padronizar o atendimento, agilizar diagnósticos técnicos e fornecer scripts prontos para situações comuns.







🚀 Funcionalidades
O sistema funciona como um "canivete suíço" para o atendimento, contendo:

🪄 Diagnóstico Mágico (Wizard): Um assistente guiado que faz perguntas (ex: "É lentidão ou queda?") e entrega a solução técnica e o script de atendimento automaticamente.

📉 Calculadora de Sinal Óptico (Rx): Interpreta a potência do sinal (dBm) baseada em padrões GPON, alertando sobre sinais críticos, saturados ou ideais.

📋 Scripts Inteligentes: Respostas prontas para copiar e colar (Anti-tabnabbing), cobrindo cenários como CGNAT, IPTV, Lentidão em Redes Sociais e Bloqueios de Sites.

🌍 Monitoramento de Serviços: Links rápidos e seguros para verificar instabilidade no WhatsApp, Instagram, Discord, etc. (via Downdetector).

🎨 UI/UX Responsiva:

Tema Brasil Tech (Azul/Amarelo/Verde).

Dark Mode nativo (com persistência via LocalStorage).

Design totalmente responsivo para Celular e Tablet.

🛠️ Tecnologias Utilizadas
O projeto foi construído com foco em performance, leveza e segurança, sem dependências externas pesadas.

HTML5 Semântico: Estrutura acessível e organizada.

CSS3 Moderno:

Uso de CSS Custom Properties (Variáveis) para temas.

Layouts com Flexbox e Grid.

Animações suaves (transitions, keyframes).

JavaScript (Vanilla):

Lógica pura sem frameworks.

Manipulação de DOM segura.

Armazenamento de preferências do usuário (localStorage).

🔐 Segurança (AppSec)
Mesmo sendo uma ferramenta de front-end, foram aplicadas práticas de segurança:

Content Security Policy (CSP): Implementação de meta tag estrita para prevenir injeção de scripts (XSS).

Proteção de Links Externos: Uso rigoroso de rel="noopener noreferrer" em todos os links com target="_blank" para evitar ataques de Reverse Tabnabbing.

Sanitização: Uso de textContent ao invés de innerHTML em inputs de usuário para evitar XSS.

📂 Como Usar
Você não precisa instalar nada! Como é uma página estática, basta baixar e abrir.

Clone este repositório:

Bash
git clone https://github.com/seu-usuario/wiki-suporte-isp.git
Navegue até a pasta do projeto.

Abra o arquivo index.html no seu navegador preferido.

🤝 Contribuição
Contribuições são bem-vindas! Se você tem alguma ideia de script novo ou melhoria no diagnóstico:

Faça um Fork do projeto.

Crie uma nova Branch (git checkout -b feature/nova-feature).

Faça o Commit (git commit -m 'Adiciona nova feature').

Faça o Push (git push origin feature/nova-feature).

Abra um Pull Request.

📝 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar para o seu provedor.

Feito com 💙 e ☕ por Matheus Huank

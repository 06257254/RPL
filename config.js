tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                code: ['Fira Code', 'monospace']
            },
            colors: {
                vscode: {
                    bg: '#1e1e1e',
                    sidebar: '#252526',
                    activity: '#333333',
                    accent: '#007acc',
                    border: '#3f3f46',
                    green: '#4ec9b0',
                    yellow: '#dcdcaa',
                    orange: '#ce9178',
                    blue: '#569cd6',
                    purple: '#c586c0'
                },
                matrix: {
                    neon: '#00ff66',
                    dark: '#0a0a0a'
                }
            },
            boxShadow: {
                'ide': '0 10px 30px rgba(0,0,0,0.5)',
                'glow-green': '0 0 20px rgba(78, 201, 176, 0.4)',
                'glow-blue': '0 0 20px rgba(0, 122, 204, 0.4)'
            }
        }
    }
}
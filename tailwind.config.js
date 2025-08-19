module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ✅ Tailwind color mapping
        text: 'var(--text)',
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          accent: 'var(--accent)',
          neutral: 'var(--background)',
          'base-100': 'var(--background)',
          info: '#2094f3',
          success: '#009485',
          warning: '#ff9900',
          error: '#ff5724',
        },
      },
      'dark',
      'light',
    ],
    darkTheme: 'dark',
  },
};

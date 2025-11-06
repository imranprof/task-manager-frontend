import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',   
    './pages/**/*.{ts,tsx,js,jsx}',    
    './components/**/*.{ts,tsx,js,jsx}' 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-animate-css'), 
  ],
};

export default config;

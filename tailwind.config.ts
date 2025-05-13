
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Adding the required colors from the color palette
				'electric-purple': '#8E2DE2',
				'neon-blue': '#4A00E0',
				'jet-black': '#0F0F0F',
				'soft-silver': '#D9D9D9',
				'midnight-blue': '#0F172A',
				'cyan': '#06B6D4',
				'bright-green': '#22C55E',
				'off-white': '#F8FAFC',
				'charcoal': '#1E1E1E',
				'electric-lime': '#B9FF66',
				'aqua-blue': '#00FFFF',
				'light-gray': '#EDEDED',
				'laser-pink': '#FF2DAF',
				'ice-white': '#F3F4F6',
				'deep-navy': '#1E293B',
				'teal': '#14B8A6',
				'soft-orange': '#F97316',
				'white': '#F9FAFB'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 10px rgba(142, 45, 226, 0.5)' },
					'50%': { boxShadow: '0 0 20px rgba(142, 45, 226, 0.8)' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'glow-pulse': 'glow-pulse 2s infinite',
				'shimmer': 'shimmer 2.5s infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-purple': 'linear-gradient(90deg, #8E2DE2, #4A00E0)',
				'gradient-dark': 'linear-gradient(to bottom, #0F0F0F, #1E1E1E)'
			},
			boxShadow: {
				'neon': '0 0 10px rgba(142, 45, 226, 0.5), 0 0 20px rgba(142, 45, 226, 0.3)',
				'neon-hover': '0 0 15px rgba(142, 45, 226, 0.7), 0 0 30px rgba(142, 45, 226, 0.5)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

# Abid Al Wassie - Portfolio

A modern, responsive portfolio website built with Next.js 15

## 🚀 Features

- **Modern Design**: Clean, professional UI with dark/light theme support
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Animations**: Smooth animations powered by Framer Motion
- **Contact Form**: Functional contact form with email integration
- **Project Showcase**: Dynamic project gallery with detailed modal views
- **YouTube Integration**: Embedded video content from personal channel
- **Tech Stack Display**: Visual representation of technical skills
- **SEO Optimized**: Built with Next.js App Router for optimal performance

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React & Heroicons
- **Theme**: next-themes for dark/light mode

### Backend & Forms

- **API Routes**: Next.js API routes
- **Email Service**: Resend for email delivery
- **Form Handling**: React Hook Form with Zod validation
- **Email Templates**: React Email for styled emails

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint 9 with Next.js config
- **Code Formatting**: Prettier
- **Build Tool**: Turbopack (Next.js)
- **Bundle Analysis**: @next/bundle-analyzer

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (contact form)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # Theme and context providers
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── contact/          # Contact section components
│   ├── hero/            # Hero section components
│   ├── navbar/          # Navigation components
│   ├── project-modal/   # Project modal components
│   ├── services/        # Services section components
│   └── work/           # Work/portfolio components
├── hooks/               # Custom React hooks
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
├── assets/            # Static assets and images
└── public/           # Public static files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AbidAlWassie/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in your environment variables:

   ```env
   # Email service configuration
   RESEND_API_KEY=your_resend_api_key
   FROM_EMAIL=your_email@domain.com
   TO_EMAIL=recipient@domain.com

   # Optional: Analytics, etc.
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Contact Form Setup

The contact form uses [Resend](https://resend.com) for email delivery:

1. Sign up for a Resend account
2. Get your API key from the dashboard
3. Add the API key to your `.env` file
4. Configure your sender and recipient emails

## 🎨 Customization

### Theme Colors

Modify theme colors in `app/globals.css`:

```css
:root {
  --primary: your-primary-color;
  --secondary: your-secondary-color;
  /* ... other custom properties */
}
```

### Content Updates

- **Personal Info**: Update content in respective component files
- **Projects**: Modify project data in `lib/projects-data.ts`
- **Skills**: Update tech stack in `components/tech-stack.tsx`
- **Services**: Edit services in `components/services-section.tsx`

### Components

All components are modular and can be easily customized:

- **Hero Section**: `components/hero-section.tsx`
- **Navigation**: `components/navbar.tsx`
- **Portfolio**: `components/placeholder-sections.tsx`
- **Contact**: `components/contact-section.tsx`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance

- **Next.js 15** with Turbopack for fast builds
- **Static optimization** for better loading times
- **Image optimization** with Next.js Image component
- **Code splitting** for optimal bundle sizes
- **SEO optimization** with proper meta tags

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack

# Production
pnpm build        # Build for production with Turbopack
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint

# Bundle Analysis
pnpm analyze      # Analyze bundle size
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

**Abid Al Wassie**

- Email: abidalwassie@outlook.com
- LinkedIn: [linkedin.com/in/abidalwassie](https://linkedin.com/in/abidalwassie)
- GitHub: [github.com/AbidAlWassie](https://github.com/AbidAlWassie)

---

Built with ☕ using Next.js and TypeScript

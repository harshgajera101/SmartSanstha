# SmartSanstha - AI-Powered Constitutional Literacy Platform

A modern, responsive web application built with React, TypeScript, and Tailwind CSS that makes learning the Indian Constitution engaging and accessible through AI-powered features and gamification.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **TypeScript**: Full type safety and better development experience
- **Component Architecture**: Modular, reusable components
- **Modern UI**: Clean, accessible design with Tailwind CSS
- **Performance Optimized**: Fast loading and smooth interactions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm/yarn

## 📁 Project Structure

```
smartsanstha/
├── src/
│   ├── components/
│   │   ├── common/          # Shared components (Header, Footer, Layout)
│   │   ├── home/            # Homepage specific components
│   │   └── ui/              # Reusable UI components
│   ├── pages/               # Page components
│   ├── types/               # TypeScript type definitions
│   ├── hooks/               # Custom React hooks
│   ├── constants/           # Static data and constants
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and Tailwind imports
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/smartsanstha.git
cd smartsanstha
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🎨 Design System

### Colors

- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#6b7280)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography

- **Font Family**: Inter
- **Headings**: Font weight 600
- **Body**: Font weight 400
- **Labels**: Font weight 500

### Components

All components are built with:
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design principles
- Accessibility best practices

## 🔧 Development

### Code Structure

- **Components**: Each component has its own file with clear props interface
- **Types**: Centralized type definitions in `/src/types/`
- **Hooks**: Custom hooks for shared logic
- **Constants**: Static data separated from components

### Styling Guidelines

- Use Tailwind utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use semantic HTML elements
- Include proper ARIA attributes

### TypeScript Guidelines

- Define interfaces for all props
- Use proper type annotations
- Avoid `any` type
- Export types from centralized location

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance

- Lazy loading for components
- Optimized images and assets
- Minimal bundle size
- Fast loading times

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Focus management

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

## 📦 Build Optimization

The project uses Vite for:
- Fast development server
- Optimized production builds
- Tree shaking
- Code splitting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- Mohammad Waseem Khan
- Siddhant Gaikwad  
- Harsh Gajera
- Sekhar Gauda

## 🎓 Academic Information

**Institution**: A.P. Shah Institute of Technology, Thane
**Department**: Information Technology
**Academic Year**: 2025-26
**Guides**: Dr. Vaibhav Yawalkar & Prof. Charul Singh

---

Built with ❤️ for constitutional literacy and education.

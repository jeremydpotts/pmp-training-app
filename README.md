# PMP Training Module App

A comprehensive, modern web application for PMP (Project Management Professional) training. Built with React, Vite, Tailwind CSS, and Framer Motion for a professional and engaging learning experience.

## Features

- 📚 **Training Modules**: Access 7 comprehensive training modules (Module 0-6) with detailed PDF notes
- 📖 **Study Resources**: Browse PMBOK 7th Edition, Agile Practice Guide, and case studies
- 📝 **Glossary**: Quick reference for PMP terminology and definitions
- ✏️ **Practice Questions**: Mastery Builder Questions to test your knowledge
- 📊 **Progress Tracking**: Track your completion status across all modules
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations

## Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Production-ready motion library for React
- **Lucide React** - Beautiful icon library

## Repository

🔗 **GitHub Repository**: [https://github.com/jeremydpotts/pmp-training-app](https://github.com/jeremydpotts/pmp-training-app)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jeremydpotts/pmp-training-app.git
cd pmp-training-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
pmp-training-app/
├── public/
│   └── materials/          # PMP training PDFs
├── src/
│   ├── components/         # Reusable components
│   │   └── Navigation.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Modules.jsx
│   │   ├── Resources.jsx
│   │   ├── Glossary.jsx
│   │   └── Quiz.jsx
│   ├── data/               # Data files
│   │   └── modules.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles with Tailwind
└── package.json
```

## Features in Detail

### Training Modules
- Browse all 7 training modules
- View PDF content directly in the app
- Mark modules as complete to track progress
- Progress bar shows overall completion

### Study Resources
- PMBOK 7th Edition reference guide
- Agile Practice Guide
- Case studies for practical application
- Mastery Builder Questions for practice

### Progress Tracking
- Local storage saves your progress
- Visual progress indicators
- Completion badges for finished modules

## Customization

### Adding New Modules

Edit `src/data/modules.js` to add new training modules:

```javascript
{
  id: 7,
  title: "Module 7: New Topic",
  description: "Description here",
  pdf: "/materials/Module 7 Notes.pdf",
  completed: false
}
```

### Styling

The app uses Tailwind CSS. Customize colors in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your color palette
  }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# Shuan-Lin (Sam) Chen - Engineering Portfolio

A modern, responsive personal portfolio website showcasing engineering projects, research work, and contributions to STEM education.

## 🚀 Features

### Pages
- **About**: Personal introduction, background, and overview of interests
- **Trapped!…?**: Wildlife camera trap research documentation
- **Making and Tinkering**: Hands-on engineering projects and experiments
- **CAN YOU ESCAPE?**: Interactive escape room project presentation
- **Robotics Funsies**: Stanford Funbotics contributions and STEM education work

### Interactive Elements
- **Text Elements**: Color changes on hover and click
- **Image Elements**: Zoom effect on hover, opacity change on click
- **Navigation**: Floating top navigation with smooth transitions
- **Responsive Design**: Mobile-friendly with hamburger menu

### Technical Features
- **Modern Design**: Dark theme with gradient accents
- **Performance Optimized**: CSS-based animations and transitions
- **Accessibility**: Proper focus states and semantic HTML
- **Cross-browser Compatible**: Works on all modern browsers

## 🎨 Design System

The website follows a comprehensive design system defined in `design.json` with:

- **Color Palette**: Yellow, gold, amber, orange, and accent primary colors
- **Typography**: Inter font family with proper hierarchy
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, 2xl, 3xl)
- **Components**: Cards, buttons, navigation, and hero sections
- **Animations**: Smooth hover and focus transitions

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom properties, Grid, Flexbox, and animations
- **JavaScript**: Vanilla JS for interactivity and navigation
- **Pico CSS**: Minimal CSS framework for base styling
- **Google Fonts**: Inter and JetBrains Mono typography

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Wide**: 1440px and up

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/samshuanlin/samshuanlin.github.io.git
   cd samshuanlin.github.io
   ```

2. **Open in browser**:
   ```bash
   open index.html
   ```
   Or simply double-click the `index.html` file.

3. **Local development**:
   For the best experience, serve the files using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📁 Project Structure

```
samshuanlin.github.io/
├── index.html          # Main portfolio website
├── design.json         # Design system specifications
├── README.md          # Project documentation
├── pico-main/         # Pico CSS framework
│   ├── css/           # CSS files
│   ├── scss/          # SCSS source files
│   └── ...
└── .git/              # Git repository
```

## 🎯 Key Features Implementation

### Navigation System
- Fixed top navigation with backdrop blur
- Active state indicators
- Mobile hamburger menu
- Smooth page transitions

### Interactive Elements
- **Text Hover Effects**: Color transitions on hover
- **Text Click Effects**: Additional color changes on click
- **Image Hover Effects**: Subtle zoom animation
- **Image Click Effects**: Opacity reduction on click

### Hero Sections
- Gradient backgrounds with overlay
- Responsive typography scaling
- Call-to-action buttons

### Card Components
- Hover animations with transform and shadow
- Gradient accent borders
- Interactive image scaling

## 🔧 Customization

### Adding New Pages
1. Add a new page div in the HTML structure
2. Add navigation link in the header
3. Update the JavaScript `showPage()` function if needed

### Modifying Colors
Update the CSS custom properties in the `:root` selector:
```css
:root {
    --primary-yellow: #f0ba20;
    --primary-gold: #c9a016;
    /* ... other colors */
}
```

### Changing Typography
Modify the font imports and CSS variables:
```css
--font-primary: 'Your-Font', sans-serif;
```

## 📈 Performance Optimizations

- **CSS Animations**: Using `transform` and `opacity` for smooth 60fps animations
- **Minimal JavaScript**: Vanilla JS without heavy frameworks
- **Optimized Images**: SVG placeholders for fast loading
- **Efficient Selectors**: CSS classes for better performance

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Portfolio**: [samshuanlin.github.io](https://samshuanlin.github.io)
- **Email**: [Your email here]
- **LinkedIn**: [Your LinkedIn here]

---

Built with ❤️ using modern web technologies 
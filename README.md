# Big Ω - LeetCode Company Insights Extension

<p align="center">
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license"/>
  </a>
  <a href="https://github.com/codedecks-in/Big-Omega-Extension">
    <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg" alt="contributions welcome"/>
  </a>
</p>

A Chrome browser extension that enhances your LeetCode experience by showing which companies have asked each problem in real interviews, helping you prioritize your practice and prepare for technical interviews more effectively.

---

## 🎯 What Does This Extension Do?

When you're solving a problem on LeetCode, this extension automatically displays company information directly on the problem page. You'll see:

- **Which companies** have asked this problem in interviews
- **How many times** each company has asked it
- **Company logos** for visual recognition
- A clean, collapsible interface that integrates seamlessly with LeetCode's native design

This helps you:
- **Target your preparation** - Focus on problems asked by companies you're interviewing with
- **Understand problem importance** - See which problems are frequently asked across the industry
- **Save time** - No need to search externally for company-tagged problems

---

## ✨ What's New in This Version

This is an enhanced version of the original Big Ω extension with significant UI/UX improvements and modernizations:

### UI/UX Enhancements
- **Native Integration**: Completely redesigned to match LeetCode's design system
- **Pill Components**: Company information now displays as elegant pill-shaped badges matching LeetCode's Topics/Hints style
- **Collapsible Interface**: Added a clickable "Companies" pill that expands/collapses the company list - saves screen space while keeping information accessible
- **Professional Design**: Uses LeetCode's CSS classes for perfect visual consistency
- **Smart Positioning**: Companies appear below the Easy/Topics/Companies/Hint pills instead of as an overlay

### Visual Improvements
- **Company Logos**: Integrated real company logos using Simple Icons CDN
- **Color Support**: Displays official brand colors for instant recognition (Google's multicolor, Amazon's orange, etc.)
- **Graceful Fallbacks**: Shows a professional building icon for companies without logo mappings
- **70+ Logo Mappings**: Pre-configured mappings for major tech companies

### Technical Improvements
- **Optimized Selectors**: More reliable DOM element detection
- **Better Error Handling**: Tracks failed logo loads to avoid repeated requests
- **Cross-platform Compatibility**: Fixed Windows-specific build commands (replaced Unix commands with Windows equivalents)
- **URL Detection**: Only activates on problem pages for better performance
- **Theme Support**: Automatically adapts to LeetCode's light/dark theme

### Code Quality
- **Simplified State Management**: Removed unnecessary expansion/collapse state logic
- **Cleaner Component Structure**: Refactored CompanyTags component for better maintainability
- **Removed Unused Components**: Eliminated CollapseLogo, ChevronDown, and CloseButton components
- **Modern React Patterns**: Updated to use React 18 patterns and hooks

---

## 📊 How It Works: Data Sourcing

### Question-to-Company Mapping

The extension uses a comprehensive dataset stored in `src/resources/company-wise-problem-list.js` that maps LeetCode problems to companies. This data structure contains:

- **Problem Slug**: The URL-friendly name of each LeetCode problem (e.g., "two-sum")
- **Company Name**: Which company asked the problem
- **Occurrence Count**: How many times that company has asked this specific problem

**Example mapping:**
```javascript
"two-sum": [
  { company: "Amazon", num_occur: 117 },
  { company: "Adobe", num_occur: 52 },
  { company: "Google", num_occur: 44 },
  // ... more companies
]
```

### Data Source

The original dataset comes from [Huan Xu's leetcode-company-wise-problems-2022](https://github.com/hxu296/leetcode-company-wise-problems-2022) repository, which aggregates company-tagged problems from various sources including LeetCode Premium company tags, interview experiences, and community contributions.

### How It's Used

1. When you visit a LeetCode problem page, the extension extracts the problem slug from the URL
2. It looks up this slug in the local dataset
3. If matches are found, it displays all companies that have asked this problem
4. The occurrence count helps you understand which companies ask it most frequently

---

## 🎨 Company Logo System

### Logo Fetching Strategy

The extension uses **Simple Icons CDN** (`https://cdn.simpleicons.org/`) to fetch company logos:

1. **Slug Mapping**: Maintains a curated map of company names to their Simple Icons slugs
2. **Automatic Fallback**: For unmapped companies, generates slug by lowercasing and removing spaces
3. **Color Logos**: Displays official brand colors by default for instant visual recognition
4. **Error Handling**: Tracks failed logo requests and shows a generic building icon instead

### Why Simple Icons?

- **Comprehensive Coverage**: 3000+ brand logos including all major tech companies
- **Official Branding**: Uses official company colors and designs
- **SVG Format**: Scalable, crisp logos at any size
- **Reliable CDN**: Fast, globally distributed content delivery
- **Free & Open Source**: No API keys or rate limits

### Fallback System

If a logo fails to load:
1. The extension catches the error event
2. Marks that company as "logo failed" in state
3. Displays a professional building SVG icon instead
4. Prevents repeated failed requests for the same company

---

## 🚀 Installation & Usage

### Option 1: Install from Release (Recommended)

**Easiest way for end users:**

1. **Download the extension**
   - Go to the [Releases](https://github.com/abhishekmallav/Big-Omega-Extension/releases) section
   - Download the latest `big-omega-extension.zip`

2. **Unzip the file**
   - Extract the downloaded ZIP file to a folder on your computer
   - Remember the location of this folder

3. **Load in Chrome**
   - Open `chrome://extensions` in Chrome
   - Enable **Developer mode** (toggle in top-right corner)
   - Click **Load unpacked**
   - Select the unzipped folder
   - The extension is now ready to use! ✨

4. **Start using**
   - Navigate to any LeetCode problem (e.g., `https://leetcode.com/problems/two-sum/`)
   - Click the "Companies" pill to expand/collapse company information

---

### Option 2: Build from Source (For Developers)

**For developers who want to modify or contribute:**

1. **Clone the repository**
   ```bash
   git clone https://github.com/codedecks-in/Big-Omega-Extension.git
   cd Big-Omega-Extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open `chrome://extensions` in Chrome
   - Enable **Developer mode** (toggle in top-right)
   - Click **Load unpacked**
   - Select the `build` folder from the project directory

5. **Start using**
   - Navigate to any LeetCode problem (e.g., `https://leetcode.com/problems/two-sum/`)
   - Click the "Companies" pill to expand/collapse company information
   - Hover over company pills to see details

### Development Workflow

For active development:
```bash
npm run build
```

After making changes:
1. Run `npm run build` again
2. Click the refresh icon on the extension in `chrome://extensions`
3. Reload the LeetCode page

---

## 🛠️ Technical Stack

- **React 18**: UI framework
- **SCSS**: Styling
- **Chrome Extension Manifest V3**: Extension platform
- **Simple Icons CDN**: Company logo source
- **React DOM**: For content script injection

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Bug Reports
If you find a bug, please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests
Have an idea? Open an issue describing:
- The feature you'd like to see
- Why it would be useful
- Any implementation ideas

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

**Areas for Contribution:**
- Adding more company logo mappings
- Supporting additional coding platforms (HackerRank, CodeForces, etc.)
- Performance optimizations
- UI/UX improvements
- Bug fixes

---

## 🙏 Credits

### Original Extension
This project is an enhanced version of the [**Big Ω**](https://github.com/ankur-lakhmara/Big-Omega-Extension) extension originally created by:
- [Ankur Verma](https://www.linkedin.com/in/dev-ankur-verma/)
- [Omkar Ajagunde](https://www.linkedin.com/in/omkarajagunde/)
- [Gourav R](https://www.linkedin.com/in/grusiya/)
- [Gaurav Garg](https://www.linkedin.com/in/gaurav-garg-339518141/)

Their original work laid the foundation for this extension, and this version builds upon their vision with modern UI improvements and enhanced functionality.

### Data Source
Special thanks to [Huan Xu](https://github.com/hxu296) for creating and maintaining the [leetcode-company-wise-problems-2022](https://github.com/hxu296/leetcode-company-wise-problems-2022) dataset, which makes this extension possible.

### Logo Source
Company logos provided by [Simple Icons](https://simpleicons.org/), an open-source project offering free SVG icons for popular brands.

---

## 👤 Author

[**Abhishek**](https://github.com/abhishekmallav) - Current Maintainer

I've taken over maintaining and enhancing this extension with a focus on:
- Modern UI/UX design that seamlessly integrates with LeetCode
- Better visual feedback through company logos
- Improved performance and reliability

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for the developer community
</p>

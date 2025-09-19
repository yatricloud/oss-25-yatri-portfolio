# Yatharth Chauhan - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features a dynamic projects section that automatically fetches data from GitHub repositories.

## ✨ Features

- **Dynamic GitHub Integration**: Automatically fetches and displays your public GitHub repositories
- **Real-time Data**: Shows live repository information including stars, forks, and last updated dates
- **Smart Categorization**: Automatically categorizes projects based on topics and programming languages
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI/UX**: Beautiful animations and smooth interactions using Framer Motion
- **Dark/Light Theme**: Toggle between themes with persistent state

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Vercel Configuration (Optional - for deployment features)
VITE_VERCEL_TOKEN=your_vercel_token_here
VITE_VERCEL_TEAM_ID=your_vercel_team_id_here
VITE_VERCEL_TEMPLATE_REPO=your_vercel_template_repo_here

# GitHub Configuration (Optional - for custom default user)
VITE_DEFAULT_GITHUB_USERNAME=your_default_github_username_here
```

### Required Variables
- **VITE_SUPABASE_URL**: Your Supabase project URL
- **VITE_SUPABASE_ANON_KEY**: Your Supabase anonymous key

### Optional Variables
- **VITE_VERCEL_TOKEN**: Vercel API token for deployment features
- **VITE_VERCEL_TEAM_ID**: Vercel team ID for deployment features
- **VITE_VERCEL_TEMPLATE_REPO**: Template repository for deployments
- **VITE_DEFAULT_GITHUB_USERNAME**: Default GitHub username (fallback when no user is signed in)

## 🚀 GitHub Projects Integration

The projects section automatically fetches data from your GitHub profile and displays:

- **Repository Information**: Name, description, programming language
- **GitHub Stats**: Stars, forks, last updated date
- **Smart Categories**: AI/ML, Web Apps, Mobile, Data Science, DevOps, Cloud, etc.
- **Technology Tags**: Extracted from repository topics and languages
- **Live Links**: Direct links to GitHub repositories and live demos (if available)

### How It Works

1. **GitHub API Integration**: Uses the public GitHub API to fetch repository data
2. **Smart Processing**: Automatically categorizes projects based on topics and languages
3. **Dynamic Filtering**: Filter projects by category with real-time updates
4. **Responsive Grid**: Beautiful card layout that adapts to different screen sizes

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── ProjectsSection.tsx      # Main projects component with GitHub integration
│   ├── ProjectSkeleton.tsx      # Loading skeleton for projects
│   └── ...                      # Other UI components
├── services/
│   └── githubService.ts         # GitHub API service and data processing
├── hooks/
│   └── useGitHubProjects.ts     # Custom hook for managing GitHub data
└── ...
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd static-portfolio-yatri
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

### GitHub Integration

The GitHub integration is configured in `src/services/githubService.ts`:

- **Username**: Set your GitHub username in the `USERNAME` constant
- **API Endpoints**: Uses the public GitHub API (no authentication required)
- **Repository Filtering**: Automatically filters out archived and forked repositories

### Customization

- **Categories**: Modify `CATEGORY_MAPPINGS` to add custom project categories
- **Gradients**: Update `GRADIENT_MAPPINGS` to customize project card colors
- **Featured Logic**: Adjust the `isFeatured` function to change what makes a project featured

## 🔧 Customization

### Adding New Project Categories

```typescript
const CATEGORY_MAPPINGS: { [key: string]: string } = {
  // ... existing mappings
  'blockchain': 'Blockchain',
  'game-dev': 'Game Development',
  // Add your custom categories here
};
```

### Customizing Project Gradients

```typescript
const GRADIENT_MAPPINGS: { [key: string]: string } = {
  // ... existing mappings
  'Rust': 'from-orange-500 to-red-500',
  'Go': 'from-cyan-500 to-blue-500',
  // Add your custom gradients here
};
```

## 📱 Responsive Design

The projects section is fully responsive with:
- **Mobile**: Single column layout
- **Tablet**: Two column layout
- **Desktop**: Three column layout
- **Large Screens**: Optimized spacing and typography

## 🎨 Theme Support

- **Light Theme**: Clean, professional appearance
- **Dark Theme**: Modern, sleek design
- **Automatic Switching**: Respects user's system preferences
- **Persistent State**: Remembers user's theme choice

## 🔍 Performance Features

- **Lazy Loading**: Projects load progressively with skeleton screens
- **Efficient Filtering**: Real-time category filtering without re-fetching data
- **Optimized Animations**: Smooth transitions using Framer Motion
- **Minimal API Calls**: Single API call to fetch all repository data

## 🚀 Deployment

The project can be deployed to any static hosting service:

- **Vercel**: Automatic deployments from Git
- **Netlify**: Drag and drop deployment
- **GitHub Pages**: Free hosting for open source projects
- **AWS S3**: Scalable cloud hosting

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **GitHub**: [@YatharthChauhan2362](https://github.com/YatharthChauhan2362)
- **Portfolio**: [Your Portfolio URL]
- **LinkedIn**: [Your LinkedIn Profile]

---

Built with ❤️ by Yatharth Chauhan

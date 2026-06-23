# Sai Vikranth's Portfolio

Your exact portfolio replica built with Next.js, React, and Tailwind CSS - matching your brother's design perfectly with your personal content.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to project directory:**
   ```bash
   cd sai-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 📋 Customization Guide

### Update Your Information

All your personal information is stored in `/src/data/content.json`. Edit this file to customize:

- **Personal Info**: Name, email, phone, location, social links
- **About Section**: Bio, roles, education, experience
- **Experience**: Work history and achievements
- **Education**: Degree and institution details
- **Skills**: Programming languages, frameworks, databases, AI/ML tools
- **Projects**: Your portfolio projects with descriptions
- **Contact**: Contact form heading and availability
- **Terminal**: Welcome message and system prompts

### Update Your Resume

Replace the resume file at `/docs/Sai_Vikranth_Kanuru_Resume.pdf` with your actual resume.

### Add Profile Picture

1. Add your profile picture to `/public/images/`
2. Update references in components if needed

### Update Social Links

In `/src/data/content.json`, update:
- GitHub username
- LinkedIn profile URL
- Email address
- Any other social links

## 🌐 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio setup"
git remote add origin https://github.com/yourusername/portfolio
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your portfolio repository
5. Click "Deploy"

Vercel will automatically build and deploy your portfolio. Your site will be live at: `https://your-username.vercel.app`

## 🎨 Portfolio Structure

```
src/
├── app/                    # Next.js pages
│   ├── about/             # About page
│   ├── projects/          # Projects showcase
│   ├── skills/            # Skills section
│   ├── experience/        # Work experience
│   ├── contact/           # Contact form
│   ├── resume/            # Resume page
│   └── page.tsx           # Home page (Terminal)
├── components/            # Reusable components
│   ├── layout/           # Navigation, Footer
│   ├── terminal/         # Terminal interface
│   ├── theme/            # Dark/Light mode
│   └── ui/               # UI components
├── data/                 # Content management
│   └── content.json      # Your information
└── styles/               # Global styles
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Fonts**: Inter, Fira Code (Google Fonts)
- **Deployment**: Vercel

## ✨ Features

- ✅ Terminal-based interactive portfolio
- ✅ Dark/Light mode toggle
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Smooth animations with Framer Motion
- ✅ SEO optimized with metadata
- ✅ Fast performance with Next.js optimization
- ✅ Easy content management via JSON

## 📝 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | / | Terminal interface showcase |
| About | /about | Personal bio and background |
| Experience | /experience | Work history |
| Projects | /projects | Portfolio projects |
| Skills | /skills | Technical skills |
| Contact | /contact | Contact form |
| Resume | /resume | Resume download |

## 🎯 Before Deploying

**DO NOT FORGET:**
1. ✅ Update `/src/data/content.json` with your information
2. ✅ Replace resume PDF with your actual resume
3. ✅ Add your profile picture to `/public/images/`
4. ✅ Update GitHub links to your repositories
5. ✅ Verify all social media links are correct
6. ✅ Test all pages locally with `npm run dev`
7. ✅ Build the project: `npm run build`

## 🔗 After Deployment

**Add portfolio link to your resume:**
```
Portfolio: https://your-vercel-domain.vercel.app
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001
```

### Clear Build Cache
```bash
rm -rf .next
npm run dev
```

### Install Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📧 Contact & Support

- Email: kanuruvikranth@gmail.com
- GitHub: https://github.com/saivikranth08
- LinkedIn: https://www.linkedin.com/in/vikranthkanuru/

## 📄 License

This portfolio is based on your brother's design. Make sure to credit them if you publicly share this project.

---

**Ready to deploy?** Follow the Vercel deployment steps above and share your portfolio!

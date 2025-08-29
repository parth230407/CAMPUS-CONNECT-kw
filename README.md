# Campus Connect 🎓

A blockchain-powered social networking app for university students to connect based on shared interests. Built for the Stacks Hackathon.

## 🚀 Features

- **Interest-Based Matching**: Find students with similar hobbies and academic interests
- **Stacks Authentication**: Secure login using Stacks ID (no personal data required)
- **Token Rewards**: Earn tokens for connecting and participating in activities
- **Study Groups**: Join interest-based groups and communities
- **Achievement System**: Unlock badges and earn bonus tokens
- **Privacy-First**: Your personal information stays private

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Authentication**: Stacks Connect (@stacks/connect)
- **Blockchain**: Stacks blockchain for token rewards
- **Icons**: Lucide React

## 📋 Prerequisites

Before you start, make sure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)
- **Git** (optional but recommended) - [Download here](https://git-scm.com/)

## 🏃‍♂️ Quick Start (Hackathon Setup)

### Step 1: Download the Project
1. Download the project ZIP file from v0
2. Extract it to your desired folder
3. Open the folder in VS Code

### Step 2: Install Dependencies
Open the terminal in VS Code (`Terminal > New Terminal`) and run:

\`\`\`bash
npm install
\`\`\`

This will install all required packages including:
- Next.js and React
- Stacks Connect for authentication
- Tailwind CSS for styling
- All UI components

### Step 3: Start the Development Server
\`\`\`bash
npm run dev
\`\`\`

### Step 4: Open Your App
Open your browser and go to: **http://localhost:3000**

You should see the Campus Connect homepage! 🎉

## 📱 Available Pages

Once running, you can navigate to:

- **Homepage**: `http://localhost:3000` - Landing page and app overview
- **Discover Students**: `http://localhost:3000/discover` - Find and connect with students
- **Interest Groups**: `http://localhost:3000/groups` - Join study groups
- **Profile**: `http://localhost:3000/profile` - Manage your profile (requires Stacks ID)
- **Rewards**: `http://localhost:3000/rewards` - View tokens and achievements (requires Stacks ID)

## 🔐 Stacks Authentication Setup

### For Development/Testing:
1. Install a Stacks wallet (like Hiro Wallet browser extension)
2. Create a testnet account or use mainnet
3. Click "Connect with Stacks ID" in the app
4. Approve the connection in your wallet

### For Hackathon Demo:
- The app works without authentication for browsing
- Authentication is required for profile, rewards, and some features
- You can demo the UI without connecting a wallet

## 🎯 Key Components

### Authentication
- `components/auth-provider.tsx` - Manages authentication state
- `components/auth-button.tsx` - Login/logout button
- `components/protected-route.tsx` - Protects authenticated pages

### Student Profiles
- `app/profile/page.tsx` - Profile management
- `app/discover/page.tsx` - Student discovery with matching
- `components/student-profile-card.tsx` - Reusable profile cards

### Token Rewards
- `app/rewards/page.tsx` - Rewards center
- `lib/rewards.ts` - Reward logic and data
- `components/token-balance-card.tsx` - Token balance display

### Interest Matching
- Smart matching algorithm based on shared interests
- Compatibility scoring system
- Recommended connections

## 🐛 Troubleshooting

### Common Issues:

**1. "npm install" fails:**
\`\`\`bash
# Try clearing npm cache
npm cache clean --force
npm install
\`\`\`

**2. Port 3000 already in use:**
\`\`\`bash
# Use a different port
npm run dev -- -p 3001
\`\`\`
Then visit: `http://localhost:3001`

**3. Stacks authentication not working:**
- Make sure you have a Stacks wallet installed
- Check browser console for errors
- Try refreshing the page after connecting

**4. Styling looks broken:**
- Make sure all dependencies installed correctly
- Try restarting the dev server (`Ctrl+C` then `npm run dev`)

### Getting Help:
- Check the browser console (F12) for error messages
- Make sure Node.js version is 18 or higher: `node --version`
- Restart VS Code and try again

## 🏗️ Project Structure

\`\`\`
campus-connect/
├── app/                    # Next.js app directory
│   ├── discover/          # Student discovery page
│   ├── groups/            # Interest groups page
│   ├── profile/           # User profile page
│   ├── rewards/           # Token rewards page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── auth-provider.tsx # Authentication context
│   ├── auth-button.tsx   # Login/logout button
│   └── ...               # Other components
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication helpers
│   ├── rewards.ts       # Rewards system
│   └── utils.ts         # General utilities
└── package.json         # Dependencies and scripts
\`\`\`

## 🎨 Customization

### Colors:
The app uses a cyan and pink color scheme. To modify:
- Edit `app/globals.css` CSS variables
- Primary: Cyan (#0891b2)
- Accent: Pink (#ec4899)
- Secondary: Various supporting colors

### Adding Features:
1. Create new pages in the `app/` directory
2. Add components in `components/`
3. Update navigation in headers
4. Test with `npm run dev`

## 🚀 Deployment

### For Hackathon Demo:
1. The app runs locally on your machine
2. Share your screen or use localhost tunneling
3. All features work in development mode

### For Production:
\`\`\`bash
npm run build
npm start
\`\`\`

## 📝 Hackathon Notes

### What's Implemented:
✅ Student profile system with interests
✅ Interest-based matching algorithm
✅ Stacks blockchain authentication
✅ Token rewards system with achievements
✅ Study groups and communities
✅ Responsive design for all devices
✅ Complete UI/UX with modern design

### Demo Flow:
1. Show homepage and features
2. Browse students without authentication
3. Connect Stacks ID for full features
4. Create/edit profile with interests
5. Discover compatible students
6. Join interest groups
7. View token rewards and achievements

### Technical Highlights:
- Built with latest Next.js 15 and React 19
- Integrated with Stacks blockchain
- Smart matching algorithm
- Gamified token system
- Privacy-focused design

## 🤝 Contributing

This is a hackathon project! Feel free to:
- Add new features
- Improve the UI/UX
- Enhance the matching algorithm
- Add more reward activities

## 📄 License

Built for the Stacks Hackathon. Open source and free to use.
https://drive.google.com/file/d/1fDEidIc0i22NepxBWw6QEvoYOYyUIK-q/view?usp=drive_link  demo video
---

**Good luck with your hackathon! 🚀**

Need help? Check the troubleshooting section above or ask your teammates!

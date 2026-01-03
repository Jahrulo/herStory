# Embracing HERstory

A complete, responsive single-page application celebrating feminist storytelling and legal practice by Henrietta Marie Foray.

## Overview

**Embracing HERstory** is a modern web application that serves as both a personal brand website and a feminist storytelling platform. The site showcases Henrietta Marie Foray's work as a lawyer, writer, and feminist storyteller, with a dedicated blog for essays on gender, technology, law, and social justice.

### Brand Identity

- **Tagline:** "Henrietta Marie Foray"
- **Website Name:** Embracing HERstory
- **Description:** Lawyer | Feminist Storyteller | Tech & Gender Policy Enthusiast | Advocate
- **Focus:** Amplifying women's voices, shaping narratives, and exploring the intersection of law, technology, and gender justice

## Technology Stack

- **Frontend:** React 18 + React Router 6 (SPA)
- **Styling:** Tailwind CSS 3 with custom feminist-inspired theme
- **State Management:** React Context API (Auth & Blog)
- **Persistence:** localStorage for blog posts and authentication
- **Build Tool:** Vite
- **Package Manager:** pnpm
- **Icons:** Lucide React
- **UI Components:** Radix UI (available if needed)

## Project Structure

```
client/
├── pages/              # Page components
│   ├── Home.tsx       # Landing page with hero and CTAs
│   ├── About.tsx      # About Henrietta page
│   ├── Blog.tsx       # Blog listing with subscription
│   ├── BlogDetail.tsx # Individual blog post view
│   ├── Services.tsx   # Legal services offered
│   ├── Contact.tsx    # Contact form and details
│   ├── AdminLogin.tsx # Admin authentication
│   ├── AdminDashboard.tsx # Blog management
│   └── NotFound.tsx   # 404 page
├── components/        # Reusable components
│   ├── Header.tsx     # Navigation header
│   ├── Footer.tsx     # Site footer with social links
│   ├── BlogCard.tsx   # Blog post card component
│   ├── Layout.tsx     # Layout wrapper with header/footer
│   └── ProtectedRoute.tsx # Route protection for admin
├── contexts/          # React Context providers
│   ├── BlogContext.tsx    # Blog post state management
│   └── AuthContext.tsx    # Admin authentication state
├── App.tsx           # Main app with routing
└── global.css        # Global styles and theme variables

server/               # Express backend (minimal)
shared/              # Shared types
```

## Key Features

### Public Pages

1. **Home Page** - Landing page with hero section, brand identity, and call-to-action buttons
2. **About Page** - Biography, professional background, values, and fun facts
3. **Blog Listing** - All blog posts with categories, email subscription form
4. **Blog Post Detail** - Full essay view with author bio and sharing options
5. **Services Page** - Legal services and practice areas
6. **Contact Page** - Contact form and multiple contact methods

### Admin Features

- **Authentication:** Login with hardcoded credentials 
- **Blog Management:** Full CRUD operations for blog posts
- **Persistence:** Blog posts saved to localStorage across sessions
- **Post Fields:** Title, excerpt, content, date, theme, author

### Design Features

- **Feminist-Inspired Theme:**
  - Primary: Deep Purple (#3D1970)
  - Secondary: Purple (#4B2FA8)
  - Accent: Gold (#FFC107)
  - Highlight: Pink (#E94B8B)
  - Light Blue (#B3E5FC)

- **Typography:**
  - Headings: Montserrat (bold)
  - Body: Roboto (clean, readable)

- **Responsive Design:**
  - Mobile-first approach
  - Breakpoints at 768px (md) and above
  - Touch-friendly navigation

### Sample Data

The application comes with 2 sample blog posts:
1. "Feminist Journeys: Reclaiming My Voice"
2. "Tech & Gender: Who Gets to Build the Future?"



## Admin Access

1. Navigate to `/admin-login`
2. Enter credentials:
3. Access the admin dashboard at `/admin` to manage blog posts

## Color Palette

The site uses a feminist-inspired color scheme:

- **Deep Purple** (`#3D1970`): Primary brand color
- **Purple** (`#4B2FA8`): Secondary/accent
- **Gold** (`#FFC107`): Highlight/calls-to-action
- **Pink** (`#E94B8B`): Feminine accent
- **Light Blue** (`#B3E5FC`): Secondary background

## localStorage Structure

### Blog Posts
- Key: `embracing-herstory-posts`
- Format: Array of BlogPost objects with id, title, excerpt, content, date, theme, author





## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design supports devices from 320px width

## Future Enhancements

Potential features for future versions:
- Real email backend integration
- User comments on blog posts
- Search functionality
- Tags and categories filter
- Dark mode toggle
- Guest blog contributions
- Speaking engagements/events calendar
- Newsletter system

## License

All content © 2025 Henrietta Marie Foray. All rights reserved.

---

**Built with purpose, passion, and commitment to feminist storytelling.**

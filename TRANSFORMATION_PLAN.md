# Shipyard — P-Tier Professional Transformation Plan

## Core Identity (Locked)
- **Brand**: Shipyard — where AI builders dock & ship
- **Colors**: Cyan (primary), Purple (secondary), Green (accent/accent), Navy bg
- **Typography**: Syne (display), Space Grotesk (UI), Mono (technical)
- **Visual Language**: Glassmorphism, terminal aesthetics, telemetry/data feel
- **Voice**: Technical, confident, builder-first, no fluff

---

## Section-by-Section Transformation

### 1. Login Page (`/login`) — "Auth Terminal"
**Current**: Basic glass card with OAuth buttons
**Target**: Terminal-themed auth experience that feels like docking

| Element | Upgrade |
|---------|---------|
| Background | Animated grid + subtle particle field + cyan/purple radial glows |
| Card | Terminal frame (traffic lights, `auth.session` tab, live status) |
| OAuth Buttons | Styled as terminal commands: `> github.auth()`, `> google.auth()` |
| Email/Password | Terminal input style with live validation feedback |
| Loading | Real terminal animation: `Docking session... [████░░░░░░] 42%` |
| Error States | Inline terminal-style errors: `✗ ERROR: Invalid credentials` |
| Micro-interactions | Keystroke sounds (optional), cursor blink, command echo |

**Functional**: Real Supabase OAuth, magic link option, remember me, redirect to intended page

---

### 2. Navbar — "Command Bridge"
**Current**: Floating capsule with basic links
**Target**: Persistent command interface

| Element | Upgrade |
|---------|---------|
| Logo | Animated zap icon, "SHIPYARD" with subtle gradient shimmer |
| Live Badge | Real-time WebSocket count: `2,847 builders online` |
| Nav Links | Hover: terminal underline animation, active: cyan glow |
| User Menu | Avatar + name + role badge (Builder/Founder), status indicator |
| Command Palette | `⌘K` → search builders, projects, commands, settings |
| Notifications | Bell icon with real-time count, dropdown with actions |
| Theme Toggle | System/Light/Dark with smooth transition |
| Mobile | Slide-out terminal panel, not generic hamburger |

**Functional**: Real auth state, notification WebSocket, keyboard shortcuts

---

### 3. Landing Page (`/`) — "Mission Control"

#### Hero Section
| Current | Target |
|---------|--------|
| Static headline + terminal demo | **Interactive mission control** — live terminal that visitors can type in |
| 3 preset demos | **Live sandbox** — type any prompt, see simulated output instantly |
| Stats strip | **Live counters** — WebSocket-fed: builders, ships, contracts, revenue |

#### Featured Builders
| Current | Target |
|---------|--------|
| Static cards | **Live telemetry cards** — pulsing activity bars, real-time status dots |
| 6 builders | **Infinite scroll** — load more, filter by stack, search |

#### How It Works
| Current | Target |
|---------|--------|
| 3-step cards with hover wires | **Interactive pipeline visualization** — click step, see live data flow |
| Static descriptions | **Expandable technical detail** — show actual API calls, webhook payloads |

#### Featured Projects
| Current | Target |
|---------|--------|
| Static project cards | **Live project feed** — real-time views, deploy status, revenue indicators |

#### Discover Feed
| Current | Target |
|---------|--------|
| Preset role matching demo | **Real semantic search** — type query, see live results with vibe scores |

#### CTA Section
| Current | Target |
|---------|--------|
| Two static cards | **Split terminal** — left: builder flow, right: founder flow, both interactive |

---

### 4. Dashboard (`/dashboard`) — "Builder Bridge"

#### Layout
- **Left rail**: Navigation (Overview, Ships, Contracts, Profile, Settings)
- **Top bar**: Search, notifications, user menu, command palette
- **Main**: Responsive grid, real-time data

#### Overview Tab
| Element | Spec |
|---------|------|
| Stats Cards | 4 cards: Ships Docked, Active Contracts, Vibe Score, Earnings — with sparklines |
| Recent Activity | Live feed: ship deployed, contract signed, payment received, profile viewed |
| Quick Actions | Dock Ship, Update Profile, View Contracts, Invite Collaborator |
| Performance Graph | Last 30 days: views, contracts, revenue — interactive chart |

#### Ships Tab (`/dashboard/ships`)
| Feature | Spec |
|---------|------|
| List View | Sortable table: name, status, stars, views, last deploy, actions |
| Card View | Visual cards with preview thumbnails |
| Filter/Sort | By status (draft/docked/verified), stack, date, views |
| Empty State | Illustrated terminal: `> dock new_ship --help` |
| New Ship Flow | Multi-step: Connect GitHub → Configure → Verify → Launch |

#### Contracts Tab (`/dashboard/contracts`)
| Feature | Spec |
|---------|------|
| Two Views | As Builder / As Founder (toggle) |
| Status Pipeline | Kanban: Pending → Active → Review → Paid → Completed |
| Milestone Tracker | Visual progress per contract, payment status |
| Actions | Accept, Submit Work, Request Payment, Dispute |

#### Profile Tab (`/dashboard/profile`)
| Section | Fields |
|---------|--------|
| Identity | Avatar upload, username, display name, headline, bio |
| Stack | Multi-select with search, proficiency levels, drag-to-reorder |
| Links | GitHub, Twitter, LinkedIn, Website, Discord — with verification badges |
| Preferences | Email notifications, visibility, theme, timezone |
| Verification | GitHub OAuth status, email verified, 2FA |

---

### 5. Public Builder Profile (`/builder/:username`) — "Port Dossier"

| Section | Spec |
|---------|------|
| Header | Avatar, name, headline, vibe score, verified badges, follow/contact CTAs |
| Stats Bar | Ships, Stars, Contracts, Success Rate, Response Time |
| Ships Grid | Filterable, sortable, with live demo links |
| Stack Visualization | Interactive radar chart / tag cloud |
| Activity Timeline | Recent deploys, contract completions, reviews |
| Contact Modal | Founder inquiry form → creates contract draft |

---

### 6. Discover/Search (`/discover`) — "Semantic Radar"

| Feature | Spec |
|---------|------|
| Search Input | Natural language: "React + Stripe + AI chatbot" |
| Filters | Stack, price range, availability, rating, location |
| Results | Cards with vibe score, match reasoning, quick actions |
| Saved Searches | Alert when new matches appear |
| Founder View | Post project → get matched builders in real-time |

---

### 7. Project Detail (`/ship/:id`) — "Ship Manifest"

| Section | Spec |
|---------|------|
| Header | Title, status badge, builder link, star/fork/view counts |
| Live Demo | Embedded iframe or screenshot carousel |
| Tech Stack | Interactive tags with version badges |
| Repository | GitHub link, last commit, deploy status, CI badge |
| Metrics | Views over time, clone rate, contract conversions |
| Contracts | List of contracts from this ship |
| Actions | Clone, Fork, Hire Builder, Report |

---

### 8. Global Systems

| System | Implementation |
|--------|----------------|
| **Design Tokens** | Single source: `tailwind.config.ts` + CSS variables |
| **Component Library** | shadcn/ui extended with Shipyard variants |
| **Animations** | Framer Motion — page transitions, micro-interactions |
| **State** | TanStack Query + Zustand for UI state |
| **Real-time** | Supabase Realtime for live counters, notifications |
| **Analytics** | PostHog/Plausible — track funnels, feature usage |
| **Error Boundaries** | Per-section fallbacks with terminal-style error UI |
| **Loading States** | Skeleton screens matching terminal aesthetic |
| **Accessibility** | WCAG AA — focus rings, ARIA, reduced motion, contrast |

---

## Implementation Order (Dependency-Aware)

1. **Design System Foundation** — tokens, base components, theme provider
2. **Navbar + Auth State** — used everywhere
3. **Login Page** — entry point
4. **Dashboard Layout + Overview** — core authenticated experience
5. **Ships CRUD** — Dock, List, Detail, Delete
6. **Profile Page** — identity management
7. **Contracts** — pipeline, milestones
8. **Landing Page** — Hero, Builders, How It Works, Projects, Discover, CTA
9. **Public Profiles** — `/builder/:username`, `/ship/:id`
10. **Discover/Search** — semantic matching
11. **Polish** — animations, real-time, analytics, error boundaries

---

## Quality Gates (Per Section)

- [ ] TypeScript strict mode passes
- [ ] Responsive: 320px, 768px, 1024px, 1440px
- [ ] Dark/Light/System themes work
- [ ] Reduced motion respected
- [ ] Keyboard navigable
- [ ] Screen reader tested
- [ ] Loading/error/empty states implemented
- [ ] Real data (no mocks in production build)
- [ ] Performance: <100ms TTI, <2.5s LCP
- [ ] Visual regression tested

---

## Next Step

**Start with #1: Design System Foundation** — extract all tokens, create base components, set up theme provider. This unblocks everything else.

Want me to begin?
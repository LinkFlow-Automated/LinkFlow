# 🔗 LinkFlow

**LinkFlow** is an advanced link management platform with intelligent routing, comprehensive analytics, and powerful smart rules engine. Built with Next.js 15, TypeScript, and modern web technologies.

## ✨ Features

### 🎯 Smart Rules Engine

- **Geographic Targeting**: Country and region-based link visibility
- **Device & Browser Targeting**: Show links based on user's device, browser, and OS
- **Time-Based Rules**: Schedule links with time windows and date ranges
- **Click Limits**: Daily, hourly, and total click restrictions
- **A/B Testing**: Built-in A/B testing with traffic splitting and user consistency
- **Rotation Groups**: Weighted link rotation for content variety
- **Auto-Feature**: Automatically promote high-performing links

### 📊 Advanced Analytics

- **Real-time Click Tracking**: Comprehensive click event monitoring
- **Geographic Analytics**: Country and region-based insights
- **Device Analytics**: Browser, OS, and device type statistics
- **UTM Tracking**: Campaign, source, and medium tracking
- **Time-based Reports**: Daily, weekly, monthly analytics
- **Referrer Analysis**: Track traffic sources and referrers

### 🔐 Authentication & Security

- **Better Auth Integration**: Secure authentication with multiple providers
- **API Key Management**: Rate-limited API access with permissions
- **OAuth Support**: OAuth applications and access tokens
- **Session Management**: Secure session handling with IP tracking

### 🌐 Public API (v1)

- **RESTful API**: Complete CRUD operations for links and analytics
- **Real-time Evaluation**: Smart rules evaluation endpoint
- **Click Analytics**: Comprehensive analytics API
- **Rate Limiting**: Built-in rate limiting and quota management

## MCP Server

-

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Better Auth
- **Payments**: Stripe Integration
- **Analytics**: Custom analytics engine
- **Geolocation**: MaxMind GeoLite2

### Project Structure

```
linkflow/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   ├── [bio]/             # Bio page functionality
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
│       ├── auth/          # Authentication endpoints
│       └── v1/            # Public API v1
├── components/            # React components
│   ├── shared/           # Shared components
│   └── ui/               # UI components (Shadcn/ui)
├── lib/                  # Core libraries
│   ├── actions/          # Server actions
│   ├── services/         # Business logic services
│   ├── utils/            # Utility functions
│   └── validations/      # Zod schemas
├── prisma/               # Database schema and migrations
└── types/                # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd linkflow
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/linkflow"

   # Authentication
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"

   # Stripe (optional)
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."

   # Redis (optional, for caching)
   UPSTASH_REDIS_REST_URL="your-redis-url"
   UPSTASH_REDIS_REST_TOKEN="your-redis-token"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   pnpm prisma generate

   # Run migrations
   pnpm prisma migrate dev

   # Seed database (optional)
   pnpm prisma db seed
   ```

5. **Start Development Server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API Documentation

### Base URL

```
https://your-domain.com/api/v1
```

### Authentication

Include your API key in the header:

```
Authorization: Bearer your-api-key
```

### Endpoints

#### Links Management

```http
GET    /api/v1/links              # Get all links
POST   /api/v1/links              # Create new link
GET    /api/v1/links/{id}         # Get specific link
PUT    /api/v1/links/{id}         # Update link
DELETE /api/v1/links/{id}         # Delete link
```

#### Smart Rules Evaluation

```http
POST   /api/v1/links/evaluate     # Evaluate links with smart rules
```

#### Analytics

```http
GET    /api/v1/click              # Get click analytics
```

### Example: Create Link with Smart Rules

```json
POST /api/v1/links
{
  "title": "My Awesome Link",
  "url": "https://example.com",
  "rules": {
    "countryAllow": ["US", "CA", "GB"],
    "maxClicksPerDay": 1000,
    "timeWindows": [
      {
        "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "start": "09:00",
        "end": "17:00"
      }
    ],
    "abTestId": "homepage-test",
    "abTestVariant": "A",
    "trafficSplit": 50
  }
}
```

### Example: Smart Rules Evaluation

```json
POST /api/v1/links/evaluate
{
  "links": [...],
  "context": {
    "country": "US",
    "device": "mobile",
    "browser": { "name": "Chrome", "version": "120.0" },
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## 🎛️ Smart Rules Configuration

### Geographic Targeting

```typescript
{
  countryAllow: ["US", "CA", "GB"],     // Allow specific countries
  countryBlock: ["CN", "RU"],          // Block specific countries
  regionAllow: ["US-CA", "US-NY"]      // Allow specific regions
}
```

### Click Limits

```typescript
{
  maxClicks: 10000,                    // Total click limit
  maxClicksPerDay: 1000,               // Daily limit
  maxClicksPerHour: 100,               // Hourly limit
  minClicksToShow: 50                  // Minimum clicks to show
}
```

### Time Windows

```typescript
{
  timeWindows: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      start: "09:00",
      end: "17:00",
    },
  ];
}
```

### A/B Testing

```typescript
{
  abTestId: "homepage-cta-test",       // Test identifier
  abTestVariant: "A",                  // Variant (A or B)
  trafficSplit: 50,                    // Percentage for variant A
  testStartDate: "2024-01-01T00:00:00Z",
  testEndDate: "2024-02-01T00:00:00Z"
}
```

## 🔧 Development

### Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run linting
pnpm prepare      # Setup Husky hooks
```

### Code Quality

- **Biome**: Code formatting and linting
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Conventional commit messages
- **TypeScript**: Full type safety

### Database Operations

```bash
pnpm prisma studio              # Open Prisma Studio
pnpm prisma migrate dev         # Create and apply migration
pnpm prisma generate           # Generate Prisma client
pnpm prisma db push           # Push schema changes
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Docker

```dockerfile
# Dockerfile included for containerized deployment
docker build -t linkflow .
docker run -p 3000:3000 linkflow
```

### Environment Variables for Production

```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="production-secret"
BETTER_AUTH_URL="https://your-domain.com"
STRIPE_SECRET_KEY="sk_live_..."
```

## 📈 Monitoring & Analytics

### Built-in Analytics

- Real-time click tracking
- Geographic distribution
- Device and browser analytics
- UTM campaign tracking
- Performance metrics

### External Integrations

- Stripe for payments
- MaxMind for geolocation
- Redis for caching (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Commit Convention

```
feat: add new smart rule type
fix: resolve geographic targeting bug
docs: update API documentation
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs and feature requests on GitHub
- **Discussions**: Join community discussions

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.

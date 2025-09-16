# LinkFlow Developer Guide

## 🏗️ Project Structure

### Core Architecture

LinkFlow follows a modern Next.js 15+ architecture with App Router and Server Components. Here's the high-level structure:

```
/app                 # Next.js App Router directory
  /(auth)            # Authentication routes (login/signup)
  /(root)            # Main application routes
  /[bio]             # Dynamic bio page routes
  /api               # API routes
    /v1              # Public API endpoints
/components          # React components
  /shared            # Shared components across pages
  /ui                # UI component library
/lib                 # Core utilities and services
  /actions           # Server actions
  /services          # Business logic services
  /validations       # Data validation schemas
/types               # TypeScript type definitions
```

## 🔧 Development Guidelines

### API Structure

1. **Server Actions vs API Routes**
   - Use server actions for CUD (Create, Update, Delete) operations
   - Use API routes for READ operations
   - All public API endpoints should be under `/api/v1`

```typescript
// Example Server Action (CUD)
// /lib/actions/links.ts
export async function createLink(data: LinkData) {
  'use server';
  // Implementation
}

// Example API Route (READ)
// /app/api/v1/links/route.ts
export async function GET(request: Request) {
  // Implementation
}
```

### Component Organization

1. **Shared Components**
   - Place reusable components in `/components/shared`
   - Follow atomic design principles
   - Use composition over inheritance

2. **UI Components**
   - Use shadcn/ui components from `/components/ui`
   - Maintain consistent styling with Tailwind CSS

```typescript
// Example Component Structure
// /components/shared/bio/card/spotify/new-song-card.tsx
export function NewSongCard({ props }) {
  // Implementation
}
```

### Smart Rules Implementation

1. **Service Layer**
   - Implement business logic in `/lib/services`
   - Follow single responsibility principle
   - Use TypeScript for type safety

```typescript
// Example Service
// /lib/services/smart-rules-engine.ts
export class SmartRulesEngine {
  async evaluateRules(context: RuleContext) {
    // Implementation
  }
}
```

2. **Type Definitions**
   - Define types in `/types` directory
   - Use interfaces for complex objects
   - Export types for reuse

```typescript
// /types/smart-rules.ts
export interface SmartRule {
  type: RuleType;
  conditions: RuleCondition[];
  actions: RuleAction[];
}
```

## 🚀 Best Practices

### Code Style

1. **TypeScript**
   - Use strict type checking
   - Avoid `any` type
   - Leverage type inference when possible

2. **Component Patterns**
   - Use functional components
   - Implement proper error boundaries
   - Follow React hooks best practices

3. **State Management**
   - Use React Query for server state
   - Implement proper loading states
   - Handle errors gracefully

### Testing

1. **Unit Tests**
   - Write tests for business logic
   - Test edge cases
   - Maintain high coverage

2. **Integration Tests**
   - Test API endpoints
   - Verify component integration
   - Use proper mocking

## 🔐 Security Guidelines

1. **API Security**
   - Implement proper authentication
   - Validate all inputs
   - Use rate limiting

2. **Data Handling**
   - Never expose sensitive data
   - Implement proper validation
   - Follow GDPR guidelines

## 📦 Dependencies

1. **Core Dependencies**
   - Next.js 13+
   - React 18+
   - TypeScript
   - Tailwind CSS
   - shadcn/ui

2. **Development Tools**
   - pnpm (package manager)
   - Biome (linting/formatting)
   - Husky (git hooks)

## 🏃‍♂️ Getting Started

1. **Setup Environment**
   ```bash
   pnpm install
   ```

2. **Start Development Server**
   ```bash
   pnpm dev
   ```

3. **Build for Production**
   ```bash
   pnpm build
   ```

## 🤝 Contributing

1. **Branch Naming**
   - feature/feature-name
   - fix/bug-name
   - chore/task-name

2. **Commit Messages**
   - Follow conventional commits
   - Use descriptive messages

3. **Pull Requests**
   - Create detailed descriptions
   - Reference related issues
   - Add proper labels

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Better-Auth](https://www.better-auth.com/docs)

## 🐛 Common Issues

1. **Development Server**
   - Clear `.next` cache if needed
   - Verify environment variables
   - Check port availability

2. **Build Issues**
   - Verify TypeScript types
   - Check for circular dependencies
   - Validate import paths

## 🎯 Performance Guidelines

1. **Component Optimization**
   - Use proper memoization
   - Implement code splitting
   - Optimize images and assets

2. **API Performance**
   - Implement proper caching
   - Use connection pooling
   - Optimize database queries

Remember to keep this guide updated as the project evolves. Happy coding! 🚀
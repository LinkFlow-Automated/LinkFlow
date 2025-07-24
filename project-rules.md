# Next.js Project Rules & Conventions

## File and Folder Naming

### Primary Rule: Use kebab-case

- ✅ `user-profile.tsx`
- ✅ `api/user-settings.ts`
- ✅ `components/navigation-bar.tsx`
- ❌ `UserProfile.tsx`
- ❌ `userProfile.tsx`

### Exception: Component Files

Component files can use PascalCase if preferred, but **be consistent**:

- ✅ `UserProfile.tsx` (acceptable alternative)
- ✅ `Button.tsx`

## Project Structure (Root Level)

```
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/            # Route groups
│   │   ├── login/
│   │   └── register/
│   ├── api/               # API routes
│   │   ├── users/
│   │   └── auth/
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── modal.tsx
│   ├── forms/            # Form components
│   └── layouts/          # Layout components
├── lib/                  # Utility functions
│   ├── utils.ts
│   ├── validations.ts
│   └── api-client.ts
├── hooks/                # Custom React hooks
│   ├── use-auth.ts
│   └── use-local-storage.ts
├── types/                # TypeScript type definitions
│   ├── user.ts
│   ├── api.ts
│   └── index.ts
├── constants/            # App constants
│   ├── routes.ts
│   └── config.ts
├── styles/               # Additional stylesheets
├── public/               # Static assets
│   ├── images/
│   └── icons/
├── prisma/               # Database schema (if using Prisma)
└── config/               # Configuration files
```

## Component Conventions

### Page Components (Default Export)

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
    </div>
  );
}
```

### Layout Components (Default Export)

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Reusable Components (Named Export)

```tsx
// components/ui/button.tsx
interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} disabled={disabled}>
      {children}
    </button>
  );
}
```

## API Route Conventions

### Use HTTP Method Names

```tsx
// app/api/users/route.ts
export async function GET(request: Request) {
  // Handle GET request
}

export async function POST(request: Request) {
  // Handle POST request
}

export async function PUT(request: Request) {
  // Handle PUT request
}

export async function DELETE(request: Request) {
  // Handle DELETE request
}
```

### Dynamic Routes

```tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  // Handle GET request for specific user
}
```

## TypeScript Best Practices

### Define Types in Separate Files

```tsx
// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}
```

### Use Descriptive Interface Names

```tsx
// types/api.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
```

### Component Props Types

```tsx
// components/ui/card.tsx
interface CardProps {
  title: string;
  description?: string;
  variant?: "default" | "outlined" | "elevated";
  children?: React.ReactNode;
  className?: string;
}

export function Card({
  title,
  description,
  variant = "default",
  children,
  className,
}: CardProps) {
  return (
    <div className={`card card-${variant} ${className}`}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
```

## Environment Variables

### Naming Convention

```env
# Public variables (accessible in browser)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=MyApp

# Private variables (server-side only)
DATABASE_URL=postgresql://username:password@localhost:5432/mydb
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_...
```

### Usage

```tsx
// lib/config.ts
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
};
```

## Import/Export Rules

### Absolute Imports Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["components/*"],
      "@/lib/*": ["lib/*"],
      "@/types/*": ["types/*"],
      "@/hooks/*": ["hooks/*"],
      "@/constants/*": ["constants/*"]
    }
  }
}
```

### Import Order

```tsx
// 1. React and Next.js imports
import React from "react";
import { NextRequest, NextResponse } from "next/server";

// 2. Third-party libraries
import { z } from "zod";
import { prisma } from "@prisma/client";

// 3. Internal imports (absolute paths)
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { User } from "@/types/user";

// 4. Relative imports
import "./styles.css";
```

## Additional Rules

### 1. Component Size Limit

- Keep components under **200 lines**
- One component per file
- Extract logic into custom hooks when needed

### 2. File Organization

```tsx
// Good: Organized imports and exports
// components/ui/index.ts
export { Button } from "./button";
export { Input } from "./input";
export { Modal } from "./modal";
```

### 3. Error Handling

```tsx
// app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### 4. Loading States

```tsx
// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

### 5. Metadata API

```tsx
// app/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Welcome to our application",
};

export default function HomePage() {
  return <div>Home</div>;
}
```

### 6. Custom Hooks

```tsx
// hooks/use-auth.ts
import { useState, useEffect } from "react";
import { User } from "@/types/user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth logic here
  }, []);

  return { user, loading, login, logout };
}
```

## Git Commit Convention

### Use Conventional Commits

```bash
# Format: type(scope): description
feat(auth): add login functionality
fix(api): resolve user creation bug
docs(readme): update installation guide
style(components): fix button padding
refactor(utils): optimize date formatting
test(auth): add unit tests for login
```

## Performance Rules

### 1. Use Next.js Image Component

```tsx
import Image from "next/image";

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={50}
      height={50}
      className="rounded-full"
    />
  );
}
```

### 2. Dynamic Imports for Code Splitting

```tsx
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("@/components/heavy-component"), {
  loading: () => <p>Loading...</p>,
});
```

### 3. Use React.memo for Expensive Components

```tsx
import { memo } from "react";

interface ExpensiveComponentProps {
  data: any[];
}

export const ExpensiveComponent = memo(function ExpensiveComponent({
  data,
}: ExpensiveComponentProps) {
  // Expensive rendering logic
  return <div>{/* content */}</div>;
});
```

---

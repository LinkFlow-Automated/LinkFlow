# Card Customization Guide: Adding New Animations and Layouts

This document outlines the process for adding new card animations and layouts within the Linkflow project. By following these guidelines, you can extend the visual and structural options available for user profiles.

## 1. Adding New Animations

Card animations are defined in <mcfile name="card-animation.ts" path="lib/utils/card-animation.ts"></mcfile>. Each animation is a set of keyframes or transitions that dictate how a card appears or interacts.

### Structure of an Animation

An animation typically consists of a unique identifier (string) and a corresponding animation object (e.g., a `motion` variant object if using Framer Motion).

```typescript
// Example from card-animation.ts
export const FADE_IN_ANIMATION_VARIANTS = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2, ease: "easeOut" },
};

export const ANIMATION_TYPES = {
  none: "None",
  fadeIn: "Fade In",
  slideIn: "Slide In",
  // Add your new animation here
};
```

### Steps to Add a New Animation

1.  **Define Your Animation Variants**:
    *   Open <mcfile name="card-animation.ts" path="lib/utils/card-animation.ts"></mcfile>.
    *   Create a new constant for your animation variants. Follow the existing pattern (e.g., `YOUR_ANIMATION_VARIANTS`).
    *   Define `initial`, `animate`, `exit`, and `transition` properties as needed for your animation.

    ```typescript
    // c:\Users\anshl\OneDrive\Desktop\Coding\linkflow\lib\utils\card-animation.ts
    export const YOUR_NEW_ANIMATION_VARIANTS = {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
      transition: { type: "spring", stiffness: 200, damping: 20 },
    };
    ```

2.  **Add to `ANIMATION_MAP`**:
    *   In the same file, add your new animation variants to the `ANIMATION_MAP` object, using a unique key.

    ```typescript
    // c:\Users\anshl\OneDrive\Desktop\Coding\linkflow\lib\utils\card-animation.ts
    export const ANIMATION_MAP = {
      none: {},
      fadeIn: FADE_IN_ANIMATION_VARIANTS,
      slideIn: SLIDE_IN_ANIMATION_VARIANTS,
      yourNewAnimation: YOUR_NEW_ANIMATION_VARIANTS, // Add this line
    };
    ```

3.  **Update `ANIMATION_TYPES` (Optional but Recommended)**:
    *   If you want your animation to be selectable in the UI, add a user-friendly name to the `ANIMATION_TYPES` object.

    ```typescript
    // c:\Users\anshl\OneDrive\Desktop\Coding\linkflow\lib\utils\card-animation.ts
    export const ANIMATION_TYPES = {
      none: "None",
      fadeIn: "Fade In",
      slideIn: "Slide In",
      yourNewAnimation: "Your New Animation Name", // Add this line
    };
    ```

## 2. Adding New Layouts

Card layouts define the structural arrangement of elements within a user's profile card. Layouts are defined in <mcfile name="card-layout.ts" path="lib/utils/card-layout.ts"></mcfile>.

### Structure of a Layout

A layout typically consists of a unique identifier (string) and a corresponding React component or a configuration object that describes the layout.

```typescript
// Example from card-layout.ts
export const DEFAULT_LAYOUT = {
  id: "default",
  name: "Default",
  component: DefaultLayout, // A React component
};

export const LAYOUT_TYPES = {
  default: "Default",
  // Add your new layout here
};
```

### Steps to Add a New Layout

1.  **Create Your Layout Component/Configuration**:
    *   Open <mcfile name="card-layout.ts" path="lib/utils/card-layout.ts"></mcfile>.
    *   Create a new React component for your layout, or define a configuration object if your layout system supports it. This component will receive props necessary to render the card's content.

    ```typescript
    // c:\Users\anshl\OneDrive\Desktop\Coding\linkflow\lib\utils\card-layout.ts
    import React from "react";

    const YourNewLayout: React.FC<LayoutProps> = ({ children }) => {
      return (
        <div className="your-new-layout-styles">
          {children}
        </div>
      );
    };
    ```

2.  **Add to `LAYOUT_MAP`**:
    *   In the same file, add your new layout component or configuration to the `LAYOUT_MAP` object, using a unique key.

    ```typescript
    // c:\Users\anshl\OneDrive\Desktop\Coding\linkflow\lib\utils\card-layout.ts
    export const LAYOUT_MAP = {
      default: DEFAULT_LAYOUT,
      yourNewLayout: {
        id: "yourNewLayout",
        name: "Your New Layout Name",
        component: YourNewLayout,
      }, // Add this line
    };
    ```

3.  **Update `LAYOUT_TYPES` (Optional but Recommended)**:
    *   If you want your layout to be selectable in the UI, add a user-friendly name to the `LAYOUT_TYPES` object.

    ```typescript
    // c:\Users\anshl\OneDrive\Desktop\Coding\linkflow\lib\utils\card-layout.ts
    export const LAYOUT_TYPES = {
      default: "Default",
      yourNewLayout: "Your New Layout Name", // Add this line
    };
    ```

## 3. Integration and Usage

Once you've added new animations or layouts, they can be selected and applied to user profile cards through the application's customization interface. The system typically uses the `ANIMATION_MAP` and `LAYOUT_MAP` to dynamically render the chosen animation and layout.

## 4. Best Practices and Tips

*   **Unique Identifiers**: Always use unique string identifiers for your animations and layouts to prevent conflicts.
*   **Performance**: Be mindful of animation performance. Complex animations can impact user experience. Optimize transitions and avoid excessive re-renders.
*   **Responsiveness**: Ensure your layouts are responsive and look good on various screen sizes.
*   **Accessibility**: Consider accessibility when designing animations and layouts. Provide alternatives or options for users who may be sensitive to motion.
*   **Testing**: Thoroughly test your new animations and layouts to ensure they function as expected and integrate seamlessly with existing features.

## 5. Debugging

If your new animation or layout isn't appearing or behaving as expected:

*   **Check Console for Errors**: Look for any JavaScript errors in your browser's developer console.
*   **Verify Imports/Exports**: Ensure your new animation/layout is correctly imported and exported in <mcfile name="card-animation.ts" path="lib/utils/card-animation.ts"></mcfile> or <mcfile name="card-layout.ts" path="lib/utils/card-layout.ts"></mcfile>.
*   **Inspect Component Tree**: Use React Developer Tools to inspect the component tree and verify that your layout component is being rendered and receiving the correct props.
*   **Review `ANIMATION_MAP`/`LAYOUT_MAP`**: Double-check that your new animation/layout is correctly added to the respective map.
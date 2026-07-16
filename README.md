# next-simple-login

A lightweight Next.js login experience styled with the Next UI component library and a soft, distraction-free background.

## What’s inside

- A centered login card built entirely with Next UI primitives (`Card`, `Input`, `Button`, `Checkbox`, `Text`).
- Client-side validation for email format, required fields, and simulated credential checks with clear inline feedback.
- A fixed `NextUIProvider` theme plus global styles for the gradient backdrop and responsive spacing.
- A sample credential hint (`demo@nextui.dev / nextui-rocks`) so you can try the form without needing a backend.

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` to see the login form.

## Next steps

You can plug in a real authentication provider, wire the form to an API route, or extend the UI with password recovery and SSO buttons.

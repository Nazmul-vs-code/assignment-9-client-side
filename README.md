💡 IdeaVault
🌐 Live Website URL: https://ideavault-six.vercel.app/

Welcome to IdeaVault, a modern web application designed for innovators, builders, and entrepreneurs to securely store, organize, and track their startup ideas and tech innovations. 🚀

✨ Key Features
🔒 Secure Authentication Ecosystem: Built-in secure user profile tracking utilizing asynchronous JWKS validation headers, protecting sensitive user ideas and preventing cross-origin token leaks.

🗃️ The Idea Vault Dashboard: A dedicated space for authenticated users to review, track, and manage their personal innovative concepts seamlessly.

🔍 Dynamic Search & Filtering: Instant, reactive client-side catalog navigation allowing users to filter startup ideas by text matching or designated industry categories (AI, Tech, Health, E-commerce, etc.).

🛠️ Full CRUD Interactive Sandbox: Complete data freedom enabling creators to seamlessly submit new ideas, update technical text targets via dynamic modals, or remove stale records safely.

🌐 Decoupled Microservice Architecture: Powered by a dual-stack configuration combining a performant, case-insensitive Next.js frontend with an isolated Express backend cluster connected to MongoDB Atlas.

⚙️ Tech Stack & Architecture
💻 Frontend
Framework: Next.js (App Router, Client Components)

Styles: Tailwind CSS & DaisyUI 🌼

Auth Client: Better-Auth (with remote token serialization handlers)

🖥️ Backend (API Server)
Runtime: Node.js with Express 🚀

Database: MongoDB Atlas 🍃 (via native driver layers)

Security Integration: jose-cjs cryptographic middleware for stateless remote JSON Web Token (JWT) validation signatures.
# ORAANIS — Modern Editorial Blogging Platform

> **Ideas worth sitting with.**  
> An independent digital publication featuring long-form essays, quiet reflection, ethics, human behaviour, technology, and life observations.

---

## 🌟 Editorial Philosophy & Aesthetics

ORAANIS is designed like a high-end digital magazine and personal essay journal. It prioritizes **content and typography over decoration**, encouraging readers to slow down, read, and return.

### Core Spheres (Categories)
1. **Ethics** (Accent: Muted Burgundy `#8B263E`) — Morality, digital privacy, responsibility, and human choice.
2. **Human Behaviour** (Accent: Indigo Slate `#2B59C3`) — Psychology, intimacy, emotional detachment, and habit formation.
3. **Life Reflection** (Accent: Warm Earthy Gold `#A67C46`) — Personal growth, quiet seasons, time, purpose, and wisdom.
4. **Technology** (Accent: Muted Teal `#2E8B80`) — AI, digital culture, cybersecurity, and human-machine co-existence.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, React Router v6, Axios, Lucide Icons, Custom CSS Editorial Design System (Dark/Light mode tokens, Google Fonts: Playfair Display + Plus Jakarta Sans + JetBrains Mono).
- **Backend**: Node.js, Express.js, REST API architecture, JWT Authentication, bcryptjs password hashing, `express-validator`.
- **Database**: MySQL, `mysql2/promise` pooled parameterized queries, automatic table DDL creation, and auto-seeding service.

---

## 🚀 Quick Setup & Installation

### 1. Requirements
- Node.js (v18+)
- MySQL Server (e.g., MySQL 8.0 or WAMP / XAMPP on port 3306)

### 2. Backend Setup
```bash
cd server
npm install
npm run start
```
*Note: The backend automatically connects to local MySQL (`root` with empty password by default), creates `oraanis_db` if missing, initializes all tables, and seeds 20 high-quality essays across all categories along with editorial authors and an admin user.*

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Access the application at `http://localhost:5173`.

---

## 🔑 Admin Credentials

- **URL**: `http://localhost:5173/login`
- **Email**: `admin@oraanis.com`
- **Password**: `adminpassword123`

### Admin Features
- Manage Essays (Create, Edit, Delete, Save Draft, Publish, Featured toggle)
- Manage Categories & Accent Colors
- Manage Authors & Bios
- Moderate Reader Comments (Approve, Reject, Delete)
- Export Newsletter Subscribers to CSV
- Read & Delete Contact Messages

---

## 📡 REST API Architecture

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - Admin/User login (returns JWT token)
- `GET /api/auth/me` - Get current authenticated user

### Essays
- `GET /api/essays` - List essays (supports `category`, `author`, `status`, `featured`, `q`, `sort`, `page`, `limit`)
- `GET /api/essays/:slug` - Get single essay by slug (increments view count, returns related & prev/next)
- `POST /api/essays` - Create essay (Admin protected)
- `PUT /api/essays/:id` - Update essay (Admin protected)
- `DELETE /api/essays/:id` - Delete essay (Admin protected)

### Categories & Authors
- `GET /api/categories` - List all categories with essay counts
- `GET /api/categories/:slug` - Category details
- `GET /api/authors` - List editorial authors
- `GET /api/authors/:slug` - Author profile with published essays

### Reader Interaction
- `GET /api/comments/essay/:essayId` - Get approved comments
- `POST /api/comments/essay/:essayId` - Post new comment
- `POST /api/newsletter/subscribe` - Subscribe to Sunday Reflections newsletter
- `POST /api/contact` - Submit message to editorial board

### Admin Endpoints
- `GET /api/admin/stats` - Metric counts (essays, views, subscribers, unread messages)
- `GET /api/admin/comments` - All comments for moderation
- `GET /api/newsletter/admin/subscribers` - Newsletter subscriber list
- `GET /api/contact/admin/messages` - Contact inbox messages

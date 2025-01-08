# Blog Platform Development Plan

## Goal

Create a full-stack blog platform in **14 days**. Users can create profiles, share blogs (image, title, and description), interact with others (like, comment, share), and read blogs seamlessly.

---

## Tech Stack

- **Next.js** - Frontend & Backend
- **MongoDB** - Database
- **Prisma** - ORM
- **Zod** - Validation
- **Cloudinary** - Image Storage

---

## Functionalities

### Authentication

- **Login/SignUp**
  - Secure authentication using `JWT`.
  - Password hashing using `bcrypt`.
  - Email and password-based sign-up/login.

---

### User Profile

- **Profile Details**

  - Users can create and update their profile with:
    - Profile Picture
    - Name
    - Bio
    - Social Links
  - Ability to view other users' profiles.

- **Followers/Following System**
  - Follow and unfollow users.
  - Display followers and following counts on user profiles.

---

### Home Page

- **Blog Feed**
  - A centralized home page displaying all blogs in reverse chronological order.
  - Includes features for filtering or searching blogs by category or keywords.

---

### Blog Management

- **Upload Content**

  - Users can create and upload blogs with:
    - **Title**
    - **Description**
    - **Image** (uploaded to Cloudinary).
  - Input validation using Zod for secure and correct data.

- **Edit/Delete Blogs**
  - Authenticated users can edit or delete their own blogs.

---

### Interactions

- **Like, Comment, and Share**
  - Users can:
    - Like blogs.
    - Comment on blogs.
    - Share blogs via social links.

---

### Deployment

- Depoly on vercel

---

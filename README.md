# 🎓 EduManage — Education Management Platform

**Live Site:** [(https://edumanagesystem-4e3fe.web.app/))

---

## 👤 Admin Credentials

* **Email:** [admin@edumanage.com](mailto:admin@edumanage.com)
* **Password:** Admin\@123

> 🚑 These credentials are only for demo/admin testing purposes. Please do not misuse.

---

## ✨ Key Features

✅ **1. Multi-role Authentication**
Supports Student, Teacher, and Admin roles using Firebase Auth + JWT token handling.

✅ **2. Dashboard for All Roles**
Custom dashboard UI and functionality for each user role (Student / Teacher / Admin).

✅ **3. Secure Backend with JWT**
All APIs are secured using access tokens. Axios interceptors and role-based route protections implemented.

✅ **4. Teacher Request System**
Users can request to become instructors. Admins can review, approve, or reject these requests.

✅ **5. Class Management**
Teachers can create classes. Admins review and approve them before students can see and enroll.

✅ **6. Stripe Payment Integration**
Students can enroll in classes through secure Stripe payments.

✅ **7. Assignment Management**
Teachers can create assignments for their classes. Students can view and submit them.

✅ **8. Feedback & Evaluation System**
Students can rate and give feedback to teachers. Feedback appears on the homepage carousel.

✅ **9. Mobile-Responsive & User-Friendly UI**
Fully responsive layout built with Tailwind CSS and React for smooth user experience on all devices.

✅ **10. Realtime Class Progress Reports**
Teachers can see real-time data such as enrollment count, assignment submissions, and average feedback.

---

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS, React Router, TanStack Query
* **Backend:** Node.js, Express, MongoDB (Native Driver)
* **Auth:** Firebase Auth, JWT
* **Payment:** Stripe
* **Deployment:** Vercel (backend), Firebase Hosting (frontend)

---

## 📁 Project Structure

```
/client      → React frontend (EduManage)
/server      → Node.js backend (API & DB)
```

---

## 🧪 Local Development Setup

1. Clone the repo
2. Run backend: `npm install && npm run dev` in `/server`
3. Run frontend: `npm install && npm run dev` in `/client`
4. Set up `.env` files as needed

---

## 📄 License

MIT — Free for personal & educational use

---

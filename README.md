# 📚 Book Tracker

A full-stack CRUD application to manage a collection of books. Users can **add, view, edit, and delete books** with an intuitive UI and smooth user experience.

## ✨ Features

- ✅ **Create** a new book with title, author, and genre.
- 📖 **Read** and view all books in a clean list.
- ✏️ **Update** existing book details.
- 🗑️ **Delete** books when no longer needed.
- 🛠️ **Built with modern tech**: Next.js, Prisma, PostgreSQL, TailwindCSS, and ShadCN.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: Node.js (via Next.js API routes)
- **Database ORM**: Prisma
- **Database**: PostgreSQL (or any relational DB)
- **Styling**: TailwindCSS + ShadCN UI
- **Form Validation**: React Hook Form + Zod
- **Notifications**: React Hot Toast

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Sanjoy-droid/Book-Tracker
cd Book-Tracker
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add:

```sh
DATABASE_URL="your_postgresql_database_url"
```

### 4️⃣ Run Migrations & Generate Prisma Client

```sh
npx prisma migrate dev --name init
```

### 5️⃣ Start the Development Server

```sh
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 🌍 Deployment

The app is deployed on **Vercel**. Check out the live demo: [Live App URL](https://book-tracker-co76.vercel.app/)

## 📝 License

This project is open-source and available under the MIT License.

---

Made with ❤️ by [Sanjoy](https://github.com/Sanjoy-droid) 🚀

```

Let me know if you need changes! 🚀

```

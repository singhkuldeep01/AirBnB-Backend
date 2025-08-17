## Setting up Prisma

Follow these steps to set up Prisma in this project:

### 1. Install Prisma CLI and Client

Run the following command in your project root:

```bash
npm install prisma --save-dev
npm install @prisma/client
```

### 2. Initialize Prisma

This will create a `prisma` folder with a `schema.prisma` file:

```bash
npx prisma init
```

> You can run this command from the project root or inside the `src` directory.

### 3. Configure Your Database

Edit the `prisma/schema.prisma` file to define your data models and set your database connection string in `.env`.

### 4. Generate Prisma Client

After updating your schema, generate the client:

```bash
npx prisma generate
```

### 5. Run Migrations (Optional)

To create migration files and apply them to your database:

```bash
npx prisma migrate dev --name init
```

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Installation Instructions

Follow these steps to set up and run this project on your computer:

### Prerequisites

- **Node.js** (version 18 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

### Installation Steps

1. **Clone or download this repository**
   ```bash
   # If using git
   git clone <repository-url>
   cd boilerexams-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the BoilerExams application

### Building for Production

To create a production build:

```bash
npm run build
npm start
```

This will create an optimized production build and start the server on port 3000.

### Troubleshooting

- If you encounter port conflicts, Next.js will automatically try the next available port (3001, 3002, etc.)
- Make sure you have Node.js version 18 or higher installed
- If dependencies fail to install, try deleting `node_modules` and `package-lock.json`, then run `npm install` again

## AI Usage

This project was developed with assistance from AI tools. I used **Microsoft Copilot** and **Claude** for troubleshooting and development support, particularly when:

- **Setting up Tailwind CSS**: I encountered issues getting Tailwind CSS to work properly with Next.js. The problem was resolved by downgrading Tailwind CSS to a compatible version, as the latest version was not compatible with PostCSS. AI assistance helped identify this version compatibility issue and find the appropriate solution.
- **Debugging**: When facing errors or unexpected behavior, AI assistance helped identify and resolve issues
- **Styling challenges**: When having trouble with CSS styles, layout issues, or implementing the design, AI tools provided guidance on best practices and solutions

The AI tools were used as a development aid to overcome technical hurdles and learn best practices, but all code decisions and final implementation were made by me.

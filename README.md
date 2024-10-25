Name: abdulla shammout
Phone Number: 0776735936

Prerequisites
Node.js (v20 or higher)
MySQL
npm (Node Package Manager)
Prisma
Git

--Backend Setup:
1- navigate to backend folder by running "cd backend" in the terminal.
2- run "npm install" to download node_modules.
3- Create a .env file in the backend folder and add the following variables that match your credentials and db name
: DATABASE_URL="mysql://<username>:<password>@localhost:3306/<database_name>".
4- Run migrations with Prisma by running "npx prisma migrate dev --name init" to create table in the db based on  
 the prisma schema.  
5- run "node index.js" to start the server.

--Frontend Setup:
1- navigate to frontend folder by running "cd frontend" in the terminal.
2- navigate to online-store folder by running "cd online-store" in the terminal.
3- run "npm install" to download node_modules and .next.
4- run "npm run dev" to start the development server.

--folder structure:

task/
├── frontend/
│ └── online-store/
│ ├── app/ # Main application folder
│ │ ├── components/ # UI components
│ │ ├── services/ # functions for API calls related to products (CRUD).
│ │ ├── globals.css # CSS and styling
│ │ └── page.js # main entry file for frontend
│ └── package.json # Frontend dependencies
├── backend/
│ ├── routes/ # API routes for product management
│ ├── prisma/ # Prisma setup
│ ├── index.js # Main entry file for backend
│ ├── .env # Environment variables
│ ├── package.json # Backend dependencies
└── README.md

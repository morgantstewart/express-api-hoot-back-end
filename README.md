# Express API with JWT Authentication

A RESTful API built with Express.js, featuring JWT authentication, MongoDB integration, and CRUD operations for hoots and comments.

## Features

- 🔐 JWT Authentication
- 👥 User Management (signup/signin)
- 🐦 Hoots CRUD Operations
- 💬 Comments System
- 🛡️ Authorization & Permissions
- 🗄️ MongoDB Database
- 🚀 Ready for Heroku Deployment

## API Endpoints

### Authentication
- `POST /auth/sign-up` - User registration
- `POST /auth/sign-in` - User login

### Users
- `GET /users` - Get all users (requires auth)
- `GET /users/:userId` - Get specific user (requires auth)

### Hoots
- `POST /hoots` - Create new hoot (requires auth)
- `GET /hoots` - Get all hoots (requires auth)
- `GET /hoots/:hootId` - Get specific hoot (requires auth)
- `PUT /hoots/:hootId` - Update hoot (requires auth + ownership)
- `DELETE /hoots/:hootId` - Delete hoot (requires auth + ownership)

### Comments
- `POST /hoots/:hootId/comments` - Add comment to hoot (requires auth)

### Testing
- `GET /test-jwt/sign-token` - Get test JWT token
- `POST /test-jwt/verify-token` - Verify JWT token

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- npm or yarn

### Setup
1. Clone the repository
```bash
git clone <your-repo-url>
cd express-api-hoot-back-end
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true
JWT_SECRET=your_secure_jwt_secret_here
```

4. Start development server
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Heroku Deployment

### Prerequisites
- Heroku account
- Heroku CLI installed

### Deployment Steps

1. **Install Heroku CLI** (if not already installed)
```bash
# macOS
brew install heroku/brew/heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku app**
```bash
heroku create your-app-name
```

4. **Add MongoDB addon**
```bash
heroku addons:create mongolab:sandbox
```

5. **Set environment variables**
```bash
heroku config:set JWT_SECRET=your_secure_jwt_secret_here
```

6. **Deploy to Heroku**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

7. **Open your app**
```bash
heroku open
```

### Environment Variables on Heroku

Set these in your Heroku dashboard or via CLI:
- `MONGODB_URI` - Automatically set by MongoDB addon
- `JWT_SECRET` - Your JWT secret key
- `PORT` - Automatically set by Heroku

## Testing the API

### Using curl

1. **Create a user**
```bash
curl -X POST http://localhost:3000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'
```

2. **Sign in**
```bash
curl -X POST http://localhost:3000/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'
```

3. **Create a hoot** (use token from sign-in)
```bash
curl -X POST http://localhost:3000/hoots \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Hoot","text":"Hoot content","category":"News"}'
```

### Using Postman

1. Set the request method to `POST`
2. Set the URL to your endpoint
3. Add headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer YOUR_TOKEN_HERE` (for protected routes)
4. Add request body in JSON format

## Project Structure

```
├── controllers/
│   ├── auth.js          # Authentication routes
│   ├── users.js         # User management routes
│   ├── hoots.js         # Hoots CRUD routes
│   └── test-jwt.js      # JWT testing routes
├── middleware/
│   └── verify-token.js  # JWT verification middleware
├── models/
│   ├── user.js          # User model
│   └── hoot.js          # Hoot model with comments
├── server.js            # Main application file
├── package.json         # Dependencies and scripts
├── Procfile            # Heroku deployment configuration
└── README.md           # This file
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **CORS**: Cross-Origin Resource Sharing
- **Logging**: Morgan
- **Environment**: dotenv
- **Deployment**: Heroku

## License

ISC

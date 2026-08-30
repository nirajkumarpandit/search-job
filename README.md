# Job Portal

A full-stack MERN job portal that connects job seekers with recruiters through a modern web application. The project provides authentication, profile management, company management, job posting, job discovery, and job application workflows.

> **Project status:** Functional full-stack project with the core student/job-seeker and recruiter workflows implemented. Some features shown in the UI are still static or partially implemented and are listed in the roadmap/limitations section.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [Authentication & Security](#authentication--security)
- [API Documentation](#api-documentation)
- [Frontend Routes](#frontend-routes)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Application Flow](#application-flow)
- [State Management](#state-management)
- [File Uploads](#file-uploads)
- [Error Handling](#error-handling)
- [Current Limitations](#current-limitations)
- [Recommended Improvements](#recommended-improvements)
- [Future Roadmap](#future-roadmap)
- [Author](#author)

---

## Overview

**Job Portal** is a MERN-stack recruitment platform designed to provide separate workflows for:

- **Job Seekers / Students** — create an account, manage a profile, upload a resume, browse jobs, view job details, and apply for jobs.
- **Recruiters** — create and manage company profiles, post jobs, view their jobs, and review applicants.

The frontend is built with React and Vite, while the backend exposes REST-style APIs using Express and MongoDB/Mongoose.

The application uses:

- JWT-based authentication
- HTTP-only cookies for authentication tokens
- bcrypt password hashing
- MongoDB for persistent data
- Cloudinary for image/resume uploads
- Redux Toolkit for client-side state management
- Redux Persist for persisting authentication state
- Tailwind CSS and reusable UI components for the interface
- Vercel configuration for deployment

---

## Key Features

### Authentication

- User registration
- Login and logout
- Role-based account selection:
  - Student
  - Recruiter
- Password hashing using `bcryptjs`
- JWT authentication
- Authentication token stored in an HTTP-only cookie
- Protected backend routes using authentication middleware

### Student / Job Seeker

- Create a profile
- Upload profile photo
- Update username, email, phone number, bio, and skills
- Upload a resume
- Browse available jobs
- Search jobs using a keyword
- View detailed job information
- Apply for a job
- Prevent duplicate applications
- View application information/status UI

### Recruiter

- Create a company
- View companies created by the recruiter
- View company details
- Update company information
- Upload company logo
- Create job postings
- View recruiter-created jobs
- Filter recruiter jobs by text
- View applicants for a job
- Update application status

### Job Management

Each job can contain:

- Job title
- Description
- Salary
- Number of positions
- Required experience
- Requirements
- Location
- Job type
- Company
- Recruiter/creator
- Applications
- Creation/update timestamps

### UI / UX

- Responsive React interface
- Reusable UI components
- Tailwind CSS styling
- Lucide icons
- Toast notifications using Sonner
- Loading states
- React Router based navigation

---

## User Roles

| Role | Responsibilities |
|---|---|
| **Student** | Manage profile, upload resume, search jobs, view job details, apply for jobs |
| **Recruiter** | Manage companies, create jobs, manage recruiter jobs, view applicants, update application status |

> **Note:** The current backend model uses `student` and `recruiter` roles. Although some controller comments use the word "admin", there is currently no separate `admin` role/model implemented.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | Frontend UI |
| Vite | Development/build tooling |
| React Router DOM | Client-side routing |
| Redux Toolkit | Global state management |
| React Redux | Redux integration with React |
| Redux Persist | Persisting authentication state |
| Axios | HTTP requests |
| Tailwind CSS | Styling |
| shadcn/ui-style components | Reusable UI components |
| Radix UI | Accessible UI primitives |
| Lucide React | Icons |
| Sonner | Toast notifications |
| Embla Carousel | Carousel functionality |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Cookie Parser | Reading authentication cookies |
| CORS | Cross-origin communication |
| Multer | Multipart/file upload handling |
| Data URI | Converting uploaded files to data URIs |
| Cloudinary | Cloud file/image storage |
| dotenv | Environment variable management |

### Deployment

- Vercel configuration is included for both frontend and backend.
- Backend API is configured for serverless deployment.
- Frontend uses a Vercel rewrite for SPA routing.

---

## Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │  React + Vite       │
                    └──────────┬──────────┘
                               │
                         Axios Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Express API      │
                    │   Node.js Backend   │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
        Authentication       MongoDB         Cloudinary
        JWT + Cookies       + Mongoose       File Storage
             │
             ▼
      Protected Routes
```

---

## Project Structure

```text
Job_portal-main/
│
├── backend/
│   ├── controllers/
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   ├── isAuthenticate.js
│   │   └── multer.js
│   │
│   ├── models/
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── application.js
│   │   ├── company.js
│   │   ├── job.js
│   │   └── user.js
│   │
│   ├── utils/
│   │   ├── cludnary.js
│   │   ├── datauri.js
│   │   ├── db.js
│   │   └── wrapAsync.js
│   │
│   ├── app.js
│   ├── package.json
│   └── vercel.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── pages/
│   │   │   ├── recruiter/
│   │   │   ├── shared/
│   │   │   └── ui/
│   │   │
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── .gitignore
└── README.md
```

---

## Data Models

### User

The `User` model represents both students and recruiters.

```text
User
├── username
├── email
├── phoneNumber
├── password
├── role
│   ├── student
│   └── recruiter
└── profile
    ├── bio
    ├── skills[]
    ├── resume
    ├── resumeOriginalName
    ├── company
    └── profilePhoto
```

### Company

```text
Company
├── companyName
├── location
├── logo
├── description
├── website
└── userId → User
```

### Job

```text
Job
├── title
├── description
├── salary
├── position
├── experience
├── requirement
├── location
├── jobType
├── createdBy → User
├── company → Company
├── applications[] → Application
└── timestamps
```

### Application

```text
Application
├── job → Job
├── applicant → User
├── status
│   ├── pending
│   ├── accepted
│   └── rejected
└── timestamps
```

### Relationships

```text
User (Recruiter)
      │
      ├──────────────► Company
      │                    │
      │                    └──────────────► Job
      │                                      │
      │                                      └────► Application
      │                                                     │
      └─────────────────────────────────────────────────────┘
                            User (Student)
```

---

## Authentication & Security

The application uses JWT authentication with an HTTP-only cookie.

### Login Flow

```text
User Login
    │
    ▼
Validate email/password/role
    │
    ▼
Find user in MongoDB
    │
    ▼
Compare password using bcrypt
    │
    ▼
Generate JWT
    │
    ▼
Store JWT in HTTP-only cookie
    │
    ▼
Authenticated requests
```

The authentication middleware:

1. Reads the `token` cookie.
2. Rejects requests without a token.
3. Verifies the JWT using `SECRET_KEY`.
4. Extracts the user's ID.
5. Stores it in `req.id`.
6. Allows the request to continue.

### Security mechanisms currently used

- Password hashing with bcrypt
- JWT authentication
- HTTP-only authentication cookie
- `sameSite: "none"` cookie configuration for cross-origin deployment
- `secure: true` cookie configuration
- CORS with credentials enabled

> For production, add stronger validation, authorization checks, rate limiting, security headers, and stricter ownership checks.

---

# API Documentation

Base URL:

```text
/api
```

## User APIs

### Register

```http
POST /api/user/register
```

Content type:

```text
multipart/form-data
```

Fields:

```text
username
email
password
phoneNumber
role
file
```

### Login

```http
POST /api/user/login
```

Example body:

```json
{
  "email": "user@example.com",
  "password": "your-password",
  "role": "student"
}
```

### Logout

```http
POST /api/user/logout
```

### Update Profile

```http
POST /api/user/update
```

Authentication required.

Content type:

```text
multipart/form-data
```

Supported fields include:

```text
username
email
phoneNumber
skills
bio
file
```

---

## Company APIs

### Register Company

```http
POST /api/company/register
```

Authentication required.

Example:

```json
{
  "companyName": "Example Technologies"
}
```

### Get Recruiter's Companies

```http
GET /api/company/get
```

Authentication required.

### Get Company By ID

```http
GET /api/company/get/:id
```

Authentication required.

### Update Company

```http
PUT /api/company/update/:id
```

Authentication required.

Content type:

```text
multipart/form-data
```

Fields:

```text
companyName
website
location
description
file
```

---

## Job APIs

### Create Job

```http
POST /api/job/postJob
```

Authentication required.

Example:

```json
{
  "title": "Frontend Developer",
  "description": "Build and maintain modern web applications.",
  "salary": 8,
  "position": 2,
  "experience": 1,
  "requirement": "React, JavaScript, CSS",
  "location": "Bangalore",
  "jobType": "Full Time",
  "company": "COMPANY_ID"
}
```

### Get All Jobs

```http
GET /api/job/get
```

Optional keyword:

```http
GET /api/job/get?keyword=react
```

### Get Job By ID

```http
GET /api/job/get/:id
```

Authentication required in the current implementation.

### Get Recruiter's Jobs

```http
GET /api/job/getAdminJobs
```

Authentication required.

### Delete Job

```http
GET /api/job/delete/:id
```

Authentication required.

> The current implementation uses `GET` for deletion. For a production REST API, this should be changed to `DELETE /api/job/:id`.

---

## Application APIs

### Apply For Job

```http
GET /api/application/apply/:id
```

Authentication required.

> The current implementation uses `GET` to create an application. For a production REST API, this should be changed to `POST`.

### Get Applied Jobs

```http
GET /api/application/getAppliedJob
```

Authentication required.

### Get Applicants

```http
GET /api/application/:id/applicant
```

Authentication required.

### Update Application Status

```http
PUT /api/application/status/:id/update
```

Authentication required.

Example:

```json
{
  "status": "accepted"
}
```

Allowed statuses:

```text
pending
accepted
rejected
```

---

# Frontend Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/login` | Login |
| `/signup` | Signup |
| `/jobs` | Job listing |
| `/jobDescription/:jobId` | Job details |
| `/browse` | Browse jobs |
| `/profile` | User profile |
| `/companies` | Recruiter companies |
| `/company/create` | Create company |
| `/company/:id` | Company setup |
| `/recruiterJob` | Recruiter jobs |
| `/job/create` | Create job |

---

## Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

SECRET_KEY=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### Important

Never commit the real `.env` file or production secrets to GitHub.

The frontend currently contains deployed API endpoint constants in:

```text
frontend/src/utils/constant.js
```

For a production-quality project, these URLs should be moved to Vite environment variables.

Example:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

---

# Installation & Setup

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd Job_portal-main
```

## 2. Install backend dependencies

```bash
cd backend
npm install
```

## 3. Configure backend environment variables

Create:

```text
backend/.env
```

Add the required MongoDB, JWT, and Cloudinary credentials.

## 4. Start the backend

```bash
npm start
```

or, if using Node directly:

```bash
node app.js
```

The backend is configured around port:

```text
8000
```

## 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

## 6. Start the frontend

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

---

# Useful Frontend Commands

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

# Deployment

The repository contains Vercel configuration files:

```text
backend/vercel.json
frontend/vercel.json
```

## Backend Deployment

The backend is configured to use `app.js` as the serverless entry point.

Required production environment variables:

```text
MONGO_URI
SECRET_KEY
CLOUD_NAME
API_KEY
API_SECRET
```

## Frontend Deployment

The frontend is a Vite SPA and includes a Vercel rewrite so client-side routes can resolve correctly.

After deployment, update:

```text
frontend/src/utils/constant.js
```

or preferably use Vite environment variables to point the frontend to the production backend API.

---

# Application Flow

## Student Flow

```text
Signup
  │
  ▼
Login
  │
  ▼
Home / Browse Jobs
  │
  ▼
Search / View Jobs
  │
  ▼
Job Details
  │
  ▼
Apply
  │
  ▼
Application Created
```

## Recruiter Flow

```text
Signup as Recruiter
       │
       ▼
Login
       │
       ▼
Create Company
       │
       ▼
Company Setup
       │
       ▼
Create Job
       │
       ▼
Recruiter Job List
       │
       ▼
View Applicants
       │
       ▼
Update Application Status
```

---

# State Management

Redux Toolkit is used for application-wide state.

### Auth Slice

```text
auth
├── loading
└── user
```

Responsible for:

- Current authenticated user
- Authentication loading state

### Job Slice

```text
job
├── allJobs
├── allAdminJobs
├── singleJob
└── searchJobByText
```

Responsible for:

- Job listing
- Recruiter's jobs
- Selected job
- Job search text

### Company Slice

```text
company
├── singleCompany
├── companies
└── searchCompanyByText
```

Responsible for:

- Selected company
- Recruiter's companies
- Company search text

Redux Persist currently persists the `auth` state in browser storage.

---

# File Uploads

Multer is configured with memory storage:

```text
Multer
   │
   ▼
File Buffer
   │
   ▼
Data URI
   │
   ▼
Cloudinary
   │
   ▼
Secure URL
   │
   ▼
MongoDB
```

Uploaded resources currently include:

- User profile photos
- Resumes
- Company logos

Cloudinary stores the uploaded resource while MongoDB stores the resulting URL.

---

# Error Handling

The backend includes:

### Async wrapper

```text
backend/utils/wrapAsync.js
```

This forwards rejected asynchronous controller operations to Express's error handler.

### Global error handler

`backend/app.js` contains a centralized Express error-handling middleware that returns:

```json
{
  "message": "error message",
  "success": false
}
```

---

# Current Limitations

The following points were identified by reviewing the current source code.

### 1. No separate admin role

The project currently supports:

```text
student
recruiter
```

There is no independent admin authentication/model.

### 2. Application listing endpoint needs improvement

`getAllApplied` currently uses `findOne`, so it returns only one application instead of the complete list of a user's applications.

For a complete application history, it should use:

```js
Application.find({ applicant: userId })
```

### 3. Some frontend UI is still static

The `AppliedJobTable` currently contains hard-coded sample rows rather than loading application data from the backend.

### 4. Job filters are currently UI-only

The filter component displays options, but the selected values are not yet connected to a backend filtering request.

### 5. Bookmark/save job is not implemented

The UI shows a bookmark icon, but there is currently no saved-jobs model/API workflow.

### 6. Search UI is partially implemented

The backend supports a `keyword` query for jobs, but the home search input is not fully wired to the job search state/API.

### 7. Job update endpoint is incomplete

An `updateJob` controller exists, but it is not registered in the job router and its query currently searches by `userId` rather than a job ID.

### 8. Authorization checks need strengthening

Several protected endpoints verify that a user is authenticated but do not verify ownership/role before modifying or deleting a resource.

For example, a production implementation should verify that the recruiter owns the company/job/application being modified.

### 9. File upload validation should be added

The current upload middleware does not enforce:

- File size limits
- Allowed MIME types
- Resume/document extensions
- Image dimensions

### 10. Backend scripts can be improved

The backend `package.json` currently has no dedicated `dev` or `start` script.

Recommended scripts:

```json
{
  "scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js"
  }
}
```

---

# Recommended Improvements

For a stronger production and portfolio project, consider adding:

- Role-based authorization middleware
- Admin dashboard
- Saved jobs
- Complete application history
- Recruiter applicant dashboard
- Job editing
- Job closing/expiration
- Pagination
- Advanced job filters
- Debounced search
- Form validation
- File type/size validation
- Password reset
- Email notifications
- Email verification
- Rate limiting
- Helmet/security headers
- API documentation with Swagger/OpenAPI
- Better API status/error conventions
- Automated tests
- Loading skeletons
- Empty/error states
- Proper responsive testing
- Environment-based API configuration

---

# Future Roadmap

## Phase 1 — Core Completion

- [ ] Complete application history
- [ ] Connect application table to backend
- [ ] Complete job search
- [ ] Complete job filters
- [ ] Implement job update
- [ ] Implement saved jobs

## Phase 2 — Recruiter Experience

- [ ] Applicant dashboard
- [ ] Candidate profile view
- [ ] Resume preview/download
- [ ] Recruiter job editing
- [ ] Job status management
- [ ] Application analytics

## Phase 3 — Security & Production

- [ ] Role-based authorization
- [ ] Input validation
- [ ] File validation
- [ ] Rate limiting
- [ ] Security headers
- [ ] Better error logging
- [ ] Automated tests

## Phase 4 — Advanced Features

- [ ] Email notifications
- [ ] Password reset
- [ ] Email verification
- [ ] Job recommendations
- [ ] Admin dashboard
- [ ] Advanced search
- [ ] Analytics dashboard

---

# Why This Project Is Portfolio-Worthy

This project demonstrates practical full-stack development concepts rather than only frontend UI work.

It covers:

- REST API development
- MVC-style backend organization
- MongoDB data modeling
- Mongoose relationships and population
- JWT authentication
- HTTP-only cookies
- Password hashing
- File uploads
- Cloudinary integration
- React routing
- Redux Toolkit
- Redux Persist
- Axios API integration
- Protected application workflows
- Recruiter/job management
- Deployment configuration

These concepts are directly relevant to MERN-stack internships and junior full-stack developer roles.

---

# Author

**Niraj Kumar**

Computer Science Engineering Student  
Full-Stack / MERN Development Project

---

## License

This project is intended for educational, portfolio, and learning purposes. Add an appropriate open-source license if you plan to distribute the project publicly.

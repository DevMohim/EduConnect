<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — EduConnect LMS

> Persistent project instructions for AI coding agents working on EduConnect.

## 1. Project Overview

EduConnect is a role-based Learning Management System (LMS) connecting students, instructors, and platform administrators.

The platform allows:
- Students to discover courses, enroll, study lessons, complete quizzes and assignments, track progress, and earn certificates.
- Instructors to create courses, manage lessons, assess students, and monitor course analytics.
- Administrators to manage users, review courses, monitor enrollments, and supervise transactions.

### Primary Objective

Build a functional, secure, responsive, production-ready LMS.

Do not build disconnected static screens. Every major interface should connect to real application workflows and backend APIs.

## 2. Technology Stack

### Frontend

- Next.js App Router
- React
- TypeScript (if the repository is configured for TypeScript)
- Tailwind CSS
- shadcn/ui
- Lucide React icons
- React Hook Form (where appropriate)
- Zod for validation
- Recharts for analytics
- Motion/Framer Motion for subtle animations

### Backend

- Node.js
- Express.js
- TypeScript or JavaScript, following the existing repository
- MongoDB
- Mongoose (if used by the existing implementation)
- Better Auth authentication integration
- JWT verification where applicable
- Zod or another established validation solution

### External Services

- Better Auth — authentication and Google OAuth
- Stripe — payment processing
- Cloudinary or another configured image-hosting service
- Mux or another configured video-delivery service, if implemented

**Important:** The frontend and backend are separate applications with separate GitHub repositories. Do not move backend business logic into Next.js API routes or Next.js server actions.

## 3. Architecture Rules

Maintain a clear separation of responsibilities.

### Frontend responsibilities

- Rendering UI and pages.
- Managing client-side interactions.
- Form handling and client-side validation.
- Communicating with Express REST APIs.
- Displaying API responses.
- Managing authentication state.
- Handling loading, error, success, and empty states.

### Backend responsibilities

- Authentication verification.
- Role-based authorization.
- Resource ownership verification.
- Business logic.
- Database operations.
- Request validation.
- File upload processing.
- Payment processing and webhook verification.
- Secure API responses.

### General rules

1. Express is the authoritative source for business operations and protected resources.
2. Never trust frontend-supplied user IDs, roles, prices, progress, scores, or payment statuses.
3. Validate all protected operations on the backend.
4. Use reusable components and maintainable modules.
5. Follow existing project conventions before introducing new patterns.
6. Do not duplicate business logic between frontend and backend.

## 4. User Roles and Permissions

EduConnect has three primary roles.

### Student

Students can:

- Browse published courses.
- Search and filter courses.
- Enroll in free and paid courses.
- Access enrolled course lessons.
- Track learning progress.
- Complete assignments.
- Take quizzes.
- View quiz results.
- View certificates.
- Manage their profile.
- Submit course reviews if implemented.
- Save courses to a wishlist if implemented.

### Instructor

Instructors can:

- Create courses.
- Edit their own eligible courses.
- Upload course thumbnails and resources.
- Create sections and lessons.
- Submit courses for administrator review.
- View their own course enrollments.
- Manage assignments and quizzes.
- Grade student submissions.
- View course analytics.
- Monitor earnings when paid courses are enabled.

### Administrator

Administrators can:

- View platform statistics.
- Manage users.
- Suspend and reactivate accounts.
- Review submitted courses.
- Approve or reject courses.
- Manage course categories.
- View enrollments.
- View payment transactions.
- Monitor platform activity.
- Unpublish or archive inappropriate content.

### Critical authorization rules

- Public registration must never allow Administrator role selection.
- Administrators must be provisioned securely.
- Students cannot access instructor or administrator dashboards.
- Instructors cannot access student or administrator management tools.
- Administrators cannot enroll as students.
- Instructors cannot enroll in their own courses.
- Suspended accounts cannot access protected platform functionality.

Never rely exclusively on frontend route protection.

## 5. Frontend Development Guidelines

### Next.js conventions

- Use the App Router.
- Organize pages using route groups where appropriate.
- Use Server Components by default.
- Use Client Components only when browser-side interactivity is required.
- Avoid unnecessary client-side rendering.
- Keep components small, focused, and reusable.
- Use proper metadata for public pages.
- Implement appropriate loading, error, and not-found pages.
- Ensure nested routes work after refreshing the browser.

### UI component library: shadcn/ui

shadcn/ui is the primary component library.

Use existing shadcn/ui components whenever appropriate.

Preferred components include:

- Button
- Input
- Label
- Textarea
- Select
- Checkbox
- Radio Group
- Card
- Badge
- Avatar
- Dropdown Menu
- Dialog
- Alert Dialog
- Sheet
- Tabs
- Table
- Skeleton
- Tooltip
- Separator
- Progress
- Calendar
- Popover
- Form-related components

### shadcn/ui rules

1. Check whether a component already exists before creating another.
2. Reuse installed shadcn/ui components.
3. Customize components through supported variants and Tailwind classes.
4. Keep shared component modifications consistent.
5. Do not introduce another UI component library without a clear reason.
6. Use accessible component primitives.
7. Avoid unnecessary custom implementations of components already available in shadcn/ui.

### Design principles

Create an original, professional education-focused visual identity.

Suggested design direction:

- Deep navy
- Blue
- Teal
- Warm neutral backgrounds
- Clean white cards
- Consistent typography
- Balanced spacing
- Subtle borders and shadows

Maintain consistent:

- Button variants.
- Input dimensions.
- Card layouts.
- Border radiuses.
- Heading hierarchy.
- Status badges.
- Image aspect ratios.
- Dashboard spacing.

Use responsive layouts for mobile, tablet, and desktop.

Avoid:
- Excessive gradients.
- Unnecessary animations.
- Decorative clutter.
- Oversized empty sections.
- Inconsistent spacing.
- Unreadable text.
- Arbitrary color choices.

### Shared UI states

Major data-driven pages must support:

- Loading skeletons.
- Empty states.
- Error states.
- Success feedback.
- Disabled/loading button states.
- Form validation messages.
- Confirmation dialogs for destructive actions.

Never use browser `alert()` for application feedback.

Use toast notifications and appropriate dialogs.

## 6. Frontend Page Structure

### Public pages

- Home
- Explore Courses
- Course Details
- Sign In
- Sign Up
- Instructor Information
- FAQ
- Not Found

### Shared authenticated pages

- Account Settings
- Notifications (optional)
- Payment Success
- Payment Cancel

### Student dashboard

- Overview
- My Learning
- Course Player
- Assignments
- Quiz Results
- Certificates
- Profile

### Instructor dashboard

- Overview
- My Courses
- Create Course
- Course Editor
- Student Enrollments
- Assignments & Grading
- Analytics
- Profile

### Administrator dashboard

- Overview
- Manage Users
- Review Courses
- Manage Categories
- Enrollments
- Transactions
- Reports

Use role-specific dashboard layouts and navigation.

## 7. Frontend API Integration

All backend communication must go through a consistent API layer.

Guidelines:

- Use a centralized API configuration.
- Keep the API base URL in environment variables.
- Reuse API utilities.
- Handle HTTP errors consistently.
- Avoid repeating fetch configuration throughout components.
- Handle authentication credentials securely.
- Do not expose server secrets.
- Do not hardcode production API URLs.

Use appropriate loading and error states when fetching data.

Do not silently swallow API errors.

## 8. Backend Development Guidelines

Express.js is the backend API server.

Keep responsibilities separated into appropriate modules.

Recommended organization:

- config — database and service configuration.
- routes — API route definitions.
- controllers — request and response handling.
- services — business logic.
- models — database schemas.
- middleware — authentication, authorization, validation, errors.
- validators — request validation schemas.
- utils — reusable helpers.
- types — shared backend types.
- constants — application constants.

Follow the existing repository structure if it already has an established convention.

### Backend principles

1. Controllers should remain lightweight.
2. Put complex business logic in services.
3. Use models for database structure and indexes.
4. Validate request bodies, parameters, and query strings.
5. Use consistent HTTP status codes.
6. Implement centralized error handling.
7. Return consistent API response structures.
8. Never expose database credentials or internal stack traces.
9. Verify resource ownership before protected operations.
10. Use pagination for large datasets.

## 9. Authentication and Security

Use Better Auth for authentication.

Support:

- Email/password registration.
- Email/password login.
- Google authentication.
- Secure session management.

Registration fields:

- Full Name
- Email
- Password
- Profile Image (optional)
- Account Role (Student or Instructor)

Password requirements:

- Minimum 8 characters.
- At least one uppercase letter.
- At least one lowercase letter.
- At least one number.

### API authentication

The Express server must identify the current user through a verified session or secure token integration.

If JWT is used, verify:

- Signature.
- Expiration.
- Issuer and audience where configured.

Implement middleware for:

- Authentication.
- Role authorization.
- Account status.
- Resource ownership.
- Request validation.
- Centralized error handling.

### HTTP response conventions

- 400 — Invalid request.
- 401 — Unauthenticated.
- 403 — Unauthorized.
- 404 — Resource not found.
- 409 — Conflict.
- 422 — Validation failure, where appropriate.
- 500 — Internal server error.

Do not expose sensitive information in error messages.

### Ownership verification

Examples:

- Instructors can only manage their own courses.
- Students can only access their own enrollments.
- Students can only submit assignments for eligible enrolled courses.
- Instructors can only grade submissions belonging to their own courses.
- Administrators can only access administrative functionality through authorized endpoints.

Never trust a resource ID supplied by the frontend without checking ownership.

## 10. Course Management Rules

### Course creation

Course fields include:

- Title
- Short Description
- Full Description
- Category
- Difficulty
- Learning Outcomes
- Prerequisites
- Estimated Duration
- Price
- Cover Image
- Optional Intro Video URL

New courses must start with `Draft` status.

### Course status workflow

Supported statuses:

- Draft
- Pending Review
- Published
- Rejected
- Archived

Workflow:

1. Instructor creates a course.
2. Course is saved as Draft.
3. Instructor submits the course for review.
4. Status becomes Pending Review.
5. Administrator approves or rejects it.
6. Rejected courses must include a reason.
7. Only approved and published courses are publicly discoverable.

Material changes to published curriculum may require reapproval.

### Course ownership

- Instructors may edit their own Draft or Rejected courses.
- Instructors cannot edit another instructor's courses.
- Published courses with active enrollments should be archived rather than hard-deleted.
- Draft courses may be deleted according to authorization rules.

### Curriculum

A course contains sections and lessons.

Lessons can have these types:

- Video
- Article
- Downloadable Resource

Each lesson should support:

- Title
- Content or media URL
- Duration
- Preview flag
- Display order

Only enrolled students can access non-preview lessons.

## 11. Student Learning Rules

### Enrollment

For free courses:

- Verify the student role.
- Verify the course is published.
- Prevent enrollment in the instructor's own course.
- Prevent duplicate active enrollments.
- Create an active enrollment.

For paid courses:

- Create a Stripe Checkout Session.
- Keep enrollment pending payment.
- Activate enrollment only after verified payment confirmation.

### Learning progress

- Save progress on the server.
- Persist completed lessons.
- Calculate progress from required completed lessons.
- Never trust a percentage supplied by the client.
- Prevent access to unauthorized course lessons.
- Mark a course completed when its required completion criteria are met.

### Assignments

Students may submit:

- Text responses.
- File attachments, where allowed.

Validate:

- Submission ownership.
- Due dates.
- Allowed file types.
- File sizes.
- Resubmission permissions.

Submission statuses:

- Not Submitted
- Submitted
- Late
- Graded
- Returned for Revision

Instructors can grade eligible submissions and provide marks and written feedback.

### Quizzes

Initial version supports multiple-choice questions with one correct answer per question.

Implement:

- Attempt limits where configured.
- Time limits where configured.
- Server-side scoring.
- Question randomization where configured.
- Result and feedback visibility based on quiz settings.

Never accept client-calculated scores as authoritative.

### Certificates

When completion criteria are met:

- Generate a unique certificate code.
- Store student, course, enrollment, and issue date.
- Prevent duplicate certificates.
- Provide a verification URL.

Public verification must not expose private student information.

## 12. Payment System

Use Stripe Checkout for paid course enrollment.

### Payment workflow

1. Student clicks Enroll.
2. Backend verifies student identity.
3. Backend checks course publication and price.
4. Backend checks duplicate enrollment.
5. Backend creates Stripe Checkout Session using the database price.
6. Student completes checkout.
7. Stripe sends a webhook.
8. Backend verifies the webhook signature.
9. Backend processes the event.
10. Backend activates enrollment and records the successful transaction.

### Payment security

- Keep Stripe secret keys on the backend.
- Verify webhook signatures using the required raw request body.
- Handle duplicate webhook events idempotently.
- Store payment references.
- Handle failed, cancelled, expired, and refunded payment states.
- Never trust frontend payment-success redirects.
- Never allow administrators to manually change failed payments to successful.
- Never store card numbers or sensitive payment information.

## 13. Database Guidelines

Use MongoDB with clear references and appropriate indexes.

Recommended collections:

- users (Better Auth user extension)
- categories
- courses
- sections
- lessons
- enrollments
- lessonProgress
- assignments
- submissions
- quizzes
- quizAttempts
- certificates
- transactions

### Important database rules

- Better Auth manages authentication collections.
- Never store authentication passwords in business collections.
- Create a unique index for category slugs.
- Create a unique index for certificate codes.
- Prevent duplicate active enrollments.
- Index courses by status, categoryId, and createdAt.
- Index enrollments by studentId and courseId.
- Index submissions by assignmentId and studentId.
- Use server-generated timestamps.
- Verify related records before database writes.

Do not add unnecessary collections or duplicate existing data without a clear reason.

## 14. API Design

Use RESTful API conventions.

Suggested route groups:

### Public

- GET /api/courses
- GET /api/courses/:courseId
- GET /api/categories

### Instructor

- POST /api/instructor/courses
- PATCH /api/instructor/courses/:id
- POST /api/instructor/courses/:id/submit
- Course section and lesson management.
- Student enrollment and analytics.
- Assignment grading.

### Student

- POST /api/courses/:id/enroll
- GET /api/student/enrollments
- GET /api/student/courses/:id/progress
- POST /api/lessons/:id/complete
- Assignment submissions.
- Quiz attempts and results.
- Certificate retrieval.

### Administrator

- GET /api/admin/users
- PATCH /api/admin/users/:id/status
- GET /api/admin/courses/review
- PATCH /api/admin/courses/:id/review
- Category management.
- Enrollment and transaction records.

### Payments

- POST /api/payments/checkout-session
- POST /api/payments/webhook

These are suggested route structures. Follow existing API naming conventions where established.

Document implemented endpoints.

## 15. Required and Optional Features

### Required core features

Prioritize:

- Authentication and role-based access.
- Public course discovery.
- Course details.
- Instructor course management.
- Course approval workflow.
- Student enrollment.
- Course player.
- Learning progress.
- Assignments and grading.
- Quizzes and results.
- Certificates.
- Administrator management.
- Stripe course payments.
- Secure API authorization.

### Challenge requirements

Complete at least two:

1. Advanced course discovery.
2. Secure progress calculation.
3. Quiz attempt protection.
4. Certificate verification.
5. Instructor analytics.
6. Webhook idempotency.

### Optional features

These must not take priority over required workflows:

- Course reviews and ratings.
- Wishlist.
- Dark/light theme.
- Email notifications.
- Learning streaks.
- Weekly learning goals.
- Discussion and Q&A.
- Downloadable certificate PDF.
- Instructor subscription tiers.

Do not implement optional features at the expense of core functionality.

## 16. Error Handling and User Experience

Handle:

- Invalid routes.
- Missing records.
- Failed API requests.
- Network interruptions.
- Invalid form submissions.
- Unsupported file uploads.
- Unauthorized requests.
- Suspended accounts.
- Ownership violations.
- Duplicate enrollments.
- Expired checkout sessions.
- Failed payments.
- Invalid webhook signatures.
- Quiz attempt limits.
- Assignment deadline violations.
- Invalid grading values.

All important actions must provide clear feedback.

Prevent duplicate submissions with loading and disabled states.

Use confirmation dialogs for destructive actions.

## 17. Environment Variables and Secrets

Never commit `.env` files.

Never expose:

- Database credentials.
- OAuth client secrets.
- JWT signing secrets.
- Stripe secret keys.
- Stripe webhook signing secrets.
- Private API credentials.

Use environment variables for configuration.

Frontend public variables should contain only values intended for browser exposure.

Backend secrets must remain exclusively on the backend.

Maintain separate environment configurations for development and production.

## 18. Testing and Quality Standards

Before considering a feature complete, verify:

- The happy path works.
- Validation works.
- Authentication works.
- Role authorization works.
- Ownership checks work.
- Unauthorized access is rejected.
- Error handling works.
- Loading states work.
- Empty states work.
- Responsive layouts work.

Test protected endpoints directly rather than relying only on frontend restrictions.

Test important payment and enrollment workflows.

Avoid unnecessary dependencies.

Do not leave dead buttons, placeholder links, or incomplete interactions.

## 19. Git and Repository Standards

Maintain two separate GitHub repositories:

- EduConnect Client
- EduConnect Server

Required meaningful commits:

- At least 20 client-side commits.
- At least 12 server-side commits.

Use descriptive commit messages.

Examples:

- feat: implement student dashboard overview
- feat: add instructor course creation
- feat: implement course approval workflow
- fix: prevent duplicate student enrollment
- fix: verify Stripe webhook signatures
- refactor: centralize API error handling
- style: improve responsive dashboard navigation

Do not make meaningless commits simply to increase commit count.

## 20. Deployment Requirements

Production deployment must support:

- Working frontend and backend.
- Correct CORS configuration.
- Correct API base URLs.
- Secure authentication.
- Working Google OAuth callbacks.
- Correct cookie/session configuration.
- Working payment checkout.
- Verified Stripe webhooks.
- Refreshing nested routes without errors.
- Persistent authenticated sessions.
- Proper production environment variables.

Test production functionality instead of assuming a successful build means the application works.

## 21. README and Submission

Both repositories require a complete README containing:

- Project description.
- Features.
- Technologies and packages.
- Installation instructions.
- Environment variable names.
- Available scripts.
- Architecture information.
- Live frontend URL.
- Live API URL.
- GitHub repository links.
- Test credentials.
- Challenge implementation explanations.

Never publish secret credentials in source code or public README files.

Provide test credentials securely through the submission document.

## 22. AI Agent Operating Instructions

These instructions apply to every AI coding agent working on EduConnect.

### Before writing code

1. Inspect the existing project structure.
2. Read the relevant files.
3. Understand the existing implementation.
4. Identify reusable components and utilities.
5. Check existing dependencies.
6. Understand how the frontend communicates with the backend.
7. Avoid assuming that a feature is missing before inspecting the code.

### While implementing

1. Implement one logical feature at a time.
2. Follow existing naming conventions.
3. Prefer reusable components and services.
4. Use shadcn/ui for UI components.
5. Maintain frontend/backend separation.
6. Follow established authentication and API patterns.
7. Implement proper validation and error handling.
8. Keep changes focused and avoid unrelated refactoring.
9. Do not remove existing working functionality.
10. Do not introduce unnecessary dependencies.

### Security rules

1. Never bypass authentication.
2. Never bypass role authorization.
3. Never trust client-supplied ownership information.
4. Never expose secrets.
5. Never activate paid enrollment from a success redirect.
6. Never calculate authoritative quiz scores or learning progress on the client.
7. Never expose private learning content to unauthorized users.

### After implementation

1. Review the changed files.
2. Run relevant lint checks.
3. Run TypeScript checks if configured.
4. Run relevant tests.
5. Run a production build when appropriate.
6. Fix errors introduced by the implementation.
7. Explain what changed.
8. Mention any remaining issues or incomplete functionality.

### Decision-making rules

- Do not invent business requirements.
- Do not silently change established architecture.
- Do not implement optional features unless requested or prioritized.
- Ask before making major architectural decisions.
- If a requirement is ambiguous, explain the ambiguity and ask for clarification when it materially affects implementation.
- If an existing implementation conflicts with this document, explain the conflict before making destructive changes.

## 23. Definition of Done

A feature is complete only when:

- Its UI is implemented.
- Its API integration works.
- Backend validation is implemented.
- Authentication and authorization are enforced where required.
- Ownership rules are enforced.
- Loading, success, error, and empty states are handled where relevant.
- Responsive behavior is verified.
- No major existing functionality is broken.
- Relevant checks pass.

**Final principle: Build EduConnect as a real, secure, maintainable Learning Management System—not as a collection of attractive but disconnected dashboard screens.**

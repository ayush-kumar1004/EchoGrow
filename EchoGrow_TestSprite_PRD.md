# EchoGrow QA/Product Requirements Document (PRD)

## Project Overview

**Project Name:** EchoGrow  
**Project Type:** Next.js full-stack web application with frontend + backend lead generation system.  

**Tech Stack:**
* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Prisma ORM
* SQLite database
* Zod validation
* React Hot Toast
* Server Actions

## Application Goal

EchoGrow is a creative branding and advertising platform where businesses can:
* Explore creative branding services
* View portfolio/campaign examples
* Learn the process
* View startup-friendly pricing
* Contact EchoGrow
* Submit lead generation forms

## Testing Goal

The goal of this PRD is to help TestSprite test the following critical functional and non-functional areas:
1. UI correctness
2. Navigation/routing
3. Responsiveness
4. Form validation
5. Backend form submission
6. Database storage
7. Error handling
8. Loading states
9. CTA interactions
10. User workflows

---

## Routes To Test

### 1. Homepage
**Route:** `/`

**Expected Elements:**
* Navbar
* Hero section
* CTA buttons
* Trust indicators
* Service highlights
* Footer

**Test Cases:**
* Hero renders correctly
* CTA buttons clickable
* Navigation links functional
* Footer visible
* Mobile responsiveness
* No layout breaking

### 2. Services Page
**Route:** `/services`

**Expected Features:**
* Service cards
* Industry categories
* Creative service descriptions
* CTA buttons

**Test Cases:**
* Services render properly
* Category filters work
* CTA links work
* Responsive layout maintained

### 3. Portfolio Page
**Route:** `/portfolio`

**Expected Features:**
* Campaign/case study cards
* Category filtering
* Inquiry form/email capture

**Test Cases:**
* Portfolio cards render
* Filters functional
* Form validation works
* Email submission succeeds
* Success message appears
* Invalid email rejected
* Backend action executes

### 4. How It Works Page
**Route:** `/how-it-works`

**Expected Features:**
* 5-step process visualization
* FAQ accordion
* Contact CTA

**Test Cases:**
* FAQ expand/collapse works
* Steps visible
* CTA buttons functional
* Responsive behavior verified

### 5. Pricing Page
**Route:** `/pricing`

**Expected Features:**
* Pricing cards
* Free features section
* CTA buttons
* Flexible pricing messaging

**Test Cases:**
* Pricing renders
* Buttons clickable
* Mobile responsiveness
* Layout consistency

### 6. About Page
**Route:** `/about`

**Expected Features:**
* Mission section
* Company story
* Industries served
* Process overview

**Test Cases:**
* Sections visible
* Content loads correctly
* CTA buttons functional

### 7. Contact Page
**Route:** `/contact`

**Expected Features:**
* Lead generation form
* Validation
* Backend submission
* Success/error state

**Form Fields:**
* Name
* Email
* Business Name
* Business Type
* Required Services
* Goals

**Validation Rules:**
* Required fields enforced
* Email must be valid
* Empty form rejected
* Invalid email rejected
* Submission disabled during loading

---

## Backend Testing

**Verify:**
* Form data saved in database
* Prisma operations succeed
* Timestamp saved
* Lead status defaults to "New"

**Database Model (Lead):**
* `id`
* `name`
* `email`
* `businessName`
* `businessType`
* `requiredServices`
* `goals`
* `createdAt`
* `status`
* `notes`

---

## Non-Functional Testing Requirements

### UI/UX Testing Requirements:
* Fully responsive
* No broken layouts
* No overlapping text
* No console errors
* Buttons accessible
* Proper spacing/alignment
* Consistent styling

### Error Handling Tests:
* Invalid email
* Missing required field
* Failed backend request
* Database unavailable
* Server validation errors

### Performance Tests:
* Fast page loading
* No hydration errors
* No rendering crashes
* Smooth navigation

---

## Expected User Journey

**Workflow to Simulate:**
1. Homepage →
2. Services →
3. Portfolio →
4. Pricing →
5. About →
6. Contact →
7. Submit Form →
8. Lead saved successfully

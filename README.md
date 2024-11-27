# SwitchPay - Fund Transfer Application

## Overview

SwitchPay is a streamlined platform for executing fund transfers efficiently. Built with Next.js, this app leverages performance optimizations and server-side rendering capabilities to provide a smooth user experience. SwitchPay allows users to log in, select recipient details, verify account information, and process transactions seamlessly.

## Features

1. **User Authentication**
   - Secure login functionality using a token-based system

2. **Dashboard**
   - Welcome screen with a prominent "New Transfer" button

3. **New Transfer Workflow**
   - Step 1: Enter recipient's account number
   - Step 2: Select recipient's bank from a pre-populated list
   - Step 3: Fetch and display recipient's account name
   - Step 4: Enter transfer amount
   - Step 5: Input OTP for verification
   - Step 6: Submit and process the transaction

4. **Transaction Status**
   - View transfer success message
   - Option to initiate a new transfer

## Technologies Used

- **Frontend Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **Form Handling**: react-hook-form with zod for validation
- **API Integration**: Axios
- **Authentication**: Custom AuthContext with JWT
- **UI Components**: Custom components built with Radix UI primitives

## Setup Instructions

1. **Clone the repository**


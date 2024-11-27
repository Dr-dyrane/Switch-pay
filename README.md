Here's the complete README for your project:

---

# SwitchPay - Fund Transfer Application

## Overview

SwitchPay is a streamlined platform for executing fund transfers efficiently. Built with Next.js, this app leverages performance optimizations and server-side rendering capabilities to provide a smooth user experience. SwitchPay allows users to log in, select recipient details, verify account information, and process transactions seamlessly.

---

## Features

### 1. **User Authentication**
- Secure login functionality using a token-based system.
- OTP verification for enhanced security.

### 2. **Dashboard**
- Welcome screen with a prominent "New Transfer" button.
- Overview of recent transactions.

### 3. **New Transfer Workflow**
- **Step 1**: Enter recipient's account number.
- **Step 2**: Select recipient's bank from a pre-populated list.
- **Step 3**: Fetch and display recipient's account name for verification.
- **Step 4**: Enter the transfer amount.
- **Step 5**: Input OTP for verification.
- **Step 6**: Submit and process the transaction.

### 4. **Transaction Status**
- Real-time status updates after submitting a transfer.
- View a success message or error details.
- Option to initiate a new transfer directly from the status screen.

### 5. **Responsive Design**
- Fully responsive design for seamless use across devices.

### 6. **Error Handling**
- User-friendly error messages for failed transactions or invalid inputs.

---

## Technologies Used

- **Frontend Framework**: Next.js 13 (App Router).
- **Styling**: Tailwind CSS.
- **State Management**: React Context API.
- **Form Handling**: react-hook-form with zod for validation.
- **API Integration**: Axios for handling HTTP requests.
- **Authentication**: Custom AuthContext with JWT-based authentication.
- **UI Components**: Custom components built using Radix UI primitives.
- **Testing**: Jest and React Testing Library for unit and integration tests.

---

## Setup Instructions

### 1. **Clone the Repository**
```bash
git clone https://github.com/Dr-dyrane/Switch-pay.git
cd Switch-pay
```

### 2. **Install Dependencies**
Ensure you have `npm` or `yarn` installed, then run:
```bash
npm install
# or
yarn install
```

### 3. **Set Environment Variables**
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_API_BASE_URL=<API_BASE_URL>
NEXT_PUBLIC_OTP_TIMEOUT=<OTP_TIMEOUT_IN_SECONDS>
NEXT_PUBLIC_TOKEN_SECRET=<JWT_SECRET>
```

### 4. **Run the Development Server**
```bash
npm run dev
# or
yarn dev
```
Visit `http://localhost:3000` in your browser to access the application.

### 5. **Build for Production**
To generate a production build, run:
```bash
npm run build
```

### 6. **Run Production Build**
Serve the production build locally:
```bash
npm start
```

---

## Folder Structure
```
├── app/
│   ├── dashboard/
│   │   ├── TransactionList.tsx
│   │   ├── loading.js
│   │   └── page.tsx
│   ├── transaction-status/
│   │   ├── loading.js
│   │   └── page.tsx
│   ├── transfer/
│   │   ├── loading.js
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── login/page.tsx
│   └── page.tsx
├── components/
│   ├── Navigation.tsx
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── form.tsx
│       ├── select.tsx
│       └── ... (additional components)
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── use-toast.ts
│   ├── useRateLimiter.ts
│   └── use-mobile.tsx
├── lib/
│   ├── api-client.ts
│   ├── bankCodes.ts
│   └── utils.ts
├── public/
├── tests/
│   ├── api.test.ts
│   └── login.test.tsx
└── ... (configuration files)
```

---

## Contributions

Contributions are welcome! If you have suggestions, issues, or feature requests, feel free to create a pull request or open an issue in the repository.

---

## License

SwitchPay is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

--- 

### Author  
Dr. Dyrane  

--- 
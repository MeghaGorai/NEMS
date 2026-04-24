# National Election Management System (NEMS) Documentation

## 1. Project Overview
The National Election Management System (NEMS) is a comprehensive web-based platform designed to facilitate secure, transparent, and efficient digital elections. The system handles the entire election lifecycle, from voter registration and candidate management to live voting and result analytics.

## 2. Page Directory & Functionality

### 2.1 Landing Page (`landing.html`)
**Purpose:** The public-facing entry point for the system, designed to inform visitors about the platform and direct them to login.
**Key Features:**
- **Hero Section:** Engaging introduction with live system statistics (Registered Voters, Constituencies, Uptime).
- **Features Overview:** Highlights key benefits like Secure Voting, Fast Results, Live Analytics, and Accessibility.
- **Election Info:** A live tabular snapshot of candidate standings.
- **Results Dashboard Preview:** A visual pie chart representation of vote distributions.
- **Navigation:** Links to the Login page and smooth scrolling to page sections.

### 2.2 Login & Authentication (`loginakash.html`)
**Purpose:** Secure portal for voters and administrators to access their respective dashboards.
**Key Features:**
- **Login Form:** Accepts Username/Voter ID and Password.
- **Password Recovery:** "Forgot Password" functionality to send reset links to registered emails.
- **UI/UX:** Features a blurred background with a sleek, animated container.

### 2.3 User Profile & EMMS Hub (`index.html`)
**Purpose:** The personalized voter portal (Election Management System Hub) where individual users can view their details and voting status.
**Key Features:**
- **Voter Information:** Displays comprehensive user details including Name, Voter ID, State/District, Age/Gender, and Contact Information.
- **Verification Status:** Shows profile photo and verification badge.
- **Live Voting Overview:** Dynamic bar charts displaying "Total People" vs. "People Voted".
- **Historical Data:** Charts showing previous election results (e.g., Last Year Party Votes).
- **Quick Navigation:** Links to Edit Profile, Voting interface, and Election History.

### 2.4 Main System Dashboard (`dash.html`)
**Purpose:** A unified control center that bridges voter, candidate, and system overviews.
**Key Features:**
- **Sidebar Navigation:** Access to Main Dashboard, Candidate Dashboard, Admin Dashboard, Voter Dashboard, Election Info, Result Dashboard, and Support.
- **Real-time Metrics:** Displays active elections, live voters, open alerts, and system uptime.
- **Candidate Overview:** Stats on total candidates, approved, pending, and rejected statuses.
- **Election Countdown:** A live timer counting down to the next major election.
- **Results Chart:** Graphical representation of top candidates' progress.
- **Support System:** FAQ section and a user feedback submission form.

### 2.5 Admin Control Center (`admin.html`)
**Purpose:** A highly privileged dashboard specifically for system administrators to manage the backend operations of the election.
**Key Features:**
- **System Health & Security:** Monitors registration progress, verification status, and active security alerts.
- **Voter Management:** Searchable and filterable table of registered voters, showing their IDs, names, status, and districts.
- **Candidate Management:** Tools to review, approve, or reject candidate applications with filtering capabilities.
- **Election Scheduling:** Forms to create new elections, set dates, deadlines, and define regional scope.
- **Reporting Tools:** Functionality to generate and download CSV reports for voter summaries, candidate logs, and security audits.

## 3. Technology Stack
- **Frontend Structure:** HTML5
- **Styling:** Vanilla CSS3 (Custom stylesheets: `landing.css`, `main_style.css`, `dash.css`, `admin.css`)
- **Interactivity:** Vanilla JavaScript (`script.js`, `landing.js`, `dash.js`, `admin.js`)
- **Data Visualization:** Chart.js (used for rendering live results and analytics)
- **Icons & Typography:** FontAwesome 6, Google Fonts (Poppins, Roboto)

## 4. Design Philosophy
- **Aesthetics:** Uses a modern, high-contrast dark theme with glassmorphism effects, vibrant gradient accents, and dynamic micro-animations (e.g., floating particles, reveal-on-scroll).
- **Responsiveness:** Designed to be accessible across mobile, tablet, and desktop devices.
- **User Experience:** Focuses on intuitive navigation, clear data visualization, and immediate feedback for user actions.

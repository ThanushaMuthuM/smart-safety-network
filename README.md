# 🛡️ Smart Safety Network

A real-time emergency response and personal safety web application designed to help users quickly share their live location during emergency situations.

The **Smart Safety Network** provides an SOS emergency system with real-time GPS tracking, trusted contacts, nearby volunteer management, authority contacts, SMS location sharing, and secure Telegram emergency notifications.

---

## 🚨 Features

### 🆘 SOS Emergency System

* One-click SOS emergency button
* Automatically obtains the user's current GPS location
* Displays the emergency location on the interactive map
* Sends emergency location information through the secure Telegram backend
* Opens an SMS draft for the primary trusted contact
* Displays emergency status and activity logs

### 📍 Real-Time Location Tracking

* Browser-based GPS location access
* Live latitude and longitude
* Location accuracy display
* Interactive map using Leaflet.js
* Automatic location updates
* Google Maps location link generation

### 👨‍👩‍👧 Trusted Contacts

* Add trusted contacts
* Delete contacts
* Set a primary emergency contact
* One-touch calling
* Send current location through SMS
* Primary contact automatically selected for SOS

### 🧑‍🤝‍🧑 Nearby Volunteers

* Add volunteer details
* Generate sample nearby volunteers
* Calculate distance from the user's current location
* Display volunteers on the map
* Call volunteers directly
* Remove volunteers

### 🏛️ Authorities & Helplines

* Police emergency contact
* Women helpline
* Ambulance services
* Add custom authorities
* One-touch calling
* Manage authority information

### 📡 Emergency Broadcast Feed

* Real-time activity updates
* SOS status notifications
* Location status
* Contact and volunteer activity
* Telegram delivery status

### 📋 Incident Logs

* Stores emergency activity locally
* Displays timestamped events
* Download logs as a `.log` file
* Clear stored logs

### 🔐 Secure Telegram Integration

Telegram credentials are **not stored in the frontend**.

The frontend communicates with a Vercel API endpoint:

```text
Frontend
   ↓
/api/send-telegram
   ↓
Vercel Serverless Function
   ↓
Telegram Bot API
```

The Telegram bot token is stored securely as a Vercel environment variable.

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Leaflet.js
* Font Awesome
* Browser Geolocation API
* LocalStorage API

### Backend

* Vercel Serverless Functions
* JavaScript
* Telegram Bot API

### Deployment

* Vercel
* GitHub

---

## 📂 Project Structure

```text
smart-safety-network/
│
├── index.html
│
├── api/
│   └── send-telegram.js
│
├── .gitignore
├── README.md
└── .env.local
```

---

## 🔧 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/ThanushaMuthuM/smart-safety-network.git
```

### 2. Open the project

```bash
cd smart-safety-network
```

### 3. Configure Telegram

Create a local environment file:

```text
.env.local
```

Add:

```env
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID
```

**Never commit `.env.local` to GitHub.**

---

## 🔒 Environment Variables

The following environment variables are required:

| Variable             | Description                       |
| -------------------- | --------------------------------- |
| `TELEGRAM_BOT_TOKEN` | Telegram bot authentication token |
| `TELEGRAM_CHAT_ID`   | Telegram destination chat ID      |

The Telegram token should only be available to the backend/serverless function.

---

## 🌐 Vercel Deployment

### 1. Push the project to GitHub

```bash
git add .
git commit -m "Secure Telegram integration"
git push origin main
```

### 2. Import the repository into Vercel

Connect the GitHub repository to Vercel.

### 3. Add environment variables

In:

```text
Vercel
→ Project
→ Settings
→ Environment Variables
```

Add:

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

### 4. Redeploy

After adding the environment variables, redeploy the project.

---

## 📱 Emergency Workflow

When the user presses **SOS EMERGENCY**:

```text
User presses SOS
        ↓
Get current GPS location
        ↓
Display location on map
        ↓
Generate Google Maps link
        ↓
Send location to Vercel API
        ↓
Vercel securely contacts Telegram
        ↓
Telegram emergency notification
        ↓
Open SMS for primary contact
        ↓
Display emergency broadcast
        ↓
Save incident in local logs
```

---

## 🗺️ Map

The application uses **Leaflet.js** to display:

* User's current location
* Nearby volunteers
* Distance between user and volunteers
* Emergency location
* Interactive map controls

---

## 📲 SMS Emergency Sharing

The application generates an SMS message containing:

```text
🚨 Emergency! I need help.

Latitude: <latitude>
Longitude: <longitude>

Google Maps:
<location link>
```

The user can review and send the SMS using their device's messaging application.

---

## 🔐 Security

Sensitive credentials should never be included directly in:

```text
index.html
```

or:

```text
frontend JavaScript
```

The Telegram bot token is stored as an environment variable and accessed only by the serverless backend.

Example:

```javascript
const botToken = process.env.TELEGRAM_BOT_TOKEN;
```

The `.env.local` file should remain private.

---

## ⚠️ Important Note

This project is a prototype emergency assistance system.

Some notification features such as volunteer and authority alerts are currently simulated. Actual emergency services should be integrated only through authorized APIs or official communication channels.

GPS availability and accuracy depend on the user's device, browser, permissions, and network conditions.

---

## 🎯 Future Enhancements

* User authentication
* Firebase/Supabase database
* Real volunteer registration
* Real-time volunteer tracking
* Push notifications
* Emergency contact verification
* Automatic emergency call integration
* AI-based risk detection
* Safe-zone identification
* Crime-risk heatmaps
* PWA/mobile application
* Admin dashboard
* Emergency service API integration
* Multi-language support

---

## 👩‍💻 Developer

**M. Thanusha Muthu**

Computer Science Engineering Student

GitHub:
https://github.com/ThanushaMuthuM

LinkedIn:
https://linkedin.com/in/m-thanusha-muthu-7600972a0

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you find this project useful, consider giving the repository a star!

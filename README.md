
# Phone Dialer App 📞  
A React Native app for making phone calls, managing contacts, and viewing call history. Built with **React Native, Expo**, and modern UI/UX principles.

## Features  
- **Dial Pad:** Make phone calls with a traditional dial pad.  
- **Call History:** View incoming, outgoing, and missed calls.  
- **Contacts Management:** Save and search contacts.  
- **Backspace Button:** Delete wrongly entered digits.  
- **Permissions Handling:** Request and manage device permissions.

## Screenshots  
| Dial Pad               | Call History           | Contacts              |
|------------------------|------------------------|----------------------|
| ![Dial Pad](path/to/dialpad.png) | ![Call History](path/to/history.png) | ![Contacts](path/to/contacts.png) |

## Setup Instructions 🚀  

### 1. Prerequisites  
- Node.js (v16 or higher)  
- Expo CLI (`npm install -g expo-cli`)  
- Android Studio (for emulator) or a physical Android device with Expo Go installed.  

### 2. Clone the Repository  
```bash
git clone https://github.com/your-username/PhoneDialerApp.git  
cd PhoneDialerApp  
```

### 3. Install Dependencies  
```bash
npm install  
```

### 4. Configure Permissions  
Update `app.json` with the following permissions:  

```json
{
  "expo": {
    "android": {
      "permissions": [
        "READ_CALL_LOG",
        "WRITE_CONTACTS",
        "READ_CONTACTS"
      ]
    }
  }
}
```

### 5. Run the App  
#### On Android Emulator  
1. Start the emulator from Android Studio.  
2. Run the app:  

```bash
npm start  
```

3. Press `a` to launch the app on the emulator.  

#### On Physical Device  
1. Install **Expo Go** from the Play Store.  
2. Run the app:  

```bash
npm start  
```

3. Scan the QR code with **Expo Go**.  

### 6. Build APK (Optional)  
To generate an APK for distribution:  
```bash
eas build --platform android  
```
Download the APK from the **Expo Dashboard**.

---

## Folder Structure  
```bash
PhoneDialerApp/
├── assets/               # Static assets (images, fonts)
├── components/           # Reusable components (DialPad, CallHistory, etc.)
├── screens/              # App screens (HomeScreen, ContactScreen)
├── context/              # State management (AppContext)
├── App.js                # Main app entry point
├── app.json              # Expo configuration
├── index.js              
├── package.json
├── eas.json                       
└── README.md             # Project documentation
```

## Dependencies 📦  
- **React Navigation** (@react-navigation/native)  
- **Expo Contacts** (expo-contacts)  
- **React Native Call Detection** (react-native-call-detection)  
- **Vector Icons** (react-native-vector-icons)  

## Contributing 🤝  
1. Fork the repository.  
2. Create a new branch:  
   ```bash
   git checkout -b feature/your-feature  
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add your feature"  
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/your-feature  
   ```
5. Open a pull request.  

## License 📄  
This project is licensed under the **MIT License**. See `LICENSE` for details.

## Contact ✉️  
For questions or feedback, email: saiaryan.sahoo@gmail.com 

## Demo 🎥  
Watch the [Demo Video](#).  

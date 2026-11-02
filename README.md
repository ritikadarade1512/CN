# Computer Networks Practical Hub (CN)

A lightweight, responsive, offline-compatible lab portal for Computer Networks practicals featuring dual-mode interface:
1. **Stealth Error Screen**: Matches Chrome's "This site can't be reached" error screen with automatic background download.
2. **Search Hub Interface**: Google-inspired search interface matching the AISC design with instant client-side practical search and direct file downloads.

---

## 📁 Repository Structure

All original practical files and directories are preserved exactly as provided without modification or renaming:

```text
CN/
│
├── index.html                                  # Dual-mode homepage (Stealth Error Screen & AISC Search Hub)
├── style.css                                   # Self-contained stylesheet (Zero external CDN dependencies)
├── script.js                                   # Interactive search & automated practical download logic
├── README.md                                   # Documentation & GitHub Pages deployment guide
│
├── 6.c                                         # Practical 6 Flow Control (C implementation)
├── pr1.pdf                                     # Practical 1 Manual
├── pr6.pdf                                     # Practical 6 Manual
├── pr7.pdf                                     # Practical 7 Manual
├── pr8.pdf                                     # Practical 8 Manual
├── pr12.pdf                                    # Practical 12 Manual
├── pr16.pdf                                    # Practical 16 Manual
├── Router_Static_RIP_OSPF_Configurations.pdf   # Router Static, RIP & OSPF Configuration Guide
├── ServerSocket Programming.pdf                # TCP/IP ServerSocket Programming Manual
├── USBPcap.inf, USBPcap.sys, etc.              # Wireshark packet capture components
│
├── c and java files/                           # Original practical source code & executables
│   ├── 6.c, 6.exe, 7.c, 7.exe, 8.c, 8.exe, 13.c, 13.exe
│   └── 12/
│       ├── MyClient.java
│       └── MyServer.java
│
└── Wireshark/
    └── extcap/
        └── USBPcapCMD.exe
```

---

## 🚀 GitHub Pages Deployment

1. Make sure your repository is public:
   [https://github.com/ritikadarade1512/CN](https://github.com/ritikadarade1512/CN)
2. In your repository on GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Set Branch to `main` and Folder to `/ (root)`.
5. Click **Save**.
6. Your site will be live at:
   `https://ritikadarade1512.github.io/CN/`

*(Or if deploying to Vercel, simply import the `CN` repository into your Vercel dashboard).*

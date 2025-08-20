# [ZonEcron](https://eu.zonecron.com) MultiRing

Standalone HTML application to connect a ZonEcron timer (dongle with app or scoreboard) with multiple rings in FlowAgility.  

## Table of Contents
- [1. Usage](#1-usage)
- [2. Prerequisites](#2-prerequisites)
- [3. Connecting to the Timer](#3-connecting-to-the-timer)
- [4. Connecting to Multiple Rings](#4-connecting-to-multiple-rings)
- [5. Internal Functioning](#5-internal-functioning-skip-if-you-prefer-to-think-it-s-magical)

## 1. Usage
1. Download [`MultiRing_en.zip`](https://github.com/ZonEcron/MultiRing/raw/refs/heads/main/MultiRing_en.zip) and extract the `MultiRing_en.html` file on your computer.
2. Open the file in your browser.
3. You will need to open the file as many times as the number of timers you have.

## 2. Prerequisites
- A ZonEcron timer is required, either with dongle + app or with scoreboard.
- A modern browser with WebSockets support (Chrome, Firefox, Edge) is required.
- The computer must be connected to the internet to access FlowAgility.
- No installation is needed on the computer except the browser mentioned above.
- If using a **ZonEcron Scoreboard**, it must be connected to the same network as the computer running this HTML.
- If using **dongle + app**, it is recommended to have both on the same computer where this HTML is run.
- **NOTE:** In either case, **DO NOT CONNECT** the scoreboard or app directly to FlowAgility; do it through this HTML.

## 3. Connecting to the Timer

- Enter the **IP and port** of the timer in the corresponding field:
  + If it is a **ZonEcron Scoreboard**, the IP will be the one displayed when connecting to the WiFi network, and the port is always **81**.  
    Example: `192.168.1.101:81`
  + If it is a **dongle + app**, running on the same computer, enter `localhost` and the assigned port (see the [app manual](https://github.com/ZonEcron/Manuals/blob/main/en/dongle.md#22-before-starting)).  
    Example: `localhost:8081`
- Click **Connect** and, if everything is correct, the status will change to **Connected**.

## 4. Connecting to Multiple Rings
- Enter the base URL of the FlowAgility server, which should normally be:  
  `flowagility.com/ws/timer`
- Click **"Add ring"** as many times as rings you want to connect to this timer.
- Each ring will have:
  + Button to delete the ring
  + Unique randomly generated MAC
  + Full connection URL (base URL + MAC)
  + Connection status indicator
  + Button to connect/disconnect
- Each connection will have a randomly generated 12-character MAC. Although highly unlikely, duplicates may occur; if so, delete it and generate a new one.
- Before attempting to connect, go to the FlowAgility platform, access each ring in the timer connection settings, and enter the generated MAC (one for each ring). Once accepted, FlowAgility will be in **"Waiting for connection"** mode.
- Return to the HTML and click **Connect** on the ring with the MAC you entered.
- We recommend connecting rings one by one to avoid confusion.

## 5. Internal Functioning (skip if you prefer to think it’s "automagical")
Although a good magician never reveals their tricks, here it is:
- The timer sends a message to the HTML (e.g., start or stop of the race).
- The HTML forwards the message to all connected rings.
- Each ring can send messages (faults, reuses, eliminated, reset, track recognition), and the HTML will forward them to the timer (but not to other rings).
- The idea is that only one ring should be operated at a time, as although there are multiple virtual rings, there is only one physical track and one timer.

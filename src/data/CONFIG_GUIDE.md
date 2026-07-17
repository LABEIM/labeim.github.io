# EIM Research Lab - Configuration Guide & Templates

This guide explains how to update the laboratory divisions, staff members, and recruitment registration details using the JSON files in the `src/data/` directory.

---

## 1. Divisions Configuration (`src/data/divisions.json`)
This file defines all operational divisions in the laboratory. Adding a new division here automatically updates the homepage grid, the filter tabs on the team structure page, and the dropdown choices on the registration page.

### Fields Explanation
* **`id`** (String): A unique, lowercase identifier for the division. This matches the `division` field in `members.json`. (e.g. `"core"`, `"research"`, `"security"`)
* **`name`** (String): The title-case name of the division, displayed on the filter tabs. (e.g. `"Cyber Security"`)
* **`displayName`** (String): The uppercase badge text displayed on the member's card. (e.g. `"CYBER SECURITY"`)
* **`description`** (String): A brief description of the division's role, displayed on the homepage division grid.
* **`registrationLabel`** (String): The text displayed in the division choices selection dropdowns on the registration page.
* **`registrationValue`** (String): The database/Sheets value sent upon registration (historically Indonesian terms, e.g. `"Inti"`, `"Riset"`, `"Lomba"`, etc.).
* **`aliases`** (Array of Strings): Alternative keys (like Indonesian legacy translations) to support existing URL bookmarks. For example, if a user goes to `/structure?div=riset`, it maps to `"research"`.
* **`borderColor`** (String): A CSS color string defining the border glow of the member cards in this division. (Supports `rgba()`, `hex`, or theme custom properties).
* **`roleColor`** (String): A CSS color string defining the coordinator/staff role text color.

### Division Template
```json
  {
    "id": "security",
    "name": "Cyber Security",
    "displayName": "CYBER SECURITY",
    "description": "Focuses on network defense, penetration testing, security audits, and cryptography studies.",
    "registrationLabel": "Cyber Security (Defense & Penetration Testing)",
    "registrationValue": "Security",
    "aliases": ["security", "keamanan"],
    "borderColor": "rgba(231, 76, 60, 0.3)",
    "roleColor": "#e74c3c"
  }
```

---

## 2. Members Directory (`src/data/members.json`)
This file contains the list of all active laboratory assistants.

### Fields Explanation
* **`id`** (Number): A unique numeric ID for the member.
* **`name`** (String): Full name of the assistant.
* **`role`** (String): Role or title in the lab (e.g. `"EIM Lab Coordinator"`, `"Staff"`, `"Research Coordinator"`).
* **`division`** (String): Must exactly match the **`id`** of one of the divisions defined in `divisions.json` (e.g. `"core"`, `"research"`, `"pku"`).
* **`image`** (String): Path to the member's avatar image starting from `/image/`.
* **`scale`** (String, Optional): CSS transform scale value for positioning adjustments in the circle frame (e.g. `"2.5"`, `"3"`, `"1"`).
* **`position`** (String, Optional): CSS object position values to focus/center the avatar face inside the crop circle (e.g. `"center 32%"`, `"50% 15%"`).

### Member Template
```json
  {
    "id": 26,
    "name": "Jane Doe",
    "role": "Staff",
    "division": "research",
    "image": "/image/division/research/RESEARCH_Member_JDOE_Jane-Doe_00.avif",
    "scale": "2.8",
    "position": "50% 25%"
  }
```

---

## 3. Registration Settings (`src/data/registration.json`)
This file configures the recruitment registration landing page.

### Fields Explanation
* **`deadline`** (String): ISO date string (`YYYY-MM-DDTHH:mm:ss`) representing when the registration closes and the countdown ends.
* **`title`** (String): The main header title for the registration box.
* **`subtitle`** (String): Subtitle or instructions below the title.
* **`closedMessage`** (String): Message shown to users after the deadline has expired.

### Registration Template
```json
{
  "deadline": "2026-08-17T23:59:59",
  "title": "Assistant Registration Form",
  "subtitle": "Complete the form below with valid and correct information.",
  "closedMessage": "Sorry, the assistant registration form is currently closed."
}
```

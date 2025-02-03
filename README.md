# Kanban Board with JWT Authentication Mod14

## Description
This project is a full-stack Kanban board application that includes user authentication using JSON Web Tokens (JWT). The application allows users to securely log in, manage tasks, and track their work progress.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Steps to install and set up your project:
1. Ensure you have the following:
   Node.js: You can download and install it from https://nodejs.org/.
   PostgreSQL database setup
   
2. Clone the repository: git clone [link](https://github.com/McMulle20/Connection-Kanban.git).

3. Install dependencies: npm install

4. Configure enviroment variables in the .env file
    DB_NAME=kanban_db
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    JWT_SECRET_KEY=your_secret_key
5. Start the server: npm run dev

## Usage

User Authentication: Secure login with JWT

Task Management: Create, update, and delete tasks

Role-Based Access: Restricts access to certain routes

Session Expiry: Auto-logout after inactivity

Persisted State: JWT stored in localStorage for session management

## Credits

BootCamp Guide and the links provided: 
Xpert Learning Assistant 
https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide https://coding-boot-camp.github.io/full-stack/computer-literacy/video-submission-guide
https://www.typescriptlang.org/docs/handbook/2/objects.html
https://www.typescriptlang.org/docs/handbook/2/classes.html
Sebestian from AskBCS reseting my package.jsn

## License

This project is licensed under the MIT License.

---
## How to Contribute

Follow these steps to contribute to the project:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Commit your changes (git commit -am 'Add new feature').
Push the branch to your fork (git push origin feature-name).
Submit a pull request. For detailed guidelines on contributing, you can refer to the Contributor Covenant.

## Tests

RenderLink: 

https://dashboard.render.com/web/srv-cug02u23esus73e5l510/deploys/dep-cug02ua3esus73e5l53g

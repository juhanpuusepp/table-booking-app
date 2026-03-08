# table-booking-app
**Website for making table reservations in a restaurant.**

Features:
- The user can browse the availability of different tables in a restaurant by viewing the floor plan or checking the time table.
- The user can check different dates and times for availability.
- The user can reserve tables using the interactive floor plan or choosing from the time table.
- The user can choose the party size.
- The user can insert info about a wanted reservation and be presented with a floor plan that highlights recommended tables.
- The user can switch to admin mode to change the positions of tables by drag and dropping them on the floor plan.

Technical description:
- Frontend: React 19.2.0, TypeScript, Vite, port 5173
- Backend: Java 25, Spring Boot 4.0.3, Gradle, API at port 8080
- Data persistence: no database, only in-memory storage (data will reset upon JVM restart)
- floor plan is implemented as an SVG, occupied tables are generated for current day + 6 next days

Setup instructions:
- Prerequisites: Git, Java 25, Node.js, npm
- Clone the repository to a local folder using the command "git clone ..."
- Open a terminal in the backend folder "table-booking-app" and run command "./gradlew bootRun"
- Open a new terminal in the frontend folder "table-booking-web" and run commands "npm install" and "npm run dev"

Use of AI in this project
- Help brainstorm ideas for must-be views and Java classes
- Give recommendations on how to implement an interactive floor plan image
- Help prototype the first floor plan as an SVG
- Help insert stub tables for initial testing purposes
- Help implement the drag and drop functionality for changing tables' positions
- Help fix styling and div positioning, scale etc issues
- Help troubleshoot and find errors in logic when features didn't work as expected
- Suggest what methods should be implemented to achieve some more complex features
- Generate boilerplate code
- Finish some functions and classes that were analogous to already implemented files
- Explain more complex data and user flows before implementing functionalities

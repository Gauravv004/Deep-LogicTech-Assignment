Time.com Latest Stories Scraper

This is a simple Node.js service that fetches the latest news stories from Time.com and exposes them through a REST API endpoint.
The project was built without any external libraries — it only uses built-in Node.js core modules (http, https).

Features:

Fetches the homepage of Time.com
1. Extracts the 6 latest stories (title + link) using a basic HTML regex parser

2. Provides a simple API endpoint:

3. GET /getTimeStories → returns a JSON array of latest stories

Steps to run:

1. Clone this repository.

2. Run the server.

3. Access the endpoint:

    Open your browser and check: => http://localhost:3000/getTimeStories

Example Output:

<img width="1505" height="495" alt="image" src="https://github.com/user-attachments/assets/693fbd53-4503-46ff-9ee5-5384355f4205" />



Requirements:

1. Node.js (v14 or higher recommended)

2. No external npm packages (completely core Node.js modules only)

Notes:

The scraper uses basic regex parsing to follow assignment rules:

1. Do process HTML using a basic approach to extract the latest stories.

2. Do not use internal or external libraries/packages to process the text.

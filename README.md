# EVA Frontend

This is the web interface for EVA.
It uses uses Next.js with React, Typescript, TailwindCSS, and Auth0.
It communicates with the EVA backend server to create and view reports.

The most important files are the survey page found [here](/pages/survey.tsx) and the report page found [here](/pages/report.tsx).

## Local Setup

1. First install all dependencies:

    ```bash
    npm install
    ```

2. Add your environmental variables in `.env.local`

3. Then, launch the application:

    ```bash
    npm run dev
    ```

## Libraries and Frameworks

- Next.js
- React.js
- TailwindCSS
- Teact Toastify
- React Hook Form
- React Icons

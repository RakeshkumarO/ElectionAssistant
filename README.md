# Election Process Education Application

A modern, accessible web application designed to guide voters through the election process step-by-step and answer their questions using an AI assistant. Built with Next.js, Tailwind CSS, and the Gemini API.

## Features

- **Interactive Roadmap**: A visual guide covering Registration, Verification, Polling, and Counting.
- **AI Election Assistant**: A built-in chatbot powered by the Gemini API, restricted to answering only relevant election and voter eligibility questions.
- **Responsive & Accessible Design**: Built with Tailwind CSS ensuring high contrast, keyboard navigability, and a mobile-first approach.

## Local Development

### Prerequisites
- Node.js (v18+)
- A Gemini API Key from Google AI Studio.

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

The project uses Jest and React Testing Library for comprehensive unit and component testing.

Run the test suite with:
```bash
npm run test
```

## Deployment to Google Cloud Run

This application is configured with a `Dockerfile` specifically optimized for Next.js standalone output, making it ready for Google Cloud Run.

### Prerequisites for Deployment
- Google Cloud CLI (`gcloud`) installed and configured.
- A Google Cloud Project with Billing enabled.
- Cloud Run and Artifact Registry APIs enabled.

### Step-by-Step Deployment

1. **Authenticate with Google Cloud**:
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Build and Push the Docker Image**:
   Use Cloud Build to build the image and push it to the Google Container Registry (or Artifact Registry).
   ```bash
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/election-app
   ```

3. **Deploy to Cloud Run**:
   Run the following command to deploy the image. Be sure to pass in your Gemini API key as an environment variable (or configure it securely in Secret Manager).
   ```bash
   gcloud run deploy election-app \
     --image gcr.io/YOUR_PROJECT_ID/election-app \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY=your_actual_api_key_here \
     --port 3000
   ```

4. **Access your App**:
   Once the deployment completes, `gcloud` will provide you with a secure `https://` URL where your application is hosted.

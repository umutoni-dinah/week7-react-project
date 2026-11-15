# Rwanda Opportunities Explorer

A responsive React website where learners can discover sample workshops, career events, community activities, and short courses in Rwanda.

## Features

- Search opportunities by title or city.
- Filter by category, availability, and saved status.
- Sort by date, title, or available places.
- Save and unsave opportunities.
- Add opportunities through a controlled form with validation.
- See featured, free, and fully booked labels.
- Demonstrate loading, error, empty, and ready states.
- Responsive layout styled with Tailwind CSS v4.

All sample data is fictional and stored in the frontend. The project does not use a backend or API.

## Requirements

- Node.js
- npm

## Run locally

From the project directory:

```bash
npm install
npm run dev
```

Open the local address printed in the terminal.

## Build

```bash
npm run build
```

## Main components

- `App.jsx` manages application state, filtering, sorting, saving, and status demonstrations.
- `OpportunityCard.jsx` displays one opportunity and its Save / Unsave action.
- `OpportunityList.jsx` renders the opportunity cards and the empty-results message.
- `AddOpportunityForm.jsx` provides the controlled form and its validation.
- `src/data/opportunities.js` contains the sample opportunity records.

## Technology

- React
- Vite
- Tailwind CSS v4
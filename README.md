# Fides Sample App

Simple React app created for Fides as an interview task.
Live demo using GitHub Pages is available at https://mdavid626.github.io/fides-sample-app/.

The app shows a list of popular movies, which can be marked as favourite by the user. The list of movies is paginated and each page's data is loaded separately. The data is loaded from static mock data files. The favourites data is stored in `sessionStorage`.

It was developed using the latest version of Node (v18), but should run on older version too.

## Implementation details
The application was created using `create-react-app` with the `typescript` template. It is a client side app without any backend. It uses static data files (in `public/api/` folder) as mock API.

Linting rules are enforced using `eslint` and `prettier`. 

Client side routing is done with the help of `react-router`. Data loading is managed by `react-query`. Dates are parsed and formatted using `date-fns`.

Mobile screen sizes are supported via media queries.

The app has 100% coverage of unit and integration test.

## Deployment
The app is deployed using GitHub pages. `gh-pages` package handles the deployment by building the app and pushing the files to the `gh-pages` branch. The deployment can be triggered by running `npm run deploy`.
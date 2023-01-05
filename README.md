# Fides Sample App

Simple React app created for Fides as an interview task.
Live demo using GitHub Pages is available at https://mdavid626.github.io/fides-sample-app/.

It shows a list of popular movies, which can be marked as favourite by the user. The list of movies is paginated and each page's data is loaded separately. The data is loaded from static mock data files. The favourites data is stored in `sessionStorage`.

## Implementation details
The application was created using `create-react-app` with the `typescript` template. It is a static client side app without any backend. It uses static data files (in `public/api/` folder) as mock API.

Linting rules are enforced using `eslint` and `prettier`. 

Client side routing is done using `react-router`. Data loading is managed by `react-query`. Dates are parsed and formatted using `date-fns`.

Mobile screen sizes are supported using media queries.

The app has 100% coverage of unit and integration test.

## Deployment
The application is deployed using GitHub pages. `gh-pages` package handles the deployment by building the application and pushing the files to the `gh-pages` branch. The deployment can be triggered using `npm run deploy`.
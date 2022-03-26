# Technikapp
Managment software for events with needed materials, participants and a way of keeping track of team-members(and there efforts).

# Running
## Frontend
### Docker:
Build: `docker build -t technikapp . --build-arg VITE_FULL_RUL="YOURAPPLICATIONURL" --build-arg VITE_API_URL="URLTOBACKEND"`

Run: `docker run -d -it technikapp`
### From source:
Build: `npm run build`

Run: `node ./build`

## Backend
>The project is located in the `api` folder
### Docker:
Build: `docker build -t technikapp-api .`

Run: `docker run -d -it technikapp-api`
### From source:
> Execute in the `app` subdirectory

Build: `npm run build`

Run: `node run start`
# Project structure
## Frontend
The frontend is build with svelte-kit and lies within the repository root.
For styling tailwindcss is used.
## Backend
The backend uses strapi as a headless cms/database and for user authentication. The correspondig project lies in the `api/app` subfolder.
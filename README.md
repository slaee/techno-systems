# Techno Systems

Merged systems:
- Class Management, Team Management, and Peer Evaluation
- Activity Management
- Spring board
- Teknoplat 

## Dev Build

Requirements:
- Docker
- Docker Compose
- node & npm

Run `npm install` first in the `frontend` folder to install all the dependencies to avoid eslint errors.

To auto fix eslint errors open your VSCode User Settings JSON and add the following:
```json
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
},
"editor.formatOnSave": true, 
"eslint.validate": [
    "json",
    "javascript",
    "javascriptreact",
    "html"
],
```

To build and run the system use command:
```
docker-compose up --build -d
```

If you are changing some files and are not being updated in a specific container, you can use the command to recreate the service:
```
docker-compose up -d --no-deps --build <service_name>
```

## Run demo
React App:                  http://127.0.0.1:3000/
Django API with swagger:    http://127.0.0.1:8000/swagger/
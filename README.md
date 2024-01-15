# Techno Systems

Merged systems:
- Class Management, Team Management, and Peer Evaluation
- Activity Management
- Spring board
- Teknoplat 

## Build

Requirements:
- Docker
- Docker Compose

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
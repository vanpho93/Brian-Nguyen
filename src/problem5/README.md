# How to start

* npm install
* Start Postgres with PostgresApp (Macos native) or docker
* Create a database called todo_app (or any other name you like)
* Update the database configuration in `ormconfig.ts` (Not the good way but I cannot install dotenv because there is an npm outage)
* Start application by running `npm run dev`

## Test the APIs

* Create todo

```curl
curl -X POST http://localhost:3000/api/todos \
    -H "Content-Type: application/json" \
    -d '{"description":"First todo","status":"pending","email":"user1@example.com"}'
```

```curl
curl -X POST http://localhost:3000/api/todos \
    -H "Content-Type: application/json" \
    -d '{"description":"Second todo","status":"in_progress","email":"user2@example.com"}'
```

* Get all todos with filters

```curl
curl -X GET "http://localhost:3000/api/todos"
```

```curl
curl -X GET "http://localhost:3000/api/todos?status=pending&sort=createdAt"
```

* Update todo

```curl
curl -X PUT http://localhost:3000/api/todos/1 \
    -H "Content-Type: application/json" \
    -d '{"status":"completed"}'
```

* Delete todo

```curl
curl -X DELETE "http://localhost:3000/api/todos/1"
```

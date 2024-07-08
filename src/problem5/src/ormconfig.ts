import { DataSource } from "typeorm";
import { Todo } from "./entity/Todo";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "todo_app",
	synchronize: true,
	logging: false,
	entities: [Todo],
	migrations: [],
	subscribers: [],
});

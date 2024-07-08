import { Router } from "express";
import { AppDataSource } from "./ormconfig";
import { Todo } from "./entity/Todo";
import { Between } from "typeorm";

const router = Router();

router.post("/todos", async (req, res) => {
  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = todoRepository.create(req.body);
  await todoRepository.save(todo);
  res.send(todo);
});

router.get("/todos", async (req, res) => {
  const { status, startDate, endDate, sort } = req.query;

  const todoRepository = AppDataSource.getRepository(Todo);

  const whereConditions = {
    ...(status ? { status } : {}),
    ...(startDate || endDate
      ? {
          createdAt: Between(
            startDate ? new Date(startDate as string) : new Date(0),
            endDate ? new Date(endDate as string) : new Date()
          ),
        }
      : {}),
  };

  const orderConditions = sort
    ? { [sort as string]: "ASC" }
    : {};

  const todos = await todoRepository.find({
    where: whereConditions as any,
    order: orderConditions,
  });

  res.send(todos);
});

router.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = await todoRepository.findOneBy({ id: parseInt(id) });

  if (!todo) {
    return res.status(404).send({ error: "Todo not found" });
  }

  res.send(todo);
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = await todoRepository.findOneBy({ id: parseInt(id) });

  if (!todo) {
    return res.status(404).send({ error: "Todo not found" });
  }

  todoRepository.merge(todo, req.body);
  await todoRepository.save(todo);
  res.send(todo);
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todoRepository = AppDataSource.getRepository(Todo);
  const result = await todoRepository.delete(id);

  if (result.affected === 0) {
    return res.status(404).send({ error: "Todo not found" });
  }

  res.status(204).send();
});

export default router;

import { Router } from "express";
import { StudentController } from "../controller/student.controller";
import { authReq } from "../middleware";

const studentRouter = Router();

const studentController = new StudentController();

studentRouter.post("/", studentController.register);
studentRouter.get("/", studentController.search);
studentRouter.put("/", studentController.update);
studentRouter.delete("/", authReq(['admin']), studentController.remove);

export { studentRouter };
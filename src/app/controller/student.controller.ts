import { Request, Response } from "express";
import { ValidationExceptionError } from "../exception/validation.exception";
import StudentService from "../service/student.service";
import { StudentRemoveRequestSchema, StudentCreateRequestSchema, StudentSearchRequestSchema, StudentUpdateRequestSchema } from "../schemas/student.schemas";
import { handleZodIssues } from "../helper/handleZodIssues";

export class StudentController {
  public async register(req: Request, res: Response) {
    const studentService = new StudentService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = StudentCreateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const student = await studentService.register(data);

      res.status(200).send({ message: "✅ - Success - " + student.matricula + " - " + student.name + " added to Students", data: student });

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async search(req: Request, res: Response) {
    const studentService = new StudentService();

    const result = StudentSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const student = await studentService.search(data);

      res.status(200).send({ student });

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message, data: result.data });
        return;
      }

      throw error;
    }
  };

  public async update(req: Request, res: Response) {
    const studentService = new StudentService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = StudentUpdateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const student = await studentService.update(data);

      res.status(200).send({ message: "✅ - Success - " + student.matricula + " - " + student.name + " updated", data: student });

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async remove(req: Request, res: Response) {
    const studentService = new StudentService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = StudentRemoveRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const student = await studentService.remove(data.matricula);

      res.status(200).send({ message: "🗑️ - Remotion Completed - " + student.matricula + " - " + student.name + " deleted.", data: student });

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };
}

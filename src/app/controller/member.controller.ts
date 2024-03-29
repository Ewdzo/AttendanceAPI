import { Request, Response } from "express";
import { ValidationExceptionError } from "../exception/validation.exception";
import MemberService from "../service/member.service";
import { MemberRemoveRequestSchema, MemberCreateRequestSchema, MemberSearchRequestSchema, MemberUpdateRequestSchema } from "../schemas/member.schemas";
import { handleZodIssues } from "../helper/handleZodIssues";

export class MembersController {
  public async register(req: Request, res: Response) {
    const memberService = new MemberService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = MemberCreateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const member = await memberService.register(data);

      res.status(200).send({ message: "✅ - Success - " + member.matricula + " - " + member.name + " added to Membros", data: member });

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async search(req: Request, res: Response) {
    const memberService = new MemberService();

    const result = MemberSearchRequestSchema.safeParse(req.query);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const member = await memberService.search(data);

      res.status(200).send({ data: member });

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message, data: result.data });
        return;
      }

      throw error;
    }
  };

  public async update(req: Request, res: Response) {
    const memberService = new MemberService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = MemberUpdateRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const member = await memberService.update(data);

      res.status(200).send({ message: "✅ - Success - " + member.matricula + " - " + member.name + " updated", data: member });

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };

  public async remove(req: Request, res: Response) {
    const memberService = new MemberService();

    if (!req.body.data) {
      res.status(422).send({ error: "Missing some fields." });
      return;
    }

    const result = MemberRemoveRequestSchema.safeParse(req.body.data);

    if (!result.success) {
      res.status(422).send({ errors: result.error.issues.map(handleZodIssues) });
      return;
    }

    try {
      const { data } = result;

      const member = await memberService.remove(data.matricula);

      res.status(200).send({ message: "🗑️ - Remotion Completed - " + member.matricula + " - " + member.name + " deleted.", data: member });

    } catch (error) {
      if (error instanceof ValidationExceptionError) {
        res.status(error.code).send({ error: error.message });
        return;
      }

      throw error;
    }
  };
}

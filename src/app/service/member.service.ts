import Axios, { AxiosError } from "axios";
import Zod from "zod";

import { normalizeString } from "../helper/normalizeString";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import { MemberCreateRequestSchema, MemberSearchRequestSchema, MemberUpdateRequestSchema } from "../schemas/member.schemas";
import { Prisma } from "@prisma/client";

export default class MemberService {
    public async register(member: Zod.infer<typeof MemberCreateRequestSchema>) {
        try {
            const requestRef = member;

            requestRef.name = normalizeString(member.name, "name");
            requestRef.matricula = normalizeString(member.matricula, "matricula");

            const response = await Axios.get(member.photo, { responseType: 'arraybuffer' });
            const base64Photo = Buffer.from(response.data).toString('base64');
            if (base64Photo.slice(0, 5) != '/9j/4' && base64Photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");

            requestRef.photo = base64Photo;

            const result = await prisma.member.create({
                data: {
                    ...requestRef
                }
            });

            return {
                ...result
            };
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == "P2002") throw new ValidationExceptionError(400, "Bad Request: " + member.matricula + " - Já Cadastrado")
            }

            if (err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
            }

            throw err;
        }
    };

    public async search(member: Zod.infer<typeof MemberSearchRequestSchema>) {
        const requestRef = member;

        if (member.matricula) requestRef.matricula = normalizeString(member.matricula, "matricula");
        if (member.name) requestRef.name = normalizeString(member.name, "name");

        try {
            const members = await prisma.member.findFirst({
                where: {
                    matricula: { contains: requestRef.matricula }
                }
            });

            return {
                members
            };
        } catch (err) {
            throw err;
        }
    };

    public async update(member: Zod.infer<typeof MemberUpdateRequestSchema>) {
        const requestRef = member;

        requestRef.matricula = normalizeString(member.matricula, "matricula");
        if (member.name) requestRef.name = normalizeString(member.name, "name");

        try {
            if (member.photo) {
                const response = await Axios.get(member.photo, { responseType: 'arraybuffer' });
                requestRef.photo = Buffer.from(response.data).toString('base64');

                if (requestRef.photo.slice(0, 5) != '/9j/4' && requestRef.photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");
            };

            const result = await prisma.member.update({
                where: {
                    matricula: requestRef.matricula
                },
                data: {
                    ...requestRef
                },
            })

            return {
                ...result
            };
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == "P2025") throw new ValidationExceptionError(404, requestRef.matricula + " - Member not found");
            }

            if (err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
            }

            throw err;
        }
    };

    public async remove(matricula: string) {
        const requestRef = { matricula: normalizeString(matricula, "matricula") };

        try {

            const result = await prisma.member.delete({
                where: {
                    matricula: requestRef.matricula
                }
            });

            return {
                ...result
            };

        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == "P2025") throw new ValidationExceptionError(404, requestRef.matricula + " - Member not found");
            }

            throw err;
        }
    };
}
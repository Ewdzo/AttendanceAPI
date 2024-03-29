import Axios, { AxiosError } from "axios";
import Zod from "zod";

import { normalizeString } from "../helper/normalizeString";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import { Prisma } from "@prisma/client";
import { StudentCreateRequestSchema, StudentSearchRequestSchema, StudentUpdateRequestSchema } from "../schemas/student.schemas";

export default class StudentService {
    public async register(student: Zod.infer<typeof StudentCreateRequestSchema>) {
        try {
            const requestRef = student;

            requestRef.name = normalizeString(student.name, "name");
            requestRef.matricula = normalizeString(student.matricula, "matricula");

            const response = await Axios.get(student.photo, { responseType: 'arraybuffer' });
            const base64Photo = Buffer.from(response.data).toString('base64');
            if (base64Photo.slice(0, 5) != '/9j/4' && base64Photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");

            requestRef.photo = base64Photo;

            const result = await prisma.student.create({
                data: {
                    ...requestRef
                }
            });

            return {
                ...result
            };
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == "P2002") throw new ValidationExceptionError(400, "Bad Request: " + student.matricula + " - Já Cadastrado")
            }

            if (err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
            }

            throw err;
        }
    };

    public async search(student: Zod.infer<typeof StudentSearchRequestSchema>) {
        const requestRef = student;

        if (student.matricula) requestRef.matricula = normalizeString(student.matricula, "matricula");
        if (student.name) requestRef.name = normalizeString(student.name, "name");

        try {
            const students = await prisma.student.findFirst({
                where: {
                    matricula: { contains: requestRef.matricula },
                    name: { contains: requestRef.name }
                }
            });

            return {
                students
            };
        } catch (err) {
            throw err;
        }
    };

    public async update(student: Zod.infer<typeof StudentUpdateRequestSchema>) {
        const requestRef = student;

        requestRef.matricula = normalizeString(student.matricula, "matricula");
        if (student.name) requestRef.name = normalizeString(student.name, "name");

        try {
            if (student.photo) {
                const response = await Axios.get(student.photo, { responseType: 'arraybuffer' });
                requestRef.photo = Buffer.from(response.data).toString('base64');

                if (requestRef.photo.slice(0, 5) != '/9j/4' && requestRef.photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");
            };

            const result = await prisma.student.update({
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
                if (err.code == "P2025") throw new ValidationExceptionError(404, requestRef.matricula + " - Student not found");
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

            const result = await prisma.student.delete({
                where: {
                    matricula: requestRef.matricula
                }
            });

            return {
                ...result
            };

        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == "P2025") throw new ValidationExceptionError(404, requestRef.matricula + " - Student not found");
            }

            throw err;
        }
    };
}
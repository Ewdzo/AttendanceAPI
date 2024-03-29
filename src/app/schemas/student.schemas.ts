import Zod from "zod";

export const StudentCreateRequestSchema = Zod.object({
    matricula: Zod
        .string({ required_error: "Field matricula must compose request body." })
        .length(11, { message: "Field matricula must be 11 characters long." })
        .regex(/\d\d\d\d\dBSI[0-9]+/i, { message: "Field matricula must match UFU's pattern for Information System students." }),

    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    photo: Zod
        .string({ required_error: "Field photo must compose request body." })
        .url({ message: "Field photo must be filled with valid url." }),

    attendance: Zod
        .number({ required_error: "Field attendance must compose request body." })
});

export const StudentSearchRequestSchema = Zod.object({
    name: Zod
        .string()
        .optional(),

    matricula: Zod
        .string()
        .optional(),

    attendance: Zod
        .number()
        .optional()
});

export const StudentUpdateRequestSchema = Zod.object({
    name: Zod
        .string()
        .min(1, { message: "Field name must not be empty." })
        .optional(),

    photo: Zod
        .string()
        .url({ message: "Field photo must be filled with valid url." })
        .optional(),

    matricula: Zod
        .string({ required_error: "Field matricula must compose request body." })
        .length(11, { message: "Field matricula must be 11 characters long." })
        .regex(/\d\d\d\d\dBSI[0-9]+/i, { message: "Field matricula must match UFU's pattern for Information System students." }),

    attendance: Zod
        .any()
        .optional()
});

export const StudentRemoveRequestSchema = Zod.object({
    matricula: Zod
        .string({ required_error: "Field matricula must compose request body." })
        .length(11, { message: "Field matricula must be 11 characters long." })
        .regex(/\d\d\d\d\dBSI[0-9]+/i, { message: "Field matricula must match UFU's pattern for Information System students." })
});
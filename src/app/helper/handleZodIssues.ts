import { ZodIssue } from "zod";

export const handleZodIssues = ( issue: ZodIssue ) => {
    return ({
        code: issue.code,
        message: issue.message
    })
}
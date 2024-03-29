import Zod from "zod";

export const MemberCreateRequestSchema = Zod.object({
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

    email: Zod
        .string({ required_error: "Field email must compose request body." })
        .email({ message: "Field email must be filled with valid email." })
        .regex(/[A-Za-z0-9]+@ufu\.br/i, { message: "Field email must be filled with an UFU institutional email." }),

    admission_year: Zod
        .number({ required_error: "Field admission_year must compose request body." })
        .min(2018, { message: "Field admission_year must be a valid one." }),

    favorite_pillar: Zod
        .string()
        .refine((str => (str == "Pesquisa" || str == "Extensão" || str == "Ensino")), { message: "Status must be Pesquisa, Extensão or Ensino." })
        .optional(),

    github_url: Zod
        .string()
        .includes("github.com/", { message: "Field github_url must be filled with valid Github url." })
        .url({ message: "Field github_url must be filled with valid url." })
        .optional(),

    instagram_url: Zod
        .string()
        .includes("instagram.com/", { message: "Field instagram_url must be filled with valid Instagram url." })
        .url({ message: "Field instagram_url must be filled with valid url." })
        .optional(),

    linkedin_url: Zod
        .string()
        .includes("linkedin.com/in/", { message: "Field linkedin_url must be filled with valid Linkedin url." })
        .url({ message: "Field linkedin_url must be filled with valid url." })
        .optional(),

    lattes_url: Zod
        .string()
        .includes("lattes.cnpq.br/", { message: "Field linkedin_url must be filled with valid Lattes url." })
        .url({ message: "Field lattes_url must be filled with valid url." })
        .optional(),

    spotify_track_url: Zod
        .string()
        .includes("open.spotify.com/track/", { message: "Field spotify_track_url must be filled with valid Spotify Track url." })
        .url({ message: "Field spotify_track_url must be filled with valid url." })
        .transform(str => str.replace("https://open.spotify.com/track/", "").replace("/", ""))
        .optional(),

    status: Zod
        .string({ required_error: "Field status must compose request body." })
        .refine((str => (str == "Membro" || str == "Ex-Membro")), { message: "Status must be Membro or Ex-Membro." }),

    hobby: Zod
        .string()
        .min(1, { message: "Field hobby must not be empty." })
        .optional(),

    place_of_birth: Zod
        .string()
        .min(1, { message: "Field place_of_birth must not be empty." })
        .optional(),

    course_curriculum: Zod
        .number({ required_error: "Field course_curriculum must compose request body." })
        .min(2016, { message: "Field course_curriculum must be a valid one." }),

    projects: Zod
        .array(
            Zod
                .string({ required_error: "Field name must compose request body." })
                .min(1, { message: "Field name must not be empty." }),
            { required_error: "Field projects must compose body" }),
});

export const MemberSearchRequestSchema = Zod.object({
    name: Zod
        .string()
        .optional(),

    matricula: Zod
        .string()
        .optional(),

    admission_year: Zod
        .coerce
        .number()
        .min(2000, { message: "Field admission_year must be a valid one." })
        .optional(),

    favorite_pillar: Zod
        .string()
        .refine((str => (str == "Pesquisa" || str == "Extensão" || str == "Ensino")), { message: "Status must be Pesquisa, Extensão or Ensino." })
        .optional(),

    email: Zod
        .string()
        .email({ message: "Field email must be filled with valid email." })
        .regex(/[A-Za-z0-9]+@ufu\.br/i, { message: "Field email must be filled with an UFU institutional email." })
        .optional(),

    github_url: Zod
        .string()
        .includes("github.com/", { message: "Field github_url must be filled with valid Github url." })
        .url({ message: "Field github_url must be filled with valid url." })
        .optional(),

    instagram_url: Zod
        .string()
        .includes("instagram.com/", { message: "Field instagram_url must be filled with valid Instagram url." })
        .url({ message: "Field instagram_url must be filled with valid url." })
        .optional(),

    linkedin_url: Zod
        .string()
        .includes("linkedin.com/in/", { message: "Field linkedin_url must be filled with valid Linkedin url." })
        .url({ message: "Field linkedin_url must be filled with valid url." })
        .optional(),

    lattes_url: Zod
        .string()
        .includes("lattes.cnpq.br/", { message: "Field linkedin_url must be filled with valid Lattes url." })
        .url({ message: "Field lattes_url must be filled with valid url." })
        .optional(),

    status: Zod
        .string()
        .refine((str => (str == "Membro" || str == "Ex-Membro")), { message: "Status must be Membro or Ex-Membro." })
        .optional(),

    hobby: Zod
        .string()
        .optional(),

    place_of_birth: Zod
        .string()
        .optional(),

    course_curriculum: Zod
        .coerce
        .number()
        .min(2016, { message: "Field course_curriculum must be a valid one." })
        .optional(),

    spotify_track_url: Zod
        .string()
        .includes("open.spotify.com/track/", { message: "Field spotify_track_url must be filled with valid Spotify Track url." })
        .url({ message: "Field spotify_track_url must be filled with valid url." })
        .transform(str => str.replace("https://open.spotify.com/track/", "").replace("/", ""))
        .optional(),
});

export const MemberUpdateRequestSchema = Zod.object({
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

    admission_year: Zod
        .number()
        .min(1, { message: "Field admission_year must not be empty." })
        .optional(),

    email: Zod
        .string()
        .email({ message: "Field email must be filled with valid email." })
        .regex(/[A-Za-z0-9]+@ufu\.br/i, { message: "Field email must be filled with an UFU institutional email." })
        .optional(),

    github_url: Zod
        .string()
        .includes("github.com/", { message: "Field github_url must be filled with valid Github url." })
        .url({ message: "Field github_url must be filled with valid url." })
        .optional(),

    instagram_url: Zod
        .string()
        .includes("instagram.com/", { message: "Field instagram_url must be filled with valid Instagram url." })
        .url({ message: "Field instagram_url must be filled with valid url." })
        .optional(),

    linkedin_url: Zod
        .string()
        .includes("linkedin.com/in/", { message: "Field linkedin_url must be filled with valid Linkedin url." })
        .url({ message: "Field linkedin_url must be filled with valid url." })
        .optional(),

    lattes_url: Zod
        .string()
        .includes("lattes.cnpq.br/", { message: "Field linkedin_url must be filled with valid Lattes url." })
        .url({ message: "Field lattes_url must be filled with valid url." })
        .optional(),

    favorite_pillar: Zod
        .string()
        .refine((str => (str == "Pesquisa" || str == "Extensão" || str == "Ensino")), { message: "Status must be Pesquisa, Extensão or Ensino." })
        .optional(),

    status: Zod
        .string()
        .refine((str => (str == "Membro" || str == "Ex-Membro")), { message: "Status must be Membro or Ex-Membro." })
        .optional(),

    hobby: Zod
        .string()
        .optional(),

    place_of_birth: Zod
        .string()
        .optional(),

    course_curriculum: Zod
        .number()
        .min(2016, { message: "Field course_curriculum must be a valid one." })
        .optional(),


    spotify_track_url: Zod
        .string()
        .includes("open.spotify.com/track/", { message: "Field spotify_track_url must be filled with valid Spotify Track url." })
        .url({ message: "Field spotify_track_url must be filled with valid url." })
        .transform(str => str.replace("https://open.spotify.com/track/", "").replace("/", ""))
        .optional(),

    projects: Zod
        .array(
            Zod
                .string({ required_error: "Field name must compose request body." })
                .min(1, { message: "Field name must not be empty." }),
            { required_error: "Field projects must compose body" })
        .optional()
});

export const MemberRemoveRequestSchema = Zod.object({
    matricula: Zod
        .string({ required_error: "Field matricula must compose request body." })
        .length(11, { message: "Field matricula must be 11 characters long." })
        .regex(/\d\d\d\d\dBSI[0-9]+/i, { message: "Field matricula must match UFU's pattern for Information System students." })
});
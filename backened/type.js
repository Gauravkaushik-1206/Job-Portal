import zod from "zod";

const userSchema = zod.object({
    fullname:zod.string(),
    email:zod.string().email(),
    phoneNumber:zod.number(),
    password:zod.string().min(8),
    role:zod.literal("student").or(zod.literal("recruiter"))
})

const loginSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(8),
})


export { userSchema, loginSchema };
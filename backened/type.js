import zod from "zod";

const userSchema = zod.object({
    fullname:zod.string(),
    email:zod.string().email(),
    phoneNumber:zod.string(),
    password:zod.string().min(5),
    role:zod.literal("student").or(zod.literal("recruiter"))
})

const loginSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(5),
})


export { userSchema, loginSchema };
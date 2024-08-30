import zod from "zod";

const userSchema = zod.object({
    fullname:zod.string(),
    email:zod.string.email(),
    phoneNumber:zod.number().length(10),
    password:zod.string().min(8),
    role:zod.literal("student").or(zod.literal("recruiter"))
})

const loginSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(8),
})

module.exports = {
    userSchema,
    loginSchema,
}
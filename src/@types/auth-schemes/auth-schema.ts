import { t } from 'elysia'

const loginSchema = t.Object({
	email: t.String({ format: 'email' }),
	password: t.String({ minLength: 6, maxLength: 60 })
})

const signupBodySchema = t.Object({
	email: t.String({ format: 'email' }),
	password: t.String({ minLength: 4 }),
	name: t.String()
})

const updatedUserSchema = t.Partial(
	t.Object({
		name: t.String(),
		image: t.String(),
		bio: t.String()
	})
)

export { loginSchema, signupBodySchema, updatedUserSchema }

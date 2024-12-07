import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	secret: process.env.GOOGLE_CLIENT_SECRET,

	// JWT Callback to handle token customization
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},

		// Access the token in the session
		async session({ session, token }) {
			session.user = token;
			return session;
		},
	},
};

export default NextAuth(authOptions);

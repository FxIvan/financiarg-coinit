import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Ofertar",
      credentials: {
        loginEmail: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        loginPassword: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { loginEmail, loginPassword } = credentials;
        let res;

        res = await fetch(`http://localhost:8080/api/users/login`, {
          method: "POST",
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
          headers: {
            cache: "no-store",
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();

        if (user.statusCode >= 400 || user.error) {
          throw new Error(btoa(user.message) || "Error");
        }

        const infoUser = [
          {
            id: user.user._id,
            email: user.user.email,
            role: user.user.rol,
            token: user.token,
            username: user.user.username,
          },
        ];
        return infoUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, trigger, user, session }) {
      token.provider = "credentials"; //Provider
      token.accessToken = user[0].id_token; //Token generado por nuestro Backend
      token.user = user[0]; //Datos del usuario
      token.accessToken = user[0].token;
      return token;
    },
    async session({ session, token }) {
      session.provider = token.provider; //Provider
      session.accessToken = token.accessToken; //Token generado por nuestro Backend
      session.user = token.user; //Datos del usuario
      return session; //con useSession() en el cliente("use client") podemos acceder a estos datos
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { authService } from "@/services";
import type { IUser, LoginResponse } from "@/types/user.type";

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        userId: { type: "text" },
        fullName: { type: "text" },
        roleId: { type: "text" },
        genderCode: { type: "text" },
        isVip: { type: "text" },
        statusCode: { type: "text" },
        access_token: { type: "text" },
      },
      async authorize(credentials) {
        console.log("🔐 authorize() nhận credentials:", credentials);

        return {
          id: credentials.userId,
          email: credentials.email,
          name: credentials.fullName,
          roleId: parseInt(credentials.roleId),
          genderCode: credentials.genderCode,
          isVip: credentials.isVip === "true",
          statusCode: credentials.statusCode,
          accessToken: credentials.access_token,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // session 7 ngày
  },

  callbacks: {
    // Khi tạo JWT
    async jwt({ token, user, account }) {
      // user chỉ tồn tại khi đăng nhập lần đầu
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          isVip: user.isVip,
          statusCode: user.statusCode as string,
          roleId: user.roleId,
          genderCode: user.genderCode,
          accessToken: user.access_token,
        };
        token.accessToken = user.accessToken;
        token.accessTokenExpires = Date.now() + 1000 * 60 * 5; // ví dụ 5 phút
      }
      console.log("chekc session call");
      // Nếu chưa hết hạn
      if (Date.now() < token.accessTokenExpires!) return token; //đưa token lên cookie

      // Nếu hết hạn → refresh
      console.log("refresh token");
      // return await refreshAccessToken(token);
    },

    // Khi tạo session
    async session({ session, token }) {
      // console.log("=== SESSION CALLBACK ===");
      // console.log("Token:", token);
      // console.log("Session before:", session);
      session.user = token.user;
      session.accessToken = token.accessToken;
      // console.log("Session after:", session);

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

async function refreshAccessToken(token: JWT) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("Refresh token expired");

    const data = await res.json();

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + 1000 * 60 * 5, // cộng thêm 5 phút nữa
    };
  } catch (err) {
    console.error("Refresh token failed:", err);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

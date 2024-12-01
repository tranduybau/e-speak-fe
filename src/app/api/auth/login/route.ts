import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { httpError } from "@/lib/http";

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;
  const cookieStore = cookies();
  try {
    const response = await authApiRequest.login(body);
    const setCookieHeader = response.header.get("set-cookie");

    if (setCookieHeader) {
      const cookies = setCookieHeader.split(",");

      let accessToken = "";
      let refreshToken = "";

      cookies.forEach((cookie) => {
        if (cookie.trim().startsWith("access_token=")) {
          accessToken = cookie.split("=")[1].split(";")[0];
        } else if (cookie.trim().startsWith("refresh_token=")) {
          refreshToken = cookie.split("=")[1].split(";")[0];
        }
      });
      const decodeAsToken = jwt.decode(accessToken) as { exp: number };
      const decodeRfToken = jwt.decode(refreshToken) as { exp: number };

      cookieStore.set("access_token", accessToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        expires: decodeAsToken.exp * 1000,
      });

      cookieStore.set("refresh_token", refreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        expires: decodeRfToken.exp * 1000,
      });
    }

    return Response.json(response.payload);
  } catch (error) {
    if (error instanceof httpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        },
      );
    }
  }
}

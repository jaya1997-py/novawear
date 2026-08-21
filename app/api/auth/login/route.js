import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } =
      await request.json();

    if (!email || !password) {
      return Response.json(
        {
          error: "Email dan password wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const adminEmail =
      process.env.ADMIN_EMAIL;

    const adminPassword =
      process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return Response.json(
        {
          error:
            "Konfigurasi admin belum lengkap.",
        },
        {
          status: 500,
        }
      );
    }

    const emailMatch =
      email.toLowerCase() ===
      adminEmail.toLowerCase();

    const passwordMatch =
      password === adminPassword;

    if (!emailMatch || !passwordMatch) {
      return Response.json(
        {
          error:
            "Email atau password salah.",
        },
        {
          status: 401,
        }
      );
    }

    const token = await createSession();

    const response = Response.json({
      success: true,
    });

    response.headers.append(
      "Set-Cookie",
      `novawear_session=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax${
        process.env.NODE_ENV === "production"
          ? "; Secure"
          : ""
      }`
    );

    return response;

  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error
    );

    return Response.json(
      {
        error: "Terjadi kesalahan server.",
      },
      {
        status: 500,
      }
    );
  }
}
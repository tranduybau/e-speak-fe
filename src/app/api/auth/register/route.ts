import authApiRequest from "@/apiRequests/auth";
import { RegisterBodyType } from "@/schemaValidations/auth.schema";
import { httpError } from "@/lib/http";

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterBodyType;
  try {
    const response = await authApiRequest.register(body);

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

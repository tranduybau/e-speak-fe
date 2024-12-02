import authApiRequest from '@/apiRequests/auth'
import { HttpError } from '@/lib/http'
import { RegisterBodyType } from '@/schemaValidations/auth.schema'

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterBodyType
  try {
    const response = await authApiRequest.register(body)

    return Response.json(response.payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      })
    }
    return Response.json(
      {
        message: 'Lỗi không xác định',
      },
      {
        status: 500,
      },
    )
  }
}

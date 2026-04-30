import { NextResponse } from 'next/server'
import { formSchema } from '@/app/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = formSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.errors },
        { status: 400 }
      )
    }

    // In a real app, save to database here
    console.log('Form submission:', result.data)

    return NextResponse.json({
      success: true,
      message: 'Feedback received',
      data: result.data,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    // Validate input
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate credentials
    const validCredentials = {
      user: {
        email: 'pbrad8843@gmail.com',
        password: 'Skyboy2019',
      },
      admin: {
        email: 'pinnaclevault@outlook.com',
        password: 'Skyboy2019',
      },
    }

    const credentials = validCredentials[role as 'user' | 'admin']

    if (!credentials || credentials.email !== email || credentials.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate token (in production, use JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')

    return NextResponse.json({
      success: true,
      token,
      user: {
        email,
        role,
        name: role === 'user' ? 'Mark David' : 'Admin Support',
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

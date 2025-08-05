import { NextRequest, NextResponse } from 'next/server';
import { MOCK_API_BASE } from '../../../../utils/constants';
import { createOrder } from '@/lib/order';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  const userId = token.replace('mock-token-', '');

  const res = await fetch(`${MOCK_API_BASE}/users`);
  const users = await res.json();
  const user = users.find((u: any) => u.id === userId);

  if (!user) {
    return NextResponse.json({ loggedIn: false });
  }

  return NextResponse.json({
    loggedIn: true,
    user,
  });
}

//order

export async function POST(req: NextRequest) {
  try {
    const orderData = await req.json();

    const createdOrder = await createOrder(orderData);

    return NextResponse.json({ success: true, order: createdOrder });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to create order.' },
      { status: 500 }
    );
  }
}

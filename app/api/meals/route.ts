import { NextRequest, NextResponse } from 'next/server';
import { getMealsByDateRange } from '@/lib/db/queries';
import { getUser } from '@/lib/db/queries';

export async function GET(req: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;

    const meals = await getMealsByDateRange(user.id, startDate, endDate);
    return NextResponse.json(meals);

  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

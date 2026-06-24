import { connectDB } from '@/lib/mongodb';
import { Item } from '@/lib/models/Item';

export async function GET() {
  try {
    await connectDB();
    const items = await Item.find().sort({ createdAt: -1 }).lean();
    return Response.json(items);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

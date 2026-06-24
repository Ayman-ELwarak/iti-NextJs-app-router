import { connectDB } from '@/lib/mongodb';
import { Item } from '@/lib/models/Item';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const item = await Item.findById(id).lean();

    if (!item) {
      return Response.json({ error: 'Item not found' }, { status: 404 });
    }

    return Response.json(item);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch item' },
      { status: 500 }
    );
  }
}

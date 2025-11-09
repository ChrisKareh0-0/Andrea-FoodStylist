import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'clients.json');

interface Client {
  id: string;
  name: string;
  categories: string[];
  description: string;
  logo: string | null;
  gallery: string[];
}

interface ClientsData {
  clients: Client[];
}

async function readClients(): Promise<ClientsData> {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

async function writeClients(data: ClientsData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET all clients or search/filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const data = await readClients();
    let clients = data.clients;

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      clients = clients.filter(client =>
        client.name.toLowerCase().includes(searchLower) ||
        client.description?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      clients = clients.filter(client => client.categories.includes(category));
    }

    return NextResponse.json({ clients });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch clients'
    }, { status: 500 });
  }
}

// POST - Create new client
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer admin-authenticated') {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const clientData = await request.json();
    const data = await readClients();

    // Generate ID from name
    const id = clientData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newClient: Client = {
      id,
      name: clientData.name,
      categories: Array.isArray(clientData.categories) ? clientData.categories : [clientData.categories || 'restaurant'],
      description: clientData.description || '',
      logo: clientData.logo || null,
      gallery: clientData.gallery || []
    };

    data.clients.push(newClient);
    await writeClients(data);

    return NextResponse.json({ client: newClient }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to create client'
    }, { status: 500 });
  }
}

// PUT - Update client
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer admin-authenticated') {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const clientData = await request.json();
    const data = await readClients();

    const index = data.clients.findIndex(c => c.id === clientData.id);
    if (index === -1) {
      return NextResponse.json({
        error: 'Client not found'
      }, { status: 404 });
    }

    data.clients[index] = {
      ...data.clients[index],
      ...clientData
    };

    await writeClients(data);

    return NextResponse.json({ client: data.clients[index] });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to update client'
    }, { status: 500 });
  }
}

// DELETE - Delete client
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer admin-authenticated') {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        error: 'Client ID required'
      }, { status: 400 });
    }

    const data = await readClients();
    const index = data.clients.findIndex(c => c.id === id);

    if (index === -1) {
      return NextResponse.json({
        error: 'Client not found'
      }, { status: 404 });
    }

    data.clients.splice(index, 1);
    await writeClients(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to delete client'
    }, { status: 500 });
  }
}

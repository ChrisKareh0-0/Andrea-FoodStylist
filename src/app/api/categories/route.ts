import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const CATEGORIES_FILE = path.join(process.cwd(), 'data', 'categories.json');

interface Category {
  id: string;
  label: string;
}

interface CategoriesData {
  categories: Category[];
}

async function readCategories(): Promise<CategoriesData> {
  const data = await fs.readFile(CATEGORIES_FILE, 'utf-8');
  return JSON.parse(data);
}

async function writeCategories(data: CategoriesData): Promise<void> {
  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET all categories
export async function GET(request: NextRequest) {
  try {
    const data = await readCategories();
    return NextResponse.json({ categories: data.categories });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch categories'
    }, { status: 500 });
  }
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Bearer admin-authenticated') {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const { label } = await request.json();

    if (!label || label.trim() === '') {
      return NextResponse.json({
        error: 'Category label is required'
      }, { status: 400 });
    }

    const data = await readCategories();

    // Generate ID from label
    const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Check if category already exists
    if (data.categories.find(cat => cat.id === id)) {
      return NextResponse.json({
        error: 'Category already exists'
      }, { status: 400 });
    }

    const newCategory: Category = {
      id,
      label: label.trim()
    };

    data.categories.push(newCategory);
    await writeCategories(data);

    return NextResponse.json({ category: newCategory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to create category'
    }, { status: 500 });
  }
}

// DELETE - Delete category
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
        error: 'Category ID required'
      }, { status: 400 });
    }

    const data = await readCategories();
    const index = data.categories.findIndex(cat => cat.id === id);

    if (index === -1) {
      return NextResponse.json({
        error: 'Category not found'
      }, { status: 404 });
    }

    data.categories.splice(index, 1);
    await writeCategories(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to delete category'
    }, { status: 500 });
  }
}

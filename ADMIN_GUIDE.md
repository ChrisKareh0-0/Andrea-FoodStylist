# Admin Panel Guide

## Overview

Your website now has a fully functional admin panel where you can manage clients, upload logos, and manage gallery images for each client.

## Access the Admin Panel

1. **Login URL**: `http://localhost:3000/admin`
2. **Default Password**: `admin123`
3. **Dashboard URL**: `http://localhost:3000/admin/dashboard`

⚠️ **IMPORTANT**: Change the default password in production! See "Security" section below.

## Features

### 1. Client Management

**Add New Client:**
- Click "Add Client" button on dashboard
- Fill in:
  - Client Name (required)
  - Category (required) - Choose from: Restaurant, Fast Food, Cafe, Bakery, Food Brand, Ice Cream, Chocolate
  - Description (optional)
  - Logo (optional) - Upload PNG with transparent background, recommended 500x500px+

**Edit Client:**
- Click "Edit" button on any client card
- Update any field
- Upload new logo if needed
- Click "Save Client"

**Delete Client:**
- Click "Delete" button on client card
- Confirm deletion
- This action cannot be undone!

### 2. Logo Management

**Upload Logo:**
- When adding/editing a client, click "Choose File" under Logo section
- Select PNG file (transparent background recommended)
- Logo will be displayed in bento grid and client pages
- Saved to: `/public/assets/img/client-logos/`

### 3. Gallery Management

**Manage Client Gallery:**
- Click "Gallery" button on any client card
- Upload multiple images at once
- Click "Choose Files" and select multiple images
- Images will upload automatically
- Remove images by clicking the X button on hover
- Click "Save Gallery" to apply changes

**Gallery Images:**
- Saved to: `/public/assets/img/client-gallery/`
- Displayed in modal when clicking client on homepage or clients page
- High-quality JPG/PNG recommended

### 4. Search & Filter (Client-Side)

**Homepage (`/`):**
- Shows 5 random clients on each page refresh
- Click any client to view their gallery
- "View All Clients" button to see full list

**Clients Page (`/clients`):**
- Search bar: Search by client name or description
- Category filter: Filter by category (All, Restaurant, Fast Food, etc.)
- Shows count: "Showing X of Y clients"
- Click client to view gallery

## Data Storage

All client data is stored in:
- **Location**: `/data/clients.json`
- **Format**: JSON
- **Backups**: Recommended to backup this file regularly

Example client structure:
```json
{
  "id": "burger-king",
  "name": "Burger King",
  "category": "fast-food",
  "description": "Premium food styling for global campaigns",
  "logo": "/assets/img/client-logos/1234567890-burger-king.png",
  "gallery": [
    "/assets/img/client-gallery/1234567891-image1.jpg",
    "/assets/img/client-gallery/1234567892-image2.jpg"
  ]
}
```

## API Endpoints

### Authentication
- **POST** `/api/auth/login` - Login with password

### Clients
- **GET** `/api/clients` - Get all clients (supports `?search=` and `?category=`)
- **POST** `/api/clients` - Create new client (requires auth)
- **PUT** `/api/clients` - Update client (requires auth)
- **DELETE** `/api/clients?id=xxx` - Delete client (requires auth)

### File Upload
- **POST** `/api/upload` - Upload logo or gallery image (requires auth)

## Security

### Change Admin Password

1. Open `/src/lib/auth.ts`
2. Find this line:
   ```typescript
   const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10);
   ```
3. Replace `'admin123'` with your new password
4. Restart the development server

### Production Recommendations

1. **Use Environment Variables:**
   ```bash
   # .env.local
   ADMIN_PASSWORD=your-secure-password
   ```

2. **Update auth.ts to use env variable:**
   ```typescript
   const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);
   ```

3. **Add HTTPS in production**
4. **Consider adding rate limiting for login attempts**
5. **Regular backups of `/data/clients.json`**

## Categories

Available categories:
- `restaurant` - Restaurant
- `fast-food` - Fast Food
- `cafe` - Cafe
- `bakery` - Bakery
- `food-brand` - Food Brand
- `ice-cream` - Ice Cream
- `chocolate` - Chocolate

You can add more categories by editing:
1. `/src/app/admin/dashboard/page.tsx` - Line 15
2. `/src/components/admin/ClientModal.tsx` - Line 15
3. `/src/components/sections/PortfolioSection.tsx` - Line 15

## Troubleshooting

### Images not showing?
- Check file was uploaded successfully
- Verify path in `/data/clients.json`
- Check console for 404 errors
- Ensure images are in correct folder

### Can't login?
- Verify password is correct (default: `admin123`)
- Check browser console for errors
- Clear localStorage and try again

### Changes not showing?
- Refresh the page
- Check `/data/clients.json` was updated
- Verify API response in Network tab

## File Structure

```
/src/
  /app/
    /admin/
      page.tsx           # Login page
      /dashboard/
        page.tsx         # Admin dashboard
    /api/
      /auth/
        /login/
          route.ts       # Authentication API
      /clients/
        route.ts         # CRUD operations
      /upload/
        route.ts         # File upload
  /components/
    /admin/
      ClientModal.tsx    # Add/Edit client modal
      GalleryModal.tsx   # Gallery management
    /sections/
      ClientBentoSection.tsx  # Homepage bento grid
      PortfolioSection.tsx    # Full clients page
  /lib/
    auth.ts             # Authentication logic
/data/
  clients.json          # Client data storage
/public/
  /assets/
    /img/
      /client-logos/    # Client logos
      /client-gallery/  # Gallery images
```

## Support

If you encounter any issues:
1. Check browser console for errors
2. Check server terminal for API errors
3. Verify file permissions on `/data/` directory
4. Ensure all dependencies are installed: `npm install`

## Next Steps

1. Change the default password
2. Add your first client
3. Upload their logo
4. Add gallery images
5. Test search and filters on `/clients` page
6. View homepage to see bento grid with random clients

Enjoy your new admin panel! 🎉

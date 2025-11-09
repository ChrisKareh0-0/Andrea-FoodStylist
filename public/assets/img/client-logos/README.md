# Client Logos

This directory contains logos for clients featured in the portfolio.

## Important Notes

- **Copyright**: All logos are trademarked assets owned by their respective companies
- **Usage Rights**: Ensure you have permission from clients to use their logos in your portfolio
- **Format**: Save logos as PNG files with transparent backgrounds for best results
- **Naming**: Use the exact client name as listed in `/src/data/clients.ts`, converted to lowercase with hyphens

## Logo Sources

### International Fast Food Chains

**Burger King**
- Official: Contact Burger King corporate
- PNG Resources: pngimg.com, seeklogo.com, stickpng.com
- Recommended: 1024x1024px or higher, transparent background

**KFC**
- Official: global.kfc.com/media-assets
- PNG Resources: pngimg.com, seeklogo.com
- Recommended: Use official brand assets when possible

**McDonald's**
- Official: corporate.mcdonalds.com (Media Assets Library)
- PNG Resources: pngimg.com, seeklogo.com
- Recommended: Use official brand assets when possible

**Pepsi**
- Official: Contact PepsiCo for brand assets
- PNG Resources: seeklogo.com, brandslogos.com

### Lebanese/Middle Eastern Brands

**Patchi**
- PNG Available: seeklogo.com/vector-logo/545078/patchi-chocolate
- Format: 2000x2000px PNG available

**Zaatar W Zeit**
- Official: zaatarwzeit.net
- Contact: Request brand assets directly from marketing team

**Roadster Diner**
- Official: roadsterdiner.com
- Contact: Request from their marketing department

**Spinneys**
- Official: spinneys-egypt.com or spinneys.com
- Contact for official brand assets

### Other Resources

For clients not listed above:
1. **Official Website**: Check the client's official website footer or press/media section
2. **LinkedIn**: Company LinkedIn pages often have high-quality logos
3. **Facebook/Instagram**: Download from official social media profiles
4. **Direct Contact**: Email the client's marketing department
5. **Logo Databases**:
   - seeklogo.com
   - brandsoftheworld.com
   - worldvectorlogo.com
   - logopng.com.br

## How to Add a Logo

1. Obtain the logo file (PNG with transparent background preferred)
2. Save it in this directory: `/public/assets/img/client-logos/`
3. Name it using the format: `client-name.png` (lowercase, hyphens for spaces)
4. Update `/src/data/clients.ts`:
   ```typescript
   { name: 'Client Name', logo: 'client-name.png', category: 'restaurant' }
   ```

## Examples

```
burger-king.png
kfc.png
mcdonalds.png
patchi.png
zaatar-w-zeit.png
roadster.png
```

## Recommended Specifications

- **Format**: PNG with transparent background
- **Size**: Minimum 500x500px, recommended 1000x1000px or higher
- **Color Mode**: RGB
- **Quality**: High resolution for crisp display

## Legal Disclaimer

These logos are the property of their respective owners. Use only with proper authorization from the brand owners. This portfolio use should fall under your working relationship with these clients.

# Gallery Management Guide

## 📁 Gallery Structure & WebP Implementation

### Overview

The gallery system uses a JSON-based configuration with automatic WebP optimization for better performance. This guide explains how to add, remove, and manage gallery images efficiently.

## 🗂️ Gallery File Structure

```text
gallery/
├── image.jpg          # Original JPEG image (fallback)
├── image.webp         # WebP version (preferred)
├── image_313.jpg      # JPEG thumbnail (fallback)
└── image_313.webp     # WebP thumbnail (preferred)
```

## 📝 Gallery JSON Structure

The gallery configuration is stored in `public/data/gallery.json`:

```json
{
  "photos": [
    {
      "id": "01",
      "filename": "image.jpg",
      "webpFilename": "image.webp",
      "thumbFilename": "image_313.jpg",
      "thumbWebpFilename": "image_313.webp",
      "title": "Image Title",
      "alt": "image-alt-text",
      "category": "interior",
      "order": 1,
      "width": 313,
      "height": 417
    }
  ]
}
```

## 🔄 Adding New Images to Gallery

### Step 1: Prepare Your Images

1. **Original Image**: Should be high-quality (1200-2000px wide)
2. **Thumbnail**: Create a 313px wide version (maintain aspect ratio)
3. **File Formats**: Save as JPEG (quality 80-90%)

### Step 2: Convert to WebP

#### Option A: Using Command Line (Recommended)

```bash
# Install WebP tools
brew install webp

# Convert single image
cwebp -q 80 original.jpg -o original.webp

# Convert thumbnail
cwebp -q 80 thumbnail_313.jpg -o thumbnail_313.webp

# Batch convert all images in directory
find . -name "*.jpg" -exec cwebp -q 80 {} -o {}.webp \;
```

#### Option B: Using CloudConvert (Web-Based)

1. Go to: [https://cloudconvert.com/jpeg-to-webp](https://cloudconvert.com/jpeg-to-webp)
2. Upload your JPEG images
3. Set quality to 80-85
4. Download converted WebP files
5. Rename files to match your naming convention

### Step 3: Add Image Files to Gallery

Place all 4 files in `public/gallery/`:

```bash
public/gallery/
├── your-image.jpg          # Original JPEG
├── your-image.webp         # WebP version
├── your-image_313.jpg      # JPEG thumbnail
└── your-image_313.webp     # WebP thumbnail
```

### Step 4: Update gallery.json

Add your image to the JSON array:

```json
{
  "id": "21",
  "filename": "your-image.jpg",
  "webpFilename": "your-image.webp",
  "thumbFilename": "your-image_313.jpg",
  "thumbWebpFilename": "your-image_313.webp",
  "title": "Your Image Title",
  "alt": "descriptive-alt-text",
  "category": "bathroom",  // or: kitchen, interior, living, bedroom
  "order": 21,             // Set display order (1 = first)
  "width": 313,            // Thumbnail width
  "height": 417            // Thumbnail height (maintain aspect ratio)
}
```

## 🗑️ Removing Images from Gallery

### Step 1: Remove Image Files

```bash
# Remove all 4 files for an image
rm public/gallery/your-image.jpg 
rm public/gallery/your-image.webp 
rm public/gallery/your-image_313.jpg 
rm public/gallery/your-image_313.webp
```

### Step 2: Update gallery.json

Remove the corresponding JSON entry and renumber the `order` fields if needed.

## 🔧 Replacing Existing Images

### Step 1: Prepare New Images

Follow the same preparation steps as "Adding New Images".

### Step 2: Replace Files

```bash
# Replace all 4 files (keep same filenames)
cp new-image.jpg public/gallery/old-image.jpg
cp new-image.webp public/gallery/old-image.webp
cp new-image_313.jpg public/gallery/old-image_313.jpg
cp new-image_313.webp public/gallery/old-image_313.webp
```

### Step 3: Update Metadata (Optional)

Update the JSON entry if title, alt text, or category changes:

```json
{
  "id": "01",  // Keep same ID
  "filename": "old-image.jpg",  // Keep same filenames
  "webpFilename": "old-image.webp",
  "thumbFilename": "old-image_313.jpg",
  "thumbWebpFilename": "old-image_313.webp",
  "title": "New Title",  // Update metadata
  "alt": "new-descriptive-alt-text",
  "category": "new-category",
  "order": 1,  // Keep same order or update
  "width": 313,
  "height": 417
}
```

## 🎨 Image Optimization Tips

### Recommended Settings

- **JPEG Quality**: 80-90% (good balance of quality/size)
- **WebP Quality**: 80-85% (better compression than JPEG)
- **Thumbnail Size**: 313px width (maintain aspect ratio)
- **File Naming**: `image.jpg`, `image.webp`, `image_313.jpg`, `image_313.webp`

### Tools Recommendation

1. **Photoshop/GIMP**: For initial editing and resizing
2. **ImageMagick**: For batch processing

   ```bash
   convert original.jpg -quality 85 -resize 313x thumbnail.jpg
   ```

3. **CloudConvert**: For WebP conversion (web-based)
4. **Squoosh**: Google's web-based image optimizer

## 🚀 WebP Implementation Details

### How It Works

1. **Browser Detection**: Checks if browser supports WebP using `createImageBitmap` API
2. **Picture Element**: Uses HTML5 `<picture>` with fallback sources
3. **Automatic Selection**: Browser chooses best supported format
4. **Graceful Degradation**: Falls back to JPEG if WebP not supported

### HTML Structure

```html
<picture>
  <!-- WebP source (preferred) -->
  <source srcset="image.webp" type="image/webp">
  
  <!-- Fallback to original format -->
  <source srcset="image.jpg" type="image/jpeg">
  
  <!-- Final fallback img tag -->
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### Performance Benefits

- **50-70% file size reduction** compared to JPEG
- **30-50% faster page load** times
- **40-60% bandwidth savings** for users
- **Better image quality** at smaller sizes

## 📊 Category System

Use these categories for consistent organization:

- `bathroom`: Bathroom renovations
- `kitchen`: Kitchen renovations  
- `interior`: General interior work
- `living`: Living room projects
- `bedroom`: Bedroom renovations

## 🔢 Ordering & Display

- **Homepage Preview**: Shows first 4-12 images (responsive)
- **Full Gallery**: Shows all images in `/gallery`
- **Order Field**: Controls display sequence (1 = first)
- **Responsive**: Automatically adjusts number of preview images

## 🧪 Testing Your Changes

### Local Testing

```bash
# Start development server
npm run dev

# Test gallery at:
# - Homepage preview: http://localhost:3000
# - Full gallery: http://localhost:3000/gallery
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚠️ Common Issues & Solutions

### Issue: WebP not showing in some browsers

**Solution**: Browser doesn't support WebP. The `<picture>` element automatically falls back to JPEG.

### Issue: Images not appearing

**Solution**: Check file paths in JSON and ensure files exist in `public/gallery/`.

### Issue: Wrong image order

**Solution**: Update the `order` field in JSON (lower numbers appear first).

### Issue: Thumbnails distorted

**Solution**: Ensure thumbnail aspect ratio matches original image.

## 📚 Best Practices

1. **Consistent Naming**: Use clear, descriptive filenames
2. **Alt Text**: Always provide meaningful alt text for accessibility
3. **Category Organization**: Use consistent categories
4. **Order Management**: Plan display order in advance
5. **Quality Control**: Test images on multiple devices
6. **Backup**: Keep original high-resolution images

## 🎯 Maintenance Checklist

### Adding New Image

- [ ] Prepare original image (JPEG, 80-90% quality)
- [ ] Create thumbnail (313px width, maintain aspect ratio)
- [ ] Convert both to WebP (quality 80-85%)
- [ ] Place all 4 files in `public/gallery/`
- [ ] Add entry to `gallery.json`
- [ ] Test locally
- [ ] Build and deploy

### Removing Image

- [ ] Remove all 4 files from `public/gallery/`
- [ ] Remove JSON entry
- [ ] Update order numbers if needed
- [ ] Test locally
- [ ] Build and deploy

### Replacing Image

- [ ] Prepare new images (follow same process as adding)
- [ ] Replace all 4 files (keep same filenames)
- [ ] Update JSON metadata if needed
- [ ] Test locally
- [ ] Build and deploy

## 🔗 Additional Resources

- **WebP Conversion**: [CloudConvert JPEG to WebP](https://cloudconvert.com/jpeg-to-webp)
- **Image Optimization**: [Squoosh](https://squoosh.app/)
- **WebP Info**: [Google WebP Documentation](https://developers.google.com/speed/webp)
- **Browser Support**: [Can I Use WebP](https://caniuse.com/webp)

---

**Last Updated**: 2024
**Maintainer**: AMF Group Development Team

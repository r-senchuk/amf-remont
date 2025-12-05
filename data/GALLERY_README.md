# Gallery System Documentation

## Overview

The gallery system has been refactored to use a JSON configuration file instead of hardcoded HTML. This makes it easy to add, remove, or reorder photos.

## How to Add a Photo

1. **Add the image files:**
   - Place full-size image in: `i/{folder_number}/{filename}.jpg`
   - Place thumbnail in: `i/{folder_number}/{filename}_313.jpg` (or `{filename}313.jpg`)

2. **Update `data/gallery.json`:**
   ```json
   {
     "id": "21",
     "filename": "new_photo.jpg",
     "thumbFilename": "new_photo_313.jpg",
     "title": "Photo Title",
     "alt": "photo description",
     "category": "bathroom",
     "order": 21,
     "width": 313,
     "height": 417,
     "folder": "27"
   }
   ```

3. **Refresh the page** - The gallery will automatically update!

## How to Remove a Photo

1. Remove the entry from `data/gallery.json`
2. Optionally delete the image files from the `i/` folder
3. Refresh the page

## How to Reorder Photos

Simply change the `order` field in `data/gallery.json`. Lower numbers appear first.

## Gallery Configuration Fields

- **id**: Unique identifier (string)
- **filename**: Full-size image filename
- **thumbFilename**: Thumbnail filename
- **title**: Display title (currently not shown, reserved for future use)
- **alt**: Alt text for accessibility
- **category**: Photo category (bathroom, kitchen, interior, etc.)
- **order**: Display order (1, 2, 3...)
- **width**: Image width in pixels
- **height**: Image height in pixels
- **folder**: Folder number in `i/` directory

## Technical Details

- Gallery is generated dynamically by `js/gallery.js`
- Uses AMP components (`amp-img`) for optimized loading
- Lightbox functionality is handled by AMP lightbox gallery
- Images are lazy-loaded for better performance

## Future Migration

When migrating to the new folder structure (`images/gallery/full/` and `images/gallery/thumbs/`), simply update the paths in `gallery.json` and modify `js/gallery.js` if needed.


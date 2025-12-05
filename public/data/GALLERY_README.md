# Gallery System Documentation

## Overview

The gallery system has been refactored to use a JSON configuration file instead of hardcoded HTML. This makes it easy to add, remove, or reorder photos.

## How to Add a Photo

1. **Add the image files:**
   - Place full-size image in: `gallery/{filename}.jpg`
   - Place thumbnail in: `gallery/{filename}_313.jpg` (or `{filename}313.jpg`)

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
     "height": 417
   }
   ```

3. **Refresh the page** - The gallery will automatically update!

## How to Remove a Photo

1. Remove the entry from `data/gallery.json`
2. Optionally delete the image files from the `gallery/` folder
3. Refresh the page

## How to Reorder Photos

Simply change the `order` field in `data/gallery.json`. Lower numbers appear first.

## Gallery Configuration Fields

- **id**: Unique identifier (string)
- **filename**: Full-size image filename (located in `gallery/` folder)
- **thumbFilename**: Thumbnail filename (located in `gallery/` folder)
- **title**: Display title (shown in lightbox when image is opened)
- **alt**: Alt text for accessibility
- **category**: Photo category (bathroom, kitchen, interior, etc.)
- **order**: Display order (1, 2, 3...)
- **width**: Image width in pixels
- **height**: Image height in pixels

## Technical Details

- Gallery is generated dynamically by `GalleryPage.js` component
- Uses regular `<img>` elements with lazy loading
- Lightbox functionality is handled by **GLightbox** library
- Images are lazy-loaded for better performance
- GLightbox provides touch navigation, keyboard controls, and smooth animations
- All images are stored in the `gallery/` folder with descriptive filenames

## GLightbox Library

The gallery uses **GLightbox** for lightbox functionality:
- **Website:** https://biati-digital.github.io/glightbox/
- **GitHub:** https://github.com/biati-digital/glightbox
- **Features:**
  - Touch-friendly navigation
  - Keyboard controls (arrow keys, ESC)
  - Smooth fade animations
  - Image titles/captions
  - Loop through images
  - Works with dynamically created content

## Folder Structure

The gallery uses a flat structure for simplicity:
- All gallery images (full-size and thumbnails) are stored in `gallery/` folder
- Images are referenced by filename only (no folder structure needed)
- This makes it easy to add, remove, and organize photos


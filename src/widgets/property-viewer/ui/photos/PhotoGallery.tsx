import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import type { Property } from '@/entities/property/model/types';

interface PhotoGalleryProps {
  property: Property;
}

export const PhotoGallery = ({ property }: PhotoGalleryProps) => (
  <Box sx={{ height: '100%', overflowY: 'auto', p: { xs: 1.5, md: 2.5 }, pt: 9 }}>
    <ImageList variant="masonry" cols={2} gap={12} sx={{ m: 0 }}>
      {property.photos.map((photo, index) => (
        <ImageListItem key={photo.id} sx={{ overflow: 'hidden', borderRadius: 2 }}>
          <Box
            component="img"
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            sx={{ width: '100%', minHeight: index % 3 === 0 ? 310 : 230, objectFit: 'cover' }}
          />
          <ImageListItemBar title={photo.caption} sx={{ background: 'linear-gradient(transparent, rgba(0,0,0,.72))' }} />
        </ImageListItem>
      ))}
    </ImageList>
  </Box>
);

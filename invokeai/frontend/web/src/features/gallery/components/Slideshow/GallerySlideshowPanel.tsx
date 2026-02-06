import { Flex, FormControl, FormLabel, NumberInput, NumberInputField } from '@invoke-ai/ui-library';
import { createSelector } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { selectGallerySlice, slideshowDurationSecondsChanged } from 'features/gallery/store/gallerySlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const selectSlideshowDurationSeconds = createSelector(
  selectGallerySlice,
  (gallery) => gallery.slideshowDurationSeconds
);

export const GallerySlideshowPanel = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const durationSeconds = useAppSelector(selectSlideshowDurationSeconds);

  const handleDurationChange = useCallback(
    (_valueAsString: string, valueAsNumber: number) => {
      if (Number.isNaN(valueAsNumber)) {
        return;
      }
      dispatch(slideshowDurationSecondsChanged(valueAsNumber));
    },
    [dispatch]
  );

  return (
    <Flex direction="column" gap={4} w="full" h="full" px={2} py={1}>
      <FormControl maxW="200px">
        <FormLabel m={0}>{t('gallery.slideshowDuration')}</FormLabel>
        <NumberInput min={1} value={durationSeconds} onChange={handleDurationChange} size="sm" clampValueOnBlur>
          <NumberInputField />
        </NumberInput>
      </FormControl>
    </Flex>
  );
});

GallerySlideshowPanel.displayName = 'GallerySlideshowPanel';

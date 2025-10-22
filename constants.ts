
import { Tab } from './types';

export const TAB_DEFINITIONS: { id: Tab; label: string }[] = [
  { id: Tab.Mockups, label: 'Product Mockups' },
  { id: Tab.Editor, label: 'Image Editor' },
  { id: Tab.Generator, label: 'Image Generator' },
];

export const MOCKUP_OPTIONS = {
    tshirt: {
        url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
        prompt: 'Place the second image (logo) onto the chest area of the first image (t-shirt). Make it look realistic and high-quality.'
    },
    mug: {
        url: 'https://images.unsplash.com/photo-1545165241-9c6099a6f30a?q=80&w=1000&auto=format&fit=crop',
        prompt: 'Place the second image (logo) onto the front of the first image (mug). Wrap it slightly around the curve. Make it look realistic and high-quality.'
    }
};

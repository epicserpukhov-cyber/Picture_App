
import React, { useState } from 'react';
import { ImageData } from '../types';
import { editImage } from '../services/geminiService';
import FileUpload from './FileUpload';
import TextInput from './TextInput';
import Button from './Button';
import Spinner from './Spinner';

const ImageEditorTab: React.FC = () => {
  const [image, setImage] = useState<ImageData | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async () => {
    if (!image || !prompt) {
      setError('Please upload an image and provide an editing instruction.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setEditedImage(null);

    try {
      const result = await editImage(image.base64, image.mimeType, prompt);
      setEditedImage(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-6 text-white">1. Upload Image</h3>
          <FileUpload onFileUpload={setImage} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-6 text-white">2. Describe Your Edit</h3>
          <TextInput
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='e.g., "Add a retro filter" or "Make the sky blue"'
          />
        </div>
      </div>
      <div className="text-center">
        <Button onClick={handleEdit} disabled={isLoading || !image || !prompt}>
          {isLoading ? <Spinner /> : 'Edit Image'}
        </Button>
      </div>

      {error && <p className="text-red-400 text-center">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-lg font-medium leading-6 text-white text-center mb-4">Original</h3>
          {image && (
            <div className="flex justify-center">
              <img
                src={`data:${image.mimeType};base64,${image.base64}`}
                alt="Original"
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium leading-6 text-white text-center mb-4">Edited</h3>
          {editedImage && (
            <div className="flex justify-center">
              <img
                src={`data:image/png;base64,${editedImage}`}
                alt="Edited"
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditorTab;

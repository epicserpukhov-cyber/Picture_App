
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import TextInput from './TextInput';
import Button from './Button';
import Spinner from './Spinner';

const ImageGeneratorTab: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const result = await generateImage(prompt);
      setGeneratedImage(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="space-y-4">
        <h3 className="text-lg font-medium leading-6 text-white text-center">Describe the image you want to create</h3>
        <TextInput
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g., "A photo of a raccoon in a business suit reading a newspaper"'
        />
      </div>
      <div className="text-center">
        <Button onClick={handleGenerate} disabled={isLoading || !prompt}>
          {isLoading ? <Spinner /> : 'Generate Image'}
        </Button>
      </div>

      {error && <p className="text-red-400 text-center">{error}</p>}
      
      {generatedImage && (
         <div className="mt-8">
            <h3 className="text-lg font-medium leading-6 text-white text-center mb-4">Your Generated Image</h3>
            <div className="flex justify-center">
              <img
                src={`data:image/png;base64,${generatedImage}`}
                alt="Generated content"
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
         </div>
      )}
    </div>
  );
};

export default ImageGeneratorTab;


import React, { useState } from 'react';
import { ImageData } from '../types';
import { MOCKUP_OPTIONS } from '../constants';
import { createMockup } from '../services/geminiService';
import { urlToBase64 } from '../utils/imageUtils';
import FileUpload from './FileUpload';
import Button from './Button';
import Spinner from './Spinner';

type MockupType = keyof typeof MOCKUP_OPTIONS;

const ProductMockupTab: React.FC = () => {
  const [logo, setLogo] = useState<ImageData | null>(null);
  const [selectedMockup, setSelectedMockup] = useState<MockupType>('tshirt');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!logo) {
      setError('Please upload a logo first.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const mockupDetails = MOCKUP_OPTIONS[selectedMockup];
      const { base64: mockupBase64, mimeType: mockupMimeType } = await urlToBase64(mockupDetails.url);
      
      const result = await createMockup(
        logo.base64,
        logo.mimeType,
        mockupBase64,
        mockupMimeType,
        mockupDetails.prompt
      );
      setGeneratedImage(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-6 text-white">1. Upload Your Logo</h3>
          <FileUpload onFileUpload={setLogo} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium leading-6 text-white">2. Select a Product</h3>
          <div className="flex space-x-4">
            {(Object.keys(MOCKUP_OPTIONS) as MockupType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMockup(type)}
                className={`capitalize px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedMockup === type
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button onClick={handleGenerate} disabled={isLoading || !logo}>
          {isLoading ? <Spinner /> : 'Generate Mockup'}
        </Button>
      </div>

      {error && <p className="text-red-400 text-center">{error}</p>}
      
      {generatedImage && (
         <div className="mt-8">
            <h3 className="text-lg font-medium leading-6 text-white text-center mb-4">Your Mockup</h3>
            <div className="flex justify-center">
              <img
                src={`data:image/png;base64,${generatedImage}`}
                alt="Generated mockup"
                className="rounded-lg shadow-2xl max-w-full h-auto md:max-w-md"
              />
            </div>
         </div>
      )}
    </div>
  );
};

export default ProductMockupTab;

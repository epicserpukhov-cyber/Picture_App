
import React, { useState } from 'react';
import { Tab } from './types';
import Header from './components/Header';
import Tabs from './components/Tabs';
import ProductMockupTab from './components/ProductMockupTab';
import ImageEditorTab from './components/ImageEditorTab';
import ImageGeneratorTab from './components/ImageGeneratorTab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Mockups);

  const renderActiveTab = () => {
    switch (activeTab) {
      case Tab.Mockups:
        return <ProductMockupTab />;
      case Tab.Editor:
        return <ImageEditorTab />;
      case Tab.Generator:
        return <ImageGeneratorTab />;
      default:
        return <ProductMockupTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center">
      <Header />
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="mt-8">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default App;

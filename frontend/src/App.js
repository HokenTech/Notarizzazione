import React from 'react';
import { SessionProvider } from './session';
import MainContent from './components/MainContent';

function App() {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <main className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <MainContent />
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}

export default App;
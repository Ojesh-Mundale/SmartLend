import React, { useState } from 'react';
import SmartLendWelcome from './components/SmartLendWelcome';
import SmartLendUnified from './components/SmartLendChat';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const navigateToChat = () => {
    setCurrentPage('chat');
  };

  const navigateToHome = () => {
    setCurrentPage('welcome');
  };

  return (
    <>
      {currentPage === 'welcome' && <SmartLendWelcome onBeginApproval={navigateToChat} />}
      {currentPage === 'chat' && <SmartLendUnified onNavigateHome={navigateToHome} />}
    </>
  );
}

export default App;

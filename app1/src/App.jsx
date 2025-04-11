import Button from './Button';
import React from 'react';

function App() {
  return (
    <React.Suspense fallback={null}>
        <Button> Test Button</Button>
    </React.Suspense>
  );
}

export default App;

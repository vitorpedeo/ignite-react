import { useEffect, useState } from 'react';

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true);
      setIsDescriptionVisible(false);
    }, 1000);
  }, []);
  
  return (
    <div>
      <h1>Hello Async</h1>
      {isButtonVisible && <button>Button</button>}
      {isDescriptionVisible && <p>Description</p>}
    </div>
  );
}

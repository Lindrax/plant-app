import React, { createContext, useState, useEffect } from 'react';

const PlantContext = createContext();

const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState(() => {
    // Retrieve plants from localStorage or use default values
    const storedPlants = localStorage.getItem('plants');
    return storedPlants ? JSON.parse(storedPlants) : [
      { id: '1', name: 'Aloe Vera', date: '2024-02-04', image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Starr_011104-0040_Aloe_vera.jpg' },
      { id: '2', name: 'Snake Plant', date: '2024-02-02', image: 'https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1610074066643-OP8HDJUWUH8T5MHN879K/Snake+Plant.jpg?format=1000w' }
    ];
  });

  useEffect(() => {
    // Save plants to localStorage whenever they change
    localStorage.setItem('plants', JSON.stringify(plants));
  }, [plants]);

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  return (
    <PlantContext.Provider value={{ plants, addPlant, setPlants }}>
      {children}
    </PlantContext.Provider>
  );
};

export {
  PlantContext,
  PlantProvider
};
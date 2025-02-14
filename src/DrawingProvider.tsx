import { LngLat } from "maplibre-gl";
import React, { createContext, useState, useContext } from "react";

interface DrawingContextProps {
  isDrawing: boolean;
  startDrawing: () => void;
  stopDrawing: () => void;
  startPoint: LngLat | null;
  cancelDrawing: () => void;
  setStartPoint: React.Dispatch<React.SetStateAction<LngLat | null>>;
  rectangle: [LngLat, LngLat] | null;
  setRectangle: React.Dispatch<React.SetStateAction<[LngLat, LngLat] | null>>;
}

const DrawingContext = createContext<DrawingContextProps | undefined>(
  undefined
);

interface DrawingProviderProps {
  children: React.ReactNode;
}

export const DrawingProvider: React.FC<DrawingProviderProps> = ({
  children,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const [startPoint, setStartPoint] = useState<LngLat | null>(null);
  const [rectangle, setRectangle] = useState<[LngLat, LngLat] | null>(null);

  const startDrawing = () => {
    setIsDrawing(true);
    setStartPoint(null);
    setRectangle(null);
  };
  const cancelDrawing = () => {
    setIsDrawing(false);
    setStartPoint(null);
    setRectangle(null);
  };
  const stopDrawing = () => setIsDrawing(false);

  return (
    <DrawingContext.Provider
      value={{
        isDrawing,
        startDrawing,
        stopDrawing,
        startPoint,
        setStartPoint,
        rectangle,
        setRectangle,
        cancelDrawing,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawing = () => {
  const context = useContext(DrawingContext);
  if (!context) {
    throw new Error("useDrawing must be used within a DrawingProvider");
  }
  return context;
};

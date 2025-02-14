import { LngLat } from "maplibre-gl";
import React, { createContext, useState, useContext, useEffect } from "react";

type Rectangle = [LngLat, LngLat];

type MockFeature = {
  id: number;
  name: string;
};

interface DrawingContextProps {
  isDrawing: boolean;
  startDrawing: () => void;
  stopDrawing: () => void;
  startPoint: LngLat | null;
  cancelDrawing: () => void;
  setStartPoint: React.Dispatch<React.SetStateAction<LngLat | null>>;
  rectangle: [LngLat, LngLat] | null;
  area: number | null;
  setRectangle: React.Dispatch<React.SetStateAction<[LngLat, LngLat] | null>>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  features: MockFeature[];
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
  const [rectangle, setRectangle] = useState<Rectangle | null>(null);
  const [area, setArea] = useState<number | null>(null);
  const [history, setHistory] = useState<Rectangle[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [features, setFeatures] = useState<MockFeature[]>([]);

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
  const stopDrawing = () => {
    setIsDrawing(false);
    if (rectangle) {
      setHistory([...history.slice(0, historyIndex + 1), rectangle]);
      setHistoryIndex(historyIndex + 1);
      fetchFeaturesInRectangle();
    }
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setRectangle(history[historyIndex - 1]);
    }
  };
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setRectangle(history[historyIndex + 1]);
    }
  };

  const canUndo = !isDrawing && historyIndex > 0;
  const canRedo = !isDrawing && historyIndex < history.length - 1;

  useEffect(() => {
    if (rectangle) {
      const width = Math.abs(rectangle[1].lng - rectangle[0].lng);
      const height = Math.abs(rectangle[1].lat - rectangle[0].lat);
      setArea(width * height);
    } else {
      setArea(0);
    }
  }, [rectangle]);

  // Mock API call
  const fetchFeaturesInRectangle = async () => {
    console.log("Fetching features...");

    const random1to100 = () => Math.floor(Math.random() * 100) + 1;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Features fetched!");

    setFeatures(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        name: `Feature ${random1to100()}`,
      }))
    );
  };

  return (
    <DrawingContext.Provider
      value={{
        isDrawing,
        startDrawing,
        stopDrawing,
        startPoint,
        setStartPoint,
        rectangle,
        area,
        setRectangle,
        cancelDrawing,
        undo,
        redo,
        canUndo,
        canRedo,
        features,
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

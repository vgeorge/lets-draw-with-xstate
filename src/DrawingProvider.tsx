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
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
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
  const [history, setHistory] = useState<[LngLat, LngLat][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

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
        undo,
        redo,
        canUndo,
        canRedo,
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

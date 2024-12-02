import { useState, useCallback } from 'react';

export const useDragSelect = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);

  const startDragging = useCallback((index: number) => {
    setIsDragging(true);
    setStartIndex(index);
    setEndIndex(index);
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const updateDragging = useCallback((index: number) => {
    if (isDragging) {
      setEndIndex(index);
    }
  }, [isDragging]);

  return {
    isDragging,
    startIndex,
    endIndex,
    startDragging,
    stopDragging,
    updateDragging,
  };
};


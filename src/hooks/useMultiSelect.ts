import { useState, useRef, useCallback } from "react";

interface SelectableItem {
  _id: string;
}

interface SelectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseMultiSelectReturn<T> {
  selectedItems: T[];
  containerRef: React.RefObject<HTMLDivElement>;
  selectionBox: SelectionBox | null;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: (e: React.MouseEvent) => void;
}

// ! WORKING
export default function useMultiSelect<T extends SelectableItem>(
  items: T[],
  onSelectionChange: (selectedItems: T[]) => void
): UseMultiSelectReturn<T> {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) {
      console.error("Error: containerRef.current es null en handleMouseDown.");
      return;
    }
  
    const { left, top } = container.getBoundingClientRect();
    const startX = e.clientX - left;
    const startY = e.clientY - top;
  
    console.log("handleMouseDown - Calculando coordenadas iniciales:", { startX, startY });
  
    setSelectionBox({
      x: startX,
      y: startY,
      width: 0,
      height: 0,
    });
  
    console.log("handleMouseDown - Estado selectionBox inicializado.");
  }, []);
  

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!selectionBox) {
        console.warn("handleMouseMove llamado pero no hay selectionBox.");
        return;
      }
  
      const container = containerRef.current;
      if (!container) {
        console.error("Error: containerRef.current es null en handleMouseMove.");
        return;
      }
  
      const { left, top } = container.getBoundingClientRect();
      const currentX = e.clientX - left;
      const currentY = e.clientY - top;
  
      const updatedBox = {
        x: Math.min(selectionBox.x, currentX),
        y: Math.min(selectionBox.y, currentY),
        width: Math.abs(currentX - selectionBox.x),
        height: Math.abs(currentY - selectionBox.y),
      };
  
      console.log("handleMouseMove - Actualizando selectionBox:", updatedBox);
  
      setSelectionBox(updatedBox);
    },
    [selectionBox]
  );
  

  const handleMouseUp = useCallback(() => {
    if (!selectionBox) {
      console.log("handleMouseUp llamado pero no hay selectionBox.");
      return;
    }

    const container = containerRef.current;
    if (!container) {
      console.log("Error: containerRef.current es null en handleMouseUp.");
      return;
    }

    console.log("handleMouseUp - selectionBox final:", selectionBox);

    const { left, top } = container.getBoundingClientRect();

    const selected = items.filter((item) => {
      const element = container.querySelector(`[data-id="${item._id}"]`) as HTMLElement;
      if (!element) {
        console.log(`Elemento con data-id="${item._id}" no encontrado.`);
        return false;
      }

      const rect = element.getBoundingClientRect();

      const itemBounds = {
        x: rect.left - left,
        y: rect.top - top,
        width: rect.width,
        height: rect.height,
      };

      console.log("Comparando item:", {
        itemId: item._id,
        itemBounds,
        selectionBox,
      });

      const selectionRight = selectionBox.x + selectionBox.width;
      const selectionBottom = selectionBox.y + selectionBox.height;

      const isIntersecting =
        itemBounds.x < selectionRight &&
        itemBounds.x + itemBounds.width > selectionBox.x &&
        itemBounds.y < selectionBottom &&
        itemBounds.y + itemBounds.height > selectionBox.y;

      console.log("Intersección:", {
        itemId: item._id,
        isIntersecting,
      });

      return isIntersecting;
    });

    console.log("handleMouseUp - Elementos seleccionados:", selected);

    setSelectedItems(selected);
    onSelectionChange(selected);
    setSelectionBox(null);
  }, [items, selectionBox, onSelectionChange]);

  return {
    selectedItems,
    containerRef,
    selectionBox,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}

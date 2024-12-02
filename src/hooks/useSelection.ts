import { useState, useRef, useCallback, useEffect } from "react";

export interface SelectionState {
  isDragging: boolean;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  selectedItems: Set<string>;
}

export function useSelection(totalItems: number, itemsPerPage: number) {
  const [state, setState] = useState<SelectionState>({
    isDragging: false,
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 },
    selectedItems: new Set<string>(),
  });

  const [currentPage, setCurrentPage] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDown = useRef(false);

  const updateSelection = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) {
      console.warn("El contenedor no está definido.");
      return;
    }
  
    if (!state.isDragging) {
      console.log("No está en modo de arrastre. Se omite la selección.");
      return;
    }
  
    // console.log("Iniciando la actualización de selección...");
  
    // Calcular el área de selección
    const selectionRect = {
      left: Math.min(state.startPoint.x, state.endPoint.x),
      right: Math.max(state.startPoint.x, state.endPoint.x),
      top: Math.min(state.startPoint.y, state.endPoint.y),
      bottom: Math.max(state.startPoint.y, state.endPoint.y),
    };
    console.log("Área de selección:", selectionRect);
  
    // Inicializar el conjunto de nuevos elementos seleccionados
    const newSelectedItems = new Set(e.ctrlKey ? state.selectedItems : []);
    // console.log("Items iniciales seleccionados:", Array.from(newSelectedItems));
  
    // Procesar los elementos
    const items = containerRef.current.querySelectorAll(".MuiGrid-item");
    // console.log(`Encontrados ${items.length} elementos para procesar.`);
  
    items.forEach((child) => {
      const childRect = child.getBoundingClientRect();
      const containerRect = containerRef.current!.getBoundingClientRect();
  
      // Calcular posición relativa del elemento respecto al contenedor
      const childRelativeRect = {
        left: childRect.left - containerRect.left,
        right: childRect.right - containerRect.left,
        top: childRect.top - containerRect.top,
        bottom: childRect.bottom - containerRect.top,
      };
  
      const intersects =
        childRelativeRect.left < selectionRect.right &&
        childRelativeRect.right > selectionRect.left &&
        childRelativeRect.top < selectionRect.bottom &&
        childRelativeRect.bottom > selectionRect.top;
  
      if (intersects) {
        console.log(child, "child")
        const itemId = child.getAttribute("data-id");
        console.log("Intersects", itemId)

        const childWithId = child.querySelector('[data-id]');
        if (childWithId) {
          const itemId = childWithId.getAttribute('data-id');
          if (itemId) {
            newSelectedItems.add(itemId);
            console.log(`Elemento intersecta y se agrega: ${itemId}`);
          }
        }

        
      }
    });
  
    // console.log("Items seleccionados tras procesar:", Array.from(newSelectedItems));
  
    // Actualizar el estado
    setState((prev) => {
      /* console.log(
        "Actualizando estado. Antes:",
        Array.from(prev.selectedItems),
        "Después:",
        Array.from(newSelectedItems)
      ); */
      return {
        ...prev,
        selectedItems: newSelectedItems,
      };
    });
  
    //console.log("updateSelection completado.");
  }, [state.startPoint, state.endPoint, state.isDragging, state.selectedItems]);
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (containerRef.current && e.button === 0) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setState((prev) => ({
        ...prev,
        startPoint: { x, y },
        endPoint: { x, y },
        isDragging: true,
        selectedItems: e.ctrlKey ? prev.selectedItems : new Set(),
      }));
      isMouseDown.current = true;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMouseDown.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setState((prev) => ({
        ...prev,
        endPoint: { x, y },
      }));
      updateSelection(e);
    }
  }, [updateSelection]);

  const handleMouseUp = useCallback(() => {
    isMouseDown.current = false;
    setState((prev) => ({
      ...prev,
      isDragging: false,
    }));
  }, []);

  const handleClick = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setState((prev) => {
      const newSelectedItems = new Set(prev.selectedItems);
      if (e.ctrlKey) {
        if (newSelectedItems.has(id)) {
          newSelectedItems.delete(id);
        } else {
          newSelectedItems.add(id);
        }
      } else {
     
            // newSelectedItems.clear();
            newSelectedItems.add(id);
      }
      return {
        ...prev,
        selectedItems: newSelectedItems,
      };
    });
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [handleMouseUp]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const getSelectedItems = useCallback(() => {
    return Array.from(state.selectedItems);
  }, [state.selectedItems]);

  return {
    state,
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleClick,
    currentPage,
    handlePageChange,
    getSelectedItems,
  };
}


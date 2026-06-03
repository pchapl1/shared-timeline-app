import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import type {
  Memory,
  MemoryContextType,
} from '@/types/memory';

const MemoryContext = createContext<
  MemoryContextType | undefined
>(undefined);

export function MemoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [memories, setMemories] = useState<Memory[]>([]);

  function addMemory(memory: Memory) {
    setMemories((previous) => [
      memory,
      ...previous,
    ]);
  }

  function removeMemory(memoryId: number) {
    setMemories((previous) =>
      previous.filter(
        (memory) => memory.id !== memoryId
      )
    );
  }

  function replaceMemory(
    tempId: number,
    memory: Memory
    ) {
      setMemories((previous) => {
        const tempMemoryExists = previous.some(
        (item) => item.id === tempId
        );

        if (!tempMemoryExists) {
          return [memory, ...previous];
        }

        return previous.map((item) =>
          item.id === tempId ? memory : item
        );
      });
    }

  return (
    <MemoryContext.Provider
      value={{
        memories,
        setMemories,
        addMemory,
        removeMemory,
        replaceMemory,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemories() {
  const context = useContext(MemoryContext);

  if (!context) {
    throw new Error(
      'useMemories must be used inside MemoryProvider'
    );
  }

  return context;
}
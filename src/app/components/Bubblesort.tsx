"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const BAR_COUNT = 40;

function generateArray(): number[] {
  return Array.from(
    { length: BAR_COUNT },
    () => Math.floor(Math.random() * 90) + 10
  );
}

type StepState = {
  arr: number[];
  i: number;
  j: number;
  sorted: Set<number>;
  done: boolean;
};

function* bubbleSortGen(initial: number[]): Generator<StepState> {
  const arr = [...initial];
  const n = arr.length;
  const sorted = new Set<number>();

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }

      yield {
        arr: [...arr],
        i,
        j,
        sorted: new Set(sorted),
        done: false,
      };
    }

    sorted.add(n - 1 - i);

    if (!swapped) break;
  }

  for (let i = 0; i < n; i++) {
    sorted.add(i);
  }

  yield {
    arr: [...arr],
    i: -1,
    j: -1,
    sorted,
    done: true,
  };
}

export default function BubbleSort() {
  const [arr, setArr] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const [comparing, setComparing] = useState<[number, number] | null>(null);
  const [sorted, setSorted] = useState<Set<number>>(new Set());
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const generatorRef = useRef<Generator<StepState> | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate random array ONLY after client mount
  useEffect(() => {
    const initialArray = generateArray();
    setArr(initialArray);
    setMounted(true);
  }, []);

  const reset = useCallback(() => {
    const newArray = generateArray();

    setArr(newArray);
    setComparing(null);
    setSorted(new Set());
    setRunning(false);
    setDone(false);

    generatorRef.current = null;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const startSorting = () => {
    if (!generatorRef.current) {
      generatorRef.current = bubbleSortGen(arr);
    }

    setRunning(true);

    intervalRef.current = setInterval(() => {
      const result = generatorRef.current?.next();

      if (!result || result.done || result.value.done) {
        setRunning(false);
        setDone(true);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        return;
      }

      setArr(result.value.arr);
      setComparing([result.value.j, result.value.j + 1]);
      setSorted(new Set(result.value.sorted));
    }, 80);
  };

  const pauseSorting = () => {
    setRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Prevent SSR mismatch
  if (!mounted) {
    return (
      <div className="w-full h-48 rounded-md border border-gray-200 dark:border-[#333] bg-white dark:bg-black flex items-center justify-center text-sm text-gray-400">
        Loading visualization...
      </div>
    );
  }

  const maxVal = Math.max(...arr);

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Bars */}
      <div className="w-full h-48 flex items-end gap-[2px] bg-white dark:bg-black border border-gray-200 dark:border-[#333] rounded-md px-2 pt-2">
        {arr.map((val, idx) => {
          const isComparing =
            comparing &&
            (idx === comparing[0] || idx === comparing[1]);

          const isSorted = sorted.has(idx);

          let barColor =
            "bg-black dark:bg-white";

          if (isComparing) {
            barColor =
              "bg-gray-500 dark:bg-gray-400";
          }

          if (isSorted) {
            barColor =
              "bg-gray-300 dark:bg-gray-600";
          }

          return (
            <div
              key={idx}
              className={`flex-1 rounded-t-sm transition-all duration-75 ${barColor}`}
              style={{
                height: `${(val / maxVal) * 100}%`,
              }}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={running ? pauseSorting : startSorting}
          className="px-4 py-2 text-sm rounded-md bg-black text-white dark:bg-white dark:text-black"
        >
          {running ? "Pause" : done ? "Sorted" : "Start"}
        </button>

        <button
          onClick={reset}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700"
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}
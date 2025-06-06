// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import './SortingVisualizer.css'; 

// function SortingVisualizer() {
//   const [array, setArray] = useState([]);
//   const [audioCtx, setAudioCtx] = useState(null);
//   const containerRef = useRef(null);

//   const NUMBER_OF_ARRAY_BARS = 20; // Number of bars in the array

//   // Initialize AudioContext only once
//   useEffect(() => {
//     const context = new (window.AudioContext || window.webkitAudioContext)();
//     setAudioCtx(context);
    
//     // Cleanup AudioContext on component unmount
//     return () => {
//       context.close();
//     };
//   }, []);

//   // Initialize the array with random values
//   const init = useCallback(() => {
//     const newArray = Array.from({ length: NUMBER_OF_ARRAY_BARS }, () => Math.random());
//     setArray(newArray);
//     showBars(newArray);
//   }, []);

//   // Initialize and show bars on mount
//   useEffect(() => {
//     init();
//   }, [init]);

//   function resetArray() {
//     const newArray = Array.from({ length: NUMBER_OF_ARRAY_BARS }, () => Math.random());
//     setArray(newArray);
//     showBars(newArray);
//   }

//   function showBars(arrayToShow) {
//     const container = containerRef.current;
//     if (container) {
//       container.innerHTML = "";
//       for (let i = 0; i < arrayToShow.length; i++) {
//         const bar = document.createElement("div");
//         bar.style.height = arrayToShow[i] * 100 + "%";
//         bar.classList.add("bar");
//         container.appendChild(bar);
//       }
//     }
//   }

//   // Play a note with the specified frequency
//   const playNote = (freq) => {
//     if (!audioCtx) {
//       console.error('AudioContext is not initialized');
//       return;
//     }
//     const dur = 0.1;
//     const osc = audioCtx.createOscillator();
//     osc.frequency.value = freq;
//     osc.start();
//     osc.stop(audioCtx.currentTime + dur);
//     const node = audioCtx.createGain();
//     node.gain.value = 0.1;
//     node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
//     osc.connect(node);
//     node.connect(audioCtx.destination);
//   };

//   // Animate sorting moves
//   const animate = (moves) => {
//     if (moves.length === 0) {
//       showBars(array);
//       return;
//     }
//     const move = moves.shift();
//     const [i, j] = move.indices;

//     if (move.type === "swap") {
//       [array[i], array[j]] = [array[j], array[i]];
//     } else if (move.type === "overwrite") {
//       array[i] = move.value;
//     }

//     setArray([...array]);
//     playNote(200 + array[i] * 500);
//     if (move.type === "swap") {
//       playNote(200 + array[j] * 500);
//     }

//     showBars(array, move);
//     setTimeout(() => {
//       animate(moves);
//     }, 1);
//   };

//   // Sort and animate based on selected algorithm
//   const sortAndAnimate = (algorithm) => {
//     const copy = [...array];
//     let sortingMoves = [];
//     switch (algorithm) {
//       case 'bubble':
//         sortingMoves = bubbleSort(copy);
//         break;
//       case 'merge':
//         sortingMoves = [];
//         mergeSort(copy, sortingMoves);
//         break;
//       case 'heap':
//         sortingMoves = heapSort(copy);
//         break;
//       case 'quick':
//         sortingMoves = quickSort(copy);
//         break;
//       case 'insertion':
//         sortingMoves = insertionSort(copy);
//         break;
//       case 'selection':
//         sortingMoves = selectionSort(copy);
//         break;
//       default:
//         break;
//     }
//     animate(sortingMoves);
//   };

//   // Sorting functions (bubbleSort, mergeSort, etc.)
//   const bubbleSort = (array) => {
//     const moves = [];
//     let swapped;
//     do {
//       swapped = false;
//       for (let i = 1; i < array.length; i++) {
//         if (array[i - 1] > array[i]) {
//           swapped = true;
//           moves.push({ indices: [i - 1, i], type: "swap" });
//           [array[i - 1], array[i]] = [array[i], array[i - 1]];
//         }
//       }
//     } while (swapped);
//     return moves;
//   };

//   const mergeSort = (array, moves) => {
//     if (array.length <= 1) return array;

//     const mid = Math.floor(array.length / 2);
//     const left = mergeSort(array.slice(0, mid), moves);
//     const right = mergeSort(array.slice(mid), moves);

//     return merge(left, right, array, moves);
//   };

//   const merge = (left, right, originalArray, moves) => {
//     let leftIndex = 0;
//     let rightIndex = 0;
//     let originalIndex = 0;

//     while (leftIndex < left.length && rightIndex < right.length) {
//       if (left[leftIndex] < right[rightIndex]) {
//         originalArray[originalIndex] = left[leftIndex];
//         moves.push({ indices: [originalIndex], type: "overwrite", value: left[leftIndex] });
//         leftIndex++;
//       } else {
//         originalArray[originalIndex] = right[rightIndex];
//         moves.push({ indices: [originalIndex], type: "overwrite", value: right[rightIndex] });
//         rightIndex++;
//       }
//       originalIndex++;
//     }

//     while (leftIndex < left.length) {
//       originalArray[originalIndex] = left[leftIndex];
//       moves.push({ indices: [originalIndex], type: "overwrite", value: left[leftIndex] });
//       leftIndex++;
//       originalIndex++;
//     }

//     while (rightIndex < right.length) {
//       originalArray[originalIndex] = right[rightIndex];
//       moves.push({ indices: [originalIndex], type: "overwrite", value: right[rightIndex] });
//       rightIndex++;
//       originalIndex++;
//     }

//     return originalArray;
//   };

//   const heapSort = (array) => {
//     const moves = [];
//     buildMaxHeap(array, moves);
//     for (let end = array.length - 1; end > 0; end--) {
//       moves.push({ indices: [0, end], type: "swap" });
//       [array[0], array[end]] = [array[end], array[0]];
//       heapify(array, 0, end, moves);
//     }
//     return moves;
//   };

//   const buildMaxHeap = (array, moves) => {
//     for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
//       heapify(array, i, array.length, moves);
//     }
//   };

//   const heapify = (array, i, max, moves) => {
//     let largest = i;
//     const left = 2 * i + 1;
//     const right = 2 * i + 2;

//     if (left < max && array[left] > array[largest]) {
//       largest = left;
//     }

//     if (right < max && array[right] > array[largest]) {
//       largest = right;
//     }

//     if (largest !== i) {
//       moves.push({ indices: [i, largest], type: "swap" });
//       [array[i], array[largest]] = [array[largest], array[i]];
//       heapify(array, largest, max, moves);
//     }
//   };

//   const quickSort = (array) => {
//     const moves = [];
//     quickSortHelper(array, 0, array.length - 1, moves);
//     return moves;
//   };

//   const quickSortHelper = (array, low, high, moves) => {
//     if (low < high) {
//       const pivotIndex = partition(array, low, high, moves);
//       quickSortHelper(array, low, pivotIndex - 1, moves);
//       quickSortHelper(array, pivotIndex + 1, high, moves);
//     }
//   };

//   const partition = (array, low, high, moves) => {
//     const pivot = array[high];
//     let i = low - 1;
//     for (let j = low; j < high; j++) {
//       if (array[j] < pivot) {
//         i++;
//         moves.push({ indices: [i, j], type: "swap" });
//         [array[i], array[j]] = [array[j], array[i]];
//       }
//     }
//     moves.push({ indices: [i + 1, high], type: "swap" });
//     [array[i + 1], array[high]] = [array[high], array[i + 1]];
//     return i + 1;
//   };

//   const insertionSort = (array) => {
//     const moves = [];
//     for (let i = 1; i < array.length; i++) {
//       let key = array[i];
//       let j = i - 1;
//       while (j >= 0 && array[j] > key) {
//         moves.push({ indices: [j + 1, j], type: "swap" });
//         array[j + 1] = array[j];
//         j--;
//       }
//       moves.push({ indices: [j + 1], type: "overwrite", value: key });
//       array[j + 1] = key;
//     }
//     return moves;
//   };

//   const selectionSort = (array) => {
//     const moves = [];
//     for (let i = 0; i < array.length - 1; i++) {
//       let minIndex = i;
//       for (let j = i + 1; j < array.length; j++) {
//         if (array[j] < array[minIndex]) {
//           minIndex = j;
//         }
//       }
//       if (minIndex !== i) {
//         moves.push({ indices: [i, minIndex], type: "swap" });
//         [array[i], array[minIndex]] = [array[minIndex], array[i]];
//       }
//     }
//     return moves;
//   };

//   return (
    
//     <div className='sort-container'>
//       <button onClick={resetArray} className='sort'>Generate New Array</button>
//       <button onClick={() => sortAndAnimate('bubble')} className='sort'>Bubble Sort</button>
//       <button onClick={() => sortAndAnimate('merge')} className='sort'>Merge Sort</button>
//       <button onClick={() => sortAndAnimate('heap')} className='sort'>Heap Sort</button>
//       <button onClick={() => sortAndAnimate('quick')} className='sort'>Quick Sort</button>
//       <button onClick={() => sortAndAnimate('insertion')} className='sort'>Insertion Sort</button>
//       <button onClick={() => sortAndAnimate('selection')} className='sort'>Selection Sort</button>
//       <div id="container" ref={containerRef} className="bars-container">
//         {/* Bars will be displayed here */}
//       </div>
//     </div>
//   );
// }

// export default SortingVisualizer;








import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SortingVisualizer.css';

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [barCount, setBarCount] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const containerRef = useRef(null);

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: barCount }, () => Math.random());
    setArray(newArray);
    renderBars(newArray);
  }, [barCount]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const renderBars = (array, activeIndices = [], type = '') => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';
    array.forEach((value, index) => {
      const bar = document.createElement('div');
      bar.classList.add('bar');
      bar.style.height = `${value * 100}%`;
      bar.style.width = `${100 / array.length}%`;
      if (activeIndices.includes(index)) {
        bar.classList.add(type);
      }
      container.appendChild(bar);
    });
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const animate = async (moves) => {
    setIsSorting(true);
    for (const move of moves) {
      const [i, j] = move.indices;
      if (move.type === 'swap') {
        [array[i], array[j]] = [array[j], array[i]];
      } else if (move.type === 'overwrite') {
        array[i] = move.value;
      }
      setArray([...array]);
      renderBars(array, [i, j], move.type);
      await sleep(speed);
    }
    renderBars(array);
    setIsSorting(false);
  };

  const sortAndAnimate = (algorithm) => {
    if (isSorting) return;
    const copy = [...array];
    let moves = [];
    switch (algorithm) {
      case 'bubble':
        moves = bubbleSort(copy);
        break;
      case 'merge':
        mergeSort(copy, moves);
        break;
      case 'heap':
        moves = heapSort(copy);
        break;
      case 'quick':
        moves = quickSort(copy);
        break;
      case 'insertion':
        moves = insertionSort(copy);
        break;
      case 'selection':
        moves = selectionSort(copy);
        break;
      default:
        break;
    }
    animate(moves);
  };

  const bubbleSort = (array) => {
    const moves = [];
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          moves.push({ indices: [j, j + 1], type: 'swap' });
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    return moves;
  };

  const mergeSort = (array, moves) => {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, mid), moves);
    const right = mergeSort(array.slice(mid), moves);
    return merge(left, right, array, moves);
  };

  const merge = (left, right, originalArray, moves) => {
    let i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        originalArray[k] = left[i];
        moves.push({ indices: [k], type: 'overwrite', value: left[i] });
        i++;
      } else {
        originalArray[k] = right[j];
        moves.push({ indices: [k], type: 'overwrite', value: right[j] });
        j++;
      }
      k++;
    }
    while (i < left.length) {
      originalArray[k] = left[i];
      moves.push({ indices: [k], type: 'overwrite', value: left[i] });
      i++;
      k++;
    }
    while (j < right.length) {
      originalArray[k] = right[j];
      moves.push({ indices: [k], type: 'overwrite', value: right[j] });
      j++;
      k++;
    }
    return originalArray;
  };

  const heapSort = (array) => {
    const moves = [];
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(array, n, i, moves);
    for (let i = n - 1; i > 0; i--) {
      moves.push({ indices: [0, i], type: 'swap' });
      [array[0], array[i]] = [array[i], array[0]];
      heapify(array, i, 0, moves);
    }
    return moves;
  };

  const heapify = (arr, n, i, moves) => {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
      moves.push({ indices: [i, largest], type: 'swap' });
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(arr, n, largest, moves);
    }
  };

  const quickSort = (array) => {
    const moves = [];
    quickSortHelper(array, 0, array.length - 1, moves);
    return moves;
  };

  const quickSortHelper = (array, low, high, moves) => {
    if (low < high) {
      const pi = partition(array, low, high, moves);
      quickSortHelper(array, low, pi - 1, moves);
      quickSortHelper(array, pi + 1, high, moves);
    }
  };

  const partition = (array, low, high, moves) => {
    const pivot = array[high];
    let i = low;
    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        moves.push({ indices: [i, j], type: 'swap' });
        [array[i], array[j]] = [array[j], array[i]];
        i++;
      }
    }
    moves.push({ indices: [i, high], type: 'swap' });
    [array[i], array[high]] = [array[high], array[i]];
    return i;
  };

  const insertionSort = (array) => {
    const moves = [];
    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        moves.push({ indices: [j + 1, j], type: 'swap' });
        array[j + 1] = array[j];
        j--;
      }
      moves.push({ indices: [j + 1], type: 'overwrite', value: key });
      array[j + 1] = key;
    }
    return moves;
  };

  const selectionSort = (array) => {
    const moves = [];
    for (let i = 0; i < array.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        moves.push({ indices: [i, minIdx], type: 'swap' });
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
      }
    }
    return moves;
  };

  return (
    <div className='sort-container'>
      <h2 style={{ color: 'white' }}>Sorting Visualizer</h2>
      <div className='slider-container'>
        <label>Bars:</label>
        <input type='range' min='10' max='200' value={barCount} onChange={(e) => setBarCount(Number(e.target.value))} />
        <label>{barCount}</label>
        <label>Speed:</label>
        <input type='range' min='1' max='200' value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
        <label>{speed}</label>
      </div>
      <div className='button-group'>
        <button onClick={generateArray} disabled={isSorting}>Generate New Array</button>
        <button onClick={() => sortAndAnimate('bubble')} disabled={isSorting}>Bubble Sort</button>
        <button onClick={() => sortAndAnimate('merge')} disabled={isSorting}>Merge Sort</button>
        <button onClick={() => sortAndAnimate('heap')} disabled={isSorting}>Heap Sort</button>
        <button onClick={() => sortAndAnimate('quick')} disabled={isSorting}>Quick Sort</button>
        <button onClick={() => sortAndAnimate('insertion')} disabled={isSorting}>Insertion Sort</button>
        <button onClick={() => sortAndAnimate('selection')} disabled={isSorting}>Selection Sort</button>
      </div>
      <div id='container' ref={containerRef} className='bars-container'></div>
    </div>
  );
}

export default SortingVisualizer;

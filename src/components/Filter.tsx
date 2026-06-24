import { useRef, useState, useEffect, useCallback } from "react";
import { getDate } from "../utils/getDate";
// Function to generate date labels
function generateDateLabels(type: string) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  if (type === "Day") {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    console.log({
      labels: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
      defaultIndex: currentDay - 1, // Default to today's date (0-based index)
    })
    return {
      labels: Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`),
      defaultIndex: currentDay - 1, // Default to today's date (0-based index)
    };
  }

  if (type === "Month") {
    return {
      labels: Array.from({ length: 12 }, (_, i) =>
        new Date(2023, i, 1).toLocaleString("default", { month: "short" })
      ),
      defaultIndex: currentMonth, // Default to current month
    };
  }

  if (type === "Year") {
    return {
      labels: Array.from({ length: 10 }, (_, i) => `${currentYear - i}`),
      defaultIndex: 0, // Default to the current year
    };
  }

  return { labels: [], defaultIndex: null };
}

function Filter({setDate=()=>{}}) {
  const [filterType, setFilterType] = useState<string>("Day");
  const [{ labels: dateLabels, defaultIndex }, setDateData] = useState(() => generateDateLabels("Day"));
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultIndex);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 150;
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const dragDistance = useRef(0);

  const endDrag = useCallback(() => {
    isDragging.current = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !scrollContainerRef.current) return;
      const dx = e.clientX - dragStartX.current;
      dragDistance.current = Math.max(dragDistance.current, Math.abs(dx));
      scrollContainerRef.current.scrollLeft = dragScrollLeft.current - dx;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", endDrag);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", endDrag);
    };
  }, [endDrag]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current || e.button !== 0) return;
    isDragging.current = true;
    dragDistance.current = 0;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = scrollContainerRef.current.scrollLeft;
    scrollContainerRef.current.style.cursor = "grabbing";
  };
  useEffect(() => {
    if (activeIndex !== null) {
      // console.log(getDate(filterType.toLowerCase(), dateLabels[activeIndex]));
      setDate(getDate(filterType.toLowerCase(), dateLabels[activeIndex]))
    }
  }, [filterType, activeIndex]);
  

  // Handle filter change
  const handleFilterChange = (type: string) => {
    const newDateData = generateDateLabels(type);
    setFilterType(type);
    setDateData(newDateData);
    setActiveIndex(newDateData.defaultIndex);
    setDropdownOpen(false);
  };

  // Scroll handlers
  const handleNext = () => {
    scrollContainerRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handlePrevious = () => {
    scrollContainerRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const handlePillClick = (index: number) => {
    if (dragDistance.current > 5) return;
    setActiveIndex(index);
  };
  return (
    <div className="flex justify-between items-center mb-4 w-full gap-4 p-4 bg-white rounded-xl shadow-lg border border-gray-200 relative">
      {/* Scrollable Pills with Navigation */}
      <div className="flex items-center w-full min-w-0 flex-grow space-x-2">
        <button
          onClick={handlePrevious}
          className="shrink-0 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200"
        >
          &lt;
        </button>
        <div
          ref={scrollContainerRef}
          onMouseDown={handleDragStart}
          className="flex gap-2 h-12 mx-2 flex-grow min-w-0 overflow-x-auto overflow-y-hidden hide-scrollbar cursor-grab select-none"
        >          {dateLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => handlePillClick(i)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition duration-200 ${
                activeIndex === i
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="shrink-0 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200"
        >
          &gt;
        </button>
      </div>

      {/* Filter Button with Dropdown */}
      <div className="relative shrink-0 z-20">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
        >
          Filter
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            {["Day", "Month", "Year"].map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange(option)}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;

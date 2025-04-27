export function objectCollector<T>(arr: T[], key: keyof T): any[] {
    const uniqueValues = new Set<any>();
  
    for (const obj of arr) {
      if (obj[key] !== undefined) {
        uniqueValues.add(obj[key]);
      }
    }
  
    return Array.from(uniqueValues);
  }
  
  // Example Usage:
  const data = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Alice", age: 22 },
    { name: "Charlie", age: 30 },
  ];
  
  console.log(objectCollector(data, "name")); // ["Alice", "Bob", "Charlie"]
  console.log(objectCollector(data, "age"));  // [25, 30, 22]
  
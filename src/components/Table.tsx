import React from "react";

function Table({
  head = ["NO CONTENT"],
  rows = [{ id: "NO CONTENT" }],
  actions = {},
  selectedItems = new Set(),
  setSelectedItems = () => { },
  detailModal = () => { },
  excludedKeys = [],
  additionalActions = [],
}) {
  const { deleteFunc = () => { }, editFunc = () => { } } = actions;

  const handleSelectAll = () => {
    if (!Array.isArray(rows) || rows.length === 0) return;
    setSelectedItems(
      selectedItems.size < rows.length ? new Set(rows.map((item) => item.id)) : new Set()
    );
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prev) => {
      const newSelected = new Set(prev);
      newSelected.has(itemId) ? newSelected.delete(itemId) : newSelected.add(itemId);
      return newSelected;
    });
  };

  const truncateString = (str = "", num) => (str.length > num ? str.slice(0, num) + "..." : str);

  return (
    <table className="min-w-full bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg">
      <thead className="bg-blue-600 dark:bg-blue-700">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={Array.isArray(rows) && selectedItems.size === rows.length}
              disabled={!Array.isArray(rows) || rows.length === 0}
            />
          </th>
          {head.map((header, index) => (
            <th key={index} className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(rows) && rows.length > 0 ? (
          rows.map((item, index) => (
            <tr
              key={item.id || index}
              className={`border-t border-gray-300 dark:border-gray-700 ${index % 2 === 0 ? "bg-gray-100 dark:bg-gray-900" : "bg-white dark:bg-gray-800"
                }`}
            >
              <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  disabled={!item.id}
                />
              </td>
              {Object.entries(item).map(([key, value], i) => {
                if (excludedKeys.includes(key)) return null;
                return (
                  <td
                    key={i}
                    onClick={() => detailModal(item)}
                    className="cursor-pointer px-4 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300"
                  >
                    {truncateString(String(value), 11)}
                  </td>
                );
              })}
              <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-700 dark:text-gray-300">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => editFunc(item)}
                  disabled={!editFunc}
                >
                  Edit
                </button>{" "}
                |{" "}
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => deleteFunc(item.id)}
                  disabled={!deleteFunc || !item.id}
                >
                  Delete
                </button>{" "}
                {additionalActions &&
  additionalActions.map((action, index) =>
    action === "Verify" && item.isVerified !== "not verified" ? null : (
      <React.Fragment key={index}>
        |{" "}
        <button
          className="text-blue-600 hover:underline"
          onClick={
            action === "Verify"
              ? () => actions?.verifyFunc(item)
              : () => console.log("not working")
          }
        >
          {action}
        </button>{" "}
      </React.Fragment>
    )
  )}

              </td>

            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={head.length + 2} className="px-4 py-2 text-center text-gray-500 dark:text-gray-300">
              No Data Available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;

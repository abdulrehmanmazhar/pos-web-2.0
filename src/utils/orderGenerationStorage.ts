const INVOICE_ORDER_IDS_KEY = "pos_invoice_generated_order_ids";
const ROUTE_CARD_ORDER_IDS_KEY = "pos_route_card_generated_order_ids";

function readIds(key: string): string[] {
  try {
    const stored = sessionStorage.getItem(key);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  sessionStorage.setItem(key, JSON.stringify([...new Set(ids)]));
}

export function getInvoiceGeneratedOrderIds(): string[] {
  return readIds(INVOICE_ORDER_IDS_KEY);
}

export function getRouteCardGeneratedOrderIds(): string[] {
  return readIds(ROUTE_CARD_ORDER_IDS_KEY);
}

export function addInvoiceGeneratedOrderIds(ids: string[]) {
  const existing = getInvoiceGeneratedOrderIds();
  writeIds(INVOICE_ORDER_IDS_KEY, [...existing, ...ids]);
}

export function addRouteCardGeneratedOrderIds(ids: string[]) {
  const existing = getRouteCardGeneratedOrderIds();
  writeIds(ROUTE_CARD_ORDER_IDS_KEY, [...existing, ...ids]);
}

export function clearInvoiceGeneratedOrderIds() {
  sessionStorage.removeItem(INVOICE_ORDER_IDS_KEY);
}

export function clearRouteCardGeneratedOrderIds() {
  sessionStorage.removeItem(ROUTE_CARD_ORDER_IDS_KEY);
}

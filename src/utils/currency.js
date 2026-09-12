/**
 * Currency formatting utilities.
 */

const IDR_FORMATTER = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/**
 * Format a number as Indonesian Rupiah.
 * @param {number|string} amount
 * @returns {string} e.g. "Rp 1.000.000"
 */
export const formatCurrency = (amount) =>
  IDR_FORMATTER.format(Number(amount || 0));

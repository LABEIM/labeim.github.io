// File ini tidak lagi digunakan karena pengiriman pendaftaran dilakukan secara langsung
// dari sisi client (browser) ke Google Apps Script menggunakan NEXT_PUBLIC_GOOGLE_SHEET_SCRIPT_URL.
// Hal ini dilakukan untuk menghindari timeout koneksi di sisi server lokal (Node.js).
export async function POST() {
  return new Response('Not Used', { status: 410 });
}

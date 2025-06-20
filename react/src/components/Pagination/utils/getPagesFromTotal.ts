export default function getPagesFromTotal(totalPages: number) {
  return Array.from({ length: totalPages }, (_, i) => i + 1)
}

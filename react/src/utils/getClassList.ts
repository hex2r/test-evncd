type ClassListItem = string | null | undefined | boolean

export default function clt(...array: ClassListItem[]) {
  return array.filter((item) => item && typeof item === "string").join(" ")
}

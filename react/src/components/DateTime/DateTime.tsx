import { useState, useEffect } from "react"

function getLocalDateTime(
  formatObject: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }
) {
  const date = new Date()

  return date.toLocaleString("en-GB", formatObject)
}

function useLocalDateTime(
  format: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }
) {
  const [dateTime, setDateTime] = useState(getLocalDateTime(format))

  useEffect(() => {
    const datetime = setInterval(() => {
      setDateTime(() => getLocalDateTime(format))
    }, 1000)

    return () => {
      clearInterval(datetime)
    }
  }, [format])

  return dateTime
}

export default function DateTime() {
  const dateTime = useLocalDateTime()

  return <time>{dateTime}</time>
}

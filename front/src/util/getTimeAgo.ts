export const getTimeAgo = (date: number) => {
  const currentTime = new Date().getTime()
  const timeDifference = currentTime - new Date(date).getTime()

  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)

  if (weeks > 0) {
    return {
      value: weeks,
      unit: "week",
    }
  }

  if (days > 0) {
    return {
      value: days,
      unit: "day",
    }
  }

  if (hours > 0) {
    return {
      value: hours,
      unit: "hour",
    }
  }

  return {
    value: minutes,
    unit: "minute",
  }
}

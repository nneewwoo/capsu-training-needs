export const shuffle = <T>(data: T[]): T[] => {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = data[i]
    data[i] = data[j] as T
    data[j] = temp as T
  }
  return data
}

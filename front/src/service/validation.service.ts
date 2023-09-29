
interface Item {
    tag: string
    value: string
    email?: boolean
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  
  return emailRegex.test(email)
}


export const validate = (items: Item[]) => {
  for (const item of items) {
    if (item.email && !isValidEmail(item.value)) {
      return {
        flag: false,
        item: item,
      }
    }

    if (item.value.length <= 0) {
      return {
        flag: false,
        item: item,
      }
    }
  }

  return {
    flag: true,
    item: {} as Item,
  }
}

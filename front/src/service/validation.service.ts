
interface ItemForEmptyCheck {
    flag: boolean,
    item: {
      tag: string
      value: string
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  
  return emailRegex.test(email)
}

export const emptyValidation = (items: ItemForEmptyCheck[]) => {
  for (const forItem of items) {
    if (forItem.item.value.length <= 0) {
      forItem.flag = false
    } else {
      forItem.flag = true
    }
  }

  return items
}

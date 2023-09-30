
interface ItemForEmptyCheck {
    flag: boolean,
    item: {
      tag: string
      value: string
    }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  
  return emailRegex.test(email)
}

function isValidPhone(phone: string): boolean {
  //pattern: (51) 9 8962-6907
  const phoneRegex = /^\([1-9]{2}\) [9]{1} [0-9]{4}-[0-9]{4}$/i
  
  return phoneRegex.test(phone)
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

export const emailValidation = (items: ItemForEmptyCheck[]) => {
  for (const forItem of items) {
    if (forItem.item.tag === "email" && !isValidEmail(forItem.item.value)) {
      forItem.flag = false
    } else {
      forItem.flag = true
    }
  }

  return items
}

export const phoneValidation = (items: ItemForEmptyCheck[]) => {
  for (const forItem of items) {
    if (forItem.item.tag === "phone" && !isValidPhone(forItem.item.value)) {
      forItem.flag = false
    } else {
      forItem.flag = true
    }
  }

  return items
}



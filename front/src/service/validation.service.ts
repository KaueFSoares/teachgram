
interface Item {
    tag: string
    value: string
    email?: boolean
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  
  return emailRegex.test(email)
}


const useValidation = () => {
  const validate = (items: Item[]) => {
    for (const item of items) {
      if (item.email && !isValidEmail(item.tag)) {
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

  return {
    validate,
  }
}

export default useValidation

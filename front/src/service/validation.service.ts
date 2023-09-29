
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
      let valid = true

      if (item.email) {
        valid = isValidEmail(item.tag)
      }

      if (valid) {
        valid = item.value.length > 0
      }

      if (!valid) {
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

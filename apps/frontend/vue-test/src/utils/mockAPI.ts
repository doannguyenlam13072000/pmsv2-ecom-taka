type DataType<T> = T

export const mockAPI = <T>(timeout: number, type?: DataType<T>) => {
  console.log('API calling ...')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('API called')
      switch (typeof type) {
        case 'string':
          resolve('String response received')
          break
        case 'number':
          resolve(1)
          break
        case 'boolean':
          resolve(true)
          break
        case 'object':
          if (Array.isArray(type)) {
            resolve(dummyArray)
            break
          }
          resolve(dummyObject)
          break
        default:
          reject('Something went wrong')
          break
      }
    }, timeout)
  })
}

const dummyArray = [
  {
    a: 'a',
    b: 'b',
    c: 'c'
  },
  {
    a: 'a1',
    b: 'b1',
    c: 'c1'
  },
  {
    a: 'a1',
    b: 'b1',
    c: 'c1'
  },
  {
    a: 'a1',
    b: 'b1',
    c: 'c1'
  }
]

const dummyObject = {
  a: 'a1',
  b: 'b1',
  c: 'c1'
}

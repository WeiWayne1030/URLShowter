 const URLCode = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
//最多index會介於0-61之間
const Max = 61
const min = 0
 
 let results = ''
  for (let i = 1; i < 5; i++){
    const randomIndex = Math.floor(Math.random()*(Max-min+1)+ min)
    const radomWord = URLCode[randomIndex]
    results += radomWord
  }
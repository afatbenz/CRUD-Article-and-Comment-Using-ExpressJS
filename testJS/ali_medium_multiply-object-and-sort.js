// Question
// Given a object data, return the data multiple by 3 and sort the data.
// Expected output : { j: 0, k: 9, i: 18, l: 36 }

const data = { i: 6, j: null, k: 3, l: 12 };

function result(data) {
  const sorted = Object.keys(data).sort(function(a,b){
    return data[a]-data[b]
  })

  let response = {}
  sorted.forEach((item,i) =>{
    let getItem = item.toString()
    const valueItem = data[getItem] * 3
    item[i] = valueItem
    response[sorted[i]] = valueItem;
  })
  return response;
}

console.log(result(data));

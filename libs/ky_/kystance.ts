import ky from 'ky'
export const kytance = ky.create({
    parseJson: (text)=> 
        JSON.parse(text, (key, value)=>{
            if(key.endsWith('At'))  return new Date(value);
            if(key.endsWith('count')) return Number(value)
            return value
     })
    ,
})

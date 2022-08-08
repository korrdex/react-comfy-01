export const formatPrice = (num) => {
    return new Intl.NumberFormat('en-US',{style:'currency', currency: 'USD'}).format(num / 100)
    
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((itm) => itm[type])
    
    if(type === 'colors') {
        unique = unique.flat()
    }
    unique = [...new Set(unique)].sort((a,b) => a.localeCompare(b))
        
    return ['all', ...unique];
}

export const RetailerOptions = async () => {
    const responseA = await fetch ("http://localhost:8088/retailers?_expand=distributor")
    const retailers = await responseA.json()

    const responseB = await fetch("http://localhost:8088/nurseryDistributions?_expand=nursery")
    const nurseryDistributions = await responseB.json()

    const responseC = await fetch("http://localhost:8088/flowerDisplays?_expand=flower")
    const flowerDisplays = await responseC.json()


    let retailersHTML = "<ul id='retailers-list'>"

    retailersHTML += retailers.map((retailer) => {
        let html = `<li class="retailer" value="${retailer.id}">
            ${retailer.name} -- purchases from ${retailer.distributor.name}, who purchases from 
        `
        const distStringArray = nurseryDistributions.filter((nurseryDistribution) => 
            nurseryDistribution.distributorId === retailer.distributorId
        )
        
        const nurseryArray = distStringArray.map((nurseryDistribution) => {
            return nurseryDistribution.nursery
        })
    
        const flowerStringSet = new Set()

        html += nurseryArray.map((nursery) => {
            for (const flowerDisplay of flowerDisplays) {
                if (flowerDisplay.nurseryId === nursery.id) {
                    flowerStringSet.add(flowerDisplay.flower.commonName)
                }
            }
            return nursery.name
        }).join(" and ")
    
        html += ". So, the flower types available here are: "
    
        const flowerStringArray = [...flowerStringSet]
        html += flowerStringArray.join(", and ")

        html += "</li>"
        return html
        
    }).join("")
        
    

    retailersHTML += "</ul>"
    return retailersHTML
}
export const RetailerOptions = async () => {
    const responseA = await fetch ("http://localhost:8088/retailers?_expand=distributor")
    const retailers = await responseA.json()

    const responseB = await fetch("http://localhost:8088/nurseryDistributions?_expand=nursery")
    const nurseryDistributions = await responseB.json()

    const responseC = await fetch("http://localhost:8088/flowerDisplays?_expand=flower")
    const flowerDisplays = await responseC.json()


    let retailersHTML = "<ul id='retailers-list'>"

    // make a list item for each retailer
    retailersHTML += retailers.map((retailer) => {
        // begin html construction
        let html = `<li class="retailer" value="${retailer.id}">
            ${retailer.name} -- purchases from ${retailer.distributor.name}, who purchases from 
        `
        
        // populate array of nursery objects that share a distributorId with the current retailer
        const nurseryArray = nurseryDistributions.filter((nurseryDistribution) => 
            nurseryDistribution.distributorId === retailer.distributorId
        ).map((nurseryDistribution) => {
            return nurseryDistribution.nursery
        })
        
        // use a set so we don't repeat flower names if a distributor gets the same flower type from more than 1 nursery
        const flowerStringSet = new Set()


        html += nurseryArray.map((nursery) => {
            // add flower name to our set if a flowerDisplay has the nurseryId of the current nursery 
            for (const flowerDisplay of flowerDisplays) {
                if (flowerDisplay.nurseryId === nursery.id) {
                    flowerStringSet.add(flowerDisplay.flower.commonName)
                }
            }
            // add nursery names to html construction
            return nursery.name
        }).join(" and ")
    
        html += ". So, the flower types available here are: "
        
        // convert our set to an array
        html += [...flowerStringSet].join(", and ")

        html += "</li>"
        return html
        
    }).join("")

    retailersHTML += "</ul>"
    return retailersHTML
}
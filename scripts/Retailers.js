export const RetailerOptions = async () => {
    const response = await fetch ("http://localhost:8088/retailers")
    const retailers = await response.json()

    let retailersHTML = "<ul id='retailers-list'>"

    retailersHTML += retailers.map((retailer) => {
        return `<li class="retailer" value="${retailer.id}">${retailer.name}</li>`
    }).join("")

    retailersHTML += "</ul>"
    return retailersHTML
}
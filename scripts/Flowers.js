export const FlowerOptions = async () => {
    const response = await fetch("http://localhost:8088/flowers")
    const flowers = await response.json()

    let flowersHTML = "<ul id='flowers-list'>"

    flowersHTML += flowers.map((flower) => {
        return `<li class="flower" value="${flower.id}">${flower.commonName}</li>`
    }).join("")

    flowersHTML += "</ul>"
    return flowersHTML
}
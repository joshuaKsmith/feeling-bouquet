import { FlowerOptions } from "./Flowers.js"
import { RetailerOptions } from "./Retailers.js"

const container = document.querySelector("#container")

const render = async () => {
    const flowerOptionsHTML = await FlowerOptions()
    const retailerOptionsHTML = await RetailerOptions()

    container.innerHTML = `
    <h1>Are You Feeling Bouquet?</h1>
    <article class="choices">
        <section class="choices__flowers options">
            <h2>Flowers</h2>
            ${flowerOptionsHTML}
        </section>
        <section class="choices__retailers options">
            <h2>Retailers</h2>
            ${retailerOptionsHTML}
        </section>
    </article>
    `
}

render()
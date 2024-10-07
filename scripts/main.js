import { FlowerOptions } from "./Flowers.js"

const container = document.querySelector("#container")

const render = async () => {
    const flowerOptionsHTML = await FlowerOptions()

    container.innerHTML = `
    <h1>Are You Feeling Bouquet?</h1>
    <article class="choices">
        <section class="choices__flowers options">
            <h2>Flowers</h2>
            ${flowerOptionsHTML}
        </section>
    </article>
    `
}

render()
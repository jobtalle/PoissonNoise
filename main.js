import {PoissonNoiseRenderer} from "./poissonNoiseRenderer.js";
import {PoissonNoise} from "./poissonNoise.js";

{
    const wrapper = document.getElementById("wrapper");
    const canvas = document.getElementById("renderer");
    const renderer = new PoissonNoiseRenderer(canvas);
    const buttonGenerate = document.getElementById("button-generate");

    const generate = buttonGenerate.onclick = () => {
        const noise = new PoissonNoise(canvas.width, canvas.height);

        renderer.render(noise);
    };

    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;

    window.onresize = () => {
        canvas.width = wrapper.clientWidth;
        canvas.height = wrapper.clientHeight;
    };

    generate();
}
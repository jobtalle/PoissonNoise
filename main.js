import {PoissonNoiseRenderer} from "./poissonNoiseRenderer.js";
import {PoissonNoise} from "./poissonNoise.js";
import {Disk} from "./disk.js";

{
    const wrapper = document.getElementById("wrapper");
    const canvas = document.getElementById("renderer");
    const renderer = new PoissonNoiseRenderer(canvas);
    const buttonGenerate = document.getElementById("button-generate");
    const inputAttempts = document.getElementById("input-attempts");
    const fieldAttempts = document.getElementById("field-attempts");
    const inputMutation = document.getElementById("input-mutation");
    const fieldMutation = document.getElementById("field-mutation");
    const inputRadiusMin = document.getElementById("input-radius-min");
    const fieldRadiusMin = document.getElementById("field-radius-min");
    const inputRadiusMax = document.getElementById("input-radius-max");
    const fieldRadiusMax = document.getElementById("field-radius-max");

    inputAttempts.oninput = () => fieldAttempts.value = inputAttempts.value;
    inputMutation.oninput = () => fieldMutation.value = inputMutation.value;
    inputRadiusMin.oninput = () => {
        fieldRadiusMin.value = inputRadiusMin.value;
        fieldRadiusMax.value = inputRadiusMax.value = Math.max(inputRadiusMax.value, fieldRadiusMin.value);
    };
    inputRadiusMax.oninput = () => {
        fieldRadiusMax.value = inputRadiusMax.value;
        fieldRadiusMin.value = inputRadiusMin.value = Math.min(inputRadiusMin.value, fieldRadiusMax.value);
    };

    const generate = buttonGenerate.onclick = () => {
        const noise = new PoissonNoise(
            canvas.width,
            canvas.height,
            [new Disk(canvas.width * .5, canvas.height * .5, 3)],
            inputAttempts.value,
            inputMutation.value,
            inputRadiusMin.value,
            inputRadiusMax.value);

        renderer.render(noise);
    };

    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;

    window.onresize = () => {
        canvas.width = wrapper.clientWidth;
        canvas.height = wrapper.clientHeight;

        generate();
    };

    generate();
}
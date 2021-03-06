/**
 * Poisson noise renderer
 */
export class PoissonNoiseRenderer {
    static LIGHT_MIN = .4;
    static LIGHT_MAX = .95;

    /**
     * Construct a poisson noise renderer
     * @param {HTMLCanvasElement} canvas A canvas
     */
    constructor(canvas) {
        this.canvas = canvas;
    }

    /**
     * Render a noise
     * @param {PoissonNoise} noise A poisson noise
     */
    render(noise) {
        const context = this.canvas.getContext("2d");

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const disk of noise.disks) {
            const brightness = 1 - (disk.radius - noise.radiusMin) / (noise.radiusMax - noise.radiusMin);
            const lighting = PoissonNoiseRenderer.LIGHT_MIN + (PoissonNoiseRenderer.LIGHT_MAX - PoissonNoiseRenderer.LIGHT_MIN) * brightness;

            context.fillStyle = "hsl(0,0%," + (100 * lighting) + "%)";

            context.beginPath();
            context.arc(disk.x, disk.y, disk.radius, 0, Math.PI * 2);
            context.fill();
        }
    }
}
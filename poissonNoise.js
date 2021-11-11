import {Disk} from "./disk.js";

/**
 * Poisson noise
 */
export class PoissonNoise {
    static SPACING = .05;

    /**
     * Construct a noise
     * @param {number} width The noise width
     * @param {number} height The noise height
     * @param {Disk[]} [initial] The initial disks
     * @param {number} [attempts] The number of growth attempts per disk
     * @param {number} [mutation] The radius mutation rate
     * @param {number} [radiusMin] The minimum radius
     * @param {number} [radiusMax] The maximum radius
     */
    constructor(
        width,
        height,
        initial = [new Disk(width * .5, height * .5, 3)],
        attempts = 7,
        mutation = .06,
        radiusMin = 3,
        radiusMax = 7) {
        this.width = width;
        this.height = height;
        this.disks = initial;
        this.attempts = attempts;
        this.radiusMin = radiusMin;
        this.radiusMax = radiusMax;
        this.mutation = mutation;

        this.grow();
    }

    /**
     * Check if a disk fits at a given position
     * @param {number} x The X position
     * @param {number} y The Y position
     * @param {number} radius The radius
     * @returns {boolean} True if this position fits in the graph
     */
    fits(x, y, radius) {
        if (x < 0 || y < 0 || x > this.width || y > this.height)
            return false;

        for (let disk = this.disks.length; disk-- > 0;) {
            const dx = x - this.disks[disk].x;
            const dy = y - this.disks[disk].y;
            const dist = radius + this.disks[disk].radius;

            if (dx * dx + dy * dy < dist * dist)
                return false;
        }

        return true;
    }

    /**
     * Grow the network
     */
    grow() {
        const stack = this.disks.slice();
        let disk = null;

        while (disk = stack.shift()) {
            for (let attempt = 0; attempt < this.attempts; ++attempt) {
                const radius = Math.max(
                    this.radiusMin,
                    Math.min(
                        this.radiusMax,
                        disk.radius * (1 + (2 * Math.random() - 1) * this.mutation)));
                const distance = radius + disk.radius + PoissonNoise.SPACING;
                const angle = Math.random() * Math.PI * 2;
                const x = disk.x + Math.cos(angle) * distance;
                const y = disk.y + Math.sin(angle) * distance;

                if (this.fits(x, y, radius)) {
                    const newDisk = new Disk(x, y, radius);

                    this.disks.push(newDisk);

                    stack.push(newDisk);
                }
            }
        }
    }
}
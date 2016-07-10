let idIncrement = 0;
let discoveredWorlds = new Map();

export class World {
    static get(id) {
        return discoveredWorlds.get(id);
    }

    constructor({name, size}) {

        this.id   = ++idIncrement;
        this.name = name;
        this.size = size;

        discoveredWorlds.set(this.id, this);
    }
}

new World({
    name: 'earth',
    size: 500
});

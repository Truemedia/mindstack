module.exports = class Intent
{
    constructor(name, samples, slots = [])
    {
        this.name = name;
        this.samples = samples;
        this.slots = slots;
    }
};

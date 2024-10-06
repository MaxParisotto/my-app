export class Plugin {
    constructor(name) {
        this.name = name;
    }

    init() {
        console.log(`${this.name} initialized`);
    }

    handleWebSocketMessage(message) {
        console.log(`Message to ${this.name}:`, message);
    }
}
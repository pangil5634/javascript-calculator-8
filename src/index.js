import App from "./App.js";

const app = new App();

try {   
    await app.run();
} catch (error) {
    console.error("[ERROR]", error);
}

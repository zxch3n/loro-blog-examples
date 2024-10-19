import { LoroDoc } from "npm:loro-crdt@1.0.0-beta.2";

const docA = new LoroDoc();
const docB = new LoroDoc();
docA.setPeerId(0);
docA.setPeerId(1);
docA.getText("text").insert(0, "Hello!");
docB.getText("text").insert(0, "Hi!");

// Exchange versionA and versionB Info
const bytesA: Uint8Array = docA.export({
    mode: "update",
});
const bytesB: Uint8Array = docB.export({
    mode: "update",
});

// Exchange bytesA and bytesB
docB.import(bytesA);
docA.import(bytesB);

console.log(docA.getText("text").toString()); // Hello!Hi!
console.log(docB.getText("text").toString()); // Hi!Hello!

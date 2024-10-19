import { LoroDoc, VersionVector } from "npm:loro-crdt@1.0.0-beta.3";

const docA = new LoroDoc();
const docB = new LoroDoc();
docA.setPeerId(0);
docA.setPeerId(1);

docA.getText("text").insert(0, "Hello!");
docB.getText("text").insert(0, "Hi!");
const versionA: Uint8Array = docA.version().encode();
const versionB: Uint8Array = docB.version().encode();

// Exchange versionA and versionB Info
const bytesA: Uint8Array = docA.export({
    mode: "update",
    from: VersionVector.decode(versionB),
});
const bytesB: Uint8Array = docB.export({
    mode: "update",
    from: VersionVector.decode(versionA),
});

// Exchange bytesA and bytesB
docB.import(bytesA);
docA.import(bytesB);

console.log(docA.getText("text").toString()); // Hello!Hi!
console.log(docB.getText("text").toString()); // Hello!Hi!

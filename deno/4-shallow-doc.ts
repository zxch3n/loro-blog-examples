import { LoroDoc } from "npm:loro-crdt@1.0.0-beta.2";

const doc = new LoroDoc();
for (let i = 0; i < 10_000; i++) {
    doc.getText("text").insert(0, "Hello, world!");
}
const snapshotBytes = doc.export({ mode: "snapshot" });
const shallowSnapshotBytes = doc.export({
    mode: "shallow-snapshot",
    frontiers: doc.frontiers(),
});

console.log(snapshotBytes.length); // 5421
console.log(shallowSnapshotBytes.length); // 869

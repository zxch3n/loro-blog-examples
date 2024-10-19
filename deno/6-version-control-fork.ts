import { LoroDoc } from "npm:loro-crdt@1.0.0-beta.4";

const doc = new LoroDoc();
doc.setPeerId("0");
doc.getText("text").insert(0, "Hello, world!");
doc.checkout([{ peer: "0", counter: 5 }]);
const newDoc = doc.fork();
newDoc.setPeerId("1");
newDoc.getText("text").insert(6, " Alice!");
// ┌───────────────┐     ┌───────────────┐
// │    Hello,     │◀─┬──│     world!    │
// └───────────────┘  │  └───────────────┘
//                    │
//                    │  ┌───────────────┐
//                    └──│     Alice!    │
//                       └───────────────┘
doc.import(newDoc.export({ mode: "update" }));
doc.checkoutToLatest();
console.log(doc.getText("text").toString()); // "Hello, world! Alice!"

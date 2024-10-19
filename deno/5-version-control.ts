import { LoroDoc } from "npm:loro-crdt@1.0.0-beta.2";

const doc = new LoroDoc();
doc.setPeerId("0");
doc.getText("text").insert(0, "Hello, world!");
doc.checkout([{ peer: "0", counter: 1 }]);
console.log(doc.getText("text").toString()); // "He"
doc.checkout([{ peer: "0", counter: 5 }]);
console.log(doc.getText("text").toString()); // "Hello,"
doc.checkoutToLatest();
console.log(doc.getText("text").toString()); // "Hello, world!"

// Simulate a concurrent edit
doc.checkout([{ peer: "0", counter: 5 }]);
doc.setDetachedEditing(true);
doc.setPeerId("1");
doc.getText("text").insert(6, " Alice!");
// ┌───────────────┐     ┌───────────────┐
// │    Hello,     │◀─┬──│     world!    │
// └───────────────┘  │  └───────────────┘
//                    │
//                    │  ┌───────────────┐
//                    └──│     Alice!    │
//                       └───────────────┘
doc.checkoutToLatest();
console.log(doc.getText("text").toString()); // "Hello, world! Alice!"

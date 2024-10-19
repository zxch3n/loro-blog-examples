import {
    LoroDoc,
    LoroList,
    LoroMap,
    LoroText,
} from "npm:loro-crdt@1.0.0-beta.2";

// Create a JSON structure of
interface JsonStructure {
    users: LoroList<
        LoroMap<{
            name: string;
            age: number;
        }>
    >;
    notes: LoroList<LoroText>;
}

const doc = new LoroDoc<JsonStructure>();
const users = doc.getList("users");
const user = users.insertContainer(0, new LoroMap());
user.set("name", "Alice");
user.set("age", 20);
const notes = doc.getList("notes");
const firstNote = notes.insertContainer(0, new LoroText());
firstNote.insert(0, "Hello, world!");

// { users: [ { age: 20, name: "Alice" } ], notes: [ "Hello, world!" ] }
console.log(doc.toJSON());

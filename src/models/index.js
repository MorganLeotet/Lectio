/* ==== IMPORT ==== */

import User from "./User.js";
import Library from "./Library.js";
import LibraryBook from "./LibraryBook.js";

/* ==== RELATIONS ==== */

/* USER -> LIBRARY */

User.hasOne(Library, { foreignKey: "id_user" });

Library.belongsTo(User, { foreignKey: "id_user" });

/* ==== EXPORT ==== */

export { User, Library, LibraryBook };
/* ==========================
    STORE CENTRAL
========================== */

function get(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
    }

    function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    }

    function remove(key) {
    localStorage.removeItem(key);
    }

    /* ==========================
        DOMAINES MÉTIER
    ========================== */

    export const store = {

    user: {
        get: () => get("user"),
        set: (user) => set("user", user),
        remove: () => remove("user")
    },

    library: {
        get: () => get("myLibrary", []),
        set: (library) => set("myLibrary", library)
    },

    book: {
        getSelected: () => get("selectedBookId"),
        setSelected: (id) => set("selectedBookId", id)
    }

};
let shelf;
const STORAGE_KEY = "BOOK_STORAGE";
const recycleBin = [];

document.addEventListener("DOMContentLoaded", () => {
    loadStorage();
    addBook();

    const kotakSelesai = document.getElementById("selesai");
    const shelfname = document.querySelector(".shelfname");
    kotakSelesai.addEventListener("click", (e) => {
        if (e.target.checked == true) {
            shelfname.innerText = "Selesai Dibaca";
        } else {
            shelfname.innerText = " Belum Selesai Dibaca";
        }
    });
    const submitbook = document.getElementById("submitbook");
    submitbook.addEventListener("click", (e) => {
        e.preventDefault();
        if (!document.getElementById("judul").value) {
            alert("Mohon isi judul buku");
            return;
        }
        if (!document.getElementById("penulis").value) {
            alert("Mohon isi penulis buku");
            return;
        }
        if (!document.getElementById("tahun").value) {
            alert("Mohon isi tahun terbit buku");
            return;
        }
        const title = document.getElementById("judul").value;
        const author = document.getElementById("penulis").value;
        const year = parseInt(document.getElementById("tahun").value);
        const isComplete = document.getElementById("selesai").checked ? true : false;

        shelf.push({
            id: generateID(),
            title,
            author,
            year,
            isComplete,
        });
        addBook();
        saveBook();
    });
    const search = document.getElementById("submitsearch");
    search.addEventListener("click", (e) => {
        const searchvalue = document.getElementById("searchbook").value;
        filterShelfItem(searchvalue);
        e.preventDefault();
    });
    const recoverItem = document.querySelector(".recover");
    const modal = document.querySelector(".modal-alert");
    recoverItem.addEventListener("click", () => {
        recover();
        modal.style.animationName = "float-out";
        modal.style.display = "none";
    });
});
const generateID = () => {
    return +new Date();
};
const notDone = document.querySelector(".notDone");
const done = document.querySelector(".done");
const addBook = () => {
    notDone.innerHTML = "";
    done.innerHTML = "";
    shelf.forEach((book) => {
        renderBook(book);
    });
};
const renderBook = (book) => {
    const makeBook = (book, isComplete) => {
        const icon = document.createElement("span");
        icon.classList.add("material-symbols-outlined");
        icon.innerText = "menu_book";

        const details = document.createElement("div");
        details.classList.add("details");
        const judul = document.createElement("h4");
        judul.innerText = book.title;
        judul.classList.add("sub-title");
        const tahun = document.createElement("p");
        tahun.innerText = book.year;
        const penulis = document.createElement("p");
        penulis.innerText = book.author;
        details.append(judul, penulis, tahun);

        const options = document.createElement("div");
        options.classList.add("options");
        const selesai = document.createElement("input");
        selesai.setAttribute("type", "button");
        selesai.setAttribute("id", `toggle-${book.id}`);
        selesai.setAttribute("value", isComplete);
        const hapus = document.createElement("input");
        hapus.setAttribute("type", "button");
        hapus.setAttribute("id", `remove-${book.id}`);
        hapus.setAttribute("value", "Hapus");
        options.append(selesai, hapus);

        return [icon, details, options];
    };
    if (book.isComplete !== true) {
        const [icon, details, options] = makeBook(book, "Selesai");
        const belumSelesai = document.createElement("div");
        belumSelesai.classList.add("belumSelesai");
        belumSelesai.append(icon, details, options);
        notDone.append(belumSelesai);

        const hapusBuku = document.getElementById(`remove-${book.id}`);
        hapusBuku.addEventListener("click", () => {
            removeShelfItem(book);
        });
        const pindahBuku = document.getElementById(`toggle-${book.id}`);
        pindahBuku.addEventListener("click", () => {
            toggleShelfItem(book);
        });
    } else {
        const [icon, details, options] = makeBook(book, "Belum selesai");
        const sudahSelesai = document.createElement("div");
        sudahSelesai.classList.add("sudahSelesai");
        sudahSelesai.append(icon, details, options);

        done.append(sudahSelesai);

        const hapusBuku = document.getElementById(`remove-${book.id}`);
        hapusBuku.addEventListener("click", () => {
            removeShelfItem(book);
        });
        const pindahBuku = document.getElementById(`toggle-${book.id}`);
        pindahBuku.addEventListener("click", () => {
            toggleShelfItem(book);
        });
    }
};
const loadStorage = () => {
    shelf = [];
    if (localStorage.getItem(STORAGE_KEY) !== null) {
        const importLocal = localStorage.getItem(STORAGE_KEY);
        const importParsed = JSON.parse(importLocal);
        importParsed.forEach((shelfItem) => {
            shelf.push(shelfItem);
        });
    }
};
const removeShelfItem = (book) => {
    const booktarget = findShelfIndex(book.id);
    if (booktarget === -1) return;
    if (recycleBin !== undefined) {
        recycleBin.shift();
    }
    recycleBin.push(book);
    shelf.splice(booktarget, 1);
    addBook();
    saveBook();
    showModal();
};

const toggleShelfItem = (book) => {
    if (book.isComplete !== true) {
        book.isComplete = true;
    } else {
        book.isComplete = false;
    }
    addBook();
    saveBook();
};

const findShelfIndex = (bookID) => {
    for (let i = 0; i < shelf.length; i++) {
        if (shelf[i].id == bookID) {
            return i;
        }
    }
};
const filterShelfItem = (search) => {
    const searchQuery = search.toString().toLowerCase();
    loadStorage();
    console.log(shelf);
    const result = shelf.filter((book) => {
        return (
            book.title.toString().toLowerCase().includes(searchQuery) == true
        );
    });
    shelf = result;
    addBook();
};
const isStorageExist = () => {
    if (typeof Storage == undefined) {
        alert("browser anda tidak mendukung web storage");
        return false;
    }
    return true;
};
const saveBook = () => {
    if (isStorageExist()) {
        const parsedShelf = JSON.stringify(shelf);
        localStorage.setItem(STORAGE_KEY, parsedShelf);
    }
};
const showModal = () => {
    const modal = document.querySelector(".modal-alert");
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
};
const recover = () => {
    shelf.push(recycleBin[0]);
    addBook();
    saveBook();
};

//todo
//add data from form

const shelf = [];
const STORAGE_KEY = 'BOOK_STORAGE'

document.addEventListener('DOMContentLoaded', ()=>{
    if (localStorage.getItem(STORAGE_KEY) !== null){
        const importLocal = localStorage.getItem(STORAGE_KEY);
        const importParsed = JSON.parse(importLocal);
        importParsed.forEach((shelfItem)=>{
            shelf.push(shelfItem);
        })
        addBook();
    }
    const submitbook = document.getElementById('submitbook');
    submitbook.addEventListener('click', (e)=>{
        const title = document.getElementById('judul').value;
        const author = document.getElementById('penulis').value;
        const year = parseInt(document.getElementById('tahun').value);
        const isComplete = (document.getElementById('selesai').checked) ? true : false;
        shelf.push({
            id: generateID(),
            title,
            author,
            year,
            isComplete
        });
        addBook();
        saveBook();
        e.preventDefault();
        
    });
    
})
const generateID = ()=>{
    return +new Date;
}
const notDone = document.querySelector('.notDone')
const done = document.querySelector('.done');
const addBook = ()=>{
    notDone.innerHTML = '';
    done.innerHTML = '';

    
    shelf.forEach((book)=>{
        renderBook(book)
    })
}
const renderBook = (book)=>{
    const makeBook = (book, isComplete)=>{
        const icon = document.createElement('span');
        icon.classList.add('material-symbols-outlined');
        icon.innerText = 'menu_book';

        const details = document.createElement('div');
        details.classList.add('details');
        const judul = document.createElement('h4');
        judul.innerText = book.title;
        judul.classList.add('sub-title');
        const tahun = document.createElement('p');
        tahun.innerText = book.year;
        const penulis = document.createElement('p');
        penulis.innerText = book.author;
        details.append(judul, penulis, tahun);

        const options = document.createElement('div');
        options.classList.add('options');
        const selesai = document.createElement('input');
        selesai.setAttribute('type', 'button')
        selesai.setAttribute('id', `toggle-${book.id}`)
        selesai.setAttribute('value', isComplete);
        const hapus = document.createElement('input')
        hapus.setAttribute('type', 'button')
        hapus.setAttribute('id', `remove-${book.id}`)
        hapus.setAttribute('value', 'Hapus');
        options.append(selesai, hapus);
        
        return [icon, details, options];

    }
    if (book.isComplete !== true){
        const [icon, details, options] = makeBook(book, "Selesai")
        const belumSelesai = document.createElement('div')
        belumSelesai.classList.add('belumSelesai');
        belumSelesai.append(icon, details, options);        
        notDone.append(belumSelesai);

        const hapusBuku = document.getElementById(`remove-${book.id}`);
        hapusBuku.addEventListener('click', ()=>{
            
            removeShelfItem(book);
        })
        const pindahBuku = document.getElementById(`toggle-${book.id}`);
        pindahBuku.addEventListener('click', ()=>{
            
            toggleShelfItem(book);
        })
    } else {
        const [icon, details, options] = makeBook(book, "Belum selesai")
        const sudahSelesai = document.createElement('div')
        sudahSelesai.classList.add('sudahSelesai')
        sudahSelesai.append(icon, details, options);
        
        done.append(sudahSelesai);

        const hapusBuku = document.getElementById(`remove-${book.id}`);
        hapusBuku.addEventListener('click', ()=>{
            
            removeShelfItem(book);
        })
        const pindahBuku = document.getElementById(`toggle-${book.id}`);
        pindahBuku.addEventListener('click', ()=>{
            
            toggleShelfItem(book);
        })
    }
    
}

const removeShelfItem = book =>{
    const booktarget = findShelfIndex(book.id)
    console.log(book.id)
    console.log(findShelfIndex(book.id))
    if (booktarget === -1) return;
    shelf.splice(booktarget, 1);
    addBook();
    saveBook();
}

const toggleShelfItem = (book)=>{
    console.log('before', book.isComplete);
    if (book.isComplete !== true){
        book.isComplete = true;
    } else {
        book.isComplete = false;
    }
    console.log( 'after ', book.isComplete);
    addBook();
    saveBook(); 
}

const findShelfIndex = (bookID)=>{
    for (let i=0; i < shelf.length; i++){

        if (shelf[i].id == bookID){
            return i;
        }
    }
    console.log('test')
}
//initiating localStorage
const isStorageExist = ()=>{
    if (typeof (Storage) == undefined){
        alert('browser anda tidak mendukung web storage');
        return false;
    }
    return true;
}
const saveBook = ()=>{
    if (isStorageExist()){
        const parsedShelf = JSON.stringify(shelf);
        localStorage.setItem(STORAGE_KEY, parsedShelf);
    }
}
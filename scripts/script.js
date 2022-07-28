const buk = {
  id: 6969,
  title: "1984",
  author: "Jorjor Well",
  year: 1984,
  isComplete: false,
};

const localstorage = JSON.stringify(buk);


//todo
//add data from form

const shelf = [];

document.addEventListener('DOMContentLoaded', ()=>{
    const submitbook = document.getElementById('submitbook');
    submitbook.addEventListener('click', (e)=>{
        const title = document.getElementById('judul').value;
        const author = document.getElementById('penulis').value;
        const year = document.getElementById('tahun').value;
        const isComplete = (document.getElementById('selesai').checked) ? true : false;
        console.log(document.getElementById('selesai').checked)
        shelf.push({
            id: generateID(),
            title,
            author,
            year,
            isComplete
        });
        console.log(shelf);
        addBook();
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
        console.log(penulis)

        const options = document.createElement('div');
        options.classList.add('options');
        const selesai = document.createElement('input');
        selesai.setAttribute('type', 'button')
        selesai.setAttribute('id', 'selesaiStatus')
        selesai.setAttribute('value', isComplete);
        const hapus = document.createElement('input')
        hapus.setAttribute('type', 'button')
        hapus.setAttribute('id', 'hapus')
        hapus.setAttribute('value', 'Hapus');
        options.append(selesai, hapus);

        return [icon, details, options];

    }
    if (book.isComplete !== true){
        const [icon, details, options] = makeBook(book, "Belum Selesai")
        const belumSelesai = document.createElement('div')
        belumSelesai.classList.add('belumSelesai');
        belumSelesai.append(icon, details, options);
        
        notDone.append(belumSelesai);
    } else {
        const [icon, details, options] = makeBook(book, "Selesai")
        const sudahSelesai = document.createElement('div')
        sudahSelesai.classList.add('sudahSelesai')
        sudahSelesai.append(icon, details, options);
        
        done.append(sudahSelesai);
    }
}
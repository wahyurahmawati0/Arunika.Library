const books = [
    { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", category: "fiksi", image: "assets/images/book1.jpg" },
    { id: 2, title: "Filosofi Teras", author: "Henry Manampiring", category: "non-fiksi", image: "assets/images/book2.jpg" },
    { id: 3, title: "Sains Modern", author: "Dr. Arunika", category: "jurnal", image: "assets/images/book3.jpg" }
];

document.getElementById('register-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const newUser = {
        name: document.getElementById('reg-name').value,
        email: document.getElementById('reg-email').value,
        pass: document.getElementById('reg-pass').value
    };

    let memberList = JSON.parse(localStorage.getItem('memberList')) || [];

    if (memberList.some(user => user.email === newUser.email)) {
        alert('Email sudah terdaftar!');
        return;
    }

    memberList.push(newUser);
    localStorage.setItem('memberList', JSON.stringify(memberList));

    alert('Pendaftaran berhasil!');
    window.location.href = 'login.html';
});

document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = e.target[0].value;
    const pass = e.target[1].value;

    const memberList = JSON.parse(localStorage.getItem('memberList')) || [];
    const user = memberList.find(u => u.email === email && u.pass === pass);

    if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
        alert('Selamat Datang, ' + user.name);

        window.location.href = 'katalog.html'; 
    } else {
        alert('Email atau Password salah!');
    }
});

function applyFilters() {
    const query = document.getElementById('author-filter').value.toLowerCase();
    const category = document.getElementById('category-filter').value;

    const filtered = books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query);

        const matchesCategory = category === "" || book.category === category;

        return matchesSearch && matchesCategory;
    });

    displayBooks(filtered);
}

document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const pesan = {
        nama: e.target[0].value,
        email: e.target[1].value,
        isi: e.target[2].value
    };

    console.log("Pesan Terkirim:", pesan);
    alert('Terima kasih ' + pesan.nama + ', pesan Anda terkirim!');
    e.target.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('book-list')) {
        displayBooks(books);
    }
});

function displayBooks(bookList) {
    const bookListElement = document.getElementById('book-list');
    if (!bookListElement) return;

    bookListElement.innerHTML = '';

    if (bookList.length === 0) {
        bookListElement.innerHTML =
            `<p style="grid-column:1/-1;text-align:center;padding:40px;">
            Buku tidak ditemukan
            </p>`;
        return;
    }

    bookList.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';

        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <div class="book-info">
                <h4>${book.title}</h4>
                <p>Oleh: ${book.author}</p>
            </div>
            <div class="book-actions">
                <a href="detail.html?id=${book.id}" class="btn-sm btn">Detail</a>
            </div>
        `;

        bookListElement.appendChild(bookCard);
    });
}

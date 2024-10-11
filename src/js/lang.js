let stack = [];

// JSON verisini fetch ile alıyoruz
const CallJSON = function (datas) {
    if (datas) {
        return fetch(datas)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Problem: ${res.status}`);
                }
                return res.json();
            })
    } else {
        throw new Error("Data doesn't connect function");
    }
};

// JSON dosyasını çek ve stack'e aktar
CallJSON("/src/json/german.json")
    .then(data => stack = data)
    .catch(err => {
        alert(`Hata: ${err.message}`);
    });

// Form submit edildiğinde kontrol işlemi
document.getElementById('formde').addEventListener("submit", (event) => {
    event.preventDefault();

    // Kullanıcıdan alınan değerleri küçük harfe çeviriyoruz
    const artikelWord = document.getElementById('artikelde').value.toLowerCase(); 
    const nounWord = document.getElementById('nounde').value.toLowerCase(); 
    
    // stack içinde uygun kelimeyi ve artikel'i bulmaya çalışıyoruz
    const findArtikel = stack.find(w=>w.artikel.nominativ.toLowerCase() === artikelWord);
    console.log(findArtikel)

    const findNoun =stack.find(w=>w.german.toLowerCase()===nounWord)
    console.log(findNoun)

    if(!findArtikel || ! findNoun){
        document.getElementById('error').innerHTML= "Hatalı arama"
    }
});

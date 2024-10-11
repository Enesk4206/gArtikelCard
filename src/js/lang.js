let stack = [];
let pushArtikels = []
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

    document.getElementById('answer').innerHTML = '';
    document.getElementById('error').innerHTML = '';

    // Kullanıcıdan alınan değerleri küçük harfe çeviriyoruz
    const artikelWord = document.getElementById('artikelde').value.toLowerCase(); 
    const nounWord = document.getElementById('nounde').value.toLowerCase(); 
    
    // stack içinde uygun kelimeyi ve artikel'i bulmaya çalışıyoruz
    const findArtikel = stack.find(w=>w.artikel.nominativ.toLowerCase() === artikelWord);
    console.log(findArtikel)

    const findNoun =stack.find(w=>w.german.toLowerCase()===nounWord)
    console.log(findNoun)

    if(findArtikel && findNoun){
        document.getElementById('answer').innerHTML = `
        
                <!-- Kart 1 -->
                <div class="bg-white p-6 rounded-lg shadow-lg  hover:shadow-2xl hover:scale-100 h-full w-[500px]">
                <h2 class="text-center text-xl font-semibold text-gray-800 mb-4">Artikeller</h2>
                <p class="text-gray-600 mb-4">Nominativ: ${findArtikel.artikel.nominativ}
                    
                </p>
                <p class="text-gray-600 mb-4">Akkusativ: ${findArtikel.artikel.akkusativ}
        
                </p> </div>
                
                <!-- Kart 2 -->
                <div class="bg-white p-6 rounded-lg shadow-lg  hover:shadow-2xl hover:scale-100 h-full w-[500px]">
                   <h2 class="text-xl text-center font-semibold text-gray-800 mb-4">Türkçe Anlamı</h2>
                   <p class="text-gray-600 mb-4">Türkçe Anlamı:
                    <span class="text-red-700 mr-2 uppercase">${findNoun.turkisch}</span>
                   </p>
                  
               </div>`
                   
               
       
    }


    if(!findArtikel || !findNoun){
        document.getElementById('error').innerHTML= "wrong called"
    }

    document.getElementById('formde').reset();

});

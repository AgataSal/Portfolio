 function wczytanieStrony() {
    var info = "Ekran,";
    //info = "Przeglądarka: " + navigator.userAgent + "<br>";
    //info = info +  " szerokość: " + window.screen.width + "px wysokość: " + window.screen.height + "px"
    //document.getElementById('info_label').innerHTML = info;
    powitanie();
}

function powitanie() {
    var txt = "";
    var imie = prompt("Jak masz na imię? ", "");
    if (imie == null || imie == "") {
        txt = "Witaj :)";
    } else {
        txt = "Witaj " + imie;
    }
    document.getElementById("imie_label").innerHTML = txt;
}

// funkcja obliczająca BMI
function obliczBMI(czyZapisacDoPliku) {

    // zmienne w których przechowujemy dane pobierane z formularza
    var wzrost = document.bmiForm.wzrost_text.value;
    var waga = document.bmiForm.waga_text.value;
    // zmienna gdzie będzie zapisana treść pliku (w przypadku takiej opcji)
    var dane_do_pliku_txt = "";
    // sprawdzamy czy waga i wzrost nie są ujemne
    if (waga > 0 && wzrost > 0) {
        // obliczenie
        var finalBmi = 0;
        finalBmi = waga / (wzrost / 100 * wzrost / 100)
        // przypisujemy wynik do odpowiedniej kontrolki tekstowej
        //document.bmiForm.bmi__text.value = finalBmi
        document.getElementById("bmi__text").value = finalBmi;
        // dodatkowo w innej kontrolce tekstowej opis w zależności od wyniku
        if (finalBmi < 18.5) {
            //document.bmiForm.opis_text.value = "Poniżej normy";
            document.getElementById("opis_text").value = "Twoja waga jest poniżej normy";
        }
        if (finalBmi > 18.5 && finalBmi < 25) {
            //document.bmiForm.opis_text.value = "w granicach normy";
            document.getElementById("opis_text").value = "Twoja waga jest w granicach normy";
        }
        if (finalBmi > 25) {
            //document.bmiForm.opis_text.value = "powyżej normy";
            document.getElementById("opis_text").value = "Twoja waga jest powyżej normy";
        }
        if (finalBmi > 30) {
            //document.bmiForm.opis_text.value = "otyłość";
            document.getElementById("opis_text").value = "Twoja waga wskazuje otyłość"
        }

        if (czyZapisacDoPliku == 1) {
            // tworzymy obiekt, w którym będziemy przechowywać datę i czas
            var dateobj = new Date();

            // konwersja bieżącej daty do formatu ISO

            var biezacadataczas = dateobj.toISOString();

            // przygotowanie treści pliku
            // znacznik \n oznacza przejście do nowej linijki w tekście (podobnie jak w języku C)
            dane_do_pliku_txt = "Data wygenerowania pliku: " + biezacadataczas + "\n";
            dane_do_pliku_txt += "Wzrost: " + wzrost + "\n";
            dane_do_pliku_txt += "Waga: " + waga + "\n";
            dane_do_pliku_txt += "BMI: " + finalBmi + "\n";
            dane_do_pliku_txt += "Opis: " + document.bmiForm.opis_text.value + "\n";
            dane_do_pliku_txt += "Przeglądarka: " + navigator.userAgent;
            // pobranie pliku, którego nazwa składa się z daty i czasu
            // treść pliku to jest BMI
            // funkcja download jest to własna funkcja zdefiniowana w tym dokumencie
            download("BMI_" + biezacadataczas + ".txt", dane_do_pliku_txt);
        }
    } else {
        // komunikat o błędzię jeśli dane są źle wprowadzone (np. waga ujemna)
        alert("Proszę uzupełnić dane!")
    }
}

// własna funkcja generująca zapis danych do pliku i jego pobranie

function download(nazwa_pliku, tekst) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(tekst));
    element.setAttribute('download', nazwa_pliku);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}



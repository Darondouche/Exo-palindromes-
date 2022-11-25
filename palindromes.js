let ajd = "02/03/1997";

//je stocke le jour/mois/année dans des variables en number
let ajdDay = parseInt(ajd.slice(0, 2));
let ajdMonth = parseInt(ajd.slice(3, 5));
let ajdYear = parseInt(ajd.slice(6));

function isValideDate(ajdDay, ajdMonth, ajdYear) {
  //si mon association mois jour est valable alors je checke la date
  if (maxDayInMonth(ajdDay, ajdMonth)) {
    //je verifie que le jour est compris entre 01 et 31
    //le mois entre 01 et 12
    //l'année entre 999 et 9999
    if (
      ajdDay >= 01 &&
      ajdDay <= 31 &&
      ajdMonth >= 01 &&
      ajdMonth <= 12 &&
      ajdYear > 999 &&
      ajdYear < 9999
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function maxDayInMonth(ajdDay, ajdMonth) {
  let checkMonth = true;
  //je check le nombre de jours maxi selon les différents mois
  if (ajdDay == 30 || ajdDay == 31 || ajdDay == 28) {
    if (
      ajdDay == 30 &&
      (ajdMonth == 04 || ajdMonth == 06 || ajdMonth == 09 || ajdMonth == 11)
    ) {
      checkMonth = true;
    } else if (
      ajdDay == 31 &&
      (ajdMonth == 01 ||
        ajdMonth == 03 ||
        ajdMonth == 05 ||
        ajdMonth == 07 ||
        ajdMonth == 08 ||
        ajdMonth == 10 ||
        ajdMonth == 12)
    ) {
      checkMonth = true;
    } else if (ajdDay == 28 && ajdMonth == 02) {
      checkMonth = true;
    } else {
      checkMonth = false;
    }
  }
  return checkMonth;
}

//fonction inverser l'ordre des charactères dans une string
function ReverseString(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(ajd) {
  //je verifie que la date est au bon format
  if (isValideDate(ajdDay, ajdMonth, ajdYear)) {
    //j'enlève les slashs et je stocke dans une string
    let dayEndroit = ajd.replace(/\//g, "");
    //j'enregistre la string à l'envers
    let dayReverse = ReverseString(dayEndroit);
    //je compare les deux pour voir si la date est un palindrome
    if (dayEndroit == dayReverse) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//console.log(isPalindrome(ajd));
//je récupère les données de la date d'ajd
let currentDate = new Date();

function getNextPalindrome(currentDate) {
  //je stocke le jour
  let todayDay = currentDate.getDate();
  //je rajoute un zéro si le jour est inférieur à 10
  if (todayDay < 10) {
    return (todayDay = `0${todayDay}`);
  }
  //je stocke le mois
  let todayMonth = currentDate.getMonth() + 1;
  //je rajoute un zéro si le mois est inférieur à 10
  if (todayMonth < 10) {
    return (todayMonth = `0${todayMonth}`);
  }
  //je stocke l'année
  let todayYear = currentDate.getFullYear();

  //je stocke la date d'aujourd'hui dans une chaîne de caractères
  currentDate = `${todayDay}/${todayMonth}/${todayYear}`;

  //je créé une variable pour stocker le nombre de palindrome trouvé
  let countPalindrome = 0;
  let dateSuivante = getNextDate(currentDate);
  let arrPalindromes = [];

  do {
    dateSuivante = getNextDate(dateSuivante);
    if (isPalindrome(dateSuivante)) {
      countPalindrome += 1;
      console.log(countPalindrome);
      arrPalindromes.push(dateSuivante);
    }
  } while (countPalindrome < 8);
  console.log(countPalindrome);

  return arrPalindromes;
}

function getNextDate(anyDate) {
  //je transforme la string en données utilisables
  let Day = parseInt(anyDate.slice(0, 2));
  let Month = parseInt(anyDate.slice(3, 5));
  let Year = parseInt(anyDate.slice(6));

  //je cherche la date du lendemain
  let nextDate = `${Day + 1}/${Month}/${Year}`;

  //si la date n'est plus valide qd on ajoute un jour, c'est qu'il faut changer de mois
  if (isValideDate(Day + 1, Month, Year) == false) {
    nextDate = `01/${Month + 1}/${Year}`;
    if (Month + 1 < 10) {
      nextDate = `01/0${Month + 1}/${Year}`;
      return nextDate;
    }
    //si date non valide qd on ajoute un mois, c'est qu'on change d'année
    if (isValideDate(01, Month + 1, Year) == false) {
      nextDate = `01/01/${Year + 1}`;
    }
    return nextDate;
  } else {
    if (Day + 1 < 10) {
      nextDate = `0${Day + 1}/${Month}/${Year}`;
      if (Month < 10) {
        nextDate = `0${Day + 1}/0${Month}/${Year}`;
      }
      return nextDate;
    } else if (Month < 10) {
      nextDate = `${Day + 1}/0${Month}/${Year}`;
    }
  }
  return nextDate;
}

console.log(getNextPalindrome(currentDate));

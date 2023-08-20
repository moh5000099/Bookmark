var bookNameI = document.getElementById("bookNameI");
var bookUrlI = document.getElementById("bookUrlI");
var submit = document.getElementById("submit");
var booksList = document.getElementById("booksList");
var myBookmarks = [];


if (localStorage.getItem("myBookmarksKey") == null) {
    var myBookmarks = [];
}
else {
    myBookmarks = JSON.parse(localStorage.getItem("myBookmarksKey"));
    display(myBookmarks);
}


submit.addEventListener("click", addFunc);


function addFunc() {
    var bookNameIWarn = bookNameI.nextElementSibling;
    var bookUrlIWarn = bookUrlI.nextElementSibling;


    if (bookNameI.value == "") {

        if (bookNameI.value == "") {
            bookNameIWarn.style.display = "block";
            bookNameIWarn.innerHTML = "Name is required"
        }
        else {
            bookNameIWarn.style.display = "none";
        }
        if (bookUrlI.value == "") {
            bookUrlIWarn.style.display = "block";
            bookUrlIWarn.innerHTML = "URL field is required"
        }
        else {
            bookUrlIWarn.style.display = "none";
        }

        return;
    }
    else {
        for (var i = 0; i < myBookmarks.length; i++) {
            if (myBookmarks[i].bookNameE == bookNameI.value) {
                if (bookUrlI.value != "") {
                    bookNameIWarn.style.display = "block";
                    bookNameIWarn.innerHTML = "Name is already exist"
                }
                else {
                    bookNameIWarn.style.display = "block";
                    bookNameIWarn.innerHTML = "Url for this name exists"
                    bookUrlIWarn.style.display = "none";


                }
                return;
            }
        }
        if (bookUrlI.value == "") {
            bookNameIWarn.style.display = "none";
            bookUrlIWarn.style.display = "block";
            bookUrlIWarn.innerHTML = "URL field is required"
            return;
        }


        //Valid Inputs
        if (!(bookUrlI.value).includes("http://") && !(bookUrlI.value).includes("https://")) {
            bookUrlI.value = "https://" + bookUrlI.value;
        }
        bookNameIWarn.style.display = "none";
        bookUrlIWarn.style.display = "none";
        var myBookmarkE = {
            bookNameE: bookNameI.value,
            bookUrlE: bookUrlI.value
        }
        myBookmarks.push(myBookmarkE);
        localStorage.setItem("myBookmarksKey", JSON.stringify(myBookmarks));
        display(myBookmarks);
        clearf();
    }
}
function clearf() {
    bookNameI.value = "";
    bookUrlI.value = "";
}

function deletef(i) {
    myBookmarks.splice(i, 1);
    localStorage.setItem("myBookmarksKey", JSON.stringify(myBookmarks));
    display(myBookmarks);
}


function display(myBookmarkss) {
    var box = "";
    for (var i = 0; i < myBookmarkss.length; i++) {
        box += `
        <div class="container item my-4 p-4 rounded-3 d-flex justify-content-start align-items-center">
                    <p class="my-4 fw-bold d-inline fs-4 me-auto heightlight">${myBookmarkss[i].bookNameE}</p>
                    <a class="btn btn-primary ms-4" target="_blank" href="${myBookmarkss[i].bookUrlE}">Visit</a>
                    <button class="btn btn-danger ms-2" onclick="deletef(${i});">Delete</button>
                </div>
        `
    }
    booksList.innerHTML = box;
}

function search(term) {
    var searchResult = [];
    var terms = [];
    for (var i = 0; i < myBookmarks.length; i++) {
        if (myBookmarks[i].bookNameE.toLowerCase().includes(term.toLowerCase()) == true) {
            searchResult.push(myBookmarks[i]);
            var start = myBookmarks[i].bookNameE.toLowerCase().indexOf(term.toLowerCase()[0]);//.indexOf(term.toLowerCase()); shall work too
            terms.push(myBookmarks[i].bookNameE.substr(start, term.length));
        }
    }
    display(searchResult);
    var heightlight = document.querySelectorAll(".heightlight");
    for (var i = 0; i < heightlight.length; i++) {
        console.log(terms[i]);
        heightlight[i].innerHTML = heightlight[i].innerHTML.replace(
            terms[i],
            `<span>${terms[i]}</span>`
        );
    }
}
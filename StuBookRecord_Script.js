let firebaseConfig = {
    apiKey: "AIzaSyAaByWVGYy3vE6fCx3LZhxyVuUxeFpt02A",
    authDomain: "utkarsh-fa248.firebaseapp.com",
    projectId: "utkarsh-fa248",
    storageBucket: "utkarsh-fa248.appspot.com",
    messagingSenderId: "165188264003",
    appId: "1:165188264003:web:84c911ee0c8f17f12eb4f6",
    measurementId: "G-0WCZR221QT"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function () {
    const dataBody = document.getElementById('dataBody');
    const checkboxValueInput = document.getElementById('checkboxValue');

    // Function to fetch data and populate the table with only specified columns
    function fetchDataAndPopulateTable() {
        db.collection("LMS").onSnapshot((querySnapshot) => {
            dataBody.innerHTML = ""; // Clear previous table data
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const row = `
                    <tr>
                        <td>${data.name}</td>
                        <td>${data.author}</td>
                        <td>${data.id}</td>
                        <td>${data.availQuantity}</td>
                        <td>${data.totalQuantity}</td>
                        <td><input type="radio" name="actionRadio" data-id="${doc.id}" data-action="Issue"></td>
                        
                    </tr>`;
                dataBody.innerHTML += row;
            });
        }, (error) => {
            console.error("Error fetching data:", error);
        });
    }

    fetchDataAndPopulateTable();

    /// Handle radio button change event
    document.addEventListener('change', function (e) {
    if (e.target.type === 'radio' && e.target.name === 'actionRadio' && e.target.checked) {
        const action = e.target.dataset.action;
        const checkedRow = e.target.closest('tr');
        const availQuantity = parseInt(checkedRow.cells[3].innerText); // Get available quantity from the fourth column

        // Check if available quantity is less than or equal to zero
        if (availQuantity <= 0) {
            alert("Quantity Not Available");
            return; // Exit function if quantity is not available
        }

        const bookName = checkedRow.cells[0].innerText; // Get book name from the first column
        const bookId = checkedRow.cells[2].innerText; // Get book ID from the third column

        // Set the checkbox value if the element exists
        if (checkboxValueInput) {
            checkboxValueInput.value = 'Issue';
        }

        // Redirect to the issue page for the selected book
        var bookName1 = bookName;
        var bookID1 = bookId;
        window.location.href = `Issue.html?id=${bookName1}&bookName1=${bookName1}&bookID1=${bookId}`;
    }
});

    
});

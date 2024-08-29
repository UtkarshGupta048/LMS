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
    const dataTable = document.getElementById('dataTable');
    const dataBody = document.getElementById('dataBody');
    const dataForm = document.getElementById('dataForm');

    // Function to fetch data and populate the table
    function fetchDataAndPopulateTable() {
        db.collection("LMS").onSnapshot((querySnapshot) => {
            dataBody.innerHTML = ""; // Clear previous table data
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const row = `
                    <tr>
                        <td>${data.name}</td>
                        <td>${data.id}</td>
                        <td>${data.author}</td>
                        <td>${data.availQuantity}</td>
                        <td>${data.totalQuantity}</td>
                        <td>
                            <button class="editBtn" data-id="${doc.id}">Edit</button>
                            <button class="deleteBtn" data-id="${doc.id}">Delete</button>
                        </td>
                    </tr>`;
                dataBody.innerHTML += row;
            });
        }, (error) => {
            console.error("Error fetching data:", error);
        });
    }

    fetchDataAndPopulateTable();

    // Form submission to add data
if (dataForm) {
    dataForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let name = document.getElementById('name').value.toUpperCase();
        let id = document.getElementById('id').value.toUpperCase();
        let author = document.getElementById('author').value.toUpperCase();
        let availQuantity = parseInt(document.getElementById('availQuantity').value); // Convert to integer
        let totalQuantity = parseInt(document.getElementById('totalQuantity').value); // Convert to integer
    
        db.collection("LMS").add({
            name: name,
            id: id,
            author: author,
            availQuantity: availQuantity,
            totalQuantity: totalQuantity
        }).then(() => {
            document.getElementById("dataForm").reset();
            alert("Book added successfully");
        }).catch((error) => {
            console.error("Error adding book:", error);
            alert("Error adding book");
        });
    });
}

    

    // Edit button click event
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('editBtn')) {
        const id = e.target.dataset.id;
        const editOption = prompt("What do you want to edit? Enter 'id' for ID, 'name' for Name, 'author' for Author Name, 'availQuantity' for Available Quantity, 'totalQuantity' for Total Quantity, or 'all' for all:");
        if (editOption) {
            if (editOption === 'id') {
                const newId = prompt("Enter new ID:");
                if (newId) {
                    db.collection("LMS").doc(id).update({ id: newId }).then(() => {
                        alert("ID updated successfully");
                        fetchDataAndPopulateTable(); // Refresh table data
                    }).catch((error) => {
                        console.error("Error updating ID:", error);
                        alert("Error updating ID");
                    });
                }
            } else if (editOption === 'name') {
                const newName = prompt("Enter new name:");
                if (newName) {
                    db.collection("LMS").doc(id).update({ name: newName }).then(() => {
                        alert("Name updated successfully");
                        fetchDataAndPopulateTable(); // Refresh table data
                    }).catch((error) => {
                        console.error("Error updating name:", error);
                        alert("Error updating name");
                    });
                }
            } else if (editOption === 'author') {
                const newAuthor = prompt("Enter new author:");
                if (newAuthor) {
                    db.collection("LMS").doc(id).update({ author: newAuthor }).then(() => {
                        alert("Author updated successfully");
                        fetchDataAndPopulateTable(); // Refresh table data
                    }).catch((error) => {
                        console.error("Error updating author:", error);
                        alert("Error updating author");
                    });
                }
            } else if (editOption === 'availQuantity') {
                const newAvailQuantity = prompt("Enter new available quantity:");
                if (newAvailQuantity) {
                    db.collection("LMS").doc(id).update({ availQuantity: newAvailQuantity }).then(() => {
                        alert("Available Quantity updated successfully");
                        fetchDataAndPopulateTable(); // Refresh table data
                    }).catch((error) => {
                        console.error("Error updating available quantity:", error);
                        alert("Error updating available quantity");
                    });
                }
            } else if (editOption === 'totalQuantity') {
                const newTotalQuantity = prompt("Enter new total quantity:");
                if (newTotalQuantity) {
                    db.collection("LMS").doc(id).update({ totalQuantity: newTotalQuantity }).then(() => {
                        alert("Total Quantity updated successfully");
                        fetchDataAndPopulateTable(); // Refresh table data
                    }).catch((error) => {
                        console.error("Error updating total quantity:", error);
                        alert("Error updating total quantity");
                    });
                }
            } else if (editOption === 'all') {
                const newName = prompt("Enter new name:");
                const newId = prompt("Enter new ID:");
                const newAuthor = prompt("Enter new author:");
                const newAvailQuantity = prompt("Enter available quantity:");
                const newTotalQuantity = prompt("Enter total quantity:");
                if (newName && newId && newAuthor && newAvailQuantity && newTotalQuantity) {
                    db.collection("LMS").doc(id).update({
                        name: newName,
                        id: newId,
                        author: newAuthor,
                        availQuantity: newAvailQuantity,
                        totalQuantity: newTotalQuantity
                    }).then(() => {
                        alert("All fields updated successfully");
                        fetchDataAndPopulateTable(); // Refresh table data
                    }).catch((error) => {
                        console.error("Error updating all fields:", error);
                        alert("Error updating all fields");
                    });
                }
            } else {
                alert("Invalid option");
            }
        }
    }
});


    // Delete button click event
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('deleteBtn')) {
            const id = e.target.dataset.id;
            if (confirm("Are you sure you want to delete this book?")) {
                db.collection("LMS").doc(id).delete().then(() => {
                    alert("Book deleted successfully");
                    fetchDataAndPopulateTable(); // Refresh table data
                }).catch((error) => {
                    console.error("Error deleting book:", error);
                    alert("Error deleting book");
                });
            }
        }
    });

});

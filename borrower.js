const firebaseConfig = {
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
    const borrowersTable = document.getElementById('borrowersTable');
    const borrowersBody = document.getElementById('borrowersBody');

    // Function to fetch borrower's records and populate the table
    function fetchBorrowersAndPopulateTable() {
        // Assuming you have a Firebase Firestore database initialized and a collection named "StudentRecord"
        db.collection("StudentRecord").onSnapshot((querySnapshot) => {
            borrowersBody.innerHTML = ""; // Clear previous table data
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const row = `
                    <tr>
                        <td>${data.studentName}</td>
                        <td>${data.studentID}</td>
                        <td>${data.bookID}</td>
                        <td>${data.bookName}</td>
                        <td>${data.issueDate}</td>
                        <td>${data.depositDate}</td>
                        <td><input type="radio" name="actionRadio" data-id="${doc.id}" data-action="deposit"></td>
                    </tr>`;
                borrowersBody.innerHTML += row;
            });
        }, (error) => {
            console.error("Error fetching borrower's records:", error);
        });
    }

    fetchBorrowersAndPopulateTable();

    document.addEventListener('change', function (e) {
        if (e.target.type === 'radio' && e.target.name === 'actionRadio' && e.target.checked) {
            const action = e.target.dataset.action;
            const borrowerId = e.target.dataset.id; // Get the ID of the borrower
            const depositDateCell = e.target.closest('tr').cells[5]; // Cell for deposit date
            const currentDepositStatus = depositDateCell.textContent.trim(); // Trim to remove whitespace
    
            if (action === 'deposit') {
                if (currentDepositStatus === 'Not Deposited') {
                    // Update the deposit date in Firestore
                    const currentDate = new Date();
                    const formattedDate = currentDate.toLocaleDateString(); // Format date as per your requirement
    
                    db.collection("StudentRecord").doc(borrowerId).update({
                        depositDate: formattedDate
                    }).then(() => {
                        console.log("Deposit date updated successfully");
    
                        // Increment the quantity of the book in StuBookRecord collection
                        const bookId = e.target.closest('tr').cells[2].innerText; // Get the book ID
                        const bookName = e.target.closest('tr').cells[3].innerText; // Get the book name
                        db.collection("LMS").where("id", "==", bookId).where("name", "==", bookName).get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                const docRef = db.collection("LMS").doc(doc.id);
                                docRef.get().then((doc) => {
                                    if (doc.exists) {
                                        let currentQuantity = doc.data().availQuantity;
                                        // Update the quantity by incrementing by 1
                                        docRef.update({
                                            availQuantity: currentQuantity + 1
                                        }).then(() => {
                                            console.log("Quantity updated successfully");
                                            alert("Depopsited Successfully");
                                        }).catch((error) => {
                                            console.error("Error updating quantity:", error);
                                        });
                                    } else {
                                        console.error("No such document exists");
                                    }
                                }).catch((error) => {
                                    console.error("Error getting document:", error);
                                });
                            });
                        }).catch((error) => {
                            console.error("Error fetching book details:", error);
                        });
                    }).catch((error) => {
                        console.error("Error updating deposit date:", error);
                    });
                } else {
                    alert("Book Already Submitted");
                }
            }
        }
    });
    
    
});




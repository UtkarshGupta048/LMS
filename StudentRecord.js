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
    const issueForm = document.getElementById('issueForm');

    if (issueForm) {
        issueForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let bookName = document.getElementById('bookName12').value.toUpperCase();
            let bookID = document.getElementById('bookID').value.toUpperCase();
            let studentName = document.getElementById('studentName').value.toUpperCase();
            let studentID = document.getElementById('studentid').value;
            let issueDate = document.getElementById('issueDate').value;
            let depositDate = "Not Deposited";

            // Check if the book is available before issuing
            db.collection("LMS").where("name", "==", bookName).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const docRef = db.collection("LMS").doc(doc.id);
                    const currentQuantity = doc.data().availQuantity;
                    if (currentQuantity > 0) {
                        // Store data in Firebase Firestore under "StudentRecord" collection
                        db.collection("StudentRecord").add({
                            bookName: bookName,
                            bookID: bookID,
                            studentName: studentName,
                            studentID: studentID,
                            issueDate: issueDate,
                            depositDate
                        }).then(() => {
                            alert("Book issued successfully");

                            // Update the quantity of the book in StuBookRecord collection
                            docRef.update({
                                availQuantity: currentQuantity - 1
                            }).then(() => {
                                console.log("Quantity updated successfully");
                            }).catch((error) => {
                                console.error("Error updating quantity:", error);
                            });

                            issueForm.reset();
                        }).catch((error) => {
                            console.error("Error issuing book:", error);
                            alert("Error issuing book");
                        });
                    } else {
                        console.error("No more available quantity for the book");
                        alert("No more available quantity for the book");
                    }
                });
            }).catch((error) => {
                console.error("Error fetching book details:", error);
            });
        });
    }
});




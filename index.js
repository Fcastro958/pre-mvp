// $("#button").on("click", function(){
//     const $input = $("#input");

//     console.log($input.val())
//     fetch('http://localhost:3000/passengers')
//         .then(response => response.json())
//         .then(result=> {
//             console.log(result)
//             $("#card")[0].innerText = result
//         });
// });


fetch('http://localhost:3000/passengers')
.then(res => res.json())
.then(data => console.log(data))
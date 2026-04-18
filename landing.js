// Scroll function
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Login placeholder
// function login() {
//   alert('Login functionality coming soon!');
// }

 const ctx = document.getElementById('myPieChart').getContext('2d');
// // Pie chart using Chart.js
 const myPieChart = new Chart(ctx, {
    type: 'pie',
     data:{  
     labels: ['Jane Doe', 'John Smith', 'Alex Lee','Peter'],
     datasets: [{
       label: 'Votes',
       data: [1200, 950, 450,250],
       backgroundColor: ['#36A2EB', '#FF6384','#FFCE56','#4bc0c0'],
         hoverOffset: 20 
     }]
         
   },
   options: {
     responsive: true,
     plugins: {
            tooltip: {
                enabled: true // 👈 shows value on hover
            },
       legend: {
         position: 'bottom',
       },
       title: {
         display: true,
         text: 'Election Vote Distribution'
       }
     }
 }
});
  
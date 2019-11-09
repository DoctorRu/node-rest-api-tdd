async function gCustomer(id) {
  const customer = await getCustomer(id);
  console.log('Customer: ', customer);
  if (customer.isGold) {
    const topMovies = await getTopMovies(customer);
    console.log('Movies', topMovies);
    const email = await sendEmail(customer.email, topMovies);
    console.log('email sent', email);
  }
}

gCustomer(100);


function getCustomer(id) {
  return new Promise(resolve => {
    console.log('Getting user...')
    setTimeout(() => {
      resolve({ 
        id: id, 
        name: 'John Doe', 
        isGold: true, 
        email: 'jd@somewhere.com' 
      });
    }, 2000);  
  })
}

function getTopMovies(user) {
  return new Promise(resolve => {
    console.log('Getting movies...')
    setTimeout(() => {
      resolve(['Interstellar', 'Matrix']);
    }, 2000);
  })
}

function sendEmail(email, movies) {
  return new Promise ( resolve => {
    setTimeout(() => {
      resolve ( {
        email: email,
        movies: movies
      })
    }, 2000);

  })
}
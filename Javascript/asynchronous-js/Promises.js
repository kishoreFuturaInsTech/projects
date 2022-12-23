console.log("Start");

const loginUser = (name, email) => {
  console.log("login is executing");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ username: name }, { email: email });
    }, 2000);
  });
};

const movielist = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        list: `${name}'s Lists`,
        listsOfMovies: ["Godfather", "The Rocky", "The Dark Knight Trilogy"],
      });
    }, 2000);
  });
};

const acknowledgement = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Thank you ${name}`);
    }, 5000);
  });
};

loginUser("Kishore", "kishore.r@futurainstech.com")
  .then((result) => {
    console.log(result);
    return movielist(result.username);
  })
  .then((resp) => {
    console.log(resp);
    return acknowledgement(resp);
  })
  .then((response) => {
    console.log(response);
  });

// Promise.all([
//   loginUser("kishore", "kishore.r@futurainstech.com"),
//   movielist("Kishore"),
//   acknowledgement("Kishore"),
// ]).then((result) => console.log(result));
console.log("End");

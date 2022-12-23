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
    }, 3000);
  });
};

const run = async () => {
  const login = await loginUser("Kishore", "kishore.r@futurainstech.com");
  console.log(login.username);
  const movies = await movielist(login.username);
  console.log(movies);
  const thankyou = await acknowledgement(login.username);
  console.log(thankyou);
};

run();

// Promise.all([
//   loginUser("kishore", "kishore.r@futurainstech.com"),
//   movielist("Kishore"),
//   acknowledgement("Kishore"),
// ]).then((result) => console.log(result));

console.log("End");

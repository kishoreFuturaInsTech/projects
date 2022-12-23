console.log("Start");

const login = (name, email, callback) => {
  console.log("login is executing");
  setTimeout(() => {
    callback({ username: name }, { email: email });
  }, 2000);
};

const movielist = (name, callback) => {
  setTimeout(() => {
    callback(`${name}'s list`, [
      "Godfather",
      "Rocky",
      "The Dark Knight Trilogy",
    ]);
  }, 2000);
};

const acknowledgement = (name, callback) => {
  setTimeout(() => {
    callback(`Thank you ${name}`);
  }, 2000);
};

const user = login("Kishore", "kishorelesnar77@gmail.com", (name, email) => {
  console.log(name);
  console.log(email);
  movielist("Kishore", (mylisttitle, movies) => {
    console.log(mylisttitle, movies);
    acknowledgement("kishore", (thankyou) => console.log(thankyou));
  });
});

console.log("End");

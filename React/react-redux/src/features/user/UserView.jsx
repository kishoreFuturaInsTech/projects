import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./userSlice";

function UserView() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());

    return () => {};
  }, []);
  console.log(user.users.name);
  return (
    <div>
      <h2>User's List</h2>
      {user.loading && <h2>Loading...</h2>}
      {!user.loading && user.error ? <h2>Error:{user.error}</h2> : null}
      {!user.loading && user.users.length ? (
        <ul>
          {user.users.map((val) => (
            <li key={val.id}>{val.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default UserView;

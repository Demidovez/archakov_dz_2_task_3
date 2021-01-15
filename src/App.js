import React from "react";
import axios from "axios";
import "./App.scss";
import UserCard from "./components/UserCard";

function App() {
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMorePages, setHasMorePages] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://5c3755177820ff0014d92711.mockapi.io/users?page=${page}&limit=10`
      )
      .then(({ data: list }) => {
        if (list.length) {
          setUsers((state) => [...state, ...list]);
        } else {
          setHasMorePages(false);
        }
        setIsLoading(false);
      });
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="App">
      <input type="text" placeholder="Поиск пользователя..." />
      <div className="users">
        {users.map((user) => (
          <UserCard name={user.name} email={user.email} key={user.id} />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {hasMorePages && (
        <button onClick={nextPage} disabled={isLoading}>
          {isLoading ? "Wait..." : "Next 10 users"}
        </button>
      )}
    </div>
  );
}

export default App;

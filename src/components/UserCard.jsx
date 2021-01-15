function UserCard(props) {
  return (
    <div className="users__item">
        <div className="users__item-name">{props.name}</div>
        <div className="users__item-email">{props.email}</div>
    </div>
  );
}

export default UserCard;

const MyInfo = () => {
  return (
    <div>
      <h1 style={{ color: "darkblue" }}>Istamosh</h1>
      <p style={{ backgroundColor: "lightgray" }}>
        About me: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Minima, molestias! Velit similique reiciendis provident nulla nam magni
        eveniet debitis doloribus facere iusto quia totam ipsam, cumque non iste
        rerum alias.
      </p>
      <MyBucketList />
    </div>
  );
};

const MyBucketList = () => {
  return (
    <div>
      <p>My Go To Places:</p>
      <ul>
        <li>Indonesia</li>
        <li>Malaysia</li>
        <li>Singapore</li>
      </ul>
    </div>
  );
};

const Tutorial = () => {
  return (
    <fieldset>
      <legend>Tutorial Section</legend>
      <MyInfo />
    </fieldset>
  );
};

export default Tutorial;
// will be received by ../index.js
